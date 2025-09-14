# Development Guide

## Coding Standards

### TypeScript Standards
- **Strict Mode**: All TypeScript strict checks enabled
- **ES2022 Target**: Modern JavaScript features with Node.js compatibility
- **Module System**: ES modules (`import`/`export`) throughout
- **Type Safety**: No `any` types - use proper type definitions
- **Null Safety**: Explicit handling of undefined/null values

### Code Style Guidelines
- **Naming Conventions**:
  - Classes: PascalCase (`SaltApiClient`)
  - Functions/Variables: camelCase (`listCloudAssets`)
  - Constants: SCREAMING_SNAKE_CASE (`SALT_BEARER_TOKEN`)
  - Files: kebab-case (`salt-api-client.ts`)
- **Error Handling**: Always throw Error objects with descriptive messages
- **Documentation**: JSDoc comments for public APIs and complex logic
- **Imports**: Explicit `.js` extensions for ES module imports

## Technology Stack

### Core Dependencies
- **@modelcontextprotocol/sdk v1.0.0**: MCP protocol implementation
- **axios v1.6.0**: HTTP client for API requests
- **zod v3.22.0**: Runtime schema validation
- **dotenv v16.3.1**: Environment variable management

### Development Dependencies
- **typescript v5.x**: TypeScript compiler and language support
- **tsx v4.0.0**: TypeScript runner for development
- **jest v29.0.0**: Testing framework
- **ts-jest v29.0.0**: Jest TypeScript integration
- **@types/node v20.x**: Node.js type definitions

### Build Tools
- **TypeScript Compiler**: Source-to-build pipeline
- **ES Modules**: Native ES module support
- **Source Maps**: Debug support with source mapping
- **Declaration Files**: Type definition generation

## Code Structure

### Project Layout
```
salt-api-mcp/
├── src/                    # Source code
│   ├── index.ts           # Main MCP server entry point
│   └── salt-api-client.ts # Salt Security API client
├── build/                 # Compiled JavaScript output
├── ai-docs/              # AI-focused documentation
├── tasks/                # Development task workspace
├── package.json          # Node.js project configuration
├── tsconfig.json         # TypeScript configuration
├── .env.example          # Environment template
└── .gitignore           # Version control exclusions
```

### Module Organization
- **Single Responsibility**: Each module has one clear purpose
- **Interface Segregation**: Clean boundaries between MCP server and API client
- **Dependency Injection**: Configuration injected via environment
- **Error Boundaries**: Each layer handles its own error types

### Key Architectural Patterns
- **Factory Pattern**: API client initialization with configuration
- **Adapter Pattern**: MCP protocol adaptation for Salt Security API
- **Validation Pattern**: Zod schemas for request/response validation
- **Error Mapping**: API errors transformed to user-friendly messages

## Development Workflow

### Initial Setup
```bash
# Clone and setup
git clone <repository-url>
cd salt-api-mcp
npm install

# Configure environment
cp .env.example .env
# Edit .env with your Salt Security Bearer token

# Development server
npm run dev
```

### Build Process
```bash
# TypeScript compilation
npm run build

# Production start
npm start
```

### Environment Configuration
Required environment variables:
- `SALT_BEARER_TOKEN`: Bearer token for Salt Security API authentication

### Code Quality Tools
- **TypeScript Compiler**: Strict type checking and compilation
- **ES Lint**: Code style and quality enforcement (future)
- **Prettier**: Code formatting consistency (future)
- **Husky**: Git hooks for pre-commit validation (future)

## Authentication Development

### Bearer Token Management
- **Environment Loading**: dotenv loads configuration on startup
- **Validation**: Server fails fast if token not configured
- **Security**: Token never logged or exposed in error messages
- **Injection**: Axios interceptors add authentication headers

### Development Token Setup
```bash
# .env file configuration
SALT_BEARER_TOKEN=your_development_token_here

# Environment validation
if (!process.env.SALT_BEARER_TOKEN) {
  throw new Error("SALT_BEARER_TOKEN is required");
}
```

## Error Handling Patterns

### Layered Error Handling
1. **API Client Layer**: Network and HTTP errors
2. **Validation Layer**: Schema and input validation errors
3. **MCP Server Layer**: Protocol and tool errors
4. **Transport Layer**: stdio communication errors

### Error Types and Handling
```typescript
// Network errors
catch (error) {
  if (error.code === 'ENOTFOUND') {
    throw new Error("Network error: Unable to reach Salt Security API");
  }
}

// HTTP errors
if (error.response?.status === 401) {
  throw new Error("Authentication failed. Please check your Bearer token.");
}

// Validation errors
if (error instanceof z.ZodError) {
  throw new Error(`Invalid API response format: ${error.message}`);
}
```

## Testing Strategy

### Testing Framework
- **Jest**: Primary testing framework
- **ts-jest**: TypeScript integration
- **Supertest**: HTTP testing utilities (future)
- **Mock Axios**: API response mocking (future)

### Test Categories
- **Unit Tests**: Individual function and class testing
- **Integration Tests**: API client and MCP server integration
- **Schema Tests**: Zod validation schema testing
- **Error Handling Tests**: Error condition coverage

### Test Configuration
```javascript
// jest.config.js
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  testMatch: ['**/__tests__/**/*.test.ts'],
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'html']
};
```

## API Client Development

### HTTP Client Configuration
```typescript
// Axios client setup
this.client = axios.create({
  baseURL: "https://api.secured-api.com/v1",
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
    "Authorization": `Bearer ${this.bearerToken}`,
  },
});
```

### Request/Response Interceptors
```typescript
// Request logging (without token exposure)
this.client.interceptors.request.use((config) => {
  console.error(`Making request to: ${config.method?.toUpperCase()} ${config.url}`);
  return config;
});

// Response error handling
this.client.interceptors.response.use(
  (response) => response,
  (error) => {
    // Map API errors to user-friendly messages
    if (error.response?.status === 401) {
      throw new Error("Authentication failed. Please check your Bearer token.");
    }
    throw error;
  }
);
```

## Schema Development

### Zod Schema Patterns
```typescript
// Flexible optional fields with strict required fields
const CloudAssetSchema = z.object({
  id: z.string(),                              // Required
  name: z.string().optional(),                 // Optional
  tags: z.record(z.string()).optional(),       // Optional key-value map
  metadata: z.record(z.unknown()).optional(),  // Optional flexible data
});
```

### Validation Error Handling
```typescript
try {
  const validatedData = CloudAssetSchema.parse(response.data);
  return validatedData;
} catch (error) {
  if (error instanceof z.ZodError) {
    throw new Error(`Invalid API response format: ${error.message}`);
  }
  throw error;
}
```

## MCP Server Development

### Tool Registration Pattern
```typescript
// Tool definition with JSON schema
{
  name: "list_cloud_assets",
  description: "Get a list of company cloud assets from Salt Security API",
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
    },
  },
}
```

### Request Handler Pattern
```typescript
// Schema validation + API call + response formatting
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;
  
  switch (name) {
    case "list_cloud_assets": {
      const parsed = ListCloudAssetsArgsSchema.parse(args);
      const result = await saltClient.listCloudAssets(parsed.limit, parsed.offset);
      
      return {
        content: [{
          type: "text",
          text: JSON.stringify(result, null, 2),
        }],
      };
    }
  }
});
```

## Contributing Guidelines

### Code Review Checklist
- [ ] TypeScript strict mode compliance
- [ ] Proper error handling and user-friendly messages
- [ ] Input validation with appropriate schemas
- [ ] No Bearer token exposure in logs or errors
- [ ] ES module import/export syntax
- [ ] JSDoc documentation for public APIs
- [ ] Test coverage for new functionality

### Development Best Practices
- **Fail Fast**: Validate configuration and inputs early
- **Clear Errors**: Provide actionable error messages
- **Type Safety**: Use TypeScript features for compile-time safety
- **Security First**: Never expose authentication credentials
- **Documentation**: Keep AI-docs updated with implementation changes