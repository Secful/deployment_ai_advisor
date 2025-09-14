# Deployment Decision Flowcharts

## Overview
This directory contains decision tree flowcharts that guide collector recommendations for Salt Security traffic collection deployment across different cloud platforms and services.

## Flowchart Files

### Cloud Platform Flowcharts
- **[aws-api-gateway-flow.md](aws-api-gateway-flow.md)** - AWS API Gateway deployment decision tree with collector selection and prerequisites
- **[azure-apim-flow.md](azure-apim-flow.md)** - Azure API Management deployment flowchart with architecture-specific guidance
- **[gcp-api-gateway-flow.md](gcp-api-gateway-flow.md)** - Google Cloud API Gateway deployment patterns and collector recommendations

### Validation and Integration
- **[deployment-validation-flow.md](deployment-validation-flow.md)** - Deployment success verification with SOW comparison logic
- **[flowchart-consultation-interface.md](flowchart-consultation-interface.md)** - Standardized interface for deployment-advisor agent integration

## Flowchart Structure

Each flowchart follows a standardized structure:

### 1. Overview Section
- Purpose and scope of the decision tree
- Target use cases and scenarios

### 2. Decision Flow Diagrams
- Mermaid flowchart diagrams showing decision paths
- Step-by-step decision logic with branching
- Clear visual representation of choices and outcomes

### 3. Decision Logic
- Detailed criteria for each decision point
- Collector selection recommendations
- Complexity scoring and success probability estimates

### 4. Prerequisites and Configuration
- Required components and permissions
- Configuration templates and examples
- Common gotchas and solutions

### 5. Integration Points
- Interfaces with other system components
- YAML schemas for agent communication
- Validation checkpoints and monitoring setup

## Usage by Sub-Agents

### Deployment Advisor Agent Integration
The deployment-advisor agent consults these flowcharts through the standardized interface:

```yaml
flowchart_consultation:
  input: user_context + technical_context
  process: navigate_decision_tree + apply_business_logic
  output: collector_recommendation + implementation_plan
```

### Validator Agent Integration
The validator agent uses validation flowcharts to verify deployment completeness:

```yaml
validation_process:
  input: deployed_components + sow_requirements
  process: component_validation + gap_analysis
  output: validation_report + remediation_plan
```

## Decision Criteria

### Complexity Scoring (1-10 Scale)
- **1-3**: Beginner - Basic setup, minimal configuration
- **4-6**: Intermediate - Moderate complexity, some advanced features
- **7-10**: Expert - Complex architecture, enterprise features

### Success Probability Factors
- User experience level compatibility
- Prerequisites availability
- Architecture complexity alignment
- Historical deployment success rates

### Time Estimation Methodology
- Base deployment time per collector type
- Complexity multipliers based on architecture
- User experience level adjustments
- Infrastructure provisioning time

## Flowchart Maintenance

### Version Control
- All flowcharts are version controlled with clear change documentation
- Decision logic updates require validation against historical data
- New scenarios added based on real customer deployment patterns

### Quality Assurance
- Cross-flowchart consistency validation
- Prerequisite completeness verification
- Success probability accuracy tracking
- Regular updates based on deployment outcome feedback

### Testing Strategy
- Decision path testing with known scenarios
- Integration testing with deployment-advisor agent
- Validation against real deployment outcomes
- Performance testing for consultation response times

## Common Decision Patterns

### Service Type Detection
Most flowcharts start with service type identification:
1. Detect primary service (API Gateway, Load Balancer, etc.)
2. Identify integration patterns
3. Assess traffic volume and complexity
4. Apply security and compliance requirements

### Collector Selection Logic
Standard collector recommendation process:
1. Match service type to available collectors
2. Assess architecture complexity requirements
3. Evaluate user expertise level
4. Calculate optimal collector configuration

### Prerequisites Validation
Consistent prerequisite checking approach:
1. Identify required cloud service enablements
2. Verify IAM permissions and roles
3. Check network configuration requirements
4. Validate monitoring and logging setup

## Integration with Claude Code CLI

These flowcharts are designed to be consulted programmatically by the deployment-advisor agent running within Claude Code CLI. The agent processes natural language user queries, maps them to flowchart consultation requests, and returns structured recommendations in user-friendly format.

### Example Consultation Flow
```
User Query: "What collector should I use for my AWS API Gateway?"
↓
Agent extracts: cloud_provider=aws, service=api_gateway
↓
Consults: aws-api-gateway-flow.md via flowchart-consultation-interface
↓
Returns: Collector recommendation with implementation steps
```

## Future Enhancements

### Planned Additions
- Database service deployment flowcharts
- Container orchestration platform flowcharts
- Multi-cloud deployment decision trees
- Cost optimization flowcharts

### Machine Learning Integration
- Dynamic decision criteria based on deployment outcomes
- Personalized recommendations based on user success history
- Automated flowchart refinement based on feedback loops