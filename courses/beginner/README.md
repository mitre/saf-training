---
next: 02.md
icon: page
title: 1. Course Overview
author: Aaron Lippold
headerDepth: 3
---

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

![Alt text](../../assets/img/saf-lifecycle.png)

We hope that during this class you will become comfortable with the tools, parts and processes involved in the end-to-end process, and gain the confidence to start automating your compliance journey with the information presented here.  

Let's get started!
