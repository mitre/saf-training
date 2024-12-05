---
order: 1
next: 02.md
title: InSpec Advanced Profile Development
shortTitle: Advanced Profile Development
author: Aaron Lippold
headerDepth: 3
---

## 1.1 Class Objectives

The purpose of this class is to advance your skills in profile development and equip you with the tools to actively participate in the open-source security automation community. This advanced class builds on the fundamentals of the beginner class. By the end, you should be able to achieve the following objectives:

### 1.1.2 Advanced Class Objectives

- Apply the Security Automation Framework (SAF) to your organization’s mission and understand the overall mission of SAF and its tools/techniques.
- Automate security testing and make go/no-go decisions by integrating InSpec scans and the SAF CLI into your workflows, CI/CD pipelines, and other security processes.
- Understand the inner workings of an existing InSpec profile.
- Improve existing InSpec resources to better query their intended targets/components.
- Develop new InSpec resources to query new types of targets or components.
- Propose a pull request to Chef InSpec to contribute your improved/developed InSpec resources back to the community.

## 1.2 About InSpec

- InSpec is an open-source, community-developed compliance validation framework.
- It provides a mechanism for defining machine-readable compliance and security requirements.
- It is easy to create, validate, and read content.
- It is cross-platform (Windows, Linux, Mac).
- It is agnostic to other DevOps tools and techniques.
- It integrates with multiple configuration management tools.

### 1.2.1 The Lab Environment

This class will use GitHub Codespaces to provide a consistent environment for all students. See instructions for setting up your own lab environment [here](../../resources/02.md).

## 1.3 The Road to Security Automation

InSpec is one of the primary tools in the Security Automation workflow. It integrates easily with orchestration and configuration management tools commonly used in the DevOps world.

As shown in the picture below, the process for developing automated security tests starts with human-language requirements documents like SRGs, STIGs, or CIS Benchmarks and then implements them as code. We need that code to record test results in a standardized format so that we can easily export our security data to a place where people can use it to make decisions (like the Heimdall visualization app).

This challenge is what the [MITRE Security Automation Framework](https://saf.mitre.org) or MITRE SAF was developed to simplify -- to make the journey from a Requirement Document to an automated test profile and back again a little easier to navigate.

![The SAF Lifecycle](../../assets/img/saf-lifecycle.png)

## 1.4 Where can I start on my own?

You can contribute to existing profiles that can be found here:
[https://github.com/mitre](https://github.com/mitre)

Alternatively, you can create your own profiles if they don't exist using the following security guidelines:
[https://public.cyber.mil/stigs/downloads/](https://public.cyber.mil/stigs/downloads/)
[https://www.cisecurity.org/cis-benchmarks/](https://www.cisecurity.org/cis-benchmarks/)
