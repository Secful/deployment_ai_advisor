# AI Agent Repository Context

This file provides vendor-agnostic context for AI coding assistants based on the CURRENT IMPLEMENTATION STATE of this repository. All referenced documentation reflects production-ready, tested functionality.

## 🔧 Repository Overview
- [ai-docs/README.md](ai-docs/README.md) - Production MCP server with 2 working tools, complete Salt Security API integration
- [tasks/salt-api-mcp-overview.md](tasks/salt-api-mcp-overview.md) - Complete implementation status and feature tracking

## 🏗️ Architecture & Design  
- [ai-docs/ARCHITECTURE.md](ai-docs/ARCHITECTURE.md) - Implemented MCP server architecture with Mermaid diagrams, deployed components
- [ai-docs/SCHEMA.md](ai-docs/SCHEMA.md) - Salt Security API data schemas with Zod validation (runtime-validated)

## 🔌 Interfaces
- [ai-docs/API.md](ai-docs/API.md) - 2 working MCP tools: list_cloud_assets & get_cloud_asset (tested with CLI)
- [ai-docs/INTEGRATIONS.md](ai-docs/INTEGRATIONS.md) - Active Salt Security API integration with Bearer token authentication

## 🧪 Development Practices
- [ai-docs/DEVELOPMENT.md](ai-docs/DEVELOPMENT.md) - TypeScript 5.9.2, Node.js 18+, current dependency versions
- [ai-docs/TESTING.md](ai-docs/TESTING.md) - CLI testing framework (npm run test-mode), Jest test structure

## 🚀 Deployment Status: Production Ready
- **MCP Server**: Fully functional with stdio transport
- **API Integration**: Complete Salt Security Cloud Assets API connectivity
- **Security**: Environment variable-based Bearer token management
- **Testing**: CLI-based testing interface with parameter validation
- **Build System**: TypeScript compilation to JavaScript with source maps

---

*This documentation reflects ONLY implemented and tested functionality as of the current codebase state.*