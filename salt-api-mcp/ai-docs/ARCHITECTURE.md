# System Architecture

## Overview
The Salt API MCP Server is a production-ready Node.js/TypeScript application implementing the Model Context Protocol (MCP) v1.0 specification. It provides secure, authenticated access to Salt Security's Cloud Assets API through two MCP tools: `list_cloud_assets` and `get_cloud_asset`.

## Comprehensive System Architecture

```mermaid
graph TD
    %% External entities and client interfaces
    A[AI Assistant/Client]:::client
    B[Salt Security API<br/>api.secured-api.com]:::external
    CLI[CLI Test Interface<br/>npm run test-mode]:::testClient
    
    %% Core MCP Server components
    C[MCP Server Core<br/>src/index.ts:12-22]:::server
    D[Salt API Client<br/>src/salt-api-client.ts:33]:::apiClient
    
    %% Request processing layers
    E[Tool Request Handler<br/>src/index.ts:82-130]:::handler
    F[Zod Schema Validator<br/>src/index.ts:28-35]:::validator
    G[Response Formatter<br/>src/index.ts:91-112]:::formatter
    
    %% Configuration and security
    H[Environment Config<br/>.env SALT_BEARER_TOKEN]:::config
    I[Bearer Authentication<br/>src/salt-api-client.ts:38-50]:::auth
    J[Axios HTTP Client<br/>src/salt-api-client.ts:42-84]:::httpClient
    
    %% Development and testing infrastructure
    K[TypeScript Build<br/>tsconfig.json → build/]:::build
    L[CLI Testing System<br/>src/cli-test.ts]:::testing
    M[Interactive Test Mode<br/>src/test-mode.ts]:::testing
    
    %% Main data flow
    A -->|stdio MCP Protocol| C
    CLI -->|Direct API Testing| D
    C -->|Tool Discovery| E
    C -->|Tool Execution| E
    E -->|Parameter Validation| F
    F -->|Valid Request| D
    D -->|HTTPS Request<br/>Bearer Auth| B
    B -->|JSON Response| D
    D -->|Parsed Response| F
    F -->|Schema Validation| G
    G -->|MCP Response Format| E
    E -->|Tool Result| C
    C -->|stdio Response| A
    
    %% Configuration flow
    H -->|Environment Variables| I
    I -->|Authorization Header| J
    J -->|HTTP Interceptors| D
    
    %% Development workflow
    K -->|Compiled JS| C
    L -->|CLI Commands| D
    M -->|Interactive Testing| D
    
    %% Component grouping
    subgraph "MCP Server Runtime (Node.js)"
        C
        E
        F
        G
        D
        J
        I
    end
    
    subgraph "External Services & APIs"
        B
    end
    
    subgraph "Development Infrastructure"
        K
        L
        M
        CLI
    end
    
    subgraph "Configuration & Security"
        H
    end
    
    %% Advanced styling
    classDef client fill:#e1f5fe,stroke:#01579b,stroke-width:3px,color:#000
    classDef testClient fill:#e8f5e8,stroke:#2e7d32,stroke-width:2px,color:#000
    classDef server fill:#f3e5f5,stroke:#4a148c,stroke-width:3px,color:#000
    classDef apiClient fill:#e8f5e8,stroke:#1b5e20,stroke-width:3px,color:#000
    classDef handler fill:#fff3e0,stroke:#e65100,stroke-width:2px,color:#000
    classDef validator fill:#fce4ec,stroke:#880e4f,stroke-width:2px,color:#000
    classDef formatter fill:#f1f8e9,stroke:#33691e,stroke-width:2px,color:#000
    classDef httpClient fill:#e0f2f1,stroke:#00695c,stroke-width:2px,color:#000
    classDef external fill:#ffebee,stroke:#b71c1c,stroke-width:3px,color:#000
    classDef config fill:#f1f8e9,stroke:#33691e,stroke-width:2px,color:#000
    classDef auth fill:#fff8e1,stroke:#f57f17,stroke-width:2px,color:#000
    classDef build fill:#fafafa,stroke:#616161,stroke-width:2px,color:#000
    classDef testing fill:#e8eaf6,stroke:#3f51b5,stroke-width:2px,color:#000
```

## Component Architecture

### 1. MCP Server Core (`src/index.ts:12-22`)
- **Implementation**: Complete MCP v1.0 server with stdio transport
- **Key Functions**:
  - `ListToolsRequestSchema` handler (src/index.ts:38-79) - Tool discovery for MCP clients
  - `CallToolRequestSchema` handler (src/index.ts:82-130) - Tool execution with error handling
  - Server initialization with capability registration (src/index.ts:12-22)
- **Transport**: StdioServerTransport for MCP client communication (src/index.ts:133)
- **Status**: ✅ Production ready, fully functional

### 2. Salt API Client (`src/salt-api-client.ts:33`)
- **Implementation**: Complete Axios-based HTTP client with interceptors
- **Core Methods**:
  - `listCloudAssets()` (src/salt-api-client.ts:93-117) - Paginated asset listing
  - `getCloudAsset()` (src/salt-api-client.ts:124-147) - Individual asset retrieval
  - `healthCheck()` (src/salt-api-client.ts:153-161) - API connectivity verification
- **Security Features**:
  - Bearer token authentication (src/salt-api-client.ts:38-50)
  - Request/response interceptors (src/salt-api-client.ts:52-84)
  - Comprehensive error handling and mapping
- **Status**: ✅ Production ready, fully functional

### 3. Schema Validation System
- **Request Validation**: Zod schemas for MCP tool parameters (src/index.ts:28-35)
- **Response Validation**: API response validation (src/salt-api-client.ts:9-31)
- **Type Safety**: Complete TypeScript coverage with runtime validation
- **Error Handling**: Validation errors with detailed messages
- **Status**: ✅ Comprehensive validation implemented

### 4. Development & Testing Infrastructure
- **CLI Testing**: Command-line testing interface (src/cli-test.ts)
- **Interactive Testing**: User-guided testing mode (src/test-mode.ts)
- **Build System**: TypeScript compilation to build/ directory
- **Type Declarations**: Full .d.ts generation with source maps
- **Status**: ✅ Complete development toolchain

### 3. Request Flow Architecture

#### Input Validation Layer
- **Tool Schema Validation**: Zod schemas validate MCP tool arguments
- **API Schema Validation**: Response schemas ensure data integrity
- **Error Propagation**: Validation errors bubble up with context

#### Authentication Layer
- **Environment-based Config**: Bearer token loaded from `.env`
- **Request Interception**: Axios interceptors inject authentication headers
- **Security**: Token never exposed in logs or error messages

#### Response Processing Layer
- **Data Transformation**: Raw API responses parsed and validated
- **Error Standardization**: API errors mapped to user-friendly messages
- **Type Safety**: Full TypeScript coverage for request/response types

## Data Flow

### 1. List Cloud Assets Flow
```
AI Request → MCP Server → Validate Args → Salt Client → HTTPS Request
                                                              ↓
AI Response ← JSON Format ← Validate Schema ← Parse Response ← API Response
```

### 2. Get Cloud Asset Flow
```
AI Request → MCP Server → Validate ID → Salt Client → HTTPS Request (/cloud-assets/asset/{id})
                                                             ↓
AI Response ← JSON Format ← Validate Schema ← Parse Response ← API Response
```

## Security Architecture

### 1. Authentication Security
- **Bearer Token Storage**: Environment variable isolation
- **Token Transmission**: HTTPS-only communication
- **No Token Logging**: Authentication headers excluded from logs
- **Error Sanitization**: Authentication errors don't expose token details

### 2. Input Validation Security
- **Schema Enforcement**: All inputs validated against strict schemas
- **Parameter Sanitization**: URL encoding for path parameters
- **Bounds Checking**: Limit and offset parameters validated for safety
- **Type Safety**: Runtime validation matches compile-time types

### 3. Network Security
- **HTTPS Enforcement**: All API communication over TLS
- **Timeout Configuration**: 30-second request timeout prevents hanging
- **Error Boundary**: Network errors handled gracefully
- **Base URL Validation**: Hardcoded API endpoint prevents injection

## Configuration Management

### Environment Variables
- `SALT_BEARER_TOKEN`: Required Bearer token for API authentication
- Configuration validation on startup
- Graceful error handling for missing configuration

### Runtime Configuration
- HTTP client timeout: 30 seconds
- Default pagination: limit=100, offset=0
- Maximum limit: 1000 assets per request
- Base API URL: https://api.secured-api.com/v1

## Error Handling Strategy

### 1. Client-Side Errors
- **401 Unauthorized**: Bearer token invalid or expired
- **403 Forbidden**: Insufficient API permissions
- **404 Not Found**: Asset ID doesn't exist
- **429 Rate Limited**: API quota exceeded

### 2. Server-Side Errors
- **Network Timeout**: Connection timeout handling
- **Invalid Response**: Schema validation failures
- **Unexpected Errors**: Generic error boundary

### 3. MCP Protocol Errors
- **Tool Not Found**: Unknown tool name handling
- **Invalid Arguments**: Schema validation error responses
- **System Errors**: Internal server error propagation

## Performance Considerations

### 1. Request Optimization
- **Connection Reuse**: Axios client instance reuse
- **Request Pooling**: HTTP connection pooling enabled
- **Timeout Management**: Prevents resource leaks

### 2. Memory Management
- **Response Streaming**: Large responses handled efficiently
- **Schema Validation**: Minimal overhead validation
- **Error Object Cleanup**: Proper error handling prevents memory leaks

## Deployment Architecture

### Development Environment
- **TypeScript Compilation**: Source-to-build pipeline
- **Hot Reload**: tsx for development server
- **Environment Isolation**: .env file configuration

### Production Environment
- **Compiled JavaScript**: TypeScript compiled to ES2022
- **Process Management**: Single-process MCP server
- **Logging**: stderr logging for operational visibility

## Scalability Design

### Current Limitations
- **Single Process**: No horizontal scaling capability
- **Memory Bound**: Limited by Node.js memory constraints
- **API Rate Limits**: Bound by Salt Security API quotas

### Future Scalability Options
- **Process Pooling**: Multiple MCP server instances
- **Connection Pooling**: Enhanced HTTP client configuration
- **Caching Layer**: Response caching for frequently accessed assets
- **Health Monitoring**: API connectivity and performance monitoring