# Architecture Overview

## System Architecture
Multi-agent orchestrator system designed for Salt Security traffic collection deployment guidance through Claude Code CLI.

## Mermaid Architecture Diagram

```mermaid
classDef orchestrator fill:#e1f5fe,stroke:#0277bd,stroke-width:3px,color:#000
classDef subagent fill:#f3e5f5,stroke:#7b1fa2,stroke-width:2px,color:#000
classDef dataLayer fill:#e8f5e8,stroke:#388e3c,stroke-width:2px,color:#000
classDef external fill:#fff3e0,stroke:#f57c00,stroke-width:2px,color:#000
classDef storage fill:#fce4ec,stroke:#c2185b,stroke-width:2px,color:#000

graph TD
    A[Customer via Claude Code CLI]:::external --> B[Orchestrator]:::orchestrator

    B --> C[Deployment Advisor]:::subagent
    B --> D[Data Extractor]:::subagent
    B --> E[Error & Solution Handler]:::subagent
    B --> F[Validator]:::subagent
    B --> G[Reporter]:::subagent

    D --> H[Salt API MCP Server]:::dataLayer
    D --> I[Document360 MCP]:::dataLayer
    D --> J[Web Search API]:::dataLayer
    D --> K[AWS Documentation]:::dataLayer

    H --> L[Salt Security Cloud Assets API]:::external

    G --> M[Customer Sessions Storage]:::storage
    G --> N[General Scrubbed Sessions]:::storage

    C --> O[Deployment SOW JSON]
    E --> P[Error Solutions JSON]
    F --> Q[Validation Report JSON]

    O --> G
    P --> G
    Q --> G

    G --> R[SOW Markdown Report]
    G --> S[Session Summary]

    subgraph "Data Sources"
        H
        I
        J
        K
    end

    subgraph "Sub-Agents"
        C
        D
        E
        F
        G
    end

    subgraph "Storage Layer"
        M
        N
    end

    subgraph "External Integrations"
        L
        A
    end
```

## Component Responsibilities

### Orchestrator Agent
- **Purpose**: Central controller managing sub-agent invocation and customer dialogue
- **Implementation Status**: Complete specification at agents/orchestrator.md
- **Implemented Capabilities**:
  - Route customer requests to appropriate sub-agents (intent recognition patterns implemented)
  - Ensure conversation continuity (session context integration implemented)
  - Handle customer-facing dialogue and clarifying questions (conversation manager implemented)
  - Combine sub-agent responses into natural answers (response synthesis logic implemented)
  - Understand customer satisfaction (satisfaction detection criteria implemented)
  - Task tool integration with retry logic and error handling (implementation patterns implemented)

### Sub-Agents

#### 1. Deployment Advisor
- **Purpose**: SME for collector deployment planning with flowchart consultation
- **Implementation Status**: Complete specification at agents/deployment-advisor.md
- **Implemented Capabilities**:
  - Architecture analysis and assessment procedures
  - Interactive guidance and Q&A session protocols
  - Flowchart consultation interface for AWS/Azure/GCP decision trees
  - Confidence scoring and success probability calculation methods
  - Multi-option recommendation generation with trade-off analysis
  - Integration patterns with data extractor for historical insights

#### 2. Data Extractor
- **Purpose**: Centralized MCP integration and historical session analysis
- **Implementation Status**: Complete specification at agents/data-extractor.md
- **Implemented Capabilities**:
  - Document360 MCP access control specifications
  - Salt API integration for cloud asset data retrieval
  - Web search coordination for information gap-filling
  - Historical session analysis with credibility scoring algorithms
  - Data source priority handling (Product Docs → Customer → Historical → Cloud → Community)
  - Cross-reference validation and conflict resolution procedures

#### 3. Error Handler
- **Purpose**: Troubleshooting agent with error pattern matching
- **Implementation Status**: Complete specification at agents/error-handler.md
- **Implemented Capabilities**:
  - Error pattern matching and classification procedures
  - Architecture-specific troubleshooting workflow specifications
  - Solution recommendation with step-by-step guidance templates
  - Escalation trigger identification criteria
  - Resolution effectiveness tracking mechanisms
  - Knowledge gap detection for error scenarios

#### 4. Validator
- **Purpose**: Deployment verification with SOW comparison
- **Implementation Status**: Complete specification at agents/validator.md
- **Implemented Capabilities**:
  - Current state analysis and infrastructure scanning procedures
  - SOW compliance validation and gap analysis methods
  - Missing component identification algorithms
  - Validation reporting with remediation plan generation
  - Connectivity and functionality testing specifications
  - Deployment completeness scoring mechanisms

#### 5. Reporter
- **Purpose**: SOW generation with session storage management
- **Implementation Status**: Complete specification at agents/reporter.md
- **Implemented Capabilities**:
  - Markdown SOW generation with Mermaid diagram integration
  - Session storage with customer-specific and anonymized version handling
  - Real-time session tracking and metadata management procedures
  - Document generation with deployment options table formatting
  - Learning data extraction for system improvement processes
  - Version control and session analytics specifications

## Data Flow

### Initial Flow (Deployment Guidance)
1. Customer asks deployment question via Claude Code CLI
2. Orchestrator triggers Deployment Advisor
3. Deployment Advisor requests data from Data Extractor
4. Data Extractor retrieves cloud assets, documentation, and history
5. Deployment Advisor generates recommendation JSON
6. Orchestrator sends JSON to Reporter for SOW creation
7. Reporter returns formatted SOW to Orchestrator
8. Orchestrator provides recommendation to customer

### Error Flow (Troubleshooting)
1. Customer reports error via Claude Code CLI
2. Orchestrator triggers Error & Solution Handler
3. Error Handler checks known solutions for customer architecture
4. If resolved: Error Handler generates solution JSON
5. If unresolved: Trigger Initial Flow for new deployment approach
6. Reporter learns from both resolved and escalated cases

### Validation Flow
1. Customer asks for deployment validation
2. Orchestrator triggers Validator
3. Validator requests current status from Data Extractor
4. Validator compares SOW against actual deployment
5. Validator generates diff report JSON
6. Orchestrator provides validation results to customer

## Inter-Agent Communication
- **Protocol**: Standardized YAML communication schema specifications for all sub-agents
- **Status Codes**: Defined success, partial, fail, critical, timeout states with structured error arrays
- **Retry Logic**: Exponential backoff specifications with maximum 3 attempts (2^n seconds)
- **Error Handling**: Circuit breaker pattern specifications with graceful degradation and escalation procedures
- **Shared Resources**: Data Extractor centralized access specifications with MCP control protocols
- **Quality Assurance**: Response validation, timeout detection, and failure isolation specifications

## Data Sources Priority (Descending Order)
1. **Product KB/Internal Documentation** (via MCP)
2. **Customer Q&A Responses** (real-time dialogue)
3. **Historical Data** (customer-specific and general scrubbed sessions)
4. **Web Search & AWS Documentation** (gap-filling information)

## Storage Architecture

### Customer Sessions (`/sessions/[customer_id]/[version]/`)
- **conversation.json**: Conversation transcript specification with turn-by-turn interaction structure
- **deployment_context.json**: Deployment context specification with recommendation and validation data structures
- **session_metadata.json**: Session analytics specification with performance metrics and satisfaction indicators
- **sow_document.md**: Statement of Work generation specification with Mermaid diagram integration
- **session_analytics.json**: Learning insights specification with complexity analysis and effectiveness tracking

### Session Versioning System
- **Semantic Versioning**: v{major}.{minor}.{patch} format specification with increment rule definitions
- **Conflict Resolution**: Timestamp-based ordering specification with collision handling procedures
- **Context Preservation**: Cross-version relationship tracking and context inheritance specifications
- **Real-time Storage**: Direct file write specifications during conversation with atomic operation requirements

### Anonymized Learning Sessions
- **Customer ID Anonymization**: MD5 hash with salt specification for consistent anonymization procedures
- **Resource Name Sanitization**: UUID replacement specifications for identifiable resource name handling
- **Learning Data Extraction**: Architecture pattern, success factor, and interaction pattern extraction specifications
- **Privacy Compliance**: Anonymization specification with audit trail requirements

### Historical Analysis System
- **Credibility Scoring**: Multi-factor algorithm specification (recency 40%, similarity 40%, success 20%)
- **Pattern Recognition**: Architecture clustering and success correlation analysis specifications
- **Data Source Prioritization**: Historical → KB → Web → Customer documentation priority specifications
- **Continuous Learning**: Feedback incorporation and recommendation refinement procedures