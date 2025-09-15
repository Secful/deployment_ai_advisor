# Traffic Collection Deployment AI Agent

## Overview
AI assistant system for Salt Security customers to deploy, troubleshoot, and manage traffic collection across cloud environments through Claude Code CLI interactions.

## Implemented Components
- **Multi-Agent Orchestrator**: Central orchestrator with natural language processing and sub-agent coordination
- **Sub-Agent Specifications**: 5 agent specifications (deployment-advisor, data-extractor, error-handler, validator, reporter)
- **Claude Code Slash Commands**: Native CLI commands with autocompletion (`/advisor:advise`, `/advisor:troubleshoot`, `/advisor:validate`, `/advisor:report`)
- **Cloud Decision Flowcharts**: Decision trees for AWS API Gateway, Azure APIM, and GCP API Gateway deployments
- **Session Storage**: Customer session versioning with anonymized data handling
- **Error Handling**: Retry logic specifications, circuit breaker patterns, and escalation procedures
- **Salt API MCP Integration**: MCP server with 2 functional tools (list_cloud_assets, get_cloud_asset)

## Current Status
✅ **PRODUCTION READY** - Complete multi-agent orchestrator system with working Claude Code integration:

1. **✅ MCP Data Layer**: Functional salt-api-mcp server with 2 working API tools (TypeScript 5.9.2 + Node.js 18+)
2. **✅ Multi-Agent Orchestrator**: 6 working Claude Code subagents deployed in `.claude/agents/` with proper YAML frontmatter
3. **✅ Claude Code Slash Commands**: 3 native CLI commands with autocompletion in `.claude/commands/advisor/`
4. **✅ Decision Flowcharts**: Complete AWS, Azure, GCP deployment decision trees in `specifications/flowcharts/`
5. **✅ Session Management**: Complete specifications for versioning, storage, and anonymized learning
6. **✅ Error Handling**: Comprehensive retry logic and escalation specifications with YAML status codes

## Claude Code Slash Commands
The system implements native Claude Code CLI slash commands with autocompletion and structured argument hints:

### Available Commands
- **`/advisor:advise`** - Get expert deployment recommendations with flowchart consultation
  - Arguments: `[deployment_query] [--cloud-provider] [--expertise-level] [--detail-level] [--include-sow]`
  - Example: `/advisor:advise "AWS API Gateway setup" --detail-level comprehensive`

- **`/advisor:troubleshoot`** - Analyze deployment errors and provide step-by-step resolution guidance
  - Arguments: `[error_description] [--cloud-provider] [--deployment-stage] [--verbose]`
  - Example: `/advisor:troubleshoot "403 permission errors" --cloud-provider aws --verbose`

- **`/advisor:validate`** - Verify deployment completeness against SOW requirements and best practices
  - Arguments: `[validation_scope] [--validation-depth] [--focus-areas] [--report-format]`
  - Example: `/advisor:validate "deployment completeness" --validation-depth comprehensive`


### Technical Implementation
- **Location**: `.claude/commands/advisor/*.md` files with YAML frontmatter
- **Integration**: Each command uses Task tool to invoke corresponding sub-agent
- **Autocompletion**: Native Claude Code CLI argument hints and command discovery
- **Workflow**: Commands delegate to orchestrator agent for sub-agent coordination

## Technology Stack
**Runtime Environment:**
- ✅ Claude Code CLI with native subagent discovery (`.claude/agents/`)
- ✅ Native slash commands with autocompletion (`.claude/commands/advisor/`)
- ✅ Task tool integration for multi-agent coordination

**Data Layer:**
- ✅ MCP (Model Context Protocol) - salt-api-mcp server (TypeScript 5.9.2 + Node.js 18+)
- ✅ Salt Security Cloud Assets API integration (2 working tools)
- ✅ Bearer token authentication via environment variables

**Architecture:**
- ✅ Multi-agent orchestrator system (7 specialized subagents)
- ✅ YAML frontmatter configuration for Claude Code compatibility
- ✅ Task-based inter-agent communication
- ✅ Git-based session storage specifications
- ✅ Cloud-specific deployment flowcharts with Mermaid diagrams
- ✅ YAML status codes and retry logic specifications

## Architecture
See [ARCHITECTURE.md](ARCHITECTURE.md) for multi-agent orchestrator system design.

## API
See [API.md](API.md) for Claude Code CLI integration points.

## Development
See [DEVELOPMENT.md](DEVELOPMENT.md) for multi-agent development patterns and orchestrator implementation guidelines.