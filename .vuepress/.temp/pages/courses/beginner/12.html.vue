<template><div><h2 id="getting-started-on-the-rhel8-baseline" tabindex="-1"><a class="header-anchor" href="#getting-started-on-the-rhel8-baseline" aria-hidden="true">#</a> Getting Started on the RHEL8 Baseline</h2>
<p>Let's practice writing a few 'real' controls using a security guidance document.</p>
<h4 id="the-steps-to-write-an-inspec-control" tabindex="-1"><a class="header-anchor" href="#the-steps-to-write-an-inspec-control" aria-hidden="true">#</a> The Steps to write an InSpec Control</h4>
<ol>
<li><strong>Read the Control</strong> - Go to the control (you made from the stub generator) and read the check text to understand the goal of the control</li>
<li><strong>Look for Key Words and Resources</strong> - Look for key words that would indicate what resource to use. If you can't find it, look at the <a href="https://docs.chef.io/inspec/resources/" target="_blank" rel="noopener noreferrer">resources page<ExternalLinkIcon/></a> and compare back to the control.</li>
<li><strong>Read the documentation</strong> - Look at the documentation for the resource you need and understand the syntax and checkout some examples.</li>
<li><strong>Write the test</strong></li>
<li><strong>Run the test</strong></li>
<li><strong>Troubleshoot errors</strong> If you have syntax errors or unexpected results, it's time to troubleshoot. The best first step in troubleshooting is to <em>read the error message</em> from the command line.</li>
</ol>
<h3 id="example-control-using-login-defs-resource" tabindex="-1"><a class="header-anchor" href="#example-control-using-login-defs-resource" aria-hidden="true">#</a> Example Control Using <code v-pre>login_defs</code> Resource:</h3>
<p>Let's go through an example using control SV-230324 to see the above steps in practice.</p>
<ol>
<li><strong>Read the control</strong> - when referencing the control SV-230324 from the stub profile that was generated with the stub generator, look at the control, especially the check text, to understand the intention of the security guidance for this control.<br>
<strong>This control</strong> is talking about verifying all local interactive users are assigned a home directory upon creation.</li>
</ol>
<CodeTabs id="54" :data='[{"id":"Stub Generated Control"}]' tab-id="shell">
<template #title0="{ value, isActive }">Stub Generated Control</template>
<template #tab0="{ value, isActive }">
<div class="language-ruby line-numbers-mode" data-ext="rb"><pre v-pre class="language-ruby"><code>control <span class="token string-literal"><span class="token string">"SV-230324"</span></span> <span class="token keyword">do</span>
  title <span class="token string-literal"><span class="token string">"All RHEL 8 local interactive user accounts must be assigned a home directory upon creation."</span></span>
  desc "If local interactive users are <span class="token keyword">not</span> assigned a valid home directory<span class="token punctuation">,</span> there is no place <span class="token keyword">for</span> the 
storage <span class="token keyword">and</span> control of files they should own<span class="token punctuation">.</span>"
  desc <span class="token string-literal"><span class="token string">"check"</span></span><span class="token punctuation">,</span> "Verify all local interactive users on <span class="token constant">RHEL</span> <span class="token number">8</span> are assigned a home directory upon creation with 
the following command<span class="token operator">:</span>

$ sudo grep <span class="token operator">-</span>i create_home <span class="token operator">/</span>etc<span class="token operator">/</span>login<span class="token punctuation">.</span>defs

<span class="token constant">CREATE_HOME</span> yes

If 
the value <span class="token keyword">for</span> \"<span class="token constant">CREATE_HOME</span>\" parameter is <span class="token keyword">not</span> set to \"yes\"<span class="token punctuation">,</span> the line is missing<span class="token punctuation">,</span> <span class="token keyword">or</span> the line is 
commented out<span class="token punctuation">,</span> this is a finding<span class="token punctuation">.</span>"
  desc <span class="token string-literal"><span class="token string">"fix"</span></span><span class="token punctuation">,</span> "Configure <span class="token constant">RHEL</span> <span class="token number">8</span> to assign home directories to all <span class="token keyword">new</span> local interactive users by setting the 
\"<span class="token constant">CREATE_HOME</span>\" parameter <span class="token keyword">in</span> \"<span class="token operator">/</span>etc<span class="token operator">/</span>login<span class="token punctuation">.</span>defs\" to \"yes\" as follows<span class="token punctuation">.</span>

<span class="token constant">CREATE_HOME</span> yes"
  impact <span class="token number">0.5</span>
  tag severity<span class="token operator">:</span> <span class="token string-literal"><span class="token string">"medium"</span></span>
  tag gtitle<span class="token operator">:</span> <span class="token string-literal"><span class="token string">"SRG-OS-000480-GPOS-00227"</span></span>
  tag gid<span class="token operator">:</span> <span class="token string-literal"><span class="token string">"V-230324"</span></span>
  tag rid<span class="token operator">:</span> <span class="token string-literal"><span class="token string">"SV-230324r627750_rule"</span></span>
  tag stig_id<span class="token operator">:</span> <span class="token string-literal"><span class="token string">"RHEL-08-010760"</span></span>
  tag fix_id<span class="token operator">:</span> <span class="token string-literal"><span class="token string">"F-32968r567719_fix"</span></span>
  tag cci<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string-literal"><span class="token string">"CCI-000366"</span></span><span class="token punctuation">]</span>
  tag nist<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string-literal"><span class="token string">"CM-6 b"</span></span><span class="token punctuation">]</span>
<span class="token keyword">end</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></template>
</CodeTabs>
<ol start="2">
<li><strong>Look for Key Words and Resources</strong> - Dive more into what key words exist in the check text to determine what InSpec resources to use when writing the test. Most importantly, identify commands that are written in the check test like shown below. Find the <em>what</em> of the command. For this control, <code v-pre>sudo</code> is not the <em>what</em>. <code v-pre>grep</code> is also not the <em>what</em>. <code v-pre>create_home</code> looks like an attribute of the <code v-pre>/etc/login.defs</code> file, which looks like the <em>what</em>! Look for a resource named <code v-pre>login_defs</code> in the <a href="https://docs.chef.io/inspec/resources/" target="_blank" rel="noopener noreferrer">resource documentation<ExternalLinkIcon/></a>.</li>
</ol>
<div class="language-ruby line-numbers-mode" data-ext="rb"><pre v-pre class="language-ruby"><code>  desc <span class="token string-literal"><span class="token string">"check"</span></span><span class="token punctuation">,</span> "Verify all local interactive users on <span class="token constant">RHEL</span> <span class="token number">8</span> are assigned a home directory upon creation with 
the following command<span class="token operator">:</span>

$ sudo grep <span class="token operator">-</span>i create_home <span class="token operator">/</span>etc<span class="token operator">/</span>login<span class="token punctuation">.</span>defs
<span class="token operator">...</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><!-- ![Alt text](../../assets/img/check_text.png) -->
<ol start="3">
<li><strong>Read the documentation</strong> - Reference the syntax and examples to see if this resource is correct and how to use it.<br>
<a href="https://docs.chef.io/inspec/resources/login_defs/" target="_blank" rel="noopener noreferrer">login defs resource page<ExternalLinkIcon/></a><br>
<img src="@source/assets/img/login_defs.png" alt="The  Resource" loading="lazy"></li>
<li><strong>Write the test!</strong> - Reference the documentation to write the test. Here we add the describe block to the control below.</li>
</ol>
<CodeTabs id="80" :data='[{"id":"Describe Block"},{"id":"Full Control"}]' tab-id="shell">
<template #title0="{ value, isActive }">Describe Block</template>
<template #title1="{ value, isActive }">Full Control</template>
<template #tab0="{ value, isActive }">
<div class="language-ruby line-numbers-mode" data-ext="rb"><pre v-pre class="language-ruby"><code>  describe login_defs <span class="token keyword">do</span>
    its<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'CREATE_HOME'</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span> should eq <span class="token string-literal"><span class="token string">'yes'</span></span> <span class="token punctuation">}</span>
  <span class="token keyword">end</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></template>
<template #tab1="{ value, isActive }">
<div class="language-ruby line-numbers-mode" data-ext="rb"><pre v-pre class="language-ruby"><code>control <span class="token string-literal"><span class="token string">'SV-230324'</span></span> <span class="token keyword">do</span>
  title "All <span class="token constant">RHEL</span> <span class="token number">8</span> local interactive user accounts must be assigned a home
directory upon creation<span class="token punctuation">.</span>"
  desc  "If local interactive users are <span class="token keyword">not</span> assigned a valid home directory<span class="token punctuation">,</span>
there is no place <span class="token keyword">for</span> the storage <span class="token keyword">and</span> control of files they should own<span class="token punctuation">.</span>"
  desc  <span class="token string-literal"><span class="token string">'rationale'</span></span><span class="token punctuation">,</span> <span class="token string-literal"><span class="token string">''</span></span>
  desc  <span class="token string-literal"><span class="token string">'check'</span></span><span class="token punctuation">,</span> "
    Verify all local interactive users on <span class="token constant">RHEL</span> <span class="token number">8</span> are assigned a home directory
upon creation with the following command<span class="token operator">:</span>
    $ sudo grep <span class="token operator">-</span>i create_home <span class="token operator">/</span>etc<span class="token operator">/</span>login<span class="token punctuation">.</span>defs
    <span class="token constant">CREATE_HOME</span> yes
    If the value <span class="token keyword">for</span> \"<span class="token constant">CREATE_HOME</span>\" parameter is <span class="token keyword">not</span> set to \"yes\"<span class="token punctuation">,</span> the line
is missing<span class="token punctuation">,</span> <span class="token keyword">or</span> the line is commented out<span class="token punctuation">,</span> this is a finding<span class="token punctuation">.</span>
  "
  desc <span class="token string-literal"><span class="token string">'fix'</span></span><span class="token punctuation">,</span> "
    Configure <span class="token constant">RHEL</span> <span class="token number">8</span> to assign home directories to all <span class="token keyword">new</span> local interactive
users by setting the \"<span class="token constant">CREATE_HOME</span>\" parameter <span class="token keyword">in</span> \"<span class="token operator">/</span>etc<span class="token operator">/</span>login<span class="token punctuation">.</span>defs\" to
\"yes\" as follows<span class="token punctuation">.</span>
    <span class="token constant">CREATE_HOME</span> yes
  "
  impact <span class="token number">0.5</span>
  tag severity<span class="token operator">:</span> <span class="token string-literal"><span class="token string">'medium'</span></span>
  tag gtitle<span class="token operator">:</span> <span class="token string-literal"><span class="token string">'SRG-OS-000480-GPOS-00227'</span></span>
  tag gid<span class="token operator">:</span> <span class="token string-literal"><span class="token string">'V-230324'</span></span>
  tag rid<span class="token operator">:</span> <span class="token string-literal"><span class="token string">'SV-230324r627750_rule'</span></span>
  tag stig_id<span class="token operator">:</span> <span class="token string-literal"><span class="token string">'RHEL-08-010760'</span></span>
  tag fix_id<span class="token operator">:</span> <span class="token string-literal"><span class="token string">'F-32968r567719_fix'</span></span>
  tag cci<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string-literal"><span class="token string">'CCI-000366'</span></span><span class="token punctuation">]</span>
  tag nist<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string-literal"><span class="token string">'CM-6 b'</span></span><span class="token punctuation">]</span>

  describe login_defs <span class="token keyword">do</span>
    its<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'CREATE_HOME'</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span> should eq <span class="token string-literal"><span class="token string">'yes'</span></span> <span class="token punctuation">}</span>
  <span class="token keyword">end</span>
<span class="token keyword">end</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></template>
</CodeTabs>
<div class="hint-container info">
<p class="hint-container-title">Remember the matchers</p>
<p>Here, the login_defs resource shows examples using the <code v-pre>includes</code> and <code v-pre>eq</code> matcher. Here, we use <code v-pre>eq</code> because we are looking for only one result from the command, not an array of items.</p>
</div>
<ol start="5">
<li><strong>Run the test!</strong></li>
</ol>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>inspec <span class="token builtin class-name">exec</span> rhel8-baseline-stubs <span class="token parameter variable">-t</span> docker://redhat8
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol start="6">
<li><strong>Troubleshoot errors</strong> - If you have syntax errors or unexpected results, it's time to troubleshoot. The best first step in troubleshooting is to read the error message from the command line.</li>
</ol>
<h3 id="controls-we-will-demonstrate" tabindex="-1"><a class="header-anchor" href="#controls-we-will-demonstrate" aria-hidden="true">#</a> Controls We Will Demonstrate</h3>
<table>
<thead>
<tr>
<th>Control</th>
<th>Resource Used</th>
</tr>
</thead>
<tbody>
<tr>
<td>SV-230324</td>
<td>login_defs resource</td>
</tr>
<tr>
<td>SV-230250</td>
<td>directory resource</td>
</tr>
<tr>
<td>SV-230243</td>
<td>directory looping &amp; file resource</td>
</tr>
<tr>
<td>SV-230505</td>
<td>non applicable use case &amp; package resource</td>
</tr>
</tbody>
</table>
<h3 id="suggested-level-1-controls" tabindex="-1"><a class="header-anchor" href="#suggested-level-1-controls" aria-hidden="true">#</a> Suggested Level 1 Controls</h3>
<table>
<thead>
<tr>
<th>Control</th>
<th>Resource Used</th>
</tr>
</thead>
<tbody>
<tr>
<td>SV-230383</td>
<td>login_defs resource</td>
</tr>
<tr>
<td>SV-230249</td>
<td>directory resource</td>
</tr>
<tr>
<td>SV-230471</td>
<td>directory looping &amp; file resource</td>
</tr>
<tr>
<td>SV-230241</td>
<td>non applicable use case &amp; package resource</td>
</tr>
</tbody>
</table>
<h3 id="suggested-level-2-controls" tabindex="-1"><a class="header-anchor" href="#suggested-level-2-controls" aria-hidden="true">#</a> Suggested Level 2 Controls</h3>
<table>
<thead>
<tr>
<th>Control</th>
<th>Resource Used</th>
</tr>
</thead>
<tbody>
<tr>
<td>SV-230281</td>
<td>parse config file</td>
</tr>
<tr>
<td>SV-230365</td>
<td>login_defs resource</td>
</tr>
<tr>
<td>SV-230264</td>
<td>file content</td>
</tr>
</tbody>
</table>
<div class="hint-container info">
<p class="hint-container-title">Strings</p>
<p>Single quotes are dumb strings. Double quotes are smart strings. Smart strings means they allow <a href="http://ruby-for-beginners.rubymonstas.org/bonus/string_interpolation.html" target="_blank" rel="noopener noreferrer">interpolation<ExternalLinkIcon/></a>.</p>
</div>
<h3 id="suggested-inspec-resources-to-review" tabindex="-1"><a class="header-anchor" href="#suggested-inspec-resources-to-review" aria-hidden="true">#</a> Suggested InSpec Resources to Review</h3>
<ul>
<li><a href="https://www.inspec.io/docs/reference/resources/command/" target="_blank" rel="noopener noreferrer">command<ExternalLinkIcon/></a></li>
<li><a href="https://www.inspec.io/docs/reference/resources/file/" target="_blank" rel="noopener noreferrer">file<ExternalLinkIcon/></a></li>
<li><a href="https://www.inspec.io/docs/reference/resources/directory/" target="_blank" rel="noopener noreferrer">directory<ExternalLinkIcon/></a></li>
<li><a href="https://www.inspec.io/docs/reference/resources/parse_config_file/" target="_blank" rel="noopener noreferrer">parse_config_file<ExternalLinkIcon/></a></li>
<li><a href="https://www.inspec.io/docs/reference/resources/package/" target="_blank" rel="noopener noreferrer">package<ExternalLinkIcon/></a></li>
<li><a href="https://docs.chef.io/inspec/resources/login_defs/" target="_blank" rel="noopener noreferrer">login_defs<ExternalLinkIcon/></a></li>
</ul>
<h2 id="completed-rhel8-profile-for-reference" tabindex="-1"><a class="header-anchor" href="#completed-rhel8-profile-for-reference" aria-hidden="true">#</a> Completed RHEL8 Profile for Reference</h2>
<p>Below is the url to the completed RHEL8 Inspec Profile for reference, and a few things to take note of.</p>
<ol>
<li><a href="https://github.com/mitre/redhat-enterprise-linux-8-stig-baseline" target="_blank" rel="noopener noreferrer">redhat-enterprise-linux-8-stig-baseline<ExternalLinkIcon/></a></li>
</ol>
<div class="hint-container tip">
<p class="hint-container-title">Key Elements in this Profile</p>
<ul>
<li>The use of <code v-pre>impact 0</code> for NA &amp; Container Aware Controls</li>
<li>How we make the controls <code v-pre>container aware</code>, and</li>
<li>The <code v-pre>fail fast</code> approach to testing execution.</li>
</ul>
</div>
<div class="hint-container warning">
<p class="hint-container-title">Wait, does this mean that I can cheat on all of these exercises by looking up all the real controls?!</p>
<p>Yes. Feel free. We suggest you at least try thinking through how you'd write this test code without the real baseline, though.</p>
</div>
</div></template>


