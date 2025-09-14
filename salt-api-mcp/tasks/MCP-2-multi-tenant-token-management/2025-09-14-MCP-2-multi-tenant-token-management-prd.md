# Multi-Tenant Token Management - Product Requirements Document

## Introduction/Overview
The Salt API MCP Server (SaltAPI-Tool) currently uses a single Bearer token 
stored in environment variables to authenticate with Salt Security's Cloud 
Assets API. This enhancement introduces **configurable operation modes** that 
allow the same MCP server to function in either single-tenant or multi-tenant 
configurations based on environment setup.

**Configuration-based Tool Exposure:**
- **Single-token mode**: When `SALT_BEARER_TOKEN` is configured, exposes 
  standard tools (`list_cloud_assets`, `get_cloud_asset`) without company 
  identification requirements
- **Multi-tenant mode**: When `AWS_SECRET_NAME` is configured, exposes 
  company-specific tools (`list_company_cloud_assets`, `get_company_cloud_asset`) 
  that require company identification and use AWS Secrets Manager for token storage

The primary business problem this solves is providing deployment flexibility - 
single customers can use simple token-based authentication while multi-tenant 
deployments get secure, isolated token management with AWS Secrets Manager 
integration and CLI-based token management tools.

## Objectives & Success Metrics

**Business Objectives:**
- Enable configurable operation modes for both single-tenant and multi-tenant 
  deployments using the same MCP server
- Maintain backward compatibility for existing single-token deployments
- Provide secure multi-tenant support with AWS Secrets Manager integration
- Reduce operational overhead through self-service token management tools
- Ensure zero token exposure to LLM systems or logging mechanisms

**Success Metrics:**
- **Deployment Flexibility**: Support both single-tenant and multi-tenant 
  configurations with zero code changes, only environment configuration
- **Backward Compatibility**: 100% compatibility with existing single-token 
  deployments using `SALT_BEARER_TOKEN`
- **Multi-tenant Security**: 100% of multi-tenant tokens stored in AWS Secrets 
  Manager with zero token exposure in logs or LLM interactions
- **Performance**: Sub-second token lookup in multi-tenant mode
- **Operational Efficiency**: 80% reduction in token management time through 
  CLI automation in multi-tenant deployments

## User Personas & Use Cases

### User Personas
**Single-tenant Deployment Admin**: Simple deployment manager
- **Characteristics**: Manages single customer environment, prefers simple 
  configuration, uses environment variables
- **Needs**: Simple token management, minimal configuration, backward compatibility
- **Goals**: Deploy MCP server with minimal setup complexity

**Multi-tenant Operations Team**: Operations team member
- **Characteristics**: Technical support staff with AWS access, handles 
  multiple customer environments
- **Needs**: Secure token management, AWS integration, clear error diagnostics
- **Goals**: Efficiently manage multiple customer tokens without security risks

**CI/CD Pipeline**: Automated deployment system
- **Characteristics**: Programmatic access, runs in automated environments, 
  may use either single or multi-tenant mode
- **Needs**: Reliable token retrieval, consistent error handling, no manual 
  intervention, configuration flexibility
- **Goals**: Automated deployment and testing with appropriate token management

### User Stories
**Single-tenant Mode:**
- As a Single-tenant Deployment Admin, I want to configure the MCP server with 
  just SALT_BEARER_TOKEN so that I get simple, backward-compatible operation
- As an MCP Client in single-tenant mode, I want to call `list_cloud_assets` 
  without company parameters so that I can access cloud assets with minimal complexity

**Multi-tenant Mode:**
- As a Multi-tenant Operations Team member, I want to configure the MCP server 
  with AWS_SECRET_NAME so that multiple customers can be served securely
- As a Multi-tenant Operations Team member, I want to add/view/delete company 
  tokens via CLI so that I can manage multiple customer credentials securely
- As an MCP Client in multi-tenant mode, I want to call `list_company_cloud_assets` 
  with company_id so that I can access company-specific cloud assets
- As an MCP Client, I want clear error messages about which tools are available 
  so that I know how to call the correct tools for the deployment mode

### Use Cases
**Single-tenant Mode (SALT_BEARER_TOKEN configured):**
1. **Simple Deployment**: Administrator sets SALT_BEARER_TOKEN environment 
   variable and starts MCP server with standard tools
2. **Legacy Integration**: Existing deployments continue working without changes
3. **Single Customer Access**: MCP client calls `list_cloud_assets` and 
   `get_cloud_asset` without company parameters

**Multi-tenant Mode (AWS_SECRET_NAME configured):**  
1. **Multi-tenant Setup**: Administrator sets AWS_SECRET_NAME environment 
   variable and starts MCP server with company-specific tools
2. **New Customer Onboarding**: Operations team adds token for new customer 
   with company_id and company_name via CLI
3. **Token Rotation**: Operations team updates existing customer token for 
   security compliance
4. **Customer Offboarding**: Operations team removes all tokens for departing customer
5. **Company-specific Access**: MCP client calls `list_company_cloud_assets` 
   with company_id, system retrieves appropriate token
6. **Token Troubleshooting**: Operations team views masked tokens to verify 
   configuration without exposure

**Error Scenarios:**
1. **Configuration Conflict**: Both SALT_BEARER_TOKEN and AWS_SECRET_NAME set - 
   server prioritizes multi-tenant mode and logs warning
2. **No Configuration**: Neither token configured - server starts but no tools 
   are exposed with clear error messages

## Feature Scope

### In Scope
**Configuration & Mode Detection:**
- Environment-based configuration detection (SALT_BEARER_TOKEN vs AWS_SECRET_NAME)
- Automatic tool exposure based on detected configuration mode
- Configuration conflict resolution with clear priority rules

**Single-tenant Mode:**  
- Full backward compatibility with existing SALT_BEARER_TOKEN setup
- Standard MCP tools (`list_cloud_assets`, `get_cloud_asset`) without company parameters
- Existing error handling and validation behavior

**Multi-tenant Mode:**
- Company-specific MCP tools (`list_company_cloud_assets`, `get_company_cloud_asset`) 
  requiring company identification
- AWS Secrets Manager integration for secure token storage
- CLI-based token management interface (browse, add, delete, show masked)
- Dynamic token loading based on company_id or company_name parameters
- Token masking with first/last 4 characters visible
- AWS IAM role documentation for proper access configuration

**Error Handling & Documentation:**
- Clear error messages for configuration issues
- Mode-specific tool documentation in MCP tool discovery
- Setup instructions for both deployment modes

### Out of Scope
- Token expiration tracking or automatic rotation
- Audit logging of token management operations  
- Permission levels or role-based access control
- Web-based management interface
- Token validation or health checks beyond API response handling
- Migration tools between modes (manual reconfiguration required)

### Future Considerations
- Token expiration monitoring and alerts
- Audit trail for compliance requirements
- Integration with corporate identity providers
- Automated token rotation capabilities

## Functional Requirements

### Cucumber/Gherkin Scenarios
```gherkin
Feature: Configurable Salt API MCP Server (SaltAPI-Tool)

Scenario: Single-tenant mode tool exposure
  Given SALT_BEARER_TOKEN environment variable is set
  And AWS_SECRET_NAME is not configured
  And the MCP server is running
  When an MCP client requests available tools
  Then the system should expose "list_cloud_assets" and "get_cloud_asset"
  And the system should NOT expose company-specific tools
  And tool descriptions should not mention company parameters

Scenario: Multi-tenant mode tool exposure  
  Given AWS_SECRET_NAME environment variable is set
  And SALT_BEARER_TOKEN is not configured
  And the MCP server is running
  When an MCP client requests available tools
  Then the system should expose "list_company_cloud_assets" and "get_company_cloud_asset"
  And the system should NOT expose standard tools
  And tool descriptions should require company identification

Scenario: Configuration conflict resolution
  Given both SALT_BEARER_TOKEN and AWS_SECRET_NAME are set
  And the MCP server is running
  When an MCP client requests available tools
  Then the system should prioritize multi-tenant mode
  And expose only company-specific tools
  And log a warning about configuration conflict

Scenario: Single-tenant mode successful operation
  Given SALT_BEARER_TOKEN is configured with valid token
  And the MCP server is running in single-tenant mode
  When an MCP client calls "list_cloud_assets" without company parameters
  Then the system should use the configured Bearer token
  And make a successful API call to Salt Security
  And return the cloud assets data

Scenario: Multi-tenant mode successful operation with company_id
  Given AWS_SECRET_NAME is configured
  And a valid company_id "ACME-123" exists in AWS Secrets Manager
  And the MCP server is running in multi-tenant mode
  When an MCP client calls "list_company_cloud_assets" with company_id "ACME-123"
  Then the system should retrieve the Bearer token for "ACME-123" from AWS
  And make a successful API call to Salt Security
  And return the cloud assets data

Scenario: Multi-tenant mode successful operation with company_name
  Given AWS_SECRET_NAME is configured
  And a valid company_name "Acme Corp" exists in AWS Secrets Manager
  And the MCP server is running in multi-tenant mode
  When an MCP client calls "list_company_cloud_assets" with company_name "Acme Corp"
  Then the system should retrieve the Bearer token for "Acme Corp" from AWS
  And make a successful API call to Salt Security
  And return the cloud assets data

Scenario: Error when calling wrong tools for mode
  Given the MCP server is running in single-tenant mode
  When an MCP client calls "list_company_cloud_assets"
  Then the system should return a tool not found error
  And suggest using "list_cloud_assets" instead

Scenario: Multi-tenant CLI token management
  Given AWS_SECRET_NAME is configured
  And I have AWS access to the secrets
  When I run the token management CLI in interactive mode
  And I select "Add new token"
  And I provide company_id "NEW-456", company_name "New Corp", and Bearer token
  Then the token should be stored in AWS Secrets Manager
  And the CLI should confirm successful addition

Scenario: Single-tenant mode CLI unavailable
  Given SALT_BEARER_TOKEN is configured
  And the MCP server is running in single-tenant mode
  When I attempt to run the token management CLI
  Then the CLI should display an error message
  And explain that CLI is only available in multi-tenant mode
```

### Detailed Requirements

**Configuration & Mode Detection:**
1. **Environment Detection**: System must detect operation mode based on 
   environment variables (SALT_BEARER_TOKEN vs AWS_SECRET_NAME)
2. **Configuration Priority**: If both variables are set, prioritize multi-tenant 
   mode and log warning about configuration conflict
3. **Startup Validation**: System must validate configuration on startup and 
   provide clear error messages for invalid configurations

**Single-tenant Mode Requirements:**  
4. **Backward Compatibility**: Full compatibility with existing SALT_BEARER_TOKEN 
   configuration and behavior
5. **Tool Exposure**: Expose only `list_cloud_assets` and `get_cloud_asset` 
   tools without company parameters
6. **Error Handling**: Maintain existing error handling behavior for single-token mode

**Multi-tenant Mode Requirements:**
7. **AWS Secrets Integration**: Store all tokens in a single secret named via 
   AWS_SECRET_NAME environment variable in us-east-1 region  
8. **Token Storage Format**: Secret must contain JSON array of objects with 
   company_id, company_name, and token fields
9. **Company-specific Tools**: Expose only `list_company_cloud_assets` and 
   `get_company_cloud_asset` tools requiring company identification
10. **Token Lookup**: Support lookup by either company_id or company_name 
    from the stored JSON array
11. **CLI Token Management**: Provide interactive CLI mode for token operations 
    (browse, add, delete, show masked) - only available in multi-tenant mode
12. **Token Masking**: When displaying tokens, show only first 4 and last 4 
    characters (e.g., "sk-1234...9876")

**Security & Error Handling:**
13. **Security Isolation**: No tokens shall ever be printed to stdout, stderr, 
    or sent to LLM systems in either mode
14. **Mode-specific Errors**: Clear error messages when tools from wrong mode 
    are called, with suggestions for correct tools
15. **Tool Discovery**: MCP tool discovery must return appropriate tools based 
    on detected configuration mode

## Non-Functional Requirements

### Performance
- **Token Lookup Time**: Maximum 2 seconds for token retrieval from AWS 
  Secrets Manager
- **Concurrent Support**: Support multiple concurrent MCP tool calls with 
  different company tokens

### Security
- **Token Storage**: All Bearer tokens must be stored exclusively in AWS 
  Secrets Manager
- **Token Exposure**: Zero tolerance for token exposure in logs, stdout, or 
  LLM interactions
- **AWS Access**: Authentication via AWS_PROFILE configuration and IAM roles
- **Data Protection**: Tokens masked in all user interfaces showing only 
  first/last 4 characters

### Usability
- **CLI Interface**: Intuitive interactive menu for token management operations
- **Error Messages**: Clear, actionable error messages for missing or invalid 
  parameters
- **Tool Documentation**: Updated MCP tool descriptions indicating required 
  company identification parameters

### Reliability
- **Error Recovery**: Graceful handling of AWS Secrets Manager connectivity 
  issues
- **Token Validation**: API-level validation of tokens through Salt Security 
  API responses

### Architecture
- **Design Pattern**: System must follow **Clean Architecture** principles
- **Layer Separation**: Clear separation between AWS integration, token 
  management, and MCP server layers
- **Dependency Inversion**: AWS Secrets Manager implementation abstracted 
  behind interfaces

## Dependencies & Risks

### Dependencies
- **AWS SDK**: AWS SDK for Node.js for Secrets Manager integration
- **AWS Secrets Manager**: Available and accessible in us-east-1 region
- **AWS IAM Permissions**: Proper IAM role configuration for secrets access
- **Existing MCP Infrastructure**: Current MCP server implementation and 
  transport layer

### Risks
- **AWS Service Availability**: AWS Secrets Manager outage could prevent 
  token retrieval - *Mitigation*: Implement retry logic and clear error 
  handling
- **IAM Permission Issues**: Incorrect AWS permissions could prevent secrets 
  access - *Mitigation*: Provide comprehensive IAM setup documentation
- **Token Migration**: No existing tokens to migrate - *Mitigation*: Fresh 
  implementation with clear setup instructions
- **Performance Impact**: Additional AWS API calls for each MCP request - 
  *Mitigation*: Monitor performance and implement caching if needed

## Open Questions
- Should token caching be implemented to reduce AWS API calls, or is 
  real-time lookup acceptable for security reasons?
- What specific AWS IAM policy template should be provided in documentation?
- Should the CLI support bulk token import/export operations for operational 
  efficiency?