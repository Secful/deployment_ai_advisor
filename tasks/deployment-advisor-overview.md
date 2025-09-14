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
- Status: Documentation phase - All 55 tasks documented across 6 major user stories
- Multi-Agent Orchestrator System - Central orchestrator specification with natural language processing and sub-agent coordination
- 5 Specialized Sub-Agents - Deployment advisor, data extractor, error handler, validator, and reporter specifications
- Cloud Decision Flowcharts - AWS API Gateway, Azure APIM, and GCP API Gateway deployment decision trees with Mermaid diagrams
- 4 /advisor: Commands - Command specifications for advise, troubleshoot, validate, and report workflows
- Session Storage System - Customer-specific session versioning specifications with anonymized learning and historical analysis
- Error Handling - Retry logic, circuit breakers, graceful degradation, and automatic escalation specifications
- Salt API MCP Integration - Functional MCP server for Salt Security Cloud Assets API access (2 working tools)

## System Specification Status

### Core Infrastructure
- **Salt API MCP Server**: Functional MCP server with TypeScript 5.9.2, API integration (2 working tools)
- **Multi-Agent Orchestrator**: Orchestrator specification with conversation management, task integration, retry logic, and response synthesis
- **Request Routing Logic**: Intent recognition pattern specifications (deployment/troubleshooting/validation) with entity extraction
- **Session Context Management**: Claude Code session integration specifications with conversation continuity
- **Customer Satisfaction Detection**: Positive/negative indicator specifications with automatic escalation triggers

### Agent Framework Specifications
- **Deployment Advisor**: SME agent specification with flowchart consultation, architecture analysis, and multi-option recommendations
- **Data Extractor**: MCP integration agent specification with Document360 access and historical session analysis
- **Error Handler**: Troubleshooting agent specification with error pattern matching and architecture-specific solutions
- **Validator**: Deployment verification agent specification with SOW comparison and gap analysis reporting
- **Reporter**: SOW generation agent specification with Mermaid diagrams and session storage management

### Decision Trees
- **AWS API Gateway Flow**: Deployment decision tree specification with collector selection and prerequisites
- **Azure APIM Flow**: Architecture-specific guidance specification with collector recommendations and configuration steps
- **GCP API Gateway Flow**: Google Cloud deployment pattern specifications with service-specific optimizations
- **Deployment Validation Flow**: SOW comparison logic specification with missing component identification

### Command Integration Specifications
- **/advisor:advise**: Deployment guidance workflow specification with natural language query processing
- **/advisor:troubleshoot**: Error analysis and resolution guidance specification with architecture-aware solutions
- **/advisor:validate**: Deployment status verification specification with SOW comparison and gap analysis
- **/advisor:report**: SOW generation and session documentation specification with Mermaid diagrams

### Session Management Specifications
- **Session Storage**: Real-time storage specifications with direct file writes during conversations
- **Session Versioning**: Semantic versioning (v{major}.{minor}.{patch}) specifications with conflict resolution
- **Anonymized Learning**: Customer ID sanitization and resource name UUID replacement specifications
- **Historical Analysis**: Credibility scoring specifications based on recency, similarity, and success factors
- **Metadata Tracking**: Customer satisfaction indicator, performance analytics, and escalation detection specifications

### Error Handling Specifications
- **YAML Status Codes**: Standardized response handling specifications with success/partial/fail/critical/timeout states
- **Retry Logic**: Exponential backoff specifications with maximum 3 attempts (2^n seconds)
- **Circuit Breaker Pattern**: MCP service health monitoring specifications with automatic fallback
- **Graceful Degradation**: Fallback specifications for available data sources with tiered functionality
- **Support Escalation**: Automatic escalation specifications with context preservation and handoff procedures