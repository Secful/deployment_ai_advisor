# Salt API MCP Server

## Overview
MCP (Model Context Protocol) server that provides access to Salt Security's Cloud Assets API. This server enables AI assistants to retrieve and analyze cloud asset information from Salt Security's platform while maintaining secure authentication through Bearer tokens.

## Key Features - IMPLEMENTED
- **List Cloud Assets**: Retrieve paginated list of company cloud assets with configurable limits
- **Get Cloud Asset by ID**: Fetch detailed information about specific cloud assets
- **Secure Authentication**: Bearer token authentication configured via environment variables
- **Input Validation**: Comprehensive request/response validation using Zod schemas
- **Error Handling**: Robust error handling with detailed error messages and status codes
- **Type Safety**: Full TypeScript implementation with proper type definitions

## Key Features - IN PROGRESS
- Health check endpoint for API connectivity verification
- Rate limiting and retry mechanisms
- Comprehensive test suite

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

## Technology Stack - CURRENT
- **Runtime**: Node.js with ES modules
- **Language**: TypeScript 5.x
- **MCP Framework**: @modelcontextprotocol/sdk v1.0.0
- **HTTP Client**: Axios v1.6.0
- **Validation**: Zod v3.22.0
- **Configuration**: dotenv v16.3.1
- **Development**: tsx v4.0.0 (TypeScript runner)
- **Testing**: Jest v29.0.0 with ts-jest

## Architecture
See [ARCHITECTURE.md](ARCHITECTURE.md) for current system design and implemented components.

## API
See [API.md](API.md) for currently available external endpoints and working examples.

## Development
See [DEVELOPMENT.md](DEVELOPMENT.md) for coding standards and contribution guidelines.