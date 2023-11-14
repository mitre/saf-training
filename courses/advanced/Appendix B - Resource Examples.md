---
index: 15
title: Appendix B - Custom Resource Examples from InSpec
author: Aaron Lippold
headerDepth: 3
---

As an example we will go through a few custom resources that were built and approved.

### 14.1. IPv6 resource
#### 14.1.1. docs/resources/ip6tables.md.erb
```ruby
---
title: About the ip6tables Resource
platform: linux
---

# ip6tables

Use the `ip6tables` Chef InSpec audit resource to test rules that are defined in `ip6tables`, which maintains tables of IP packet filtering rules for IPv6. There may be more than one table. Each table contains one (or more) chains (both built-in and custom). A chain is a list of rules that match packets. When the rule matches, the rule defines what target to assign to the packet.

<br>

## Availability

### Installation

This resource is distributed along with Chef InSpec itself. You can use it automatically.

### Version

This resource first became available in v4.6.9 of InSpec.

## Syntax

A `ip6tables` resource block declares tests for rules in IP tables:

    describe ip6tables(rule:'name', table:'name', chain: 'name') do
      it { should have_rule('RULE') }
    end

where

* `ip6tables()` may specify any combination of `rule`, `table`, or `chain`
* `rule:'name'` is the name of a rule that matches a set of packets
* `table:'name'` is the packet matching table against which the test is run
* `chain: 'name'` is the name of a user-defined chain or one of `ACCEPT`, `DROP`, `QUEUE`, or `RETURN`
* `have_rule('RULE')` tests that rule in the ip6tables list. This must match the entire line taken from `ip6tables -S CHAIN`.

<br>

## Examples

The following examples show how to use this Chef InSpec audit resource.

### Test if the INPUT chain is in default ACCEPT mode

    describe ip6tables do
      it { should have_rule('-P INPUT ACCEPT') }
    end

### Test if the INPUT chain from the mangle table is in ACCEPT mode

    describe ip6tables(table:'mangle', chain: 'INPUT') do
      it { should have_rule('-P INPUT ACCEPT') }
    end

### Test if there is a rule allowing Postgres (5432/TCP) traffic

    describe ip6tables do
      it { should have_rule('-A INPUT -p tcp -m tcp -m multiport --dports 5432 -m comment --comment "postgres" -j ACCEPT') }
    end

Note that the rule specification must exactly match what's in the output of `ip6tables -S INPUT`, which will depend on how you've built your rules.

<br>

## Matchers

For a full list of available matchers, please visit our [matchers page](https://www.inspec.io/docs/reference/matchers/).

### have_rule

The `have_rule` matcher tests the named rule against the information in the `ip6tables` file:

    it { should have_rule('RULE') }
```

#### 14.1.2. lib/inspec/resources.rb
```ruby
require "inspec/resources/iis_site"
require "inspec/resources/inetd_conf"
require "inspec/resources/interface"
require "inspec/resources/ip6tables"
require "inspec/resources/iptables"
require "inspec/resources/kernel_module"
require "inspec/resources/kernel_parameter"
```

#### 14.1.3. lib/inspec/resources/ip6tables.rb
```ruby
require "inspec/resources/command"

# Usage:
# describe ip6tables do
#   it { should have_rule('-P INPUT ACCEPT') }
# end
#
# The following serverspec sytax is not implemented:
# describe ip6tables do
#   it { should have_rule('-P INPUT ACCEPT').with_table('mangle').with_chain('INPUT') }
# end
# Please use the new sytax:
# describe ip6tables(table:'mangle', chain: 'input') do
#   it { should have_rule('-P INPUT ACCEPT') }
# end
#
# Note: Docker containers normally do not have ip6tables installed
#
# @see http://ipset.netfilter.org/ip6tables.man.html
# @see http://ipset.netfilter.org/ip6tables.man.html
module Inspec::Resources
  class Ip6Tables < Inspec.resource(1)
    name "ip6tables"
    supports platform: "linux"
    desc "Use the ip6tables InSpec audit resource to test rules that are defined in ip6tables, which maintains tables of IP packet filtering rules. There may be more than one table. Each table contains one (or more) chains (both built-in and custom). A chain is a list of rules that match packets. When the rule matches, the rule defines what target to assign to the packet."
    example <<~EXAMPLE
      describe ip6tables do
        it { should have_rule('-P INPUT ACCEPT') }
      end
    EXAMPLE

    def initialize(params = {})
      @table = params[:table]
      @chain = params[:chain]

      # we're done if we are on linux
      return if inspec.os.linux?

      # ensures, all calls are aborted for non-supported os
      @ip6tables_cache = []
      skip_resource "The `ip6tables` resource is not supported on your OS yet."
    end

    def has_rule?(rule = nil, _table = nil, _chain = nil)
      # checks if the rule is part of the ruleset
      # for now, we expect an exact match
      retrieve_rules.any? { |line| line.casecmp(rule) == 0 }
    end

    def retrieve_rules
      return @ip6tables_cache if defined?(@ip6tables_cache)

      # construct ip6tables command to read all rules
      bin = find_ip6tables_or_error
      table_cmd = "-t #{@table}" if @table
      ip6tables_cmd = format("%s %s -S %s", bin, table_cmd, @chain).strip

      cmd = inspec.command(ip6tables_cmd)
      return [] if cmd.exit_status.to_i != 0

      # split rules, returns array or rules
      @ip6tables_cache = cmd.stdout.split("\n").map(&:strip)
    end

    def to_s
      format("Ip6tables %s %s", @table && "table: #{@table}", @chain && "chain: #{@chain}").strip
    end

    private

    def find_ip6tables_or_error
      %w{/usr/sbin/ip6tables /sbin/ip6tables ip6tables}.each do |cmd|
        return cmd if inspec.command(cmd).exist?
      end

      raise Inspec::Exceptions::ResourceFailed, "Could not find `ip6tables`"
    end
  end
end
```

::: tip Code Reuse
While submitting PR it may be possible to extend existing test elements from current resources to perform integration and unit testing such is seen in this example, the ipv6 resource extends the testing for [iptables](https://www.inspec.io/docs/reference/resources/iptables/) resource
:::

#### 14.1.4. test/integration/default/controls/ip6tables_spec.rb
```ruby
case os[:family]
when 'ubuntu', 'fedora', 'debian', 'suse'
  describe ip6tables do
    it { should have_rule('-A INPUT -i eth0 -p tcp -m tcp --dport 80 -m state --state NEW -m comment --comment "http v6 on 80" -j ACCEPT') }
    it { should_not have_rule('-A INPUT -i eth1 -p tcp -m tcp --dport 80 -j ACCEPT') }

    # single-word comments have their quotes dropped
    it { should have_rule('-A derby-cognos-web-v6 -p tcp -m tcp --dport 80 -m comment --comment derby-cognos-web-v6 -j ACCEPT') }
  end
when  'redhat', 'centos'
  describe ip6tables do
    it { should have_rule('-A INPUT -i eth0 -p tcp -m tcp --dport 80 -m state --state NEW -m comment --comment "http v6 on 80" -j ACCEPT') }
    it { should_not have_rule('-A INPUT -i eth1 -p tcp -m tcp --dport 80 -j ACCEPT') }
  end

  describe ip6tables do
    it { should have_rule('-A derby-cognos-web-v6 -p tcp -m tcp --dport 80 -m comment --comment "derby-cognos-web-v6" -j ACCEPT') }
  end if os[:release] == 6

  describe ip6tables do
    it { should have_rule('-A derby-cognos-web-v6 -p tcp -m tcp --dport 80 -m comment --comment derby-cognos-web-v6 -j ACCEPT') }
  end if os[:release] == 7
end
```

#### 14.1.5. test/unit/resources/ip6tables_test.rb
```ruby
require "helper"
require "inspec/resource"
require "inspec/resources/ip6tables"

describe "Inspec::Resources::Ip6tables" do

  # ubuntu 14.04
  it "verify ip6tables on ubuntu" do
    resource = MockLoader.new(:ubuntu1404).load_resource("ip6tables")
    _(resource.has_rule?("-P OUTPUT ACCEPT")).must_equal true
    _(resource.has_rule?("-P OUTPUT DROP")).must_equal false
  end

  it "verify ip6tables with comments on ubuntu" do
    resource = MockLoader.new(:ubuntu1404).load_resource("ip6tables")
    _(resource.has_rule?('-A INPUT -i eth0 -p tcp -m tcp --dport 80 -m state --state NEW -m comment --comment "http-v6 like its 1990" -j ACCEPT')).must_equal true
  end

  it "verify ip6tables on windows" do
    resource = MockLoader.new(:windows).load_resource("ip6tables")
    _(resource.has_rule?("-P OUTPUT ACCEPT")).must_equal false
    _(resource.has_rule?("-P OUTPUT DROP")).must_equal false
  end

  # undefined
  it "verify ip6tables on unsupported os" do
    resource = MockLoader.new(:undefined).load_resource("ip6tables")
    _(resource.has_rule?("-P OUTPUT ACCEPT")).must_equal false
    _(resource.has_rule?("-P OUTPUT DROP")).must_equal false
  end

end
```

### 14.2. NGINX resource
#### 14.2.1. docs/resources/nginx.md.erb
```ruby
---
title: The Nginx Resource
---

# nginx

Use the `nginx` InSpec audit resource to test the fields and validity of nginx.

Nginx resource extracts and exposes data reported by the command 'nginx -V'

## Syntax

An `nginx` InSpec audit resource block extracts configuration settings that should be tested:

    describe nginx do
      its('attribute') { should eq 'value' }
    end

    describe nginx('path to nginx') do
      its('attribute') { should eq 'value' }
    end

where

* `'attribute'` is a configuration parsed from result of the command 'nginx -V'
* `'value'` is the value that is expected of the attribute

## Supported Properties

* 'compiler_info',  'error_log_path',  'http_client_body_temp_path',  'http_fastcgi_temp_path',  'http_log_path',  'http_proxy_temp_path',  'http_scgi_temp_path',  'http_uwsgi_temp_path',  'lock_path',  'modules', 'modules_path',  'openssl_version',  'prefix',  'sbin_path',  'service',  'support_info',  'version'

## Property Examples and Return Types

### version(String)

`version` returns a string of the version of the running nginx instance

    describe nginx do
      its('version') { should eq '1.12.0' }
    end

### modules(String)

`modules` returns a array modules in the running nginx instance

    describe nginx do
      its('modules') { should include 'my_module' }
    end

### openssl_version(Hash)

`openssl_version ` returns a hash with 'version' and 'date' as keys

    describe nginx do
      its('openssl_version.date') { should eq '11 Feb 2013' }
    end

### compiler_info(Hash)

`compiler_info ` returns a hash with 'compiler' , version' and 'date' as keys

    describe nginx do
      its('compiler_info.compiler') { should eq 'gcc' }
    end

### support_info(String)

`support_info ` returns a string containing supported protocols

    describe nginx do
      its('support_info') { should match /TLS/ }
    end
```

#### 14.2.2. lib/inspec/resource.rb
```ruby
require 'resources/mysql'
require 'resources/mysql_conf'
require 'resources/mysql_session'
require 'resources/nginx'
require 'resources/nginx_conf'
require 'resources/npm'
require 'resources/ntp_conf'
```

#### 14.2.3. lib/resources/nginx.rb
```ruby
# encoding: utf-8
# author: Aaron Lippold, lippold@gmail.com
# author: Rony Xavier, rx294@gmail.com

require 'pathname'
require 'hashie/mash'

module Inspec::Resources
  class Nginx < Inspec.resource(1)
    name 'nginx'
    desc 'Use the nginx InSpec audit resource to test information about your NGINX instance.'
    example "
      describe nginx do
        its('conf_path') { should cmp '/etc/nginx/nginx.conf' }
      end
      describe nginx('/etc/sbin/') do
        its('version') { should be >= '1.0.0' }
      end
      describe nginx do
        its('modules') { should include 'my_module' }
      end
    "
    attr_reader :params, :bin_dir

    def initialize(nginx_path = '/usr/sbin/nginx')
      return skip_resource 'The `nginx` resource is not yet available on your OS.' if inspec.os.windows?
      return skip_resource 'The `nginx` binary not found in the path provided.' unless inspec.command(nginx_path).exist?

      cmd = inspec.command("#{nginx_path} -V 2>&1")
      if !cmd.exit_status.zero?
        return skip_resource 'Error using the command nginx -V'
      end
      @data = cmd.stdout
      @params = {}
      read_content
    end

    %w{compiler_info error_log_path http_client_body_temp_path http_fastcgi_temp_path http_log_path http_proxy_temp_path http_scgi_temp_path http_uwsgi_temp_path lock_path modules_path openssl_version prefix sbin_path service support_info version}.each do |property|
      define_method(property.to_sym) do
        @params[property.to_sym]
      end
    end

    def openssl_version
      result = @data.scan(/built with OpenSSL\s(\S+)\s(\d+\s\S+\s\d{4})/).flatten
      Hashie::Mash.new({ 'version' => result[0], 'date' => result[1] })
    end

    def compiler_info
      result = @data.scan(/built by (\S+)\s(\S+)\s(\S+)/).flatten
      Hashie::Mash.new({ 'compiler' => result[0], 'version' => result[1], 'date' => result[2] })
    end

    def support_info
      support_info = @data.scan(/(.*\S+) support enabled/).flatten
      support_info.empty? ? nil : support_info.join(' ')
    end

    def modules
      @data.scan(/--with-(\S+)_module/).flatten
    end

    def to_s
      'Nginx Environment'
    end

    private

    def read_content
      parse_config
      parse_path
      parse_http_path
    end

    def parse_config
      @params[:prefix] = @data.scan(/--prefix=(\S+)\s/).flatten.first
      @params[:service] = 'nginx'
      @params[:version] = @data.scan(%r{nginx version: nginx\/(\S+)\s}).flatten.first
    end

    def parse_path
      @params[:sbin_path] = @data.scan(/--sbin-path=(\S+)\s/).flatten.first
      @params[:modules_path] = @data.scan(/--modules-path=(\S+)\s/).flatten.first
      @params[:error_log_path] = @data.scan(/--error-log-path=(\S+)\s/).flatten.first
      @params[:http_log_path] = @data.scan(/--http-log-path=(\S+)\s/).flatten.first
      @params[:lock_path] = @data.scan(/--lock-path=(\S+)\s/).flatten.first
    end

    def parse_http_path
      @params[:http_client_body_temp_path] = @data.scan(/--http-client-body-temp-path=(\S+)\s/).flatten.first
      @params[:http_proxy_temp_path] = @data.scan(/--http-proxy-temp-path=(\S+)\s/).flatten.first
      @params[:http_fastcgi_temp_path] = @data.scan(/--http-fastcgi-temp-path=(\S+)\s/).flatten.first
      @params[:http_uwsgi_temp_path] = @data.scan(/--http-uwsgi-temp-path=(\S+)\s/).flatten.first
      @params[:http_scgi_temp_path] = @data.scan(/--http-scgi-temp-path=(\S+)\s/).flatten.first
    end
  end
end
```

#### 14.2.4. test/unit/resources/nginx_test.rb
```ruby
# encoding: utf-8
# author: Aaron Lippold, lippold@gmail.com
# author: Rony Xavier, rx294@nyu.edu

require 'helper'
require 'inspec/resource'

describe 'Inspec::Resources::Nginx' do
  describe 'NGINX Methods' do
    it 'Verify nginx parsing `support_info` - `TLS SNI`' do
      resource = load_resource('nginx')
      _(resource.support_info).must_match 'TLS SNI'
    end
    it 'Verify nginx parsing `openssl_version` - `1.0.1e-fips/11 Feb 2013`' do
      resource = load_resource('nginx')
      _(resource.openssl_version.date).must_match '11 Feb 2013'
      _(resource.openssl_version.version).must_match '1.0.1e-fips'
    end
    it 'Verify nginx parsing `compiler_info` - `gcc 4.8.5 20150623 (Red Hat 4.8.5-4) (GCC)`' do
      resource = load_resource('nginx')
      _(resource.compiler_info.compiler).must_match 'gcc'
      _(resource.compiler_info.version).must_match '4.8.5'
      _(resource.compiler_info.date).must_match '20150623'
    end
    it 'Verify nginx parsing `version` - 1.12.0' do
      resource = load_resource('nginx')
      _(resource.version).must_match '1.12.0'
    end
    it 'Verify nginx_module parsing with custom path`version` - 1.12.0' do
      resource = load_resource('nginx','/usr/sbin/nginx')
      _(resource.version).must_match '1.12.0'
    end
    it 'Verify nginx_module parsing with a broken custom path`version` - 1.12.0' do
      resource = load_resource('nginx','/usr/sbin/nginx')
      _(resource.version).must_match '1.12.0'
    end
    it 'Verify nginx parsing `service` - `nginx`' do
      resource = load_resource('nginx')
      _(resource.service).must_match 'nginx'
    end
    it 'Verify nginx parsing `modules` - `nginx`' do
      resource = load_resource('nginx')
      _(resource.modules).must_include 'http_addition'
    end
    it 'Verify nginx parsing `prefix` - `/etc/nginx`' do
      resource = load_resource('nginx')
      _(resource.prefix).must_match '/etc/nginx'
    end
    it 'Verify nginx parsing `sbin_path` - `/usr/sbin/nginx`' do
      resource = load_resource('nginx')
      _(resource.sbin_path).must_match '/usr/sbin/nginx'
    end
    it 'Verify nginx parsing `modules_path` - `/usr/lib64/nginx/modules`' do
      resource = load_resource('nginx')
      _(resource.modules_path).must_match '/usr/lib64/nginx/modules'
    end
    it 'Verify nginx parsing `error_log_path` - `/var/log/nginx/error.log`' do
      resource = load_resource('nginx')
      _(resource.error_log_path).must_match '/var/log/nginx/error.log'
    end
    it 'Verify nginx parsing `error_log_path` - `/var/log/nginx/access.log`' do
      resource = load_resource('nginx')
      _(resource.http_log_path).must_match '/var/log/nginx/access.log'
    end
    it 'Verify nginx parsing `lock_path` - `/var/run/nginx.lock`' do
      resource = load_resource('nginx')
      _(resource.lock_path).must_match '/var/run/nginx.lock'
    end
    it 'Verify nginx parsing `http_client_body_temp_path` - `/var/cache/nginx/client_temp`' do
      resource = load_resource('nginx')
      _(resource.http_client_body_temp_path).must_match '/var/cache/nginx/client_temp'
    end
    it 'Verify nginx parsing `http_proxy_temp_path` - `/var/cache/nginx/proxy_temp`' do
      resource = load_resource('nginx')
      _(resource.http_proxy_temp_path).must_match '/var/cache/nginx/proxy_temp'
    end
    it 'Verify nginx parsing `http_fastcgi_temp_path` - `/var/cache/nginx/fastcgi_temp`' do
      resource = load_resource('nginx')
      _(resource.http_fastcgi_temp_path).must_match '/var/cache/nginx/fastcgi_temp'
    end
    it 'Verify nginx parsing `http_uwsgi_temp_path` - `/var/cache/nginx/uwsgi_temp`' do
      resource = load_resource('nginx')
      _(resource.http_uwsgi_temp_path).must_match '/var/cache/nginx/uwsgi_temp'
    end
    it 'Verify nginx parsing `http_scgi_temp_path` - `/var/cache/nginx/scgi_temp`' do
      resource = load_resource('nginx')
      _(resource.http_scgi_temp_path).must_match '/var/cache/nginx/scgi_temp'
    end
    it 'Verify nginx parsing `http_scgi_temp_path` - `/var/cache/nginx/scgi_temp`' do
      resource = load_resource('nginx')
      _(resource.http_scgi_temp_path).must_match '/var/cache/nginx/scgi_temp'
    end
  end
end
```

### 14.3. Additional examples
#### 14.3.1. PAM resource currently open PR
- [PAM Resource](https://github.com/simp/inspec-profile-disa_stig-el7/blob/master/libraries/pam.rb)
- [PAM PR](https://github.com/inspec/inspec/pull/3993)

#### 14.3.2. Customizing an already existing resource (windows registry)
- [https://github.com/mitre/microsoft-windows-2012r2-memberserver-stig-baseline/blob/master/libraries/windows_registry.rb](https://github.com/mitre/microsoft-windows-2012r2-memberserver-stig-baseline/blob/master/libraries/windows_registry.rb)
