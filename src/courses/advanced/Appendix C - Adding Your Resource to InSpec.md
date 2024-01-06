---
order: 16
title: Appendix C - Adding Your Resource to InSpec
author: Aaron Lippold
headerDepth: 3
---

Many of the official InSpec resources were written by community members. If you have created a resource for your project and would like to make it part of the official library, you can open a pull request against the InSpec codebase.

To get started, go to the main [InSpec Github Repo](https://github.com/inspec/inspec) and fork the repository. On your forked repository, make a new branch, and call it something unique pertaining to what resource you are making. For example, if you use the `file` resource, then a useful branch name could be `file_resource`.

InSpec's source code's top level directory looks like:
```bash
$ tree inspec -L 1 -d
inspec
├── contrib
├── docs
├── etc
├── examples
├── habitat
├── inspec-bin
├── kitchen
├── lib
├── omnibus
├── support
├── tasks
├── test
└── www

13 directories
```

The 3 key directories we need to focus on here are the `docs/` directory, the `lib/` directory and finally the `test/` directory. When developing a resource for upstream InSpec, you must:
1) Create the resource itself
2) Create the documentation for the resource
3) Create the unit and integration tests for the resource

::: tip The resource contents
When creating this resource.rb file or in this scenario the `file.rb`, it would be developed and written the same exact way if you had put it in the libraries directory for a local resource. If you already developed the resource for local use, but want to push it to upstream, you can copy and paste the file directly to the following location:
:::
```bash
$ tree -L 1 lib/inspec/resources/
lib/inspec/resources/
...
├── file.rb
...

0 directories, 104 files
```

This is the helper file you need to adjust for the file resource:
```bash
$ tree -L 1 lib/inspec/
lib/inspec/
...
├── resources.rb
...

10 directories, 47 files
```

::: tip The resource helper
When adding this line of code, be sure to place the resources in alphabetical order as shown in the example below.
:::

In the `resources.rb` file you would add the following line:
```ruby
require "inspec/resources/etc_hosts"
require "inspec/resources/file"
require "inspec/resources/filesystem"
```

Next you would need to write out your unit and integration tests:
```bash
$ tree test/integration/default/controls/
test/integration/default/controls/
...
├── file_spec.rb
...

0 directories, 42 files
```

```bash
$ tree test/unit/resources/
test/unit/resources/
...
├── file_test.rb
...

0 directories, 145 files
```

Finally, you would write up documentation on how to use the resource. This file will be published to the [InSpec docs](https://docs.chef.io/inspec/resources/). Take a look at the other docs pages for an idea of what needs to be documented -- each matcher and function on the resource should be listed, and examples of how to use the resource given.
```bash
$ tree docs/resources/
docs/resources/
...
├── file.md.erb
...

0 directories, 156 files
```
