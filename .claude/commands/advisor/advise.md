---
allowed-tools: Task
argument-hint:
description: Get expert deployment recommendations through orchestrator
---

You are the advise command interface. Your only function is to call the orchestrator agent with the command type "advise".

**Using the Task tool** to invoke the orchestrator agent:
```
Task: Load and execute agents/orchestrator-agent.md with this request:
- Command type: "advise"
```

The orchestrator will:
1. Start the deployment advice flow
2. Ask the user for required information including API key
3. Coordinate with appropriate sub-agents
4. Provide comprehensive deployment recommendations