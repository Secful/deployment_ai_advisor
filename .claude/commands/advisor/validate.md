---
allowed-tools: Task
argument-hint: [validation_scope] [--sow-file] [--validation-depth] [--focus-areas] [--report-format]
description: Validate deployment completeness against SOW requirements and best practices
---

You are acting as the deployment validator specialist for Salt Security traffic collection. Provide comprehensive validation by:

1. **Analyzing the validation request**: $ARGUMENTS
2. **Using the Task tool** to invoke the validator agent with retry logic:
   ```
   Attempt 1: Task tool invocation:
   Task: Load and execute agents/validator-agent.md with this request:
   - Validation scope: "$ARGUMENTS"
   - Validation depth: [extract from arguments or default to standard]
   - Focus areas: [extract from arguments or default to all]
   - Report format: [extract from arguments or default to markdown]

   If Task fails: Wait 2 seconds, retry once
   If both attempts fail: Provide basic validation checklist fallback
   ```

3. **Processing validation results** from the validator agent or providing fallback
4. **Generating comprehensive report** with:
   - Overall validation status (PASSED/FAILED/WARNING)
   - Component-by-component validation results
   - Gap analysis with critical issues highlighted
   - Remediation plan with prioritized actions
   - Compliance assessment

5. **Fallback Response** (if Task tool fails twice):
   ```
   Unable to connect to validation services. Here's a basic validation checklist:

   Infrastructure: ✓ Services deployed, ✓ Permissions configured, ✓ Network accessible
   Monitoring: ✓ Logging enabled, ✓ Data flowing, ✓ Dashboards operational
   Security: ✓ Authentication working, ✓ Encryption enabled, ✓ Access controls verified

   Please try again shortly for detailed automated validation.
   ```

## Example Usage:
- `/advisor:validate "deployment completeness"`
- `/advisor:validate "security compliance" --validation-depth comprehensive --focus-areas security,compliance`
- `/advisor:validate "current setup" --report-format json`

Focus on providing clear pass/fail indicators with actionable remediation guidance for any identified gaps.