<template><div><h2 id="inspec-content-review" tabindex="-1"><a class="header-anchor" href="#inspec-content-review" aria-hidden="true">#</a> InSpec Content Review</h2>
<p>In the <RouterLink to="/courses/beginner/">beginner class</RouterLink>, we explained the structure and output of InSpec Profiles. Let's review some content, then practice by revisiting, running, and viewing results of an InSpec profile.</p>
<h3 id="inspec-profile-structure" tabindex="-1"><a class="header-anchor" href="#inspec-profile-structure" aria-hidden="true">#</a> InSpec Profile Structure</h3>
<p>Remember that a <code v-pre>profile</code> is a set of automated tests that usually relates directly back to a Security Requirements Benchmark.</p>
<p>Profiles have two (2) <strong>required</strong> elements:</p>
<ul>
<li>An <code v-pre>inspec.yml</code> file</li>
<li>A <code v-pre>controls</code> directory</li>
</ul>
<p>and <strong>optional</strong> elements such as:</p>
<ul>
<li>A <code v-pre>libraries</code> directory</li>
<li>A <code v-pre>files</code> directory</li>
<li>An <code v-pre>inputs.yml</code> file</li>
<li>A <code v-pre>README.md</code> file</li>
</ul>
<p>InSpec can create the profile structure for you using the following command:</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>$ inspec init profile my_inspec_profile
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>This will give you the required files along with some optional files.</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>$ tree my_inspec_profile

  my_inspec_profile
  ├── README.md
  ├── controls
  │   └── example.rb
  └── inspec.yml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="default-file-structures" tabindex="-1"><a class="header-anchor" href="#default-file-structures" aria-hidden="true">#</a> Default File Structures</h3>
<h4 id="control-file-structure" tabindex="-1"><a class="header-anchor" href="#control-file-structure" aria-hidden="true">#</a> Control File Structure</h4>
<p>Let's take a look at the default ruby file in the <code v-pre>controls</code> directory.</p>
<CodeTabs id="69" :data='[{"id":"controls/example.rb"}]'>
<template #title0="{ value, isActive }">controls/example.rb</template>
<template #tab0="{ value, isActive }">
<div class="language-ruby line-numbers-mode" data-ext="rb"><pre v-pre class="language-ruby"><code>title <span class="token string-literal"><span class="token string">'sample section'</span></span>

<span class="token comment"># you can also use plain tests</span>
describe file<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'/tmp'</span></span><span class="token punctuation">)</span> <span class="token keyword">do</span>
  it <span class="token punctuation">{</span> should be_directory <span class="token punctuation">}</span>
<span class="token keyword">end</span>

<span class="token comment"># you add controls here</span>
control <span class="token string-literal"><span class="token string">'tmp-1.0'</span></span> <span class="token keyword">do</span>                        <span class="token comment"># A unique ID for this control</span>
  impact <span class="token number">0.7</span>                                <span class="token comment"># The criticality, if this control fails.</span>
  title <span class="token string-literal"><span class="token string">'Create /tmp directory'</span></span>             <span class="token comment"># A human-readable title</span>
  desc <span class="token string-literal"><span class="token string">'An optional description...'</span></span>
  describe file<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'/tmp'</span></span><span class="token punctuation">)</span> <span class="token keyword">do</span>                  <span class="token comment"># The actual test</span>
    it <span class="token punctuation">{</span> should be_directory <span class="token punctuation">}</span>
  <span class="token keyword">end</span>
<span class="token keyword">end</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></template>
</CodeTabs>
<p>This example shows two tests. Both tests check for the existence of the <code v-pre>/tmp</code> directory. The second test provides additional information about the test. Let's break down each component.</p>
<ul>
<li><code v-pre>control</code> (line 9) is followed by the control's name. Each control in a profile has a unique name.</li>
<li><code v-pre>impact</code> (line 10) measures the relative importance of the test and must be a value between 0.0 and 1.0.</li>
<li><code v-pre>title</code> (line 11) defines the control's purpose.</li>
<li><code v-pre>desc</code> (line 12) provides a more complete description of what the control checks for.</li>
<li><code v-pre>describe</code> (lines 13 — 15) defines the test. Here, the test checks for the existence of the <code v-pre>/tmp</code> directory.</li>
</ul>
<h4 id="describe-block-structure" tabindex="-1"><a class="header-anchor" href="#describe-block-structure" aria-hidden="true">#</a> Describe Block Structure</h4>
<p>As with many test frameworks, InSpec code resembles natural language. Here's the format of a describe block.</p>
<div class="language-ruby line-numbers-mode" data-ext="rb"><pre v-pre class="language-ruby"><code>describe <span class="token operator">&lt;</span> entity <span class="token operator">></span> <span class="token keyword">do</span>
  it <span class="token punctuation">{</span> <span class="token operator">&lt;</span> expectation <span class="token operator">></span> <span class="token punctuation">}</span>
<span class="token keyword">end</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="hint-container tip">
<p class="hint-container-title">Resources And Matchers</p>
<Tabs id="112" :data='[{"id":"Resources"},{"id":"Matchers"}]'>
<template #title0="{ value, isActive }">Resources</template>
<template #title1="{ value, isActive }">Matchers</template>
<template #tab0="{ value, isActive }">
<p>InSpec uses resources like the <code v-pre>file</code> resource to aid in control development. These resources can often be used as the <code v-pre>&lt; entity &gt;</code> in the describe block. Find a list of resources in the <a href="https://docs.chef.io/inspec/resources/" target="_blank" rel="noopener noreferrer">InSpec documentation <ExternalLinkIcon/></a></p>
</template>
<template #tab1="{ value, isActive }">
<p>InSpec uses matchers like the <code v-pre>cmp</code> or <code v-pre>eq</code> to aid in control development. These matchers can often be used as the <code v-pre>&lt; expectation &gt;</code> in the describe block where the expectation is checking a requirement of that entity. Find a list of matchers in the <a href="https://docs.chef.io/inspec/matchers/" target="_blank" rel="noopener noreferrer">InSpec documentation <ExternalLinkIcon/></a></p>
</template>
</Tabs>
</div>
<h4 id="inspec-yml-file-structure" tabindex="-1"><a class="header-anchor" href="#inspec-yml-file-structure" aria-hidden="true">#</a> inspec.yml File Structure</h4>
<p>Let's take a look at the default <code v-pre>inspec.yml</code>.</p>
<CodeTabs id="131" :data='[{"id":"inspec.yml"}]'>
<template #title0="{ value, isActive }">inspec.yml</template>
<template #tab0="{ value, isActive }">
<div class="language-yaml line-numbers-mode" data-ext="yml"><pre v-pre class="language-yaml"><code><span class="token key atrule">name</span><span class="token punctuation">:</span> my_inspec_profile
<span class="token key atrule">title</span><span class="token punctuation">:</span> InSpec Profile
<span class="token key atrule">maintainer</span><span class="token punctuation">:</span> The Authors
<span class="token key atrule">copyright</span><span class="token punctuation">:</span> The Authors
<span class="token key atrule">copyright_email</span><span class="token punctuation">:</span> you@example.com
<span class="token key atrule">license</span><span class="token punctuation">:</span> Apache<span class="token punctuation">-</span><span class="token number">2.0</span>
<span class="token key atrule">summary</span><span class="token punctuation">:</span> An InSpec Compliance Profile
<span class="token key atrule">version</span><span class="token punctuation">:</span> 0.1.0
<span class="token key atrule">supports</span><span class="token punctuation">:</span>
  <span class="token key atrule">platform</span><span class="token punctuation">:</span> os

<span class="token comment"># Optional sections</span>

<span class="token key atrule">depends</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> &lt; name of the profile from which you can include controls <span class="token punctuation">></span>
    <span class="token key atrule">path</span><span class="token punctuation">:</span> &lt; relative path to that profile <span class="token punctuation">></span>

<span class="token key atrule">gem_dependencies</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> &lt; name of the gem <span class="token punctuation">></span>
    <span class="token key atrule">version</span><span class="token punctuation">:</span> &lt; version of the gem <span class="token punctuation">></span>

<span class="token key atrule">inputs</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> &lt; name of the input <span class="token punctuation">></span>
    <span class="token key atrule">desc</span><span class="token punctuation">:</span> &lt; description of the input <span class="token punctuation">></span>
    <span class="token key atrule">type</span><span class="token punctuation">:</span> &lt; data type of the input (String<span class="token punctuation">,</span> Array<span class="token punctuation">,</span> Numeric<span class="token punctuation">,</span> Hash) <span class="token punctuation">></span>
    <span class="token key atrule">value</span><span class="token punctuation">:</span> &lt; default value for the input <span class="token punctuation">></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></template>
</CodeTabs>
<p>This example shows default metadata of the InSpec profile along with the optional sections. Find more information about <RouterLink to="/courses/beginner/06.html">inputs</RouterLink> and <RouterLink to="/courses/beginner/10.html">overlays</RouterLink> in the beginner class.</p>
<div class="hint-container tip">
<p class="hint-container-title">Tips</p>
<p><code v-pre>version</code> (line 8) is the version of that inspec profile. The best practice is for the version to be bumped after making changes to the profile to pull the latest updates.</p>
</div>
<details class="hint-container details"><summary>Difference between 'inspec.yml' and 'inputs.yml'</summary>
<table>
<thead>
<tr>
<th>inspec.yml</th>
<th>inputs.yml</th>
</tr>
</thead>
<tbody>
<tr>
<td>Required</td>
<td>Optional</td>
</tr>
<tr>
<td>Should not be renamed</td>
<td>Can be renamed</td>
</tr>
<tr>
<td>Needs to be at the root of the profile</td>
<td>Can be anywhere</td>
</tr>
<tr>
<td>Automatically used during execution<br><code v-pre>inspec exec profile1</code></td>
<td>Needs to be passed in during execution<br><code v-pre>inspec exec profile1 --input-file &lt;path&gt;</code></td>
</tr>
<tr>
<td>Purpose is to define default input values and profile metadata</td>
<td>Purpose is to override default input values with parameters for the local environments</td>
</tr>
<tr>
<td>Defined by the author of the profile</td>
<td>Defined by the user of the profile</td>
</tr>
</tbody>
</table>
<CodeTabs id="207" :data='[{"id":"inspec.yml"},{"id":"inputs.yml"}]'>
<template #title0="{ value, isActive }">inspec.yml</template>
<template #title1="{ value, isActive }">inputs.yml</template>
<template #tab0="{ value, isActive }">
<div class="language-yaml line-numbers-mode" data-ext="yml"><pre v-pre class="language-yaml"><code><span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> superusers
  <span class="token key atrule">desc</span><span class="token punctuation">:</span> <span class="token string">'List of users with admin privileges'</span>
  <span class="token key atrule">type</span><span class="token punctuation">:</span> Array
  <span class="token key atrule">value</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token string">'admin'</span>
    <span class="token punctuation">-</span> <span class="token string">'root'</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></template>
<template #tab1="{ value, isActive }">
<div class="language-yaml line-numbers-mode" data-ext="yml"><pre v-pre class="language-yaml"><code><span class="token key atrule">superusers</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token string">'codespaces'</span>
  <span class="token punctuation">-</span> <span class="token string">'kali'</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></template>
</CodeTabs>
</details>
</div></template>


