<template><div><h2 id="inspec-commands-and-documentation" tabindex="-1"><a class="header-anchor" href="#inspec-commands-and-documentation" aria-hidden="true">#</a> InSpec Commands and Documentation</h2>
<p>Before we test our NGINX configuration, let's take a look at the InSpec commands and documentation we can use to write tests.</p>
<h3 id="how-to-run-inspec" tabindex="-1"><a class="header-anchor" href="#how-to-run-inspec" aria-hidden="true">#</a> How to Run InSpec</h3>
<p>Use the InSpec executable with the command <code v-pre>inspec exec</code> to run a profile against a system. The generic command is below, but take a look at our breakdown on <a href="https://mitre.github.io/saf-training/courses/user/06.html" target="_blank" rel="noopener noreferrer">How To Run InSpec<ExternalLinkIcon/></a> for the MITRE SAF User course for more information.</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>inspec <span class="token builtin class-name">exec</span> WHERE_IS_THE_PROFILE <span class="token parameter variable">-t</span> WHAT_IS_THE_TARGET --more-flags EXTRA_STUFF <span class="token parameter variable">--reporter</span> WHAT_SHOULD_INSPEC_DO_WITH_THE_RESULTS
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><details class="hint-container details"><summary>Want to try it out?</summary>
<p>You can run a sample InSpec command against the nginx target running in the development lab environment using your <code v-pre>my_nginx</code> profile. Remember, this profile only has one sample control right now.</p>
<CodeTabs id="17" :data='[{"id":"Run InSpec"},{"id":"Expected Output"}]' tab-id="shell">
<template #title0="{ value, isActive }">Run InSpec</template>
<template #title1="{ value, isActive }">Expected Output</template>
<template #tab0="{ value, isActive }">
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>inspec <span class="token builtin class-name">exec</span> my_nginx <span class="token parameter variable">-t</span> docker://nginx <span class="token parameter variable">--reporter</span> cli
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></template>
<template #tab1="{ value, isActive }">
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>Profile:   InSpec Profile <span class="token punctuation">(</span>my_nginx<span class="token punctuation">)</span>
Version:   <span class="token number">0.1</span>.0
Target:    docker://31e4ea1be052a9bcc137003e77cbc7f0a4a3149576a2ce65354092424b0d3a89
Target ID: 761efa53-ee0a-5ea0-a459-b2a5d287b531

  ✔  tmp-1.0: Create /tmp directory
     ✔  File /tmp is expected to be directory

  File /tmp
     ✔  is expected to be directory

Profile Summary: <span class="token number">1</span> successful control, <span class="token number">0</span> control failures, <span class="token number">0</span> controls skipped
Test Summary: <span class="token number">2</span> successful, <span class="token number">0</span> failures, <span class="token number">0</span> skipped
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></template>
</CodeTabs>
</details>
<h3 id="how-to-write-inspec" tabindex="-1"><a class="header-anchor" href="#how-to-write-inspec" aria-hidden="true">#</a> How to Write InSpec</h3>
<p>The <code v-pre>inspec exec</code> command is used to run or <em>execute</em> InSpec profiles. Now, let's talk about InSpec's existing documentation and features to support <em>writing</em> those InSpec profiles.</p>
<p>Good InSpec tests will use resources, many of which are already built in, to easily describe some part of the system. Remember the <code v-pre>file</code> resource as an example from the previous section. Additionally, tests should use matchers to implement the logic check of an expected result. The previous example used <code v-pre>be_directory</code> as a matcher. There are a number of built-in <a href="https://docs.chef.io/inspec/matchers/" target="_blank" rel="noopener noreferrer">matchers<ExternalLinkIcon/></a>: <code v-pre>be_in</code>, <code v-pre>be_readable</code>, <code v-pre>cmp</code>, <code v-pre>include</code>, to list a few.</p>
<div class="hint-container tip">
<p class="hint-container-title">Make Writing InSpec Easier with Built-in Resources</p>
<p>InSpec features dozens of resources and matchers that come predefined in the language. These resources are a core benefit to using InSpec because they allow you to leverage existing stable code to write simple and consistent tests.</p>
<p>When writing profiles, refer back to the documentation for resources. They often give you an example of how to write a test that matches your current problem.</p>
</div>
<div class="hint-container info">
<p class="hint-container-title">Finding Documentation</p>
<ul>
<li>Explore the <a href="https://www.inspec.io/docs/" target="_blank" rel="noopener noreferrer">InSpec documentation<ExternalLinkIcon/></a> to see which resources and matchers are available, including descriptions of their attributes and examples of their use.</li>
<li>Examine the <a href="https://github.com/inspec/inspec" target="_blank" rel="noopener noreferrer">source code<ExternalLinkIcon/></a> to see what's available. For example, you can see how <code v-pre>file</code> and other InSpec resources are implemented.</li>
<li>Reference examples, such as profiles provided on <a href="https://supermarket.chef.io/tools-directory" target="_blank" rel="noopener noreferrer">Chef Supermarket<ExternalLinkIcon/></a>, as a guide.</li>
<li>Explore InSpec interactively using the <a href="https://www.inspec.io/docs/reference/shell/" target="_blank" rel="noopener noreferrer">InSpec shell<ExternalLinkIcon/></a>.</li>
</ul>
</div>
<h3 id="the-inspec-shell" tabindex="-1"><a class="header-anchor" href="#the-inspec-shell" aria-hidden="true">#</a> The InSpec shell</h3>
<p>The <a href="https://www.inspec.io/docs/reference/shell/" target="_blank" rel="noopener noreferrer">InSpec shell<ExternalLinkIcon/></a> enables you to explore InSpec interactively. In this part, you'll use the InSpec shell to discover which resources can be used to test your NGINX configuration.</p>
<p>You are not required to use the InSpec shell to develop your profiles, but some users (including this course's instructors) find the InSpec shell to be a useful way to get immediate feedback and explore what's available. You can also use the InSpec shell to debug your tests; the shell lets you write and execute <code v-pre>describe</code> blocks in-line.</p>
<details class="hint-container details"><summary>What is the InSpec Shell?</summary>
<p>InSpec shell is based on a tool called <code v-pre>pry</code>. <a href="https://github.com/pry/pry" target="_blank" rel="noopener noreferrer"><code v-pre>pry</code><ExternalLinkIcon/></a> is an interactive debugging environment for Ruby.</p>
</details>
<h3 id="entering-the-inspec-shell" tabindex="-1"><a class="header-anchor" href="#entering-the-inspec-shell" aria-hidden="true">#</a> Entering the InSpec shell</h3>
<p>Run <code v-pre>inspec shell</code> to enter the interactive session.</p>
<CodeTabs id="87" :data='[{"id":"InSpec Shell Command"},{"id":"Output - Enter the InSpec Shell"}]' tab-id="shell">
<template #title0="{ value, isActive }">InSpec Shell Command</template>
<template #title1="{ value, isActive }">Output - Enter the InSpec Shell</template>
<template #tab0="{ value, isActive }">
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>inspec shell
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></template>
<template #tab1="{ value, isActive }">
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>Welcome to the interactive InSpec Shell
To <span class="token function">find</span> out how to use it, type: <span class="token builtin class-name">help</span>

You are currently running on:

    Name:      ubuntu
    Families:  debian, linux, unix, os
    Release:   <span class="token number">20.04</span>
    Arch:      x86_64
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></template>
</CodeTabs>
<p>Run <code v-pre>help</code> to see what commands are available.</p>
<CodeTabs id="98" :data='[{"id":"Command - help"},{"id":"Output - help"}]' tab-id="shell">
<template #title0="{ value, isActive }">Command - help</template>
<template #title1="{ value, isActive }">Output - help</template>
<template #tab0="{ value, isActive }">
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token builtin class-name">help</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></template>
<template #tab1="{ value, isActive }">
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>inspec<span class="token operator">></span> <span class="token builtin class-name">help</span>
You are currently running on:

    Name:      ubuntu
    Families:  debian, linux, unix, os
    Release:   <span class="token number">20.04</span>
    Arch:      x86_64

Available commands:

    <span class="token variable"><span class="token variable">`</span><span class="token punctuation">[</span>resource<span class="token punctuation">]</span><span class="token variable">`</span></span> - run resource on target machine
    <span class="token variable"><span class="token variable">`</span><span class="token builtin class-name">help</span> resources<span class="token variable">`</span></span> - show all available resources that can be used as commands
    <span class="token variable"><span class="token variable">`</span><span class="token builtin class-name">help</span> <span class="token punctuation">[</span>resource<span class="token punctuation">]</span><span class="token variable">`</span></span> - information about a specific resource
    <span class="token variable"><span class="token variable">`</span><span class="token builtin class-name">help</span> matchers<span class="token variable">`</span></span> - show information about common matchers
    <span class="token variable"><span class="token variable">`</span><span class="token builtin class-name">exit</span><span class="token variable">`</span></span> - <span class="token builtin class-name">exit</span> the InSpec shell

You can use resources <span class="token keyword">in</span> this environment to <span class="token builtin class-name">test</span> the target machine. For example:

    command<span class="token punctuation">(</span><span class="token string">'uname -a'</span><span class="token punctuation">)</span>.stdout
    file<span class="token punctuation">(</span><span class="token string">'/proc/cpuinfo'</span><span class="token punctuation">)</span>.content <span class="token operator">=</span><span class="token operator">></span> <span class="token string">"value"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></template>
</CodeTabs>
<p>Run <code v-pre>help resources</code> to see which resources are available.</p>
<CodeTabs id="109" :data='[{"id":"Command"},{"id":"Output"}]' tab-id="shell">
<template #title0="{ value, isActive }">Command</template>
<template #title1="{ value, isActive }">Output</template>
<template #tab0="{ value, isActive }">
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token builtin class-name">help</span> resources
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></template>
<template #tab1="{ value, isActive }">
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>inspec<span class="token operator">></span> <span class="token builtin class-name">help</span> resources

         - aide_conf
         - apache
         - apache_conf
         - <span class="token function">apt</span>
         - audit_policy
         - auditd
         - auditd_conf
         <span class="token punctuation">..</span>.
         - <span class="token function">file</span>
         <span class="token punctuation">..</span>.
        - xml
        - yaml
        - yum
        - zfs_dataset
        - zfs_pool
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></template>
</CodeTabs>
<p>You see <code v-pre>file</code> and other resources listed.</p>
<h3 id="using-the-inspec-shell" tabindex="-1"><a class="header-anchor" href="#using-the-inspec-shell" aria-hidden="true">#</a> Using the InSpec Shell</h3>
<p>Earlier, we saw this <code v-pre>describe</code> block:</p>
<div class="language-ruby line-numbers-mode" data-ext="rb"><pre v-pre class="language-ruby"><code>describe file<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'/tmp'</span></span><span class="token punctuation">)</span> <span class="token keyword">do</span>
  it <span class="token punctuation">{</span> should be_directory <span class="token punctuation">}</span>
<span class="token keyword">end</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>The InSpec shell understands the structure of blocks. This enables you to run mutiline code. As an example, run the entire <code v-pre>describe</code> block like this which will run the entire block of code in the InSpec Shell and return the result.</p>
<CodeTabs id="130" :data='[{"id":"Command - describe block"},{"id":"Output - describe block"}]' tab-id="shell">
<template #title0="{ value, isActive }">Command - describe block</template>
<template #title1="{ value, isActive }">Output - describe block</template>
<template #tab0="{ value, isActive }">
<div class="language-ruby line-numbers-mode" data-ext="rb"><pre v-pre class="language-ruby"><code>describe file<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'/tmp'</span></span><span class="token punctuation">)</span> <span class="token keyword">do</span>
  it <span class="token punctuation">{</span> should be_directory <span class="token punctuation">}</span>
<span class="token keyword">end</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></template>
<template #tab1="{ value, isActive }">
<div class="language-ruby line-numbers-mode" data-ext="rb"><pre v-pre class="language-ruby"><code>inspec<span class="token operator">></span> describe file<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'/tmp'</span></span><span class="token punctuation">)</span> <span class="token keyword">do</span>
inspec<span class="token operator">></span>   it <span class="token punctuation">{</span> should be_directory <span class="token punctuation">}</span>  
inspec<span class="token operator">></span> <span class="token keyword">end</span>  

<span class="token symbol">Profile</span><span class="token operator">:</span>   inspec<span class="token operator">-</span>shell
<span class="token symbol">Version</span><span class="token operator">:</span>   <span class="token punctuation">(</span><span class="token keyword">not</span> specified<span class="token punctuation">)</span>
Target <span class="token constant">ID</span><span class="token operator">:</span> 

  <span class="token builtin">File</span> <span class="token operator">/</span>tmp
     ✔  is expected to be directory

Test Summary<span class="token operator">:</span> <span class="token number">1</span> successful<span class="token punctuation">,</span> <span class="token number">0</span> failures<span class="token punctuation">,</span> <span class="token number">0</span> skipped
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></template>
</CodeTabs>
<p>In practice, you don't typically run controls interactively this way for day to day use, but it is a great way to test out your ideas, find bugs or validate your approach before running a scan in its entirety on a target of evaluation.</p>
<div class="hint-container tip">
<p class="hint-container-title">What is the difference between InSpec and Ruby?</p>
<p>Inspec is a Domain Specific Language (DSL) on top of Ruby. In other words, InSpec is built on the Ruby programming language. For example, InSpec matchers are implemented as Ruby methods.</p>
</div>
<h3 id="exploring-resources" tabindex="-1"><a class="header-anchor" href="#exploring-resources" aria-hidden="true">#</a> Exploring Resources</h3>
<h4 id="file-example" tabindex="-1"><a class="header-anchor" href="#file-example" aria-hidden="true">#</a> <code v-pre>file</code> example</h4>
<p>You can also use the InSpec shell to explore resources, in addition to referencing the <a href="https://docs.chef.io/inspec/resources/" target="_blank" rel="noopener noreferrer">resource documentation<ExternalLinkIcon/></a>. Here, we can use the InSpec shell to see how the <code v-pre>file</code> resource functions.<br>
Run this command to list which methods are available to the <code v-pre>file</code> resource.</p>
<CodeTabs id="155" :data='[{"id":"Command - file resource"},{"id":"Output - file resource"}]' tab-id="shell">
<template #title0="{ value, isActive }">Command - file resource</template>
<template #title1="{ value, isActive }">Output - file resource</template>
<template #tab0="{ value, isActive }">
<div class="language-ruby line-numbers-mode" data-ext="rb"><pre v-pre class="language-ruby"><code>file<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'/tmp'</span></span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">.</span>superclass<span class="token punctuation">.</span>instance_methods<span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">.</span>sort
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></template>
<template #tab1="{ value, isActive }">
<div class="language-ruby line-numbers-mode" data-ext="rb"><pre v-pre class="language-ruby"><code>inspec<span class="token operator">></span> file<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'/tmp'</span></span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">.</span>superclass<span class="token punctuation">.</span>instance_methods<span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">.</span>sort

        <span class="token operator">=></span> <span class="token punctuation">[</span><span class="token symbol">:allowed?</span><span class="token punctuation">,</span>
         <span class="token symbol">:basename</span><span class="token punctuation">,</span>
         <span class="token symbol">:block_device?</span><span class="token punctuation">,</span>
         <span class="token symbol">:character_device?</span><span class="token punctuation">,</span>
         <span class="token symbol">:contain</span><span class="token punctuation">,</span>
         <span class="token symbol">:content</span><span class="token punctuation">,</span>
         <span class="token symbol">:directory?</span><span class="token punctuation">,</span>
         <span class="token operator">...</span>
         <span class="token symbol">:sticky</span><span class="token punctuation">,</span>
         <span class="token symbol">:sticky?</span><span class="token punctuation">,</span>
         <span class="token symbol">:suid</span><span class="token punctuation">,</span>
         <span class="token symbol">:symlink?</span><span class="token punctuation">,</span>
         <span class="token symbol">:to_s</span><span class="token punctuation">,</span>
         <span class="token symbol">:type</span><span class="token punctuation">,</span>
         <span class="token symbol">:uid</span><span class="token punctuation">,</span>
         <span class="token symbol">:version?</span><span class="token punctuation">,</span>
         <span class="token symbol">:writable?</span><span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></template>
</CodeTabs>
<p>You can use the arrow or Page Up and Page Down keys to scroll through the list. When you're done, press <code v-pre>Q</code>.</p>
<details class="hint-container details"><summary>Exploring Resources in the InSpec Shell</summary>
<p>Let's use the InSpec shell to explore some resources in InSpec. We will start with one of the most common elements on the system: a directory. In the InSpec Shell call the <code v-pre>file.directory?</code> method.</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>file<span class="token punctuation">(</span><span class="token string">'/tmp'</span><span class="token punctuation">)</span>.directory?
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>inspec<span class="token operator">></span> file<span class="token punctuation">(</span><span class="token string">'/tmp'</span><span class="token punctuation">)</span>.directory?
        <span class="token operator">=</span><span class="token operator">></span> <span class="token boolean">true</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>This will return <code v-pre>true</code>, since <code v-pre>/tmp</code> is a directory on the system and exists on your workstation container.</p>
<p>To make the tests easier to read, the InSpec language uses &quot;syntactic sugar&quot; to turn methods into English-like phrases. For example, the Ruby language contains boolean methods ending in <code v-pre>?</code> which evaluate to <code v-pre>true</code> or <code v-pre>false</code> (<code v-pre>nil</code> is a type of false). InSpec changes the syntax of these methods to include <code v-pre>be_</code> before the method rather than <code v-pre>?</code> after the method to make it more readable. For example, to check if a directory exists, Ruby would traditionally use <code v-pre>directory?</code> while InSpec uses <code v-pre>be_directory</code>.</p>
<div class="hint-container info">
<p class="hint-container-title">Using Ruby Predicate Methods</p>
<p>Given what we have just learned, the <strong>best practice</strong> in InSpec is to return something that evaluates to <code v-pre>true</code> or <code v-pre>false</code>.<br>
The <code v-pre>?</code> (or <code v-pre>be_</code> in InSpec) makes your method a Ruby Predicate Method. See <a href="http://ruby-for-beginners.rubymonstas.org/objects/predicates.html" target="_blank" rel="noopener noreferrer">Ruby predicate methods<ExternalLinkIcon/></a> to learn more.</p>
</div>
</details>
<h4 id="nginx-example" tabindex="-1"><a class="header-anchor" href="#nginx-example" aria-hidden="true">#</a> <code v-pre>nginx</code> example</h4>
<p>Now's a good time to define the requirements for our NGINX configuration. Let's say that you require:</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token number">1</span>. NGINX version <span class="token number">1.10</span>.3 or later.
<span class="token number">2</span>. The following NGINX modules should be installed:
   * <span class="token variable"><span class="token variable">`</span>http_ssl<span class="token variable">`</span></span>
   * <span class="token variable"><span class="token variable">`</span>stream_ssl<span class="token variable">`</span></span>
   * <span class="token variable"><span class="token variable">`</span>mail_ssl<span class="token variable">`</span></span>
<span class="token number">3</span>. The NGINX configuration <span class="token function">file</span> - <span class="token variable"><span class="token variable">`</span>/etc/nginx/nginx.conf<span class="token variable">`</span></span>- should exist as a file.
<span class="token number">4</span>. The NGINX configuration <span class="token function">file</span> should:
   * be owned by the <span class="token variable"><span class="token variable">`</span>root<span class="token variable">`</span></span> user and group.
   * not be readable, writeable, or executable by others.
<span class="token number">5</span>. The NGINX shell access should be restricted to admin users.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>In the next section, we will start writing controls for <code v-pre>my_nginx</code> profile.</p>
<p>Let's see what resources are available for <code v-pre>nginx</code>.</p>
<p>Run <code v-pre>help resources</code> a second time to identify InSpec's provided two built-in resources to support NGINX – <code v-pre>nginx</code> and <code v-pre>nginx_conf</code>.</p>
<CodeTabs id="200" :data='[{"id":"Command - resources"},{"id":"Output - resources"}]' tab-id="shell">
<template #title0="{ value, isActive }">Command - resources</template>
<template #title1="{ value, isActive }">Output - resources</template>
<template #tab0="{ value, isActive }">
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token builtin class-name">help</span> resources
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></template>
<template #tab1="{ value, isActive }">
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>inspec<span class="token operator">></span> <span class="token builtin class-name">help</span> resources

         - aide_conf
         - apache
         - apache_conf
         - <span class="token function">apt</span>
         <span class="token punctuation">..</span>.
         - nginx
         - nginx_conf
         <span class="token punctuation">..</span>.
         - xml
         - yaml
         - yum
         - yumrepo
         - zfs_dataset
         - zfs_pool
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></template>
</CodeTabs>
<p>Run <code v-pre>nginx.methods</code>. This will list all of the available methods for the <code v-pre>nginx</code> resource. You can see the <code v-pre>version</code> and <code v-pre>modules</code> methods. These will be useful to us in the next section.</p>
<CodeTabs id="211" :data='[{"id":"Command - nginx methods"},{"id":"Output - nginx methods"}]' tab-id="shell">
<template #title0="{ value, isActive }">Command - nginx methods</template>
<template #title1="{ value, isActive }">Output - nginx methods</template>
<template #tab0="{ value, isActive }">
<div class="language-ruby line-numbers-mode" data-ext="rb"><pre v-pre class="language-ruby"><code>nginx<span class="token punctuation">.</span>methods
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></template>
<template #tab1="{ value, isActive }">
<div class="language-ruby line-numbers-mode" data-ext="rb"><pre v-pre class="language-ruby"><code><span class="token operator">=></span> <span class="token punctuation">[</span><span class="token symbol">:params</span><span class="token punctuation">,</span>
 <span class="token symbol">:bin_dir</span><span class="token punctuation">,</span>
 <span class="token symbol">:prefix</span><span class="token punctuation">,</span>
 <span class="token symbol">:openssl_version</span><span class="token punctuation">,</span>
 <span class="token symbol">:compiler_info</span><span class="token punctuation">,</span>
 <span class="token symbol">:support_info</span><span class="token punctuation">,</span>
 <span class="token operator">...</span>
 <span class="token symbol">:http_scgi_temp_path</span><span class="token punctuation">,</span>
 <span class="token symbol">:version</span><span class="token punctuation">,</span>
 <span class="token symbol">:resource_id</span><span class="token punctuation">,</span>
 <span class="token symbol">:to_s</span><span class="token punctuation">,</span>
 <span class="token symbol">:service</span><span class="token punctuation">,</span>
 <span class="token operator">...</span>
  <span class="token symbol">:equal?</span><span class="token punctuation">,</span>
 <span class="token symbol">:__id__</span><span class="token punctuation">,</span>
 <span class="token symbol">:instance_eval</span><span class="token punctuation">,</span>
 <span class="token symbol">:instance_exec</span><span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></template>
</CodeTabs>
<p>Run <code v-pre>nginx.version</code> to see what result you get.</p>
<div class="hint-container warning">
<p class="hint-container-title">Expected Error Ahead</p>
<p>Recall that you're working on your workstation  environment, which does not have NGINX installed.</p>
</div>
<CodeTabs id="227" :data='[{"id":"Command - nginx version"},{"id":"Output - nginx version"}]' tab-id="shell">
<template #title0="{ value, isActive }">Command - nginx version</template>
<template #title1="{ value, isActive }">Output - nginx version</template>
<template #tab0="{ value, isActive }">
<div class="language-ruby line-numbers-mode" data-ext="rb"><pre v-pre class="language-ruby"><code>nginx<span class="token punctuation">.</span>version
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></template>
<template #tab1="{ value, isActive }">
<div class="language-ruby line-numbers-mode" data-ext="rb"><pre v-pre class="language-ruby"><code>inspec<span class="token operator">></span> nginx<span class="token punctuation">.</span>version
<span class="token symbol">NoMethodError</span><span class="token operator">:</span> undefined method `<span class="token punctuation">[</span><span class="token punctuation">]</span>' <span class="token keyword">for</span> <span class="token keyword">nil</span><span class="token symbol">:NilClass</span>
from <span class="token operator">/</span>opt<span class="token operator">/</span>inspec<span class="token operator">/</span>embedded<span class="token operator">/</span>lib<span class="token operator">/</span>ruby<span class="token operator">/</span>gems<span class="token operator">/</span><span class="token number">2.4</span><span class="token number">.0</span><span class="token operator">/</span>gems<span class="token operator">/</span>inspec<span class="token operator">-</span><span class="token number">2.0</span><span class="token number">.17</span><span class="token operator">/</span>lib<span class="token regex-literal"><span class="token regex">/resources/nginx</span></span><span class="token punctuation">.</span>rb<span class="token operator">:</span><span class="token number">39</span><span class="token symbol">:in</span> `block <span class="token punctuation">(</span><span class="token number">2</span> levels<span class="token punctuation">)</span> <span class="token keyword">in</span> <span class="token operator">&lt;</span><span class="token keyword">class</span><span class="token symbol">:Nginx</span><span class="token operator">></span>'
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></template>
</CodeTabs>
<p>We can verify this with Inspec by running the following command:</p>
<CodeTabs id="238" :data='[{"id":"Command - nginx installed"},{"id":"Output - nginx installed"}]' tab-id="shell">
<template #title0="{ value, isActive }">Command - nginx installed</template>
<template #title1="{ value, isActive }">Output - nginx installed</template>
<template #tab0="{ value, isActive }">
<div class="language-ruby line-numbers-mode" data-ext="rb"><pre v-pre class="language-ruby"><code>package<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'nginx'</span></span><span class="token punctuation">)</span><span class="token punctuation">.</span>installed<span class="token operator">?</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></template>
<template #tab1="{ value, isActive }">
<div class="language-ruby line-numbers-mode" data-ext="rb"><pre v-pre class="language-ruby"><code>inspec<span class="token operator">></span> package<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'nginx'</span></span><span class="token punctuation">)</span><span class="token punctuation">.</span>installed<span class="token operator">?</span>

        <span class="token operator">=></span> <span class="token boolean">false</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></template>
</CodeTabs>
<p>As you can see we get <code v-pre>false</code> - since nginx is not installed on your <code v-pre>runner</code>.</p>
<p>We can instead run InSpec shell commands against the <strong>target that does have NGINX installed</strong> to see what results we find.</p>
<p>To do so, first start by exiting your InSpec shell session.</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>exit
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>Run <code v-pre>docker ps</code> to see the running docker containers in your development lab environment that we can test:</p>
<CodeTabs id="259" :data='[{"id":"Command - docker"},{"id":"Output - docker"}]' tab-id="shell">
<template #title0="{ value, isActive }">Command - docker</template>
<template #title1="{ value, isActive }">Output - docker</template>
<template #tab0="{ value, isActive }">
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">docker</span> <span class="token function">ps</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></template>
<template #tab1="{ value, isActive }">
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>CONTAINER ID   IMAGE          COMMAND                  CREATED          STATUS          PORTS                NAMES
d4bcef5bb9e3   nginx:latest   <span class="token string">"/docker-entrypoint.…"</span>   <span class="token number">23</span> seconds ago   Up <span class="token number">22</span> seconds   <span class="token number">80</span>/tcp               nifty_shtern
4f0ceb9b5974   nginx:latest   <span class="token string">"/docker-entrypoint.…"</span>   <span class="token number">2</span> months ago     Up <span class="token number">45</span> seconds   <span class="token number">0.0</span>.0.0:80-<span class="token operator">></span><span class="token number">80</span>/tcp   nginx
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></template>
</CodeTabs>
<p>We can enter the InSpec shell on the nginx container instead of our lab environment host machine that we did before.<br>
Run <code v-pre>inspec shell</code>, this time providing the <code v-pre>-t</code> argument to connect the shell session to the target container.</p>
<CodeTabs id="270" :data='[{"id":"Command - shell into container"},{"id":"Alternate Command"},{"id":"Output - shell into container"}]' tab-id="shell">
<template #title0="{ value, isActive }">Command - shell into container</template>
<template #title1="{ value, isActive }">Alternate Command</template>
<template #title2="{ value, isActive }">Output - shell into container</template>
<template #tab0="{ value, isActive }">
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>inspec shell <span class="token parameter variable">-t</span> docker://nginx
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></template>
<template #tab1="{ value, isActive }">
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>inspec shell <span class="token parameter variable">-t</span> docker://CONTAINER_ID
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></template>
<template #tab2="{ value, isActive }">
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>Welcome to the interactive InSpec Shell
To <span class="token function">find</span> out how to use it, type: <span class="token builtin class-name">help</span>

You are currently running on:

    Name:      debian
    Families:  debian, linux, unix, os
    Release:   <span class="token number">12.2</span>
    Arch:      x86_64
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></template>
</CodeTabs>
<div class="hint-container tip">
<p class="hint-container-title">InSpec is agentless</p>
<p>Remember that the target does not have InSpec installed on it. Your shell session exists on the workstation; InSpec routes commands to the target instance over Docker.</p>
</div>
<p>Check that the nginx package is intalled, this time on the target container.</p>
<CodeTabs id="289" :data='[{"id":"Command - package installed"},{"id":"Output - package installed"}]' tab-id="shell">
<template #title0="{ value, isActive }">Command - package installed</template>
<template #title1="{ value, isActive }">Output - package installed</template>
<template #tab0="{ value, isActive }">
<div class="language-ruby line-numbers-mode" data-ext="rb"><pre v-pre class="language-ruby"><code>package<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'nginx'</span></span><span class="token punctuation">)</span><span class="token punctuation">.</span>installed<span class="token operator">?</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></template>
<template #tab1="{ value, isActive }">
<div class="language-ruby line-numbers-mode" data-ext="rb"><pre v-pre class="language-ruby"><code>inspec<span class="token operator">></span> package<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'nginx'</span></span><span class="token punctuation">)</span><span class="token punctuation">.</span>installed<span class="token operator">?</span>

        <span class="token operator">=></span> <span class="token boolean">true</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></template>
</CodeTabs>
<p>Now, let's get the <code v-pre>version</code> of NGINX that is installed on the target, run: <code v-pre>nginx.version</code>. You can see that version 1.23.3 was installed on our container.</p>
<CodeTabs id="300" :data='[{"id":"Command - version"},{"id":"Output - version"}]' tab-id="shell">
<template #title0="{ value, isActive }">Command - version</template>
<template #title1="{ value, isActive }">Output - version</template>
<template #tab0="{ value, isActive }">
<div class="language-ruby line-numbers-mode" data-ext="rb"><pre v-pre class="language-ruby"><code>nginx<span class="token punctuation">.</span>version
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></template>
<template #tab1="{ value, isActive }">
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>inspec> nginx.version
=> "1.25.3"
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></template>
</CodeTabs>
<p>To complete the example, let's see which <code v-pre>modules</code> are enabled on the nginx container. Run <code v-pre>nginx.modules</code> to list the installed NGINX modules.</p>
<CodeTabs id="311" :data='[{"id":"Command - nginx modules"},{"id":"Output - nginx modules"}]' tab-id="shell">
<template #title0="{ value, isActive }">Command - nginx modules</template>
<template #title1="{ value, isActive }">Output - nginx modules</template>
<template #tab0="{ value, isActive }">
<div class="language-ruby line-numbers-mode" data-ext="rb"><pre v-pre class="language-ruby"><code>nginx<span class="token punctuation">.</span>modules
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></template>
<template #tab1="{ value, isActive }">
<div class="language-ruby line-numbers-mode" data-ext="rb"><pre v-pre class="language-ruby"><code><span class="token operator">=></span> <span class="token punctuation">[</span><span class="token string-literal"><span class="token string">"http_addition"</span></span><span class="token punctuation">,</span>
 <span class="token string-literal"><span class="token string">"http_auth_request"</span></span><span class="token punctuation">,</span>
 <span class="token string-literal"><span class="token string">"http_dav"</span></span><span class="token punctuation">,</span>
 <span class="token string-literal"><span class="token string">"http_flv"</span></span><span class="token punctuation">,</span>
 <span class="token string-literal"><span class="token string">"http_gunzip"</span></span><span class="token punctuation">,</span>
 <span class="token string-literal"><span class="token string">"http_gzip_static"</span></span><span class="token punctuation">,</span>
 <span class="token string-literal"><span class="token string">"http_mp4"</span></span><span class="token punctuation">,</span>
 <span class="token string-literal"><span class="token string">"http_random_index"</span></span><span class="token punctuation">,</span>
 <span class="token string-literal"><span class="token string">"http_realip"</span></span><span class="token punctuation">,</span>
 <span class="token string-literal"><span class="token string">"http_secure_link"</span></span><span class="token punctuation">,</span>
 <span class="token string-literal"><span class="token string">"http_slice"</span></span><span class="token punctuation">,</span>
 <span class="token string-literal"><span class="token string">"http_ssl"</span></span><span class="token punctuation">,</span>
 <span class="token string-literal"><span class="token string">"http_stub_status"</span></span><span class="token punctuation">,</span>
 <span class="token string-literal"><span class="token string">"http_sub"</span></span><span class="token punctuation">,</span>
 <span class="token string-literal"><span class="token string">"http_v2"</span></span><span class="token punctuation">,</span>
 <span class="token string-literal"><span class="token string">"mail_ssl"</span></span><span class="token punctuation">,</span>
 <span class="token string-literal"><span class="token string">"stream_realip"</span></span><span class="token punctuation">,</span>
 <span class="token string-literal"><span class="token string">"stream_ssl"</span></span><span class="token punctuation">,</span>
 <span class="token string-literal"><span class="token string">"stream_ssl_preread"</span></span><span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></template>
</CodeTabs>
<details class="hint-container details"><summary>Looking at the nginx_conf resource</summary>
<p>The <a href="https://www.inspec.io/docs/reference/resources/nginx_conf/" target="_blank" rel="noopener noreferrer">nginx_conf<ExternalLinkIcon/></a> resource examines the contents of the NGINX configuration file, <code v-pre>/etc/nginx/nginx.conf</code>.</p>
</details>
<p>To check whether the NGINX configuration file exists as a file, we want to test attributes of the file itself, so we use the <code v-pre>file</code> resource.</p>
<p>Use the <code v-pre>file</code> resource to check whether the NGINX configuration file is owned by <code v-pre>root</code> and is not readable, writeable, or executable by others. You saw earlier how the <code v-pre>file</code> resource provides the <code v-pre>readable</code>, <code v-pre>writeable</code>, and <code v-pre>executable</code> methods. You would also see that the <code v-pre>file</code> resource provides the <code v-pre>owned_by</code> and <code v-pre>grouped_into</code> methods.</p>
<CodeTabs id="330" :data='[{"id":"Command - file methods"},{"id":"Output - file methods"}]'>
<template #title0="{ value, isActive }">Command - file methods</template>
<template #title1="{ value, isActive }">Output - file methods</template>
<template #tab0="{ value, isActive }">
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>file<span class="token punctuation">(</span><span class="token string">'/tmp'</span><span class="token punctuation">)</span>.class.superclass.instance_methods<span class="token punctuation">(</span>false<span class="token punctuation">)</span>.sort
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></template>
<template #tab1="{ value, isActive }">
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>        <span class="token operator">=</span><span class="token operator">></span> <span class="token punctuation">[</span>:allowed?,
         :directory?,
         :executable?,
         :exist?,
         :file,
         :file?,
         :file_version,
         :gid,
         :group,
         :grouped_into?,
         <span class="token punctuation">..</span>.
         :owned_by?,
         <span class="token punctuation">..</span>.
         :readable?,
         <span class="token punctuation">..</span>.
         :to_s,
         :type,
         :uid,
         :version?,
         :writable?<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></template>
</CodeTabs>
<p>To check whether shell access has been provided to non-admin users, because we want to test attributes of users, you'll use the <code v-pre>users</code> resource.</p>
<CodeTabs id="341" :data='[{"id":"Command - users methods"},{"id":"Output - users methods"}]'>
<template #title0="{ value, isActive }">Command - users methods</template>
<template #title1="{ value, isActive }">Output - users methods</template>
<template #tab0="{ value, isActive }">
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>users.class.superclass.instance_methods<span class="token punctuation">(</span>false<span class="token punctuation">)</span>.sort
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></template>
<template #tab1="{ value, isActive }">
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>        <span class="token operator">=</span><span class="token operator">></span> <span class="token punctuation">[</span>:count, 
        :disabled, 
        :disabled?, 
        :enabled?, 
        :entries, 
        :exist?, 
        :exists?, 
        :gids, 
        :groupnames, 
        :groups, 
        :homes, 
        :maxdays, 
        :mindays, 
        :raw_data, 
        :shells, 
        :to_s, 
        :uids, 
        :usernames, 
        :warndays, 
        :where<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></template>
</CodeTabs>
<p>Exit the InSpec shell session with the <code v-pre>exit</code> command.</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token builtin class-name">exit</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></div></template>


