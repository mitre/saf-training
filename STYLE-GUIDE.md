# SAF Training Content Style Guide

**Established From**: Delta and Mapper course improvements (December 2025)
**Version**: 1.0
**Purpose**: Ensure consistency, clarity, and quality across all SAF training courses

---

## Core Principles

### 1. Learner-Centered, Not Reference Documentation

SAF Training courses are **educational journeys**, not technical reference manuals.

**Our approach**:
- Conversational, supportive tone
- Scaffold learning from basics to advanced
- Provide context and "why" before "how"
- Acknowledge multiple entry points and skill levels

**We are NOT**:
- Chef/InSpec docs (terse, technical reference)
- Academic textbooks (formal, theoretical)
- Quick-start guides (minimal explanation)

### 2. Show the Thinking Process

Teach students **how to think** about problems, not just what commands to run.

**Example from Mapper course**:
- Shows iterative mapping process
- Explains reasoning behind decisions
- Acknowledges subjectivity ("your answer may vary")

### 3. First-Person Plural Voice ("We")

**Standard voice**: First-person plural creates collaborative learning environment

```markdown
✅ "Let's run the delta command"
✅ "We can see from the output that..."
✅ "We'll start by collecting the necessary files"

❌ "You should run the delta command"
❌ "The output shows..."
❌ "Run the delta command" (too imperative)
```

**Exception**: Direct instructions where second-person is clearer:
```markdown
✅ "Check your output to ensure..." (in troubleshooting)
```

---

## Writing Standards

### Voice & Tone

**Voice**: First-person plural ("we")
**Tone**: Conversational, supportive, professional

**Good examples**:
- "Let's examine how this works"
- "We can observe that..."
- "Don't worry if you're unfamiliar with X"
- "Try this yourself before checking our solution"

**Avoid**:
- Passive voice: "is used to configure" → "configures"
- Overly formal: "one must ensure" → "we should ensure"
- Condescending: "simply do X" → "let's do X"

---

### Grammar & Mechanics

**Punctuation**:
- One space after periods (never two)
- Use em-dash for breaks: `—` not `--` or `-`
- Oxford comma: "A, B, and C"

**Capitalization**:
- Headings: Title Case ("What Is the Delta Process?")
- Product names: Proper case ("InSpec", "SAF CLI", "OHDF")
- Commands: lowercase in text (`update_controls4delta`)

**Numbers**:
- Spell out one through nine
- Use numerals for 10+
- Exception: Technical values, versions ("Node 22", "RHEL 8")

**Abbreviations**:
- First use: Spell out with abbreviation in parentheses
  - "Extensible Configuration Checklist Description Format (XCCDF)"
- Subsequent uses: Abbreviation only
  - "The XCCDF file contains..."
- OR use info/details blocks for definitions

---

### Code & Technical Content

**Code Blocks**:
- Always specify language: ` ```sh `, ` ```ruby `, ` ```typescript `
- Never use generic: ` ``` `
- Include comments for complex commands

**Commands**:
- Show command + expected output when possible
- Use tabs container for Command/Output separation
- Explain flags and options

**File Paths**:
- Use inline code formatting: `inspec.yml`, `/controls/`
- Be specific: "the `controls` directory" not "the controls folder"

**Links**:
- Use descriptive text: `[InSpec resources documentation](url)`
- Not: `click here`, `[here](url)`, or bare URLs

---

## Content Structure

### Lesson Opening Template

```markdown
---
title: N. Clear Descriptive Title
author: Author Name
---

## What You'll Learn [optional, for complex lessons]

In this lesson, we'll cover:
- Topic 1
- Topic 2
- Topic 3

[Main content starts here]
```

### Section Numbering

**Pattern**: `N.M` where N = lesson number, M = section number

**Example**:
```
Lesson 4:
## 4.1 Use Cases for Running Delta
### 4.1.1 Use Case 1
### 4.1.2 Use Case 2
```

**Rules**:
- Sequential numbering (no skipping)
- Consistent depth (don't go past 4.1.1.1 unless absolutely necessary)

### List Formatting

**Numbered lists**:
```markdown
1. First item
2. Second item
3. Third item
```

**Sub-lists**:
```markdown
1. First item
   a. Sub-item (3 spaces, letter with period)
   b. Sub-item
2. Second item
```

**NOT**:
```markdown
❌ 1. First item
       a - Sub-item (inconsistent with dash)
❌ 1. First item
    a. Sub-item (wrong indentation)
```

**Bullet lists**:
- Use `-` for bullets (not `*` or `+`)
- One level of nesting maximum in body text
- Use numbered lists when order matters

---

## VitePress-Specific Patterns

### Info Containers

**Types and when to use**:

**`::: info`** - Contextual information, definitions
```markdown
::: info About X
Definition or context about X
:::
```

**`::: tip`** - Best practices, helpful hints
```markdown
::: tip Using .nvmrc
Explanation of best practice
:::
```

**`::: warning`** - Cautions, limitations, prerequisites
```markdown
::: warning Before You Start
Prerequisites or cautions
:::
```

**`::: danger`** - Critical warnings, data loss risks
```markdown
::: danger Data Loss Risk
Explanation of risk
:::
```

**`::: details`** - Optional deep-dives, expandable content
```markdown
::: details Optional: Deep Dive Topic
Extended explanation for interested students
:::
```

**Rule**: Essential content goes in main text, supplementary in containers

---

### Code Examples with Tabs

**Use for**: Command + Expected Output

```markdown
::: tabs

== Command

```bash
command here
```

== Expected Output

```bash
output here
```

== Explanation [optional]

Why this command? What does the output mean?

:::
```

---

## Concept Introduction Pattern

**Template for introducing new concepts**:

1. **WHY** it exists (problem it solves)
2. **WHAT** it is (definition)
3. **WHEN** to use it (scenarios)
4. **HOW** to use it (syntax, examples)

**Example (Delta course)**:
```markdown
## What Is the Delta Process?

[WHY] When security guidance is updated, InSpec profiles need updates.
Manual updates are time-consuming and error-prone.

[WHAT] The SAF delta process automates this update, handling:
- Renamed controls
- New controls
- Removed controls

[WHEN] Use delta when STIG/CIS benchmarks are released

[HOW] Two commands: update_controls4delta and delta
[Detailed usage follows...]
```

---

## Decision Guides

**For choices between options**, provide decision trees:

```markdown
### Decision Guide

```
Scenario A? → Option 1
Scenario B? → Option 2
Not sure? → Option 2 (comprehensive)
```
```

**Example from Delta**:
```
Just renaming controls? → update_controls4delta
Need new control stubs? → delta
Control IDs completely changed? → delta with fuzzy matching
```

---

## Images & Visual Aids

**Alt Text**:
- Always include descriptive alt text
- Format: `![Description of what image shows](/path/to/image.png)`
- Not: `![](/path)`, `![image](/path)`, `![img](/path)`

**Example**:
```markdown
✅ ![Delta workflow showing three inputs: profile, XCCDF, and JSON summary](/assets/img/delta_diagram.png)
❌ ![delta diagram](/assets/img/delta_diagram.png)
```

**Light/Dark Variants**:
```markdown
![Description](/assets/img/diagram_light.png#light)
![Description](/assets/img/diagram_dark.png#dark)
```

---

## Terminology Standards

### Consistent Terms

| Concept | Use | Don't Use |
|---------|-----|-----------|
| InSpec profile directory | "InSpec profile", "profile repository" | "profile folder", "InSpec repo" |
| InSpec profile summary | "profile summary", "profile.json" | "InSpec JSON", "summary file" |
| XCCDF file | "XCCDF guidance file", "XCCDF" | "XML file", "guidance doc" |
| Baseline | "baseline" (with version: "RHEL 8 V2R1") | "version", "release" (ambiguous) |
| Control | "control" | "requirement", "test", "check" (use InSpec term) |
| SAF CLI | "SAF CLI" | "saf", "SAF command line" |

### Product/Tool Names

**Capitalization**:
- InSpec (capital I, capital S)
- SAF CLI (all caps SAF)
- OHDF (all caps)
- Heimdall (capital H)
- XCCDF (all caps)
- DISA STIG (all caps DISA and STIG)
- CIS Benchmark (capital C, I, S, B)

---

## Common Patterns

### Introducing Commands

**Template**:
```markdown
### Command Name

**Use when**: [Scenario description]

**What it does**:
- Bullet 1
- Bullet 2

**What it does NOT do**: [if relevant]
- Limitation 1
- Limitation 2

**Example scenario**: [Concrete example]

**Command syntax**:
```sh
command --flag value
```

**Output**: [What to expect]
```

---

### Explaining Technical Processes

**Template**:
```markdown
## Process Name

[Brief overview of what it does]

**The process involves**:
1. Step 1 description
2. Step 2 description
3. Step 3 description

[Detailed walkthrough follows if needed]
```

---

### Providing Examples

**Use real-world examples**:
```markdown
✅ "RHEL 8 V1R14 → V2R1"
✅ "Windows Server 2019 → Windows Server 2022"

❌ "System A → System B"
❌ "Version X → Version Y"
```

**Walk through examples step-by-step**:
1. Show the scenario
2. Show the command
3. Show the output
4. Interpret the results

---

## Quality Checklist

Before considering a lesson complete:

**Content**:
- [ ] Concepts explained (WHY before HOW)
- [ ] Prerequisites stated if needed
- [ ] Examples are concrete (real tools, real versions)
- [ ] Links work and go to correct destinations

**Writing**:
- [ ] Voice is first-person plural ("we")
- [ ] No passive voice unless necessary
- [ ] Jargon defined on first use
- [ ] Grammar and spelling checked

**Formatting**:
- [ ] Code blocks have language tags
- [ ] Lists formatted consistently
- [ ] Section numbering is sequential
- [ ] Images have descriptive alt text

**VitePress**:
- [ ] Info containers used appropriately
- [ ] Essential content not hidden in details blocks
- [ ] Tabs used for command/output pairs

---

## Anti-Patterns (Avoid These)

### ❌ Passive Voice Overuse

```markdown
❌ "The command is used to update controls"
✅ "We use the command to update controls"

❌ "Profiles are generated by the delta process"
✅ "Delta generates the profiles"
```

### ❌ Jargon Without Context

```markdown
❌ "The SRG defines CCIs mapped to NIST controls"
   (Three undefined acronyms!)

✅ "The Security Requirements Guide (SRG) defines Control Correlation Identifiers (CCIs), which map to NIST SP 800-53 security controls"
```

### ❌ Wordiness

```markdown
❌ "In order to perform the delta process, it is necessary to..."
✅ "To run delta, we need..."

❌ "provides an organized structure to articulate"
✅ "organizes"
```

### ❌ Inconsistent Terminology

Pick ONE term and stick with it throughout a lesson/course

### ❌ Missing "Why"

Always explain why something matters or why we're doing it

---

## Examples from Improved Delta Course

### Good: Decision Guide (Lesson 3)

```
Just renaming controls with clear ID mappings? → update_controls4delta
Need stubs for new controls? → delta
Control IDs completely changed? → delta with fuzzy matching
Not sure what changed? → delta (it's comprehensive)
```

**Why it works**: Quick reference, actionable, clear

### Good: Terminology Block (Lesson 2)

```markdown
::: info Understanding Delta Terminology
- **XCCDF File**: The XML file containing security guidance
- **Baseline**: A specific version/release of guidance
- **InSpec Profile**: The Ruby code that tests requirements
:::
```

**Why it works**: Definitions upfront, prevents confusion

### Good: Results Interpretation (Lesson 4)

```markdown
From these results, we can see that:
1. Thirty-one (31) controls were skipped because...
2. Two-hundred-seventy-two (272) controls had their IDs updated...
```

**Why it works**: Interprets output, doesn't just show it

---

## Applying This Guide

### For New Content:
1. Use templates above as starting points
2. Follow voice/tone standards
3. Run through quality checklist

### For Existing Content:
1. Review against anti-patterns
2. Fix critical issues (P0: typos, broken numbering)
3. Improve clarity (P1: add context, standardize voice)
4. Polish (P2: refine examples, add visual aids)

### Evolution:
- This guide will evolve as we improve more courses
- Document new patterns as they emerge
- Update based on student feedback

---

## Maintainer Notes

**This style guide was developed through**:
- Analyzing Delta course (7 lessons)
- Comparing to Mapper course (16 lessons)
- Reviewing Chef InSpec official documentation
- Applying improvements and documenting decisions

**Key insight**: Our courses serve a different purpose than official docs - we teach, they reference. Don't try to match their style; maintain our pedagogical approach while improving clarity and consistency.
