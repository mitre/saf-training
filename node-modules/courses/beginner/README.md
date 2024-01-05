---
order: 1
next: 02.md
title: Beginner Security Automation Developer Class
shortTitle: Beginner Profile Development
author: Aaron Lippold
---

## Class Objectives

The purpose of this class is to give you the fundamentals of how to develop security validation content, particularly through hands-on examples developing InSpec profiles. This class will also show participants how to visualize and analyze their security results. By the end, you should be able to achieve all of the following objectives.

### Objectives:

-	Describe the InSpec framework and its capabilities
-	Describe the architecture of an InSpec profile
-	Build an InSpec profile to transform security policy into automated security testing
-	Inherit controls from existing profile baselines into your profiles to avoid rework
-	Run an InSpec profile against a target - a component of an application stack
-	View and analyze InSpec results
-	Report Results
-	Create concise, human-readable control output using RSpec syntax in InSpec profiles

## InSpec 101

- InSpec is an open-source, community-developed compliance validation framework
- Provides a mechanism for defining machine-readable compliance and security requirements
- Easy to create, validate, and read content
- Cross-platform (Windows, Linux, Mac)
- Agnostic to other DevOps tools and techniques
- Integrates into multiple configuration management tools

## The Road to Security Automation

InSpec is one of the primary tools in the Security Automation workflow. It integrates easily with orchestration and configuration management tools found in the DevOps world.

As you can see from the picture below, the process for developing automated security tests is a bit of a journey -- we need to start with a human-language requirements documents like SRGs, STIGs or CIS Benchmark and then implement them as code. We need that code to record test results in a standardized format so that we can easily export our security data somewhere people can use it to make decisions (like the Heimdall visualization app, which we will discuss later).

This challenge is what the [MITRE Security Automation Framework](https://saf.mitre.org) or MITRE SAF was developed to simplify -- to make the journey from a Requirement Document to an automated test profile and back again a little easier to navigate.

![The SAF Lifecycle](../../assets/img/saf-lifecycle.png)

We hope that during this class you will become comfortable with the tools, parts and processes involved in the end-to-end process, and gain the confidence to start automating your compliance journey with the information presented here.  

Let's get started!
