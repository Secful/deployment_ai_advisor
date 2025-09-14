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

### Orchestrator
- **Purpose**: Central controller managing sub-agent invocation and customer dialogue
- **Responsibilities**:
  - Route customer requests to appropriate sub-agents
  - Ensure conversation continuity
  - Handle customer-facing dialogue and clarifying questions
  - Combine sub-agent responses into natural answers
  - Understand customer satisfaction

### Sub-Agents

#### 1. Deployment Advisor
- **Purpose**: SME for optimal collector deployment planning
- **Responsibilities**:
  - Retrieve cloud asset status via Data Extractor
  - Consult KB documentation and flow charts
  - Fill knowledge gaps via web search
  - Conduct Q&A sessions with customers
  - Generate deployment recommendation JSON

#### 2. Data Extractor
- **Purpose**: Centralized data retrieval and historical analysis
- **Responsibilities**:
  - Read cloud asset data through MCP
  - Query product KB/documentation
  - Access past anonymized sessions for insights
  - Provide data to other sub-agents

#### 3. Error & Solution Handler
- **Purpose**: Error detection and troubleshooting guidance
- **Responsibilities**:
  - Detect error-related queries
  - Provide known solutions based on customer architectures
  - Learn from unresolved cases
  - Generate error resolution JSON

#### 4. Validator
- **Purpose**: Deployment success verification
- **Responsibilities**:
  - Scan deployment results via Data Extractor
  - Compare SOW against actual status
  - Generate validation diff reports
  - Confirm deployment completeness

#### 5. Reporter
- **Purpose**: Documentation and learning system management
- **Responsibilities**:
  - Store anonymized conversation history
  - Create deployment SOW documents
  - Generate session summaries
  - Manage customer-specific and scrubbed versions

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
- **Protocol**: JSON-based message passing
- **Retry Logic**: Up to 3 retry attempts for failed/partial responses
- **Error Handling**: Success/fail status reporting in all JSON outputs
- **Shared Resources**: Data Extractor accessed by multiple agents

## Data Sources Priority (Descending Order)
1. **Product KB/Internal Documentation** (via MCP)
2. **Customer Q&A Responses** (real-time dialogue)
3. **Historical Data** (customer-specific and general scrubbed sessions)
4. **Web Search & AWS Documentation** (gap-filling information)

## Storage Architecture

### Customer Sessions (`/sessions/[company_id]/[session_version]`)
- Exported session from orchestrator
- Deployment SOW
- Sub-agent failure reports
- Cloud assets JSON snapshot
- Version incremented per session

### General Scrubbed Sessions (`/general_sessions/[session_hash]`)
- MD5 hash of company_id for latest version storage
- Anonymized content with random UUIDs
- Learning data for future customer sessions
- Overwrite allowed for continuous improvement