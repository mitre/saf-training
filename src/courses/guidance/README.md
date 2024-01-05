---
order: 1
next: 02.md
title: Security Guidance Developer Class
shortTitle: Security Guidance Development
author: Emily Rodriguez
headerDepth: 3
---

## 1.1 Class Overview
The purpose of this class is to outline how security guidance fits in the security validation lifecycle and equip participants with the tools and knowledge to create and use security guidance. There is a survey at the end to give feedback on the class.

### 1.1.1 Class Objectives:
By the end of this class, you should be able to achieve all of the following objectives. 
-	Identify and locate security guidance for a software component.
-	Differentiate between different types of security guidance, such as SRGs and STIGs.
-	Create tailored security guidance using Vulcan.
-	Classify security requirements as Applicable - Configurable, Applicable - Inherently Meets, Applicable - Does Not Meet, Not Applicable, or Not Yet Determined for a given software component.
-   Export security guidance as InSpec stubs to assist in automated security validation.
- Understand how STIG-ready content can be formally peer reviewed by DISA and published to the security community
- Create guidance with Vulcan to support Authority To Operate (ATO) efforts

## 1.2 The Road to Security Automation

As you can see from the picture below, the process for developing automated security tests starts with requirements documents like SRGs, STIGs or CIS Benchmark that are written in regular, human language and then implemented as code. We need that code to record test results in a standardized format so that we can easily export our security data somewhere people can use it to make decisions (like the Heimdall visualization app).

This challenge is what the [MITRE Security Automation Framework](https://saf.mitre.org) or MITRE SAF was developed to simplify -- to make the journey from a Requirement Document to an automated test profile and back again a little easier to navigate.

![The SAF Lifecycle](../../assets/img/saf-lifecycle.png)
