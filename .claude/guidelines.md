# Agent Guidelines

These guidelines apply to all sub-agents and agents in the deployment AI advisor system.

## General Rules

### Inter-Agent Communication
- All subagents communicate between themselves using **YAML format** as output. The YAML schemas will be described in each subagent md file
- Subagents will report success/fail of the operation as part of the output report
- If agent A is calling agent B and B responds with fail/partial fail - A will retry up to 3 times
- Follow the established YAML request/response format standards already defined in agent specifications

### Agents Responsibility and Functionality Sharing
Each agent will have unique responsibility and functionality capabilities. If agent A and B share responsibility/functionality one of the following solutions should be chosen for the architecture:
- A calls B / B calls A
- A calls orchestrator and Orchestrator calls B
- Subagent D is created as "utils sub agent" that is called by A and B

### Flows
- Agent description will include explicit flows and examples
- Orchestrator flows will cover:
  - Initial deployment flow
  - Error handling flow - user tried the original deployment SOW, failed and asks for a fix
  - Validate deployment

### Agent Structure Requirements
Make sure that all agents md files match the required structure of a sub agent, for example:
```yaml
name: git-reviewer
description: "🟡 Analyzes commit messages and code quality. Called by git-orchestrator when commit/code quality review is needed. Focuses solely on code/commit quality, not git operation validation."
tools: ["Read", "Grep", "Bash", "mcp__github__*"]
---
```

### Source of Truth by Descending Order

1. **Product KB and internal documentation** are the highest priority and always takes precedence
   - Access is done through MCP
   - Only read (get) operations are allowed

2. **Flowcharts directory** (`/flowcharts/`) - Decision trees and deployment guidance diagrams
   - Contains deployment decision flowcharts and architectural guidance
   - Provides structured decision-making processes for deployment recommendations
   - Located at project root `/flowcharts/` directory

3. **Customer answers** retrieved through Q&A sessions between the agent and the customer

4. **History:** (located at `/sessions/` directory)
   - There are two relevant history storages:
     - Customer specific history - stored reports etc - only accessible for this specific customer. Customer A cannot see Customer B related history
     - General scrubbed history - stored reports etc
   - All historical session data is stored in the `/sessions/` directory at project root
   - When judging precedence between history reports (either for data explicitly mentioned in the report, or result/insight stemming from the content stored in the report) take into account:
     - How long ago was the history report created? New reports have higher credibility
     - Changes in the versions and architecture of the deployment in the report, compared to actual status as extracted from cloud assets
     - Calculate the overall credibility - and according to the mark you got (between 1 and 10) decide precedence over other data sources

### External Data Sources
- All sub agents are allowed to access WWW and AWS documentation
- If there is a mismatch between Product KB/internal documentation and WWW content - make sure that the diff is:
  - Included in JSON output - should it be exposed to customer
  - Stored in the "history" - for both customer and as part of the scrubbed version that is stored for all customer usage