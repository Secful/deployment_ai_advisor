# External API Documentation - Current Implementation

## Overview
External APIs and interfaces for the Traffic Collection Deployment AI Agent system, focusing on Claude Code CLI integration and customer-facing endpoints.

## External APIs Provided - PLANNED

### Claude Code CLI Integration
#### Orchestrator Invocation
- **Method:** Claude Code Agent Call
- **Path:** Direct agent invocation via Task tool
- **Description:** Main entry point for customer deployment guidance
- **Request:** Natural language deployment questions
- **Response:** Formatted deployment recommendations and SOW
- **Authentication:** Claude Code session authentication
- **Example:** Customer asks "What collector matches my AWS API Gateway setup?"
- **Status:** 🚧 Planned - Orchestrator not yet implemented

#### Salt Command Integration
- **Method:** Salt command execution
- **Path:** `/salt:deploy:*` command family
- **Description:** Structured deployment guidance commands
- **Request:** Command-specific parameters
- **Response:** Deployment advice and validation results
- **Authentication:** Claude Code CLI context
- **Example:** `/salt:deploy:advise`, `/salt:deploy:validate`
- **Status:** 🚧 Planned - Commands framework ready

## External APIs Consumed - CURRENTLY INTEGRATED

### Salt Security Cloud Assets API
#### MCP Integration
- **Service:** Salt API MCP Server
- **Purpose:** Retrieve customer cloud asset information for deployment recommendations
- **Authentication:** Bearer token via environment variables
- **Data Format:** JSON via MCP protocol
- **Example:** Cloud asset discovery for AWS API Gateway, Azure APIM
- **Status:** ✅ Working - MCP server fully functional

### Document360 Knowledge Base
#### Documentation Access
- **Service:** Document360 MCP (planned)
- **Purpose:** Access Salt Security product documentation and deployment guides
- **Authentication:** API key integration
- **Data Format:** Markdown content via MCP
- **Example:** Collector installation guides, troubleshooting documentation
- **Status:** 🚧 Planned - MCP integration not implemented

### Web Search API
#### Gap-Filling Information
- **Service:** Web search integration
- **Purpose:** Fill knowledge gaps and access current AWS/cloud documentation
- **Authentication:** API key or built-in search
- **Data Format:** Search results and content extraction
- **Example:** Latest AWS API Gateway configuration guides
- **Status:** 🚧 Planned - Integration not implemented

## External Interfaces - PLANNED

### Deployment SOW Generation
#### Customer-Facing Reports
- **Format:** Markdown with Mermaid diagrams
- **Content:** Deployment recommendations, resource requirements, expertise levels
- **Delivery:** Via Claude Code CLI response
- **Storage:** Customer-specific and anonymized versions
- **Status:** 🚧 Planned - Reporter sub-agent not implemented

### Session Management
#### Customer History Access
- **Format:** JSON session summaries and deployment history
- **Access Pattern:** Customer-specific historical data for improved recommendations
- **Privacy:** Anonymized general sessions for learning
- **Storage:** Git-based versioned storage
- **Status:** 🚧 Planned - Storage system not implemented