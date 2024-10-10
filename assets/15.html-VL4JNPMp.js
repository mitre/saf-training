import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as i,a as t,g as r,o}from"./app-yeyHW-32.js";const a={};function s(l,e){return o(),i("div",null,[e[0]||(e[0]=t(`<h2 id="_15-example-running-an-inspec-profile-using-a-local-archive-for-air-gapped-target-systems" tabindex="-1"><a class="header-anchor" href="#_15-example-running-an-inspec-profile-using-a-local-archive-for-air-gapped-target-systems"><span>15. Example running an InSpec profile using a local archive (for air-gapped target systems)</span></a></h2><div class="hint-container tip"><p class="hint-container-title">Tips</p><p>For more information on how to install InSpec on an airgapped system use the <a href="https://docs.chef.io/install_chef_air_gap/" target="_blank" rel="noopener noreferrer">chef instructions</a> as guidance</p></div><h3 id="_15-1-prerequisites" tabindex="-1"><a class="header-anchor" href="#_15-1-prerequisites"><span>15.1. Prerequisites</span></a></h3><p>Since a variety of different practices are used to create an air-gapped network, this guide focuses solely on the implementation of Chef software - as such, it makes the following assumptions:</p><ol><li>You have a way to get packages to your air-gapped machines</li><li>Machines on your air-gapped network are able to resolve each other using DNS</li><li>A server’s Fully Qualified Domain Name (FQDN) is the name that will be used by other servers to access it</li><li>You have a private Ruby gem mirror to supply gems as needed</li><li>You have an artifact store for file downloads. At a minimum, it should have the following packages available: <ol><li>Chef Workstation</li><li>Chef Infra Client</li><li>Chef Supermarket</li><li>An <a href="https://docs.chef.io/install_chef_air_gap/#create-an-install-script" target="_blank" rel="noopener noreferrer">install script</a> for Chef Infra Client</li></ol></li></ol><h3 id="_15-2-required-cookbooks" tabindex="-1"><a class="header-anchor" href="#_15-2-required-cookbooks"><span>15.2. Required cookbooks</span></a></h3><p>This guide will link to the required cookbooks for each piece of software in that software’s respective section, but this is a full list of the cookbooks required to complete the entire guide:</p><p>For Chef Supermarket:</p><ul><li><a href="https://supermarket.chef.io/cookbooks/supermarket-omnibus-cookbook" target="_blank" rel="noopener noreferrer">supermarket-omnibus-cookbook</a></li><li><a href="https://supermarket.chef.io/cookbooks/chef-ingredient" target="_blank" rel="noopener noreferrer">chef-ingredient</a></li><li><a href="https://supermarket.chef.io/cookbooks/hostsfile" target="_blank" rel="noopener noreferrer">hostsfile</a></li></ul><h3 id="_15-3-required-gems" tabindex="-1"><a class="header-anchor" href="#_15-3-required-gems"><span>15.3. Required Gems</span></a></h3><p>The following Ruby gems are required to install private Supermarket using the supermarket-omnibus-cookbook:</p><ul><li>mixlib-install</li><li>mixlib-shellout</li><li>mixlib-versioning</li><li>artifactory</li></ul><p>These should be accessible from your Gem mirror.</p><h3 id="_15-4-create-an-install-script" tabindex="-1"><a class="header-anchor" href="#_15-4-create-an-install-script"><span>15.4. Create an install script</span></a></h3><p>An install script is used to install Chef Infra Client when bootstrapping a new node. It simply pulls the Chef Infra Client package from your artifact store, and then installs it. For example, on Debian-based Linux systems, it would look similar to this:</p><div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" data-title="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">#!/bin/bash</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#0184BC;--shiki-dark:#56B6C2;">cd</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> /tmp/</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">wget</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> http://packages.example.com/chef_13.2.20-1_amd64.deb</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">dpkg</span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;"> -i</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> chef_13.2.20-1_amd64.deb</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>The install script should be accessible from your artifact store.</p>`,17)),r(` ## 14. Viewing and Analyzing Results

InSpec allows you to output your test results to one or more reporters. You can configure the reporter(s) using either the --json-config option or the --reporter option. While you can configure multiple reporters to write to different files, only one reporter can output to the screen(stdout).

\`\`\`
$ inspec exec /root/my_nginx -t ssh://TARGET_USERNAME:TARGET_PASSWORD@TARGET_IP --reporter cli json:baseline_output.json
\`\`\`

### 14.1. Syntax

You can specify one or more reporters using the --reporter cli flag. You can also specify a output by appending a path separated by a colon.

Output json to screen.

\`\`\`
inspec exec /root/my_nginx --reporter json
or
inspec exec /root/my_nginx --reporter json:-
\`\`\`

Output yaml to screen

\`\`\`
inspec exec /root/my_nginx --reporter yaml
or
inspec exec /root/my_nginx --reporter yaml:-
\`\`\`

Output cli to screen and write json to a file.

\`inspec exec /root/my_nginx --reporter cli json:/tmp/output.json\`

Output nothing to screen and write junit and html to a file.

\`inspec exec /root/my_nginx --reporter junit:/tmp/junit.xml html:www/index.html\`

Output json to screen and write to a file. Write junit to a file.

\`inspec exec /root/my_nginx --reporter json junit:/tmp/junit.xml | tee out.json\`

If you wish to pass the profiles directly after specifying the reporters you will need to use the end of options flag --.

\`inspec exec --reporter json junit:/tmp/junit.xml -- profile1 profile2\`

Output cli to screen and write json to a file.

\`\`\`json
{
  "reporter": {
    "cli": {
      "stdout": true
    },
    "json": {
      "file": "/tmp/output.json",
      "stdout": false
    }
  }
}
\`\`\`

### 14.2. Supported Reporters

The following are the current supported reporters:

- cli
- json
- json-min
- yaml
- documentation
- junit
- progress
- json-rspec
- html

You can read more about [InSpec Reporters](https://www.inspec.io/docs/reference/reporters/) on the documentation page.

### 14.3. Putting it all together

The following command will run the nginx baseline profile from github and use the reporter to output a json, you will need this for the next step loading it into heimdall:

\`$ inspec exec https://github.com/dev-sec/nginx-baseline -t ssh://TARGET_USERNAME:TARGET_PASSWORD@TARGET_IP --reporter cli json:baseline_output.json\` `)])}const h=n(a,[["render",s],["__file","15.html.vue"]]),u=JSON.parse('{"path":"/courses/user/15.html","title":"15. Extra Info - Running InSpec with a Local Profile","lang":"en-US","frontmatter":{"order":15,"next":"16.md","title":"15. Extra Info - Running InSpec with a Local Profile","author":"Mo","headerDepth":3,"description":"15. Example running an InSpec profile using a local archive (for air-gapped target systems) Tips For more information on how to install InSpec on an airgapped system use the che...","gitInclude":[],"head":[["meta",{"property":"og:url","content":"https://mitre.github.io/saf-training/saf-training/courses/user/15.html"}],["meta",{"property":"og:site_name","content":"MITRE SAF Training"}],["meta",{"property":"og:title","content":"15. Extra Info - Running InSpec with a Local Profile"}],["meta",{"property":"og:description","content":"15. Example running an InSpec profile using a local archive (for air-gapped target systems) Tips For more information on how to install InSpec on an airgapped system use the che..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"en-US"}],["meta",{"property":"article:author","content":"Mo"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"15. Extra Info - Running InSpec with a Local Profile\\",\\"image\\":[\\"\\"],\\"dateModified\\":null,\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Mo\\"}]}"]]},"headers":[{"level":2,"title":"15. Example running an InSpec profile using a local archive (for air-gapped target systems)","slug":"_15-example-running-an-inspec-profile-using-a-local-archive-for-air-gapped-target-systems","link":"#_15-example-running-an-inspec-profile-using-a-local-archive-for-air-gapped-target-systems","children":[{"level":3,"title":"15.1. Prerequisites","slug":"_15-1-prerequisites","link":"#_15-1-prerequisites","children":[]},{"level":3,"title":"15.2. Required cookbooks","slug":"_15-2-required-cookbooks","link":"#_15-2-required-cookbooks","children":[]},{"level":3,"title":"15.3. Required Gems","slug":"_15-3-required-gems","link":"#_15-3-required-gems","children":[]},{"level":3,"title":"15.4. Create an install script","slug":"_15-4-create-an-install-script","link":"#_15-4-create-an-install-script","children":[]}]}],"readingTime":{"minutes":2.24,"words":671},"filePathRelative":"courses/user/15.md","autoDesc":true}');export{h as comp,u as data};
