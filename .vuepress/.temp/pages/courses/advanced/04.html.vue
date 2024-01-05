<template><div><h2 id="resources" tabindex="-1"><a class="header-anchor" href="#resources" aria-hidden="true">#</a> Resources</h2>
<p>Now that you have learned about making and running InSpec profiles, let's dig deeper into the mechanics of InSpec by learning about resources.</p>
<h3 id="core-resources" tabindex="-1"><a class="header-anchor" href="#core-resources" aria-hidden="true">#</a> Core Resources</h3>
<p>As you saw in the <RouterLink to="/courses/beginner/">Beginner class</RouterLink>, when writing InSpec code, many core resources are available because they are included in the main InSpec code base.</p>
<ul>
<li>You can <a href="https://www.inspec.io/docs/reference/resources/" target="_blank" rel="noopener noreferrer">explore the core InSpec resources<ExternalLinkIcon/></a> to existing resources.</li>
<li>You can also <a href="https://github.com/inspec/inspec/tree/master/lib/inspec/resources" target="_blank" rel="noopener noreferrer">examine the source code<ExternalLinkIcon/></a> to see what's available. For example, you can see how <code v-pre>file</code> and other InSpec resources are implemented.</li>
</ul>
<h3 id="local-resources" tabindex="-1"><a class="header-anchor" href="#local-resources" aria-hidden="true">#</a> Local Resources</h3>
<p>Local resources are those that exist only in the profile in which they are developed. Local resources are put in the <code v-pre>libraries</code> directory:</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>$ tree examples/profile
examples/profile
<span class="token punctuation">..</span>.
├── libraries
│   └── custom_resource.rb
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Note that the <code v-pre>libraries</code> directory is not created by default within a profile when we use <code v-pre>inspec init</code>. We need to create the directory ourselves.</p>
<p>Once you create and populate a custom resource Ruby file inside the <code v-pre>libraries</code> directory, it can be utilized inside your local profile just like the core resources.</p>
<h3 id="_6-1-resource-overview" tabindex="-1"><a class="header-anchor" href="#_6-1-resource-overview" aria-hidden="true">#</a> 6.1. Resource Overview</h3>
<p>Resources may be added to profiles in the libraries folder:</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>$ tree examples/profile
examples/profile
<span class="token punctuation">..</span>.
├── libraries
│   └── gordon_config.rb
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_6-2-resource-structure" tabindex="-1"><a class="header-anchor" href="#_6-2-resource-structure" aria-hidden="true">#</a> 6.2. Resource Structure</h3>
<p>The smallest possible InSpec resource takes this form:</p>
<div class="language-ruby line-numbers-mode" data-ext="rb"><pre v-pre class="language-ruby"><code><span class="token keyword">class</span> <span class="token class-name">Tiny</span> <span class="token operator">&lt;</span> Inspec<span class="token punctuation">.</span>resource<span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
  name <span class="token string-literal"><span class="token string">'tiny'</span></span>
<span class="token keyword">end</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>This is easy to write, but not particularly useful for testing.</p>
<p>Resources are written as a regular Ruby class, which inherits from the base <code v-pre>inspec.resource</code> class. The number (1) specifies the version this resource plugin targets. As Chef InSpec evolves, this interface may change and may require a higher version.</p>
<p>In addition to the resource name, the following attributes can be configured:</p>
<ul>
<li><code v-pre>name</code> - Identifier of the resource (required)</li>
<li><code v-pre>desc</code> - Description of the resource (optional)</li>
<li><code v-pre>example</code> - Example usage of the resource (optional)</li>
<li><code v-pre>supports</code> - (Chef InSpec 2.0+) Platform restrictions of the resource (optional)</li>
</ul>
<p>The following methods are available to the resource:</p>
<ul>
<li><code v-pre>inspec</code> - Contains a registry of all other resources to interact with the operating system or target in general.</li>
<li><code v-pre>skip_resource</code> - A resource may call this method to indicate that requirements aren’t met. All tests that use this resource will be marked as skipped.</li>
</ul>
<p>The following example shows a full resource using attributes and methods to provide simple access to a configuration file:</p>
<div class="language-ruby line-numbers-mode" data-ext="rb"><pre v-pre class="language-ruby"><code><span class="token keyword">class</span> <span class="token class-name">GordonConfig</span> <span class="token operator">&lt;</span> Inspec<span class="token punctuation">.</span>resource<span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
  name <span class="token string-literal"><span class="token string">'gordon_config'</span></span>

  <span class="token comment"># Restrict to only run on the below platforms (if none were given, all OS's supported)</span>
  supports platform_family<span class="token operator">:</span> <span class="token string-literal"><span class="token string">'fedora'</span></span>
  supports platform<span class="token operator">:</span> <span class="token string-literal"><span class="token string">'centos'</span></span><span class="token punctuation">,</span> <span class="token symbol">release</span><span class="token operator">:</span> <span class="token string-literal"><span class="token string">'6.9'</span></span>
  <span class="token comment"># Supports `*` for wildcard matcher in the release</span>
  supports platform<span class="token operator">:</span> <span class="token string-literal"><span class="token string">'centos'</span></span><span class="token punctuation">,</span> <span class="token symbol">release</span><span class="token operator">:</span> <span class="token string-literal"><span class="token string">'7.*'</span></span>

  desc '
    Resource description <span class="token operator">...</span>
  '

  example '
    describe gordon_config <span class="token keyword">do</span>
      its<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">"signal"</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span> should eq <span class="token string-literal"><span class="token string">"on"</span></span> <span class="token punctuation">}</span>
    <span class="token keyword">end</span>
  '

  <span class="token comment"># Load the configuration file on initialization</span>
  <span class="token keyword">def</span> <span class="token method-definition"><span class="token function">initialize</span></span><span class="token punctuation">(</span>path <span class="token operator">=</span> <span class="token keyword">nil</span><span class="token punctuation">)</span>
    <span class="token variable">@path</span> <span class="token operator">=</span> path <span class="token operator">||</span> <span class="token string-literal"><span class="token string">'/etc/gordon.conf'</span></span>
    <span class="token variable">@params</span> <span class="token operator">=</span> <span class="token class-name">SimpleConfig</span><span class="token punctuation">.</span><span class="token keyword">new</span><span class="token punctuation">(</span> read_content <span class="token punctuation">)</span>
  <span class="token keyword">end</span>

  <span class="token comment"># Expose all parameters of the configuration file.</span>
  <span class="token keyword">def</span> <span class="token method-definition"><span class="token function">method_missing</span></span><span class="token punctuation">(</span>name<span class="token punctuation">)</span>
    <span class="token variable">@params</span><span class="token punctuation">[</span>name<span class="token punctuation">]</span>
  <span class="token keyword">end</span>

  <span class="token keyword">private</span>

  <span class="token keyword">def</span> <span class="token method-definition"><span class="token function">read_content</span></span>
    f <span class="token operator">=</span> inspec<span class="token punctuation">.</span>file<span class="token punctuation">(</span><span class="token variable">@path</span><span class="token punctuation">)</span>
    <span class="token comment"># Test if the path exist and that it's a file</span>
    <span class="token keyword">if</span> f<span class="token punctuation">.</span>file<span class="token operator">?</span>
      <span class="token comment"># Retrieve the file's contents</span>
      f<span class="token punctuation">.</span>content
    <span class="token keyword">else</span>
      <span class="token comment"># If the file doesn't exist, skip all tests that use gordon_config</span>
      <span class="token keyword">raise</span> Inspec<span class="token double-colon punctuation">::</span>Exceptions<span class="token double-colon punctuation">::</span>ResourceSkipped<span class="token punctuation">,</span> <span class="token string-literal"><span class="token string">"Can't read config at </span><span class="token interpolation"><span class="token delimiter punctuation">#{</span><span class="token content"><span class="token variable">@path</span></span><span class="token delimiter punctuation">}</span></span><span class="token string">"</span></span>
    <span class="token keyword">end</span>
  <span class="token keyword">end</span>
<span class="token keyword">end</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Let's break down each component of the resource.</p>
<h4 id="class" tabindex="-1"><a class="header-anchor" href="#class" aria-hidden="true">#</a> class</h4>
<p>The class is where the Ruby file is defined.</p>
<h4 id="name" tabindex="-1"><a class="header-anchor" href="#name" aria-hidden="true">#</a> name</h4>
<p>The name is how we will call upon this resource within our controls, in the example above that would be <code v-pre>gordon_config</code>.</p>
<h4 id="supports" tabindex="-1"><a class="header-anchor" href="#supports" aria-hidden="true">#</a> supports</h4>
<p>Supports are used to define or restrict the Ruby resource to work in specific ways, as shown in the example above that is used to restrict our class to specific platforms.</p>
<h4 id="desc" tabindex="-1"><a class="header-anchor" href="#desc" aria-hidden="true">#</a> desc</h4>
<p>A simple description of the purpose of this resource.</p>
<h4 id="examples" tabindex="-1"><a class="header-anchor" href="#examples" aria-hidden="true">#</a> examples</h4>
<p>A simple use case example. The example is usually a <code v-pre>describe</code> block using the resource, given as a multi-line comment.</p>
<h4 id="initialize-method" tabindex="-1"><a class="header-anchor" href="#initialize-method" aria-hidden="true">#</a> initialize method</h4>
<p>An initilize method is required if your resource needs to be able to accept a parameter when called in a test (e.g. <code v-pre>file('this/path/is/a/parameter')</code>)</p>
<h4 id="functionality-methods" tabindex="-1"><a class="header-anchor" href="#functionality-methods" aria-hidden="true">#</a> functionality methods</h4>
<p>These methods return data from the resource so that you can use it in tests.</p>
</div></template>


