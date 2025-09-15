# Usage Guide

## Overview
Traffic Collection Deployment AI Agent assists Salt Security customers with deployment guidance, troubleshooting, and validation through natural language interactions via Claude Code CLI.

## Command Line Interface - ✅ **FULLY FUNCTIONAL**

### Claude Code Advisor Commands
```bash
# Get deployment recommendation (✅ WORKING)
/advisor:advise "What collector works with my AWS API Gateway?"

# Troubleshoot deployment errors (✅ WORKING)
/advisor:troubleshoot "I'm getting connection timeout errors"

# Validate deployment status (✅ WORKING)
/advisor:validate "deployment completeness"
```

### Enhanced Orchestrator Features
All commands now benefit from the **✅ FULLY FUNCTIONAL** orchestrator with:

**Intelligent Processing:**
- Automatic intent recognition (deployment/troubleshooting/validation)
- Cloud provider detection (AWS/Azure/GCP)
- Multi-agent coordination for complex queries
- Real-time knowledge gap detection and reporting

**Robust Error Handling:**
- YAML status code system with comprehensive parsing
- Exponential backoff retry logic (3 attempts max)
- Circuit breaker pattern for MCP service health monitoring
- Graceful degradation with 4-tier fallback hierarchy

**Adaptive Responses:**
- Real-time satisfaction monitoring with adaptive responses
- Support escalation messaging with multi-channel delivery
- Context-aware error recovery with targeted retry strategies
- Historical session analysis for credibility scoring

**Response Synthesis:**
- Error aggregation and conflict resolution based on data source priority
- Combines multiple agent insights into coherent guidance
- Eliminates redundancy and resolves conflicts with weighted recommendations
- Provides comprehensive, actionable recommendations

**Privacy-Compliant Learning:**
- Anonymized session storage with MD5 hashing and UUID replacement
- Historical analysis for continuous system improvement
- Session metadata tracking with satisfaction indicators
- Comprehensive knowledge gap reporting for system enhancement

### Currently Available - MCP Integration
```bash
# Test Salt API MCP server (✅ Available)
cd salt-api-mcp/
npm run test-mode -- list_cloud_assets --limit 10
npm run test-mode -- get_cloud_asset --id your-asset-id
```

### Natural Language Queries
Direct interaction with orchestrator through Claude Code CLI:

#### Deployment Guidance Questions
- "What collector matches my architecture?"
- "Do I have all prerequisites for collector installation?"
- "Which deployment option is best for AWS API Gateway?"
- "How do I deploy traffic collection for Azure APIM?"

#### Error Troubleshooting Queries
- "I encountered this error: [error message]"
- "My collector isn't receiving traffic"
- "The deployment failed with permissions error"
- "Why is my collector showing offline status?"

#### Validation Requests
- "Is my collector setup complete?"
- "How do I verify traffic is being captured?"
- "Check if my deployment matches the SOW"
- "What's missing from my current setup?"

## Web Interface - NOT PLANNED
Current scope focuses on Claude Code CLI integration only. Future UI/UX enhancements are out of scope for this implementation.

## Configuration - PLANNED

### Environment Setup
```bash
# Salt Security API access (via MCP)
SALT_API_BEARER_TOKEN=your_bearer_token_here

# Document360 access (planned)
DOC360_API_KEY=your_doc360_key_here

# Session storage location
SESSION_STORAGE_PATH=./sessions/

# Learning data location
GENERAL_SESSIONS_PATH=./general_sessions/
```

### Agent Configuration
```json
{
  "orchestrator": {
    "max_retry_attempts": 3,
    "conversation_timeout": 300,
    "default_language": "en"
  },
  "data_extractor": {
    "cache_ttl": 3600,
    "credibility_threshold": 7,
    "max_historical_sessions": 100
  },
  "deployment_advisor": {
    "recommendation_limit": 5,
    "complexity_scoring": true,
    "interactive_qa": true
  }
}
```

## Customer Interaction Examples

### Initial Deployment Flow
```
Customer: "What collector should I use for my AWS setup?"

AI Agent: "I'll analyze your AWS architecture to recommend the optimal collector.
Let me retrieve your current cloud assets..."

[Data Extractor pulls AWS API Gateway, ALB, and EKS cluster info]

AI Agent: "Based on your AWS API Gateway with Application Load Balancer setup,
I recommend the AWS API Gateway Collector. Here's your deployment SOW:

**Deployment Recommendation**
- Collector: AWS API Gateway Collector v2.1
- Resources: 3 API Gateways, 1 ALB
- Estimated time: 2 hours
- Expertise level: Intermediate
- Prerequisites: CloudWatch access, IAM role permissions

Would you like detailed installation instructions?"
```

### Error Troubleshooting Flow
```
Customer: "I'm getting 'Permission denied' errors during collector setup"

AI Agent: "I'll help you resolve this permissions issue. Let me check your current
architecture and known solutions for this error pattern..."

[Error Handler analyzes error against customer's AWS setup]

AI Agent: "This error typically occurs with insufficient IAM permissions.
Based on your API Gateway setup, you need:

1. CloudWatch logs write permissions
2. API Gateway read permissions
3. Lambda invoke permissions (if using Lambda integration)

Here are the specific IAM policy statements needed:
[Detailed policy JSON]

Please apply these permissions and let me know when ready to validate the fix."
```

### Validation Flow
```
Customer: "Is my collector working correctly now?"

AI Agent: "Let me validate your deployment against the SOW requirements..."

[Validator compares expected vs actual deployment state]

AI Agent: "✅ Deployment successful! Your collector is properly configured and
receiving traffic from:
- API Gateway: api-prod-gateway (✅ Active)
- Load Balancer: prod-alb (✅ Traffic flowing)

However, I notice the staging API gateway isn't sending traffic yet.
Would you like me to help configure traffic collection for staging as well?"
```

## Output Formats

### Deployment SOW (Statement of Work)
Generated as Markdown with structured recommendations:

```markdown
# Deployment Statement of Work

## Architecture Summary
Customer has AWS API Gateway with Application Load Balancer...

## Recommended Deployment Options

| Option | Description | Resources | Expertise | Time | Success Rate |
|--------|-------------|-----------|-----------|------|--------------|
| Option A | Standard Gateway Collector | 3 gateways | Intermediate | 2h | 95% |
| Option B | Enhanced with ALB | 3 gateways + ALB | Expert | 4h | 90% |

## Implementation Steps
1. Configure IAM permissions
2. Deploy collector instances
3. Configure traffic mirroring
4. Validate traffic flow

## Prerequisites Checklist
- [ ] CloudWatch access enabled
- [ ] API Gateway logging configured
- [ ] Network connectivity verified
```

### Session History
Stored for learning and customer reference:
- Conversation transcript (customer-specific)
- Deployment decisions and rationale
- Success/failure outcomes
- Anonymized patterns (general learning)

## Common Use Cases

### New Customer Deployment
1. Customer provides basic architecture information
2. Agent analyzes cloud assets and recommends collectors
3. Generates detailed SOW with implementation plan
4. Provides step-by-step guidance
5. Validates successful deployment

### Existing Deployment Troubleshooting
1. Customer reports specific issues or errors
2. Agent analyzes error patterns and architecture
3. Provides targeted solutions based on known fixes
4. Guides through resolution steps
5. Validates fix effectiveness

### Deployment Expansion
1. Customer requests additional coverage
2. Agent analyzes current deployment and gaps
3. Recommends incremental additions
4. Ensures compatibility with existing setup
5. Minimizes deployment disruption