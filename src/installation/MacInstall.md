---
index: true
icon: page
title: Installing InSpec on MacOS
author: Aaron Lippold
prev: ./
---
# Install InSpec on Mac

## Option 1 (Package installer)
The InSpec package is available for MacOS, RedHat, Ubuntu and Windows. Download the latest package at [InSpec Downloads](https://downloads.chef.io/inspec) or install InSpec via script:

```
# RedHat, Ubuntu, and macOS
$ curl https://omnitruck.chef.io/install.sh | sudo bash -s -- -P inspec
```

## Option 2 (Terminal install)
Another option is to install InSpec via a command line:

#### 1. Install Homebrew

Before I could install InSpec, I needed to have the latest version of Ruby installed. And before I could install the latest version of Ruby, I had to install Homebrew, the OS X package manager.

```
$ /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

#### 2. Update Ruby

```
$ brew install rbenv ruby-build
```
Add rbenv to bash so that it loads every time you open a terminal
```
$ echo 'if which rbenv > /dev/null; then eval "$(rbenv init -)"; fi' >> ~/.bash_profile
$ source ~/.bash_profile

$ rbenv install 2.7.2
$ rbenv global 2.7.2
```

Close terminal and reopen.

```
$ ruby -v
```

#### 3. Installing InSpec
Now we’re on to the good stuff. Let’s install InSpec:

```
$ gem install inspec
```

#### 4. Installing additional gems
Install the following gems:
```
$ gem install bundler
$ gem install test-kitchen
```

## After Install
Once InSpec is installed, run `inspec version` to verify that the installation was successful.
