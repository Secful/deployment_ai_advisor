# Request Router Specification

## Overview
The request router analyzes user queries to determine intent and route requests to appropriate sub-agents. It implements pattern matching, entity extraction, and contextual analysis to ensure accurate request routing.

## Core Functions

### 1. Intent Classification
Routes user queries to the correct sub-agent workflow:

- **Deployment Intent** → Deployment Advisor
- **Troubleshooting Intent** → Error Handler
- **Validation Intent** → Validator
- **Reporting Intent** → Reporter
- **Data Extraction Intent** → Data Extractor (via other agents)

### 2. Entity Extraction
Identifies key entities from user queries:

- **Cloud Providers**: AWS, Azure, GCP
- **Services**: API Gateway, APIM, Lambda, VPC, etc.
- **Error Types**: Permission denied, timeout, configuration error
- **Action Words**: deploy, troubleshoot, validate, report, check

## Intent Recognition Patterns

### Deployment Intent Patterns
```yaml
deployment_indicators:
  primary_keywords:
    - "collector"
    - "deploy"
    - "install"
    - "setup"
    - "configure"
    - "recommendation"
    - "which collector"
    - "what collector"
    - "how to deploy"
  question_patterns:
    - "What collector should I use for {service}?"
    - "How do I deploy collector on {cloud_provider}?"
    - "Which collector works with {service}?"
    - "What are the prerequisites for {collector_type}?"
    - "How to setup collector for {architecture}?"
  context_indicators:
    - mentions cloud services (API Gateway, APIM, Lambda)
    - asks about architecture compatibility
    - requests deployment guidance
    - mentions traffic collection needs
```

### Troubleshooting Intent Patterns
```yaml
troubleshooting_indicators:
  primary_keywords:
    - "error"
    - "issue"
    - "problem"
    - "failing"
    - "not working"
    - "permission denied"
    - "timeout"
    - "connection failed"
  question_patterns:
    - "I'm getting {error_type} error"
    - "Collector deployment is failing with {error_message}"
    - "Permission denied when {action}"
    - "Can't connect to {service}"
    - "Setup is not working because {reason}"
  error_classifications:
    permission_errors:
      - "permission denied"
      - "access denied"
      - "unauthorized"
      - "forbidden"
    network_errors:
      - "connection timeout"
      - "network unreachable"
      - "connection refused"
    configuration_errors:
      - "invalid configuration"
      - "missing parameter"
      - "wrong format"
```

### Validation Intent Patterns
```yaml
validation_indicators:
  primary_keywords:
    - "validate"
    - "verify"
    - "check"
    - "complete"
    - "working"
    - "successful"
    - "status"
  question_patterns:
    - "Is my deployment complete?"
    - "Can you validate my setup?"
    - "Is the collector working?"
    - "Check if deployment is successful"
    - "Verify my configuration"
  commands:
    - "/advisor:validate"
    - "/validate"
```

### Reporting Intent Patterns
```yaml
reporting_indicators:
  primary_keywords:
    - "report"
    - "SOW"
    - "documentation"
    - "summary"
    - "generate"
    - "create document"
  question_patterns:
    - "Generate SOW for my deployment"
    - "Create deployment report"
    - "Document my setup"
    - "Generate deployment summary"
  commands:
    - "/advisor:report"
    - "/report"
```

## Entity Extraction Rules

### Cloud Provider Detection
```yaml
cloud_providers:
  aws:
    indicators: ["aws", "amazon", "api gateway", "lambda", "vpc", "iam", "cloudformation"]
    services: ["api_gateway", "lambda", "vpc", "iam", "cloudformation", "eks", "ecs"]
  azure:
    indicators: ["azure", "apim", "api management", "resource group", "subscription"]
    services: ["apim", "api_management", "resource_group", "subscription", "aks"]
  gcp:
    indicators: ["gcp", "google cloud", "cloud functions", "vpc", "iam"]
    services: ["cloud_functions", "vpc", "iam", "gke"]
```

### Service Detection
```yaml
services:
  api_gateways:
    aws: ["api gateway", "api-gateway", "apigw"]
    azure: ["apim", "api management", "azure apim"]
    gcp: ["cloud endpoints", "api gateway"]
  compute:
    aws: ["lambda", "ec2", "ecs", "eks"]
    azure: ["functions", "app service", "aks"]
    gcp: ["cloud functions", "compute engine", "gke"]
  networking:
    aws: ["vpc", "subnet", "security group"]
    azure: ["vnet", "subnet", "nsg"]
    gcp: ["vpc", "subnet", "firewall"]
```

## Routing Logic

### Primary Routing Algorithm
```python
def route_request(user_query, conversation_context):
    # Step 1: Extract entities
    entities = extract_entities(user_query)

    # Step 2: Classify intent
    intent_scores = {
        'deployment': calculate_deployment_score(user_query, entities),
        'troubleshooting': calculate_troubleshooting_score(user_query, entities),
        'validation': calculate_validation_score(user_query, entities),
        'reporting': calculate_reporting_score(user_query, entities)
    }

    # Step 3: Determine primary intent
    primary_intent = max(intent_scores, key=intent_scores.get)
    confidence = intent_scores[primary_intent]

    # Step 4: Apply context and routing rules
    if confidence < 0.7:
        return request_clarification(user_query, entities)

    return route_to_subagent(primary_intent, entities, conversation_context)
```

### Intent Scoring Weights
```yaml
scoring_weights:
  keyword_match: 0.4      # Direct keyword presence
  pattern_match: 0.3      # Question pattern matching
  context_match: 0.2      # Conversation context
  entity_presence: 0.1    # Relevant entity detection

confidence_thresholds:
  high_confidence: 0.8    # Route immediately
  medium_confidence: 0.6  # Route with monitoring
  low_confidence: 0.4     # Request clarification
```

## Context-Aware Routing

### Conversation Context Integration
```yaml
context_factors:
  previous_intent:
    weight: 0.3
    logic: "If previous intent was deployment, bias toward validation or troubleshooting"

  mentioned_services:
    weight: 0.2
    logic: "Maintain service context across conversation"

  error_history:
    weight: 0.3
    logic: "If errors reported, bias toward troubleshooting"

  deployment_stage:
    planning: "bias toward deployment advice"
    implementation: "bias toward troubleshooting"
    validation: "bias toward validation"
```

### Multi-Intent Detection
```yaml
multi_intent_patterns:
  deployment_and_troubleshooting:
    pattern: "Deploy collector but I'm getting {error}"
    routing: "Route to Error Handler first, then Deployment Advisor"

  validation_and_reporting:
    pattern: "Validate setup and generate report"
    routing: "Route to Validator first, then Reporter"

  deployment_with_prerequisites:
    pattern: "What collector and what prerequisites?"
    routing: "Route to Deployment Advisor with prerequisite focus"
```

## Command Processing

### Structured Commands
```yaml
command_patterns:
  advisor_commands:
    "/advisor:advise":
      intent: "deployment"
      subagent: "deployment_advisor"
    "/advisor:troubleshoot":
      intent: "troubleshooting"
      subagent: "error_handler"
    "/advisor:validate":
      intent: "validation"
      subagent: "validator"
    "/advisor:report":
      intent: "reporting"
      subagent: "reporter"

  case_insensitive: true
  prefix_variations: ["/advisor:", "/Advisor:", "/ADVISOR:"]
```

## Clarification Strategies

### Ambiguous Query Handling
```yaml
clarification_templates:
  multiple_intents:
    message: "I can help with both deployment and troubleshooting. Would you like me to:"
    options:
      - "Help you deploy a new collector"
      - "Troubleshoot an existing deployment issue"

  missing_context:
    message: "To provide the best guidance, could you tell me:"
    prompts:
      - "Which cloud provider are you using? (AWS/Azure/GCP)"
      - "What service needs traffic collection?"
      - "Are you planning a new deployment or fixing an issue?"

  low_confidence:
    message: "I want to make sure I understand correctly. Are you asking about:"
    options: ["generated based on top 2 intent scores"]
```

## Routing Output Format

### Sub-Agent Request Structure
```yaml
routing_output:
  target_subagent: "deployment_advisor" | "error_handler" | "validator" | "reporter"
  confidence_score: 0.0-1.0
  extracted_entities:
    cloud_provider: "aws" | "azure" | "gcp" | null
    services: ["api_gateway", "lambda"]
    error_types: ["permission_error"] | []
    action_intent: "deploy" | "troubleshoot" | "validate" | "report"
  routing_rationale: "Explanation of why this routing was chosen"
  clarification_needed: true | false
  fallback_options: ["alternative_subagent_1", "alternative_subagent_2"]
```

## Error Handling

### Routing Failures
```yaml
error_scenarios:
  no_clear_intent:
    action: "Request clarification with context options"
    fallback: "Route to deployment_advisor as default"

  multiple_high_confidence_intents:
    action: "Present options to user for selection"
    fallback: "Route to highest scoring intent"

  unknown_entities:
    action: "Extract what's possible, flag unknowns"
    fallback: "Route with partial entity information"
```

This request routing specification provides comprehensive intent recognition and routing logic for the orchestrator to accurately direct user queries to appropriate sub-agents.