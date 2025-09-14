# Deployment Advisor Orchestrator - Task List

## Relevant Files
- [2025-09-14-SALT-999-deployment-advisor-orchestrator-prd.md](2025-09-14-SALT-999-deployment-advisor-orchestrator-prd.md) :: Deployment Advisor Orchestrator - Product Requirements Document
- [2025-09-14-SALT-999-deployment-advisor-orchestrator-tech-design.md](2025-09-14-SALT-999-deployment-advisor-orchestrator-tech-design.md) :: Technical Design Document
- [agents/orchestrator.md](../../agents/orchestrator.md) :: Main orchestrator agent specification with natural language parsing and sub-agent coordination
- [agents/orchestrator/yaml-schemas/sub-agent-request.yaml](../../agents/orchestrator/yaml-schemas/sub-agent-request.yaml) :: Standardized YAML schema for orchestrator requests to sub-agents
- [agents/orchestrator/yaml-schemas/sub-agent-response.yaml](../../agents/orchestrator/yaml-schemas/sub-agent-response.yaml) :: Standardized YAML schema for sub-agent responses to orchestrator
- [agents/orchestrator/examples/deployment-question-flow.md](../../agents/orchestrator/examples/deployment-question-flow.md) :: Step-by-step example of handling deployment guidance requests
- [agents/orchestrator/request-router.md](../../agents/orchestrator/request-router.md) :: Request routing logic with intent recognition patterns and entity extraction
- [agents/orchestrator/examples/intent-recognition-examples.md](../../agents/orchestrator/examples/intent-recognition-examples.md) :: Comprehensive examples of intent classification and routing decisions
- [agents/deployment-advisor.md](agents/deployment-advisor.md) :: Deployment SME agent for collector recommendations and architecture analysis
- [agents/data-extractor.md](agents/data-extractor.md) :: MCP integration agent with exclusive Document360 access and historical session analysis
- [agents/error-handler.md](agents/error-handler.md) :: Troubleshooting agent for error pattern matching and solution recommendations
- [agents/validator.md](agents/validator.md) :: Deployment verification agent for SOW comparison and validation reporting
- [agents/reporter.md](agents/reporter.md) :: SOW generation agent with Mermaid diagrams and session storage management
- [agents/flowcharts/aws-api-gateway-flow.md](agents/flowcharts/aws-api-gateway-flow.md) :: AWS API Gateway deployment decision tree
- [agents/flowcharts/azure-apim-flow.md](agents/flowcharts/azure-apim-flow.md) :: Azure APIM deployment decision tree
- [agents/flowcharts/deployment-validation-flow.md](agents/flowcharts/deployment-validation-flow.md) :: Deployment validation decision tree
- [agents/commands/advisor-advise.md](agents/commands/advisor-advise.md) :: Command definition for deployment guidance workflow
- [agents/commands/advisor-troubleshoot.md](agents/commands/advisor-troubleshoot.md) :: Command definition for error troubleshooting workflow
- [agents/commands/advisor-validate.md](agents/commands/advisor-validate.md) :: Command definition for deployment validation workflow
- [agents/commands/advisor-report.md](agents/commands/advisor-report.md) :: Command definition for SOW generation workflow

## Notes
- This is a Claude Code Agent System (not traditional program code) delivered as portable .md specification files
- Each agent follows standardized structure: name, description, tools, flows, and YAML communication schema
- Sequential sub-agent processing through Task tool invocation (no parallel execution)
- Session storage uses direct file writes to `/sessions/[customer_id]/[version]/` during conversations
- YAML communication format standardized across all sub-agents with retry logic and escalation handling
- Agent specifications define behavior first, then implementation follows the specification requirements
- All sub-agent communication must use the standardized YAML schema with status, data, errors, and retry_count fields
- MCP integration is centralized through data-extractor agent with exclusive Document360 access control

## TDD Planning Guidelines
When generating tasks, follow Test-Driven Development (TDD) principles where feasible:
- **Agent Specification Testing:** Create agent specification files that define behavior, then implement agent logic
- **YAML Schema Validation:** Define YAML communication schemas, then implement validation logic
- **Command Processing:** Define command specifications, then implement command handlers
- **Flow Testing:** Create flowchart decision trees, then implement consultation logic
- **Session Management:** Define session storage schemas, then implement storage handlers

## Tasks
[X] 1.0 **User Story:** As a DevOps Engineer, I want a central orchestrator agent that understands my deployment questions so that I can get appropriate guidance routed to specialized sub-agents [8/8]
  - [X] 1.1 Create orchestrator agent specification with natural language parsing requirements and YAML communication interface
  - [X] 1.2 Define request routing logic specification with intent recognition patterns (deployment/troubleshooting/validation)
  - [X] 1.3 Implement orchestrator conversation management with Claude Code session context integration
  - [X] 1.4 Create Task tool integration layer with sub-agent invocation patterns and error handling
  - [X] 1.5 Define customer satisfaction detection specification with positive/negative indicators
  - [X] 1.6 Implement retry logic and escalation handling with exponential backoff (max 3 attempts)
  - [X] 1.7 Create response synthesis logic to combine multiple sub-agent outputs into coherent customer responses
  - [X] 1.8 Implement orchestrator agent specification following standardized agent structure (name, description, tools, flows)

[X] 2.0 **User Story:** As a DevOps Engineer, I want deployment decision flowcharts that guide collector recommendations so that I receive consistent, expert-level deployment advice [6/6]
  - [X] 2.1 Create AWS API Gateway deployment flowchart with decision points for collector selection and prerequisites
  - [X] 2.2 Create Azure APIM deployment flowchart with architecture-specific guidance and collector recommendations
  - [X] 2.3 Create GCP API Gateway deployment flowchart covering Google Cloud-specific deployment patterns
  - [X] 2.4 Create deployment validation flowchart with SOW comparison logic and missing component identification
  - [X] 2.5 Define flowchart consultation interface for deployment-advisor agent integration
  - [X] 2.6 Implement flowchart directory structure with version control and markdown format standards

[X] 3.0 **User Story:** As a DevOps Engineer, I want specialized sub-agents for deployment advice, data extraction, error handling, validation, and reporting so that I get comprehensive deployment assistance [15/15]
  - [X] 3.1 Create deployment-advisor agent specification with SME logic, flowchart consultation, and recommendation generation
  - [X] 3.2 Implement deployment-advisor YAML response format with deployment recommendations, confidence scores, and prerequisites
  - [X] 3.3 Create data-extractor agent specification with exclusive Document360 MCP access and historical session analysis
  - [X] 3.4 Implement data-extractor MCP integration logic with Salt API, Document360, and web search coordination
  - [X] 3.5 Define data source priority handling (Product Docs → Customer Data → Historical → Cloud Docs → Community) with credibility scoring
  - [X] 3.6 Create error-handler agent specification with error pattern matching and solution recommendation logic
  - [X] 3.7 Implement error-handler troubleshooting workflow with architecture context integration and escalation triggers
  - [X] 3.8 Create validator agent specification with deployment status comparison and SOW validation logic
  - [X] 3.9 Implement validator current state analysis with missing component identification and validation reporting
  - [X] 3.10 Create reporter agent specification with SOW generation, Mermaid diagram creation, and session storage
  - [X] 3.11 Implement reporter Markdown SOW generation with deployment options table and comprehensiveness ratings
  - [X] 3.12 Create reporter session storage logic with customer-specific and anonymized learning versions
  - [X] 3.13 Define standardized YAML communication schema for all sub-agents with status, data, errors, and retry_count fields
  - [X] 3.14 Implement UUID anonymization logic for resource names in general learning sessions
  - [X] 3.15 Create sub-agent failure detection and reporting mechanisms for orchestrator coordination

[X] 4.0 **User Story:** As a DevOps Engineer, I want case-insensitive `/advisor:` commands for structured workflows so that I can efficiently access deployment, troubleshooting, validation, and reporting functions [8/8]
  - [X] 4.1 Create `/advisor:advise` command specification with deployment guidance workflow integration
  - [X] 4.2 Implement advisor-advise command handler with natural language query processing and deployment-advisor routing
  - [X] 4.3 Create `/advisor:troubleshoot` command specification with error analysis and resolution guidance workflow
  - [X] 4.4 Implement advisor-troubleshoot command handler with error message parsing and error-handler routing
  - [X] 4.5 Create `/advisor:validate` command specification with deployment status verification workflow
  - [X] 4.6 Implement advisor-validate command handler with validator agent integration and SOW comparison
  - [X] 4.7 Create `/advisor:report` command specification with SOW generation and session documentation workflow
  - [X] 4.8 Implement advisor-report command handler with reporter agent integration and Markdown SOW output

[X] 5.0 **User Story:** As a DevOps Engineer, I want session storage and anonymized learning so that my deployment context is preserved and the system improves over time [8/8]
  - [X] 5.1 Define session storage schema with customer_company_id, session_version, workflow_type, and completion_status
  - [X] 5.2 Create session directory structure `/sessions/[customer_id]/[version]/` with conversation, SOW, and metadata files
  - [X] 5.3 Implement real-time session storage with direct file writes during conversation for immediate persistence
  - [X] 5.4 Create session versioning logic with incremental numbering and conflict prevention
  - [X] 5.5 Define anonymized learning session schema with MD5 hash of company_id for general storage
  - [X] 5.6 Implement customer ID sanitization and resource name UUID replacement for anonymized sessions
  - [X] 5.7 Create historical session analysis logic for credibility scoring based on recency and architecture similarity
  - [X] 5.8 Implement session metadata tracking with customer satisfaction indicators and escalation requests

[X] 6.0 **User Story:** As a DevOps Engineer, I want robust error handling with retry logic and support escalation so that I receive reliable guidance even when external services fail [10/10]
  - [X] 6.1 Define YAML status code handling for success/partial/fail responses with structured error arrays
  - [X] 6.2 Create retry logic specification with maximum 3 attempts and exponential backoff (2^n seconds)
  - [X] 6.3 Implement Task tool exception handling with timeout detection and graceful degradation
  - [X] 6.4 Create failure detection mechanisms for YAML status parsing, Task tool exceptions, and operation timeouts
  - [X] 6.5 Define escalation criteria with 5 automatic triggers (3-retry failure, no solution found, critical errors, customer request, repeated patterns)
  - [X] 6.6 Implement circuit breaker pattern for MCP service health monitoring and automatic fallback
  - [X] 6.7 Create graceful degradation logic with fallback to available data sources when external services fail
  - [X] 6.8 Implement support escalation messaging with clear escalation recommendations and context preservation
  - [X] 6.9 Create error aggregation and conflict resolution based on data source priority (Historical → KB → Web → Customer)
  - [X] 6.10 Implement knowledge gap identification and reporting for continuous system improvement