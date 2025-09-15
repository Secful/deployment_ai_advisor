# Salt API MCP Server

## Overview
Production-ready MCP (Model Context Protocol) server that provides secure access to Salt Security's Cloud Assets API. This server enables AI assistants to retrieve and analyze cloud asset information while maintaining enterprise-grade security and proper authentication practices.

## Key Features - IMPLEMENTED ✅
- **MCP Protocol Compliance**: Full MCP 1.0 specification implementation
- **List Cloud Assets**: Paginated cloud asset retrieval with configurable limits (1-1000)
- **Get Cloud Asset by ID**: Individual asset lookup with detailed information
- **Secure Authentication**: Environment variable-based Bearer token management
- **Input Validation**: Runtime schema validation using Zod with type coercion
- **Error Handling**: Comprehensive HTTP error mapping with user-friendly messages
- **Type Safety**: Full TypeScript implementation with strict compilation
- **CLI Testing**: Command-line testing interface with parameter validation
- **Production Build**: Compiled JavaScript with source maps and type declarations

## Quick Start
1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Configure authentication**:
   ```bash
   cp .env.example .env
   # Edit .env and set your Salt Security Bearer token
   ```

3. **Build the server**:
   ```bash
   npm run build
   ```

4. **Run the server**:
   ```bash
   npm start
   ```

5. **Test functionality** (optional):
   ```bash
   # Test MCP tools with CLI
   npm run test-mode -- list_tools
   npm run test-mode -- list_cloud_assets --limit 10
   npm run test-mode -- get_cloud_asset --id your-asset-id
   ```

## Technology Stack - CURRENT IMPLEMENTATION

### Core Runtime & Language
- **Node.js**: ES modules with ES2022 target (tsconfig.json:3-4)
- **TypeScript**: v5.0+ with strict compilation (package.json:24, tsconfig.json:8)
- **Module System**: ESNext modules with Node resolution (tsconfig.json:4-5)

### MCP Framework & Integration
- **@modelcontextprotocol/sdk**: v1.0.0 - Core MCP server implementation (package.json:17)
- **Transport**: StdioServerTransport for MCP client communication (src/index.ts:133)
- **Protocol**: Full MCP v1.0 specification compliance

### HTTP Client & API Integration
- **Axios**: v1.6.0 - HTTP client with interceptors (package.json:18)
- **Authentication**: Bearer token via environment variables (src/salt-api-client.ts:38-50)
- **API Endpoint**: https://api.secured-api.com/v1 (src/salt-api-client.ts:43)
- **Timeout**: 30-second request timeout (src/salt-api-client.ts:44)

### Validation & Type Safety
- **Zod**: v3.22.0 - Runtime schema validation (package.json:20)
- **Request Validation**: MCP tool parameter schemas (src/index.ts:28-35)
- **Response Validation**: API response schemas (src/salt-api-client.ts:9-31)
- **Type Safety**: Complete TypeScript coverage with declarations

### Configuration & Environment
- **dotenv**: v16.3.1 - Environment variable management (package.json:19)
- **Configuration**: SALT_BEARER_TOKEN environment variable (src/salt-api-client.ts:39)
- **Build Output**: Compiled JavaScript with source maps (tsconfig.json:12-14)

### Development Tools
- **tsx**: v4.0+ - TypeScript execution engine (package.json:25)
- **Build System**: TypeScript compiler with declarations (tsconfig.json:12-13)
- **CLI Testing**: Custom testing interface (src/cli-test.ts, src/test-mode.ts)
- **Jest**: v29.0+ testing framework (package.json:26-28)

## Architecture
See [ARCHITECTURE.md](ARCHITECTURE.md) for current system design and implemented components.

## API
See [API.md](API.md) for currently available external endpoints and working examples.

## Development
See [DEVELOPMENT.md](DEVELOPMENT.md) for coding standards and contribution guidelines.