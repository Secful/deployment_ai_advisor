# External Integrations

## Current Integrations

### Salt API MCP Server ✅ Active
- **Purpose**: Retrieve customer cloud asset information for deployment recommendations
- **Protocol**: Model Context Protocol (MCP)
- **Location**: `salt-api-mcp/` subdirectory (independent project)
- **Tools Available**:
  - `list_cloud_assets`: Paginated asset listing
  - `get_cloud_asset`: Individual asset details by ID
- **Authentication**: Bearer token via environment variables
- **Status**: Production-ready with CLI testing interface

### Claude Code CLI Integration ✅ Active
- **Purpose**: Primary interface for customer interactions
- **Framework**: Salt commands structure defined in `salt-commands-hints.md`
- **Agent Invocation**: Task tool integration for orchestrator
- **Commands Available**: Discovery, planning, development, review phases
- **Status**: Framework ready, orchestrator implementation pending

## Planned Integrations

### Document360 MCP Server 🚧 Planned
- **Purpose**: Access Salt Security product knowledge base and documentation
- **Protocol**: Model Context Protocol (MCP)
- **Tools Needed**:
  - `search_articles`: Find relevant documentation
  - `get_article`: Retrieve specific installation guides
  - `list_categories`: Browse documentation structure
- **Authentication**: API key integration
- **Priority**: High - Required for deployment guidance
- **Implementation**: MCP server development needed

### Web Search API 🚧 Planned
- **Purpose**: Fill knowledge gaps and access current cloud provider documentation
- **Integration Options**:
  - Built-in web search tools
  - Google Custom Search API
  - Bing Search API
- **Use Cases**:
  - Latest AWS API Gateway configuration guides
  - Azure APIM deployment best practices
  - Cloud provider service updates
- **Priority**: Medium - Fallback for missing KB content

### AWS Documentation Access 🚧 Planned
- **Purpose**: Real-time access to official AWS service documentation
- **Integration Approach**:
  - AWS Documentation API (if available)
  - Web scraping with rate limiting
  - Cached documentation snapshots
- **Focus Areas**:
  - API Gateway configuration
  - Load Balancer setup
  - IAM permissions and policies
- **Priority**: Medium - Specialized cloud provider guidance

## External Service Dependencies

### Salt Security Cloud Assets API
- **Endpoint**: Company-specific Salt Security API
- **Data Format**: JSON cloud asset inventory
- **Rate Limits**: Managed by MCP server layer
- **Error Handling**: Comprehensive HTTP error mapping
- **Reliability**: Production API with SLA guarantees

### Git Repository Storage
- **Purpose**: Session history and learning data persistence
- **Structure**:
  - Customer sessions: `/sessions/[company_id]/[version]/`
  - Scrubbed sessions: `/general_sessions/[session_hash]/`
- **Version Control**: Git-based with incremental versioning
- **Backup**: Repository-level backup and recovery

### Environment Configuration
- **Configuration Management**: Environment variables and config files
- **Secret Management**: Bearer tokens and API keys
- **Service Discovery**: MCP server endpoint configuration
- **Health Checking**: Integration status monitoring

## Integration Architecture

### MCP Protocol Stack
```
Claude Code CLI
    ↓
Orchestrator Agent
    ↓
MCP Client Layer
    ↓
┌─────────────────┬──────────────────┬──────────────────┐
│ Salt API MCP    │ Document360 MCP │ Web Search MCP   │
│ (implemented)   │ (planned)        │ (planned)        │
└─────────────────┴──────────────────┴──────────────────┘
    ↓                    ↓                    ↓
┌─────────────────┬──────────────────┬──────────────────┐
│ Salt Security   │ Document360      │ Web Search       │
│ Cloud Assets    │ Knowledge Base   │ Services         │
└─────────────────┴──────────────────┴──────────────────┘
```

### Data Flow Integration
1. **Customer Request**: Natural language via Claude Code CLI
2. **Orchestrator Processing**: Route to appropriate sub-agents
3. **Data Retrieval**: MCP tools gather information from external sources
4. **Knowledge Synthesis**: Combine multiple data sources with priority rules
5. **Response Generation**: Format recommendations and guidance
6. **Storage**: Persist session data and learning insights

## Integration Security

### Authentication Flow
- **Bearer Tokens**: Salt Security API access
- **API Keys**: Document360 and web search services
- **Environment Isolation**: Sensitive credentials in environment variables
- **Token Rotation**: Automated credential refresh (planned)

### Data Privacy
- **Customer Data**: Stored in customer-specific directories
- **Anonymization**: PII removal for general learning data
- **Access Control**: Customer session isolation
- **Compliance**: Data handling according to security best practices

### Error Handling
- **Graceful Degradation**: Partial functionality when integrations fail
- **Retry Logic**: Exponential backoff for transient failures
- **Fallback Strategies**: Alternative data sources when primary fails
- **User Communication**: Clear error messages without exposing internals

## Integration Testing

### MCP Integration Tests
```bash
# Test Salt API MCP connectivity
npm run test:integration:salt-api

# Test all MCP servers (when implemented)
npm run test:integration:mcp

# Validate external API responses
npm run test:integration:external-apis
```

### End-to-End Integration
- **Customer Flow Testing**: Complete deployment guidance scenarios
- **Error Recovery Testing**: Integration failure handling
- **Performance Testing**: Response times with external dependencies
- **Data Consistency**: Validation across multiple data sources

## Monitoring and Observability

### Integration Health Checks
- **MCP Server Status**: Availability and response times
- **External API Status**: Third-party service health
- **Data Freshness**: Cache invalidation and update frequencies
- **Error Rate Monitoring**: Integration failure tracking

### Metrics and Alerting
- **Response Time Metrics**: Integration latency tracking
- **Success Rate Monitoring**: API call success percentages
- **Data Quality Metrics**: Information accuracy and completeness
- **Customer Impact**: Integration failures affecting user experience