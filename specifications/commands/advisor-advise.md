# /advisor:advise Command Specification

## Overview
The `/advisor:advise` command provides structured deployment guidance workflow integration, routing natural language queries through the deployment-advisor agent for expert-level collector recommendations.

## Command Syntax
```bash
/advisor:advise [deployment_query] [--options]
```

## Parameters

### Required Parameters
- **deployment_query**: Natural language question about collector deployment
  - Example: "What collector should I use for AWS API Gateway?"
  - Example: "How do I deploy traffic collection for Azure APIM?"
  - Example: "Which collector works best with my GCP setup?"

### Optional Parameters
```yaml
optional_flags:
  --cloud-provider: "aws" | "azure" | "gcp"
    description: "Explicitly specify cloud provider"
    example: "/advisor:advise 'API Gateway deployment' --cloud-provider aws"

  --service-type: string
    description: "Specify service type for focused recommendations"
    example: "/advisor:advise 'collector recommendation' --service-type api-gateway"

  --expertise-level: "beginner" | "intermediate" | "expert"
    description: "Specify user expertise level for tailored guidance"
    example: "/advisor:advise 'deployment help' --expertise-level beginner"

  --detail-level: "quick" | "standard" | "comprehensive"
    description: "Control amount of detail in response"
    default: "standard"
    example: "/advisor:advise 'AWS setup' --detail-level comprehensive"

  --include-sow: boolean
    description: "Include Statement of Work generation"
    default: false
    example: "/advisor:advise 'deployment plan' --include-sow"

  --traffic-volume: number
    description: "Expected traffic volume (requests per minute)"
    example: "/advisor:advise 'sizing recommendation' --traffic-volume 5000"
```

## Command Processing Workflow

### Phase 1: Command Parsing and Validation
```yaml
command_processing:
  input_validation:
    - validate_query_presence: "Ensure deployment query is provided"
    - parse_optional_parameters: "Extract and validate optional parameters"
    - validate_parameter_values: "Check parameter values are within allowed ranges"
    - set_defaults: "Apply default values for unspecified parameters"

  query_preprocessing:
    - normalize_query_text: "Clean and normalize the natural language query"
    - extract_implicit_entities: "Identify cloud providers and services mentioned"
    - detect_query_intent: "Confirm this is a deployment guidance request"
    - assess_query_complexity: "Determine appropriate processing approach"
```

### Phase 2: Orchestrator Integration
```yaml
orchestrator_handoff:
  context_preparation:
    conversation_context:
      command_invoked: "/advisor:advise"
      explicit_parameters: extracted_from_command_line
      user_expertise_inferred: from_parameter_or_conversation_history
      detail_preference: from_detail_level_parameter

  orchestrator_invocation:
    tool_call: "Task"
    subagent_type: "general-purpose"
    prompt_construction:
      agent_identification: "You are the orchestrator agent"
      command_context: "Processing /advisor:advise command"
      user_query: original_deployment_query
      parameter_context: extracted_parameters
      expected_workflow: "Route to deployment-advisor sub-agent"
```

### Phase 3: Response Processing and Formatting
```yaml
response_processing:
  orchestrator_response_handling:
    - parse_orchestrator_output: "Extract recommendation data from orchestrator response"
    - validate_response_completeness: "Ensure all expected data is present"
    - extract_sub_agent_data: "Pull deployment-advisor specific data"
    - assess_response_quality: "Validate response meets quality standards"

  output_formatting:
    standard_format:
      - deployment_summary: "High-level deployment recommendation"
      - collector_specification: "Specific collector type and configuration"
      - implementation_steps: "Step-by-step deployment guidance"
      - prerequisites_checklist: "Required prerequisites and dependencies"
      - validation_guidance: "Post-deployment validation steps"

    enhanced_format_with_sow:
      - include_standard_format: "All standard format content"
      - sow_document: "Complete Statement of Work document"
      - implementation_timeline: "Detailed timeline with milestones"
      - resource_requirements: "Team and resource allocation recommendations"
```

## Response Format Specifications

### Standard Response Format
```markdown
# Deployment Recommendation

## Summary
[High-level recommendation summary]

## Recommended Collector
- **Type**: [Collector Type]
- **Configuration**: [Key configuration details]
- **Complexity**: [Beginner/Intermediate/Expert] ([1-10 score])
- **Success Probability**: [Percentage]
- **Estimated Time**: [Time estimate]

## Prerequisites
- [ ] [Prerequisite 1]
- [ ] [Prerequisite 2]
- [ ] [Prerequisite 3]

## Implementation Steps
1. [Step 1 with specific commands/actions]
2. [Step 2 with validation checkpoints]
3. [Step 3 with configuration details]

## Validation
- [Validation step 1]
- [Validation step 2]
- [Performance verification]

## Additional Resources
- [Link to relevant documentation]
- [Reference to troubleshooting guides]
```

### Comprehensive Response Format (with --detail-level comprehensive)
```markdown
# Comprehensive Deployment Guidance

## Executive Summary
[Business-focused summary of recommendation]

## Architecture Analysis
[Current architecture assessment and deployment fit]

## Deployment Options Comparison
| Option | Complexity | Time | Success Rate | Use Case |
|--------|------------|------|--------------|----------|
| Option A | [Level] | [Time] | [Rate] | [Use Case] |
| Option B | [Level] | [Time] | [Rate] | [Use Case] |

## Detailed Implementation Plan
### Phase 1: Prerequisites and Setup
[Detailed prerequisite setup with commands]

### Phase 2: Core Deployment
[Detailed deployment steps with validation]

### Phase 3: Configuration and Testing
[Configuration details and testing procedures]

## Risk Assessment
- **Potential Issues**: [List of potential problems]
- **Mitigation Strategies**: [How to avoid/handle issues]
- **Rollback Procedures**: [How to rollback if needed]

## Monitoring and Maintenance
[Post-deployment monitoring and maintenance guidance]
```

### SOW-Enhanced Response Format (with --include-sow)
```markdown
# Deployment Statement of Work

[Complete SOW document as generated by reporter agent, including:]
- Executive Summary
- Architecture Diagrams (Mermaid)
- Implementation Timeline
- Resource Requirements
- Risk Assessment
- Testing and Validation Plan
- Acceptance Criteria
```

## Error Handling

### Command-Level Error Handling
```yaml
error_scenarios:
  invalid_parameters:
    missing_query:
      error_message: "Error: Deployment query is required"
      suggestion: "Usage: /advisor:advise 'your deployment question'"
      example: "/advisor:advise 'What collector for AWS API Gateway?'"

    invalid_cloud_provider:
      error_message: "Error: Invalid cloud provider specified"
      valid_options: ["aws", "azure", "gcp"]
      example: "/advisor:advise 'deployment help' --cloud-provider aws"

    invalid_expertise_level:
      error_message: "Error: Invalid expertise level specified"
      valid_options: ["beginner", "intermediate", "expert"]

  processing_errors:
    orchestrator_failure:
      error_message: "Unable to process deployment request"
      recovery_action: "Please try again or contact support"
      fallback: "Provide general deployment guidance"

    timeout_errors:
      error_message: "Request timed out while processing deployment recommendation"
      suggestion: "Try with --detail-level quick for faster processing"

    insufficient_context:
      error_message: "Need more information to provide specific recommendation"
      interactive_prompt: "Please provide additional details about your architecture"
```

### Graceful Degradation
```yaml
degradation_strategy:
  partial_orchestrator_response:
    - extract_available_data: "Use whatever data is available"
    - indicate_limitations: "Clearly state what's missing"
    - provide_best_effort_guidance: "Give guidance based on available info"

  sub_agent_failures:
    - fallback_to_general_guidance: "Provide general deployment advice"
    - indicate_reduced_capability: "Explain limitations due to sub-agent issues"
    - suggest_retry: "Recommend trying again later"

  data_source_unavailability:
    - use_cached_data: "Fall back to cached recommendations"
    - provide_general_patterns: "Give general deployment patterns"
    - suggest_manual_consultation: "Recommend manual documentation review"
```

## Integration Points

### Orchestrator Integration
```yaml
orchestrator_coordination:
  request_mapping:
    command_parameters_to_context:
      cloud_provider: "conversation_context.cloud_provider"
      service_type: "conversation_context.services_mentioned"
      expertise_level: "conversation_context.user_expertise_level"
      traffic_volume: "technical_context.traffic_volume_estimate"

  response_processing:
    orchestrator_output_mapping:
      deployment_recommendation: "primary_recommendation"
      implementation_steps: "implementation_details.deployment_steps"
      prerequisites: "implementation_details.prerequisites"
      validation_steps: "implementation_details.validation_checkpoints"

  quality_assurance:
    - verify_recommendation_completeness: "Ensure all expected fields are present"
    - validate_step_sequence: "Verify implementation steps are in logical order"
    - check_prerequisite_completeness: "Ensure all prerequisites are included"
```

### Session Context Integration
```yaml
session_integration:
  context_preservation:
    - maintain_conversation_history: "Keep track of previous interactions"
    - preserve_architecture_context: "Remember customer architecture details"
    - track_user_preferences: "Learn user's preferred detail level and style"

  follow_up_optimization:
    - reference_previous_discussions: "Build on previous conversations"
    - avoid_duplicate_information: "Don't repeat previously provided information"
    - suggest_logical_next_steps: "Recommend appropriate follow-up actions"
```

## Usage Examples

### Basic Usage Examples
```bash
# Simple deployment question
/advisor:advise "What collector should I use for my AWS API Gateway?"

# Service-specific guidance
/advisor:advise "How do I set up traffic collection for Azure APIM?"

# Architecture-focused question
/advisor:advise "Which collector works best with my containerized services?"
```

### Advanced Usage Examples
```bash
# Specify cloud provider explicitly
/advisor:advise "API Gateway deployment options" --cloud-provider aws

# Request comprehensive guidance
/advisor:advise "Complete deployment plan" --detail-level comprehensive

# Include SOW generation
/advisor:advise "Enterprise deployment strategy" --include-sow --expertise-level expert

# Specify traffic volume for sizing
/advisor:advise "Collector sizing recommendation" --traffic-volume 10000

# Beginner-friendly guidance
/advisor:advise "Simple deployment setup" --expertise-level beginner --detail-level standard
```

### Complex Scenario Examples
```bash
# Multi-parameter deployment request
/advisor:advise "Production-ready AWS deployment" \
  --cloud-provider aws \
  --service-type api-gateway \
  --expertise-level intermediate \
  --traffic-volume 5000 \
  --detail-level comprehensive \
  --include-sow

# Quick recommendation for experienced users
/advisor:advise "Fast Azure APIM collector setup" \
  --cloud-provider azure \
  --expertise-level expert \
  --detail-level quick
```

## Performance Considerations

### Response Time Targets
```yaml
performance_targets:
  quick_detail_level: "< 15 seconds"
  standard_detail_level: "< 30 seconds"
  comprehensive_detail_level: "< 45 seconds"
  with_sow_generation: "< 60 seconds"
```

### Optimization Strategies
```yaml
optimization_strategies:
  caching:
    - cache_common_queries: "Cache responses for frequently asked questions"
    - cache_by_architecture_pattern: "Cache responses for common architecture patterns"
    - intelligent_cache_invalidation: "Invalidate cache when relevant data changes"

  parallel_processing:
    - parallel_sub_agent_invocation: "Invoke multiple sub-agents in parallel where possible"
    - background_sow_generation: "Generate SOW in background if requested"
    - precompute_common_scenarios: "Precompute responses for common scenarios"

  progressive_enhancement:
    - immediate_basic_response: "Provide basic response quickly"
    - enhance_with_detailed_analysis: "Add detailed analysis as it becomes available"
    - stream_sow_generation: "Stream SOW content as it's generated"
```