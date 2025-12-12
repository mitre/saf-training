---
title: 1. OHDF Mapper Development Class
shortTitle: OHDF Mapper Development
author: Charles Hu
description: Learn to build OHDF mappers to convert security tool outputs into the standardized Heimdall Data Format
courseVersion: "1.0"
lastUpdated: 2024-12-12
---

# OHDF Mapper Development Class

<CourseVersion />

> Transform any security tool output into the standardized OASIS Heimdall Data Format (OHDF)

## What You'll Learn

By the end of this course, you'll be able to:

- ✅ Understand the OHDF schema structure and components
- ✅ Identify and break down key components of security tool exports
- ✅ Map security data fields to OHDF schema fields
- ✅ Build production-ready *-to-OHDF mappers
- ✅ Integrate mappers into the SAF ecosystem
- ✅ Contribute to the open-source OHDF Converters library

## Course Structure

This class is divided into two main sections:

### Part 1: OHDF Schema Fundamentals
Learn the OHDF schema, its structure, and how security data is standardized.

**Lessons 2-7** · ~2 hours

### Part 2: Building Mappers
Apply your knowledge to create real-world mappers through hands-on development.

**Lessons 8-15** · ~4 hours

---

## Prerequisites

::: tip What You Need
- Basic TypeScript/JavaScript knowledge
- Understanding of JSON schema concepts
- Familiarity with security scanning tools
- Node.js development environment
:::

## Course Outline

::: details Click to see all 15 lessons

### Introduction to OHDF
- **Lesson 2:** What Is OHDF?
- **Lesson 3:** Where Is OHDF Used?

### Understanding the Schema
- **Lesson 4:** OHDF Schema Basics
- **Lesson 5:** Formal OHDF Schema Definition
- **Lesson 6:** OHDF Schema Review
- **Lesson 7:** OHDF Converters

### Building Your Mapper
- **Lesson 8:** What Is an OHDF Mapper?
- **Lesson 9:** The Art of Mapper Making
- **Lesson 10:** Environment Set Up
- **Lesson 11:** Creating a Mapping
- **Lesson 12:** Implementing a Mapper
- **Lesson 13:** Finalizing the Mapper
- **Lesson 14:** More Practice
- **Lesson 15:** Next Steps

### Additional Resources
- **Appendix:** SAF CLI Integration

:::

## Learning Resources

::: info Mapper Examples
This course uses examples from real production OHDF mappers:

👉 [OHDF Converters Library](https://github.com/mitre/heimdall2/tree/master/libs/hdf-converters)

Refer to this repository throughout the course to see how mappers are implemented in production environments.
:::

## About OHDF

The **OASIS Heimdall Data Format (OHDF)** is a standardized JSON format for security tool outputs. It enables:

- 📊 **Unified Reporting** - Compare results across different security tools
- 🔄 **Data Normalization** - Convert any tool output to a common format
- 📈 **Visualization** - Display results in Heimdall for easy analysis
- 🤝 **Interoperability** - Integrate security tools into your pipeline

Learn more at [saf.mitre.org/framework/normalize](https://saf.mitre.org/framework/normalize)

---

## Ready to Start?

::: tip Begin Your Journey
Start with the fundamentals and work your way through building production mappers.

[Begin Lesson 2: What Is OHDF? →](02.md)
:::
