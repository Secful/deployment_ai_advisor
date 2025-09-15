# Development Guide

## Multi-Agent Development Patterns

### Agent Structure Requirements
Each sub-agent follows this implemented standard structure:

```markdown
name: [agent-name]
description: "[Single line description with responsibility focus]"
tools: ["Tool1", "Tool2", "MCP__service__*"]

# Agent Name Specification
## Overview
[Purpose and core responsibilities]

## Communication Schemas
[YAML input/output contracts]

## Flows
[Implemented workflow descriptions with examples]
```

All agents implemented with this structure at agents/[agent-name].md

### Inter-Agent Communication Protocol

#### YAML Message Format
All sub-agents communicate via standardized YAML schema at agents/orchestrator/yaml-schemas/:

```yaml
# Sub-agent response format
status: "success" | "partial" | "fail" | "critical" | "timeout"
data: [agent-specific response data]
errors: [structured error array]
retry_count: [attempt number]
knowledge_gaps: [identified missing information]
external_diffs: [data source conflicts]
```

#### Retry Logic Implementation
- Maximum 3 retry attempts for failed responses
- Exponential backoff between retries (2^n seconds)
- Partial failures trigger targeted retry of failed components
- Complete implementation at agents/error-handling-retry.md

### Orchestrator Implementation Patterns

#### Request Routing Logic
Complete implementation at agents/orchestrator/request-router.md with intent recognition patterns:

```yaml
routing_decision:
  primary_agent: [agent-name]
  supporting_agents: [list of agents]
  data_requirements: [required data sources]
  expected_outputs: [output format specifications]
```

#### Conversation Continuity
- Maintain context across multi-turn conversations
- Track customer satisfaction and completion signals
- Handle clarifying questions and iterative refinement
- Complete implementation at agents/orchestrator.md

### Sub-Agent Specialization Guidelines

#### Deployment Advisor Patterns
- **Architecture Analysis**: Cloud asset pattern recognition
- **Recommendation Engine**: Multi-criteria decision matrix
- **Gap Analysis**: Missing prerequisite identification
- **Customer Interaction**: Guided questioning strategies
- **Complete implementation**: agents/deployment-advisor.md

#### Data Extractor Patterns
- **MCP Integration**: Standardized data source abstraction
- **Historical Analysis**: Session similarity scoring
- **Credibility Assessment**: Data source reliability weighting
- **Cache Management**: Intelligent data freshness strategies
- **Complete implementation**: agents/data-extractor.md

#### Error Handler Patterns
- **Error Classification**: Pattern matching and categorization
- **Solution Ranking**: Success probability and effort scoring
- **Learning Integration**: Feedback loop for solution effectiveness
- **Escalation Logic**: Clear criteria for human handoff
- **Complete implementation**: agents/error-handler.md

#### Validator Patterns
- **Diff Analysis**: SOW vs actual status comparison
- **Health Checking**: Deployment status verification
- **Traffic Validation**: Data flow confirmation
- **Completion Scoring**: Success metric calculation
- **Complete implementation**: agents/validator.md

#### Reporter Patterns
- **SOW Generation**: Template-driven document creation
- **Anonymization**: PII removal and UUID substitution
- **Version Management**: Incremental session tracking
- **Storage Organization**: Structured data persistence
- **Complete implementation**: agents/reporter.md

## Technology Stack Guidelines

### Claude Code Integration
- **Agent Invocation**: Task tool usage patterns
- **Command Integration**: Salt command framework alignment
- **Session Management**: Claude Code context preservation
- **Error Handling**: Graceful degradation and recovery

### MCP Protocol Implementation
- **Tool Registration**: Standard MCP tool discovery
- **Request Handling**: Asynchronous operation patterns
- **Error Propagation**: MCP-compliant error responses
- **Schema Validation**: Runtime type checking with Zod

### Storage Architecture
- **Git-based Persistence**: Version-controlled session history
- **File Organization**: Hierarchical directory structure
- **JSON Serialization**: Standardized data formats
- **Backup Strategy**: Redundant storage considerations

## Code Structure Standards

### Project Organization - Implemented
```
agents/
├── orchestrator.md                    # Central orchestrator specification
├── orchestrator/
│   ├── request-router.md             # Intent recognition and routing logic
│   ├── yaml-schemas/                 # Communication protocol definitions
│   └── examples/                     # Implementation examples
├── deployment-advisor.md             # SME deployment guidance agent
├── data-extractor.md                 # MCP integration and data access
├── error-handler.md                  # Troubleshooting and error resolution
├── validator.md                      # Deployment verification agent
├── reporter.md                       # SOW generation and session storage
├── flowcharts/                       # Decision tree implementations
├── commands/                         # /advisor: command specifications
├── session-*.md                      # Session management components
└── error-handling-*.md              # Error handling implementations
```

### Naming Conventions
- **Agent Names**: kebab-case with descriptive purpose
- **Function Names**: camelCase with action-oriented naming
- **File Names**: kebab-case with clear content indication
- **Variable Names**: camelCase with context-specific naming

### Error Handling Standards
- **Graceful Degradation**: Partial functionality over complete failure
- **User-Friendly Messages**: Clear, actionable error descriptions
- **Logging Strategy**: Structured logging with appropriate levels
- **Recovery Mechanisms**: Automatic retry and fallback strategies