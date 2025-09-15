---
allowed-tools: Task
argument-hint: [report_type] [--format] [--detail-level] [--include-diagrams] [--output-file]
description: Generate deployment SOWs, session summaries, and implementation documentation
---

You are acting as the documentation specialist for Salt Security deployment reporting. Generate professional documentation by:

1. **Processing the report request**: $ARGUMENTS
2. **Using the Task tool** to invoke the reporter agent:
   ```
   Task: Load and execute agents/reporter-agent.md with this request:
   - Report type: "$ARGUMENTS"
   - Output format: [extract from arguments or default to markdown]
   - Detail level: [extract from arguments or default to standard]
   - Include diagrams: [extract from arguments or default to true]
   - Output file: [extract from arguments if specified]
   ```

3. **Processing documentation** from the reporter agent
4. **Delivering formatted output** with:
   - Professional SOW documents with implementation timelines
   - Architecture diagrams using Mermaid syntax
   - Comprehensive deployment guides
   - Risk assessments and mitigation strategies
   - Executive summaries and technical details

## Example Usage:
- `/advisor-report "sow"`
- `/advisor-report "compliance" --format pdf --include-diagrams`
- `/advisor-report "session summary" --detail-level comprehensive --output-file ./deployment-summary.md`

Focus on creating professional, actionable documentation suitable for technical teams and stakeholders.