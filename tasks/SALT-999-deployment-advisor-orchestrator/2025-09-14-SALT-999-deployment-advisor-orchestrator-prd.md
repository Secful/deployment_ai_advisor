# Deployment Advisor Orchestrator - Product Requirements Document

## Introduction/Overview
The Deployment Advisor Orchestrator is the central controller for Salt Security's
AI-powered traffic collection deployment assistance system. This orchestrator
manages interactions between DevOps Engineers and specialized sub-agents to
provide deployment recommendations, troubleshooting guidance, and validation
services through Claude Code CLI integration. The system aims to reduce
deployment complexity, minimize support tickets, and accelerate successful
collector implementations.

## Objectives & Success Metrics

**Business Objectives:**
- Enable DevOps Engineers to receive deployment recommendations through
  conversational AI
- Provide automated troubleshooting guidance for common deployment issues
- Create a self-service deployment validation system
- Establish foundation for AI-driven deployment assistance

**Success Metrics:**
- **System Functionality**: Orchestrator successfully coordinates sub-agents and
  returns deployment recommendations for user queries
- **User Adoption**: DevOps Engineers successfully complete deployment guidance
  sessions using the orchestrator
- **Response Completeness**: System provides actionable deployment
  recommendations with specific next steps
- **Error Handling**: System gracefully handles sub-agent failures and provides
  meaningful feedback to users
- **Session Completion**: Users complete their deployment guidance workflows
  without system errors or crashes

## User Personas & Use Cases

### User Personas
**Primary: DevOps Engineer**: Technical professional responsible for collector
deployment
- **Characteristics**: Cloud platform expertise (AWS/Azure/GCP), infrastructure
  automation experience, security-conscious
- **Needs**: Clear deployment guidance, troubleshooting support, validation
  tools, architectural recommendations
- **Goals**: Deploy collectors efficiently, ensure comprehensive traffic
  coverage, minimize deployment risks

**Secondary: Solution Architect**: Senior technical advisor for complex
deployments
- **Characteristics**: Multi-cloud expertise, enterprise architecture knowledge,
  customer-facing role
- **Needs**: Deployment strategy validation, best practices guidance,
  scalability recommendations
- **Goals**: Design optimal collector architectures, ensure customer success,
  reduce implementation complexity

### User Stories
- As a DevOps Engineer, I want to ask "What collector should I use for my AWS
  API Gateway?" so that I get specific recommendations for my architecture
- As a DevOps Engineer, I want to troubleshoot "Permission denied errors during
  collector setup" so that I can resolve deployment blockers quickly
- As a DevOps Engineer, I want to validate "Is my collector deployment
  complete?" so that I can confirm successful implementation
- As a Solution Architect, I want to generate deployment SOW documents so that
  I can provide detailed implementation plans to customers

### Use Cases
1. **Initial Deployment Guidance**: Engineer asks architecture-specific
   questions and receives tailored collector recommendations with prerequisites
2. **Error Troubleshooting**: Engineer reports deployment errors and receives
   step-by-step resolution guidance based on their specific architecture
3. **Deployment Validation**: Engineer requests verification that their
   collector setup is complete and functioning correctly
4. **Command-Driven Workflows**: Engineer uses structured commands for
   streamlined deployment processes

## Feature Scope

### In Scope
- Natural language conversation handling via Claude Code CLI
- Sub-agent coordination and workflow management (Deployment Advisor, Data
  Extractor, Error Handler, Validator, Reporter)
- Command-based interaction with `/advisor:` prefix
- Session continuity and context preservation
- Multi-turn conversation support with clarifying questions
- Integration with all MCP services (Salt API, Document360, Context7, Web Search)
- Error handling and graceful degradation
- Customer satisfaction detection and response adjustment

### Out of Scope
- Direct UI/web interface (Claude Code CLI only)
- Multi-language support (English only)
- Integration with support ticketing systems
- Real-time deployment monitoring
- Automated collector installation (guidance only)

### Future Considerations
- Web dashboard integration
- Multi-language conversation support
- Advanced analytics and reporting
- Integration with Salt Security console

## Functional Requirements

### Cucumber/Gherkin Scenarios
```gherkin
Feature: Deployment Advisor Orchestrator

Scenario: Initial deployment guidance request
  Given a DevOps Engineer is connected via Claude Code CLI
  When they ask "What collector should I use for my AWS API Gateway setup?"
  Then the orchestrator should trigger the Deployment Advisor sub-agent
  And coordinate with Data Extractor to gather cloud asset information
  And return specific collector recommendations with prerequisites
  And provide implementation guidance

Scenario: Error troubleshooting workflow
  Given a DevOps Engineer encounters a deployment error
  When they report "I'm getting permission denied errors"
  Then the orchestrator should trigger the Error & Solution Handler
  And analyze the error against their architecture
  And provide step-by-step resolution guidance
  And offer to validate the fix when applied

Scenario: Command-based deployment validation
  Given a DevOps Engineer has completed collector setup
  When they run "/advisor:validate"
  Then the orchestrator should trigger the Validator sub-agent
  And compare deployment status against SOW requirements
  And return validation results with any missing components
  And confirm successful deployment or suggest corrections

Scenario: Multi-turn conversation continuity
  Given an ongoing deployment guidance session
  When the DevOps Engineer asks follow-up questions
  Then the orchestrator should maintain previous context
  And provide relevant answers based on conversation history
  And ask clarifying questions when needed for better guidance

Scenario: Sub-agent coordination with retry logic
  Given the orchestrator calls a sub-agent
  When the sub-agent returns a "partial fail" status
  Then the orchestrator should retry the operation up to 3 times
  And escalate to alternative approaches if retries fail
  And maintain transparent communication with the user
```

### Detailed Requirements

1. **Conversation Management**: The orchestrator must maintain conversation
   state across multiple interactions and preserve context for follow-up
   questions

2. **Request Routing**: The system must analyze user queries and route them to
   appropriate sub-agents based on intent (deployment, troubleshooting,
   validation)

3. **Sub-Agent Coordination**: The orchestrator must coordinate between
   multiple sub-agents, handle their JSON responses, and synthesize coherent
   answers

4. **Command Processing**: The system must support structured commands with
   `/advisor:` prefix for common workflows (advise, troubleshoot, validate,
   report)

5. **Natural Language Processing**: The orchestrator must understand deployment-
   related queries and extract key information (cloud provider, services, error
   messages)

6. **Error Handling**: The system must gracefully handle sub-agent failures,
   external service outages, and provide meaningful feedback to users

7. **Session Management**: The orchestrator must track session progress and
   customer satisfaction indicators to adjust response strategies

## Non-Functional Requirements

### Performance
- **Response Time**: Initial response within 5 seconds, complete workflow under
  30 seconds
- **Throughput**: Support 10 concurrent user sessions without degradation
- **Sub-Agent Coordination**: Complete multi-agent workflows within 45 seconds

### Security
- **Authentication**: Leverage Claude Code CLI session authentication
- **Data Privacy**: No customer-specific identifiers stored permanently
- **Session Isolation**: Complete isolation between different customer sessions
- **MCP Security**: Secure credential management for all external service
  integrations

### Usability
- **Natural Language**: Support conversational English for deployment topics
- **Command Consistency**: Standardized `/advisor:` command structure across
  all workflows
- **Error Messages**: Clear, actionable error messages without technical jargon
- **Progress Indicators**: Clear communication during multi-step processes

### Reliability
- **Uptime**: 99.5% availability during business hours
- **Error Recovery**: Graceful degradation when sub-agents or external services
  fail
- **Retry Logic**: Automatic retry with exponential backoff for transient
  failures
- **Fallback Strategies**: Alternative approaches when primary workflows fail

### Architecture
- **Design Pattern**: System must follow **Clean Architecture** principles
- **Layer Separation**: Clear separation between orchestration logic, sub-agent
  coordination, and external integrations
- **Dependency Inversion**: Dependencies flow inward toward orchestration core
- **Testability**: Mockable interfaces for all sub-agent and external service
  interactions

## Dependencies & Risks

### Dependencies
- **Internal Dependencies**:
  - Deployment Advisor sub-agent implementation
  - Data Extractor sub-agent with MCP integrations
  - Error & Solution Handler sub-agent
  - Validator sub-agent
  - Reporter sub-agent
- **External Dependencies**:
  - Salt API MCP Server (implemented)
  - Document360 MCP Server (planned)
  - Context7 MCP Server integration
  - Web Search MCP integration
  - Claude Code CLI framework

### Risks
- **Sub-Agent Development Complexity**: Multiple specialized agents need
  coordinated development - *Mitigation*: Phased implementation starting with
  core agents
- **MCP Integration Dependencies**: External MCP services may not be ready -
  *Mitigation*: Implement graceful degradation and mock services for testing
- **Natural Language Understanding**: Complex deployment queries may be
  misunderstood - *Mitigation*: Implement clarifying question workflows and
  fallback to structured commands
- **Multi-Agent Coordination**: Complex workflows may have race conditions or
  deadlocks - *Mitigation*: Implement timeout handling and circuit breakers
- **Customer Context Preservation**: Long conversations may lose important
  context - *Mitigation*: Implement structured session state management

## Open Questions
- Should the orchestrator support parallel sub-agent execution for performance,
  or sequential for simplicity?
- How should we handle conflicting recommendations from different data sources
  (KB vs web search vs historical data)?
- What's the optimal retry strategy when multiple sub-agents fail
  simultaneously?
- Should command shortcuts be case-sensitive or case-insensitive for better UX?
- How do we balance conversation naturalness with structured data collection
  needs?