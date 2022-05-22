<template><h2 id="writing-inspec-controls" tabindex="-1"><a class="header-anchor" href="#writing-inspec-controls" aria-hidden="true">#</a> Writing InSpec Controls</h2>
<p>Now that you understand which methods map to each requirement, you're ready to write InSpec controls.</p>
<h3 id="security-configuration-requirements" tabindex="-1"><a class="header-anchor" href="#security-configuration-requirements" aria-hidden="true">#</a> Security &amp; Configuration Requirements</h3>
<p>Recall from <RouterLink to="/course/4.html">Section 4</RouterLink> that we want to verify that our NGINX instance had been configured to meet the following requirements:</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token number">1</span>. NGINX version <span class="token number">1.10</span>.3 or later.
<span class="token number">2</span>. the following NGINX modules should be installed:
   * <span class="token variable"><span class="token variable">`</span>http_ssl<span class="token variable">`</span></span>
   * <span class="token variable"><span class="token variable">`</span>stream_ssl<span class="token variable">`</span></span>
   * <span class="token variable"><span class="token variable">`</span>mail_ssl<span class="token variable">`</span></span>
<span class="token number">3</span>. the NGINX configuration <span class="token function">file</span> - <span class="token variable"><span class="token variable">`</span>/etc/nginx/nginx.conf<span class="token variable">`</span></span>- should:
   * be owned by the <span class="token variable"><span class="token variable">`</span>root<span class="token variable">`</span></span> user and group.
   * not be readable, writeable, or executable by others.

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="requirement-1-nginx-version" tabindex="-1"><a class="header-anchor" href="#requirement-1-nginx-version" aria-hidden="true">#</a> Requirement (1) - NGINX Version</h3>
<p>The first requirement is for the NGINX version to be <code v-pre>1.10.3 or later</code>.</p>
<p>We can check this using the InSpec <code v-pre>cmp</code> matcher.</p>
<p>Replace the contents of <code v-pre>my_nginx/controls/example.rb</code> with this:</p>
<div class="language-ruby ext-rb line-numbers-mode"><pre v-pre class="language-ruby"><code>control <span class="token string-literal"><span class="token string">'nginx-version'</span></span> <span class="token keyword">do</span>
  impact <span class="token number">1.0</span>
  title <span class="token string-literal"><span class="token string">'NGINX version'</span></span>
  desc <span class="token string-literal"><span class="token string">'The required version of NGINX should be installed.'</span></span>
  describe nginx <span class="token keyword">do</span>
    its<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'version'</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span> should cmp <span class="token operator">>=</span> <span class="token string-literal"><span class="token string">'1.10.3'</span></span> <span class="token punctuation">}</span>
  <span class="token keyword">end</span>
<span class="token keyword">end</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container tip"><p class="custom-container-title">The `nginx_conf` resource docs</p>
<p><a href="https://www.inspec.io/docs/reference/resources/nginx_conf/" target="_blank" rel="noopener noreferrer"><code v-pre>nginx_conf</code><ExternalLinkIcon/></a></p>
</div>
<p>The test has an impact of 1.0, meaning it is most critical. A failure might indicate to the team that this issue should be resolved as soon as possible, likely by upgrading NGINX to a newer version. The test compares <code v-pre>nginx.version</code> against version 1.10.3.</p>
<p><code v-pre>cmp</code> is one of InSpec's <a href="https://www.inspec.io/docs/reference/matchers/" target="_blank" rel="noopener noreferrer">built-in matchers<ExternalLinkIcon/></a>. <code v-pre>cmp</code> understands version numbers and can use the operators ==, &lt;, &lt;=, &gt;=, and &gt;. <code v-pre>cmp</code> compares versions by each segment, not as a string. For example, &quot;7.4&quot; is less than than &quot;7.30&quot;.</p>
<p>Next, run <code v-pre>inspec exec</code> to execute the profile on the remote target.</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>inspec <span class="token builtin class-name">exec</span> /root/my_nginx -t docker://DOCKER_CONTAINER_ID
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>This will ouput:</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>  Profile: InSpec Profile <span class="token punctuation">(</span>my_nginx<span class="token punctuation">)</span>
  Version: <span class="token number">0.1</span>.0
  Target:  docker://DOCKER_CONTAINER_ID

    ✔  nginx-version: NGINX version
       ✔  Nginx Environment version should <span class="token function">cmp</span> <span class="token operator">>=</span> <span class="token string">"1.10.3"</span>


  Profile Summary: <span class="token number">1</span> successful control, <span class="token number">0</span> control failures, <span class="token number">0</span> controls skipped
  Test Summary: <span class="token number">1</span> successful, <span class="token number">0</span> failures, <span class="token number">0</span> skipped
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>You see that the test passes.</p>
<h3 id="requirement-2-nginx-modules-are-installed" tabindex="-1"><a class="header-anchor" href="#requirement-2-nginx-modules-are-installed" aria-hidden="true">#</a> Requirement (2) - NGINX Modules are Installed</h3>
<p>The second requirement verifies that our required modules are installed.</p>
<ul>
<li>http_ssl</li>
<li>stream_ssl</li>
<li>mail_ssl</li>
</ul>
<p>Append your control file to add this describe block:</p>
<div class="language-ruby ext-rb line-numbers-mode"><pre v-pre class="language-ruby"><code>control <span class="token string-literal"><span class="token string">'nginx-modules'</span></span> <span class="token keyword">do</span>
  impact <span class="token number">1.0</span>
  title <span class="token string-literal"><span class="token string">'NGINX modules'</span></span>
  desc <span class="token string-literal"><span class="token string">'The required NGINX modules should be installed.'</span></span>
  describe nginx <span class="token keyword">do</span>
    its<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'modules'</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span> should <span class="token keyword">include</span> <span class="token string-literal"><span class="token string">'http_ssl'</span></span> <span class="token punctuation">}</span>
    its<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'modules'</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span> should <span class="token keyword">include</span> <span class="token string-literal"><span class="token string">'stream_ssl'</span></span> <span class="token punctuation">}</span>
    its<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'modules'</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span> should <span class="token keyword">include</span> <span class="token string-literal"><span class="token string">'mail_ssl'</span></span> <span class="token punctuation">}</span>
  <span class="token keyword">end</span>
<span class="token keyword">end</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container tip"><p class="custom-container-title">The `nginx_conf` resource docs</p>
<p><a href="https://www.inspec.io/docs/reference/resources/nginx_conf/" target="_blank" rel="noopener noreferrer"><code v-pre>nginx_conf</code><ExternalLinkIcon/></a></p>
</div>
<p>The second control resembles the first; however, this version uses multiple <code v-pre>its</code> statements and the <code v-pre>nginx.modules</code> method. The <code v-pre>nginx.modules</code> method returns a list; the built-in <code v-pre>include</code> matcher verifies whether a value belongs to a given list.</p>
<p>Run <code v-pre>inspec exec</code> on the target.</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ inspec <span class="token builtin class-name">exec</span> /root/my_nginx -t docker://DOCKER_CONTAINER_ID
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>Which again, will output:</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>
  Profile: InSpec Profile <span class="token punctuation">(</span>my_nginx<span class="token punctuation">)</span>
  Version: <span class="token number">0.1</span>.0
  Target:  docker://DOCKER_CONTAINER_ID

    ✔  nginx-version: NGINX version
       ✔  Nginx Environment version should <span class="token function">cmp</span> <span class="token operator">>=</span> <span class="token string">"1.10.3"</span>
    ✔  nginx-modules: NGINX version
       ✔  Nginx Environment modules should include <span class="token string">"http_ssl"</span>
       ✔  Nginx Environment modules should include <span class="token string">"stream_ssl"</span>
       ✔  Nginx Environment modules should include <span class="token string">"mail_ssl"</span>


  Profile Summary: <span class="token number">2</span> successful controls, <span class="token number">0</span> control failures, <span class="token number">0</span> controls skipped
  Test Summary: <span class="token number">4</span> successful, <span class="token number">0</span> failures, <span class="token number">0</span> skipped
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>This time, both controls pass.</p>
<h3 id="requirement-3-permission-on-the-nginx-conf-file" tabindex="-1"><a class="header-anchor" href="#requirement-3-permission-on-the-nginx-conf-file" aria-hidden="true">#</a> Requirement (3) - Permission on the <code v-pre>nginx_conf</code> file</h3>
<p>The third requirement verifies that the NGINX configuration file, <code v-pre>/etc/nginx/nginx.conf</code>:</p>
<ul>
<li>is owned by the root user and group.</li>
<li>is not be readable, writeable, or executable by others.</li>
</ul>
<p>Append your control file to add this describe block:</p>
<div class="language-ruby ext-rb line-numbers-mode"><pre v-pre class="language-ruby"><code>control <span class="token string-literal"><span class="token string">'nginx-conf'</span></span> <span class="token keyword">do</span>
  impact <span class="token number">1.0</span>
  title <span class="token string-literal"><span class="token string">'NGINX configuration'</span></span>
  desc <span class="token string-literal"><span class="token string">'The NGINX config file should owned by root, be writable only by owner, and not writeable or and readable by others.'</span></span>
  describe file<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'/etc/nginx/nginx.conf'</span></span><span class="token punctuation">)</span> <span class="token keyword">do</span>
    it <span class="token punctuation">{</span> should be_owned_by <span class="token string-literal"><span class="token string">'root'</span></span> <span class="token punctuation">}</span>
    it <span class="token punctuation">{</span> should be_grouped_into <span class="token string-literal"><span class="token string">'root'</span></span> <span class="token punctuation">}</span>
    it <span class="token punctuation">{</span> should_not be_readable<span class="token punctuation">.</span>by<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'others'</span></span><span class="token punctuation">)</span> <span class="token punctuation">}</span>
    it <span class="token punctuation">{</span> should_not be_writable<span class="token punctuation">.</span>by<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'others'</span></span><span class="token punctuation">)</span> <span class="token punctuation">}</span>
    it <span class="token punctuation">{</span> should_not be_executable<span class="token punctuation">.</span>by<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'others'</span></span><span class="token punctuation">)</span> <span class="token punctuation">}</span>
  <span class="token keyword">end</span>
<span class="token keyword">end</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container tip"><p class="custom-container-title">The `file` resource docs</p>
<p><a href="https://www.inspec.io/docs/reference/resources/file/" target="_blank" rel="noopener noreferrer"><code v-pre>file</code><ExternalLinkIcon/></a></p>
</div>
<p>The third control uses the <code v-pre>file</code> resource. The first 2 tests use <code v-pre>should</code> to verify the <code v-pre>root</code> owner and group. The last 3 tests use <code v-pre>should_not</code> to verify that the file is not readable, writable, or executable by others.</p>
<p>Run <code v-pre>inspec exec</code> on the target.</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>$ inspec <span class="token builtin class-name">exec</span> /root/my_nginx -t docker://DOCKER_CONTAINER_ID
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>Again, outputting:</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>  Profile: InSpec Profile <span class="token punctuation">(</span>my_nginx<span class="token punctuation">)</span>
  Version: <span class="token number">0.1</span>.0
  Target:  docker://DOCKER_CONTAINER_ID

    <span class="token punctuation">..</span>.
    ×  nginx-conf: NGINX configuration <span class="token punctuation">(</span><span class="token number">1</span> failed<span class="token punctuation">)</span>
       ✔  File /etc/nginx/nginx.conf should be owned by <span class="token string">"root"</span>
       ✔  File /etc/nginx/nginx.conf should be grouped into <span class="token string">"root"</span>
       ×  File /etc/nginx/nginx.conf should not be readable by others
       expected File /etc/nginx/nginx.conf not to be readable by others
       ✔  File /etc/nginx/nginx.conf should not be writable by others
       ✔  File /etc/nginx/nginx.conf should not be executable by others


  Profile Summary: <span class="token number">2</span> successful controls, <span class="token number">1</span> control failure, <span class="token number">0</span> controls skipped
  Test Summary: <span class="token number">8</span> successful, <span class="token number">1</span> failure, <span class="token number">0</span> skipped
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>This time you see a failure. You discover that <code v-pre>/etc/nginx/nginx.conf</code> is potentially readable by others. Because this control also has an impact of 1.0, your team may need to investigate further.</p>
<p>Remember, the first step, detect, is where you identify where the problems are so that you can accurately assess risk and prioritize remediation actions.</p>
<p>For the second step, correct, you can use a configuration management tool or some other automation framework to correct compliance failures for you.</p>
<p>You won't correct this issue in this module, but later you can check out the <a href="https://learn.chef.io/tracks/integrated-compliance#/" target="_blank" rel="noopener noreferrer">Integrated Compliance with Chef<ExternalLinkIcon/></a> track to learn more about how to correct compliance issues using Chef.</p>
<h2 id="refactoring-the-code-to-use-inputs" tabindex="-1"><a class="header-anchor" href="#refactoring-the-code-to-use-inputs" aria-hidden="true">#</a> Refactoring the code to use Inputs</h2>
<p>Your <code v-pre>my_nginx</code> profile is off to a great start. As your requirements evolve, you can add additional controls. You can also run this profile as often as you need to verify whether your systems remain in compliance.</p>
<p>Let's review the control file, <code v-pre>example.rb</code>.</p>
<div class="language-ruby ext-rb line-numbers-mode"><pre v-pre class="language-ruby"><code>control <span class="token string-literal"><span class="token string">'nginx-version'</span></span> <span class="token keyword">do</span>
  impact <span class="token number">1.0</span>
  title <span class="token string-literal"><span class="token string">'NGINX version'</span></span>
  desc <span class="token string-literal"><span class="token string">'The required version of NGINX should be installed.'</span></span>
  describe nginx <span class="token keyword">do</span>
    its<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'version'</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span> should cmp <span class="token operator">>=</span> <span class="token string-literal"><span class="token string">'1.10.3'</span></span> <span class="token punctuation">}</span>
  <span class="token keyword">end</span>
<span class="token keyword">end</span>

control <span class="token string-literal"><span class="token string">'nginx-modules'</span></span> <span class="token keyword">do</span>
  impact <span class="token number">1.0</span>
  title <span class="token string-literal"><span class="token string">'NGINX modules'</span></span>
  desc <span class="token string-literal"><span class="token string">'The required NGINX modules should be installed.'</span></span>
  describe nginx <span class="token keyword">do</span>
    its<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'modules'</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span> should <span class="token keyword">include</span> <span class="token string-literal"><span class="token string">'http_ssl'</span></span> <span class="token punctuation">}</span>
    its<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'modules'</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span> should <span class="token keyword">include</span> <span class="token string-literal"><span class="token string">'stream_ssl'</span></span> <span class="token punctuation">}</span>
    its<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'modules'</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span> should <span class="token keyword">include</span> <span class="token string-literal"><span class="token string">'mail_ssl'</span></span> <span class="token punctuation">}</span>
  <span class="token keyword">end</span>
<span class="token keyword">end</span>

control <span class="token string-literal"><span class="token string">'nginx-conf'</span></span> <span class="token keyword">do</span>
  impact <span class="token number">1.0</span>
  title <span class="token string-literal"><span class="token string">'NGINX configuration'</span></span>
  desc <span class="token string-literal"><span class="token string">'The NGINX config file should owned by root, be writable only by owner, and not writeable or and readable by others.'</span></span>
  describe file<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'/etc/nginx/nginx.conf'</span></span><span class="token punctuation">)</span> <span class="token keyword">do</span>
    it <span class="token punctuation">{</span> should be_owned_by <span class="token string-literal"><span class="token string">'root'</span></span> <span class="token punctuation">}</span>
    it <span class="token punctuation">{</span> should be_grouped_into <span class="token string-literal"><span class="token string">'root'</span></span> <span class="token punctuation">}</span>
    it <span class="token punctuation">{</span> should_not be_readable<span class="token punctuation">.</span>by<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'others'</span></span><span class="token punctuation">)</span> <span class="token punctuation">}</span>
    it <span class="token punctuation">{</span> should_not be_writable<span class="token punctuation">.</span>by<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'others'</span></span><span class="token punctuation">)</span> <span class="token punctuation">}</span>
    it <span class="token punctuation">{</span> should_not be_executable<span class="token punctuation">.</span>by<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'others'</span></span><span class="token punctuation">)</span> <span class="token punctuation">}</span>
  <span class="token keyword">end</span>
<span class="token keyword">end</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container tip"><p class="custom-container-title">The `nginx_conf` resource docs</p>
<p><a href="https://www.inspec.io/docs/reference/resources/nginx_conf/" target="_blank" rel="noopener noreferrer"><code v-pre>nginx_conf</code><ExternalLinkIcon/></a></p>
</div>
<p>Although these rules do what you expect, imagine your control file contains dozens or hundreds of tests. As the data you check for, such as the version or which modules are installed, evolve, it can become tedious to locate and update your tests. You may also find that you repeat the same data in across multiple control files.</p>
<p>One way to improve these tests is to use <code v-pre>inputs</code>. <code v-pre>Inputs</code> enable you to separate the <code v-pre>logic of your tests</code> from <code v-pre>the data your tests</code>. <code v-pre>Input files</code> are typically expressed as a <code v-pre>YAML</code> file.</p>
<p><code v-pre>Profile Inputs</code> exist in your profile's main directory within the <code v-pre>inspec.yml</code> for global <code v-pre>inputs</code> to be used across all the controls in your profile.</p>
<p>Let's create the <code v-pre>inspec.yml</code> file for our profile:</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">name</span><span class="token punctuation">:</span> my_nginx
<span class="token key atrule">title</span><span class="token punctuation">:</span> InSpec Profile
<span class="token key atrule">maintainer</span><span class="token punctuation">:</span> The Authors
<span class="token key atrule">copyright</span><span class="token punctuation">:</span> The Authors
<span class="token key atrule">copyright_email</span><span class="token punctuation">:</span> you@example.com
<span class="token key atrule">license</span><span class="token punctuation">:</span> Apache<span class="token punctuation">-</span><span class="token number">2.0</span>
<span class="token key atrule">summary</span><span class="token punctuation">:</span> An InSpec Compliance Profile
<span class="token key atrule">version</span><span class="token punctuation">:</span> 0.1.0
<span class="token key atrule">supports</span><span class="token punctuation">:</span>
  <span class="token key atrule">platform</span><span class="token punctuation">:</span> os

<span class="token key atrule">inputs</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> nginx_version
    <span class="token key atrule">type</span><span class="token punctuation">:</span> string
    <span class="token key atrule">value</span><span class="token punctuation">:</span> 1.10.3
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>To access an input you will use the input keyword. You can use this anywhere in your control code.</p>
<p>For example:</p>
<div class="language-ruby ext-rb line-numbers-mode"><pre v-pre class="language-ruby"><code>control <span class="token string-literal"><span class="token string">'nginx-version'</span></span> <span class="token keyword">do</span>
  impact <span class="token number">1.0</span>
  title <span class="token string-literal"><span class="token string">'NGINX version'</span></span>
  desc <span class="token string-literal"><span class="token string">'The required version of NGINX should be installed.'</span></span>
  describe nginx <span class="token keyword">do</span>
    its<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'version'</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span> should cmp <span class="token operator">>=</span> input<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'nginx_version'</span></span><span class="token punctuation">)</span> <span class="token punctuation">}</span>
  <span class="token keyword">end</span>
<span class="token keyword">end</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>For our next control we require specific modules</p>
<p>Example of adding an array object of servers:</p>
<div class="language-YAML ext-YAML line-numbers-mode"><pre v-pre class="language-YAML"><code>inputs:
  - name: servers
    type: array
    value:
      - server1
      - server2
      - server3
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Similarly as the above example we can edit our <code v-pre>inspec.yml</code> file like this:</p>
<div class="language-YAML ext-YAML line-numbers-mode"><pre v-pre class="language-YAML"><code>name: my_nginx
title: InSpec Profile
maintainer: The Authors
copyright: The Authors
copyright_email: you@example.com
license: Apache-2.0
summary: An InSpec Compliance Profile
version: 0.1.0
supports:
  platform: os

inputs:
  - name: nginx_version
    type: string
    value: 1.10.3

  - name: nginx_modules
    type: array
    value:
      - http_ssl
      - stream_ssl
      - mail_ssl
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Your control can be changed to look like this:</p>
<div class="language-ruby ext-rb line-numbers-mode"><pre v-pre class="language-ruby"><code>control <span class="token string-literal"><span class="token string">'nginx-modules'</span></span> <span class="token keyword">do</span>
  impact <span class="token number">1.0</span>
  title <span class="token string-literal"><span class="token string">'NGINX modules'</span></span>
  desc <span class="token string-literal"><span class="token string">'The required NGINX modules should be installed.'</span></span>
  
  describe nginx <span class="token keyword">do</span>
    input<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'nginx_modules'</span></span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token keyword">each</span> <span class="token keyword">do</span> <span class="token operator">|</span>current_module<span class="token operator">|</span>
      its<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'modules'</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span> should <span class="token keyword">include</span> current_module <span class="token punctuation">}</span>
    <span class="token keyword">end</span>
  <span class="token keyword">end</span>
<span class="token keyword">end</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="multiple-inputs-example" tabindex="-1"><a class="header-anchor" href="#multiple-inputs-example" aria-hidden="true">#</a> Multiple Inputs Example</h2>
<p>To change your inputs for platform specific cases you can setup multiple input files.</p>
<p>For example, a inspec.yml:</p>
<div class="language-YAML ext-YAML line-numbers-mode"><pre v-pre class="language-YAML"><code>inputs:
  - name: users
    type: array
    required: true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>A YAML file named windows.yml</p>
<div class="language-YAML ext-YAML line-numbers-mode"><pre v-pre class="language-YAML"><code>users:
  - Administrator
  - Guest
  - Randy
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>A YAML file named linux.yml</p>
<div class="language-YAML ext-YAML line-numbers-mode"><pre v-pre class="language-YAML"><code>users:
  - root
  - shadow
  - rmadison
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>The control file:</p>
<div class="language-Ruby ext-Ruby line-numbers-mode"><pre v-pre class="language-Ruby"><code>control 'system-users' do
  impact 0.8
  desc 'Confirm the proper users are created on the system'

  describe users do
    its('usernames') { should eq input('users') }
  end
end
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>The following command runs the tests and applies the inputs specified:</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>inspec <span class="token builtin class-name">exec</span> examples/profile-input --input-file examples/windows.yml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>inspec <span class="token builtin class-name">exec</span> examples/profile-input --input-file examples/linux.yml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="running-the-baseline-straight-from-github" tabindex="-1"><a class="header-anchor" href="#running-the-baseline-straight-from-github" aria-hidden="true">#</a> Running the baseline straight from Github</h2>
<p>In this module, we use NGINX for learning purposes. If you're interested in NGINX specifically, you may be interested in the <a href="https://github.com/mitre/nginx-srg-baseline" target="_blank" rel="noopener noreferrer">MITRE nginx-srg-baseline<ExternalLinkIcon/></a> profile on GitHub.</p>
<p>To execute the GitHub profile on your target system, run this <code v-pre>inspec exec</code> command.</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>inspec <span class="token builtin class-name">exec</span> https://github.com/mitre/nginx-baseline -t docker://DOCKER_CONTAINER_ID
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></template>
