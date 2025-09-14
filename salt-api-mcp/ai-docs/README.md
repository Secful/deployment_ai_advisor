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

## Technology Stack - CURRENT
- **Runtime**: Node.js 18+ with ES modules
- **Language**: TypeScript 5.9.2 with strict type checking
- **MCP Framework**: @modelcontextprotocol/sdk v1.18.0
- **HTTP Client**: Axios v1.12.1 for Salt Security API integration
- **Validation**: Zod v3.25.76 for runtime schema validation
- **Configuration**: dotenv v16.6.1 for environment variable management
- **Development**: tsx v4.20.5 (TypeScript execution engine)
- **Testing**: Jest v29.7.0 with ts-jest v29.4.1

## Architecture
See [ARCHITECTURE.md](ARCHITECTURE.md) for current system design and implemented components.

## API
See [API.md](API.md) for currently available external endpoints and working examples.

## Development
See [DEVELOPMENT.md](DEVELOPMENT.md) for coding standards and contribution guidelines.