# Traffic Collection Deployment AI Agent

## Overview
AI-powered assistant that helps Salt Security customers deploy, troubleshoot, and manage traffic collection across cloud environments through natural language interactions via Claude Code CLI.

## Key Features - PLANNED
- **Deployment Guidance**: Natural language questions about collector deployment recommendations
- **Error Troubleshooting**: Detect issues and provide guided solutions based on customer architectures
- **Deployment Validation**: Verify collector setup completeness and success
- **Context Intelligence**: Tailor answers using customer-specific cloud asset data
- **Learning System**: Improve assistance over time through anonymized session history

## Key Features - IMPLEMENTED
- **Salt API MCP Integration**: Complete MCP server for Salt Security Cloud Assets API access
- **Command Framework**: Salt commands guide with systematic development workflow
- **PRD Documentation**: Complete architecture specification with 5 sub-agents

## Quick Start
*Project is in planning phase - orchestrator and sub-agents not yet implemented*

1. **Data Layer (Available)**: salt-api-mcp provides cloud asset data access
2. **Agent Framework (Planned)**: Orchestrator + 5 sub-agents architecture
3. **Claude Code Integration (Planned)**: Salt commands for agent invocation

## Technology Stack - PLANNED
- **Runtime**: Claude Code CLI with Agent framework
- **Data Access**: MCP (Model Context Protocol) via salt-api-mcp server
- **Architecture**: Multi-agent orchestrator with specialized sub-agents
- **Storage**: Git-based session history and anonymized learning data
- **Documentation**: Document360 integration via MCP
- **External APIs**: Web search and AWS documentation access

## Architecture
See [ARCHITECTURE.md](ARCHITECTURE.md) for planned multi-agent orchestrator system design.

## API
See [API.md](API.md) for planned Claude Code CLI integration points.

## Development
See [DEVELOPMENT.md](DEVELOPMENT.md) for multi-agent development patterns and orchestrator implementation guidelines.