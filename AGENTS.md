# AI Agent Repository Context

This file provides vendor-agnostic context for AI coding assistants based on the CURRENT IMPLEMENTATION STATE of this repository. All referenced documentation reflects what has actually been implemented and tested.

## 🔧 Repository Overview
- [ai-docs/README.md](ai-docs/README.md) - Traffic Collection Deployment AI Agent system specifications for Salt Security customers
- [salt-api-mcp/ai-docs/README.md](salt-api-mcp/ai-docs/README.md) - MCP server with 2 working tools, Salt Security API integration

## 🏗️ Architecture & Design
- [ai-docs/ARCHITECTURE.md](ai-docs/ARCHITECTURE.md) - Multi-agent orchestrator system specifications with 5 sub-agents
- [salt-api-mcp/ai-docs/ARCHITECTURE.md](salt-api-mcp/ai-docs/ARCHITECTURE.md) - MCP server architecture with Mermaid diagrams
- [ai-docs/SCHEMA.md](ai-docs/SCHEMA.md) - External data schemas for Salt Security Cloud Assets API

## 🔌 Interfaces
- [ai-docs/API.md](ai-docs/API.md) - /advisor: command family specifications with Claude Code CLI integration
- [salt-api-mcp/ai-docs/API.md](salt-api-mcp/ai-docs/API.md) - 2 working MCP tools: list_cloud_assets & get_cloud_asset (tested with CLI)

## 🧪 Development Practices
- [ai-docs/DEVELOPMENT.md](ai-docs/DEVELOPMENT.md) - Multi-agent development patterns, orchestrator implementation guidelines
- [salt-api-mcp/ai-docs/DEVELOPMENT.md](salt-api-mcp/ai-docs/DEVELOPMENT.md) - TypeScript 5.9.2, Node.js 18+, MCP SDK development
- [ai-docs/TESTING.md](ai-docs/TESTING.md) - Agent testing strategies and validation approaches

## 🚀 Implementation Status
- **MCP Data Layer**: Functional (Salt API MCP server with 2 working tools)
- **Multi-Agent Orchestrator**: Working implementation (agents/ directory with Claude Code integration)
- **Claude Code Slash Commands**: Implemented (4 /advisor: commands with autocompletion)
- **Cloud Decision Flowcharts**: Documented (AWS, Azure, GCP deployment decision trees)
- **Session Management**: Documented (Versioning, storage, anonymized learning, historical analysis specifications)
- **Error Handling**: Specified (Retry logic, circuit breakers, escalation, graceful degradation specifications)

## 🎯 Agent System Components
- **agents/**: Working Claude Code agents for deployment assistance
  - **Orchestrator Agent**: Natural language processing with sub-agent coordination
  - **Deployment Advisor**: SME agent with flowchart consultation and architecture analysis
  - **Data Extractor**: MCP integration with Document360 access and historical analysis
  - **Error Handler**: Troubleshooting with pattern matching and architecture-specific solutions
  - **Validator**: Deployment verification with SOW comparison and gap analysis
  - **Reporter**: SOW generation with Mermaid diagrams and session storage management
- **specifications/**: Complete system specifications and design documents

---

*This documentation reflects documented specifications and functional MCP components. The project contains system design documents with one functional MCP data layer.*