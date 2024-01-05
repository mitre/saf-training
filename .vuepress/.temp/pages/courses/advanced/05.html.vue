<template><div><p>Let's practice creating our own custom resource. Let's say we want to write tests that examine the current state of a local Git repository. We want to create a <code v-pre>git</code> resource to handle all of InSpec's interactions with the Git repo under the hood, so that we can focus on writing clean and easy-to-read profile code.</p>
<p>Let's take a look at this InSpec video that walks through this example and then try it out ourselves.</p>
<div class="video-container">
  <iframe width="1028" height="578" src="https://www.youtube.com/embed/Xka2xT6Cngg?list=PLSZbtIlMt5rcbXOpMRucKzRMXR7HX7awy" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>
<h3 id="create-new-inspec-profile" tabindex="-1"><a class="header-anchor" href="#create-new-inspec-profile" aria-hidden="true">#</a> Create new InSpec profile</h3>
<p>Let's start by creating a new profile:</p>
<CodeTabs id="14" :data='[{"id":"Command"},{"id":"Output"}]'>
<template #title0="{ value, isActive }">Command</template>
<template #title1="{ value, isActive }">Output</template>
<template #tab0="{ value, isActive }">
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>inspec init profile <span class="token function">git</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></template>
<template #tab1="{ value, isActive }">
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code> ─────────────────────────── InSpec Code Generator ─────────────────────────── 

Creating new profile at /workspaces/saf-training-lab-environment/git
 • Creating <span class="token function">file</span> inspec.yml
 • Creating directory /workspaces/saf-training-lab-environment/git/controls
 • Creating <span class="token function">file</span> controls/example.rb
 • Creating <span class="token function">file</span> README.md
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></template>
</CodeTabs>
<h3 id="develop-controls-to-test-run-profile" tabindex="-1"><a class="header-anchor" href="#develop-controls-to-test-run-profile" aria-hidden="true">#</a> Develop controls to test / run profile</h3>
<p>To write tests, we first need to know and have what we are testing! In your Codespaces environment, there is a git repository that we will test under the <code v-pre>resources</code> folder. The git repository will be the test target, similarly to how the docker containers acted as test targets in previous sections. Unzip the target git repository using the following command:</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">unzip</span> ./resources/git_test.zip 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>This will generate a <code v-pre>git_test</code> repository which we will use for these examples.</p>
<p>Now let's write some controls and test that they run. You can put these controls in the <code v-pre>example.rb</code> file generated in the <code v-pre>controls</code> folder of your <code v-pre>git</code> InSpec profile. These controls are written using the <code v-pre>command</code> resource which is provided by InSpec. We will write a <code v-pre>git</code> resource in this section to improve this test. <strong>Note that you will need to put the full directory path of the <code v-pre>.git</code> file from your <code v-pre>git_test</code> repository as the <code v-pre>git_dir</code> value on line 4 of <code v-pre>example.rb</code>. To get the full path of your current location in the terminal, use <code v-pre>pwd</code>.</strong></p>
<div class="language-ruby line-numbers-mode" data-ext="rb"><pre v-pre class="language-ruby"><code><span class="token comment"># encoding: utf-8</span>
<span class="token comment"># copyright: 2018, The Authors</span>

git_dir <span class="token operator">=</span> <span class="token string-literal"><span class="token string">"/workspaces/saf-training-lab-environment/git_test/.git"</span></span>

<span class="token comment"># The following banches should exist</span>
describe command<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">"git --git-dir </span><span class="token interpolation"><span class="token delimiter punctuation">#{</span><span class="token content">git_dir</span><span class="token delimiter punctuation">}</span></span><span class="token string"> branch"</span></span><span class="token punctuation">)</span> <span class="token keyword">do</span>
  its<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'stdout'</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span> should match <span class="token regex-literal"><span class="token regex">/master/</span></span> <span class="token punctuation">}</span>
<span class="token keyword">end</span>

describe command<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">"git --git-dir </span><span class="token interpolation"><span class="token delimiter punctuation">#{</span><span class="token content">git_dir</span><span class="token delimiter punctuation">}</span></span><span class="token string"> branch"</span></span><span class="token punctuation">)</span> <span class="token keyword">do</span>
  its<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'stdout'</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span> should match <span class="token regex-literal"><span class="token regex">/testBranch/</span></span> <span class="token punctuation">}</span>
<span class="token keyword">end</span>

<span class="token comment"># What is the current branch</span>
describe command<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">"git --git-dir </span><span class="token interpolation"><span class="token delimiter punctuation">#{</span><span class="token content">git_dir</span><span class="token delimiter punctuation">}</span></span><span class="token string"> branch"</span></span><span class="token punctuation">)</span> <span class="token keyword">do</span>
  its<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'stdout'</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span> should match <span class="token regex-literal"><span class="token regex">/^\* master/</span></span> <span class="token punctuation">}</span>
<span class="token keyword">end</span>

<span class="token comment"># What is the latest commit</span>
describe command<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">"git --git-dir </span><span class="token interpolation"><span class="token delimiter punctuation">#{</span><span class="token content">git_dir</span><span class="token delimiter punctuation">}</span></span><span class="token string"> log -1 --pretty=format:'%h'"</span></span><span class="token punctuation">)</span> <span class="token keyword">do</span>
  its<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'stdout'</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span> should match <span class="token regex-literal"><span class="token regex">/edc207f/</span></span> <span class="token punctuation">}</span>
<span class="token keyword">end</span>

<span class="token comment"># What is the second to last commit</span>
describe command<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">"git --git-dir </span><span class="token interpolation"><span class="token delimiter punctuation">#{</span><span class="token content">git_dir</span><span class="token delimiter punctuation">}</span></span><span class="token string"> log --skip=1 -1 --pretty=format:'%h'"</span></span><span class="token punctuation">)</span> <span class="token keyword">do</span>
  its<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'stdout'</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span> should match <span class="token regex-literal"><span class="token regex">/8c30bff/</span></span> <span class="token punctuation">}</span>
<span class="token keyword">end</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><CodeTabs id="36" :data='[{"id":"Command"},{"id":"Output"}]'>
<template #title0="{ value, isActive }">Command</template>
<template #title1="{ value, isActive }">Output</template>
<template #tab0="{ value, isActive }">
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>inspec <span class="token builtin class-name">exec</span> <span class="token function">git</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></template>
<template #tab1="{ value, isActive }">
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>Profile:   InSpec Profile <span class="token punctuation">(</span>git<span class="token punctuation">)</span>
Version:   <span class="token number">0.1</span>.0
Target:    local://
Target ID: 6dcb9e6f-5ede-5474-9521-595fadf5c7ce

  Command: <span class="token variable"><span class="token variable">`</span><span class="token function">git</span> --git-dir /workspaces/saf-training-lab-environment/git_test/.git branch<span class="token variable">`</span></span>
     ✔  stdout is expected to match /master/
  Command: <span class="token variable"><span class="token variable">`</span><span class="token function">git</span> --git-dir /workspaces/saf-training-lab-environment/git_test/.git branch<span class="token variable">`</span></span>
     ✔  stdout is expected to match /testBranch/
  Command: <span class="token variable"><span class="token variable">`</span><span class="token function">git</span> --git-dir /workspaces/saf-training-lab-environment/git_test/.git branch<span class="token variable">`</span></span>
     ✔  stdout is expected to match /^<span class="token punctuation">\</span>* master/
  Command: <span class="token variable"><span class="token variable">`</span><span class="token function">git</span> --git-dir /workspaces/saf-training-lab-environment/git_test/.git log <span class="token parameter variable">-1</span> <span class="token parameter variable">--pretty</span><span class="token operator">=</span>format:<span class="token string">'%h'</span><span class="token variable">`</span></span>
     ✔  stdout is expected to match /edc207f/
  Command: <span class="token variable"><span class="token variable">`</span><span class="token function">git</span> --git-dir /workspaces/saf-training-lab-environment/git_test/.git log <span class="token parameter variable">--skip</span><span class="token operator">=</span><span class="token number">1</span> <span class="token parameter variable">-1</span> <span class="token parameter variable">--pretty</span><span class="token operator">=</span>format:<span class="token string">'%h'</span><span class="token variable">`</span></span>
     ✔  stdout is expected to match /8c30bff/

Test Summary: <span class="token number">5</span> successful, <span class="token number">0</span> failures, <span class="token number">0</span> skipped
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></template>
</CodeTabs>
<p>Our tests pass, but they all use the <code v-pre>command</code> resource. It's not best practice to do this -- for one thing, it makes our tests more complicated, and the output too long.</p>
<div class="hint-container warning">
<p class="hint-container-title">But What If I Don't Care About The Tests Being Complicated And The Output Being Too Long?</p>
<p>Some test writers like to wrap their favorite bash commands in a <code v-pre>command</code> block and call it a day.<br>
However, best practice is to write clean and maintainable InSpec code even if you yourself have no trouble using the <code v-pre>command</code> resource to do everything.</p>
<p>Recall that other developers and assessors need to be able to understand how your tests function. Nobody likes trying to debug someone else's profile that assumes that the operator knows exactly how the profile writer's favorite terminal commands work.</p>
</div>
<p>Let's rewrite these tests in a way that abstracts away the complexity of working with the <code v-pre>git</code> command into a resource.</p>
<h3 id="rewrite-test" tabindex="-1"><a class="header-anchor" href="#rewrite-test" aria-hidden="true">#</a> Rewrite test</h3>
<p>Let's rewrite the first test in our example file to make it more readable with a <code v-pre>git</code> resource as follows:</p>
<div class="language-ruby line-numbers-mode" data-ext="rb"><pre v-pre class="language-ruby"><code><span class="token comment"># The following banches should exist</span>
describe git<span class="token punctuation">(</span>git_dir<span class="token punctuation">)</span> <span class="token keyword">do</span>
  its<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'branches'</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span> should <span class="token keyword">include</span> <span class="token string-literal"><span class="token string">'master'</span></span> <span class="token punctuation">}</span>
<span class="token keyword">end</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Now let's run the profile.</p>
<CodeTabs id="71" :data='[{"id":"Command"},{"id":"Output"}]'>
<template #title0="{ value, isActive }">Command</template>
<template #title1="{ value, isActive }">Output</template>
<template #tab0="{ value, isActive }">
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>inspec <span class="token builtin class-name">exec</span> <span class="token function">git</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></template>
<template #tab1="{ value, isActive }">
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span><span class="token number">2023</span>-02-22T03:21:41+00:00<span class="token punctuation">]</span> ERROR: Failed to load profile git: Failed to load <span class="token builtin class-name">source</span> <span class="token keyword">for</span> controls/example.rb: undefined method <span class="token variable"><span class="token variable">`</span>git' <span class="token keyword">for</span> <span class="token comment">#&lt;Inspec::ControlEvalContext:0x000000000540af38></span>

Profile:         InSpec Profile <span class="token punctuation">(</span>git<span class="token punctuation">)</span>
Version:         <span class="token number">0.1</span>.0
Failure Message: Failed to load <span class="token builtin class-name">source</span> <span class="token keyword">for</span> controls/example.rb: undefined method <span class="token variable">`</span></span>git' <span class="token keyword">for</span> <span class="token comment">#&lt;Inspec::ControlEvalContext:0x000000000540af38></span>
Target:          local://
Target ID:       6dcb9e6f-5ede-5474-9521-595fadf5c7ce

     No tests executed.

Test Summary: <span class="token number">0</span> successful, <span class="token number">0</span> failures, <span class="token number">0</span> skipped
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></template>
</CodeTabs>
<p>We should get an error because the git method and resource are not defined yet. We should fix that.</p>
<h3 id="develop-the-git-resource" tabindex="-1"><a class="header-anchor" href="#develop-the-git-resource" aria-hidden="true">#</a> Develop the git resource</h3>
<p>Let's start by creating a new file called <code v-pre>git.rb</code> in the <code v-pre>libraries</code> directory. If you do not already have a <code v-pre>libraries</code> directory, you can make one in the <code v-pre>git</code> InSpec profile directory. The content of the file should look like this:</p>
<div class="language-ruby line-numbers-mode" data-ext="rb"><pre v-pre class="language-ruby"><code><span class="token comment"># encoding: utf-8</span>
<span class="token comment"># copyright: 2019, The Authors</span>

<span class="token keyword">class</span> <span class="token class-name">Git</span> <span class="token operator">&lt;</span> Inspec<span class="token punctuation">.</span>resource<span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
    name <span class="token string-literal"><span class="token string">'git'</span></span>

<span class="token keyword">end</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="hint-container tip">
<p class="hint-container-title">Setting Up a Resource Using InSpec Init</p>
<p>Instead of just creating the <code v-pre>git.rb</code> file in the <code v-pre>libraries</code> directory, you can use InSpec to assist you in creating a resource. Run <code v-pre>inspec init resource &lt;your-resource-name&gt;</code> and follow the prompts to create the foundation and see examples for a resource.</p>
</div>
<p>Now run the profile again.</p>
<CodeTabs id="97" :data='[{"id":"Command"},{"id":"Output"}]'>
<template #title0="{ value, isActive }">Command</template>
<template #title1="{ value, isActive }">Output</template>
<template #tab0="{ value, isActive }">
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>inspec <span class="token builtin class-name">exec</span> <span class="token function">git</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></template>
<template #tab1="{ value, isActive }">
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span><span class="token number">2023</span>-02-22T03:25:57+00:00<span class="token punctuation">]</span> ERROR: Failed to load profile git: Failed to load <span class="token builtin class-name">source</span> <span class="token keyword">for</span> controls/example.rb: wrong number of arguments <span class="token punctuation">(</span>given <span class="token number">1</span>, expected <span class="token number">0</span><span class="token punctuation">)</span>

Profile:         InSpec Profile <span class="token punctuation">(</span>git<span class="token punctuation">)</span>
Version:         <span class="token number">0.1</span>.0
Failure Message: Failed to load <span class="token builtin class-name">source</span> <span class="token keyword">for</span> controls/example.rb: wrong number of arguments <span class="token punctuation">(</span>given <span class="token number">1</span>, expected <span class="token number">0</span><span class="token punctuation">)</span>
Target:          local://
Target ID:       6dcb9e6f-5ede-5474-9521-595fadf5c7ce

     No tests executed.

Test Summary: <span class="token number">0</span> successful, <span class="token number">0</span> failures, <span class="token number">0</span> skipped
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></template>
</CodeTabs>
<p>This time we get another error letting us know that we have a resource that has been given the incorrect number of arguments. This means we have given an additional parameter to this resource that we have not yet accepted.</p>
<p>Each resource will require an initialization method.</p>
<p>For our git.rb file let's add that initialization method:</p>
<div class="language-ruby line-numbers-mode" data-ext="rb"><pre v-pre class="language-ruby"><code><span class="token comment"># encoding: utf-8</span>
<span class="token comment"># copyright: 2019, The Authors</span>

<span class="token keyword">class</span> <span class="token class-name">Git</span> <span class="token operator">&lt;</span> Inspec<span class="token punctuation">.</span>resource<span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
    name <span class="token string-literal"><span class="token string">'git'</span></span>

    <span class="token keyword">def</span> <span class="token method-definition"><span class="token function">initialize</span></span><span class="token punctuation">(</span>path<span class="token punctuation">)</span>
        <span class="token variable">@path</span> <span class="token operator">=</span> path
    <span class="token keyword">end</span>

<span class="token keyword">end</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>This is saving the path we are passing in from the control into an instance method called <code v-pre>path</code>.</p>
<p>Now when we run the profile.</p>
<CodeTabs id="121" :data='[{"id":"Command"},{"id":"Output"}]'>
<template #title0="{ value, isActive }">Command</template>
<template #title1="{ value, isActive }">Output</template>
<template #tab0="{ value, isActive }">
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>inspec <span class="token builtin class-name">exec</span> <span class="token function">git</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></template>
<template #tab1="{ value, isActive }">
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>Profile:   InSpec Profile <span class="token punctuation">(</span>git<span class="token punctuation">)</span>
Version:   <span class="token number">0.1</span>.0
Target:    local://
Target ID: 6dcb9e6f-5ede-5474-9521-595fadf5c7ce

  <span class="token function">git</span>
     ×  branches 
     undefined method <span class="token variable"><span class="token variable">`</span>branches' <span class="token keyword">for</span> <span class="token comment">#&lt;#&lt;Class:0x00000000041485a8>:0x00000000043620c8></span>
  Command: <span class="token variable">`</span></span><span class="token function">git</span> --git-dir /workspaces/saf-training-lab-environment/git_test/.git branch<span class="token variable"><span class="token variable">`</span>
     ✔  stdout is expected to match /testBranch/
  Command: <span class="token variable">`</span></span><span class="token function">git</span> --git-dir /workspaces/saf-training-lab-environment/git_test/.git branch<span class="token variable"><span class="token variable">`</span>
     ✔  stdout is expected to match /^<span class="token punctuation">\</span>* master/
  Command: <span class="token variable">`</span></span><span class="token function">git</span> --git-dir /workspaces/saf-training-lab-environment/git_test/.git log <span class="token parameter variable">-1</span> <span class="token parameter variable">--pretty</span><span class="token operator">=</span>format:<span class="token string">'%h'</span><span class="token variable"><span class="token variable">`</span>
     ✔  stdout is expected to match /edc207f/
  Command: <span class="token variable">`</span></span><span class="token function">git</span> --git-dir /workspaces/saf-training-lab-environment/git_test/.git log <span class="token parameter variable">--skip</span><span class="token operator">=</span><span class="token number">1</span> <span class="token parameter variable">-1</span> <span class="token parameter variable">--pretty</span><span class="token operator">=</span>format:<span class="token string">'%h'</span>`
     ✔  stdout is expected to match /8c30bff/

Test Summary: <span class="token number">4</span> successful, <span class="token number">1</span> failure, <span class="token number">0</span> skipped
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></template>
</CodeTabs>
<p>The test will run but we will get an error saying we do not have a <code v-pre>branches</code> method. Remember that the other 4 tests are still passing because they are not yet using the <code v-pre>git</code> resource, but are still relying on InSpec's <code v-pre>command</code> resource.</p>
<p>Let's go back to our git.rb file to fix that by adding a <code v-pre>branches</code> method:</p>
<div class="language-ruby line-numbers-mode" data-ext="rb"><pre v-pre class="language-ruby"><code><span class="token comment"># encoding: utf-8</span>
<span class="token comment"># copyright: 2019, The Authors</span>

<span class="token keyword">class</span> <span class="token class-name">Git</span> <span class="token operator">&lt;</span> Inspec<span class="token punctuation">.</span>resource<span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
    name <span class="token string-literal"><span class="token string">'git'</span></span>

    <span class="token keyword">def</span> <span class="token method-definition"><span class="token function">initialize</span></span><span class="token punctuation">(</span>path<span class="token punctuation">)</span>
        <span class="token variable">@path</span> <span class="token operator">=</span> path
    <span class="token keyword">end</span>

    <span class="token keyword">def</span> <span class="token method-definition"><span class="token function">branches</span></span>

    <span class="token keyword">end</span>

<span class="token keyword">end</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>We have now defined the branches method. Let's see what the test output shows us.</p>
<CodeTabs id="139" :data='[{"id":"Command"},{"id":"Output"}]'>
<template #title0="{ value, isActive }">Command</template>
<template #title1="{ value, isActive }">Output</template>
<template #tab0="{ value, isActive }">
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>inspec <span class="token builtin class-name">exec</span> <span class="token function">git</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></template>
<template #tab1="{ value, isActive }">
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>Profile:   InSpec Profile <span class="token punctuation">(</span>git<span class="token punctuation">)</span>
Version:   <span class="token number">0.1</span>.0
Target:    local://
Target ID: 6dcb9e6f-5ede-5474-9521-595fadf5c7ce

  <span class="token function">git</span>
     ×  branches is expected to include <span class="token string">"master"</span>
     expected nil to include <span class="token string">"master"</span>, but it does not respond to <span class="token variable"><span class="token variable">`</span>include?<span class="token variable">`</span></span>
  Command: <span class="token variable"><span class="token variable">`</span><span class="token function">git</span> --git-dir /workspaces/saf-training-lab-environment/git_test/.git branch<span class="token variable">`</span></span>
     ✔  stdout is expected to match /testBranch/
  Command: <span class="token variable"><span class="token variable">`</span><span class="token function">git</span> --git-dir /workspaces/saf-training-lab-environment/git_test/.git branch<span class="token variable">`</span></span>
     ✔  stdout is expected to match /^<span class="token punctuation">\</span>* master/
  Command: <span class="token variable"><span class="token variable">`</span><span class="token function">git</span> --git-dir /workspaces/saf-training-lab-environment/git_test/.git log <span class="token parameter variable">-1</span> <span class="token parameter variable">--pretty</span><span class="token operator">=</span>format:<span class="token string">'%h'</span><span class="token variable">`</span></span>
     ✔  stdout is expected to match /edc207f/
  Command: <span class="token variable"><span class="token variable">`</span><span class="token function">git</span> --git-dir /workspaces/saf-training-lab-environment/git_test/.git log <span class="token parameter variable">--skip</span><span class="token operator">=</span><span class="token number">1</span> <span class="token parameter variable">-1</span> <span class="token parameter variable">--pretty</span><span class="token operator">=</span>format:<span class="token string">'%h'</span><span class="token variable">`</span></span>
     ✔  stdout is expected to match /8c30bff/

Test Summary: <span class="token number">4</span> successful, <span class="token number">1</span> failure, <span class="token number">0</span> skipped
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></template>
</CodeTabs>
<p>Now the error message says that the <code v-pre>branches</code> method is returning a null value when it's expecting an array or something that is able to accept the include method invoked on it.</p>
<p>We can use the InSpec helper method which enables you to invoke any other inspec resource as seen below:</p>
<div class="language-ruby line-numbers-mode" data-ext="rb"><pre v-pre class="language-ruby"><code><span class="token comment"># encoding: utf-8</span>
<span class="token comment"># copyright: 2019, The Authors</span>

<span class="token keyword">class</span> <span class="token class-name">Git</span> <span class="token operator">&lt;</span> Inspec<span class="token punctuation">.</span>resource<span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
    name <span class="token string-literal"><span class="token string">'git'</span></span>

    <span class="token keyword">def</span> <span class="token method-definition"><span class="token function">initialize</span></span><span class="token punctuation">(</span>path<span class="token punctuation">)</span>
        <span class="token variable">@path</span> <span class="token operator">=</span> path
    <span class="token keyword">end</span>

    <span class="token keyword">def</span> <span class="token method-definition"><span class="token function">branches</span></span>
        inspec<span class="token punctuation">.</span>command<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">"git --git-dir </span><span class="token interpolation"><span class="token delimiter punctuation">#{</span><span class="token content"><span class="token variable">@path</span></span><span class="token delimiter punctuation">}</span></span><span class="token string"> branch"</span></span><span class="token punctuation">)</span><span class="token punctuation">.</span>stdout
    <span class="token keyword">end</span>

<span class="token keyword">end</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>We have borrowed the built-in <code v-pre>command</code> resource to handle running Git's CLI commands.</p>
<p>Now we see that we get a passing test!</p>
<p>Now let's adjust our test to also check for our second branch that we created earlier as well as check our current branch:</p>
<div class="language-ruby line-numbers-mode" data-ext="rb"><pre v-pre class="language-ruby"><code><span class="token comment"># The following banches should exist</span>
describe git<span class="token punctuation">(</span>git_dir<span class="token punctuation">)</span> <span class="token keyword">do</span>
  its<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'branches'</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span> should <span class="token keyword">include</span> <span class="token string-literal"><span class="token string">'master'</span></span> <span class="token punctuation">}</span>
  its<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'branches'</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span> should <span class="token keyword">include</span> <span class="token string-literal"><span class="token string">'testBranch'</span></span> <span class="token punctuation">}</span>
  its<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'current_branch'</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span> should cmp <span class="token string-literal"><span class="token string">'master'</span></span> <span class="token punctuation">}</span>
<span class="token keyword">end</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><CodeTabs id="164" :data='[{"id":"Command"},{"id":"Output"}]'>
<template #title0="{ value, isActive }">Command</template>
<template #title1="{ value, isActive }">Output</template>
<template #tab0="{ value, isActive }">
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>inspec <span class="token builtin class-name">exec</span> <span class="token function">git</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></template>
<template #tab1="{ value, isActive }">
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>Profile:   InSpec Profile <span class="token punctuation">(</span>git<span class="token punctuation">)</span>
Version:   <span class="token number">0.1</span>.0
Target:    local://
Target ID: 6dcb9e6f-5ede-5474-9521-595fadf5c7ce

  <span class="token function">git</span>
     ✔  branches is expected to include <span class="token string">"master"</span>
     ✔  branches is expected to include <span class="token string">"testBranch"</span>
     ×  current_branch 
     undefined method <span class="token variable"><span class="token variable">`</span>current_branch' <span class="token keyword">for</span> <span class="token comment">#&lt;#&lt;Class:0x0000000005400588>:0x00000000053fd0b8></span>
  Command: <span class="token variable">`</span></span><span class="token function">git</span> --git-dir /workspaces/saf-training-lab-environment/git_test/.git log <span class="token parameter variable">-1</span> <span class="token parameter variable">--pretty</span><span class="token operator">=</span>format:<span class="token string">'%h'</span><span class="token variable"><span class="token variable">`</span>
     ✔  stdout is expected to match /edc207f/
  Command: <span class="token variable">`</span></span><span class="token function">git</span> --git-dir /workspaces/saf-training-lab-environment/git_test/.git log <span class="token parameter variable">--skip</span><span class="token operator">=</span><span class="token number">1</span> <span class="token parameter variable">-1</span> <span class="token parameter variable">--pretty</span><span class="token operator">=</span>format:<span class="token string">'%h'</span>`
     ✔  stdout is expected to match /8c30bff/

Test Summary: <span class="token number">6</span> successful, <span class="token number">1</span> failure, <span class="token number">0</span> skipped
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></template>
</CodeTabs>
<p>Let's head over to the git.rb file to create the <code v-pre>current_branch</code> method we are invoking in the above test:</p>
<div class="language-ruby line-numbers-mode" data-ext="rb"><pre v-pre class="language-ruby"><code><span class="token comment"># encoding: utf-8</span>
<span class="token comment"># copyright: 2019, The Authors</span>

<span class="token keyword">class</span> <span class="token class-name">Git</span> <span class="token operator">&lt;</span> Inspec<span class="token punctuation">.</span>resource<span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
    name <span class="token string-literal"><span class="token string">'git'</span></span>

    <span class="token keyword">def</span> <span class="token method-definition"><span class="token function">initialize</span></span><span class="token punctuation">(</span>path<span class="token punctuation">)</span>
        <span class="token variable">@path</span> <span class="token operator">=</span> path
    <span class="token keyword">end</span>

    <span class="token keyword">def</span> <span class="token method-definition"><span class="token function">branches</span></span>
        inspec<span class="token punctuation">.</span>command<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">"git --git-dir </span><span class="token interpolation"><span class="token delimiter punctuation">#{</span><span class="token content"><span class="token variable">@path</span></span><span class="token delimiter punctuation">}</span></span><span class="token string"> branch"</span></span><span class="token punctuation">)</span><span class="token punctuation">.</span>stdout
    <span class="token keyword">end</span>

    <span class="token keyword">def</span> <span class="token method-definition"><span class="token function">current_branch</span></span>
        branch_name <span class="token operator">=</span> inspec<span class="token punctuation">.</span>command<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">"git --git-dir </span><span class="token interpolation"><span class="token delimiter punctuation">#{</span><span class="token content"><span class="token variable">@path</span></span><span class="token delimiter punctuation">}</span></span><span class="token string"> branch"</span></span><span class="token punctuation">)</span><span class="token punctuation">.</span>stdout<span class="token punctuation">.</span>strip<span class="token punctuation">.</span>split<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">"\n"</span></span><span class="token punctuation">)</span><span class="token punctuation">.</span>find <span class="token keyword">do</span> <span class="token operator">|</span>name<span class="token operator">|</span>
            name<span class="token punctuation">.</span>start_with<span class="token operator">?</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'*'</span></span><span class="token punctuation">)</span>
        <span class="token keyword">end</span>
        branch_name<span class="token punctuation">.</span>gsub<span class="token punctuation">(</span><span class="token regex-literal"><span class="token regex">/^\*/</span></span><span class="token punctuation">,</span><span class="token string-literal"><span class="token string">''</span></span><span class="token punctuation">)</span><span class="token punctuation">.</span>strip
    <span class="token keyword">end</span>

<span class="token keyword">end</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Now we can run the profile again.</p>
<CodeTabs id="179" :data='[{"id":"Command"},{"id":"Output"}]'>
<template #title0="{ value, isActive }">Command</template>
<template #title1="{ value, isActive }">Output</template>
<template #tab0="{ value, isActive }">
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>inspec <span class="token builtin class-name">exec</span> <span class="token function">git</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></template>
<template #tab1="{ value, isActive }">
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>Profile:   InSpec Profile <span class="token punctuation">(</span>git<span class="token punctuation">)</span>
Version:   <span class="token number">0.1</span>.0
Target:    local://
Target ID: 6dcb9e6f-5ede-5474-9521-595fadf5c7ce

  <span class="token function">git</span>
     ✔  branches is expected to include <span class="token string">"master"</span>
     ✔  branches is expected to include <span class="token string">"testBranch"</span>
     ✔  current_branch is expected to <span class="token function">cmp</span> <span class="token operator">==</span> <span class="token string">"master"</span>
  Command: <span class="token variable"><span class="token variable">`</span><span class="token function">git</span> --git-dir /workspaces/saf-training-lab-environment/git_test/.git log <span class="token parameter variable">-1</span> <span class="token parameter variable">--pretty</span><span class="token operator">=</span>format:<span class="token string">'%h'</span><span class="token variable">`</span></span>
     ✔  stdout is expected to match /edc207f/
  Command: <span class="token variable"><span class="token variable">`</span><span class="token function">git</span> --git-dir /workspaces/saf-training-lab-environment/git_test/.git log <span class="token parameter variable">--skip</span><span class="token operator">=</span><span class="token number">1</span> <span class="token parameter variable">-1</span> <span class="token parameter variable">--pretty</span><span class="token operator">=</span>format:<span class="token string">'%h'</span><span class="token variable">`</span></span>
     ✔  stdout is expected to match /8c30bff/

Test Summary: <span class="token number">7</span> successful, <span class="token number">0</span> failures, <span class="token number">0</span> skipped
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></template>
</CodeTabs>
<p>All the tests should pass!</p>
<div class="hint-container tip">
<p class="hint-container-title">Exercise!</p>
<p>As a solo exercise, try to create a method in the git.rb file to check what the last commit is.</p>
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