import{_ as i}from"./plugin-vue_export-helper.21dcd24c.js";import{r as a,o as r,c as l,a as e,b as t,F as o,e as n,d as c}from"./app.3b4d192a.js";const d={},u=e("p",null,"When wanting to make a resource and push it up to InSpec main repository the following steps need to be made:",-1),p=n("First you would need to go to the main "),v={href:"https://github.com/inspec/inspec",target:"_blank",rel:"noopener noreferrer"},b=n("InSpec Github Repo"),m=n(" and fork the repository."),h=c(`<p>Then you would need to make a new branch calling it something unique pertaining to what resource you are making. For example, if we use the <code>file</code> resource, then a useful branch name could be <code>file_resource</code>.</p><p>InSpec consists of hundreds of directories and files, which means it can be a bit confusing when making your way around. The top level directory looks like:</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>$ tree inspec -L <span class="token number">1</span> -d
inspec
\u251C\u2500\u2500 contrib
\u251C\u2500\u2500 docs
\u251C\u2500\u2500 etc
\u251C\u2500\u2500 examples
\u251C\u2500\u2500 habitat
\u251C\u2500\u2500 inspec-bin
\u251C\u2500\u2500 kitchen
\u251C\u2500\u2500 lib
\u251C\u2500\u2500 omnibus
\u251C\u2500\u2500 support
\u251C\u2500\u2500 tasks
\u251C\u2500\u2500 <span class="token builtin class-name">test</span>
\u2514\u2500\u2500 www

<span class="token number">13</span> directories
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>The 3 key directories we need to focus on here are the <code>docs/</code> directory, the <code>lib/</code> directory and finally the <code>test/</code> directory. When developing a resource for upstream InSpec we are required to create the resource itself, create the documentation for the resource and finally create the unit and integration tests for the resource.</p><div class="custom-container tip"><p class="custom-container-title">The resource contents</p><p>When creating this resource.rb file or in this scenario the <code>file.rb</code>, it would be developed and written the same exact way if you had put it in the libraries directory for a local resource so if you already developed the resource for local use but want to push it to upstream, you can copy and paste the file directly to the following location</p></div><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>$ tree -L <span class="token number">1</span> lib/inspec/resources/
lib/inspec/resources/
<span class="token punctuation">..</span>.
\u251C\u2500\u2500 file.rb
<span class="token punctuation">..</span>.

<span class="token number">0</span> directories, <span class="token number">104</span> files
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>This is the helper file you need to adjust for the file resource</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>$ tree -L <span class="token number">1</span> lib/inspec/
lib/inspec/
<span class="token punctuation">..</span>.
\u251C\u2500\u2500 resources.rb
<span class="token punctuation">..</span>.

<span class="token number">10</span> directories, <span class="token number">47</span> files
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container tip"><p class="custom-container-title">The resource helper</p><p>When adding this line of code be sure to place the resource in alphabetical order as shown in the example below</p></div><p>In the <code>resources.rb</code> file you would add the following line</p><div class="language-ruby ext-rb line-numbers-mode"><pre class="language-ruby"><code><span class="token keyword">require</span> <span class="token string-literal"><span class="token string">&quot;inspec/resources/etc_hosts&quot;</span></span>
<span class="token keyword">require</span> <span class="token string-literal"><span class="token string">&quot;inspec/resources/file&quot;</span></span>
<span class="token keyword">require</span> <span class="token string-literal"><span class="token string">&quot;inspec/resources/filesystem&quot;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Next you would need to write out your unit and integration tests</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>$ tree test/integration/default/controls/
test/integration/default/controls/
<span class="token punctuation">..</span>.
\u251C\u2500\u2500 file_spec.rb
<span class="token punctuation">..</span>.

<span class="token number">0</span> directories, <span class="token number">42</span> files
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>$ tree test/unit/resources/
test/unit/resources/
<span class="token punctuation">..</span>.
\u251C\u2500\u2500 file_test.rb
<span class="token punctuation">..</span>.

<span class="token number">0</span> directories, <span class="token number">145</span> files
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Finally, you would write up documentation so when others visit the inspec documentation site they are aware of the existence of the resource as well as how to use it</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>$ tree docs/resources/
docs/resources/
<span class="token punctuation">..</span>.
\u251C\u2500\u2500 file.md.erb
<span class="token punctuation">..</span>.

<span class="token number">0</span> directories, <span class="token number">156</span> files
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,16);function f(g,k){const s=a("ExternalLinkIcon");return r(),l(o,null,[u,e("p",null,[p,e("a",v,[b,t(s)]),m]),h],64)}var _=i(d,[["render",f],["__file","13.html.vue"]]);export{_ as default};
