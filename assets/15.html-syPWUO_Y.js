import{_ as s}from"./plugin-vue_export-helper-x3n3nnut.js";import{r,o as i,c as a,d as e,e as n,b as o,a as l,f as c}from"./app-KhTIoQwo.js";const p={},u=e("h2",{id:"_15-example-running-an-inspec-profile-using-a-local-archive-for-air-gapped-target-systems",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#_15-example-running-an-inspec-profile-using-a-local-archive-for-air-gapped-target-systems"},[e("span",null,"15. Example running an InSpec profile using a local archive (for air-gapped target systems)")])],-1),h={class:"hint-container tip"},d=e("p",{class:"hint-container-title"},"Tips",-1),m={href:"https://docs.chef.io/install_chef_air_gap/",target:"_blank",rel:"noopener noreferrer"},f=e("h3",{id:"_15-1-prerequisites",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#_15-1-prerequisites"},[e("span",null,"15.1. Prerequisites")])],-1),_=e("p",null,"Since a variety of different practices are used to create an air-gapped network, this guide focuses solely on the implementation of Chef software - as such, it makes the following assumptions:",-1),g=e("li",null,"You have a way to get packages to your air-gapped machines",-1),b=e("li",null,"Machines on your air-gapped network are able to resolve each other using DNS",-1),k=e("li",null,"A server’s Fully Qualified Domain Name (FQDN) is the name that will be used by other servers to access it",-1),x=e("li",null,"You have a private Ruby gem mirror to supply gems as needed",-1),y=e("li",null,"Chef Workstation",-1),v=e("li",null,"Chef Infra Client",-1),w=e("li",null,"Chef Supermarket",-1),j={href:"https://docs.chef.io/install_chef_air_gap/#create-an-install-script",target:"_blank",rel:"noopener noreferrer"},T=e("h3",{id:"_15-2-required-cookbooks",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#_15-2-required-cookbooks"},[e("span",null,"15.2. Required cookbooks")])],-1),S=e("p",null,"This guide will link to the required cookbooks for each piece of software in that software’s respective section, but this is a full list of the cookbooks required to complete the entire guide:",-1),R=e("p",null,"For Chef Supermarket:",-1),A={href:"https://supermarket.chef.io/cookbooks/supermarket-omnibus-cookbook",target:"_blank",rel:"noopener noreferrer"},C={href:"https://supermarket.chef.io/cookbooks/chef-ingredient",target:"_blank",rel:"noopener noreferrer"},E={href:"https://supermarket.chef.io/cookbooks/hostsfile",target:"_blank",rel:"noopener noreferrer"},I=c(`<h3 id="_15-3-required-gems" tabindex="-1"><a class="header-anchor" href="#_15-3-required-gems"><span>15.3. Required Gems</span></a></h3><p>The following Ruby gems are required to install private Supermarket using the supermarket-omnibus-cookbook:</p><ul><li>mixlib-install</li><li>mixlib-shellout</li><li>mixlib-versioning</li><li>artifactory</li></ul><p>These should be accessible from your Gem mirror.</p><h3 id="_15-4-create-an-install-script" tabindex="-1"><a class="header-anchor" href="#_15-4-create-an-install-script"><span>15.4. Create an install script</span></a></h3><p>An install script is used to install Chef Infra Client when bootstrapping a new node. It simply pulls the Chef Infra Client package from your artifact store, and then installs it. For example, on Debian-based Linux systems, it would look similar to this:</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code><span class="token shebang important">#!/bin/bash</span>

<span class="token builtin class-name">cd</span> /tmp/
<span class="token function">wget</span> http://packages.example.com/chef_13.2.20-1_amd64.deb
dpkg <span class="token parameter variable">-i</span> chef_13.2.20-1_amd64.deb
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>The install script should be accessible from your artifact store.</p>`,8);function q(N,G){const t=r("ExternalLinkIcon");return i(),a("div",null,[u,e("div",h,[d,e("p",null,[n("For more information on how to install InSpec on an airgapped system use the "),e("a",m,[n("chef instructions"),o(t)]),n(" as guidance")])]),f,_,e("ol",null,[g,b,k,x,e("li",null,[n("You have an artifact store for file downloads. At a minimum, it should have the following packages available: "),e("ol",null,[y,v,w,e("li",null,[n("An "),e("a",j,[n("install script"),o(t)]),n(" for Chef Infra Client")])])])]),T,S,R,e("ul",null,[e("li",null,[e("a",A,[n("supermarket-omnibus-cookbook"),o(t)])]),e("li",null,[e("a",C,[n("chef-ingredient"),o(t)])]),e("li",null,[e("a",E,[n("hostsfile"),o(t)])])]),I,l(` ## 14. Viewing and Analyzing Results

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

\`$ inspec exec https://github.com/dev-sec/nginx-baseline -t ssh://TARGET_USERNAME:TARGET_PASSWORD@TARGET_IP --reporter cli json:baseline_output.json\` `)])}const D=s(p,[["render",q],["__file","15.html.vue"]]);export{D as default};
