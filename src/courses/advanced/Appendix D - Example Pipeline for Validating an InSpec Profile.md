---
order: 17
title: Appendix D - Example Pipeline for Validating an InSpec Profile
author: Aaron Lippold
headerDepth: 3
---

### RHEL7 Pipeline example 

Below is a [RedHat 7 example](https://github.com/mitre/redhat-enterprise-linux-7-stig-baseline/blob/master/.github/workflows/verify-ec2.yml) of an automated pipeline that creates and configures two machines with the RedHat 7 operating system - one of which is set up as a vanilla configuration, and one of which is hardened using hardening scripts run by the Chef configuration management tool called kitchen.

This pipeline is intended to validate that the RHEL7 InSpec profile itself functions correctly. We're not too concerned with whether out "hardened" box is actually hardened; we just want to know if InSpec is assessing it correctly.

::: note Why Vanilla and Hardened?
Having two test suites, where one is hardened and one is not, can be useful for seeing the differences between how a profile behaves on different types of systems.

It also has the added bonus of simultaneously validating that whatever tool we use for hardening is working correctly.
:::

:::info Modularity in Automation
We will demonstrate the automation process through this example, but note that the different orchestration tools, configuration mangement tools, and targets can be traded out for different uses while following the same automation flow and security automation framework.
:::

![The CI Pipeline](../../assets/img/CI_Pipeline_Flow_EC2_Example.png)

```yaml
name: EC2 Testing Matrix

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  my-job:
    name: Validate my profile
    runs-on: ubuntu-latest
    env:
      CHEF_LICENSE: accept-silent
      KITCHEN_LOCAL_YAML: kitchen.ec2.yml
      LC_ALL: "en_US.UTF-8"
    strategy:
      matrix:
        suite: ['vanilla', 'hardened']
      fail-fast: false
    steps:
      - name: add needed packages
        run: sudo apt-get install -y jq
      - name: Configure AWS credentials
        env:
          AWS_SG_ID: ${{ secrets.SAF_AWS_SG_ID }}
          AWS_SUBNET_ID: ${{ secrets.SAF_AWS_SUBNET_ID }}
        uses: aws-actions/configure-aws-credentials@v1
        with:
          aws-access-key-id: ${{ secrets.SAF_AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.SAF_AWS_SECRET_ACCESS_KEY }}
          aws-region: us-east-1
      - name: Check out repository
        uses: actions/checkout@v2
      - name: Clone full repository so we can push
        run: git fetch --prune --unshallow
      - name: Setup Ruby
        uses: ruby/setup-ruby@v1
        with:
          ruby-version: '2.7'
      - name: Disable ri and rdoc
        run: 'echo "gem: --no-ri --no-rdoc" >> ~/.gemrc'
      - run: bundle install
      - name: Regenerate current `profile.json`
        run: |
          bundle exec inspec json . | jq . > profile.json
      - name: Lint the Inspec profile
        run: bundle exec inspec check .
      - name: Run kitchen test
        run: bundle exec kitchen test --destroy=always ${{ matrix.suite }}-rhel-7 || true
      - name: Display our ${{ matrix.suite }} results summary
        uses: mitre/saf_action@v1
        with:
          command_string: 'view summary -i spec/results/ec2_rhel-7_${{ matrix.suite }}.json'
      - name: Ensure the scan meets our ${{ matrix.suite }} results threshold
        uses: mitre/saf_action@v1
        with:
          command_string: 'validate threshold -i spec/results/ec2_rhel-7_${{ matrix.suite }}.json -F ${{ matrix.suite }}.threshold.yml'
      - name: Save Test Result JSON
        uses: actions/upload-artifact@v2
        with:
          path: spec/results/
```

The two machines are then tested by running an InSpec profile. The results are viewed and validated against a threshold to allow the pipeline to automatically pass or fail based on whether the results meet those thresholds. The SAF CLI is used to view and validate.

:::tip Use Examples to Help Automate
To get more information on setting up the whole automation pipeline for your use case, use examples, such as the [RedHat 7 repository](https://github.com/mitre/redhat-enterprise-linux-7-stig-baseline/). You can view results of the workflows in the [Actions tab](https://github.com/mitre/redhat-enterprise-linux-7-stig-baseline/actions).
:::

### 5.2. Pipeline Example with Manual Attestations

You could also add manual attestations with the SAF CLI to the pipeline to combine applicable manual attestations to the automated test results to determine a more full and accurate look at the overall security posture.​ SAF supports the validation of all controls including both automatable controls and manual attestation of those controls that cannot be automated. This expands the SAF’s coverage across interview, examination, and policy controls.​​

In a general sense we can use the SAF CLI to manage security data in the pipeline, supporting activities for managing POA&Ms.

To practice doing manual attestations, take a look at the [User Class](../user/12.md).

![The CI Pipeline - Attestation](../../assets/img/CI_Pipeline_Flow_EC2_Example_With_Attestation.png)

