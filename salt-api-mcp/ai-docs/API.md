# External API Documentation - Current Implementation

## Overview
The Salt API MCP Server provides two main tools that interface with Salt Security's Cloud Assets API. This server acts as a secure bridge, handling authentication and data validation while exposing clean MCP tool interfaces.

## External APIs Provided - CURRENTLY AVAILABLE

### MCP Tools Interface
#### list_cloud_assets
- **Method:** MCP Tool Call
- **Path:** N/A (MCP tool)
- **Description:** Retrieves a paginated list of company cloud assets from Salt Security API
- **Parameters:**
  - `limit` (optional): Number of assets to return (1-1000, default: 100)
  - `offset` (optional): Number of assets to skip for pagination (default: 0)
- **Response:** JSON array of cloud assets with metadata
- **Authentication:** Bearer token (configured server-side)
- **Example:**
  ```json
  {
    "name": "list_cloud_assets",
    "arguments": {
      "limit": 50,
      "offset": 0
    }
  }
  ```
- **Status:** ✅ Working

#### get_cloud_asset
- **Method:** MCP Tool Call
- **Path:** N/A (MCP tool)
- **Description:** Retrieves detailed information about a specific cloud asset by ID
- **Parameters:**
  - `id` (required): Unique identifier of the cloud asset
- **Response:** JSON object with complete asset details
- **Authentication:** Bearer token (configured server-side)
- **Example:**
  ```json
  {
    "name": "get_cloud_asset",
    "arguments": {
      "id": "asset_12345"
    }
  }
  ```
- **Status:** ✅ Working

## External APIs Consumed - CURRENTLY INTEGRATED

### Salt Security Cloud Assets API
#### List Company Cloud Assets
- **Service:** Salt Security API
- **Endpoint:** `GET https://api.secured-api.com/v1/cloud-assets`
- **Purpose:** Retrieve paginated list of cloud assets for analysis and monitoring
- **Authentication:** Bearer token via Authorization header
- **Parameters:**
  - `limit`: Maximum assets to return (1-1000)
  - `offset`: Pagination offset (0+)
- **Response Format:**
  ```json
  {
    "data": [
      {
        "id": "string",
        "name": "string",
        "type": "string",
        "provider": "string",
        "region": "string",
        "status": "string",
        "created_at": "string",
        "updated_at": "string",
        "tags": {},
        "metadata": {}
      }
    ],
    "total": 0,
    "limit": 100,
    "offset": 0,
    "has_more": true
  }
  ```
- **Example Integration:**
  ```typescript
  await saltClient.listCloudAssets(100, 0)
  ```
- **Status:** ✅ Working

#### Get Cloud Asset by ID
- **Service:** Salt Security API
- **Endpoint:** `GET https://api.secured-api.com/v1/cloud-assets/asset/{id}`
- **Purpose:** Fetch detailed information about specific cloud assets
- **Authentication:** Bearer token via Authorization header
- **Parameters:**
  - `id`: URL path parameter with asset identifier
- **Response Format:**
  ```json
  {
    "id": "string",
    "name": "string",
    "type": "string",
    "provider": "string",
    "region": "string",
    "status": "string",
    "created_at": "string",
    "updated_at": "string",
    "tags": {},
    "metadata": {}
  }
  ```
- **Example Integration:**
  ```typescript
  await saltClient.getCloudAsset("asset_12345")
  ```
- **Status:** ✅ Working

## Response Schema Validation

### Cloud Asset Schema
All cloud asset responses are validated against this schema:
```typescript
{
  id: string,              // Required unique identifier
  name?: string,           // Optional asset name
  type?: string,           // Optional asset type
  provider?: string,       // Optional cloud provider
  region?: string,         // Optional geographic region
  status?: string,         // Optional asset status
  created_at?: string,     // Optional creation timestamp
  updated_at?: string,     // Optional last update timestamp
  tags?: Record<string, string>,    // Optional key-value tags
  metadata?: Record<string, unknown> // Optional additional metadata
}
```

### Error Response Handling
The server handles various API error conditions:

- **401 Unauthorized**: "Authentication failed. Please check your Bearer token."
- **403 Forbidden**: "Access forbidden. Insufficient permissions."
- **404 Not Found**: "Resource not found."
- **429 Rate Limited**: "Rate limit exceeded. Please try again later."
- **Network Errors**: "Network error: Unable to reach Salt Security API"
- **Validation Errors**: "Invalid API response format: [details]"

## Authentication Flow

### Bearer Token Configuration
1. **Environment Setup**: Token configured via `SALT_BEARER_TOKEN` environment variable
2. **Request Injection**: Axios interceptor adds `Authorization: Bearer {token}` header
3. **Security**: Token never logged or exposed in error messages
4. **Validation**: Server fails fast if token not configured

### Authentication Example
```typescript
// Environment configuration required
SALT_BEARER_TOKEN=your_actual_bearer_token

// Automatic header injection
headers: {
  "Authorization": "Bearer your_actual_bearer_token",
  "Accept": "application/json",
  "Content-Type": "application/json"
}
```

## Usage Examples

### MCP Client Integration
```typescript
// List first 10 cloud assets
const response = await mcpClient.callTool({
  name: "list_cloud_assets",
  arguments: { limit: 10, offset: 0 }
});

// Get specific asset details
const assetResponse = await mcpClient.callTool({
  name: "get_cloud_asset",
  arguments: { id: "asset_abc123" }
});
```

### Error Handling Example
```typescript
try {
  const assets = await mcpClient.callTool({
    name: "list_cloud_assets",
    arguments: { limit: 100 }
  });
} catch (error) {
  // Handle authentication, network, or validation errors
  console.error("API call failed:", error.message);
}
```

## Rate Limiting and Quotas

### Current Limitations
- **API Rate Limits**: Subject to Salt Security API quotas
- **Request Timeout**: 30-second timeout per request
- **Pagination Limits**: Maximum 1000 assets per request

### Best Practices
- **Pagination**: Use appropriate limit/offset for large datasets
- **Error Handling**: Implement retry logic for rate limit errors
- **Monitoring**: Track API usage and response times