<template><div><p>Many of the official InSpec resources were written by community members. If you have created a resource for your project and would like to make it part of the official library, you can open a pull request against the InSpec codebase.</p>
<p>To get started, go to the main <a href="https://github.com/inspec/inspec" target="_blank" rel="noopener noreferrer">InSpec Github Repo<ExternalLinkIcon/></a> and fork the repository. On your forked repository, make a new branch, and call it something unique pertaining to what resource you are making. For example, if you use the <code v-pre>file</code> resource, then a useful branch name could be <code v-pre>file_resource</code>.</p>
<p>InSpec's source code's top level directory looks like:</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>$ tree inspec <span class="token parameter variable">-L</span> <span class="token number">1</span> <span class="token parameter variable">-d</span>
inspec
├── contrib
├── docs
├── etc
├── examples
├── habitat
├── inspec-bin
├── kitchen
├── lib
├── omnibus
├── support
├── tasks
├── <span class="token builtin class-name">test</span>
└── www

<span class="token number">13</span> directories
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>The 3 key directories we need to focus on here are the <code v-pre>docs/</code> directory, the <code v-pre>lib/</code> directory and finally the <code v-pre>test/</code> directory. When developing a resource for upstream InSpec, you must:</p>
<ol>
<li>Create the resource itself</li>
<li>Create the documentation for the resource</li>
<li>Create the unit and integration tests for the resource</li>
</ol>
<div class="hint-container tip">
<p class="hint-container-title">The resource contents</p>
<p>When creating this resource.rb file or in this scenario the <code v-pre>file.rb</code>, it would be developed and written the same exact way if you had put it in the libraries directory for a local resource. If you already developed the resource for local use, but want to push it to upstream, you can copy and paste the file directly to the following location:</p>
</div>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>$ tree <span class="token parameter variable">-L</span> <span class="token number">1</span> lib/inspec/resources/
lib/inspec/resources/
<span class="token punctuation">..</span>.
├── file.rb
<span class="token punctuation">..</span>.

<span class="token number">0</span> directories, <span class="token number">104</span> files
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>This is the helper file you need to adjust for the file resource:</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>$ tree <span class="token parameter variable">-L</span> <span class="token number">1</span> lib/inspec/
lib/inspec/
<span class="token punctuation">..</span>.
├── resources.rb
<span class="token punctuation">..</span>.

<span class="token number">10</span> directories, <span class="token number">47</span> files
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="hint-container tip">
<p class="hint-container-title">The resource helper</p>
<p>When adding this line of code, be sure to place the resources in alphabetical order as shown in the example below.</p>
</div>
<p>In the <code v-pre>resources.rb</code> file you would add the following line:</p>
<div class="language-ruby line-numbers-mode" data-ext="rb"><pre v-pre class="language-ruby"><code><span class="token keyword">require</span> <span class="token string-literal"><span class="token string">"inspec/resources/etc_hosts"</span></span>
<span class="token keyword">require</span> <span class="token string-literal"><span class="token string">"inspec/resources/file"</span></span>
<span class="token keyword">require</span> <span class="token string-literal"><span class="token string">"inspec/resources/filesystem"</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Next you would need to write out your unit and integration tests:</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>$ tree test/integration/default/controls/
test/integration/default/controls/
<span class="token punctuation">..</span>.
├── file_spec.rb
<span class="token punctuation">..</span>.

<span class="token number">0</span> directories, <span class="token number">42</span> files
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>$ tree test/unit/resources/
test/unit/resources/
<span class="token punctuation">..</span>.
├── file_test.rb
<span class="token punctuation">..</span>.

<span class="token number">0</span> directories, <span class="token number">145</span> files
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Finally, you would write up documentation on how to use the resource. This file will be published to the <a href="https://docs.chef.io/inspec/resources/" target="_blank" rel="noopener noreferrer">InSpec docs<ExternalLinkIcon/></a>. Take a look at the other docs pages for an idea of what needs to be documented -- each matcher and function on the resource should be listed, and examples of how to use the resource given.</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>$ tree docs/resources/
docs/resources/
<span class="token punctuation">..</span>.
├── file.md.erb
<span class="token punctuation">..</span>.

<span class="token number">0</span> directories, <span class="token number">156</span> files
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


