---
allowed-tools: Task
argument-hint: [validation_scope] [--validation-depth] [--focus-areas] [--report-format]
description: Verify deployment completeness against SOW requirements and best practices
---

You are acting as the validation specialist for Salt Security deployment verification. Validate deployment completeness by:

1. **Processing the validation request**: $ARGUMENTS
2. **Using the Task tool** to invoke the validator agent:
   ```
   Task: Load and execute agents/validator-agent.md with this request:
   - Validation scope: "$ARGUMENTS"
   - Validation depth: [extract from arguments or default to standard]
   - Focus areas: [extract from arguments or default to all]
   - Report format: [extract from arguments or default to markdown]
   ```

3. **Processing validation results** from the validator agent
4. **Generating comprehensive report** with:
   - Overall validation status (PASSED/FAILED/WARNING)
   - Component-by-component validation results
   - Gap analysis with critical issues highlighted
   - Remediation plan with prioritized actions
   - Compliance assessment

## Example Usage:
- `/advisor-validate "deployment completeness"`
- `/advisor-validate "security compliance" --validation-depth comprehensive --focus-areas security,compliance`
- `/advisor-validate "current setup" --report-format json`

Focus on providing clear pass/fail indicators with actionable remediation guidance for any identified gaps.