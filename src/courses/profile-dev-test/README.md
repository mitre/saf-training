---
order: 1
next: 02.md
title: 1. Developing & Testing InSpec Profiles
author: Aaron Lippold
---

📚 **Difficulty Level**: Intermediate  
⏱️ **Estimated Time**: 2-3 hours

## Learning Objectives

By completing this module, you will be able to:

- Build and validate InSpec profiles using Test Kitchen
- Configure local testing environments for security compliance
- Execute tests using Docker and AWS environments
- Implement continuous testing workflows
- Troubleshoot common profile development issues

## Prerequisites

Before starting this module, ensure you have:

- Basic knowledge of Ruby ([Learn Ruby Basics](https://ruby-lang.org/en/documentation/quickstart/))
- Docker or Podman installed ([Docker Installation Guide](https://docs.docker.com/get-docker/))
- AWS Free Tier account (optional) ([AWS Sign Up](https://aws.amazon.com/free/))
- Platform One account ([P1 Registration](https://login.dso.mil/))
- Git installed ([Git Setup Guide](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git))

## Skills Assessment

Before proceeding, verify you can:

- [ ] Run basic Ruby commands
- [ ] Execute Docker containers
- [ ] Use Git for version control
- [ ] Navigate command line interfaces

## Overview

The development and testing of profiles are accomplished using a variety of tools, including Ruby, the Test Kitchen suite, InSpec compliance language, Ansible, Docker, and shell scripting (bash/zsh). To contribute with Pull Requests and fixes, you'll need to set up your local test suite by following the instructions provided below.

### Key Tools Explained

- **Test Kitchen**: Integration testing framework
  - Example: `kitchen test` validates your InSpec profiles
  - Use case: Automated compliance testing
- **Docker/Podman**: Container runtime platforms
  - Example: `docker run` creates isolated test environments
  - Use case: Consistent testing across platforms
- **InSpec**: Compliance testing framework
  - Example: `inspec exec` runs compliance checks
  - Use case: Security automation
- **Platform One**: DoD's DevSecOps platform
  - Example: Using hardened containers
  - Use case: Secure development environments

## Development Workflow

Our development and testing workflow is managed by Test Kitchen. This tool is integral to our GitHub Actions CI/CD Pipelines and is also used for local development, testing, and releasing updates, patches, and full releases of the profile.

::: tip Walk before you run!
When starting out, focus on Docker-based testing before moving to AWS environments.
:::

### Testing Environments

Test Kitchen uses Docker (or Podman, if preferred) and AWS (using free-tier resources) for testing. We provide example files for testing on a local Vagrant Red Hat (or other RHEL variant) box in the repository.

### Platform One Integration

Additionally, Test Kitchen uses images from Platform One during the hardened container test of the testing suite.  In order for you to use them as well, you'll need to set up and log in to your P1 account (free but requires registration), then obtain a CLI token to pull the Platform One Iron Bank images into the test suite.

::: important Secrets should be secret!
Ensure you keep your P1 CLI token secure and never commit it to version control.
:::

## Getting Started with Examples

This guide refers to the [MITRE RedHat Enterprise Linux 8 STIG](https://github.com/mitre/redhat-enterprise-linux-8-stig-baseline/tree/metzger_dynamic_inputs) profile, which provides a working example of the workflow described here.

::: note Development vs Releases
Development happens in the `main` branch, with stable versions available as tagged releases.
:::

### Hands-on Practice

If you would like to follow along, experiment with the workflows, and understand the process described here, feel free to fork or clone the repository above. Follow the setup and configuration steps in the next section to input your own credentials and accounts, and learn as you go!

## Next Steps

After setting up your environment, proceed to the next section to learn about specific testing patterns and workflows.
