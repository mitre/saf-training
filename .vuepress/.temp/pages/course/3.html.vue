<template><h2 id="_3-studying-an-inspec-profile" tabindex="-1"><a class="header-anchor" href="#_3-studying-an-inspec-profile" aria-hidden="true">#</a> 3. Studying an InSpec profile</h2>
<p>Let's start by creating a profile that will contain NGINX tests.</p>
<p>At your terminal, type:</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>inspec init profile my_nginx
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>The terminal output should look like the following:</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>Create new profile at /root/my_nginx
 * Create directory controls
 * Create <span class="token function">file</span> controls/example.rb
 * Create <span class="token function">file</span> inspec.yml
 * Create directory libraries
 * Create <span class="token function">file</span> README.md
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-1-understanding-the-profile-structure" tabindex="-1"><a class="header-anchor" href="#_3-1-understanding-the-profile-structure" aria-hidden="true">#</a> 3.1. Understanding the profile structure</h3>
<p>Let's take a look at how the profile is structured. We'll start with how a profile's files are structured and then move to what makes up an InSpec control.</p>
<p>First, run <code v-pre>tree</code> to see what's in the <code v-pre>my_nginx</code> profile.</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>tree my_nginx
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>Which should look like:</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>      my_nginx
      ├── README.md
      ├── controls
      │   └── example.rb
      └── inspec.yml

      1 directory, 3 files
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Here's the role of each component.</p>
<ul>
<li><code v-pre>README.md</code> provides documentation about the profile, including what it covers and how to run it.</li>
<li>The <code v-pre>controls</code> directory contains files which implement the InSpec tests.</li>
<li><code v-pre>inspec.yml</code> provides metadata, or information, about the profile. Metadata includes the profile's description, author, copyright, and version.</li>
<li>The <code v-pre>libraries</code> directory contains resource extensions. A resource extension enables you to <a href="https://www.inspec.io/docs/reference/dsl_resource/" target="_blank" rel="noopener noreferrer">define your own resource types<ExternalLinkIcon/></a>. You won't work with resource extensions in this module.</li>
</ul>
<h3 id="_3-2-understand-a-control-s-structure" tabindex="-1"><a class="header-anchor" href="#_3-2-understand-a-control-s-structure" aria-hidden="true">#</a> 3.2. Understand a control's structure</h3>
<p>Let's take a look at the default control file, <code v-pre>controls/example.rb</code>.</p>
<div class="language-ruby ext-rb line-numbers-mode"><pre v-pre class="language-ruby"><code>title <span class="token string-literal"><span class="token string">'sample section'</span></span>

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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container tip"><p class="custom-container-title">Tip for developing profiles</p>
<p>When creating new profiles use the existing example file as a template</p>
</div>
<p>This example shows two tests. Both tests check for the existence of the <code v-pre>/tmp</code> directory. The second test provides additional information about the test. Let's break down each component.</p>
<ul>
<li><code v-pre>control</code> (line 12) is followed by the control's name. Each control in a profile has a unique name.</li>
<li><code v-pre>impact</code> (line 13) measures the relative importance of the test and must be a value between 0.0 and 1.0.</li>
<li><code v-pre>title</code> (line 14) defines the control's purpose.</li>
<li><code v-pre>desc</code> (line 15) provides a more complete description of what the control checks for.</li>
<li><code v-pre>describe</code> (lines 16 — 18) defines the test. Here, the test checks for the existence of the <code v-pre>/tmp</code> directory.</li>
</ul>
<p>In Ruby, the <code v-pre>do</code> and <code v-pre>end</code> keywords define a <code v-pre>block</code>. An InSpec control always contains at least one <code v-pre>describe</code> block. However, a control can contain many <code v-pre>describe</code> blocks.</p>
<div class="custom-container tip"><p class="custom-container-title">More information on a block</p>
<p><a href="http://ruby-for-beginners.rubymonstas.org/blocks.html" target="_blank" rel="noopener noreferrer">block<ExternalLinkIcon/></a></p>
</div>
<h3 id="_3-3-understand-a-describe-block-s-structure" tabindex="-1"><a class="header-anchor" href="#_3-3-understand-a-describe-block-s-structure" aria-hidden="true">#</a> 3.3. Understand a describe block's structure</h3>
<p>As with many test frameworks, InSpec code resembles natural language. Here's the format of a describe block.</p>
<div class="language-ruby ext-rb line-numbers-mode"><pre v-pre class="language-ruby"><code>describe <span class="token operator">&lt;</span>entity<span class="token operator">></span> <span class="token keyword">do</span>
  it <span class="token punctuation">{</span> <span class="token operator">&lt;</span>expectation<span class="token operator">></span> <span class="token punctuation">}</span>
<span class="token keyword">end</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>An InSpec test has two main components: the subject to examine and the subject's expected state. Here, <code v-pre>&lt;entity&gt;</code> is the subject you want to examine, for example, a package name, service, file, or network port. The <code v-pre>&lt;expectation&gt;</code> part specifies the desired result or expected state, for example, that a port should be open (or perhaps should not be open.)</p>
<p>Let's take a closer look at the <code v-pre>describe</code> block in the example.</p>
<div class="language-ruby ext-rb line-numbers-mode"><pre v-pre class="language-ruby"><code>describe file<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'/tmp'</span></span><span class="token punctuation">)</span> <span class="token keyword">do</span>
  it <span class="token punctuation">{</span> should be_directory <span class="token punctuation">}</span>
<span class="token keyword">end</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Because InSpec resembles human-readable language, you might read this test as &quot;/tmp should be a directory.&quot; Let's break down each component.</p>
<hr>
<h4 id="_3-3-1-file" tabindex="-1"><a class="header-anchor" href="#_3-3-1-file" aria-hidden="true">#</a> 3.3.1. file</h4>
<p><a href="https://www.inspec.io/docs/reference/resources/file/" target="_blank" rel="noopener noreferrer">file<ExternalLinkIcon/></a> is an InSpec <a href="https://www.inspec.io/docs/reference/resources/" target="_blank" rel="noopener noreferrer">resource<ExternalLinkIcon/></a>. If you're familiar with Chef, you know that a resource configures one part of the system. InSpec resources are similar. For example, the InSpec file resource tests for file attributes, including a file's owner, mode, and permissions. The example examines the /tmp directory.</p>
<hr>
<h4 id="_3-3-2-it" tabindex="-1"><a class="header-anchor" href="#_3-3-2-it" aria-hidden="true">#</a> 3.3.2. it</h4>
<p>The <code v-pre>it</code> statement validates one of your resource's features. A <code v-pre>describe</code> block contains one or more <code v-pre>it</code> statements. <code v-pre>it</code> enables you to test the resource itself. You'll also see <code v-pre>its</code>, which describes some feature of the resource, such as its mode or owner. You'll see examples of both <code v-pre>it</code> and <code v-pre>its</code> shortly.</p>
<hr>
<h4 id="_3-3-3-should" tabindex="-1"><a class="header-anchor" href="#_3-3-3-should" aria-hidden="true">#</a> 3.3.3. should</h4>
<p><code v-pre>should</code> describes the expectation. <code v-pre>should</code> asserts that the condition that follows <em>should</em> be true. Alternatively, <code v-pre>should_not</code> asserts that the condition that follows <em>should not</em> be true. You'll see examples of both shortly.</p>
<hr>
<h4 id="_3-3-4-be-directory" tabindex="-1"><a class="header-anchor" href="#_3-3-4-be-directory" aria-hidden="true">#</a> 3.3.4. be_directory</h4>
<p><code v-pre>be_directory</code> is an example of a <a href="https://www.inspec.io/docs/reference/matchers/" target="_blank" rel="noopener noreferrer">matcher<ExternalLinkIcon/></a>. A matcher compares a resource's actual value to its expected value. InSpec provides several predefined matchers. The <code v-pre>file</code> resource provides the <code v-pre>be_directory</code> matcher.</p>
</template>
