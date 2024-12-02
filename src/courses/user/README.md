---
order: 1
next: 02.md
title: SAF User Class
shortTitle: 1. SAF User Class
author: Aaron Lippold
headerDepth: 3
---

## 1.1 Class Overview

The purpose of this class is to provide an understanding and hands-on practical use of MITRE's Security Automation Framework (SAF), with a focus on automating security validation and visualization. At the end of the class, there will be a survey to gather your feedback.

## 1.2 Consider Your Current Status

::: tip Take Inventory
How is software secured and maintained in your context? Reflect on your situation to enhance your learning throughout the class.
:::

1. What is your role in the security process of your organization?
2. How frequently and for how long is the software assessed?
3. What is the biggest challenge in maintaining and assessing software security?
4. What changes would improve software assessment in your context?
5. What do you hope to learn from this training?

## 1.3 Class Objectives

By the end of the SAF User Class, you should be able to achieve the following objectives:

- Identify and locate security guidance for a software component.
- Understand the capabilities available in the main pillars of the MITRE Security Automation Framework: Plan, Harden, Validate, Normalize, Visualize.
- Define and run an InSpec profile to validate a component against security guidance.
- Visualize InSpec results and third-party security tool data.
- Automatically export checklist results from a security assessment.

### 1.3.1 The Lab Environment

This class will use GitHub Codespaces to create a consistent environment for all students. See instructions for setting up your own lab environment [here](../../resources/02.md).

## 1.4 The Road to Security Automation

As illustrated in the picture below, the process for developing automated security tests starts with requirements documents like SRGs, STIGs, or CIS Benchmarks, which are written in human-readable language. These documents are then implemented as code. We need that code to record test results in a standardized format so that we can easily export our security data to a platform where it can be used to make informed decisions (such as the Heimdall visualization app).

This challenge is what the [MITRE Security Automation Framework](https://saf.mitre.org) (MITRE SAF) was developed to address. It simplifies the journey from a Requirement Document to an automated test profile and back again, making it easier to navigate.

![SAF Lifecycle](../../assets/img/saf-lifecycle.png)
