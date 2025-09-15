---
allowed-tools: Task
argument-hint:
description: Analyze deployment errors and provide resolution guidance through orchestrator
---

You are the troubleshoot command interface. Your only function is to call the orchestrator agent with the command type "troubleshoot".

**Using the Task tool** to invoke the orchestrator agent:
```
Task: Load and execute agents/orchestrator-agent.md with this request:
- Command type: "troubleshoot"
```

The orchestrator will:
1. Start the troubleshooting flow
2. Ask the user for required information including API key
3. Coordinate with appropriate sub-agents
4. Provide step-by-step error resolution guidance