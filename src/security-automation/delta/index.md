---
title: 1. Delta Process Developer Class
shortTitle: SAF Delta
author: Aaron Lippold
description: Compare and analyze changes between InSpec profiles
outline: [2, 5]
---

# SAF Delta

<CourseVersion />


> Compare and analyze changes between InSpec profiles

## What You'll Learn

By the end of this course, you'll be able to:

- ✅ Understand the delta process workflow
- ✅ Use SAF CLI delta commands
- ✅ Compare profile versions
- ✅ Analyze control changes
- ✅ Generate delta reports
- ✅ Integrate delta into workflows

## Prerequisites

::: warning Before You Start
Basic InSpec knowledge
Command line proficiency
Understanding of version control
:::

## Course Outline

**7 Lessons** · ~3 hours

[View detailed course outline in sidebar →](#)

---

## What Is the Delta Process?

When security guidance is updated (such as a new STIG version release), InSpec profiles need to be updated to match the new requirements. Manually updating profiles is:
- ⏱️ Time-consuming (reviewing 200+ controls one by one)
- 🐛 Error-prone (easy to miss changes or introduce mistakes)
- 😓 Tedious (repetitive metadata updates)

**The SAF delta process automates this update**, handling:
- ✅ Renamed controls (ID changed between versions)
- ✅ New controls (added in new guidance)
- ✅ Removed controls (deprecated in new guidance)
- ✅ Metadata updates (severity, descriptions, check/fix procedures)
- ✅ Preserving your test code (the Ruby describe blocks you wrote)

**Result**: What previously took days now takes minutes, with detailed reports of all changes.

---

## Ready to Start?

::: tip Begin Learning
Start your journey with SAF Delta.

[Begin Lesson 2 →](02.md)
:::
