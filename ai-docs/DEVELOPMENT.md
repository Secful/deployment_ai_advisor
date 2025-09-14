# Development Guide

## Multi-Agent Development Patterns

### Agent Structure Requirements
Each sub-agent must follow this standard structure:

```markdown
# Agent Name: [agent-name]
## Description
[Single line description with responsibility focus]

## Tools Available
["Tool1", "Tool2", "MCP__service__*"]

## Input/Output Contract
- **Input**: [JSON schema description]
- **Output**: [JSON schema with status reporting]

## Flows
[Explicit workflow descriptions with examples]
```

### Inter-Agent Communication Protocol

#### JSON Message Format
All sub-agents communicate via standardized JSON:

```typescript
interface AgentResponse {
  status: "success" | "partial" | "fail";
  data: any;
  errors?: string[];
  retry_count?: number;
  knowledge_gaps?: string[];
  external_diffs?: SourceConflict[];
}
```

#### Retry Logic Implementation
- Maximum 3 retry attempts for failed responses
- Exponential backoff between retries
- Partial failures trigger targeted retry of failed components

### Orchestrator Implementation Patterns

#### Request Routing Logic
```typescript
interface RoutingDecision {
  primaryAgent: string;
  supportingAgents: string[];
  dataRequirements: string[];
  expectedOutputs: string[];
}
```

#### Conversation Continuity
- Maintain context across multi-turn conversations
- Track customer satisfaction and completion signals
- Handle clarifying questions and iterative refinement

### Sub-Agent Specialization Guidelines

#### Deployment Advisor Patterns
- **Architecture Analysis**: Cloud asset pattern recognition
- **Recommendation Engine**: Multi-criteria decision matrix
- **Gap Analysis**: Missing prerequisite identification
- **Customer Interaction**: Guided questioning strategies

#### Data Extractor Patterns
- **MCP Integration**: Standardized data source abstraction
- **Historical Analysis**: Session similarity scoring
- **Credibility Assessment**: Data source reliability weighting
- **Cache Management**: Intelligent data freshness strategies

#### Error Handler Patterns
- **Error Classification**: Pattern matching and categorization
- **Solution Ranking**: Success probability and effort scoring
- **Learning Integration**: Feedback loop for solution effectiveness
- **Escalation Logic**: Clear criteria for human handoff

#### Validator Patterns
- **Diff Analysis**: SOW vs actual status comparison
- **Health Checking**: Deployment status verification
- **Traffic Validation**: Data flow confirmation
- **Completion Scoring**: Success metric calculation

#### Reporter Patterns
- **SOW Generation**: Template-driven document creation
- **Anonymization**: PII removal and UUID substitution
- **Version Management**: Incremental session tracking
- **Storage Organization**: Structured data persistence

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

### Project Organization
```
agents/
├── orchestrator/
│   ├── agent.md
│   ├── flows/
│   └── handlers/
├── deployment-advisor/
│   ├── agent.md
│   ├── recommendation-engine/
│   └── architecture-analysis/
├── data-extractor/
│   ├── agent.md
│   ├── mcp-clients/
│   └── history-analysis/
├── error-handler/
│   ├── agent.md
│   ├── pattern-matching/
│   └── solution-ranking/
├── validator/
│   ├── agent.md
│   └── diff-analysis/
└── reporter/
    ├── agent.md
    ├── sow-templates/
    └── anonymization/
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