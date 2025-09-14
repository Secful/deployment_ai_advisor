# External Data Schema - Current Implementation

## Overview
This document describes the external data schemas and API response structures that the Salt API MCP Server interfaces with. All schemas are validated using Zod for runtime type safety and data integrity.

## External API Data Models

### Cloud Asset Schema
The core data structure for cloud assets returned by the Salt Security API:

```typescript
interface CloudAsset {
  id: string;                    // Unique asset identifier (required)
  name?: string;                 // Human-readable asset name
  type?: string;                 // Asset type (e.g., "EC2", "S3", "RDS")
  provider?: string;             // Cloud provider (e.g., "AWS", "Azure", "GCP")
  region?: string;               // Geographic region (e.g., "us-east-1")
  status?: string;               // Asset status (e.g., "active", "inactive")
  created_at?: string;           // ISO timestamp of creation
  updated_at?: string;           // ISO timestamp of last update
  tags?: Record<string, string>; // Key-value metadata tags
  metadata?: Record<string, unknown>; // Additional provider-specific data
}
```

### Cloud Assets List Response Schema
Structure for paginated list responses from the Salt Security API:

```typescript
interface CloudAssetsListResponse {
  data: CloudAsset[];           // Array of cloud assets
  total?: number;               // Total number of assets available
  limit?: number;               // Current page size limit
  offset?: number;              // Current pagination offset
  has_more?: boolean;           // Whether more results are available
}
```

## Zod Schema Validators

### CloudAssetSchema Validation
```typescript
const CloudAssetSchema = z.object({
  id: z.string(),                              // Required string ID
  name: z.string().optional(),                 // Optional name field
  type: z.string().optional(),                 // Optional type field
  provider: z.string().optional(),             // Optional provider field
  region: z.string().optional(),               // Optional region field
  status: z.string().optional(),               // Optional status field
  created_at: z.string().optional(),           // Optional creation timestamp
  updated_at: z.string().optional(),           // Optional update timestamp
  tags: z.record(z.string()).optional(),       // Optional string key-value map
  metadata: z.record(z.unknown()).optional(),  // Optional flexible metadata
});
```

### CloudAssetsListResponseSchema Validation
```typescript
const CloudAssetsListResponseSchema = z.object({
  data: z.array(CloudAssetSchema),            // Array of validated assets
  total: z.number().optional(),               // Optional total count
  limit: z.number().optional(),               // Optional limit value
  offset: z.number().optional(),              // Optional offset value
  has_more: z.boolean().optional(),           // Optional has_more flag
});
```

## API Request Schemas

### List Cloud Assets Request Parameters
```typescript
interface ListCloudAssetsParams {
  limit?: number;    // 1-1000, default: 100
  offset?: number;   // 0+, default: 0
}
```

### Get Cloud Asset Request Parameters
```typescript
interface GetCloudAssetParams {
  id: string;       // Required asset ID (non-empty string)
}
```

## Data Validation Rules

### Input Validation
- **Asset ID**: Must be non-empty string, URL-encoded for API requests
- **Limit Parameter**: Integer between 1-1000, defaults to 100
- **Offset Parameter**: Non-negative integer, defaults to 0

### Response Validation
- **Required Fields**: Only `id` field is required for cloud assets
- **Optional Fields**: All other fields are optional and may be null/undefined
- **Type Safety**: All fields validated for correct data types
- **Flexible Metadata**: `metadata` field accepts any valid JSON structure

## Example Data Structures

### Sample Cloud Asset Response
```json
{
  "id": "asset_ec2_i-1234567890abcdef0",
  "name": "web-server-production",
  "type": "EC2Instance",
  "provider": "AWS",
  "region": "us-east-1",
  "status": "running",
  "created_at": "2024-01-15T10:30:00Z",
  "updated_at": "2024-01-20T14:45:00Z",
  "tags": {
    "Environment": "production",
    "Team": "backend",
    "CostCenter": "engineering"
  },
  "metadata": {
    "instance_type": "t3.medium",
    "ami_id": "ami-0abcdef1234567890",
    "vpc_id": "vpc-12345678",
    "subnet_id": "subnet-87654321",
    "security_groups": ["sg-11111111", "sg-22222222"]
  }
}
```

### Sample List Response
```json
{
  "data": [
    {
      "id": "asset_s3_bucket1",
      "name": "company-data-backup",
      "type": "S3Bucket",
      "provider": "AWS",
      "region": "us-west-2",
      "status": "active"
    },
    {
      "id": "asset_rds_db1",
      "name": "primary-database",
      "type": "RDSInstance",
      "provider": "AWS",
      "region": "us-east-1",
      "status": "available"
    }
  ],
  "total": 847,
  "limit": 100,
  "offset": 0,
  "has_more": true
}
```

## Error Response Schemas

### API Error Response Structure
```typescript
interface ApiErrorResponse {
  status: number;           // HTTP status code
  message: string;          // Error description
  code?: string;           // Error code if provided
  details?: unknown;       // Additional error details
}
```

### Common Error Scenarios
- **Authentication Error (401)**: Invalid or expired Bearer token
- **Authorization Error (403)**: Insufficient permissions for resource
- **Not Found Error (404)**: Asset ID does not exist
- **Rate Limit Error (429)**: API quota exceeded
- **Validation Error (400)**: Invalid request parameters

## Schema Evolution and Compatibility

### Backward Compatibility
- **Optional Fields**: New fields added as optional to maintain compatibility
- **Type Safety**: Zod validation ensures runtime type checking
- **Graceful Handling**: Unknown fields in responses are preserved in metadata

### Schema Versioning
- **API Version**: Currently targeting Salt Security API v1
- **Response Validation**: Strict validation for known fields, flexible for metadata
- **Error Handling**: Schema validation errors bubble up with context

## External Database Schema - NOT APPLICABLE

This MCP server does not directly interface with external databases. All data access is performed through the Salt Security HTTP API, with response data validated against the schemas defined above.