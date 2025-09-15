# Intent Recognition Examples

This document provides concrete examples of how the request router classifies different user queries and routes them to appropriate sub-agents.

## Deployment Intent Examples

### Example 1: Direct Collector Question
**User Query**: "What collector should I use for my AWS API Gateway?"

**Analysis**:
- **Primary Keywords**: "collector" (0.4), "use" (0.2)
- **Pattern Match**: "What collector should I use for {service}?" (0.3)
- **Entities**: cloud_provider="aws", service="api_gateway"
- **Context**: New conversation, no previous errors

**Intent Scores**:
- Deployment: 0.85 (high keyword + pattern match)
- Troubleshooting: 0.15
- Validation: 0.1
- Reporting: 0.05

**Routing Decision**:
```yaml
target_subagent: "deployment_advisor"
confidence_score: 0.85
extracted_entities:
  cloud_provider: "aws"
  services: ["api_gateway"]
  action_intent: "deploy"
routing_rationale: "Clear deployment question with specific service mention"
```

### Example 2: Prerequisites Question
**User Query**: "Do I have all the prerequisites to install a collector on Azure APIM?"

**Analysis**:
- **Primary Keywords**: "prerequisites" (0.3), "install" (0.4), "collector" (0.4)
- **Pattern Match**: "prerequisites for {service}" (0.3)
- **Entities**: cloud_provider="azure", service="apim"

**Intent Scores**:
- Deployment: 0.82
- Validation: 0.25 (prerequisites checking aspect)
- Troubleshooting: 0.1

**Routing Decision**:
```yaml
target_subagent: "deployment_advisor"
confidence_score: 0.82
extracted_entities:
  cloud_provider: "azure"
  services: ["apim"]
  action_intent: "deploy"
  focus: "prerequisites"
```

## Troubleshooting Intent Examples

### Example 3: Permission Error
**User Query**: "I'm getting permission denied errors when trying to set up the collector"

**Analysis**:
- **Primary Keywords**: "error" (0.4), "permission denied" (0.5)
- **Pattern Match**: "I'm getting {error_type} error" (0.3)
- **Error Classification**: permission_error
- **Entities**: error_type="permission_denied"

**Intent Scores**:
- Troubleshooting: 0.88
- Deployment: 0.2 (setup mention)
- Validation: 0.15

**Routing Decision**:
```yaml
target_subagent: "error_handler"
confidence_score: 0.88
extracted_entities:
  error_types: ["permission_error"]
  action_intent: "troubleshoot"
routing_rationale: "Clear error report with specific error type"
```

### Example 4: Deployment Failure
**User Query**: "Collector deployment is failing with timeout errors on AWS Lambda"

**Analysis**:
- **Primary Keywords**: "failing" (0.4), "timeout errors" (0.5)
- **Pattern Match**: "deployment is failing with {error}" (0.3)
- **Entities**: cloud_provider="aws", service="lambda", error_type="timeout"

**Intent Scores**:
- Troubleshooting: 0.85
- Deployment: 0.3 (deployment context)

**Routing Decision**:
```yaml
target_subagent: "error_handler"
confidence_score: 0.85
extracted_entities:
  cloud_provider: "aws"
  services: ["lambda"]
  error_types: ["timeout_error"]
  action_intent: "troubleshoot"
```

## Validation Intent Examples

### Example 5: Deployment Completion Check
**User Query**: "Is my collector setup complete and working properly?"

**Analysis**:
- **Primary Keywords**: "complete" (0.4), "working" (0.3)
- **Pattern Match**: "Is my {component} complete?" (0.3)
- **Context**: Follows deployment conversation

**Intent Scores**:
- Validation: 0.78
- Deployment: 0.2
- Troubleshooting: 0.15

**Routing Decision**:
```yaml
target_subagent: "validator"
confidence_score: 0.78
extracted_entities:
  action_intent: "validate"
routing_rationale: "Direct validation question about deployment status"
```

### Example 6: Command-Based Validation
**User Query**: "/advisor:validate"

**Analysis**:
- **Command Pattern**: Direct command match
- **Intent**: Explicit validation request

**Routing Decision**:
```yaml
target_subagent: "validator"
confidence_score: 1.0
extracted_entities:
  action_intent: "validate"
routing_rationale: "Explicit validation command"
```

## Reporting Intent Examples

### Example 7: SOW Generation Request
**User Query**: "Can you generate a deployment SOW document for my setup?"

**Analysis**:
- **Primary Keywords**: "generate" (0.3), "SOW" (0.5), "document" (0.3)
- **Pattern Match**: "Generate {document_type}" (0.3)

**Intent Scores**:
- Reporting: 0.82
- Deployment: 0.15

**Routing Decision**:
```yaml
target_subagent: "reporter"
confidence_score: 0.82
extracted_entities:
  action_intent: "report"
  document_type: "sow"
```

## Ambiguous Query Examples

### Example 8: Multi-Intent Query
**User Query**: "I want to deploy a collector but I'm getting permission errors"

**Analysis**:
- **Deployment Keywords**: "deploy" (0.4), "collector" (0.4)
- **Troubleshooting Keywords**: "permission errors" (0.5)
- **Pattern Match**: Both deployment and troubleshooting patterns

**Intent Scores**:
- Deployment: 0.65
- Troubleshooting: 0.72

**Routing Decision**:
```yaml
target_subagent: "error_handler"
confidence_score: 0.72
extracted_entities:
  error_types: ["permission_error"]
  action_intent: "troubleshoot"
routing_rationale: "Error resolution takes priority; will recommend deployment after fix"
fallback_plan: "Route to deployment_advisor after error resolution"
```

### Example 9: Low Confidence Query
**User Query**: "Help me with my setup"

**Analysis**:
- **Primary Keywords**: "help" (0.2), "setup" (0.3)
- **Context**: No specific entities or clear intent

**Intent Scores**:
- Deployment: 0.45
- Troubleshooting: 0.35
- Validation: 0.25

**Routing Decision**:
```yaml
clarification_needed: true
confidence_score: 0.45
clarification_message: "I'd be happy to help with your setup. Could you tell me more about what you're trying to do?"
clarification_options:
  - "Deploy a new collector"
  - "Fix an issue with existing deployment"
  - "Validate current setup"
  - "Generate deployment documentation"
```

## Context-Aware Routing Examples

### Example 10: Conversation Continuity
**Previous Context**: User asked about AWS API Gateway collector deployment
**User Query**: "That sounds good. How do I validate it's working correctly?"

**Analysis**:
- **Context Integration**: Previous deployment discussion (weight: 0.3)
- **Current Intent**: "validate" (0.4), "working correctly" (0.3)
- **Maintained Entities**: cloud_provider="aws", service="api_gateway"

**Routing Decision**:
```yaml
target_subagent: "validator"
confidence_score: 0.78
extracted_entities:
  cloud_provider: "aws"  # from context
  services: ["api_gateway"]  # from context
  action_intent: "validate"
routing_rationale: "Validation request with maintained deployment context"
```

### Example 11: Error Context Progression
**Previous Context**: User reported permission errors
**User Query**: "I fixed the permissions. Can you help me continue the deployment?"

**Analysis**:
- **Error Context**: Previous troubleshooting session (weight: 0.3)
- **Resolution Indicated**: "fixed the permissions" (satisfaction indicator)
- **New Intent**: "continue the deployment" (0.4)

**Routing Decision**:
```yaml
target_subagent: "deployment_advisor"
confidence_score: 0.82
extracted_entities:
  action_intent: "deploy"
  context_note: "continuing after error resolution"
routing_rationale: "Resume deployment after successful error resolution"
```

These examples demonstrate how the request router handles various query types, maintains context, and makes intelligent routing decisions to ensure users get appropriate assistance from specialized sub-agents.