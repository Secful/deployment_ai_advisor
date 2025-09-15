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

## 🚀 Implementation Status: ✅ PRODUCTION READY
- **✅ MCP Data Layer**: Production-ready Salt API MCP server (TypeScript 5.9.2 + Node.js 18+, 2 working tools)
- **✅ Multi-Agent Orchestrator**: 7 working Claude Code subagents in `.claude/agents/` with proper YAML frontmatter
- **✅ Claude Code Slash Commands**: 4 native CLI commands with autocompletion in `.claude/commands/advisor/`
- **✅ Cloud Decision Flowcharts**: Complete AWS, Azure, GCP deployment decision trees in `specifications/flowcharts/`
- **✅ Session Management**: Complete specifications implemented (versioning, storage, anonymized learning, historical analysis)
- **✅ Error Handling**: Full specifications implemented (retry logic, circuit breakers, escalation, graceful degradation)

## 🎯 Agent System Components
- **`.claude/agents/`**: 6 working Claude Code subagents with auto-discovery and YAML frontmatter
  - **✅ orchestrator-agent.md**: Central coordinator with natural language processing and sub-agent coordination
  - **✅ deployment-advisor-agent.md**: SME agent with flowchart consultation and architecture analysis
  - **✅ data-extractor-agent.md**: MCP integration with Document360 access and historical analysis
  - **✅ error-handler-agent.md**: Troubleshooting specialist with pattern matching and architecture-specific solutions
  - **✅ validator-agent.md**: Deployment verification with SOW comparison and gap analysis
  - **✅ reporter-agent.md**: SOW generation with Mermaid diagrams and session storage management
- **`.claude/commands/advisor/`**: 4 native CLI slash commands with autocompletion
- **`specifications/`**: Complete system specifications and design documents from 55-task implementation

---

*This documentation reflects the CURRENT PRODUCTION-READY implementation with 6 working Claude Code subagents, 4 native CLI commands, and complete MCP data layer integration.*