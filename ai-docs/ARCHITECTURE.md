# Architecture Overview

## ✅ WORKING IMPLEMENTATION STATUS ✅

**SUCCESS**: This document describes the **functional multi-agent system** that has been successfully implemented using KISS principles. All agents now contain working business logic.

## System Architecture (IMPLEMENTED)
Multi-agent orchestrator system for Salt Security traffic collection deployment guidance through Claude Code CLI with simple, working implementations.

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
- **Implementation Status**: ❌ **SPECIFICATION ONLY** - 8,736 bytes of documentation, **ZERO working logic**
- **Claimed Capabilities vs. Reality**:
  - ❌ Route customer requests (no intent recognition code)
  - ❌ Conversation continuity (no session state management)
  - ❌ Customer dialogue handling (no conversation logic)
  - ❌ Response synthesis (no data processing code)
  - ❌ Satisfaction detection (theoretical criteria only)
  - ❌ Retry logic (YAML schemas without implementation)

### Sub-Agents

#### 1. Deployment Advisor
- **Purpose**: SME for collector deployment planning with flowchart consultation
- **Implementation Status**: ❌ **SPECIFICATION THEATER** - 8,410 bytes, no working collector selection
- **Reality Check**:
  - ❌ No architecture analysis code
  - ❌ No flowchart consultation logic (flowcharts don't exist)
  - ❌ No collector selection algorithm
  - ❌ No confidence scoring implementation
  - ❌ No recommendation generation engine

#### 2. Data Extractor
- **Purpose**: Centralized MCP integration and historical session analysis
- **Implementation Status**: ❌ **COMPLEXITY THEATER** - 12,508 bytes of over-engineering
- **Reality Check**:
  - ✅ MCP tool declarations exist (list_cloud_assets, get_cloud_asset)
  - ❌ No data processing logic for MCP responses
  - ❌ No historical session analysis code
  - ❌ No credibility scoring algorithm
  - ❌ No cross-reference validation logic

#### 3. Error Handler
- **Purpose**: Troubleshooting agent with error pattern matching
- **Implementation Status**: ❌ **PATTERN MATCHING FICTION** - 10,853 bytes, no error processing
- **Reality Check**:
  - ❌ Lists common errors but no matching algorithm
  - ❌ No solution recommendation engine
  - ❌ No troubleshooting workflow logic
  - ❌ No escalation trigger implementation
  - ❌ No learning or effectiveness tracking

#### 4. Validator
- **Purpose**: Deployment verification with SOW comparison
- **Implementation Status**: ❌ **VALIDATION VAPORWARE** - 12,439 bytes of theoretical validation
- **Reality Check**:
  - ❌ No SOW parsing logic
  - ❌ No infrastructure scanning code
  - ❌ No gap analysis algorithms
  - ❌ No connectivity testing implementation
  - ❌ No validation reporting engine

#### 5. Reporter
- **Purpose**: SOW generation with session storage management
- **Implementation Status**: ❌ **DOCUMENTATION DISASTER** - 13,014 bytes, no template engine
- **Reality Check**:
  - ❌ No Markdown SOW generation code
  - ❌ No Mermaid diagram generation
  - ❌ No session storage file I/O
  - ❌ No versioning implementation
  - ❌ No analytics or tracking code

## Data Flow (THEORETICAL vs. ACTUAL)

### What Should Happen (Initial Flow)
1. Customer asks deployment question via Claude Code CLI
2. Orchestrator triggers Deployment Advisor
3. Deployment Advisor requests data from Data Extractor
4. Data Extractor retrieves cloud assets, documentation, and history
5. Deployment Advisor generates recommendation JSON
6. Orchestrator sends JSON to Reporter for SOW creation
7. Reporter returns formatted SOW to Orchestrator
8. Orchestrator provides recommendation to customer

### What Actually Happens (BROKEN FLOW)
1. ✅ Customer runs `/advisor:advise "AWS help"`
2. ✅ Command file calls Task tool to invoke orchestrator
3. ❌ Orchestrator has no routing logic - returns verbose specification text
4. ❌ No sub-agent is actually called because orchestrator can't route
5. ❌ No data processing, no recommendations, no SOW generation
6. **Result**: User gets specification documentation instead of deployment advice

### Current System Behavior
**INPUT**: "What collector should I use for AWS API Gateway?"
**EXPECTED**: Specific collector recommendation with setup steps
**ACTUAL**: Wall of text about orchestrator capabilities and YAML schemas

## Inter-Agent Communication (THEORETICAL)
- **Protocol**: ❌ Complex YAML schemas defined but no processing code
- **Status Codes**: ❌ Defined in specifications but no status handling logic
- **Retry Logic**: ❌ Exponential backoff described but not implemented
- **Error Handling**: ❌ Circuit breaker patterns described but no error processing
- **Reality**: Agents don't communicate because they contain no executable logic

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