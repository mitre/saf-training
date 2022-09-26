---
index: 1
icon: page
title: Installing InSpec On Your Machine
author: Aaron Lippold
prev: /
---

# Installing InSpec 

You can install InSpec in many ways on your system.

- [Install on MacOS](MacInstall.md)
- [Install on Linux](LinuxInstall.md)
- [Install on Windows](WindowsInstall.md)

Should you have any issues, take a look at the core documentation as well

- <https://docs.chef.io/inspec/install/>

## Understanding many ways of installing/staging InSpec, depending on your assessment restrictions

### Mac
The InSpec package is available for MacOS, RedHat, Ubuntu and Windows. Download the latest package at [InSpec Downloads](https://downloads.chef.io/inspec) or install InSpec via script:

```
# RedHat, Ubuntu, and macOS
$ curl https://omnitruck.chef.io/install.sh | sudo bash -s -- -P inspec
```

### Linux
The InSpec package is available for MacOS, RedHat, Ubuntu and Windows. Download the latest package at [InSpec Downloads](https://downloads.chef.io/inspec) or install InSpec via script:

```
# RedHat, Ubuntu, and macOS
$ curl https://omnitruck.chef.io/install.sh | sudo bash -s -- -P inspec
```

### Windows
The InSpec package is available for MacOS, RedHat, Ubuntu and Windows. Download the latest package at [InSpec Downloads](https://downloads.chef.io/inspec) or install InSpec via script:

```
# Windows
. { iwr -useb https://omnitruck.chef.io/install.ps1 } | iex; install -project inspec
```
