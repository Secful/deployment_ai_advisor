# Session Metadata Tracking Specification

## Overview
This specification defines the session metadata tracking system for comprehensive monitoring of customer interactions, satisfaction indicators, escalation triggers, and performance analytics in the Salt Security Deployment Advisor system.

## Customer Satisfaction Detection Framework

### Explicit Satisfaction Indicators
```yaml
explicit_satisfaction_signals:
  positive_feedback_patterns:
    gratitude_expressions:
      patterns: ["thank you", "thanks", "appreciate", "helpful", "great"]
      context_weighting: "Higher weight when related to specific recommendations"
      confidence_scoring: "High confidence (0.8-1.0) for explicit positive feedback"

    approval_statements:
      patterns: ["perfect", "exactly", "that's right", "yes that's it", "spot on"]
      context_analysis: "Validate approval relates to system recommendation"
      confidence_scoring: "Very high confidence (0.9-1.0) for direct approval"

    implementation_commitment:
      patterns: ["I'll implement this", "going to try this", "will set this up"]
      behavioral_validation: "Cross-reference with follow-up implementation questions"
      confidence_scoring: "High confidence (0.8-0.9) with behavioral confirmation"

    quality_endorsement:
      patterns: ["this is helpful", "good solution", "comprehensive", "detailed"]
      specificity_bonus: "Higher weight for specific quality mentions"
      confidence_scoring: "Medium-high confidence (0.7-0.8)"

  negative_feedback_patterns:
    rejection_statements:
      patterns: ["this doesn't work", "not what I need", "wrong approach", "doesn't help"]
      severity_analysis: "Analyze severity and scope of rejection"
      confidence_scoring: "High confidence (0.8-1.0) for explicit rejection"

    confusion_expressions:
      patterns: ["I don't understand", "this is confusing", "unclear", "complicated"]
      frequency_tracking: "Track repeated confusion expressions"
      confidence_scoring: "Medium confidence (0.6-0.8) depending on frequency"

    frustration_indicators:
      patterns: ["this is frustrating", "taking too long", "not working", "waste of time"]
      escalation_triggers: "Immediate escalation consideration"
      confidence_scoring: "Very high confidence (0.9-1.0) for frustration"

    escalation_requests:
      patterns: ["speak to human", "get help", "escalate", "contact support"]
      immediate_action: "Trigger automatic escalation process"
      confidence_scoring: "Maximum confidence (1.0) for explicit escalation requests"
```

### Implicit Satisfaction Indicators
```yaml
implicit_satisfaction_signals:
  behavioral_engagement_patterns:
    session_completion_indicators:
      full_workflow_completion:
        measurement: "User completes all recommended workflow steps"
        weight: "High positive indicator (0.7-0.8)"
        validation: "Cross-check with time spent and question depth"

      partial_completion_with_progress:
        measurement: "User completes majority of workflow with minor skips"
        weight: "Medium positive indicator (0.5-0.6)"
        context: "Consider complexity and user expertise level"

      early_abandonment:
        measurement: "User leaves before completing initial recommendations"
        weight: "Strong negative indicator (-0.7 to -0.8)"
        threshold: "Less than 25% workflow completion"

    question_quality_evolution:
      deepening_questions:
        pattern: "Questions become more implementation-specific over time"
        interpretation: "User is moving toward implementation (positive)"
        weight: "Medium positive indicator (0.5-0.6)"

      repeat_basic_questions:
        pattern: "Same basic questions asked multiple times"
        interpretation: "User not getting clear guidance (negative)"
        weight: "Medium negative indicator (-0.4 to -0.6)"

    time_engagement_analysis:
      productive_time_spending:
        measurement: "Time spent proportional to complexity and recommendations"
        calculation: "actual_time / expected_time for similar sessions"
        optimal_range: "0.8-1.5x expected time indicates good engagement"

      rushed_interactions:
        measurement: "Very quick responses without apparent consideration"
        threshold: "Less than 50% of expected reading/processing time"
        weight: "Negative indicator (-0.3 to -0.5)"

  follow_up_behavior_patterns:
    implementation_detail_questions:
      indicators:
        - "How do I configure X specifically?"
        - "What happens if Y occurs during implementation?"
        - "Can you clarify the Z step?"
      interpretation: "User is seriously considering implementation"
      weight: "Strong positive indicator (0.7-0.9)"

    validation_and_confirmation_requests:
      indicators:
        - "Does this look correct?"
        - "Am I understanding this right?"
        - "Is this the best approach for my situation?"
      interpretation: "User wants to ensure successful implementation"
      weight: "Medium positive indicator (0.5-0.7)"

    alternative_exploration:
      indicators:
        - "What if I used X instead of Y?"
        - "Are there other approaches?"
        - "What are the trade-offs?"
      interpretation: "User is thoughtfully evaluating options"
      weight: "Positive indicator (0.4-0.6)"
```

### Satisfaction Scoring Algorithm
```yaml
satisfaction_scoring:
  composite_score_calculation:
    weighted_aggregation:
      explicit_positive_weight: 0.4
      explicit_negative_weight: 0.4
      implicit_behavioral_weight: 0.2

    formula: |
      satisfaction_score = (
        (explicit_positive * 0.4) +
        (explicit_negative * -0.4) +
        (implicit_behavioral * 0.2)
      )

    normalization: "Normalize to [-1.0, 1.0] range"
    interpretation:
      highly_satisfied: "0.7 to 1.0"
      satisfied: "0.3 to 0.7"
      neutral: "-0.3 to 0.3"
      dissatisfied: "-0.7 to -0.3"
      highly_dissatisfied: "-1.0 to -0.7"

  confidence_assessment:
    signal_strength_calculation:
      strong_signals: "Multiple explicit indicators in same direction"
      weak_signals: "Few or conflicting indicators"
      confidence_formula: "sqrt(signal_count * consistency_factor)"

    temporal_weighting:
      recent_signals_emphasis: "Weight recent signals more heavily"
      trend_analysis: "Detect satisfaction trend over session duration"
      final_interaction_bonus: "Give extra weight to final interactions"
```

## Escalation Detection and Management

### Automatic Escalation Triggers
```yaml
escalation_triggers:
  failure_pattern_triggers:
    repeated_failure_detection:
      threshold: "Same error or issue occurs 3 or more times"
      pattern_matching: "Identify recurring error patterns"
      context_analysis: "Consider if failures are related or independent"
      escalation_severity: "High - indicates system limitation"

    solution_ineffectiveness:
      threshold: "3 consecutive recommendations rejected or ineffective"
      tracking: "Monitor recommendation acceptance and success rates"
      analysis: "Determine if issue is system capability or user mismatch"
      escalation_severity: "High - may require human expertise"

    critical_deployment_failures:
      indicators: ["production system down", "security breach", "data loss"]
      detection: "Keyword and context analysis of user descriptions"
      response_time: "Immediate escalation (< 30 seconds)"
      escalation_severity: "Critical - requires immediate human intervention"

  user_experience_triggers:
    explicit_escalation_requests:
      patterns: ["I need to speak to someone", "get me human help", "escalate this"]
      confidence_requirement: "High confidence in pattern matching"
      response: "Immediate escalation with context preservation"
      escalation_severity: "High - user explicitly requesting human help"

    satisfaction_threshold_breach:
      threshold: "Satisfaction score < -0.5 for more than 2 consecutive interactions"
      analysis: "Ensure score is based on strong signals, not noise"
      grace_period: "Allow for one recovery interaction"
      escalation_severity: "Medium - user experience degrading"

    session_duration_excessive:
      threshold: "Session duration > 3x average for similar complexity"
      context_check: "Verify user is still actively engaged"
      productivity_check: "Assess if progress is being made"
      escalation_severity: "Medium - may indicate stuck user"

  system_limitation_triggers:
    knowledge_gap_identification:
      detection: "System unable to provide guidance on user query"
      confidence_threshold: "System confidence < 0.3 for core recommendations"
      pattern_analysis: "Check if gap represents broader system limitation"
      escalation_severity: "Medium - may require knowledge base expansion"

    complex_edge_case_detection:
      indicators: ["unique architecture", "compliance requirements", "legacy integration"]
      complexity_scoring: "Analyze deployment complexity beyond system capabilities"
      expert_requirement: "Determine if specialized expertise needed"
      escalation_severity: "Medium-High - specialized knowledge required"

    technical_constraint_conflicts:
      detection: "User requirements conflict with technical constraints"
      analysis: "Determine if conflict can be resolved through alternative approaches"
      creativity_requirement: "Assess need for creative problem-solving"
      escalation_severity: "Medium - may require human creativity"
```

### Escalation Context Preparation
```yaml
escalation_context:
  comprehensive_context_package:
    session_summary:
      conversation_highlights: "Key questions, decisions, and recommendations"
      interaction_timeline: "Chronological flow of conversation"
      decision_points: "Major decisions made and rationale"
      current_status: "Where conversation currently stands"

    technical_context:
      deployment_requirements: "Complete deployment context and requirements"
      attempted_solutions: "All solutions attempted and their outcomes"
      error_history: "All errors encountered and attempted resolutions"
      architectural_constraints: "Known constraints and limitations"

    user_profile:
      expertise_assessment: "Inferred user expertise level and evidence"
      communication_style: "How user prefers to interact and receive information"
      satisfaction_indicators: "Current satisfaction level and trajectory"
      urgency_indicators: "Signs of urgency or time constraints"

    escalation_rationale:
      trigger_analysis: "Why escalation was triggered"
      attempted_resolutions: "What the system tried to resolve the issue"
      knowledge_gaps: "What knowledge or capability gaps were identified"
      recommended_next_steps: "System recommendations for human agent"

  context_preservation:
    conversation_export:
      format: "Human-readable conversation summary with technical details"
      filtering: "Remove system internals, keep user-relevant information"
      highlighting: "Emphasize key decisions and current challenges"

    session_state_transfer:
      current_workflow_state: "Where user is in current workflow"
      pending_actions: "Actions user needs to take"
      validation_status: "What has been validated or confirmed"
      next_recommended_steps: "System recommendations for continuation"
```

### Escalation Response Protocols
```yaml
escalation_response:
  immediate_escalation_actions:
    user_notification:
      message_template: "I'm connecting you with a human expert who can better assist with your specific situation."
      context_explanation: "Brief explanation of why escalation is happening"
      timeline_expectation: "Expected response time for human agent"

    context_transfer:
      priority_routing: "Route to appropriate expertise level and domain"
      context_package_delivery: "Deliver complete context package to human agent"
      system_state_preservation: "Maintain system state for potential return"

    fallback_guidance:
      interim_recommendations: "Provide best available guidance while waiting"
      self_service_options: "Suggest documentation or resources user can review"
      status_check_mechanism: "Way for user to check escalation status"

  escalation_quality_assurance:
    escalation_appropriateness_tracking:
      true_positive_rate: "Percentage of escalations that required human help"
      false_positive_rate: "Percentage of escalations that could have been resolved by system"
      resolution_improvement: "How human resolution could be automated"

    escalation_outcome_learning:
      resolution_pattern_analysis: "Learn from human resolutions"
      system_improvement_opportunities: "Identify areas for system enhancement"
      knowledge_base_updates: "Update knowledge base with new solutions"
```

## Performance Analytics and Monitoring

### Session Performance Metrics
```yaml
performance_metrics:
  response_time_analytics:
    orchestrator_performance:
      average_response_time: "Average time for orchestrator to process queries"
      percentile_analysis: "95th percentile response times for SLA monitoring"
      complexity_correlation: "Response time correlation with query complexity"

    sub_agent_performance:
      individual_agent_timing: "Response times for each sub-agent type"
      agent_coordination_overhead: "Time spent in agent handoffs and coordination"
      parallel_processing_efficiency: "Effectiveness of parallel sub-agent invocation"

    end_to_end_timing:
      user_query_to_response: "Complete time from user input to final response"
      workflow_completion_time: "Time to complete entire workflows"
      session_duration_analysis: "Total session duration patterns and optimization"

  quality_metrics:
    recommendation_accuracy:
      confidence_calibration: "How well confidence scores predict success"
      user_acceptance_rate: "Rate at which users accept recommendations"
      implementation_success_rate: "Rate of successful deployments from recommendations"

    conversation_quality:
      question_resolution_rate: "Percentage of questions adequately answered"
      clarification_request_frequency: "How often users need clarification"
      conversation_flow_smoothness: "Measure of conversation flow quality"

    user_experience_metrics:
      task_completion_rate: "Percentage of users completing intended tasks"
      user_effort_score: "Amount of effort required from users"
      time_to_value: "Time from session start to first valuable outcome"
```

### System Health Monitoring
```yaml
system_health:
  availability_monitoring:
    system_uptime: "Overall system availability percentage"
    service_degradation_detection: "Detection of partial service failures"
    recovery_time_tracking: "Time to recover from failures"

  capacity_monitoring:
    concurrent_session_handling: "Number of simultaneous sessions supported"
    resource_utilization: "CPU, memory, and storage utilization patterns"
    scalability_threshold_monitoring: "Early warning for capacity limits"

  data_quality_monitoring:
    session_data_integrity: "Validation of session data completeness and accuracy"
    metadata_consistency: "Cross-validation of metadata across session files"
    storage_health: "Monitoring of file system and database health"

  integration_health:
    mcp_service_availability: "Health monitoring of MCP integrations"
    external_api_reliability: "Monitoring of cloud provider API dependencies"
    data_source_freshness: "Currency of external data sources"
```

### Learning and Improvement Metrics
```yaml
learning_metrics:
  pattern_recognition_improvement:
    new_pattern_discovery_rate: "Rate of identifying new successful patterns"
    pattern_validation_accuracy: "Accuracy of pattern success predictions"
    pattern_evolution_tracking: "How patterns change over time"

  recommendation_algorithm_optimization:
    a_b_test_results: "Results from recommendation algorithm experiments"
    personalization_effectiveness: "Impact of personalized recommendations"
    context_utilization_improvement: "Better use of session context over time"

  knowledge_base_growth:
    coverage_expansion: "Growth in knowledge base coverage areas"
    accuracy_improvement: "Improvement in knowledge base accuracy"
    gap_identification_and_filling: "Systematic identification and addressing of knowledge gaps"

  user_satisfaction_trends:
    satisfaction_score_trends: "Long-term trends in user satisfaction"
    escalation_rate_trends: "Changes in escalation rates over time"
    success_rate_improvements: "Improvement in deployment success rates"
```

## Metadata Storage and Management

### Session Metadata Schema Enhancement
```yaml
enhanced_metadata_schema:
  satisfaction_tracking:
    satisfaction_score: "Composite satisfaction score (-1.0 to 1.0)"
    satisfaction_confidence: "Confidence in satisfaction score (0.0 to 1.0)"
    satisfaction_timeline: "Array of satisfaction scores over time"
    explicit_feedback_events: "Specific positive/negative feedback instances"

  performance_tracking:
    response_times: "Array of response times for each interaction"
    quality_scores: "Quality assessment for each response"
    error_events: "All errors encountered and their resolutions"
    escalation_events: "All escalation triggers and outcomes"

  learning_metadata:
    pattern_contributions: "How this session contributed to pattern learning"
    knowledge_gaps_identified: "New knowledge gaps discovered"
    recommendation_effectiveness: "Success rate of recommendations made"
    system_improvement_opportunities: "Areas for system enhancement identified"

  contextual_metadata:
    user_journey_stage: "Where user is in their deployment journey"
    complexity_evolution: "How complexity understanding evolved during session"
    expertise_indicators: "Evidence of user expertise level"
    communication_preferences: "User's preferred communication style"
```

### Metadata Analytics and Reporting
```yaml
metadata_analytics:
  satisfaction_analysis:
    satisfaction_distribution: "Distribution of satisfaction scores across sessions"
    satisfaction_drivers: "Factors most correlated with high satisfaction"
    dissatisfaction_root_causes: "Primary causes of low satisfaction"

  performance_analysis:
    response_time_benchmarking: "Performance benchmarks and trends"
    quality_improvement_tracking: "Trends in response quality over time"
    error_pattern_analysis: "Common error patterns and their resolutions"

  learning_impact_analysis:
    recommendation_improvement_tracking: "How recommendations improve over time"
    knowledge_base_contribution: "Impact of sessions on knowledge base growth"
    system_evolution_correlation: "How system improvements correlate with outcomes"

  predictive_analytics:
    satisfaction_prediction: "Predict satisfaction based on early session indicators"
    escalation_risk_assessment: "Predict likelihood of escalation"
    success_probability_forecasting: "Predict deployment success early in session"
```