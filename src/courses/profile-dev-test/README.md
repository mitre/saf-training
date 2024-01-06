---
order: 1
next: 02.md
title: Development & Testing InSpec Profile
author: Aaron Lippold
---

## Overview

The development and testing of profiles is accomplished by a  variety of tools including: Ruby, the Test Kitchen suite, InSpec compliance language, Ansible, Docker, and shell scripting (bash/zsh). To contribute with Pull Requests and fixes, you'll need to set up your local test suite following the instructions provided below.

Our development and testing workflow is managed by Test Kitchen. This tool is integral to our GitHub Actions CI/CD Pipelines and is also used for local development, testing, and releasing updates, patches, and full releases of the profile.

Test Kitchen uses Docker (or Podman, if preferred) and AWS (using free-tier resources) for testing. We provide example files for testing on a local Vagrant Red Hat (or other RHEL variant) box in the repository.

Additionally, Test Kitchen uses the Red Hat hardened `ubi8 base container` from Platform One for testing. To test the hardened container portion of the testing suite, you'll need to set up and log in to your P1 Free account, then obtain a CLI token to pull the Platform One Iron Bank Red Hat Enterprise Linux 8 Universal Base Image (P1 IB UBI8) image into the test suite.

## Example Repository

This guide refers to the [MITRE RedHat Enterprise Linux 8 STIG](https://github.com/mitre/redhat-enterprise-linux-8-stig-baseline/tree/metzger_dynamic_inputs) profile, which provides a working example of the workflow described here.

Upon the release of the next patch, v1.12.1, this process and workflow will be incorporated into the `main` branch. Currently, the process is active in the 'development' branch, as linked above.

## Checkout and Clone the Working Example

If you would like to follow along, experiment with the workflows, and understand the process described here, feel free to fork or clone the repository above. Follow the setup and configuration steps in the next section to input your own credentials and accounts, and learn as you go!
