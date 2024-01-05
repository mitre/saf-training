---
order: 1
next: 02.md
title: SAF User Class
shortTitle: SAF User Class
author: Aaron Lippold
headerDepth: 3
---

## 1.1 Class Overview

The purpose of this class is to gain understanding and hands-on practical use of MITRE's Security Automation Framework with a focus on automating security validation and visualization. There is a survey at the end to give feedback on the class.

## 1.2 Consider your current status

::: tip Take Inventory
How is software secured and maintained in your context? Think about your situation to paint the picture for learning throughout the class.
:::

1. What is your role in the security process of your organization?
2. How frequently and for how much time does the software get assessed?
3. What is the biggest challenge for maintaining and assessing software security?
4. What changes would improve software assessment in your context?
5. What do you want to learn from this training?

## 1.3 Class Objectives:
By the end of the SAF User Class, you should be able to achieve all of the following objectives. 
-	Identify and locate security guidance for a software component.
-	Understand the capabilities available in the main pillars of the MITRE Security Automation Framework - Plan, Harden, Validate, Normalize, Visualize.
-	Define and run an InSpec profile to validate a component against security guidance.
-	Visualize InSpec results and third party security tool data.
-   Automatically export checklist results from a security assessment.

## 1.4 The Road to Security Automation

As you can see from the picture below, the process for developing automated security tests starts with requirements documents like SRGs, STIGs or CIS Benchmark that are written in regular, human language and then implemented as code. We need that code to record test results in a standardized format so that we can easily export our security data somewhere people can use it to make decisions (like the Heimdall visualization app).

This challenge is what the [MITRE Security Automation Framework](https://saf.mitre.org) or MITRE SAF was developed to simplify -- to make the journey from a Requirement Document to an automated test profile and back again a little easier to navigate.


![SAF Lifecycle](../../assets/img/saf-lifecycle.png)

