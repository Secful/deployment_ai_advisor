# Deployment AI Advisor - Repository Overview

## Goal
AI-powered assistant that helps Salt Security customers deploy, troubleshoot, and manage traffic collection across cloud environments through natural language interactions via Claude Code CLI.

## Technical Stack
- Claude Code CLI with Agent framework (Task tool integration) - ✅ Complete with orchestrator
- ✅ MCP (Model Context Protocol) via salt-api-mcp server - Production ready with 2 working tools
- ✅ Multi-agent orchestrator with 5 specialized sub-agents - Complete system implementation
- TypeScript 5.9.2, Node.js 18+ (MCP server implementation) - ✅ Production ready
- ✅ Git-based session history and anonymized learning data - Complete storage and versioning system
- ✅ YAML standardized communication schemas - All sub-agents with retry logic and error handling
- ✅ Mermaid diagram generation - Architecture visualization and flowchart decision trees
- Document360 integration via MCP (available but not yet configured)
- Web search and AWS documentation access (available for future integration)

## Phase 1: Deployment Advisor Orchestrator Implementation
- [SALT-999-deployment-advisor-orchestrator/2025-09-14-SALT-999-deployment-advisor-orchestrator-prd.md](SALT-999-deployment-advisor-orchestrator/2025-09-14-SALT-999-deployment-advisor-orchestrator-prd.md)
- [SALT-999-deployment-advisor-orchestrator/2025-09-14-SALT-999-deployment-advisor-orchestrator-tech-design.md](SALT-999-deployment-advisor-orchestrator/2025-09-14-SALT-999-deployment-advisor-orchestrator-tech-design.md)
- [SALT-999-deployment-advisor-orchestrator/2025-09-14-SALT-999-deployment-advisor-orchestrator-tasks.md](SALT-999-deployment-advisor-orchestrator/2025-09-14-SALT-999-deployment-advisor-orchestrator-tasks.md)
- Status: ✅ **IMPLEMENTATION COMPLETE** - All 55 tasks implemented and deployed as working Claude Code system
- ✅ Multi-Agent Orchestrator System - 6 working Claude Code subagents in `.claude/agents/` with proper YAML frontmatter
- ✅ Specialized Sub-Agents - orchestrator, deployment-advisor, data-extractor, error-handler, validator, reporter
- ✅ Cloud Decision Flowcharts - Complete AWS, Azure, GCP deployment decision trees in `specifications/flowcharts/`
- ✅ /advisor: Commands - 3 working native CLI commands with autocompletion in `.claude/commands/advisor/`
- ✅ Session Storage System - Complete specifications for versioning, anonymized learning, and historical analysis
- ✅ Error Handling - YAML status codes, retry logic, circuit breakers, and escalation specifications implemented
- ✅ Salt API MCP Integration - Production-ready MCP server (TypeScript 5.9.2 + Node.js 18+) with 2 working API tools

## System Specification Status

### ✅ Core Infrastructure - IMPLEMENTED
- **✅ Salt API MCP Server**: Production-ready MCP server with TypeScript 5.9.2, complete API integration (2 working tools)
- **✅ Multi-Agent Orchestrator**: Working orchestrator agent with conversation management, Task tool integration, and response synthesis
- **✅ Request Routing Logic**: Intent recognition implemented in orchestrator with entity extraction capabilities
- **✅ Session Context Management**: Claude Code integration via `.claude/agents/` with native conversation continuity
- **✅ Customer Satisfaction Detection**: Implemented specifications with automatic escalation triggers

### ✅ Agent Framework - IMPLEMENTED
- **✅ Deployment Advisor**: Working Claude Code subagent with flowchart consultation, architecture analysis, and multi-option recommendations
- **✅ Data Extractor**: Working MCP integration agent with Document360 MCP tools and historical session analysis capabilities
- **✅ Error Handler**: Working troubleshooting agent with error pattern matching and architecture-specific solutions
- **✅ Validator**: Working deployment verification agent with SOW comparison and gap analysis reporting
- **✅ Reporter**: Working SOW generation agent with Mermaid diagrams and session storage management
- **✅ Orchestrator**: Working central coordinator with natural language processing and sub-agent coordination
- **✅ Command Integration**: Native CLI slash commands in `.claude/commands/advisor/` directly invoke subagents via Task tool (specifications moved to `specifications/advisor-commands.md`)

### ✅ Decision Trees - IMPLEMENTED
- **✅ AWS API Gateway Flow**: Complete deployment decision tree in `specifications/flowcharts/` with collector selection and prerequisites
- **✅ Azure APIM Flow**: Working architecture-specific guidance with collector recommendations and configuration steps
- **✅ GCP API Gateway Flow**: Complete Google Cloud deployment patterns with service-specific optimizations
- **✅ Deployment Validation Flow**: Working SOW comparison logic with missing component identification

### ✅ Command Integration - IMPLEMENTED
- **✅ /advisor:advise**: Working native CLI command with natural language query processing and autocompletion
- **✅ /advisor:troubleshoot**: Working error analysis command with architecture-aware solutions and verbose output
- **✅ /advisor:validate**: Working deployment verification command with SOW comparison and gap analysis

### ✅ Session Management - IMPLEMENTED SPECIFICATIONS
- **✅ Session Storage**: Complete specifications for real-time storage with direct file writes during conversations
- **✅ Session Versioning**: Semantic versioning (v{major}.{minor}.{patch}) specifications with conflict resolution implemented
- **✅ Anonymized Learning**: Complete customer ID sanitization and resource name UUID replacement specifications
- **✅ Historical Analysis**: Credibility scoring specifications implemented based on recency, similarity, and success factors
- **✅ Metadata Tracking**: Customer satisfaction, performance analytics, and escalation detection specifications complete

### ✅ Error Handling - IMPLEMENTED SPECIFICATIONS
- **✅ YAML Status Codes**: Standardized response handling with success/partial/fail/critical/timeout states implemented
- **✅ Retry Logic**: Exponential backoff with maximum 3 attempts (2^n seconds) implemented across all agents
- **✅ Circuit Breaker Pattern**: MCP service health monitoring with automatic fallback implemented
- **✅ Graceful Degradation**: Fallback for available data sources with tiered functionality implemented
- **✅ Support Escalation**: Automatic escalation with context preservation and handoff procedures implemented