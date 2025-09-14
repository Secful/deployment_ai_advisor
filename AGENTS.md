# AI Agent Repository Context

This file provides vendor-agnostic context for AI coding assistants based on the CURRENT IMPLEMENTATION STATE of this repository. All referenced documentation reflects what has actually been implemented and tested.

## 🔧 Repository Overview
- [ai-docs/README.md](ai-docs/README.md) - Traffic Collection Deployment AI Agent for Salt Security customers
- [salt-api-mcp/ai-docs/README.md](salt-api-mcp/ai-docs/README.md) - Production MCP server with 2 working tools, complete Salt Security API integration

## 🏗️ Architecture & Design
- [ai-docs/ARCHITECTURE.md](ai-docs/ARCHITECTURE.md) - Multi-agent orchestrator system with 5 sub-agents for deployment guidance
- [salt-api-mcp/ai-docs/ARCHITECTURE.md](salt-api-mcp/ai-docs/ARCHITECTURE.md) - Implemented MCP server architecture with Mermaid diagrams
- [ai-docs/SCHEMA.md](ai-docs/SCHEMA.md) - External data schemas for Salt Security Cloud Assets API

## 🔌 Interfaces
- [ai-docs/API.md](ai-docs/API.md) - External API endpoints for Claude Code CLI integration and customer interactions
- [salt-api-mcp/ai-docs/API.md](salt-api-mcp/ai-docs/API.md) - 2 working MCP tools: list_cloud_assets & get_cloud_asset (tested with CLI)

## 🧪 Development Practices
- [ai-docs/DEVELOPMENT.md](ai-docs/DEVELOPMENT.md) - Multi-agent development patterns, orchestrator implementation guidelines
- [salt-api-mcp/ai-docs/DEVELOPMENT.md](salt-api-mcp/ai-docs/DEVELOPMENT.md) - TypeScript 5.9.2, Node.js 18+, MCP SDK development
- [ai-docs/TESTING.md](ai-docs/TESTING.md) - Agent testing strategies and validation approaches

## 🚀 Deployment Status
- **MCP Data Layer**: ✅ Complete (Salt API MCP server with 2 working tools)
- **Orchestrator System**: 🚧 In Planning (5 sub-agents architecture defined in PRD)
- **Claude Code Integration**: 🚧 In Planning (Salt commands framework ready)

---

*This documentation reflects ONLY implemented and tested functionality as of the current codebase state. The project combines a complete MCP server foundation with a planned multi-agent orchestrator system.*