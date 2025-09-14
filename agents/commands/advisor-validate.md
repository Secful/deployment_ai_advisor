# /advisor:validate Command Specification

## Overview
The `/advisor:validate` command provides structured deployment status verification workflow, routing validation requests through the validator agent for comprehensive deployment completeness analysis and remediation planning.

## Command Syntax
```bash
/advisor:validate [validation_scope] [--options]
```

## Parameters

### Required Parameters
- **validation_scope**: What to validate (optional - defaults to comprehensive validation)
  - Example: "deployment completeness"
  - Example: "traffic flow validation"
  - Example: "SOW compliance check"

### Optional Parameters
```yaml
optional_flags:
  --cloud-provider: "aws" | "azure" | "gcp"
    description: "Specify cloud provider for targeted validation"
    example: "/advisor:validate --cloud-provider aws"

  --service-type: string
    description: "Focus validation on specific service type"
    example: "/advisor:validate --service-type api-gateway"

  --sow-document: string
    description: "Path to SOW document for compliance validation"
    example: "/advisor:validate --sow-document ./deployment-sow.md"

  --validation-depth: "quick" | "standard" | "comprehensive"
    description: "Level of validation detail"
    default: "standard"
    example: "/advisor:validate --validation-depth comprehensive"

  --focus-areas: array
    description: "Specific areas to validate"
    options: ["infrastructure", "connectivity", "monitoring", "security"]
    example: "/advisor:validate --focus-areas infrastructure,monitoring"

  --include-remediation: boolean
    description: "Include remediation plan in results"
    default: true
    example: "/advisor:validate --include-remediation"

  --export-report: boolean
    description: "Generate exportable validation report"
    default: false
    example: "/advisor:validate --export-report"

  --baseline-mode: boolean
    description: "Generate baseline if no SOW available"
    default: true
    example: "/advisor:validate --baseline-mode"
```

## Command Processing Workflow

### Phase 1: Validation Scope Analysis
```yaml
validation_processing:
  scope_determination:
    - parse_validation_request: "Understand what needs to be validated"
    - identify_focus_areas: "Determine specific validation areas"
    - assess_available_context: "Check what information is available"
    - determine_validation_depth: "Set appropriate validation thoroughness"

  context_preparation:
    - load_sow_document: "Load SOW document if provided"
    - gather_current_state: "Collect current infrastructure state"
    - identify_expected_components: "Determine what should be validated"
    - set_validation_criteria: "Establish success criteria"
```

### Phase 2: Orchestrator Integration
```yaml
orchestrator_handoff:
  context_preparation:
    conversation_context:
      command_invoked: "/advisor:validate"
      validation_scope: specified_or_inferred_scope
      focus_areas: from_parameters_or_all_areas
      depth_preference: from_validation_depth_parameter

    validation_context:
      sow_document: loaded_sow_or_null
      expected_components: extracted_from_sow_or_inferred
      validation_depth: from_parameter
      focus_areas: from_parameter_or_default

  orchestrator_invocation:
    tool_call: "Task"
    subagent_type: "general-purpose"
    prompt_construction:
      agent_identification: "You are the orchestrator agent"
      command_context: "Processing /advisor:validate command"
      validation_request: original_validation_scope
      parameter_context: extracted_parameters
      expected_workflow: "Route to validator sub-agent"
```

### Phase 3: Response Processing and Formatting
```yaml
response_processing:
  validator_response_parsing:
    - extract_validation_summary: "Parse overall validation status and scores"
    - extract_component_results: "Get individual component validation results"
    - extract_gap_analysis: "Get missing components and configuration issues"
    - extract_remediation_plan: "Get actionable remediation recommendations"

  output_formatting:
    standard_format:
      - validation_summary: "High-level pass/fail status with scores"
      - component_status: "Individual component validation results"
      - gap_analysis: "Missing or misconfigured components"
      - remediation_plan: "Steps to fix identified issues"

    comprehensive_format:
      - include_standard_format: "All standard content"
      - detailed_technical_analysis: "In-depth technical validation details"
      - compliance_assessment: "SOW compliance analysis"
      - risk_assessment: "Risk analysis for identified gaps"

    report_format:
      - executive_summary: "Business-focused validation summary"
      - detailed_findings: "Complete technical validation results"
      - remediation_roadmap: "Prioritized remediation plan"
      - appendices: "Supporting technical details"
```

## Response Format Specifications

### Standard Response Format
```markdown
# Deployment Validation Results

## Validation Summary
- **Overall Status**: ✅ PASSED | ❌ FAILED | ⚠️ PARTIAL SUCCESS
- **Completion Score**: [XX]% ([Y] of [Z] checks passed)
- **Critical Issues**: [N] found
- **Warnings**: [N] found

## Component Validation
### Infrastructure Components
- ✅ **API Gateway**: Deployed and configured correctly
- ❌ **CloudWatch Logs**: Missing log group configuration
- ⚠️ **IAM Roles**: Deployed but missing some permissions

### Connectivity Validation
- ✅ **Endpoint Accessibility**: All endpoints responding
- ❌ **Traffic Flow**: No traffic detected in monitoring

### Monitoring Setup
- ⚠️ **Logging**: Partial logging configuration
- ✅ **Metrics Collection**: All metrics collecting properly

## Gap Analysis
### Missing Components
- CloudWatch Log Group for API Gateway
- X-Ray tracing configuration
- Backup monitoring setup

### Configuration Issues
- IAM role missing CloudWatch:PutLogEvents permission
- API Gateway stage logging not enabled
- Missing custom metrics setup

## Remediation Plan
### Immediate Actions (Critical)
1. **Enable API Gateway Logging**
   ```bash
   aws logs create-log-group --log-group-name API-Gateway-Execution-Logs_[API-ID]/[STAGE]
   ```
   **Impact**: Enables traffic monitoring
   **Time**: 5 minutes

### Short-term Fixes (High Priority)
2. **Update IAM Permissions**
   [Detailed steps...]

### Long-term Improvements (Medium Priority)
3. **Implement Advanced Monitoring**
   [Detailed steps...]

## Validation Commands
```bash
# Re-run validation after fixes
/advisor:validate --focus-areas monitoring

# Verify specific component
/advisor:validate "traffic flow validation"
```
```

### Comprehensive Response Format (with --validation-depth comprehensive)
```markdown
# Comprehensive Deployment Validation Report

## Executive Summary
**Deployment Status**: [Overall assessment]
**Business Impact**: [Impact of identified issues]
**Recommended Actions**: [Key recommendations]
**Timeline for Full Compliance**: [Estimated timeline]

## Detailed Technical Analysis

### Infrastructure Validation
#### AWS API Gateway Analysis
- **Resource Status**: [Detailed status]
- **Configuration Analysis**: [Configuration details]
- **Performance Metrics**: [Current performance data]
- **Compliance Status**: [Against SOW requirements]

#### Monitoring Infrastructure
- **CloudWatch Integration**: [Detailed analysis]
- **Log Flow Analysis**: [Log collection status]
- **Metrics Collection**: [Metrics analysis]
- **Alert Configuration**: [Alerting status]

### Security Validation
- **IAM Permission Analysis**: [Detailed permission review]
- **Network Security**: [Security group analysis]
- **Data Encryption**: [Encryption status]
- **Access Control**: [Access control validation]

### Performance Validation
- **Response Time Analysis**: [Performance metrics]
- **Throughput Testing**: [Load handling analysis]
- **Resource Utilization**: [Resource usage analysis]
- **Scaling Behavior**: [Auto-scaling validation]

## SOW Compliance Analysis
### Requirements Mapping
| SOW Requirement | Implementation Status | Compliance | Notes |
|----------------|----------------------|------------|--------|
| CloudWatch Logging | Partial | ⚠️ Warning | Missing log group |
| IAM Permissions | Complete | ✅ Pass | All permissions configured |
| Monitoring Dashboards | Missing | ❌ Fail | No dashboards found |

### Deviation Analysis
[Detailed analysis of deviations from SOW...]

## Risk Assessment
### High-Risk Issues
- **Issue**: [Description]
  **Risk**: [Risk level and description]
  **Mitigation**: [How to mitigate]

### Medium-Risk Issues
[Continue with risk analysis...]

## Remediation Roadmap
### Phase 1: Critical Fixes (Week 1)
[Detailed remediation plan...]

### Phase 2: Important Improvements (Weeks 2-3)
[Continue with phased approach...]

### Phase 3: Optimization (Month 2)
[Long-term improvements...]
```

### Quick Validation Format (with --validation-depth quick)
```markdown
# Quick Validation Check

## Status: ✅ PASSED | ❌ FAILED | ⚠️ ISSUES FOUND

## Quick Summary
- **Core Components**: [Status]
- **Basic Connectivity**: [Status]
- **Essential Monitoring**: [Status]

## Issues Found
1. [Critical Issue 1]
2. [Critical Issue 2]

## Next Steps
- Run comprehensive validation: `/advisor:validate --validation-depth comprehensive`
- Fix critical issues: [Brief guidance]
- Verify fixes: `/advisor:validate --focus-areas [area]`
```

## Validation Categories and Checks

### Infrastructure Validation
```yaml
infrastructure_checks:
  aws_validation:
    api_gateway_checks:
      - api_gateway_exists: "aws apigateway get-rest-apis"
      - stage_configuration: "aws apigateway get-stage"
      - integration_configuration: "aws apigateway get-integration"
      - deployment_status: "aws apigateway get-deployments"

    lambda_checks:
      - function_exists: "aws lambda get-function"
      - function_configuration: "aws lambda get-function-configuration"
      - execution_role: "aws iam get-role"
      - environment_variables: "Check environment configuration"

    cloudwatch_checks:
      - log_groups_exist: "aws logs describe-log-groups"
      - metric_filters: "aws logs describe-metric-filters"
      - alarms_configured: "aws cloudwatch describe-alarms"
      - dashboards_exist: "aws cloudwatch list-dashboards"

  azure_validation:
    apim_checks:
      - apim_instance_status: "az apim show"
      - api_configuration: "az apim api list"
      - policies_applied: "az apim api policy list"
      - subscription_keys: "az apim subscription list"

    monitoring_checks:
      - application_insights: "az monitor app-insights component show"
      - diagnostic_settings: "az monitor diagnostic-settings list"
      - log_analytics_workspace: "az monitor log-analytics workspace show"
      - custom_dashboards: "az portal dashboard list"

  gcp_validation:
    api_gateway_checks:
      - gateway_deployment: "gcloud api-gateway gateways list"
      - config_deployment: "gcloud api-gateway api-configs list"
      - backend_services: "gcloud compute backend-services list"

    monitoring_checks:
      - cloud_logging: "gcloud logging logs list"
      - cloud_monitoring: "gcloud monitoring dashboards list"
      - error_reporting: "gcloud error-reporting events list"
```

### Connectivity and Traffic Validation
```yaml
connectivity_validation:
  endpoint_testing:
    - basic_reachability: "Test endpoint HTTP response"
    - authentication_flow: "Verify authentication mechanisms"
    - response_validation: "Validate response format and content"
    - error_handling: "Test error response behavior"

  traffic_flow_validation:
    - traffic_generation: "Generate test traffic"
    - log_verification: "Verify traffic appears in logs"
    - metrics_verification: "Check traffic metrics collection"
    - end_to_end_tracing: "Validate complete request flow"

  performance_testing:
    - response_time_measurement: "Measure API response times"
    - load_testing: "Test under expected load"
    - concurrent_request_handling: "Test concurrent request processing"
    - rate_limiting_verification: "Test rate limiting behavior"
```

### Monitoring and Observability Validation
```yaml
monitoring_validation:
  logging_validation:
    - log_generation: "Verify logs are being generated"
    - log_collection: "Check logs reach collection systems"
    - log_format_validation: "Verify log format compliance"
    - log_retention_check: "Verify retention policies applied"

  metrics_validation:
    - metric_collection: "Verify metrics are being collected"
    - metric_accuracy: "Check metric values are accurate"
    - custom_metrics: "Verify custom metrics if configured"
    - metric_retention: "Check metric retention policies"

  alerting_validation:
    - alert_configuration: "Verify alerts are configured"
    - alert_threshold_testing: "Test alert thresholds"
    - notification_testing: "Test alert notifications"
    - escalation_procedures: "Verify escalation workflows"

  dashboard_validation:
    - dashboard_functionality: "Test dashboard displays"
    - data_visualization: "Verify charts show correct data"
    - real_time_updates: "Check dashboards update in real-time"
    - user_access: "Verify appropriate users can access dashboards"
```

## Error Handling and Recovery

### Command-Level Error Handling
```yaml
error_scenarios:
  validation_scope_errors:
    empty_scope_with_no_context:
      error_message: "No validation scope provided and no deployment context available"
      suggestion: "Please specify what to validate or ensure deployment context is available"
      example: "/advisor:validate 'deployment completeness'"

    invalid_focus_areas:
      error_message: "Invalid focus area specified"
      valid_options: ["infrastructure", "connectivity", "monitoring", "security"]

  parameter_validation_errors:
    invalid_validation_depth:
      error_message: "Invalid validation depth specified"
      valid_options: ["quick", "standard", "comprehensive"]

    sow_document_not_found:
      error_message: "SOW document not found at specified path"
      fallback_action: "Proceeding with baseline validation"

  processing_errors:
    validator_agent_failure:
      error_message: "Unable to complete validation analysis"
      fallback_action: "Providing basic infrastructure check"

    insufficient_permissions:
      error_message: "Insufficient permissions to validate some components"
      partial_validation: "Providing validation for accessible components"
```

### Graceful Degradation
```yaml
degradation_strategies:
  partial_access_scenarios:
    - validate_accessible_components: "Validate what can be accessed"
    - clearly_indicate_limitations: "State what couldn't be validated"
    - suggest_permission_fixes: "Recommend permission fixes"

  service_unavailability:
    - use_cached_validation_data: "Use recent cached validation results"
    - provide_manual_validation_steps: "Give manual validation procedures"
    - suggest_retry_timing: "Recommend when to retry validation"

  missing_sow_scenario:
    - generate_baseline_expectations: "Create baseline from current state"
    - use_best_practice_standards: "Apply industry best practices"
    - clearly_indicate_assumptions: "State what assumptions were made"
```

## Integration Points

### Validator Agent Integration
```yaml
validator_coordination:
  request_mapping:
    command_parameters_to_context:
      validation_scope: "user_query"
      cloud_provider: "conversation_context.cloud_provider"
      service_type: "conversation_context.services_mentioned"
      focus_areas: "validation_scope.focus_areas"
      validation_depth: "validation_scope.validation_depth"

  response_processing:
    validator_output_mapping:
      validation_summary: "overall_status and completion_percentage"
      component_results: "component_validation_results"
      gap_analysis: "missing_components and configuration_mismatches"
      remediation_plan: "immediate_actions and long_term_improvements"

  quality_assurance:
    - verify_validation_completeness: "Ensure all requested areas validated"
    - validate_remediation_actionability: "Ensure remediation steps are actionable"
    - check_priority_accuracy: "Verify issue priorities are appropriate"
```

### Data Extractor Integration
```yaml
data_extractor_coordination:
  current_state_requests:
    - infrastructure_inventory: "Get current infrastructure state"
    - service_configurations: "Get detailed service configurations"
    - monitoring_status: "Get current monitoring setup"
    - performance_metrics: "Get current performance data"

  baseline_generation:
    - reference_configurations: "Get reference configurations from docs"
    - best_practice_standards: "Get best practice requirements"
    - historical_baselines: "Get historical successful configurations"
```

### Session Context Integration
```yaml
session_integration:
  validation_history:
    - track_validation_frequency: "Monitor how often validation is run"
    - compare_validation_results: "Compare current vs previous validations"
    - track_remediation_progress: "Monitor progress on fixing issues"

  continuous_improvement:
    - learn_from_validation_patterns: "Identify common validation failures"
    - refine_validation_criteria: "Improve validation standards based on outcomes"
    - optimize_remediation_suggestions: "Improve remediation recommendations"
```

## Usage Examples

### Basic Validation Examples
```bash
# Comprehensive validation
/advisor:validate

# Quick deployment check
/advisor:validate --validation-depth quick

# Focus on specific areas
/advisor:validate --focus-areas infrastructure,monitoring
```

### Advanced Validation Examples
```bash
# SOW compliance validation
/advisor:validate "SOW compliance check" --sow-document ./deployment-sow.md

# Cloud-specific validation
/advisor:validate --cloud-provider aws --service-type api-gateway

# Export detailed report
/advisor:validate --validation-depth comprehensive --export-report

# Monitor-focused validation
/advisor:validate "monitoring completeness" --include-remediation
```

### Scenario-Based Examples
```bash
# Post-deployment validation
/advisor:validate "deployment completeness" --validation-depth standard

# Production readiness check
/advisor:validate --focus-areas security,monitoring --validation-depth comprehensive

# Troubleshooting validation
/advisor:validate "traffic flow validation" --cloud-provider aws

# Compliance audit preparation
/advisor:validate --sow-document ./sow.md --export-report --validation-depth comprehensive
```

## Performance Considerations

### Response Time Targets
```yaml
performance_targets:
  quick_validation: "< 20 seconds"
  standard_validation: "< 45 seconds"
  comprehensive_validation: "< 90 seconds"
  report_generation: "< 30 seconds additional"
```

### Optimization Strategies
```yaml
optimization_strategies:
  parallel_validation:
    - concurrent_component_checks: "Validate multiple components simultaneously"
    - parallel_connectivity_tests: "Test multiple endpoints in parallel"
    - background_report_generation: "Generate reports in background"

  intelligent_caching:
    - cache_infrastructure_state: "Cache infrastructure queries"
    - cache_validation_results: "Cache recent validation results"
    - incremental_validation: "Only re-validate changed components"

  progressive_validation:
    - immediate_critical_checks: "Run critical checks first"
    - progressive_detail_addition: "Add detailed analysis progressively"
    - early_failure_detection: "Fail fast on critical issues"
```