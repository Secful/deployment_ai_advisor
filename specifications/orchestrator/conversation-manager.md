# Orchestrator Conversation Manager

## Overview
The conversation manager maintains context across multi-turn interactions, integrates with Claude Code session management, and provides contextual awareness to enable intelligent follow-up question handling and conversation continuity.

## Core Functions

### 1. Session Context Integration
Integrates with Claude Code's built-in session management to maintain conversation state across interactions.

```yaml
session_context:
  conversation_id: "session-abc123"
  customer_id: "customer-xyz789"  # Optional, for customer-specific sessions
  session_start_time: "2025-01-15T10:30:00Z"
  conversation_history:
    - turn_id: 1
      user_query: "What collector should I use for my AWS API Gateway?"
      intent: "deployment"
      entities:
        cloud_provider: "aws"
        services: ["api_gateway"]
      routed_to: "deployment_advisor"
      response_confidence: 0.85
      user_satisfaction: "positive"
    - turn_id: 2
      user_query: "How do I validate it's working?"
      intent: "validation"
      entities:
        cloud_provider: "aws"  # inherited from context
        services: ["api_gateway"]  # inherited from context
      routed_to: "validator"
      response_confidence: 0.78
      user_satisfaction: "neutral"
```

### 2. Context Persistence
Maintains conversation context across Claude Code CLI sessions using structured memory management.

```yaml
context_storage:
  method: "session_memory"  # Uses Claude Code's built-in session context
  retention_policy: "conversation_lifetime"
  context_elements:
    entities:
      retention: "persist_across_turns"
      inheritance: "merge_with_new_entities"
    intent_history:
      retention: "last_5_turns"
      analysis: "pattern_detection"
    satisfaction_indicators:
      retention: "entire_conversation"
      aggregation: "weighted_average"
    error_context:
      retention: "until_resolved"
      escalation: "automatic_on_pattern"
```

### 3. Contextual Entity Management
Tracks and inherits entities across conversation turns to reduce user friction.

```yaml
entity_inheritance:
  cloud_provider:
    inheritance_rule: "persist_until_changed"
    confidence_decay: 0.9  # per turn without mention
    override_threshold: 0.8  # explicit mention required to change

  services:
    inheritance_rule: "accumulate_and_persist"
    max_services: 5
    relevance_scoring: true

  deployment_stage:
    values: ["planning", "implementation", "validation", "troubleshooting"]
    inference_rules:
      - "deployment questions → planning"
      - "error reports → troubleshooting"
      - "completion checks → validation"

  architecture_context:
    components: ["collector_type", "prerequisites", "network_config"]
    inheritance_rule: "persist_related_only"
```

### 4. Intent Progression Tracking
Monitors conversation flow to predict user needs and suggest next actions.

```yaml
intent_progression_patterns:
  deployment_workflow:
    typical_sequence: ["deployment", "validation", "troubleshooting", "reporting"]
    transition_probabilities:
      deployment → validation: 0.7
      deployment → troubleshooting: 0.2
      troubleshooting → deployment: 0.6
      validation → reporting: 0.4

  context_driven_routing:
    after_deployment_advice:
      likely_next: ["validation", "prerequisites_check"]
      routing_bias: 0.3
    after_error_resolution:
      likely_next: ["deployment_continuation", "validation"]
      routing_bias: 0.4
    after_validation_success:
      likely_next: ["reporting", "deployment_completion"]
      routing_bias: 0.2
```

### 5. Satisfaction Monitoring
Continuously monitors user satisfaction indicators to trigger escalation or course correction.

```yaml
satisfaction_detection:
  positive_indicators:
    explicit:
      - "thank you"
      - "that's helpful"
      - "perfect"
      - "great"
      - "exactly what I needed"
    implicit:
      - follow_up_questions_indicate_progress
      - accepts_recommendations
      - proceeds_with_suggested_actions

  negative_indicators:
    explicit:
      - "that's not what I meant"
      - "this isn't working"
      - "I'm still confused"
      - "that doesn't help"
    implicit:
      - repeated_clarification_requests
      - contradicts_previous_context
      - requests_human_support
      - abandons_conversation_flow

  neutral_indicators:
    - asks_for_alternatives
    - requests_more_detail
    - continues_without_feedback
```

### 6. Context-Aware Response Adaptation
Adjusts response style and detail level based on conversation history and user expertise indicators.

```yaml
response_adaptation:
  user_expertise_detection:
    beginner_indicators:
      - asks_about_basic_concepts
      - needs_prerequisite_explanations
      - requests_step_by_step_guidance
    expert_indicators:
      - uses_technical_terminology
      - asks_about_advanced_configurations
      - references_specific_architectures

  response_style_adjustment:
    for_beginners:
      detail_level: "comprehensive"
      technical_depth: "shallow_with_links"
      prerequisite_checking: "proactive"
    for_experts:
      detail_level: "concise"
      technical_depth: "full_technical_detail"
      prerequisite_checking: "assume_knowledge"
```

### 7. Error Context Management
Maintains error context to prevent repeated failures and enable intelligent retry strategies.

```yaml
error_context_tracking:
  failed_attempts:
    - timestamp: "2025-01-15T10:45:00Z"
      subagent: "deployment_advisor"
      error_type: "timeout"
      retry_count: 2
      resolution_status: "unresolved"

  error_patterns:
    detection:
      repeated_failures: "same_subagent_3_times"
      cascading_errors: "multiple_subagents_failing"
      user_frustration: "satisfaction_score_below_0.3"

  resolution_strategies:
    timeout_errors:
      - "retry_with_exponential_backoff"
      - "route_to_alternative_subagent"
      - "escalate_after_3_attempts"
    knowledge_gaps:
      - "route_to_data_extractor"
      - "request_customer_clarification"
      - "escalate_to_human_support"
```

## Integration Points

### 1. Claude Code Session Management
Leverages Claude Code's built-in conversation context and memory management.

```yaml
claude_code_integration:
  session_variables:
    - conversation_entities
    - intent_history
    - satisfaction_score
    - deployment_context

  memory_persistence:
    method: "automatic"  # Claude Code handles persistence
    scope: "conversation_lifetime"
    format: "structured_context"

  context_inheritance:
    from_previous_sessions: false  # Each conversation is independent
    within_session: true  # Full context maintained during session
```

### 2. Sub-Agent Context Sharing
Provides relevant context to sub-agents for informed decision-making.

```yaml
context_sharing_protocol:
  context_package:
    conversation_summary:
      previous_intents: ["deployment", "troubleshooting"]
      established_entities:
        cloud_provider: "aws"
        services: ["api_gateway", "lambda"]
      user_satisfaction_trend: "positive"
      deployment_stage: "implementation"

  context_filtering:
    deployment_advisor:
      include: ["entities", "deployment_stage", "previous_recommendations"]
      exclude: ["error_history", "satisfaction_details"]
    error_handler:
      include: ["entities", "error_history", "previous_attempts"]
      exclude: ["satisfaction_details"]
    validator:
      include: ["entities", "deployment_context", "expected_outcomes"]
      exclude: ["error_history"]
```

### 3. Response Context Enrichment
Enhances orchestrator responses with contextual awareness and conversation continuity.

```yaml
context_enrichment:
  reference_management:
    previous_recommendations: "maintain_links"
    entity_references: "auto_resolve"
    conversation_callbacks: "track_and_reference"

  response_personalization:
    based_on_history:
      - "user_prefers_detailed_explanations"
      - "user_works_with_aws_primarily"
      - "user_experienced_with_collectors"

  continuity_markers:
    explicit_references:
      - "As we discussed earlier..."
      - "Building on your AWS API Gateway setup..."
      - "Following up on the permission error..."
    implicit_continuity:
      - inherit_entities_without_re-asking
      - assume_context_from_previous_turns
      - provide_next_logical_steps
```

## Context Update Protocols

### 1. Turn Completion Processing
Updates context after each conversation turn.

```python
def update_context_after_turn(turn_data):
    # Update entity context
    merge_entities(turn_data.entities, conversation_context.entities)

    # Track intent progression
    conversation_context.intent_history.append(turn_data.intent)

    # Update satisfaction indicators
    update_satisfaction_score(turn_data.satisfaction_indicators)

    # Update deployment stage if applicable
    infer_deployment_stage(turn_data.intent, turn_data.entities)

    # Store successful sub-agent routing for future reference
    record_routing_success(turn_data.routing_decision, turn_data.response_quality)
```

### 2. Error Context Updates
Maintains error context for intelligent retry and escalation decisions.

```python
def update_error_context(error_event):
    # Record error occurrence
    conversation_context.error_history.append(error_event)

    # Update retry counters
    increment_retry_count(error_event.subagent, error_event.error_type)

    # Check for escalation triggers
    if should_escalate(error_event, conversation_context):
        trigger_escalation_protocol(error_event)

    # Adjust routing confidence for failed subagent
    adjust_subagent_confidence(error_event.subagent, -0.1)
```

## Performance Considerations

### 1. Context Size Management
Maintains optimal context size to ensure responsive performance.

```yaml
context_optimization:
  max_context_turns: 20
  context_compression:
    after_turns: 15
    compression_strategy: "entity_aggregation_and_summary"
    preserve: ["current_entities", "active_errors", "satisfaction_trend"]

  memory_cleanup:
    resolved_errors: "remove_after_2_turns"
    old_entities: "fade_confidence_over_time"
    intent_history: "keep_last_10_turns"
```

### 2. Real-Time Context Updates
Ensures context updates don't impact response time.

```yaml
performance_targets:
  context_update_time: "< 10ms"
  context_retrieval_time: "< 5ms"
  context_serialization: "< 20ms"

update_strategy: "asynchronous_with_fallback"
fallback_behavior: "use_cached_context_if_update_fails"
```

This conversation management specification enables the orchestrator to maintain intelligent, contextual interactions while integrating seamlessly with Claude Code's session management capabilities.