---
index: true
icon: page
title: Installing InSpec on Linux
author: Aaron Lippold
prev: ./
---
# Install InSpec on Linux

## Option 1 (Package installer)
The InSpec package is available for MacOS, RedHat, Ubuntu and Windows. Download the latest package at [InSpec Downloads](https://downloads.chef.io/inspec) or install InSpec via script:

```
# RedHat, Ubuntu, and macOS
$ curl https://omnitruck.chef.io/install.sh | sudo bash -s -- -P inspec
```

## Option 2 (Terminal install)
Another option is to install InSpec via a command line:

#### 1. Install Ruby

When installing from source, gem dependencies may require ruby build tools to be installed.

For CentOS/RedHat/Fedora:  
`$ yum -y install ruby ruby-devel make gcc gcc-c++`

For Debian/Ubuntu:  
`$ apt-get -y install ruby ruby-dev gcc g++ make`

#### 2. Installing InSpec
Now we’re on to the good stuff. Let’s install InSpec:

To install inspec from rubygems:  
`$ gem install inspec`

#### 3. Installing additional gems
Install the following gems:
```
$ gem install bundler
$ gem install test-kitchen
```

## After Install
Once InSpec is installed, run `inspec version` to verify that the installation was successful.
