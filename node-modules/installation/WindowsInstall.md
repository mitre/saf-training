---
index: true
icon: page
title: Installing InSpec on Windows
author: Aaron Lippold
prev: ./
---
# Install InSpec on Windows

## Install Ruby
Go to [https://rubyinstaller.org/downloads/](https://rubyinstaller.org/downloads/) and download and install the newest ruby that corresponds with your operating system, it will look like this: `Ruby+Devkit x.x.x`.  
* **Make sure when installing** that the two checkboxes are checked for `Add Ruby executables to your PATH` and `Associate .rb and .rbw files with this Ruby installation`
* When installation is complete keep the last checkbox marked to perform ridk installation. Once console pops up and prompts you to interact then press `enter`. When this is complete close the command prompt

#### Verify Ruby installation
* Open powershell
* type `$ ruby -v`, then press enter
  * if a ruby version is returned then ruby is properly installed
#### Verify Ruby Devkit installation
* Open powershell
* type `$ gem install json --platform=ruby`, then press enter
  * If the devkit is installed properly then this command will install the RubyGems library JSON gem.

## Install InSpec
### Option 1 (Download as a package)
The InSpec package is available for MacOS, RedHat, Ubuntu and Windows. Download the latest package at [InSpec Downloads](https://downloads.chef.io/inspec) or install InSpec via script:
```
# Windows (PowerShell)
. { iwr -useb https://omnitruck.chef.io/install.ps1 } | iex; install -project inspec
```
### Option 2 (Download as a ruby gem)
* Open powershell
* type `$ gem install inspec`, then press enter

### Option 3 (windows only)
Select the appropriate windows OS from the [InSpec Download Site](https://www.chef.io/downloads/tools/inspec), download the appropriate installation (msi) and install.

## Download additional required gems
* type `$ gem install bundler`, then press enter
* type `$ gem install test-kitchen`, then press enter

## After Install
Once InSpec is installed, run `$ inspec version` to verify that the installation was successful.

