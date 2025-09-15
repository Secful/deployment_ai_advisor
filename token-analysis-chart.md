# Salt Security Deployment AI Advisor - Token Analysis Chart

## File Size Analysis (Generated: December 28, 2024)

### Summary Statistics
- **Total Files**: 9 files (.claude/agents + .claude/commands)
- **Total Words**: 31,497 words
- **Total Characters**: 336,391 characters
- **Estimated Total Tokens**: ~84,100 tokens (chars/4)

---

## 📊 Agent Files Token Distribution

### Large Agents (>20,000 tokens)
```
🟦 orchestrator-agent.md    ████████████████████████████████████████ 37,287 tokens (44.3%)
🟩 reporter-agent.md        ████████████████████████████ 26,080 tokens (31.0%)
```

### Medium Agents (5,000-20,000 tokens)
```
🟨 data-extractor-agent.md  ████████ 6,458 tokens (7.7%)
🟧 validator-agent.md       ███████ 5,998 tokens (7.1%)
```

### Small Agents (<5,000 tokens)
```
🟪 error-handler-agent.md   ████ 3,923 tokens (4.7%)
🟫 deployment-advisor.md    ███ 2,787 tokens (3.3%)
```

---

## 📊 Command Files Token Distribution

### Command Files (All Small)
```
🔹 validate.md              ▌ 534 tokens (0.6%)
🔹 troubleshoot.md          ▌ 518 tokens (0.6%)
🔹 advise.md               ▌ 514 tokens (0.6%)
```

---

## 📋 Detailed Breakdown

| File | Type | Words | Characters | Est. Tokens | % of Total | Category |
|------|------|-------|------------|-------------|------------|----------|
| **orchestrator-agent.md** | Agent | 14,126 | 149,148 | **37,287** | 44.3% | 🔴 Very Large |
| **reporter-agent.md** | Agent | 8,913 | 104,319 | **26,080** | 31.0% | 🔴 Very Large |
| **data-extractor-agent.md** | Agent | 2,595 | 25,833 | **6,458** | 7.7% | 🟡 Medium |
| **validator-agent.md** | Agent | 2,364 | 23,991 | **5,998** | 7.1% | 🟡 Medium |
| **error-handler-agent.md** | Agent | 1,403 | 15,691 | **3,923** | 4.7% | 🟢 Small |
| **deployment-advisor-agent.md** | Agent | 1,324 | 11,148 | **2,787** | 3.3% | 🟢 Small |
| **validate.md** | Command | 258 | 2,136 | **534** | 0.6% | 🔵 Tiny |
| **troubleshoot.md** | Command | 260 | 2,070 | **518** | 0.6% | 🔵 Tiny |
| **advise.md** | Command | 254 | 2,055 | **514** | 0.6% | 🔵 Tiny |

---

## 📈 Size Categories Analysis

### By Token Count:
- **Very Large (>20K tokens)**: 2 files (75.3% of total tokens)
  - orchestrator-agent.md, reporter-agent.md
- **Medium (5K-20K tokens)**: 2 files (14.8% of total tokens)
  - data-extractor-agent.md, validator-agent.md
- **Small (1K-5K tokens)**: 2 files (8.0% of total tokens)
  - error-handler-agent.md, deployment-advisor-agent.md
- **Tiny (<1K tokens)**: 3 files (1.9% of total tokens)
  - All command files

### Key Insights:
1. **Top-Heavy Distribution**: The orchestrator and reporter agents account for 75% of all tokens
2. **Orchestrator Dominance**: The orchestrator-agent.md is the largest file at 37K tokens (44% of total)
3. **Command Efficiency**: All command files are very compact (<600 tokens each)
4. **Agent Complexity Hierarchy**:
   - Orchestrator > Reporter > Data Extractor > Validator > Error Handler > Deployment Advisor

---

## 🎯 Optimization Recommendations

### High Priority (Large Files):
- **orchestrator-agent.md** (37K tokens): Consider modularization
- **reporter-agent.md** (26K tokens): Extract template functions

### Medium Priority (Medium Files):
- **data-extractor-agent.md** (6K tokens): Well-sized
- **validator-agent.md** (6K tokens): Well-sized

### Low Priority (Small/Tiny Files):
- All other files are appropriately sized

---

## 📊 Visual Size Comparison

```
Agent Sizes (Tokens):
    0     10K    20K    30K    40K
    |     |      |      |      |
orchestrator-agent    ████████████████████████████████████████ 37,287
reporter-agent        ████████████████████████████ 26,080
data-extractor        ████████ 6,458
validator            ███████ 5,998
error-handler        ████ 3,923
deployment-advisor   ███ 2,787

Command Sizes (All <600 tokens):
validate.md     ▌ 534
troubleshoot.md ▌ 518
advise.md       ▌ 514
```

---

*Note: Token estimates calculated as characters ÷ 4 (standard approximation for English text)*