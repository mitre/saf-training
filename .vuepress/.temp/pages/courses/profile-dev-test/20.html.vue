<template><div><h1 id="understanding-the-kitchen-yml-file" tabindex="-1"><a class="header-anchor" href="#understanding-the-kitchen-yml-file" aria-hidden="true">#</a> Understanding the <code v-pre>kitchen.yml</code> File</h1>
<p>The <a href="./kitchen.yml"><code v-pre>kitchen.yml</code></a> file is the primary configuration file for Test Kitchen. It outlines the shared configuration for all your testing environments, platforms, and the testing framework to be used.</p>
<p>Each of the subsequent kitchen files will inherit the shared settings from this file automatlly and merge them with the setting in the child kitchen file.</p>
<h2 id="example-kitchen-yml-file" tabindex="-1"><a class="header-anchor" href="#example-kitchen-yml-file" aria-hidden="true">#</a> Example <code v-pre>kitchen.yml</code> file</h2>
<div class="language-yaml line-numbers-mode" data-ext="yml"><pre v-pre class="language-yaml"><code><span class="token punctuation">---</span>
<span class="token key atrule">verifier</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> inspec
  <span class="token key atrule">sudo</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
  <span class="token key atrule">reporter</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> cli
    <span class="token punctuation">-</span> json<span class="token punctuation">:</span>spec/results/%<span class="token punctuation">{</span>platform<span class="token punctuation">}</span>_%<span class="token punctuation">{</span>suite<span class="token punctuation">}</span>.json
  <span class="token key atrule">inspec_tests</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> RedHat 8 STIG v1r12
      <span class="token key atrule">path</span><span class="token punctuation">:</span> .
  <span class="token key atrule">input_files</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> kitchen.inputs.yml
  &lt;% if ENV<span class="token punctuation">[</span><span class="token string">'INSPEC_CONTROL'</span><span class="token punctuation">]</span> %<span class="token punctuation">></span>
  <span class="token key atrule">controls</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token string">"&lt;%= ENV['INSPEC_CONTROL'] %>"</span>
  &lt;% end %<span class="token punctuation">></span>
  <span class="token key atrule">load_plugins</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>

<span class="token key atrule">suites</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> vanilla
    <span class="token key atrule">provisioner</span><span class="token punctuation">:</span>
      <span class="token key atrule">playbook</span><span class="token punctuation">:</span> spec/ansible/roles/ansible<span class="token punctuation">-</span>role<span class="token punctuation">-</span>rhel<span class="token punctuation">-</span>vanilla.yml
  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> hardened
    <span class="token key atrule">provisioner</span><span class="token punctuation">:</span>
      <span class="token key atrule">playbook</span><span class="token punctuation">:</span> spec/ansible/roles/ansible<span class="token punctuation">-</span>role<span class="token punctuation">-</span>rhel<span class="token punctuation">-</span>hardened.yml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="breakdown-of-the-kitchen-yml-file" tabindex="-1"><a class="header-anchor" href="#breakdown-of-the-kitchen-yml-file" aria-hidden="true">#</a> Breakdown of the <code v-pre>kitchen.yml</code> file:</h1>
<div class="language-yaml line-numbers-mode" data-ext="yml"><pre v-pre class="language-yaml"><code><span class="token key atrule">verifier</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> inspec
  <span class="token key atrule">sudo</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
  <span class="token key atrule">reporter</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> cli
    <span class="token punctuation">-</span> json<span class="token punctuation">:</span>spec/results/%<span class="token punctuation">{</span>platform<span class="token punctuation">}</span>_%<span class="token punctuation">{</span>suite<span class="token punctuation">}</span>.json
  <span class="token key atrule">inspec_tests</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> RedHat 8 STIG v1r12
      <span class="token key atrule">path</span><span class="token punctuation">:</span> .
  <span class="token key atrule">input_files</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> kitchen.inputs.yml
  &lt;% if ENV<span class="token punctuation">[</span><span class="token string">'INSPEC_CONTROL'</span><span class="token punctuation">]</span> %<span class="token punctuation">></span>
  <span class="token key atrule">controls</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token string">"&lt;%= ENV['INSPEC_CONTROL'] %>"</span>
  &lt;% end %<span class="token punctuation">></span>
  <span class="token key atrule">load_plugins</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>This first section configures the verifier, which is the tool that checks if your system is in the desired state. Here, it's using InSpec.</p>
<ul>
<li><code v-pre>sudo: true</code> means that InSpec will run with sudo privileges.</li>
<li><code v-pre>reporter</code> specifies the formats in which the test results will be reported. Here, it's set to report in the command-line interface (<code v-pre>cli</code>) and in a JSON file (<code v-pre>json:spec/results/%{platform}_%{suite}.json</code>).</li>
<li><code v-pre>inspec_tests</code> specifies the InSpec profiles to run. Here, it's running the &quot;RedHat 8 STIG v1r12&quot; profile located in the current directory (<code v-pre>path: .</code>).</li>
<li><code v-pre>input_files</code> specifies files that contain input variables for the InSpec profile. Here, it's using the <code v-pre>kitchen.inputs.yml</code> file.</li>
<li>The <code v-pre>controls</code> section is dynamically set based on the <code v-pre>INSPEC_CONTROL</code> environment variable. If the variable is set, only the specified control will be run.</li>
<li><code v-pre>load_plugins: true</code> means that InSpec will load any available plugins.</li>
</ul>
<div class="language-yaml line-numbers-mode" data-ext="yml"><pre v-pre class="language-yaml"><code><span class="token key atrule">suites</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> vanilla
    <span class="token key atrule">provisioner</span><span class="token punctuation">:</span>
      <span class="token key atrule">playbook</span><span class="token punctuation">:</span> spec/ansible/roles/ansible<span class="token punctuation">-</span>role<span class="token punctuation">-</span>rhel<span class="token punctuation">-</span>vanilla.yml
  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> hardened
    <span class="token key atrule">provisioner</span><span class="token punctuation">:</span>
      <span class="token key atrule">playbook</span><span class="token punctuation">:</span> spec/ansible/roles/ansible<span class="token punctuation">-</span>role<span class="token punctuation">-</span>rhel<span class="token punctuation">-</span>hardened.yml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>This section defines the test suites. Each suite represents a different configuration to test.</p>
<ul>
<li>Each suite has a <code v-pre>name</code> and a <code v-pre>provisioner</code>.</li>
<li>The <code v-pre>provisioner</code> section specifies the Ansible playbook to use for the suite. Here, it's using the <code v-pre>ansible-role-rhel-vanilla.yml</code> playbook for the &quot;vanilla&quot; suite and the <code v-pre>ansible-role-rhel-hardened.yml</code> playbook for the &quot;hardened&quot; suite.</li>
</ul>
<h2 id="environment-variables-in-kitchen-yml" tabindex="-1"><a class="header-anchor" href="#environment-variables-in-kitchen-yml" aria-hidden="true">#</a> Environment Variables in <code v-pre>kitchen.yml</code></h2>
<ul>
<li><code v-pre>INSPEC_CONTROL</code>: This variable allows you to specify a single control to run during the <code v-pre>bundle exec kitchen verify</code> phase. This is particularly useful for testing or debugging a specific requirement.</li>
</ul>
<h1 id="recap-on-kitchen-stages" tabindex="-1"><a class="header-anchor" href="#recap-on-kitchen-stages" aria-hidden="true">#</a> Recap on Kitchen Stages</h1>
<p>The workflow of Test Kitchen involves the following steps:</p>
<ol>
<li><strong>Create:</strong> Test Kitchen uses the driver to create an instance of the platform.</li>
<li><strong>Converge:</strong> Test Kitchen uses the provisioner to apply the infrastructure code to the instance. In this case, it's using Ansible playbooks.</li>
<li><strong>Verify:</strong> Test Kitchen uses the verifier to check if the instance is in the desired state.</li>
<li><strong>Destroy:</strong> Test Kitchen uses the driver to destroy the instance after testing. This is not shown in your file.</li>
</ol>
</div></template>


