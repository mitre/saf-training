---
headerDepth: 3
---

# Class Resources

## Code Background & Primers  

### Ruby Tutorials and Documentation

- <https://ruby-for-beginners.rubymonstas.org/>
- [Ruby Video Tutorial](https://www.youtube.com/watch?v=t_ispmWmdjY&vl=en")
### InSpec Documentation

- [InSpec Docs](https://www.inspec.io/docs/)
- [InSpec Profiles](https://www.inspec.io/docs/reference/profiles/)
- [InSpec Resources](https://www.inspec.io/docs/reference/resources/)
- [InSpec Matchers](https://www.inspec.io/docs/reference/matchers/)
- [InSpec Shell](https://www.inspec.io/docs/reference/shell/)
- [InSpec Reporters](https://www.inspec.io/docs/reference/reporters/)
- [InSpec Profile Inheritance](https://blog.chef.io/2017/07/06/understanding-inspec-profile-inheritance/)
### InSpec Tutorials and Videos

- [Introduction to InSpec Playlist](https://www.youtube.com/playlist?list=PLSZbtIlMt5rcbXOpMRucKzRMXR7HX7awy)
- [Getting started with InSpec - The InSpec basics series](http://www.anniehedgie.com/inspec/)
- [Windows infrastructure testing using InSpec – Part I](http://datatomix.com/?p=236)
- [Windows infrastructure testing using InSpec and Profiles – Part II](http://datatomix.com/?p=238)
### rspec documentation

- [Explicit Subject](https://relishapp.com/rspec/rspec-core/docs/subject/explicit-subject)
- [should and should_not](https://github.com/rspec/rspec-expectations/blob/master/Should.md)
- [Built in matchers](https://relishapp.com/rspec/rspec-expectations/docs/built-in-matchers)
## Codespaces and Git
### Learning and Using Git

- [Git Primer & Introduction](https://www.youtube.com/watch?v=8JJ101D3knE)
- [Git Command Documentation](https://git-scm.com/docs/gittutorial)
- [Create a Pull Request](https://www.digitalocean.com/community/tutorials/how-to-create-a-pull-request-on-github)
### GitHub Codespaces

- [GitHub CodeSpaces Video Introduction](https://www.youtube.com/watch?v=fQbH3meWNQ8)

- [GitHub Codespaces Overview](https://docs.github.com/en/codespaces/overview)
## Tools and Applications

- [InSpec](https://www.inspec.io)
- [SAF CLI](https://saf-cli.mitre.org)
- [CINC](https://cinc.sh)
- [VSCode](https://code.visualstudio.com/download)
## RHEL8 Baseline 'Stubs'

The RHEL8 Baseline Stubs were `saf-cli generate` command as documented in [Section 10](../course/10.md) . You can use this as a reference while you develop your controls.
### Generating the Stubs

To create the RedHat Enterprise Linux 8 STIG Profile stubs, we used the `saf-cli generate` command:
```sh
saf generate:xccdf2inspec_stub -i U_RHEL_8_STIG_V1R6_Manual-xccdf.xml -r -o rhel8-baseline-stubs
```
This created a starter profile based of the RHEL8 STIG XCCDF Bechmark

- [rhel8-baseline-stubs.tar.gz](https://github.com/mitre/inspec-profile-developer-course-lab-environment/raw/main/resources/rhel8-baseline-stubs.tar.gz)
## MITRE SAF InSpec Profiles

- [MITRE InSpec Profile Repositories](https://github.com/mitre?q=inspec+baseline+profile)
## DOD STIGs and Benchmarks
### DISA STIGs

- [DISA Cyber.mil STIG Downlaods](https://public.cyber.mil/stigs/downloads/)

### STIG and SRG Aligned Profiles

- <https://github.com/CMSgov/redhat-enterprise-linux-8-stig-baseline>

- <https://github.com/mitre/nginx-srg-baseline>
### CIS Benchmarks and Profiles

- [Center for Internet Security Benchmarks](https://www.cisecurity.org/cis-benchmarks/)
## Chef Community Slack

- <http://community-slack.chef.io/>
