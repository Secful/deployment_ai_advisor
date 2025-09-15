import axios, { AxiosInstance, AxiosResponse } from "axios";
import { z } from "zod";
import * as YAML from "yaml";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Response schemas for validation - Updated to match actual Salt API response
const CloudAssetSchema = z.object({
  id: z.string(),
  // Fields from list response
  cloudAccountId: z.string().optional(),
  cloudId: z.string().optional(),
  collectStatus: z.string().optional(),
  endpoints: z.string().optional(),
  provider: z.string().optional(),
  region: z.string().optional(),
  resourceName: z.string().optional(),
  resourceType: z.string().optional(),
  // Additional fields from individual asset response
  accountId: z.string().optional(),
  firstDiscovered: z.string().optional(),
  link: z.string().optional(),
  additionalData: z.array(z.object({
    key: z.string(),
    type: z.string(),
    value: z.string(),
  })).optional(),
  availableConnectors: z.array(z.unknown()).optional(),
  installedConnectors: z.array(z.unknown()).optional(),
  tags: z.union([z.record(z.string()), z.array(z.unknown())]).optional(),
  // Keep legacy fields for backward compatibility
  name: z.string().optional(),
  type: z.string().optional(),
  status: z.string().optional(),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
  metadata: z.record(z.unknown()).optional(),
});

const CloudAssetsListResponseSchema = z.object({
  records: z.array(CloudAssetSchema),
  // Keep legacy fields for backward compatibility
  data: z.array(CloudAssetSchema).optional(),
  total: z.number().optional(),
  limit: z.number().optional(),
  offset: z.number().optional(),
  has_more: z.boolean().optional(),
});

export type CloudAsset = z.infer<typeof CloudAssetSchema>;
export type CloudAssetsListResponse = z.infer<typeof CloudAssetsListResponseSchema> & {
  yaml?: string;
};

export type CloudAssetWithYAML = CloudAsset & {
  yaml?: string;
  transformed?: any;
};

// Utility functions for data transformation
function simplifyProvider(provider?: string): string | undefined {
  if (!provider) return undefined;
  
  if (provider.includes('AWS') || provider.toLowerCase().includes('aws')) {
    return 'AWS';
  } else if (provider.includes('Azure') || provider.toLowerCase().includes('azure')) {
    return 'Azure';
  } else if (provider.includes('GCP') || provider.toLowerCase().includes('google')) {
    return 'GCP';
  }
  
  return provider;
}

function simplifyResourceType(resourceType?: string): string | undefined {
  if (!resourceType) return undefined;
  
  // Remove provider prefix (e.g., "AWS-APIGateway-Http" -> "APIGateway-Http")
  return resourceType.replace(/^(AWS|Azure|GCP)-/, '');
}

function removeEmptyFields(obj: any): any {
  const cleaned: any = {};
  
  for (const [key, value] of Object.entries(obj)) {
    // Skip empty, null, undefined, or "N/A" values
    if (value !== null && 
        value !== undefined && 
        value !== '' && 
        value !== 'N/A' && 
        value !== 'unknown' &&
        !(Array.isArray(value) && value.length === 0)) {
      cleaned[key] = value;
    }
  }
  
  return cleaned;
}

function transformAssetForOutput(asset: CloudAsset): any {
  return removeEmptyFields({
    id: asset.id,
    name: asset.resourceName || asset.name,
    type: simplifyResourceType(asset.resourceType || asset.type),
    region: asset.region,
    status: asset.collectStatus || asset.status,
    endpoints: asset.endpoints,
    account_id: asset.cloudAccountId || asset.accountId,
    cloud_id: asset.cloudId,
    first_discovered: asset.firstDiscovered,
    link: asset.link
  });
}

function formatAssetsAsYAML(assets: CloudAsset[]): string {
  // Group assets by provider
  const groupedAssets: Record<string, any[]> = {};
  const providerCounts: Record<string, number> = {};
  
  for (const asset of assets) {
    const provider = simplifyProvider(asset.provider) || 'Unknown';
    const transformedAsset = transformAssetForOutput(asset);
    
    if (!groupedAssets[provider]) {
      groupedAssets[provider] = [];
      providerCounts[provider] = 0;
    }
    
    groupedAssets[provider].push(transformedAsset);
    providerCounts[provider]++;
  }
  
  // Create summary
  const summary = {
    total_assets: assets.length,
    ...Object.fromEntries(
      Object.entries(providerCounts).map(([provider, count]) => 
        [`${provider.toLowerCase()}_count`, count]
      )
    )
  };
  
  // Create final structure
  const result: any = { summary };
  
  // Add grouped assets with provider-specific keys
  for (const [provider, providerAssets] of Object.entries(groupedAssets)) {
    const key = `${provider.toLowerCase()}_assets`;
    result[key] = providerAssets;
  }
  
  return YAML.stringify(result, { 
    indent: 2,
    lineWidth: 120,
    minContentWidth: 0
  });
}

export class SaltApiClient {
  private client: AxiosInstance;
  private bearerToken: string | null;

  constructor() {
    // Get Bearer token from environment variable
    this.bearerToken = process.env.SALT_BEARER_TOKEN || null;

    // Initialize axios client with base configuration
    this.client = axios.create({
      baseURL: "https://api.secured-api.com/v1",
      timeout: 30000,
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        ...(this.bearerToken ? { "Authorization": `Bearer ${this.bearerToken}` } : {}),
      },
    });

    // Add request interceptor for logging (without exposing token)
    this.client.interceptors.request.use((config) => {
      const fullUrl = (config.baseURL || '') + (config.url || '');
      console.error(`Making request to: ${config.method?.toUpperCase()} ${fullUrl}`);
      return config;
    });

    // Add response interceptor for error handling
    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response) {
          const status = error.response.status;
          const message = error.response.data?.message || error.response.statusText;
          
          switch (status) {
            case 401:
              throw new Error("Authentication failed. Please check your Bearer token.");
            case 403:
              throw new Error("Access forbidden. Insufficient permissions.");
            case 404:
              throw new Error("Resource not found.");
            case 429:
              throw new Error("Rate limit exceeded. Please try again later.");
            default:
              throw new Error(`API error (${status}): ${message}`);
          }
        } else if (error.request) {
          throw new Error("Network error: Unable to reach Salt Security API");
        } else {
          throw new Error(`Request error: ${error.message}`);
        }
      }
    );
  }

  /**
   * Get a list of company cloud assets
   * @param limit Maximum number of assets to return (1-1000, default: 100)
   * @param offset Number of assets to skip for pagination (default: 0)
   * @returns Promise<CloudAssetsListResponse>
   */
  async listCloudAssets(limit: number = 100, offset: number = 0): Promise<CloudAssetsListResponse> {
    if (!this.bearerToken) {
      throw new Error(
        "Salt Security Bearer token not configured. Please set SALT_BEARER_TOKEN environment variable."
      );
    }

    try {
      const response: AxiosResponse = await this.client.get("/cloud-connect/cloud-assets", {
        params: {
          limit: Math.min(Math.max(limit, 1), 1000), // Ensure limit is between 1-1000
          offset: Math.max(offset, 0), // Ensure offset is not negative
        },
      });

      // Validate response structure
      const validatedData = CloudAssetsListResponseSchema.parse(response.data);
      
      // Get the assets array (prefer records over data)
      const assets = validatedData.records || validatedData.data || [];
      
      // Return YAML formatted response with improved structure
      const yamlOutput = formatAssetsAsYAML(assets);
      
      return {
        data: assets, // Keep for backward compatibility
        records: assets, // Keep for backward compatibility  
        yaml: yamlOutput, // New YAML formatted output
        total: validatedData.total,
        limit: validatedData.limit,
        offset: validatedData.offset,
        has_more: validatedData.has_more
      };
    } catch (error) {
      if (error instanceof z.ZodError) {
        throw new Error(`Invalid API response format: ${error.message}`);
      }
      throw error;
    }
  }

  /**
   * Get a specific cloud asset by ID
   * @param id The unique identifier of the cloud asset
   * @returns Promise<CloudAsset>
   */
  async getCloudAsset(id: string): Promise<CloudAssetWithYAML> {
    if (!this.bearerToken) {
      throw new Error(
        "Salt Security Bearer token not configured. Please set SALT_BEARER_TOKEN environment variable."
      );
    }

    if (!id || id.trim().length === 0) {
      throw new Error("Asset ID is required and cannot be empty");
    }

    try {
      const response: AxiosResponse = await this.client.get(`/cloud-connect/cloud-assets/asset/${encodeURIComponent(id)}`);

      // Validate response structure
      const validatedData = CloudAssetSchema.parse(response.data);
      
      // Transform and format as YAML
      const transformedAsset = transformAssetForOutput(validatedData);
      const yamlOutput = YAML.stringify(transformedAsset, { 
        indent: 2,
        lineWidth: 120,
        minContentWidth: 0
      });
      
      return {
        ...validatedData, // Keep original data for backward compatibility
        yaml: yamlOutput, // New YAML formatted output
        transformed: transformedAsset // Simplified data structure
      };
    } catch (error) {
      if (error instanceof z.ZodError) {
        throw new Error(`Invalid API response format: ${error.message}`);
      }
      throw error;
    }
  }

  /**
   * Health check method to verify API connectivity and authentication
   * @returns Promise<boolean>
   */
  async healthCheck(): Promise<boolean> {
    try {
      await this.listCloudAssets(1, 0);
      return true;
    } catch (error) {
      console.error("Health check failed:", error instanceof Error ? error.message : error);
      return false;
    }
  }
}