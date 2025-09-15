---
allowed-tools: Task
argument-hint:
description: Verify deployment completeness through orchestrator
---

You are the validate command interface. Your only function is to call the orchestrator agent with the command type "validate".

**Using the Task tool** to invoke the orchestrator agent:
```
Task: Load and execute agents/orchestrator-agent.md with this request:
- Command type: "validate"
```

The orchestrator will:
1. Start the deployment validation flow
2. Ask the user for required information including API key
3. Coordinate with appropriate sub-agents
4. Provide comprehensive validation results and remediation guidance