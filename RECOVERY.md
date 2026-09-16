# SAF Training - Session Recovery Guide

**Purpose**: Restore full project context using the Beads board
**Time to restore**: ~5 minutes
**Last updated**: 2025-12-16

---

## Quick Recovery (60 seconds)

```bash
# 1. Navigate to project
cd /Users/alippold/github/mitre/saf-training

# 2. Check current branch
git status

# 3. See what's ready to work on
bd ready

# 4. Show next priority work
bd show $(bd ready --json | jq -r '.[0].id')
```

**You should see**: `saf-training-3ym.1: Merge PR #460 to main` as top priority

---

## Full Recovery (5 minutes)

### Step 1: Check Git State (30 seconds)

```bash
# Current branch
git branch --show-current
# Should be: vitepress-migration-poc

# Commits ahead of origin
git status
# Should show: clean working tree

# Recent work
git log --oneline -5
# Should show: Delta improvements, mapper fixes, etc.
```

### Step 2: Review Beads Board (2 minutes)

```bash
# What's ready to work on (no blockers)
bd ready

# Show all open work
bd list --status open

# Show completed work
bd list --status closed | wc -l
# Should show: 19 completed beads

# Visualize v2.0.0 release workflow
bd dep tree saf-training-3ym --direction both
```

### Step 3: Read Session Context (2 minutes)

**Read in this order**:
1. **This file (RECOVERY.md)** - You're reading it now ✅
2. **SESSION09.md** - Yesterday's work summary
3. **bd show saf-training-bwo** - This recovery ticket details

**Optional deeper context**:
- **STYLE-GUIDE.md** - Patterns established from Delta work
- **DELTA-DEEP-REVIEW.md** - Agent's comprehensive review

### Step 4: Understand Current State (30 seconds)

```bash
# Check PR status
gh pr view 460

# Or visit: https://github.com/mitre/saf-training/pull/460
```

---

## Beads Board Structure

### Understanding the Hierarchy

```
Epic (saf-training-ABC)
  ├── Bead 1 (saf-training-ABC.1)
  ├── Bead 2 (saf-training-ABC.2)
  └── Bead 3 (saf-training-ABC.3)
```

### Our Epics

| Epic ID | Name | Status | Beads |
|---------|------|--------|-------|
| saf-training-h3r | VitePress Migration | Closed ✅ | 4/4 done |
| saf-training-dyb | PDF Generation | Closed ✅ | 4/4 done |
| saf-training-60c | Release Automation | Closed ✅ | 5/5 done |
| saf-training-l7q | Course Quality | Open 🔵 | 3/9 done |
| saf-training-3ym | v2.0.0 Release | Open 🎯 | 0/5 done |
| saf-training-rqi | Nuxt UI Migration | Open 🔮 | 0/2 done |

### Key Beads to Know

**Immediate Priority (P0)**:
- `saf-training-3ym.1` - Merge PR #460 ← **START HERE**
- `saf-training-3ym.2` - Tag v2.0.0 (blocked by merge)
- `saf-training-3ym.3` - Push tag (blocked by tag)

**Active Work (P1)**:
- `saf-training-l7q.4` - Mapper course review
- `saf-training-l7q.5-9` - Other course reviews

**Future (P2)**:
- `saf-training-rqi.*` - Nuxt migration (blocked by v2.0.0)
- `saf-training-6kv` - Plugin dev course
- `saf-training-zwh` - Resource dev course

---

## Common Beads Commands

### Viewing Work

```bash
# What can I work on right now?
bd ready

# Show specific bead details
bd show saf-training-3ym.1

# List all open work
bd list --status open

# Show only epics
bd list -t epic

# Show by priority
bd list -p 0  # P0 only
```

### Updating Work

```bash
# Mark bead as in progress
bd update saf-training-3ym.1 --status in_progress

# Mark as done
bd close saf-training-3ym.1 --reason "PR #460 merged successfully"

# Add a comment/note
bd update saf-training-3ym.1 --body "Waiting for CI checks to pass"
```

### Understanding Dependencies

```bash
# Show what depends on this bead
bd dep tree saf-training-3ym.1 --direction up

# Show what this bead depends on
bd dep tree saf-training-3ym.1 --direction down

# Show complete graph
bd dep tree saf-training-3ym.1 --direction both
```

---

## What to Work On Next

The beads board tells you via `bd ready`, but here's the roadmap:

### Phase 1: Ship v2.0.0 (Current)
1. ✅ All prerequisites done (VitePress, PDF, Release automation)
2. 🎯 **Merge PR #460** ← YOU ARE HERE
3. Tag v2.0.0
4. Push tag → triggers release workflow
5. Verify release succeeded
6. Update README and beads docs

### Phase 2: Course Quality (Ongoing)
- Continue improving courses using established style guide
- Can work in parallel with Phase 1

### Phase 3: Future Enhancements (After v2.0.0)
- Evaluate Nuxt UI Docs migration
- Add new courses (plugin dev, resource dev)
- Consider saf-site integration

---

## Project Files for Context

### Essential Files

| File | Purpose |
|------|---------|
| SESSION09.md | Yesterday's session summary |
| RECOVERY.md | This file - how to restore context |
| STYLE-GUIDE.md | Writing standards from Delta work |
| .beads/ | Beads database (git tracked) |

### Analysis Files (Untracked)

| File | Purpose |
|------|---------|
| DELTA-DEEP-REVIEW.md | Agent's comprehensive Delta review |
| MAPPER-ARCHITECTURE-REVIEW.md | Mapper course architecture analysis |
| DELTA-COURSE-ISSUES.md | Initial Delta issues found |
| MAPPER-COURSE-ISSUES.md | Mapper technical accuracy issues |

---

## Quick Status Check

```bash
# One command to see everything
echo "Branch: $(git branch --show-current)" && \
echo "Status: $(git status --short | wc -l) uncommitted files" && \
echo "Ready work: $(bd ready --json | jq length) beads" && \
echo "Next: $(bd ready --json | jq -r '.[0].title')"
```

**Expected output**:
```
Branch: vitepress-migration-poc
Status: 6 uncommitted files (analysis docs)
Ready work: 10 beads
Next: Merge PR #460 to main
```

---

## Recovery Checklist

When starting a new session:

- [ ] `cd /Users/alippold/github/mitre/saf-training`
- [ ] `git status` - verify branch
- [ ] `bd ready` - see what's next
- [ ] Read SESSION09.md for yesterday's context
- [ ] Check PR #460 status: `gh pr view 460`
- [ ] Ready to work!

---

## Emergency: "I'm Totally Lost"

Run this:
```bash
# Full diagnostic
echo "=== GIT ===" && git status && git log --oneline -3 && \
echo -e "\n=== BEADS ===" && bd ready && \
echo -e "\n=== FILES ===" && ls -1 SESSION*.md && \
echo -e "\n=== NEXT ACTION ===" && bd show $(bd ready --json | jq -r '.[0].id')
```

This shows: git state, beads priorities, session files, and next action.

---

## Beads Best Practices

**When starting work**:
```bash
bd update <bead-id> --status in_progress
```

**When completing work**:
```bash
bd close <bead-id> --reason "Brief explanation"
```

**When discovering new work**:
```bash
bd create "New task title" -p 1 --parent <epic-id>
```

**When blocked**:
```bash
bd update <bead-id> --status blocked
# Add dependency to show what's blocking
```

---

## Next Action

**Right now**: `bd show saf-training-3ym.1`

This shows the "Merge PR #460" bead with full details.

**Then**: Merge the PR and the workflow continues automatically!
