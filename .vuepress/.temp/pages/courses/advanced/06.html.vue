<template><div><h2 id="custom-resource-docker" tabindex="-1"><a class="header-anchor" href="#custom-resource-docker" aria-hidden="true">#</a> Custom Resource - Docker</h2>
<p>Now let's try a more complicated example. Let's say we want to create a resource that can parse a <code v-pre>docker-compose</code> file.</p>
<h3 id="create-new-profile-and-setup-docker-files" tabindex="-1"><a class="header-anchor" href="#create-new-profile-and-setup-docker-files" aria-hidden="true">#</a> Create new profile and setup Docker files</h3>
<p>First, we need a test target! Check out the <code v-pre>resources/docker-compose.yml</code> file in Codespaces for what we can test. It looks like this:</p>
<div class="language-yaml line-numbers-mode" data-ext="yml"><pre v-pre class="language-yaml"><code><span class="token key atrule">version</span><span class="token punctuation">:</span> <span class="token string">'3'</span>
<span class="token key atrule">services</span><span class="token punctuation">:</span>
  <span class="token key atrule">workstation</span><span class="token punctuation">:</span>
    <span class="token key atrule">container_name</span><span class="token punctuation">:</span> workstation
    <span class="token key atrule">image</span><span class="token punctuation">:</span> learnchef/inspec_workstation
    <span class="token key atrule">stdin_open</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
    <span class="token key atrule">tty</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
    <span class="token key atrule">links</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> target
    <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> .<span class="token punctuation">:</span>/root
  <span class="token key atrule">target</span><span class="token punctuation">:</span>
    <span class="token key atrule">image</span><span class="token punctuation">:</span> learnchef/inspec_target
    <span class="token key atrule">stdin_open</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
    <span class="token key atrule">tty</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>We will continue writing our controls to check against this docker file:</p>
<CodeTabs id="16" :data='[{"id":"Command"},{"id":"Output"}]'>
<template #title0="{ value, isActive }">Command</template>
<template #title1="{ value, isActive }">Output</template>
<template #tab0="{ value, isActive }">
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>inspec init profile docker-workstations
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></template>
<template #tab1="{ value, isActive }">
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code> ─────────────────────────── InSpec Code Generator ─────────────────────────── 

Creating new profile at /workspaces/saf-training-lab-environment/docker-workstations
 • Creating <span class="token function">file</span> inspec.yml
 • Creating directory /workspaces/saf-training-lab-environment/docker-workstations/controls
 • Creating <span class="token function">file</span> controls/example.rb
 • Creating <span class="token function">file</span> README.md
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></template>
</CodeTabs>
<h3 id="develop-controls-to-test-run-profile" tabindex="-1"><a class="header-anchor" href="#develop-controls-to-test-run-profile" aria-hidden="true">#</a> Develop controls to test/run profile</h3>
<p>Conceptually, we want to write tests with this profile that will check different settings in a docker-compose file. If you are not sure what the InSpec code looks like for a particular test, start by writing what conceptually you want to achieve, then modify it to be correct syntax. We can do that with the idea of checking a setting in a docker-compose file, which we know is a YAML file, as such:</p>
<p>In the <code v-pre>docker-workstations/controls/example.rb</code> file, write the control:</p>
<div class="language-ruby line-numbers-mode" data-ext="rb"><pre v-pre class="language-ruby"><code>describe yaml<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'file_name'</span></span><span class="token punctuation">)</span> <span class="token keyword">do</span>
  its<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'setting'</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span> should_not eq <span class="token string-literal"><span class="token string">'value'</span></span> <span class="token punctuation">}</span>
<span class="token keyword">end</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>We test early and often. We know that the test we wrote is not complete, but we can see if we are on the right track. Remember that the command line output can help guide your development!</p>
<CodeTabs id="37" :data='[{"id":"Command"},{"id":"Output"}]'>
<template #title0="{ value, isActive }">Command</template>
<template #title1="{ value, isActive }">Output</template>
<template #tab0="{ value, isActive }">
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>inspec <span class="token builtin class-name">exec</span> docker-workstations
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></template>
<template #tab1="{ value, isActive }">
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>Profile:   InSpec Profile <span class="token punctuation">(</span>docker-workstations<span class="token punctuation">)</span>
Version:   <span class="token number">0.1</span>.0
Target:    local://
Target ID: 6dcb9e6f-5ede-5474-9521-595fadf5c7ce

  YAML file_name
     ↺  Can't <span class="token function">find</span> file: file_name

Test Summary: <span class="token number">0</span> successful, <span class="token number">0</span> failures, <span class="token number">1</span> skipped
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></template>
</CodeTabs>
<p>We need to replace the <code v-pre>file_name</code> above with the location of the <code v-pre>docker-compose.yml</code> file. We also need to change the <code v-pre>setting</code> to grab the tag we want to retrieve. Finally we need to change <code v-pre>value</code> with the actual value as shown in the docker compose file. You can write multiple expectation statements in the describe block.</p>
<div class="language-ruby line-numbers-mode" data-ext="rb"><pre v-pre class="language-ruby"><code>describe yaml<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'/path/to/docker-compose.yml'</span></span><span class="token punctuation">)</span> <span class="token keyword">do</span>
  its<span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string-literal"><span class="token string">'services'</span></span><span class="token punctuation">,</span> <span class="token string-literal"><span class="token string">'workstation'</span></span><span class="token punctuation">,</span> <span class="token string-literal"><span class="token string">'image'</span></span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> should eq <span class="token string-literal"><span class="token string">'learnchef/inspec_workstation'</span></span> <span class="token punctuation">}</span>
  its<span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string-literal"><span class="token string">'services'</span></span><span class="token punctuation">,</span> <span class="token string-literal"><span class="token string">'workstation'</span></span><span class="token punctuation">,</span> <span class="token string-literal"><span class="token string">'volumes'</span></span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> should cmp <span class="token string-literal"><span class="token string">'.:/root'</span></span> <span class="token punctuation">}</span>
<span class="token keyword">end</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Now if we test this control using the following command we should see all the tests pass.</p>
<CodeTabs id="52" :data='[{"id":"Command"},{"id":"Output"}]'>
<template #title0="{ value, isActive }">Command</template>
<template #title1="{ value, isActive }">Output</template>
<template #tab0="{ value, isActive }">
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>inspec <span class="token builtin class-name">exec</span> docker-workstations
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></template>
<template #tab1="{ value, isActive }">
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>Profile:   InSpec Profile <span class="token punctuation">(</span>docker-workstations<span class="token punctuation">)</span>
Version:   <span class="token number">0.1</span>.0
Target:    local://
Target ID: 6dcb9e6f-5ede-5474-9521-595fadf5c7ce

  YAML /workspaces/saf-training-lab-environment/resources/docker-compose.yml
     ✔  <span class="token punctuation">[</span><span class="token string">"services"</span>, <span class="token string">"workstation"</span>, <span class="token string">"image"</span><span class="token punctuation">]</span> is expected to eq <span class="token string">"learnchef/inspec_workstation"</span>
     ✔  <span class="token punctuation">[</span><span class="token string">"services"</span>, <span class="token string">"workstation"</span>, <span class="token string">"volumes"</span><span class="token punctuation">]</span> is expected to <span class="token function">cmp</span> <span class="token operator">==</span> <span class="token string">".:/root"</span>

Test Summary: <span class="token number">2</span> successful, <span class="token number">0</span> failures, <span class="token number">0</span> skipped
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></template>
</CodeTabs>
<div class="hint-container caution">
<p class="hint-container-title">If you received an error above! - Concept Check</p>
<p>If you saw this as your output:</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>Profile:   InSpec Profile <span class="token punctuation">(</span>docker-workstations<span class="token punctuation">)</span>
Version:   <span class="token number">0.1</span>.0
Target:    local://
Target ID: 6dcb9e6f-5ede-5474-9521-595fadf5c7ce

  YAML /path/to/docker-compose.yml
     ↺  Can't <span class="token function">find</span> file: /path/to/docker-compose.yml

Test Summary: <span class="token number">0</span> successful, <span class="token number">0</span> failures, <span class="token number">1</span> skipped
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>It is because you did not give YOUR path to the docker-compose file. You need to replace the path in your <code v-pre>example.rb</code> file to be something like this:</p>
<div class="language-ruby line-numbers-mode" data-ext="rb"><pre v-pre class="language-ruby"><code>describe yaml<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'/workspaces/saf-training-lab-environment/resources/docker-compose.yml'</span></span><span class="token punctuation">)</span> <span class="token keyword">do</span>
  its<span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string-literal"><span class="token string">'services'</span></span><span class="token punctuation">,</span> <span class="token string-literal"><span class="token string">'workstation'</span></span><span class="token punctuation">,</span> <span class="token string-literal"><span class="token string">'image'</span></span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> should eq <span class="token string-literal"><span class="token string">'learnchef/inspec_workstation'</span></span> <span class="token punctuation">}</span>
  its<span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string-literal"><span class="token string">'services'</span></span><span class="token punctuation">,</span> <span class="token string-literal"><span class="token string">'workstation'</span></span><span class="token punctuation">,</span> <span class="token string-literal"><span class="token string">'volumes'</span></span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> should cmp <span class="token string-literal"><span class="token string">'.:/root'</span></span> <span class="token punctuation">}</span>
<span class="token keyword">end</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div>
<h3 id="rewrite-test-to-utilize-a-new-resource" tabindex="-1"><a class="header-anchor" href="#rewrite-test-to-utilize-a-new-resource" aria-hidden="true">#</a> Rewrite test to utilize a new resource</h3>
<p>Going back to the control, we will write it using a resource that doesn't exist called docker-compose-config that is going to take a path as a parameter.</p>
<details class="hint-container details"><summary>Test Driven Development</summary>
<p>Remember the idea of Test Driven Development (TDD), the red-green-clean cycle. This way of development is driven by the tests. In this way, you know when you have succeeded while developing something new! In other words, before writing a solution, first write the test (which will fail - red), so that you know exactly what the expectation should be and when you have achieved it. Then you can write the solution to make the test pass (green). Finally, clean up the solution to make it easy to read and efficient!<br>
<img src="@source/assets/img/TestDrivenDevelopment.png" alt="Test Driven Development" loading="lazy"></p>
</details>
<CodeTabs id="81" :data='[{"id":"Tests"},{"id":"Generic Tests"}]'>
<template #title0="{ value, isActive }">Tests</template>
<template #title1="{ value, isActive }">Generic Tests</template>
<template #tab0="{ value, isActive }">
<div class="language-ruby line-numbers-mode" data-ext="rb"><pre v-pre class="language-ruby"><code>describe yaml<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'/workspaces/saf-training-lab-environment/resources/docker-compose.yml'</span></span><span class="token punctuation">)</span> <span class="token keyword">do</span>
  its<span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string-literal"><span class="token string">'services'</span></span><span class="token punctuation">,</span> <span class="token string-literal"><span class="token string">'workstation'</span></span><span class="token punctuation">,</span> <span class="token string-literal"><span class="token string">'image'</span></span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> should eq <span class="token string-literal"><span class="token string">'learnchef/inspec_workstation'</span></span> <span class="token punctuation">}</span>
  its<span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string-literal"><span class="token string">'services'</span></span><span class="token punctuation">,</span> <span class="token string-literal"><span class="token string">'workstation'</span></span><span class="token punctuation">,</span> <span class="token string-literal"><span class="token string">'volumes'</span></span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> should cmp <span class="token string-literal"><span class="token string">'.:/root'</span></span> <span class="token punctuation">}</span>
<span class="token keyword">end</span>

describe docker_compose_config<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'/workspaces/saf-training-lab-environment/resources/docker-compose.yml'</span></span><span class="token punctuation">)</span> <span class="token keyword">do</span>
  its<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'services.workstation.image'</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span> should eq <span class="token string-literal"><span class="token string">'learnchef/inspec_workstation'</span></span> <span class="token punctuation">}</span>
  its<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'services.workstation.volumes'</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span> should cmp <span class="token string-literal"><span class="token string">'.:/root'</span></span> <span class="token punctuation">}</span>
<span class="token keyword">end</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></template>
<template #tab1="{ value, isActive }">
<div class="language-ruby line-numbers-mode" data-ext="rb"><pre v-pre class="language-ruby"><code>describe yaml<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'/path/to/docker-compose.yml'</span></span><span class="token punctuation">)</span> <span class="token keyword">do</span>
  its<span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string-literal"><span class="token string">'services'</span></span><span class="token punctuation">,</span> <span class="token string-literal"><span class="token string">'workstation'</span></span><span class="token punctuation">,</span> <span class="token string-literal"><span class="token string">'image'</span></span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> should eq <span class="token string-literal"><span class="token string">'learnchef/inspec_workstation'</span></span> <span class="token punctuation">}</span>
  its<span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token string-literal"><span class="token string">'services'</span></span><span class="token punctuation">,</span> <span class="token string-literal"><span class="token string">'workstation'</span></span><span class="token punctuation">,</span> <span class="token string-literal"><span class="token string">'volumes'</span></span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> should cmp <span class="token string-literal"><span class="token string">'.:/root'</span></span> <span class="token punctuation">}</span>
<span class="token keyword">end</span>

describe docker_compose_config<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'/path/to/docker-compose.yml'</span></span><span class="token punctuation">)</span> <span class="token keyword">do</span>
  its<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'services.workstation.image'</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span> should eq <span class="token string-literal"><span class="token string">'learnchef/inspec_workstation'</span></span> <span class="token punctuation">}</span>
  its<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'services.workstation.volumes'</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span> should cmp <span class="token string-literal"><span class="token string">'.:/root'</span></span> <span class="token punctuation">}</span>
<span class="token keyword">end</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></template>
</CodeTabs>
<p>Now we should see an error if we go back to terminal and run the same command to execute a scan. We should get an error saying the <code v-pre>docker_compose_config</code> method does not yet exist. That's because we have not yet defined this resource.</p>
<CodeTabs id="92" :data='[{"id":"Command"},{"id":"Output"}]'>
<template #title0="{ value, isActive }">Command</template>
<template #title1="{ value, isActive }">Output</template>
<template #tab0="{ value, isActive }">
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>inspec <span class="token builtin class-name">exec</span> docker-workstations
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></template>
<template #tab1="{ value, isActive }">
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span><span class="token number">2023</span>-02-22T18:37:03+00:00<span class="token punctuation">]</span> ERROR: Failed to load profile docker-workstations: Failed to load <span class="token builtin class-name">source</span> <span class="token keyword">for</span> controls/example.rb: undefined method <span class="token variable"><span class="token variable">`</span>docker_compose_config' <span class="token keyword">for</span> <span class="token comment">#&lt;Inspec::ControlEvalContext:0x000000000593bb10></span>

Profile:         InSpec Profile <span class="token punctuation">(</span>docker-workstations<span class="token punctuation">)</span>
Version:         <span class="token number">0.1</span>.0
Failure Message: Failed to load <span class="token builtin class-name">source</span> <span class="token keyword">for</span> controls/example.rb: undefined method <span class="token variable">`</span></span>docker_compose_config' <span class="token keyword">for</span> <span class="token comment">#&lt;Inspec::ControlEvalContext:0x000000000593bb10></span>
Target:          local://
Target ID:       6dcb9e6f-5ede-5474-9521-595fadf5c7ce

     No tests executed.

Test Summary: <span class="token number">0</span> successful, <span class="token number">0</span> failures, <span class="token number">0</span> skipped
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></template>
</CodeTabs>
<h3 id="develop-the-docker-resource" tabindex="-1"><a class="header-anchor" href="#develop-the-docker-resource" aria-hidden="true">#</a> Develop the Docker resource</h3>
<p>In the <code v-pre>libraries</code> directory of the profile we will make a <code v-pre>docker_compose_config.rb</code> file, , the content of the file should look like this:</p>
<div class="language-ruby line-numbers-mode" data-ext="rb"><pre v-pre class="language-ruby"><code><span class="token comment"># encoding: utf-8</span>
<span class="token comment"># copyright: 2019, The Authors</span>

<span class="token keyword">class</span> <span class="token class-name">DockerComposeConfig</span> <span class="token operator">&lt;</span> Inspec<span class="token punctuation">.</span>resource<span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>

  name <span class="token string-literal"><span class="token string">'docker_compose_config'</span></span>

<span class="token keyword">end</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="hint-container tip">
<p class="hint-container-title">Using InSpec Init to Create the Resource</p>
<p>Alternatively, you can use <code v-pre>inspec init resource &lt;your-resource-name&gt;</code> to create the template for your custom resource. You may have a &quot;lib&quot; folder or a &quot;libraries&quot; folder. Make sure that InSpec recognizes the location of your custom resource.</p>
<CodeTabs id="111" :data='[{"id":"Command"},{"id":"Options"}]'>
<template #title0="{ value, isActive }">Command</template>
<template #title1="{ value, isActive }">Options</template>
<template #tab0="{ value, isActive }">
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>inspec init resource docker_compose_config <span class="token parameter variable">--overwrite</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></template>
<template #tab1="{ value, isActive }">
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>Enter Subdirectory under <span class="token function">which</span> to create files: ./docker-workstations
Choose File layout, either <span class="token string">'resource-pack'</span> or <span class="token string">'core'</span><span class="token builtin class-name">:</span> Resource Pack
Choose Which <span class="token builtin class-name">type</span> of resource template to use: Basic
Enter the description of this resource: A resource <span class="token keyword">for</span> testing <span class="token function">docker-compose</span> files
Enter Class Name <span class="token keyword">for</span> your resource.: DockerComposeConfig

 ─────────────────────────── InSpec Code Generator ─────────────────────────── 

Creating new resource at /workspaces/saf-training-lab-environment/docker-workstations
 • Creating directory /workspaces/saf-training-lab-environment/docker-workstations/docs
 • Creating <span class="token function">file</span> docs/docker_compose_config.md
 • Creating directory /workspaces/saf-training-lab-environment/docker-workstations/libraries
 • Creating <span class="token function">file</span> libraries/docker_compose_config.rb
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></template>
</CodeTabs>
</div>
<p>Now when we save and run the profile again using:</p>
<CodeTabs id="123" :data='[{"id":"Command"},{"id":"Output"}]'>
<template #title0="{ value, isActive }">Command</template>
<template #title1="{ value, isActive }">Output</template>
<template #tab0="{ value, isActive }">
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>inspec <span class="token builtin class-name">exec</span> docker-workstations
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></template>
<template #tab1="{ value, isActive }">
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span><span class="token number">2023</span>-02-22T18:38:40+00:00<span class="token punctuation">]</span> ERROR: Failed to load profile docker-workstations: Failed to load <span class="token builtin class-name">source</span> <span class="token keyword">for</span> controls/example.rb: wrong number of arguments <span class="token punctuation">(</span>given <span class="token number">1</span>, expected <span class="token number">0</span><span class="token punctuation">)</span>

Profile:         InSpec Profile <span class="token punctuation">(</span>docker-workstations<span class="token punctuation">)</span>
Version:         <span class="token number">0.1</span>.0
Failure Message: Failed to load <span class="token builtin class-name">source</span> <span class="token keyword">for</span> controls/example.rb: wrong number of arguments <span class="token punctuation">(</span>given <span class="token number">1</span>, expected <span class="token number">0</span><span class="token punctuation">)</span>
Target:          local://
Target ID:       6dcb9e6f-5ede-5474-9521-595fadf5c7ce

     No tests executed.

Test Summary: <span class="token number">0</span> successful, <span class="token number">0</span> failures, <span class="token number">0</span> skipped
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></template>
</CodeTabs>
<p>We will get an error saying we gave it the wrong number of arguments: <code v-pre>was given 1 but expected 0</code>. This is because every class in Ruby that has a parameter must have an initialize function to accept that parameter.</p>
<div class="language-ruby line-numbers-mode" data-ext="rb"><pre v-pre class="language-ruby"><code><span class="token comment"># encoding: utf-8</span>
<span class="token comment"># copyright: 2019, The Authors</span>

<span class="token keyword">class</span> <span class="token class-name">DockerComposeConfig</span> <span class="token operator">&lt;</span> Inspec<span class="token punctuation">.</span>resource<span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>

  name <span class="token string-literal"><span class="token string">'docker_compose_config'</span></span>

  <span class="token keyword">def</span> <span class="token method-definition"><span class="token function">initialize</span></span><span class="token punctuation">(</span>path<span class="token punctuation">)</span>
    <span class="token variable">@path</span> <span class="token operator">=</span> path
  <span class="token keyword">end</span>

<span class="token keyword">end</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Now let's run the profile once more.</p>
<CodeTabs id="138" :data='[{"id":"Command"},{"id":"Output"}]'>
<template #title0="{ value, isActive }">Command</template>
<template #title1="{ value, isActive }">Output</template>
<template #tab0="{ value, isActive }">
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>inspec <span class="token builtin class-name">exec</span> docker-workstations
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></template>
<template #tab1="{ value, isActive }">
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>Profile:   InSpec Profile <span class="token punctuation">(</span>docker-workstations<span class="token punctuation">)</span>
Version:   <span class="token number">0.1</span>.0
Target:    local://
Target ID: 6dcb9e6f-5ede-5474-9521-595fadf5c7ce

  YAML /workspaces/saf-training-lab-environment/resources/docker-compose.yml
     ✔  <span class="token punctuation">[</span><span class="token string">"services"</span>, <span class="token string">"workstation"</span>, <span class="token string">"image"</span><span class="token punctuation">]</span> is expected to eq <span class="token string">"learnchef/inspec_workstation"</span>
     ✔  <span class="token punctuation">[</span><span class="token string">"services"</span>, <span class="token string">"workstation"</span>, <span class="token string">"volumes"</span><span class="token punctuation">]</span> is expected to <span class="token function">cmp</span> <span class="token operator">==</span> <span class="token string">".:/root"</span>
  docker_compose_config
     ×  services.workstation.image 
     undefined method <span class="token variable"><span class="token variable">`</span>services' <span class="token keyword">for</span> <span class="token comment">#&lt;#&lt;Class:0x00000000050205a8>:0x00000000032cbbd8></span>
     ×  services.workstation.volumes 
     undefined method <span class="token variable">`</span></span>services' <span class="token keyword">for</span> <span class="token comment">#&lt;#&lt;Class:0x00000000050205a8>:0x00000000032cbbd8></span>

Test Summary: <span class="token number">2</span> successful, <span class="token number">2</span> failures, <span class="token number">0</span> skipped
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></template>
</CodeTabs>
<p>This time the profile runs, but we get a message that the <code v-pre>docker_compose_config</code> resource does not have the <code v-pre>services</code> method. So let's define that method now:</p>
<div class="language-ruby line-numbers-mode" data-ext="rb"><pre v-pre class="language-ruby"><code><span class="token comment"># encoding: utf-8</span>
<span class="token comment"># copyright: 2019, The Authors</span>

<span class="token keyword">class</span> <span class="token class-name">DockerComposeConfig</span> <span class="token operator">&lt;</span> Inspec<span class="token punctuation">.</span>resource<span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>

  name <span class="token string-literal"><span class="token string">'docker_compose_config'</span></span>

  <span class="token keyword">def</span> <span class="token method-definition"><span class="token function">initialize</span></span><span class="token punctuation">(</span>path<span class="token punctuation">)</span>
    <span class="token variable">@path</span> <span class="token operator">=</span> path
  <span class="token keyword">end</span>

  <span class="token keyword">def</span> <span class="token method-definition"><span class="token function">services</span></span>

  <span class="token keyword">end</span>

<span class="token keyword">end</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Start by just defining the <code v-pre>services</code> method. Then, let's run the profile once more.</p>
<CodeTabs id="153" :data='[{"id":"Command"},{"id":"Output"}]'>
<template #title0="{ value, isActive }">Command</template>
<template #title1="{ value, isActive }">Output</template>
<template #tab0="{ value, isActive }">
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>inspec <span class="token builtin class-name">exec</span> docker-workstations
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></template>
<template #tab1="{ value, isActive }">
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>Profile:   InSpec Profile <span class="token punctuation">(</span>docker-workstations<span class="token punctuation">)</span>
Version:   <span class="token number">0.1</span>.0
Target:    local://
Target ID: 6dcb9e6f-5ede-5474-9521-595fadf5c7ce

  YAML /workspaces/saf-training-lab-environment/resources/docker-compose.yml
     ✔  <span class="token punctuation">[</span><span class="token string">"services"</span>, <span class="token string">"workstation"</span>, <span class="token string">"image"</span><span class="token punctuation">]</span> is expected to eq <span class="token string">"learnchef/inspec_workstation"</span>
     ✔  <span class="token punctuation">[</span><span class="token string">"services"</span>, <span class="token string">"workstation"</span>, <span class="token string">"volumes"</span><span class="token punctuation">]</span> is expected to <span class="token function">cmp</span> <span class="token operator">==</span> <span class="token string">".:/root"</span>
  docker_compose_config
     ×  services.workstation.image 
     undefined method <span class="token variable"><span class="token variable">`</span>workstation' <span class="token keyword">for</span> nil:NilClass
     ×  services.workstation.volumes 
     undefined method <span class="token variable">`</span></span>workstation' <span class="token keyword">for</span> nil:NilClass

Test Summary: <span class="token number">2</span> successful, <span class="token number">2</span> failures, <span class="token number">0</span> skipped
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></template>
</CodeTabs>
<p>Now we got a different failure that tells us a <code v-pre>nil</code> value was returned. So now we will go ahead and define the services method. We will use an already existing InSpec resource to parse the path file.</p>
<div class="language-ruby line-numbers-mode" data-ext="rb"><pre v-pre class="language-ruby"><code><span class="token comment"># encoding: utf-8</span>
<span class="token comment"># copyright: 2019, The Authors</span>

<span class="token keyword">class</span> <span class="token class-name">DockerComposeConfig</span> <span class="token operator">&lt;</span> Inspec<span class="token punctuation">.</span>resource<span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>

  name <span class="token string-literal"><span class="token string">'docker_compose_config'</span></span>

  <span class="token keyword">def</span> <span class="token method-definition"><span class="token function">initialize</span></span><span class="token punctuation">(</span>path<span class="token punctuation">)</span>
    <span class="token variable">@path</span> <span class="token operator">=</span> path
    <span class="token variable">@yaml</span> <span class="token operator">=</span> inspec<span class="token punctuation">.</span>yaml<span class="token punctuation">(</span>path<span class="token punctuation">)</span>
  <span class="token keyword">end</span>

  <span class="token keyword">def</span> <span class="token method-definition"><span class="token function">services</span></span>
    <span class="token variable">@yaml</span><span class="token punctuation">[</span><span class="token string-literal"><span class="token string">'services'</span></span><span class="token punctuation">]</span>
  <span class="token keyword">end</span>

<span class="token keyword">end</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Now let's run the profile once more.</p>
<CodeTabs id="168" :data='[{"id":"Command"},{"id":"Output"}]'>
<template #title0="{ value, isActive }">Command</template>
<template #title1="{ value, isActive }">Output</template>
<template #tab0="{ value, isActive }">
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>inspec <span class="token builtin class-name">exec</span> docker-workstations
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></template>
<template #tab1="{ value, isActive }">
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>Profile:   InSpec Profile <span class="token punctuation">(</span>docker-workstations<span class="token punctuation">)</span>
Version:   <span class="token number">0.1</span>.0
Target:    local://
Target ID: 6dcb9e6f-5ede-5474-9521-595fadf5c7ce

  YAML /workspaces/saf-training-lab-environment/resources/docker-compose.yml
     ✔  <span class="token punctuation">[</span><span class="token string">"services"</span>, <span class="token string">"workstation"</span>, <span class="token string">"image"</span><span class="token punctuation">]</span> is expected to eq <span class="token string">"learnchef/inspec_workstation"</span>
     ✔  <span class="token punctuation">[</span><span class="token string">"services"</span>, <span class="token string">"workstation"</span>, <span class="token string">"volumes"</span><span class="token punctuation">]</span> is expected to <span class="token function">cmp</span> <span class="token operator">==</span> <span class="token string">".:/root"</span>
  docker_compose_config
     ×  services.workstation.image 
     undefined method <span class="token variable"><span class="token variable">`</span>workstation' <span class="token keyword">for</span> <span class="token operator">&lt;</span>Hash:0x0000000003abada<span class="token operator"><span class="token file-descriptor important">8</span>></span>
     ×  services.workstation.volumes 
     undefined method <span class="token variable">`</span></span>workstation' <span class="token keyword">for</span> <span class="token operator">&lt;</span>Hash:0x0000000003abada<span class="token operator"><span class="token file-descriptor important">8</span>></span>

Test Summary: <span class="token number">2</span> successful, <span class="token number">2</span> failures, <span class="token number">0</span> skipped
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></template>
</CodeTabs>
<p>You will notice that it parses correctly, but instead of our result we end up getting a hash. We need to convert the hash into an object that appears like other objects so that we may use our dot notation. So we will wrap our hash in a Ruby class called a <code v-pre>Hashie::Mash</code>. This gives us a quick way to convert a hash into a Ruby object with a number of methods attached to it. You will have to import the Hashie library by running <code v-pre>gem install hashie</code> and import it in the resource file to be used. It and is written as follows:</p>
<div class="language-ruby line-numbers-mode" data-ext="rb"><pre v-pre class="language-ruby"><code><span class="token comment"># encoding: utf-8</span>
<span class="token comment"># copyright: 2019, The Authors</span>

<span class="token keyword">require</span> <span class="token string-literal"><span class="token string">"hashie/mash"</span></span>

<span class="token keyword">class</span> <span class="token class-name">DockerComposeConfig</span> <span class="token operator">&lt;</span> Inspec<span class="token punctuation">.</span>resource<span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>

  name <span class="token string-literal"><span class="token string">'docker_compose_config'</span></span>

  <span class="token keyword">def</span> <span class="token method-definition"><span class="token function">initialize</span></span><span class="token punctuation">(</span>path<span class="token punctuation">)</span>
    <span class="token variable">@path</span> <span class="token operator">=</span> path
    <span class="token variable">@yaml</span> <span class="token operator">=</span> inspec<span class="token punctuation">.</span>yaml<span class="token punctuation">(</span>path<span class="token punctuation">)</span>
  <span class="token keyword">end</span>

  <span class="token keyword">def</span> <span class="token method-definition"><span class="token function">services</span></span>
    Hashie<span class="token double-colon punctuation">::</span><span class="token class-name">Mash</span><span class="token punctuation">.</span><span class="token keyword">new</span><span class="token punctuation">(</span><span class="token variable">@yaml</span><span class="token punctuation">[</span><span class="token string-literal"><span class="token string">'services'</span></span><span class="token punctuation">]</span><span class="token punctuation">)</span>
  <span class="token keyword">end</span>

<span class="token keyword">end</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Lets run the profile again.</p>
<CodeTabs id="183" :data='[{"id":"Command"},{"id":"Output"}]'>
<template #title0="{ value, isActive }">Command</template>
<template #title1="{ value, isActive }">Output</template>
<template #tab0="{ value, isActive }">
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>inspec <span class="token builtin class-name">exec</span> docker-workstations
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></template>
<template #tab1="{ value, isActive }">
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>Profile:   InSpec Profile <span class="token punctuation">(</span>docker-workstations<span class="token punctuation">)</span>
Version:   <span class="token number">0.1</span>.0
Target:    local://
Target ID: 6dcb9e6f-5ede-5474-9521-595fadf5c7ce

  YAML /workspaces/saf-training-lab-environment/resources/docker-compose.yml
     ✔  <span class="token punctuation">[</span><span class="token string">"services"</span>, <span class="token string">"workstation"</span>, <span class="token string">"image"</span><span class="token punctuation">]</span> is expected to eq <span class="token string">"learnchef/inspec_workstation"</span>
     ✔  <span class="token punctuation">[</span><span class="token string">"services"</span>, <span class="token string">"workstation"</span>, <span class="token string">"volumes"</span><span class="token punctuation">]</span> is expected to <span class="token function">cmp</span> <span class="token operator">==</span> <span class="token string">".:/root"</span>
  docker_compose_config
     ✔  services.workstation.image is expected to eq <span class="token string">"learnchef/inspec_workstation"</span>
     ✔  services.workstation.volumes is expected to <span class="token function">cmp</span> <span class="token operator">==</span> <span class="token string">".:/root"</span>

Test Summary: <span class="token number">4</span> successful, <span class="token number">0</span> failures, <span class="token number">0</span> skipped
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></template>
</CodeTabs>
<p>Everything passed!</p>
<div class="hint-container info">
<p class="hint-container-title">Check your work</p>
<p>Check your work with the InSpec video below that walks through this docker resource example!</p>
</div>
<div class="video-container">
  <iframe width="1462" height="762" src="https://www.youtube.com/embed/9rbb2RWa9Oo?list=PLSZbtIlMt5rcbXOpMRucKzRMXR7HX7awy" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>
</div></template>



<style>
.video-container {
    position: relative;
    padding-bottom: 56.25%; /* 16:9 */
    height: 0;
}
.video-container iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}
</style>