# Deployment Question Flow Example

This example demonstrates how the orchestrator handles a typical deployment guidance request.

## User Query
**User**: "What collector should I use for my AWS API Gateway?"

## Step 1: Intent Recognition and Entity Extraction

**Orchestrator Analysis**:
- **Intent**: `deployment` (user asking for collector recommendation)
- **Cloud Provider**: `aws`
- **Service**: `api_gateway`
- **Question Type**: `collector_selection`

## Step 2: Sub-Agent Request Preparation

**Request to Deployment Advisor**:
```yaml
orchestrator_id: "orchestrator-session-abc123"
request_type: "deployment"
user_query: "What collector should I use for my AWS API Gateway?"
conversation_context:
  previous_questions: []
  cloud_provider: "aws"
  services_mentioned: ["api_gateway"]
  errors_reported: []
  deployment_stage: "planning"
customer_context:
  company_id: null
  architecture_data: null
retry_count: 0
urgency_level: "medium"
```

## Step 3: Task Tool Invocation

**Orchestrator Action**:
```python
Task(
    subagent_type="general-purpose",
    description="AWS API Gateway collector recommendation",
    prompt="""
    You are the Deployment Advisor sub-agent for Salt Security.

    User Query: "What collector should I use for my AWS API Gateway?"

    Request Data: [YAML request above]

    Analyze the user's AWS API Gateway deployment needs and provide collector
    recommendations following the sub-agent-response.yaml schema.

    Consult the Data Extractor if you need current cloud asset information.
    Reference deployment flowcharts for AWS API Gateway decision trees.
    """
)
```

## Step 4: Sub-Agent Response Processing

**Deployment Advisor Response**:
```yaml
status: "success"
data:
  recommendations:
    - collector_type: "aws_api_gateway_collector"
      description: "Specialized collector for AWS API Gateway traffic collection"
      prerequisites:
        - "IAM role with API Gateway read permissions"
        - "VPC endpoint for secure communication"
        - "API Gateway logging enabled"
      deployment_complexity: "medium"
      traffic_coverage: 95
      estimated_deployment_time: "2-4 hours"
      documentation_link: "doc360://collectors/aws-api-gateway-setup"
retry_count: 0
errors: []
knowledge_gaps: []
external_diffs: []
escalation_required: false
confidence_score: 9
processing_time_seconds: 12.5
data_sources_used: ["document360_kb", "deployment_flowcharts"]
next_recommended_action: "validate_prerequisites"
```

## Step 5: Response Synthesis

**Orchestrator Processing**:
1. **Success Detection**: `status: "success"` → No retry needed
2. **Confidence Check**: Score 9/10 → High confidence response
3. **Response Translation**: Convert technical details to user-friendly language

## Step 6: User-Facing Response

**Orchestrator to User**:
```
Based on your AWS API Gateway setup, I recommend the **AWS API Gateway Collector**.

**Key Benefits:**
- Captures 95% of API Gateway traffic
- Medium deployment complexity (2-4 hours estimated)
- Specialized for AWS API Gateway architecture

**Prerequisites needed:**
1. IAM role with API Gateway read permissions
2. VPC endpoint configuration for secure communication
3. API Gateway logging must be enabled

**Next Steps:**
Would you like me to help you validate these prerequisites are in place, or would you prefer detailed setup instructions for the collector?

*[Internal: Satisfaction monitoring active, next_action: validate_prerequisites]*
```

## Step 7: Conversation Continuity Setup

**Orchestrator Context Update**:
- Store recommended collector type for future reference
- Track prerequisites status for follow-up questions
- Monitor user response for satisfaction indicators
- Prepare for likely follow-up: prerequisite validation or setup instructions

## Expected Follow-up Patterns

**Likely User Responses**:
1. "Yes, help me validate prerequisites" → Route to Validator sub-agent
2. "How do I set up the collector?" → Route back to Deployment Advisor with setup focus
3. "I'm getting permission errors" → Route to Error Handler sub-agent
4. "Is there an easier option?" → Route to Deployment Advisor for alternative recommendations

This flow demonstrates the orchestrator's ability to handle natural language deployment questions, coordinate with specialized sub-agents, and maintain conversation context for follow-up interactions.