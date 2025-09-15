# Task Tool Integration Layer

## Overview
The Task tool integration layer manages direct invocation of sub-agents through Claude Code's Task tool, handles response processing, implements error recovery, and coordinates sequential sub-agent workflows.

## Core Integration Architecture

### 1. Sub-Agent Invocation Patterns
Standardized patterns for invoking sub-agents through the Task tool with proper context and error handling.

```yaml
invocation_template:
  basic_invocation:
    tool: "Task"
    subagent_type: "general-purpose"
    description: "{agent_name} - {brief_task_description}"
    prompt: |
      You are the {agent_name} sub-agent for Salt Security deployment assistance.

      **Agent Role**: {agent_role_description}
      **User Query**: "{original_user_query}"
      **Request Context**:
      {yaml_request_context}

      **Instructions**:
      {specific_agent_instructions}

      **Response Format**:
      Respond using the standardized YAML schema defined in sub-agent-response.yaml:
      - status: success/partial/fail
      - data: {agent-specific response data}
      - retry_count: {current_retry_count}
      - errors: [array of error messages]
      - confidence_score: 1-10
      - processing_time_seconds: {actual_processing_time}
      - data_sources_used: [array of sources]
      - next_recommended_action: {suggested_next_step}

agent_configurations:
  deployment_advisor:
    subagent_type: "general-purpose"
    role_description: "Subject Matter Expert providing collector recommendations and deployment guidance"
    specific_instructions: |
      - Consult deployment flowcharts in agents/flowcharts/ directory
      - Provide specific collector recommendations with prerequisites
      - Include confidence scores and deployment complexity assessments
      - Reference Document360 knowledge base when available
      - Escalate if requirements are unclear or conflicting

  error_handler:
    subagent_type: "general-purpose"
    role_description: "Troubleshooting specialist for deployment and configuration errors"
    specific_instructions: |
      - Analyze error patterns and classify error types
      - Provide step-by-step resolution guidance
      - Include validation commands for each resolution step
      - Escalate complex issues requiring human intervention
      - Track resolution success for pattern learning

  validator:
    subagent_type: "general-purpose"
    role_description: "Deployment verification specialist ensuring completeness and compliance"
    specific_instructions: |
      - Compare current deployment state against SOW requirements
      - Identify missing components and configuration gaps
      - Provide coverage analysis with percentage completions
      - Validate prerequisite fulfillment
      - Generate validation reports with actionable recommendations

  reporter:
    subagent_type: "general-purpose"
    role_description: "SOW generation and documentation specialist"
    specific_instructions: |
      - Generate comprehensive Statement of Work documents
      - Create Mermaid architecture diagrams
      - Document all deployment decisions and configurations
      - Prepare customer-specific and anonymized versions
      - Include deployment options analysis and recommendations

  data_extractor:
    subagent_type: "general-purpose"
    role_description: "MCP integration specialist with exclusive Document360 access"
    specific_instructions: |
      - Coordinate multiple data sources (Historical, KB, Web, Customer Q&A)
      - Use MCP tools for Document360, Context7, and web search
      - Implement data source priority handling with credibility scoring
      - Resolve conflicts between different data sources
      - Provide aggregated intelligence with source attribution
```

### 2. Request Context Packaging
Structures conversation context and entities into sub-agent requests.

```python
def package_subagent_request(user_query, routing_decision, conversation_context):
    """
    Packages orchestrator context into standardized sub-agent request format
    """
    return {
        "orchestrator_id": f"orchestrator-{generate_session_id()}",
        "request_type": routing_decision.target_subagent,
        "user_query": user_query,
        "conversation_context": {
            "previous_questions": conversation_context.get_recent_queries(5),
            "cloud_provider": routing_decision.extracted_entities.get("cloud_provider"),
            "services_mentioned": routing_decision.extracted_entities.get("services", []),
            "errors_reported": conversation_context.get_active_errors(),
            "deployment_stage": conversation_context.get_deployment_stage(),
            "user_satisfaction_trend": conversation_context.get_satisfaction_trend()
        },
        "customer_context": {
            "company_id": conversation_context.get_customer_id(),
            "architecture_data": conversation_context.get_architecture_context(),
            "preferences": conversation_context.get_user_preferences()
        },
        "retry_count": conversation_context.get_retry_count(routing_decision.target_subagent),
        "urgency_level": determine_urgency_level(routing_decision, conversation_context)
    }
```

### 3. Task Tool Execution Management
Manages Task tool invocations with timeout handling and response processing.

```yaml
execution_management:
  timeout_settings:
    default_timeout: 120000  # 2 minutes in milliseconds
    agent_specific_timeouts:
      deployment_advisor: 90000   # 1.5 minutes
      error_handler: 60000        # 1 minute
      validator: 150000           # 2.5 minutes
      reporter: 300000            # 5 minutes (for SOW generation)
      data_extractor: 180000      # 3 minutes (for MCP operations)

  concurrent_execution:
    enabled: false  # Sequential processing only
    rationale: "Sub-agents may need results from previous agents"

  execution_monitoring:
    progress_tracking: true
    intermediate_status: false  # Task tool doesn't support streaming
    timeout_warnings: "at_90_percent_of_timeout"
```

### 4. Response Processing Pipeline
Processes Task tool responses and validates against YAML schema.

```python
def process_subagent_response(task_response, expected_agent):
    """
    Processes and validates sub-agent responses from Task tool
    """
    try:
        # Parse YAML response
        response_data = yaml.safe_load(task_response)

        # Validate against schema
        validate_response_schema(response_data)

        # Extract key components
        processed_response = {
            "status": response_data.get("status"),
            "data": response_data.get("data", {}),
            "confidence_score": response_data.get("confidence_score", 0),
            "errors": response_data.get("errors", []),
            "retry_count": response_data.get("retry_count", 0),
            "escalation_required": response_data.get("escalation_required", False),
            "next_recommended_action": response_data.get("next_recommended_action"),
            "processing_time": response_data.get("processing_time_seconds", 0),
            "data_sources_used": response_data.get("data_sources_used", [])
        }

        # Update conversation context
        update_conversation_context(processed_response, expected_agent)

        return processed_response

    except YAMLError as e:
        return handle_yaml_parsing_error(e, task_response, expected_agent)
    except ValidationError as e:
        return handle_schema_validation_error(e, task_response, expected_agent)
    except Exception as e:
        return handle_unexpected_error(e, task_response, expected_agent)
```

### 5. Error Handling and Recovery
Comprehensive error handling for Task tool failures and sub-agent errors.

```yaml
error_handling_matrix:
  task_tool_errors:
    timeout:
      detection: "task_execution_exceeds_timeout"
      recovery_actions:
        - "retry_with_extended_timeout"
        - "fallback_to_cached_response"
        - "route_to_alternative_subagent"
      escalation_threshold: 3

    invocation_failure:
      detection: "task_tool_returns_error"
      recovery_actions:
        - "retry_with_simplified_prompt"
        - "break_down_into_smaller_tasks"
        - "manual_fallback_response"
      escalation_threshold: 2

    response_parsing_failure:
      detection: "invalid_yaml_or_schema_violation"
      recovery_actions:
        - "request_yaml_correction"
        - "extract_data_from_text_response"
        - "use_default_response_structure"
      escalation_threshold: 3

  subagent_errors:
    knowledge_gap:
      detection: "confidence_score_below_3_or_explicit_gap"
      recovery_actions:
        - "route_to_data_extractor"
        - "request_customer_clarification"
        - "escalate_to_human_expert"
      escalation_threshold: 1

    conflicting_data:
      detection: "external_diffs_reported"
      recovery_actions:
        - "data_source_priority_resolution"
        - "request_authoritative_source"
        - "present_options_to_user"
      escalation_threshold: 2

    partial_failure:
      detection: "status_equals_partial"
      recovery_actions:
        - "request_missing_information"
        - "combine_with_alternative_agent"
        - "present_partial_results_with_gaps"
      escalation_threshold: 3
```

### 6. Sequential Workflow Coordination
Manages multi-agent workflows where sub-agents need results from previous agents.

```yaml
workflow_patterns:
  deployment_to_validation:
    trigger: "deployment_advisor_recommends_validation"
    sequence:
      - agent: "deployment_advisor"
        input: "user_deployment_question"
        output: "collector_recommendations"
      - agent: "validator"
        input: "collector_recommendations + user_context"
        output: "validation_results"
    context_passing:
      - "recommended_collector_type"
      - "deployment_prerequisites"
      - "architecture_configuration"

  troubleshooting_to_deployment:
    trigger: "error_handler_resolves_issue"
    sequence:
      - agent: "error_handler"
        input: "error_report"
        output: "resolution_steps"
      - agent: "deployment_advisor"
        input: "resolution_context + original_deployment_need"
        output: "updated_recommendations"
    context_passing:
      - "resolved_error_types"
      - "configuration_changes_made"
      - "validated_prerequisites"

  validation_to_reporting:
    trigger: "validator_confirms_deployment_complete"
    sequence:
      - agent: "validator"
        input: "deployment_status_check"
        output: "validation_report"
      - agent: "reporter"
        input: "validation_report + deployment_history"
        output: "sow_document"
    context_passing:
      - "deployment_completeness_status"
      - "architecture_configuration"
      - "coverage_analysis_results"
```

### 7. Performance Optimization
Optimizations to ensure responsive multi-agent interactions.

```yaml
performance_optimizations:
  prompt_optimization:
    technique: "context_minimization"
    approach: "include_only_relevant_context"
    context_filtering:
      - "remove_old_conversation_turns"
      - "summarize_repeated_entities"
      - "exclude_irrelevant_error_history"

  response_caching:
    enabled: true
    cache_duration: "30_minutes"
    cache_keys:
      - "user_query_hash"
      - "context_entities_hash"
      - "subagent_type"
    cache_invalidation:
      - "context_entities_change"
      - "error_state_change"

  parallel_preparation:
    technique: "prepare_next_likely_agent"
    predictions:
      - "after_deployment → prepare_validator_context"
      - "after_error_handler → prepare_deployment_advisor_context"
    preload_data:
      - "relevant_documentation"
      - "common_response_templates"
```

### 8. Monitoring and Observability
Tracks Task tool integration performance and sub-agent effectiveness.

```yaml
monitoring_metrics:
  performance_metrics:
    - "task_invocation_time"
    - "response_processing_time"
    - "end_to_end_latency"
    - "error_recovery_time"

  quality_metrics:
    - "subagent_confidence_scores"
    - "response_schema_compliance"
    - "context_passing_accuracy"
    - "user_satisfaction_correlation"

  reliability_metrics:
    - "task_tool_success_rate"
    - "retry_success_rate"
    - "escalation_trigger_rate"
    - "workflow_completion_rate"

logging_strategy:
  log_levels:
    task_invocation: "INFO"
    response_processing: "DEBUG"
    error_recovery: "WARN"
    escalation_events: "ERROR"

  log_format:
    timestamp: "ISO8601"
    correlation_id: "conversation_session_id"
    agent_context: "target_subagent_type"
    performance_data: "execution_times_and_confidence"
```

### 9. Integration Testing Support
Provides testing capabilities for Task tool integration validation.

```yaml
testing_framework:
  unit_tests:
    - "request_context_packaging"
    - "response_schema_validation"
    - "error_handling_pathways"
    - "context_passing_accuracy"

  integration_tests:
    - "end_to_end_subagent_invocation"
    - "multi_agent_workflow_coordination"
    - "error_recovery_scenarios"
    - "timeout_handling_behavior"

  test_data_sets:
    - "typical_deployment_questions"
    - "error_scenarios_library"
    - "edge_case_contexts"
    - "performance_stress_scenarios"

  mocking_support:
    task_tool_responses: "yaml_response_templates"
    timeout_scenarios: "configurable_delays"
    error_conditions: "controlled_failure_injection"
```

This Task tool integration layer specification provides comprehensive management of sub-agent invocation, response processing, error handling, and workflow coordination through Claude Code's Task tool interface.