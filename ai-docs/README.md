# Traffic Collection Deployment AI Agent

## Overview
AI assistant system for Salt Security customers to deploy, troubleshoot, and manage traffic collection across cloud environments through Claude Code CLI interactions.

## Implemented Components
- **Multi-Agent Orchestrator**: Central orchestrator with natural language processing and sub-agent coordination
- **Sub-Agent Specifications**: 5 agent specifications (deployment-advisor, data-extractor, error-handler, validator, reporter)
- **Cloud Decision Flowcharts**: Decision trees for AWS API Gateway, Azure APIM, and GCP API Gateway deployments
- **Command Integration**: 4 `/advisor:` command specifications (advise, troubleshoot, validate, report)
- **Session Storage**: Customer session versioning with anonymized data handling
- **Error Handling**: Retry logic specifications, circuit breaker patterns, and escalation procedures
- **Salt API MCP Integration**: MCP server with 2 functional tools (list_cloud_assets, get_cloud_asset)

## Current Status
Complete multi-agent orchestrator system with specifications and functional data layer:

1. **MCP Data Layer**: Functional salt-api-mcp server with 2 working API tools
2. **Multi-Agent Orchestrator**: Complete orchestrator specification with 5 specialized sub-agents
3. **Decision Flowcharts**: AWS, Azure, GCP deployment decision trees with Mermaid diagrams
4. **Command Integration**: 4 `/advisor:` commands fully specified with workflow definitions
5. **Session Management**: Complete versioning, storage, and anonymized learning system
6. **Error Handling**: Comprehensive retry logic, escalation triggers, and failure recovery

## Technology Stack
- **Runtime Environment**: Claude Code CLI with Task tool integration
- **Data Access**: MCP (Model Context Protocol) via salt-api-mcp server
- **Architecture**: Multi-agent orchestrator system with 5 specialized sub-agents
- **Storage**: Git-based session history and anonymized learning data specifications
- **Decision Support**: Cloud-specific deployment flowcharts with Mermaid diagrams
- **Error Management**: YAML status codes, retry logic, and circuit breaker pattern specifications

## Architecture
See [ARCHITECTURE.md](ARCHITECTURE.md) for multi-agent orchestrator system design.

## API
See [API.md](API.md) for Claude Code CLI integration points.

## Development
See [DEVELOPMENT.md](DEVELOPMENT.md) for multi-agent development patterns and orchestrator implementation guidelines.