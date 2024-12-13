---
order: 01
next: 02.md
title: 1. Delta Process Developer Class
author: Daniel Medina, George Dias
---

## 1.1 Class Overview

The purpose of this class is to demonstrate how the MITRE SAF Delta tool can be used to update or generate InSpec profiles. This includes updating an InSpec profile from an old guidance document to a newer guidance document and creating a new baseline profile from older revisions of the same baseline.

### 1.2 Class Objectives

By the end of this class, you should be able to:

- Understand the requirements, purpose, and functionality of the SAF Delta process tools: `update_controls4delta` and `delta`
- Update existing InSpec profiles to newer guidance documentation using `update_controls4delta` and `delta`
- Determine how and where to apply these tools in various scenarios (Use Cases)
- Use the delta fuzzy matching system to map controls between two profiles
- Identify and review delta process history with generated logs and artifacts
- Format InSpec profile controls appropriately before and/or after executing delta commands

### 1.3 Delta Demystify
Cyber security, the practice of protecting computer systems, networks, and data is an ongoing effort
that demands importance vigilance of continuous monitoring and notification of vulnerabilities.

To effectively established an ongoing monitoring process, we need to know what to check for, and
update the content being checked as vulnerabilities are identified. The MITRE training class [Beginner Security Automation Developer Class](https://deploy-preview-256--mitre-saf-training.netlify.app/courses/beginner/) provides an insight on how to use InSpec Profiles (a collection of automated tests) to conduct testes based on some security guidances.

As long as the testes are based on valid security guidances all is well, but the moment the security guidances change, the tests become obsolete and require new tests or existing tests to be updated, that is where the `delta` process comes in to the rescue.
