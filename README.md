# Deployment AI Advisor

AI-powered assistant system for Salt Security customers to deploy, troubleshoot, and manage traffic collection across cloud environments through Claude Code CLI interactions.

## Quick Start

### Prerequisites
- [Claude Code CLI](https://docs.anthropic.com/en/docs/claude-code) installed and configured

### Usage

#### Method 1: Natural Language Orchestrator
Start Claude in the project directory to automatically discover all subagents:

```bash
# Navigate to project directory and start Claude
cd deployment_ai_advisor
claude
```

All subagents are automatically available! Ask questions in natural language:
- `"What collector should I use for AWS API Gateway?"`
- `"I'm getting 403 errors after deployment, how do I fix this?"`
- `"Validate my current setup against best practices"`
- `"Generate a deployment SOW for Azure APIM"`
- `"Use the deployment-advisor subagent to recommend collectors"`
- `"Have the error-handler subagent investigate this 403 error"`

#### Method 2: Slash Commands (Built-in CLI Features)
The project includes proper Claude Code slash commands with autocompletion:

```bash
# Navigate to project directory and start Claude
cd deployment_ai_advisor
claude
```

**Available slash commands:**
- `/advisor:advise "AWS API Gateway setup" --detail-level comprehensive`
- `/advisor:troubleshoot "403 permission errors" --cloud-provider aws --verbose`
- `/advisor:validate "deployment completeness" --validation-depth comprehensive`

**Command Discovery:**
- Type `/` in Claude Code CLI to see all available commands with autocompletion
- Commands are stored in `.claude/commands/advisor/` directory
- Each command has built-in argument hints and descriptions

#### Method 3: Subagent Management
Use the built-in `/agents` command to manage subagents:

```bash
# Navigate to project and start Claude
cd deployment_ai_advisor
claude

# View and manage all available subagents
> /agents
```

**Available Subagents:**
- **orchestrator** - Central controller for multi-agent coordination
- **deployment-advisor** - SME for collector deployment planning
- **data-extractor** - Centralized data retrieval with Document360 access
- **error-handler** - Troubleshooting specialist for error pattern matching
- **validator** - Deployment verification and SOW comparison
- **reporter** - SOW generation and session management

### What You Get

**Deployment Recommendations:**
- Specific collector types and configurations
- Step-by-step implementation procedures
- Prerequisites and resource requirements
- Architecture diagrams and visual guides

**Troubleshooting Support:**
- Error pattern matching and classification
- Diagnostic commands and procedures
- Solution recommendations with success probabilities
- Escalation guidance when needed

**Validation Reports:**
- Deployment completeness assessment
- Gap analysis with remediation plans
- Security and compliance checking
- Performance validation

**Professional Documentation:**
- Statement of Work (SOW) generation
- Architecture diagrams with Mermaid
- Implementation timelines
- Risk assessments and mitigation strategies

## Architecture
