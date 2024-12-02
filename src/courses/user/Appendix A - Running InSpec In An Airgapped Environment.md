---
order: 17
title: Appendix A - Running InSpec In An Airgapped Environment
author: Mo
headerDepth: 3
---

## 15.1 Running an InSpec profile using a local archive (for air-gapped target systems)

::: tip
For more information on how to install InSpec on an air-gapped system use the [chef instructions](https://docs.chef.io/install_chef_air_gap/) as guidance
:::

## 15.2 Prerequisites

Since a variety of different practices are used to create an air-gapped network, this guide focuses solely on the implementation of Chef software - as such, it makes the following assumptions:

1) You have a way to get packages to your air-gapped machines
2) Machines on your air-gapped network are able to resolve each other using DNS
3) A server’s Fully Qualified Domain Name (FQDN) is the name that will be used by other servers to access it
4) You have a private Ruby gem mirror to supply gems as needed
5) You have an artifact store for file downloads. At a minimum, it should have the following packages available:
    1) Chef Workstation
    2) Chef Infra Client
    3) Chef Supermarket
    4) An [install script](https://docs.chef.io/install_chef_air_gap/#create-an-install-script) for Chef Infra Client

## 15.3 Required cookbooks

This guide will link to the required cookbooks for each piece of software in that software’s respective section, but this is a full list of the cookbooks required to complete the entire guide:

For Chef Supermarket:

- [supermarket-omnibus-cookbook](https://supermarket.chef.io/cookbooks/supermarket-omnibus-cookbook)
- [chef-ingredient](https://supermarket.chef.io/cookbooks/chef-ingredient)
- [hostsfile](https://supermarket.chef.io/cookbooks/hostsfile)

## 15.4 Required Gems

The following Ruby gems are required to install private Supermarket using the supermarket-omnibus-cookbook:

- mixlib-install
- mixlib-shellout
- mixlib-versioning
- artifactory

These should be accessible from your Gem mirror.

## 15.5 Create an install script

An install script is used to install Chef Infra Client when bootstrapping a new node. It simply pulls the Chef Infra Client package from your artifact store, and then installs it. For example, on Debian-based Linux systems, it would look similar to this:

```sh
#!/bin/bash

cd /tmp/
wget http://packages.example.com/chef_13.2.20-1_amd64.deb
dpkg -i chef_13.2.20-1_amd64.deb
```

The install script should be accessible from your artifact store.
