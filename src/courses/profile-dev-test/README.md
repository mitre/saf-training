---
order: 1
next: 02.md
title: Development & Testing InSpec Profile
author: Aaron Lippold
---

# Overview

The development and testing of profiles is accomplished by a  variety of tools including: Ruby, the Test Kitchen suite, InSpec compliance language, Ansible, Docker, and shell scripting (bash/zsh). To contribute with Pull Requests and fixes, you'll need to set up your local test suite following the instructions provided below.

Our development and testing workflow is managed by Test Kitchen. This tool is integral to our GitHub Actions CI/CD Pipelines and is also used for local development, testing, and releasing updates, patches, and full releases of the profile.

Test Kitchen uses Docker (or Podman, if preferred) and AWS (using free-tier resources) for testing. We provide example files for testing on a local Vagrant Red Hat (or other RHEL variant) box in the repository.

Additionally, Test Kitchen uses the Red Hat hardened `ubi8 base container` from Platform One for testing. To test the hardened container portion of the testing suite, you'll need to set up and log in to your P1 Free account, then obtain a CLI token to pull the Platform One Iron Bank Red Hat Enterprise Linux 8 Universal Base Image (P1 IB UBI8) image into the test suite.

