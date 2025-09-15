# AWS API Gateway Deployment Decision Tree

## Overview
Decision flowchart for AWS API Gateway traffic collection deployment with collector recommendations and prerequisites validation.

## Decision Flow

### Step 1: API Gateway Type Detection
```mermaid
flowchart TD
    A[User has AWS API Gateway] --> B{API Gateway Type?}
    B --> C[REST API]
    B --> D[HTTP API]
    B --> E[WebSocket API]

    C --> F[Check REST API Configuration]
    D --> G[Check HTTP API Configuration]
    E --> H[WebSocket Not Supported]

    H --> I[Recommend REST/HTTP API Alternative]
```

### Step 2: REST API Configuration Analysis
```mermaid
flowchart TD
    A[REST API Detected] --> B{Integration Type?}
    B --> C[Lambda Integration]
    B --> D[HTTP Integration]
    B --> E[AWS Service Integration]
    B --> F[Mock Integration]

    C --> G[Lambda Proxy Collector]
    D --> H[HTTP Proxy Collector]
    E --> I[Service Integration Collector]
    F --> J[Mock - No Collection Needed]

    G --> K[Check Lambda Permissions]
    H --> L[Check VPC Configuration]
    I --> M[Check Service Permissions]
```

### Step 3: Prerequisites Validation
```mermaid
flowchart TD
    A[Collector Type Selected] --> B{CloudWatch Logs Enabled?}
    B --> |Yes| C{X-Ray Tracing Enabled?}
    B --> |No| D[Enable CloudWatch Logs]

    C --> |Yes| E{VPC Configuration?}
    C --> |No| F[Enable X-Ray Tracing]

    E --> G[VPC Endpoint Required]
    E --> H[Internet Gateway Sufficient]

    D --> I[Configure Log Groups]
    F --> J[Configure X-Ray Role]

    I --> K[Prerequisites Complete]
    J --> K
    G --> L[Create VPC Endpoint]
    H --> K
    L --> K
```

### Step 4: Collector Recommendation
```mermaid
flowchart TD
    A[Prerequisites Complete] --> B{Traffic Volume?}
    B --> C[< 1000 req/min]
    B --> D[1000-10000 req/min]
    B --> E[> 10000 req/min]

    C --> F[Standard API Gateway Collector]
    D --> G[Enhanced API Gateway Collector]
    E --> H[Multi-Instance Collector]

    F --> I[Single Lambda Function]
    G --> J[Lambda + CloudWatch Enhanced]
    H --> K[Load Balanced Multi-Lambda]

    I --> L[Deployment Recommendation]
    J --> L
    K --> L
```

## Decision Logic

### Collector Selection Criteria

#### Standard API Gateway Collector
**Use When:**
- Traffic volume < 1000 requests/minute
- Simple REST API with Lambda integration
- Basic monitoring requirements
- Single region deployment

**Prerequisites:**
- CloudWatch Logs enabled
- Lambda execution role with CloudWatch permissions
- API Gateway CloudWatch role configured

**Deployment Complexity:** Beginner (2/10)
**Success Probability:** 95%
**Time Estimate:** 1-2 hours

#### Enhanced API Gateway Collector
**Use When:**
- Traffic volume 1000-10000 requests/minute
- Multiple integration types
- Advanced monitoring and tracing required
- Multi-stage deployment (dev/staging/prod)

**Prerequisites:**
- CloudWatch Logs with detailed monitoring
- X-Ray tracing enabled
- VPC configuration if private APIs
- Enhanced CloudWatch metrics

**Deployment Complexity:** Intermediate (5/10)
**Success Probability:** 90%
**Time Estimate:** 3-4 hours

#### Multi-Instance Collector
**Use When:**
- Traffic volume > 10000 requests/minute
- High availability requirements
- Multi-region deployment
- Complex API architecture

**Prerequisites:**
- Load balancer configuration
- Cross-region replication
- Advanced monitoring setup
- Dedicated VPC setup

**Deployment Complexity:** Expert (8/10)
**Success Probability:** 85%
**Time Estimate:** 6-8 hours

### Common Gotchas and Solutions

#### Issue: CloudWatch Logs Not Appearing
**Symptoms:** Collector deployed but no traffic logs
**Solution:** Verify API Gateway CloudWatch role has correct permissions
**Check:** API Gateway stage logging configuration

#### Issue: Lambda Cold Start Delays
**Symptoms:** High latency on first requests
**Solution:** Implement Lambda warming or provisioned concurrency
**Prevention:** Use Enhanced collector for consistent traffic

#### Issue: VPC Endpoint Connectivity
**Symptoms:** Timeouts on private API calls
**Solution:** Verify VPC endpoint routing and security groups
**Check:** DNS resolution within VPC

### Integration Points

#### With Deployment Advisor Agent
```yaml
flowchart_consultation:
  input_entities:
    - api_gateway_type: "rest" | "http" | "websocket"
    - integration_type: "lambda" | "http" | "aws_service" | "mock"
    - traffic_volume: number
    - vpc_configuration: boolean

  output_recommendation:
    collector_type: string
    complexity_score: 1-10
    prerequisites: array
    estimated_time: string
    success_probability: percentage
```

#### With Validator Agent
```yaml
validation_checkpoints:
  - cloudwatch_logs_enabled
  - xray_tracing_configured
  - lambda_permissions_correct
  - api_gateway_stage_logging
  - vpc_endpoint_accessibility
```