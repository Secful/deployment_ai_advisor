# Multi-Tenant Token Management - Technical Design Document

## Overview
This document outlines the technical design for implementing configurable 
operation modes in the Salt API MCP Server (SaltAPI-Tool). The solution 
supports both single-tenant and multi-tenant deployments using the same 
codebase with environment-based configuration. The design follows Clean 
Architecture principles while maintaining backward compatibility and 
introducing secure multi-tenant capabilities.

## Architecture Design

### Clean Architecture Layers

```
┌─────────────────────────────────────────────────────────────────┐
│                    Interface Adapters                          │
│  ┌─────────────────┐  ┌─────────────────┐  ┌────────────────┐  │
│  │   MCP Server    │  │  CLI Interface  │  │  Configuration │  │
│  │   Controller    │  │   (Multi-tenant │  │    Manager     │  │
│  │ (Mode-aware)    │  │    mode only)   │  │  (Mode detect) │  │
│  └─────────────────┘  └─────────────────┘  └────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────────┐
│                   Application Services                          │
│  ┌─────────────────┐  ┌─────────────────┐  ┌────────────────┐  │
│  │  Token Service  │  │ Company Service │  │  Tool Factory  │  │
│  │  (Multi-tenant) │  │  (Multi-tenant) │  │ (Mode-specific │  │
│  │                 │  │                 │  │  tool creation)│  │
│  └─────────────────┘  └─────────────────┘  └────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────────┐
│                      Domain Layer                               │
│  ┌─────────────────┐  ┌─────────────────┐  ┌────────────────┐  │
│  │    Company      │  │      Token      │  │ Configuration  │  │
│  │    Entity       │  │     Entity      │  │    Entity      │  │
│  │ (Multi-tenant)  │  │ (Multi-tenant)  │  │  (Mode info)   │  │
│  └─────────────────┘  └─────────────────┘  └────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────────────────┐
│                  Infrastructure Layer                           │
│  ┌─────────────────┐  ┌─────────────────┐  ┌────────────────┐  │
│  │  AWS Secrets    │  │ Environment Var │  │   HTTP Client  │  │
│  │   Repository    │  │   Repository    │  │  (Mode-aware)  │  │
│  │ (Multi-tenant)  │  │  (Single-tenant)│  │                │  │
│  └─────────────────┘  └─────────────────┘  └────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

### Configurable System Architecture

```mermaid
graph TD
    %% External entities and clients
    A[MCP Client]:::client
    B[CLI User<br/>(Multi-tenant only)]:::client
    C[Salt Security API]:::external
    D[AWS Secrets Manager<br/>(Multi-tenant only)]:::external
    E[Environment Variables<br/>(Single-tenant)]:::external
    
    %% Configuration layer
    F[Configuration Manager<br/>src/infrastructure/config-manager.ts]:::config
    
    %% Interface Layer - Mode-aware components
    G[MCP Server Controller<br/>src/index.ts]:::interface
    H[Tool Factory<br/>src/application/tool-factory.ts]:::interface
    I[CLI Interface<br/>src/token-management-cli.ts]:::interface
    
    %% Application Layer - Mode-specific services
    J[Single-tenant Service<br/>src/application/single-tenant-service.ts]:::singleTenant
    K[Multi-tenant Service<br/>src/application/multi-tenant-service.ts]:::multiTenant
    
    %% Domain Layer
    L[Configuration Entity<br/>src/domain/configuration.ts]:::domain
    M[Company Entity<br/>src/domain/company.ts]:::domain
    N[Token Entity<br/>src/domain/token.ts]:::domain
    
    %% Infrastructure Layer - Mode-specific implementations
    O[Environment Token Repository<br/>src/infrastructure/env-token-repository.ts]:::singleTenant
    P[AWS Secrets Repository<br/>src/infrastructure/aws-secrets-repository.ts]:::multiTenant
    Q[Salt API Client<br/>src/infrastructure/salt-api-client.ts]:::infrastructure
    
    %% Configuration flow
    F -->|Detect Mode| L
    E -->|SALT_BEARER_TOKEN| F
    D -->|AWS_SECRET_NAME| F
    
    %% Mode-specific flows
    A -->|MCP Request| G
    G -->|Check Mode| H
    H -->|Single-tenant| J
    H -->|Multi-tenant| K
    
    %% Single-tenant flow
    J -->|Get Token| O
    O -->|Read Env Var| E
    O -->|Return Token| Q
    
    %% Multi-tenant flow  
    K -->|Get Company Token| P
    P -->|AWS API Call| D
    P -->|Return Token| Q
    B -->|CLI Commands| I
    I -->|Token Management| K
    
    %% API integration
    Q -->|HTTPS + Bearer| C
    C -->|API Response| Q
    Q -->|Response| G
    G -->|MCP Response| A
    
    %% Domain relationships
    L -->|Has Mode Info| F
    M -->|Has| N
    K -->|Uses| M
    K -->|Uses| N
    
    %% Component grouping with modes
    subgraph "Configuration Detection"
        F
        L
    end
    
    subgraph "Interface Adapters (Mode-aware)"
        G
        H
        I
    end
    
    subgraph "Application Services"
        subgraph "Single-tenant Mode"
            J
        end
        subgraph "Multi-tenant Mode" 
            K
        end
    end
    
    subgraph "Domain Core"
        M
        N
    end
    
    subgraph "Infrastructure Layer"
        subgraph "Single-tenant"
            O
        end
        subgraph "Multi-tenant"
            P
        end
        Q
    end
    
    subgraph "External Systems"
        C
        D
        E
    end
    
    %% Advanced styling for dual-mode
    classDef client fill:#e1f5fe,stroke:#01579b,stroke-width:2px,color:#000
    classDef config fill:#fff9c4,stroke:#f57f17,stroke-width:3px,color:#000
    classDef interface fill:#f3e5f5,stroke:#4a148c,stroke-width:2px,color:#000
    classDef singleTenant fill:#e8f5e8,stroke:#2e7d32,stroke-width:2px,color:#000
    classDef multiTenant fill:#e0f2f1,stroke:#00695c,stroke-width:2px,color:#000
    classDef domain fill:#fff3e0,stroke:#e65100,stroke-width:3px,color:#000
    classDef infrastructure fill:#fce4ec,stroke:#880e4f,stroke-width:2px,color:#000
    classDef external fill:#ffebee,stroke:#b71c1c,stroke-width:2px,color:#000
```

## Domain Design

### Core Entities

#### Company Entity
```typescript
// src/domain/company.ts
export class Company {
  constructor(
    public readonly id: string,
    public readonly name: string,
    private readonly createdAt: Date = new Date()
  ) {
    this.validateId();
    this.validateName();
  }

  private validateId(): void {
    if (!this.id || this.id.trim().length === 0) {
      throw new Error('Company ID is required');
    }
  }

  private validateName(): void {
    if (!this.name || this.name.trim().length === 0) {
      throw new Error('Company name is required');
    }
  }

  equals(other: Company): boolean {
    return this.id === other.id;
  }

  toJSON(): object {
    return {
      id: this.id,
      name: this.name,
      createdAt: this.createdAt.toISOString()
    };
  }
}
```

#### Token Entity
```typescript
// src/domain/token.ts
export class Token {
  constructor(
    public readonly companyId: string,
    private readonly bearerToken: string,
    private readonly createdAt: Date = new Date()
  ) {
    this.validateCompanyId();
    this.validateToken();
  }

  private validateCompanyId(): void {
    if (!this.companyId || this.companyId.trim().length === 0) {
      throw new Error('Company ID is required for token');
    }
  }

  private validateToken(): void {
    if (!this.bearerToken || this.bearerToken.trim().length === 0) {
      throw new Error('Bearer token is required');
    }
  }

  getBearerToken(): string {
    return this.bearerToken;
  }

  getMaskedToken(): string {
    if (this.bearerToken.length <= 8) {
      return '****';
    }
    const start = this.bearerToken.substring(0, 4);
    const end = this.bearerToken.substring(this.bearerToken.length - 4);
    return `${start}...${end}`;
  }

  equals(other: Token): boolean {
    return this.companyId === other.companyId;
  }

  // Never expose the actual token in JSON serialization
  toJSON(): object {
    return {
      companyId: this.companyId,
      maskedToken: this.getMaskedToken(),
      createdAt: this.createdAt.toISOString()
    };
  }
}
```

### Repository Interfaces (Ports)

#### Token Repository Port
```typescript
// src/domain/token-repository.ts
import { Company } from './company.js';
import { Token } from './token.js';

export interface TokenRepository {
  findByCompanyId(companyId: string): Promise<Token | null>;
  findByCompanyName(companyName: string): Promise<Token | null>;
  save(company: Company, token: Token): Promise<void>;
  delete(companyId: string): Promise<boolean>;
  findAll(): Promise<Array<{ company: Company; token: Token }>>;
}
```

#### Company Repository Port
```typescript
// src/domain/company-repository.ts
import { Company } from './company.js';

export interface CompanyRepository {
  findById(id: string): Promise<Company | null>;
  findByName(name: string): Promise<Company | null>;
  findAll(): Promise<Company[]>;
}
```

## Application Layer Design

### Token Service Use Cases
```typescript
// src/application/token-service.ts
import { TokenRepository } from '../domain/token-repository.js';
import { CompanyRepository } from '../domain/company-repository.js';
import { Company } from '../domain/company.js';
import { Token } from '../domain/token.js';

export class TokenService {
  constructor(
    private readonly tokenRepository: TokenRepository,
    private readonly companyRepository: CompanyRepository
  ) {}

  async getTokenForCompany(
    companyId?: string, 
    companyName?: string
  ): Promise<string> {
    if (!companyId && !companyName) {
      throw new Error(
        'Either company_id or company_name parameter is required'
      );
    }

    let token: Token | null = null;
    
    if (companyId) {
      token = await this.tokenRepository.findByCompanyId(companyId);
      if (!token) {
        throw new Error(`No token found for company_id: ${companyId}`);
      }
    } else if (companyName) {
      token = await this.tokenRepository.findByCompanyName(companyName);
      if (!token) {
        throw new Error(`No token found for company_name: ${companyName}`);
      }
    }

    return token!.getBearerToken();
  }

  async addCompanyToken(
    companyId: string,
    companyName: string,
    bearerToken: string
  ): Promise<void> {
    const company = new Company(companyId, companyName);
    const token = new Token(companyId, bearerToken);
    
    await this.tokenRepository.save(company, token);
  }

  async removeCompanyToken(companyId: string): Promise<boolean> {
    return await this.tokenRepository.delete(companyId);
  }

  async listCompaniesWithTokens(): Promise<Array<{
    company: Company;
    maskedToken: string;
  }>> {
    const entries = await this.tokenRepository.findAll();
    return entries.map(({ company, token }) => ({
      company,
      maskedToken: token.getMaskedToken()
    }));
  }
}
```

### CLI Service Use Cases
```typescript
// src/application/cli-service.ts
import { TokenService } from './token-service.js';

export class CliService {
  constructor(private readonly tokenService: TokenService) {}

  async browseTokens(): Promise<void> {
    const entries = await this.tokenService.listCompaniesWithTokens();
    
    if (entries.length === 0) {
      console.log('No company tokens found.');
      return;
    }

    console.log('\n📋 Company Tokens:');
    console.log('─'.repeat(60));
    
    entries.forEach(({ company, maskedToken }, index) => {
      console.log(`${index + 1}. ${company.name} (${company.id})`);
      console.log(`   Token: ${maskedToken}`);
      console.log('');
    });
  }

  async addToken(): Promise<void> {
    const readline = await import('readline');
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    const question = (prompt: string): Promise<string> => {
      return new Promise(resolve => rl.question(prompt, resolve));
    };

    try {
      console.log('\n➕ Add New Company Token');
      console.log('─'.repeat(30));
      
      const companyId = await question('Company ID: ');
      const companyName = await question('Company Name: ');
      const bearerToken = await question('Bearer Token: ');

      await this.tokenService.addCompanyToken(companyId, companyName, bearerToken);
      console.log(`✅ Token added successfully for ${companyName} (${companyId})`);
    } finally {
      rl.close();
    }
  }

  async deleteToken(): Promise<void> {
    const readline = await import('readline');
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    const question = (prompt: string): Promise<string> => {
      return new Promise(resolve => rl.question(prompt, resolve));
    };

    try {
      console.log('\n🗑️  Delete Company Token');
      console.log('─'.repeat(25));
      
      const companyId = await question('Company ID to delete: ');
      const success = await this.tokenService.removeCompanyToken(companyId);
      
      if (success) {
        console.log(`✅ Token deleted successfully for company: ${companyId}`);
      } else {
        console.log(`❌ No token found for company: ${companyId}`);
      }
    } finally {
      rl.close();
    }
  }
}
```

## Infrastructure Layer Design

### AWS Secrets Repository Implementation
```typescript
// src/infrastructure/aws-secrets-repository.ts
import { 
  SecretsManagerClient, 
  GetSecretValueCommand,
  PutSecretValueCommand,
  ResourceNotFoundException
} from '@aws-sdk/client-secrets-manager';
import { TokenRepository } from '../domain/token-repository.js';
import { CompanyRepository } from '../domain/company-repository.js';
import { Company } from '../domain/company.js';
import { Token } from '../domain/token.js';

interface SecretData {
  company_id: string;
  company_name: string;
  token: string;
}

export class AwsSecretsRepository implements TokenRepository, CompanyRepository {
  private readonly client: SecretsManagerClient;
  private readonly secretName = 'salt-cloud-assets-api-tokens';
  private readonly region = 'us-east-1';

  constructor() {
    this.client = new SecretsManagerClient({ region: this.region });
  }

  private async getSecretData(): Promise<SecretData[]> {
    try {
      const command = new GetSecretValueCommand({
        SecretId: this.secretName
      });
      
      const response = await this.client.send(command);
      
      if (!response.SecretString) {
        return [];
      }

      const data = JSON.parse(response.SecretString);
      return Array.isArray(data) ? data : [];
    } catch (error) {
      if (error instanceof ResourceNotFoundException) {
        // Secret doesn't exist yet, return empty array
        return [];
      }
      throw new Error(`Failed to retrieve secrets: ${error.message}`);
    }
  }

  private async saveSecretData(data: SecretData[]): Promise<void> {
    try {
      const command = new PutSecretValueCommand({
        SecretId: this.secretName,
        SecretString: JSON.stringify(data, null, 2)
      });
      
      await this.client.send(command);
    } catch (error) {
      throw new Error(`Failed to save secrets: ${error.message}`);
    }
  }

  async findByCompanyId(companyId: string): Promise<Token | null> {
    const data = await this.getSecretData();
    const entry = data.find(item => item.company_id === companyId);
    
    return entry ? new Token(entry.company_id, entry.token) : null;
  }

  async findByCompanyName(companyName: string): Promise<Token | null> {
    const data = await this.getSecretData();
    const entry = data.find(item => item.company_name === companyName);
    
    return entry ? new Token(entry.company_id, entry.token) : null;
  }

  async save(company: Company, token: Token): Promise<void> {
    const data = await this.getSecretData();
    
    // Remove existing entry for this company_id
    const filteredData = data.filter(item => item.company_id !== company.id);
    
    // Add new entry
    filteredData.push({
      company_id: company.id,
      company_name: company.name,
      token: token.getBearerToken()
    });
    
    await this.saveSecretData(filteredData);
  }

  async delete(companyId: string): Promise<boolean> {
    const data = await this.getSecretData();
    const initialLength = data.length;
    
    const filteredData = data.filter(item => item.company_id !== companyId);
    
    if (filteredData.length === initialLength) {
      return false; // Nothing was deleted
    }
    
    await this.saveSecretData(filteredData);
    return true;
  }

  async findAll(): Promise<Array<{ company: Company; token: Token }>> {
    const data = await this.getSecretData();
    
    return data.map(item => ({
      company: new Company(item.company_id, item.company_name),
      token: new Token(item.company_id, item.token)
    }));
  }

  // CompanyRepository implementation
  async findById(id: string): Promise<Company | null> {
    const data = await this.getSecretData();
    const entry = data.find(item => item.company_id === id);
    
    return entry ? new Company(entry.company_id, entry.company_name) : null;
  }

  async findByName(name: string): Promise<Company | null> {
    const data = await this.getSecretData();
    const entry = data.find(item => item.company_name === name);
    
    return entry ? new Company(entry.company_id, entry.company_name) : null;
  }

  async findAllCompanies(): Promise<Company[]> {
    const data = await this.getSecretData();
    
    return data.map(item => new Company(item.company_id, item.company_name));
  }
}
```

### Enhanced Salt API Client
```typescript
// src/infrastructure/enhanced-salt-api-client.ts
import axios, { AxiosInstance, AxiosResponse } from "axios";
import { z } from "zod";
import { TokenService } from '../application/token-service.js';
import { 
  CloudAsset, 
  CloudAssetsListResponse, 
  CloudAssetSchema, 
  CloudAssetsListResponseSchema 
} from '../domain/cloud-asset.js';

export class EnhancedSaltApiClient {
  private client: AxiosInstance;
  private tokenService: TokenService;

  constructor(tokenService: TokenService) {
    this.tokenService = tokenService;
    
    // Initialize axios client WITHOUT bearer token in constructor
    this.client = axios.create({
      baseURL: "https://api.secured-api.com/v1",
      timeout: 30000,
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
    });

    // Add request interceptor for logging (without token exposure)
    this.client.interceptors.request.use((config) => {
      console.error(`Making request to: ${config.method?.toUpperCase()} ${config.url}`);
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
              throw new Error("Authentication failed. Invalid Bearer token for company.");
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

  async listCloudAssets(
    limit: number = 100, 
    offset: number = 0,
    companyId?: string,
    companyName?: string
  ): Promise<CloudAssetsListResponse> {
    // Get the token dynamically for the specified company
    const bearerToken = await this.tokenService.getTokenForCompany(companyId, companyName);
    
    try {
      const response: AxiosResponse = await this.client.get("/cloud-assets", {
        params: {
          limit: Math.min(Math.max(limit, 1), 1000),
          offset: Math.max(offset, 0),
        },
        headers: {
          "Authorization": `Bearer ${bearerToken}`
        }
      });

      // Validate response structure
      const validatedData = CloudAssetsListResponseSchema.parse(response.data);
      return validatedData;
    } catch (error) {
      if (error instanceof z.ZodError) {
        throw new Error(`Invalid API response format: ${error.message}`);
      }
      throw error;
    }
  }

  async getCloudAsset(
    id: string,
    companyId?: string,
    companyName?: string
  ): Promise<CloudAsset> {
    if (!id || id.trim().length === 0) {
      throw new Error("Asset ID is required and cannot be empty");
    }

    // Get the token dynamically for the specified company
    const bearerToken = await this.tokenService.getTokenForCompany(companyId, companyName);

    try {
      const response: AxiosResponse = await this.client.get(
        `/cloud-assets/asset/${encodeURIComponent(id)}`,
        {
          headers: {
            "Authorization": `Bearer ${bearerToken}`
          }
        }
      );

      // Validate response structure
      const validatedData = CloudAssetSchema.parse(response.data);
      return validatedData;
    } catch (error) {
      if (error instanceof z.ZodError) {
        throw new Error(`Invalid API response format: ${error.message}`);
      }
      throw error;
    }
  }
}
```

## Interface Layer Design

### Updated MCP Server Controller
```typescript
// src/index.ts (modified sections)
import { TokenService } from './application/token-service.js';
import { AwsSecretsRepository } from './infrastructure/aws-secrets-repository.js';
import { EnhancedSaltApiClient } from './infrastructure/enhanced-salt-api-client.js';

// Initialize dependencies following Clean Architecture
const secretsRepository = new AwsSecretsRepository();
const tokenService = new TokenService(secretsRepository, secretsRepository);
const saltClient = new EnhancedSaltApiClient(tokenService);

// Updated tool schemas to include company identification
const ListCloudAssetsArgsSchema = z.object({
  limit: z.number().min(1).max(1000).optional().default(100),
  offset: z.number().min(0).optional().default(0),
  company_id: z.string().optional(),
  company_name: z.string().optional(),
}).refine(data => data.company_id || data.company_name, {
  message: "Either company_id or company_name must be provided"
});

const GetCloudAssetArgsSchema = z.object({
  id: z.string().min(1),
  company_id: z.string().optional(),
  company_name: z.string().optional(),
}).refine(data => data.company_id || data.company_name, {
  message: "Either company_id or company_name must be provided"
});

// Updated tool registration with company identification requirement
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "list_cloud_assets",
        description: "Get a list of cloud assets from Salt Security API for a specific company",
        inputSchema: {
          type: "object",
          properties: {
            limit: {
              type: "number",
              description: "Maximum number of assets to return (1-1000, default: 100)",
              minimum: 1,
              maximum: 1000,
              default: 100,
            },
            offset: {
              type: "number", 
              description: "Number of assets to skip for pagination (default: 0)",
              minimum: 0,
              default: 0,
            },
            company_id: {
              type: "string",
              description: "Company identifier for token lookup"
            },
            company_name: {
              type: "string", 
              description: "Company name for token lookup"
            }
          },
          oneOf: [
            { required: ["company_id"] },
            { required: ["company_name"] }
          ]
        },
      },
      {
        name: "get_cloud_asset",
        description: "Get a specific cloud asset by ID from Salt Security API for a specific company", 
        inputSchema: {
          type: "object",
          properties: {
            id: {
              type: "string",
              description: "The unique identifier of the cloud asset",
            },
            company_id: {
              type: "string",
              description: "Company identifier for token lookup"
            },
            company_name: {
              type: "string",
              description: "Company name for token lookup"
            }
          },
          required: ["id"],
          oneOf: [
            { required: ["id", "company_id"] },
            { required: ["id", "company_name"] }
          ]
        },
      },
    ],
  };
});

// Updated tool execution with company parameters
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    switch (name) {
      case "list_cloud_assets": {
        const parsed = ListCloudAssetsArgsSchema.parse(args);
        const result = await saltClient.listCloudAssets(
          parsed.limit, 
          parsed.offset,
          parsed.company_id,
          parsed.company_name
        );
        
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(result, null, 2),
            },
          ],
        };
      }

      case "get_cloud_asset": {
        const parsed = GetCloudAssetArgsSchema.parse(args);
        const result = await saltClient.getCloudAsset(
          parsed.id,
          parsed.company_id,
          parsed.company_name
        );
        
        return {
          content: [
            {
              type: "text", 
              text: JSON.stringify(result, null, 2),
            },
          ],
        };
      }

      default:
        throw new Error(`Unknown tool: ${name}`);
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return {
      content: [
        {
          type: "text",
          text: `Error: ${errorMessage}`,
        },
      ],
      isError: true,
    };
  }
});
```

### CLI Interface Implementation
```typescript
// src/token-management-cli.ts
#!/usr/bin/env node

import { CliService } from './application/cli-service.js';
import { TokenService } from './application/token-service.js';
import { AwsSecretsRepository } from './infrastructure/aws-secrets-repository.js';
import { createInterface } from 'readline';

async function main() {
  const secretsRepository = new AwsSecretsRepository();
  const tokenService = new TokenService(secretsRepository, secretsRepository);
  const cliService = new CliService(tokenService);

  const rl = createInterface({
    input: process.stdin,
    output: process.stdout
  });

  const question = (prompt: string): Promise<string> => {
    return new Promise(resolve => rl.question(prompt, resolve));
  };

  console.log('🔐 Salt API Token Management CLI');
  console.log('═'.repeat(35));
  
  while (true) {
    console.log('\nAvailable operations:');
    console.log('1. 📋 Browse tokens (masked)');
    console.log('2. ➕ Add new token');
    console.log('3. 🗑️  Delete token');
    console.log('4. 🚪 Exit');
    
    const choice = await question('\nSelect an option (1-4): ');
    
    try {
      switch (choice.trim()) {
        case '1':
          await cliService.browseTokens();
          break;
        case '2':
          await cliService.addToken();
          break;
        case '3':
          await cliService.deleteToken();
          break;
        case '4':
          console.log('👋 Goodbye!');
          rl.close();
          process.exit(0);
        default:
          console.log('❌ Invalid option. Please select 1-4.');
          break;
      }
    } catch (error) {
      console.error(`❌ Error: ${error instanceof Error ? error.message : error}`);
    }
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
}
```

## Implementation Strategy

### Phase 1: Domain & Application Layer
1. **Create domain entities**: Company and Token classes with validation
2. **Define repository interfaces**: TokenRepository and CompanyRepository ports
3. **Implement application services**: TokenService and CliService use cases
4. **Unit testing**: Test domain logic and application services in isolation

### Phase 2: Infrastructure Layer
1. **Implement AWS Secrets Repository**: AwsSecretsRepository with error handling
2. **Enhance Salt API Client**: Dynamic token loading with company parameters
3. **Integration testing**: Test AWS Secrets Manager integration

### Phase 3: Interface Layer
1. **Update MCP Server**: Modified tool schemas and handlers
2. **Implement CLI Interface**: Interactive token management interface
3. **End-to-end testing**: Test complete flows from MCP client to Salt API

### Phase 4: Documentation & Deployment
1. **AWS IAM documentation**: Provide IAM policy templates
2. **Setup instructions**: Clear onboarding for new installations
3. **Migration guide**: (Not applicable - fresh implementation)

## Technology Decisions

### Dependencies
- **@aws-sdk/client-secrets-manager**: Official AWS SDK for Secrets Manager
- **readline**: Built-in Node.js module for CLI interactions
- **Existing dependencies**: Maintain current Zod, Axios, MCP SDK versions

### Security Considerations
- **Token isolation**: No tokens in logs, stdout, or LLM interactions
- **AWS IAM least privilege**: Minimal required permissions for secrets access
- **Token masking**: Consistent 4+4 character display pattern
- **Error handling**: Generic error messages to prevent information disclosure

### Performance Considerations  
- **No caching**: Real-time token lookup for maximum security
- **Connection reuse**: Maintain existing Axios client optimizations
- **Async operations**: Non-blocking token retrieval and storage

## File Structure Changes

```
src/
├── domain/
│   ├── company.ts                 # Company entity
│   ├── token.ts                   # Token entity with masking
│   ├── token-repository.ts        # TokenRepository interface
│   ├── company-repository.ts      # CompanyRepository interface
│   └── cloud-asset.ts            # Existing CloudAsset types
├── application/
│   ├── token-service.ts           # Token use cases
│   ├── company-service.ts         # Company use cases  
│   └── cli-service.ts             # CLI use cases
├── infrastructure/
│   ├── aws-secrets-repository.ts  # AWS Secrets Manager implementation
│   └── enhanced-salt-api-client.ts # Dynamic token Salt API client
├── index.ts                       # Updated MCP server with company params
└── token-management-cli.ts        # CLI interface entry point
```

## Testing Strategy

### Unit Tests
- Domain entities validation logic
- Application service business rules
- Token masking functionality
- Error handling scenarios

### Integration Tests  
- AWS Secrets Manager operations
- Salt API authentication flows
- MCP tool execution with company parameters

### End-to-End Tests
- Complete MCP client to Salt API flows
- CLI token management operations
- Error scenarios with missing/invalid companies

## Security Review Checklist

- ✅ No Bearer tokens in logs or stdout
- ✅ Token masking in all user interfaces
- ✅ AWS IAM least privilege access
- ✅ Input validation for all parameters
- ✅ Secure error messages without token exposure
- ✅ Clean Architecture separation of concerns
- ✅ No hardcoded credentials or tokens
- ✅ Environment-based AWS configuration