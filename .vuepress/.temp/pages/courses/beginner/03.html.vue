<template><div><h2 id="studying-an-inspec-profile" tabindex="-1"><a class="header-anchor" href="#studying-an-inspec-profile" aria-hidden="true">#</a> Studying an InSpec profile</h2>
<p>Let's start by creating a profile that will contain NGINX tests.</p>
<p>At your terminal, type:</p>
<CodeTabs id="9" :data='[{"id":"InSpec Init Command"},{"id":"Expected Output"}]' tab-id="shell">
<template #title0="{ value, isActive }">InSpec Init Command</template>
<template #title1="{ value, isActive }">Expected Output</template>
<template #tab0="{ value, isActive }">
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>inspec init profile my_nginx
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></template>
<template #tab1="{ value, isActive }">
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code> ─────────────────────────── InSpec Code Generator ─────────────────────────── 

Creating new profile at /workspaces/saf-training-lab-environment/my_nginx
 • Creating <span class="token function">file</span> inspec.yml
 • Creating directory /workspaces/saf-training-lab-environment/my_nginx/controls
 • Creating <span class="token function">file</span> controls/example.rb
 • Creating <span class="token function">file</span> README.md
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></template>
</CodeTabs>
<h3 id="understanding-the-profile-structure" tabindex="-1"><a class="header-anchor" href="#understanding-the-profile-structure" aria-hidden="true">#</a> Understanding the profile structure</h3>
<p>Let's take a look at how the profile is structured. We'll start with how a profile's files are structured and then move to what makes up an InSpec control.</p>
<p>First, run <code v-pre>tree</code> to see what's in the <code v-pre>my_nginx</code> profile.</p>
<CodeTabs id="26" :data='[{"id":"Tree Command"},{"id":"Expected Output - my_nginx folder structure"}]' tab-id="shell">
<template #title0="{ value, isActive }">Tree Command</template>
<template #title1="{ value, isActive }">Expected Output - my_nginx folder structure</template>
<template #tab0="{ value, isActive }">
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>tree my_nginx
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></template>
<template #tab1="{ value, isActive }">
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>my_nginx
├── README.md
├── controls
│   └── example.rb
└── inspec.yml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></template>
</CodeTabs>
<p>Here's the role of each component.</p>
<ul>
<li><code v-pre>README.md</code> provides documentation about the profile, including what it covers and how to run it.</li>
<li>The <code v-pre>controls</code> directory contains files which implement the InSpec tests.</li>
<li><code v-pre>inspec.yml</code> provides metadata, or information, about the profile. Metadata includes the profile's description, author, copyright, and version.</li>
<li>You may optionally have a <code v-pre>libraries</code> directory. The <code v-pre>libraries</code> directory contains resource extensions. A resource extension enables you to <a href="https://www.inspec.io/docs/reference/dsl_resource/" target="_blank" rel="noopener noreferrer">define your own resource types<ExternalLinkIcon/></a>. The <RouterLink to="/courses/advanced/">Advanced Security Automation Developer Class</RouterLink> teaches about defining your own resources.</li>
</ul>
<h3 id="understand-a-control-s-structure" tabindex="-1"><a class="header-anchor" href="#understand-a-control-s-structure" aria-hidden="true">#</a> Understand a control's structure</h3>
<p>Let's take a look at the default control file, <code v-pre>controls/example.rb</code>.</p>
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="hint-container tip">
<p class="hint-container-title">Tip for developing profiles</p>
<p>When creating new profiles use the existing example file as a template</p>
</div>
<p>This example shows two tests. Both tests check for the existence of the <code v-pre>/tmp</code> directory. The second test provides additional information about the test. Let's break down each component.</p>
<ul>
<li><code v-pre>control</code> (line 9) is followed by the control's name. Each control in a profile has a unique name.</li>
<li><code v-pre>impact</code> (line 10) measures the relative importance of the test and must be a value between 0.0 and 1.0.</li>
<li><code v-pre>title</code> (line 11) defines the control's purpose.</li>
<li><code v-pre>desc</code> (line 12) provides a more complete description of what the control checks for.</li>
<li><code v-pre>describe</code> (lines 13 — 15) defines the test. Here, the test checks for the existence of the <code v-pre>/tmp</code> directory.</li>
</ul>
<p>In Ruby, the <code v-pre>do</code> and <code v-pre>end</code> keywords define a <code v-pre>block</code>. An InSpec control always contains at least one <code v-pre>describe</code> block. However, a control can contain many <code v-pre>describe</code> blocks.</p>
<div class="hint-container tip">
<p class="hint-container-title">More information on a block in Ruby</p>
<p><a href="http://ruby-for-beginners.rubymonstas.org/blocks.html" target="_blank" rel="noopener noreferrer">Ruby's block syntax<ExternalLinkIcon/></a></p>
</div>
<h3 id="understand-a-describe-block-s-structure" tabindex="-1"><a class="header-anchor" href="#understand-a-describe-block-s-structure" aria-hidden="true">#</a> Understand a describe block's structure</h3>
<p>As with many test frameworks, InSpec code resembles natural language. Here's the format of a describe block.</p>
<div class="language-ruby line-numbers-mode" data-ext="rb"><pre v-pre class="language-ruby"><code>describe <span class="token operator">&lt;</span>entity<span class="token operator">></span> <span class="token keyword">do</span>
  it <span class="token punctuation">{</span> <span class="token operator">&lt;</span>expectation<span class="token operator">></span> <span class="token punctuation">}</span>
<span class="token keyword">end</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>An InSpec test has two main components: the subject to examine and the subject's expected state. Here, <code v-pre>&lt;entity&gt;</code> is the subject you want to examine, for example, a package name, service, file, or network port. The <code v-pre>&lt;expectation&gt;</code> specifies the desired result or expected state, for example, that a port should be open (or perhaps should not be open.)</p>
<p>Let's take a closer look at the <code v-pre>describe</code> block in the example.</p>
<div class="language-ruby line-numbers-mode" data-ext="rb"><pre v-pre class="language-ruby"><code>describe file<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'/tmp'</span></span><span class="token punctuation">)</span> <span class="token keyword">do</span>
  it <span class="token punctuation">{</span> should be_directory <span class="token punctuation">}</span>
<span class="token keyword">end</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Because InSpec resembles human-readable language, you might read this test as &quot;/tmp should be a directory.&quot; Let's break down each component.</p>
<hr>
<h4 id="file" tabindex="-1"><a class="header-anchor" href="#file" aria-hidden="true">#</a> <code v-pre>file</code></h4>
<p><a href="https://www.inspec.io/docs/reference/resources/file/" target="_blank" rel="noopener noreferrer">file<ExternalLinkIcon/></a> is an InSpec <a href="https://www.inspec.io/docs/reference/resources/" target="_blank" rel="noopener noreferrer">resource<ExternalLinkIcon/></a>. Resources are written as Ruby classes to describe a part of the system, providing attributes that are easy to call upon within the InSpec test. For example, the InSpec file resource tests for file attributes, including a file's owner, mode, and permissions. The example examines the /tmp directory.</p>
<div class="hint-container info">
<p class="hint-container-title">Note</p>
<p>If you're familiar with Chef, you know that a resource configures one part of the system. InSpec resources are similar.</p>
</div>
<hr>
<h4 id="it" tabindex="-1"><a class="header-anchor" href="#it" aria-hidden="true">#</a> <code v-pre>it</code></h4>
<p>The <code v-pre>it</code> statement validates one of your resource's features. A <code v-pre>describe</code> block contains one or more <code v-pre>it</code> statements. <code v-pre>it</code> enables you to test the resource itself. You'll also see <code v-pre>its</code>, which describes some feature of the resource, such as its mode or owner. You'll see examples of both <code v-pre>it</code> and <code v-pre>its</code> shortly.</p>
<div class="hint-container warning">
<p class="hint-container-title">it vs. its</p>
<p>Important! Just like in English grammar, pay attention to the difference between the thing (it) and the possessive word (its).</p>
<p><code v-pre>it</code> is used to describe an action or the expected behavior of the <strong>subject/resource</strong> in question.<br>
e.g. <code v-pre>it { should be_owned_by 'root' }</code></p>
<p><code v-pre>its</code> is used to specify the expectation(s) of <strong>an attribute of the subject/resource</strong>.<br>
e.g. <code v-pre>its(&quot;signal&quot;) { should eq &quot;on&quot; }</code></p>
</div>
<hr>
<h4 id="should" tabindex="-1"><a class="header-anchor" href="#should" aria-hidden="true">#</a> <code v-pre>should</code></h4>
<p><code v-pre>should</code> describes the expectation. <code v-pre>should</code> asserts that the condition that follows <em>should</em> be true. Alternatively, <code v-pre>should_not</code> asserts that the condition that follows <em>should not</em> be true. You'll see examples of both shortly.</p>
<hr>
<h4 id="be-directory" tabindex="-1"><a class="header-anchor" href="#be-directory" aria-hidden="true">#</a> <code v-pre>be_directory</code></h4>
<p><code v-pre>be_directory</code> is an example of a <a href="https://www.inspec.io/docs/reference/matchers/" target="_blank" rel="noopener noreferrer">matcher<ExternalLinkIcon/></a>. A matcher compares a resource's actual value to its expected value. InSpec provides several predefined matchers. The <code v-pre>file</code> resource provides the <code v-pre>be_directory</code> matcher.</p>
<h3 id="comprehension-check" tabindex="-1"><a class="header-anchor" href="#comprehension-check" aria-hidden="true">#</a> Comprehension Check!</h3>
<p>Look at the 4 file structures below. Determine which are valid InSpec Profiles!</p>
<CodeTabs id="176" :data='[{"id":"A"},{"id":"B"},{"id":"C"},{"id":"D"}]' tab-id="shell">
<template #title0="{ value, isActive }">A</template>
<template #title1="{ value, isActive }">B</template>
<template #title2="{ value, isActive }">C</template>
<template #title3="{ value, isActive }">D</template>
<template #tab0="{ value, isActive }">
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>folder_A
├── README.md
├── controls
│   ├── example-control-1.rb
│   ├── example-control-2.rb
│   └── example-control-3.rb
└── inspec.yml

<span class="token number">2</span> directories, <span class="token number">5</span> files
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></template>
<template #tab1="{ value, isActive }">
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>folder_B
├── README.md
├── controls
    ├── example-control-1.rb
    ├── example-control-2.rb
    └── example-control-3.rb

<span class="token number">2</span> directories, <span class="token number">4</span> files
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></template>
<template #tab2="{ value, isActive }">
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>folder_C
├── README.md
├── example-control-1.rb
├── example-control-2.rb
├── example-control-3.rb
└── inspec.yml

<span class="token number">1</span> directories, <span class="token number">5</span> files
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></template>
<template #tab3="{ value, isActive }">
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>folder_D
├── Gemfile
├── README.md
├── controls
│   ├── example-control-1.rb
│   ├── example-control-2.rb
│   └── example-control-3.rb
├── inspec.yml
└── libraries
    └── my_resource.rb

<span class="token number">3</span> directories, <span class="token number">7</span> files
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></template>
</CodeTabs>
<details class="hint-container details"><summary>Which of the folders above (A, B, C, and D) are valid InSpec profiles?</summary>
<p>A and D are valid InSpec profiles!</p>
<p><strong>INVALID PROFILES:</strong></p>
<ul>
<li><strong>B</strong> is not a profile because it is missing the inspec.yml file!</li>
<li><strong>C</strong> is not a profile because it does not have a controls directory!</li>
</ul>
<p><strong>VALID PROFILES:</strong></p>
<ul>
<li><strong>A</strong> is a profile!</li>
<li><strong>D</strong> is a profile! A profile can have extra things like a Gemfile and a libraries folder as long as it has the controls directory and the inspec.yml file!</li>
</ul>
</details>
<div class="hint-container tip">
<p class="hint-container-title">TIP: inspec check</p>
<p>To see if you have a valid InSpec profile, you can run <code v-pre>inspec check &lt;path-to-inspec-profile-folder&gt;</code></p>
</div>
</div></template>


