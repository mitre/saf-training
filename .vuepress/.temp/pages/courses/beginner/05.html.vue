<template><div><h2 id="writing-inspec-controls" tabindex="-1"><a class="header-anchor" href="#writing-inspec-controls" aria-hidden="true">#</a> Writing InSpec Controls</h2>
<p>Let's work through some example requirements to write InSpec controls.</p>
<h3 id="security-configuration-requirements" tabindex="-1"><a class="header-anchor" href="#security-configuration-requirements" aria-hidden="true">#</a> Security &amp; Configuration Requirements</h3>
<p>We write InSpec controls to test some target based on security guidance. Here, let's verify that the NGINX instance had been configured to meet the following requirements:</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token number">1</span>. NGINX version <span class="token number">1.10</span>.3 or later.
<span class="token number">2</span>. The following NGINX modules should be installed:
   * <span class="token variable"><span class="token variable">`</span>http_ssl<span class="token variable">`</span></span>
   * <span class="token variable"><span class="token variable">`</span>stream_ssl<span class="token variable">`</span></span>
   * <span class="token variable"><span class="token variable">`</span>mail_ssl<span class="token variable">`</span></span>
<span class="token number">3</span>. The NGINX configuration <span class="token function">file</span> - <span class="token variable"><span class="token variable">`</span>/etc/nginx/nginx.conf<span class="token variable">`</span></span>- should exist as a file.
<span class="token number">4</span>. The NGINX configuration <span class="token function">file</span> should:
   * be owned by the <span class="token variable"><span class="token variable">`</span>root<span class="token variable">`</span></span> user and group.
   * not be readable, writeable, or executable by others.
<span class="token number">5</span>. The NGINX shell access should be restricted to admin users.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="requirement-1-nginx-version" tabindex="-1"><a class="header-anchor" href="#requirement-1-nginx-version" aria-hidden="true">#</a> Requirement (1) - NGINX Version</h3>
<p>The first requirement is for the NGINX version to be <code v-pre>1.10.3 or later</code>.</p>
<p>We can check this using the InSpec <code v-pre>cmp</code> matcher.</p>
<p>Replace the contents of <code v-pre>my_nginx/controls/example.rb</code> with this:</p>
<div class="language-ruby line-numbers-mode" data-ext="rb"><pre v-pre class="language-ruby"><code>control <span class="token string-literal"><span class="token string">'nginx-version'</span></span> <span class="token keyword">do</span>
  impact <span class="token number">1.0</span>
  title <span class="token string-literal"><span class="token string">'NGINX version'</span></span>
  desc <span class="token string-literal"><span class="token string">'The required version of NGINX should be installed.'</span></span>
  describe nginx <span class="token keyword">do</span>
    its<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'version'</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span> should cmp <span class="token operator">>=</span> <span class="token string-literal"><span class="token string">'1.10.3'</span></span> <span class="token punctuation">}</span>
  <span class="token keyword">end</span>
<span class="token keyword">end</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="hint-container tip">
<p class="hint-container-title">The `nginx_conf` resource docs</p>
<p><a href="https://www.inspec.io/docs/reference/resources/nginx_conf/" target="_blank" rel="noopener noreferrer"><code v-pre>nginx_conf</code><ExternalLinkIcon/></a></p>
</div>
<p>The test has an impact of 1.0, meaning it is most critical. A failure might indicate to the team that this issue should be resolved as soon as possible, likely by upgrading NGINX to a newer version. The test compares <code v-pre>nginx.version</code> against version 1.10.3.</p>
<p><code v-pre>cmp</code> is one of InSpec's <a href="https://www.inspec.io/docs/reference/matchers/" target="_blank" rel="noopener noreferrer">built-in matchers<ExternalLinkIcon/></a>. <code v-pre>cmp</code> understands version numbers and can use the operators ==, &lt;, &lt;=, &gt;=, and &gt;. <code v-pre>cmp</code> compares versions by each segment, not as a string. For example, &quot;7.4&quot; is less than than &quot;7.30&quot;.</p>
<p>Next, run <code v-pre>inspec exec</code> to execute the profile on the remote target.</p>
<CodeTabs id="40" :data='[{"id":"Command - req 1"},{"id":"Generic Command - req 1"},{"id":"Output - req 1"}]' tab-id="shell">
<template #title0="{ value, isActive }">Command - req 1</template>
<template #title1="{ value, isActive }">Generic Command - req 1</template>
<template #title2="{ value, isActive }">Output - req 1</template>
<template #tab0="{ value, isActive }">
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>inspec <span class="token builtin class-name">exec</span> ./my_nginx <span class="token parameter variable">-t</span> docker://nginx
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></template>
<template #tab1="{ value, isActive }">
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>inspec <span class="token builtin class-name">exec</span> /root/my_nginx <span class="token parameter variable">-t</span> docker://<span class="token punctuation">{</span>DOCKER_CONTAINER_ID or DOCKER_CONTAINER_NAME<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></template>
<template #tab2="{ value, isActive }">
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>  Profile: InSpec Profile <span class="token punctuation">(</span>my_nginx<span class="token punctuation">)</span>
  Version: <span class="token number">0.1</span>.0
  Target:  docker://DOCKER_CONTAINER_ID
  Target ID: TARGET_ID

    ✔  nginx-version: NGINX version
       ✔  Nginx Environment version should <span class="token function">cmp</span> <span class="token operator">>=</span> <span class="token string">"1.10.3"</span>


  Profile Summary: <span class="token number">1</span> successful control, <span class="token number">0</span> control failures, <span class="token number">0</span> controls skipped
  Test Summary: <span class="token number">1</span> successful, <span class="token number">0</span> failures, <span class="token number">0</span> skipped
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></template>
</CodeTabs>
<p>You see that the test passes.</p>
<h3 id="requirement-2-nginx-modules-are-installed" tabindex="-1"><a class="header-anchor" href="#requirement-2-nginx-modules-are-installed" aria-hidden="true">#</a> Requirement (2) - NGINX Modules are Installed</h3>
<p>The second requirement verifies that our required modules are installed.</p>
<ul>
<li>http_ssl</li>
<li>stream_ssl</li>
<li>mail_ssl</li>
</ul>
<p>Append your control file to add this describe block:</p>
<div class="language-ruby line-numbers-mode" data-ext="rb"><pre v-pre class="language-ruby"><code>control <span class="token string-literal"><span class="token string">'nginx-modules'</span></span> <span class="token keyword">do</span>
  impact <span class="token number">1.0</span>
  title <span class="token string-literal"><span class="token string">'NGINX modules'</span></span>
  desc <span class="token string-literal"><span class="token string">'The required NGINX modules should be installed.'</span></span>
  describe nginx <span class="token keyword">do</span>
    its<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'modules'</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span> should <span class="token keyword">include</span> <span class="token string-literal"><span class="token string">'http_ssl'</span></span> <span class="token punctuation">}</span>
    its<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'modules'</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span> should <span class="token keyword">include</span> <span class="token string-literal"><span class="token string">'stream_ssl'</span></span> <span class="token punctuation">}</span>
    its<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'modules'</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span> should <span class="token keyword">include</span> <span class="token string-literal"><span class="token string">'mail_ssl'</span></span> <span class="token punctuation">}</span>
  <span class="token keyword">end</span>
<span class="token keyword">end</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>The second control resembles the first; however, this version uses multiple <code v-pre>its</code> statements and the <code v-pre>nginx.modules</code> method. The <code v-pre>nginx.modules</code> method returns a list; the built-in <code v-pre>include</code> matcher verifies whether a value belongs to a given list.</p>
<p>Run <code v-pre>inspec exec</code> on the target.</p>
<CodeTabs id="87" :data='[{"id":"Command - req 2"},{"id":"Generic Command - req 2"},{"id":"Output - req 2"}]' tab-id="shell">
<template #title0="{ value, isActive }">Command - req 2</template>
<template #title1="{ value, isActive }">Generic Command - req 2</template>
<template #title2="{ value, isActive }">Output - req 2</template>
<template #tab0="{ value, isActive }">
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>inspec <span class="token builtin class-name">exec</span> ./my_nginx <span class="token parameter variable">-t</span> docker://nginx
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></template>
<template #tab1="{ value, isActive }">
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>inspec <span class="token builtin class-name">exec</span> /root/my_nginx <span class="token parameter variable">-t</span> docker://<span class="token punctuation">{</span>DOCKER_CONTAINER_ID or DOCKER_CONTAINER_NAME<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></template>
<template #tab2="{ value, isActive }">
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>  Profile: InSpec Profile <span class="token punctuation">(</span>my_nginx<span class="token punctuation">)</span>
  Version: <span class="token number">0.1</span>.0
  Target:  docker://DOCKER_CONTAINER_ID
  Target ID: TARGET_ID

    ✔  nginx-version: NGINX version
       ✔  Nginx Environment version should <span class="token function">cmp</span> <span class="token operator">>=</span> <span class="token string">"1.10.3"</span>
    ✔  nginx-modules: NGINX version
       ✔  Nginx Environment modules should include <span class="token string">"http_ssl"</span>
       ✔  Nginx Environment modules should include <span class="token string">"stream_ssl"</span>
       ✔  Nginx Environment modules should include <span class="token string">"mail_ssl"</span>


  Profile Summary: <span class="token number">2</span> successful controls, <span class="token number">0</span> control failures, <span class="token number">0</span> controls skipped
  Test Summary: <span class="token number">4</span> successful, <span class="token number">0</span> failures, <span class="token number">0</span> skipped
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></template>
</CodeTabs>
<p>This time, both controls pass.</p>
<h3 id="requirement-3-the-nginx-conf-file" tabindex="-1"><a class="header-anchor" href="#requirement-3-the-nginx-conf-file" aria-hidden="true">#</a> Requirement (3) - The <code v-pre>nginx_conf</code> file</h3>
<p>The third requirement verifies that the NGINX configuration file - <code v-pre>/etc/nginx/nginx.conf</code> - exists as a file.</p>
<p>Append this describe block to your control file:</p>
<div class="language-ruby line-numbers-mode" data-ext="rb"><pre v-pre class="language-ruby"><code>control <span class="token string-literal"><span class="token string">'nginx-conf-file'</span></span> <span class="token keyword">do</span>
  impact <span class="token number">1.0</span>
  title <span class="token string-literal"><span class="token string">'NGINX configuration file'</span></span>
  desc <span class="token string-literal"><span class="token string">'The NGINX config file should exist as a file.'</span></span>
  describe file<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'/etc/nginx/nginx.conf'</span></span><span class="token punctuation">)</span> <span class="token keyword">do</span>
    it <span class="token punctuation">{</span> should be_file <span class="token punctuation">}</span>
  <span class="token keyword">end</span>
<span class="token keyword">end</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Run <code v-pre>inspec exec</code> on the target.</p>
<CodeTabs id="114" :data='[{"id":"Command - req 3"},{"id":"Generic Command - req 3"},{"id":"Output - req 3"}]' tab-id="shell">
<template #title0="{ value, isActive }">Command - req 3</template>
<template #title1="{ value, isActive }">Generic Command - req 3</template>
<template #title2="{ value, isActive }">Output - req 3</template>
<template #tab0="{ value, isActive }">
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>inspec <span class="token builtin class-name">exec</span> ./my_nginx <span class="token parameter variable">-t</span> docker://nginx
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></template>
<template #tab1="{ value, isActive }">
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>inspec <span class="token builtin class-name">exec</span> /root/my_nginx <span class="token parameter variable">-t</span> docker://<span class="token punctuation">{</span>DOCKER_CONTAINER_ID or DOCKER_CONTAINER_NAME<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></template>
<template #tab2="{ value, isActive }">
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>Profile:   InSpec Profile <span class="token punctuation">(</span>my_nginx<span class="token punctuation">)</span>
Version:   <span class="token number">0.1</span>.0
Target:  docker://DOCKER_CONTAINER_ID
Target ID: TARGET_ID

  ✔  nginx-version: NGINX version
     ✔  Nginx Environment version is expected to <span class="token function">cmp</span> <span class="token operator">>=</span> <span class="token string">"1.10.3"</span>
  ✔  nginx-modules: NGINX modules
     ✔  Nginx Environment modules is expected to include <span class="token string">"http_ssl"</span>
     ✔  Nginx Environment modules is expected to include <span class="token string">"stream_ssl"</span>
     ✔  Nginx Environment modules is expected to include <span class="token string">"mail_ssl"</span>
  ✔  nginx-conf-file: NGINX configuration <span class="token function">file</span>
     ✔  File /etc/nginx/nginx.conf is expected to be <span class="token function">file</span>


Profile Summary: <span class="token number">3</span> successful controls, <span class="token number">0</span> control failures, <span class="token number">0</span> controls skipped
Test Summary: <span class="token number">5</span> successful, <span class="token number">0</span> failures, <span class="token number">0</span> skipped
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></template>
</CodeTabs>
<h3 id="requirement-4-permission-on-the-nginx-conf-file" tabindex="-1"><a class="header-anchor" href="#requirement-4-permission-on-the-nginx-conf-file" aria-hidden="true">#</a> Requirement (4) - Permission on the <code v-pre>nginx_conf</code> file</h3>
<p>The fourth requirement verifies that the NGINX configuration file, <code v-pre>/etc/nginx/nginx.conf</code>:</p>
<ul>
<li>is owned by the root user and group.</li>
<li>is not be readable, writeable, or executable by others.</li>
</ul>
<p>Append your control file to add this describe block:</p>
<div class="language-ruby line-numbers-mode" data-ext="rb"><pre v-pre class="language-ruby"><code>control <span class="token string-literal"><span class="token string">'nginx-conf-perms'</span></span> <span class="token keyword">do</span>
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="hint-container tip">
<p class="hint-container-title">The `file` resource docs</p>
<p><a href="https://www.inspec.io/docs/reference/resources/file/" target="_blank" rel="noopener noreferrer"><code v-pre>file</code><ExternalLinkIcon/></a></p>
</div>
<p>The first 2 tests use <code v-pre>should</code> to verify the <code v-pre>root</code> owner and group. The last 3 tests use <code v-pre>should_not</code> to verify that the file is not readable, writable, or executable by others.</p>
<p>Run <code v-pre>inspec exec</code> on the target.</p>
<CodeTabs id="158" :data='[{"id":"Command - req 4"},{"id":"Generic Command - req 4"},{"id":"Output - req 4"}]' tab-id="shell">
<template #title0="{ value, isActive }">Command - req 4</template>
<template #title1="{ value, isActive }">Generic Command - req 4</template>
<template #title2="{ value, isActive }">Output - req 4</template>
<template #tab0="{ value, isActive }">
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>inspec <span class="token builtin class-name">exec</span> ./my_nginx <span class="token parameter variable">-t</span> docker://nginx
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></template>
<template #tab1="{ value, isActive }">
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>inspec <span class="token builtin class-name">exec</span> /root/my_nginx <span class="token parameter variable">-t</span> docker://<span class="token punctuation">{</span>DOCKER_CONTAINER_ID or DOCKER_CONTAINER_NAME<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></template>
<template #tab2="{ value, isActive }">
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>Profile: InSpec Profile <span class="token punctuation">(</span>my_nginx<span class="token punctuation">)</span>
Version: <span class="token number">0.1</span>.0
Target:  docker://DOCKER_CONTAINER_ID
Target ID: TARGET_ID

  ✔  nginx-version: NGINX version
     ✔  Nginx Environment version is expected to <span class="token function">cmp</span> <span class="token operator">>=</span> <span class="token string">"1.10.3"</span>
  ✔  nginx-modules: NGINX modules
     ✔  Nginx Environment modules is expected to include <span class="token string">"http_ssl"</span>
     ✔  Nginx Environment modules is expected to include <span class="token string">"stream_ssl"</span>
     ✔  Nginx Environment modules is expected to include <span class="token string">"mail_ssl"</span>
  ✔  nginx-conf-file: NGINX configuration <span class="token function">file</span>
     ✔  File /etc/nginx/nginx.conf is expected to be <span class="token function">file</span>
  ×  nginx-conf-perms: NGINX configuration <span class="token punctuation">(</span><span class="token number">1</span> failed<span class="token punctuation">)</span>
     ✔  File /etc/nginx/nginx.conf is expected to be owned by <span class="token string">"root"</span>
     ✔  File /etc/nginx/nginx.conf is expected to be grouped into <span class="token string">"root"</span>
     ×  File /etc/nginx/nginx.conf is expected not to be readable by others
     expected File /etc/nginx/nginx.conf not to be readable by others
     ✔  File /etc/nginx/nginx.conf is expected not to be writable by others
     ✔  File /etc/nginx/nginx.conf is expected not to be executable by others


Profile Summary: <span class="token number">3</span> successful controls, <span class="token number">1</span> control failure, <span class="token number">0</span> controls skipped
Test Summary: <span class="token number">9</span> successful, <span class="token number">1</span> failure, <span class="token number">0</span> skipped
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></template>
</CodeTabs>
<p>This time you see a failure. You discover that <code v-pre>/etc/nginx/nginx.conf</code> is potentially readable by others. Because this control also has an impact of 1.0, your team may need to investigate further.</p>
<h3 id="requirement-5-nginx-shell-access" tabindex="-1"><a class="header-anchor" href="#requirement-5-nginx-shell-access" aria-hidden="true">#</a> Requirement (5) - NGINX shell access</h3>
<p>The last requirement checks whether NGINX shell access is provided to non-admin users. In this case, access to <code v-pre>bash</code> needs to be restricted to admin users.</p>
<p>Append this describe block to your control file:</p>
<div class="language-ruby line-numbers-mode" data-ext="rb"><pre v-pre class="language-ruby"><code>control <span class="token string-literal"><span class="token string">'nginx-shell-access'</span></span> <span class="token keyword">do</span>
  impact <span class="token number">1.0</span>
  title <span class="token string-literal"><span class="token string">'NGINX shell access'</span></span>
  desc <span class="token string-literal"><span class="token string">'The NGINX shell access should be restricted to admin users.'</span></span>
  describe users<span class="token punctuation">.</span>shells<span class="token punctuation">(</span><span class="token regex-literal"><span class="token regex">/bash/</span></span><span class="token punctuation">)</span><span class="token punctuation">.</span>usernames <span class="token keyword">do</span>
    it <span class="token punctuation">{</span> should be_in <span class="token punctuation">[</span><span class="token string-literal"><span class="token string">'admin'</span></span><span class="token punctuation">]</span><span class="token punctuation">}</span>
  <span class="token keyword">end</span>
<span class="token keyword">end</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Run <code v-pre>inspec exec</code> on the target.</p>
<CodeTabs id="185" :data='[{"id":"Command - req 5"},{"id":"Generic Command - req 5"},{"id":"Output - req 5"}]' tab-id="shell">
<template #title0="{ value, isActive }">Command - req 5</template>
<template #title1="{ value, isActive }">Generic Command - req 5</template>
<template #title2="{ value, isActive }">Output - req 5</template>
<template #tab0="{ value, isActive }">
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>inspec <span class="token builtin class-name">exec</span> ./my_nginx <span class="token parameter variable">-t</span> docker://nginx
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></template>
<template #tab1="{ value, isActive }">
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>inspec <span class="token builtin class-name">exec</span> /root/my_nginx <span class="token parameter variable">-t</span> docker://<span class="token punctuation">{</span>DOCKER_CONTAINER_ID or DOCKER_CONTAINER_NAME<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></template>
<template #tab2="{ value, isActive }">
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>Profile: InSpec Profile <span class="token punctuation">(</span>my_nginx<span class="token punctuation">)</span>
Version: <span class="token number">0.1</span>.0
Target:  docker://DOCKER_CONTAINER_ID
Target ID: TARGET_ID

  ✔  nginx-version: NGINX version
     ✔  Nginx Environment version is expected to <span class="token function">cmp</span> <span class="token operator">>=</span> <span class="token string">"1.10.3"</span>
  ✔  nginx-modules: NGINX modules
     ✔  Nginx Environment modules is expected to include <span class="token string">"http_ssl"</span>
     ✔  Nginx Environment modules is expected to include <span class="token string">"stream_ssl"</span>
     ✔  Nginx Environment modules is expected to include <span class="token string">"mail_ssl"</span>
  ✔  nginx-conf-file: NGINX configuration <span class="token function">file</span>
     ✔  File /etc/nginx/nginx.conf is expected to be <span class="token function">file</span>
  ×  nginx-conf-perms: NGINX configuration <span class="token punctuation">(</span><span class="token number">1</span> failed<span class="token punctuation">)</span>
     ✔  File /etc/nginx/nginx.conf is expected to be owned by <span class="token string">"root"</span>
     ✔  File /etc/nginx/nginx.conf is expected to be grouped into <span class="token string">"root"</span>
     ×  File /etc/nginx/nginx.conf is expected not to be readable by others
     expected File /etc/nginx/nginx.conf not to be readable by others
     ✔  File /etc/nginx/nginx.conf is expected not to be writable by others
     ✔  File /etc/nginx/nginx.conf is expected not to be executable by others
  ×  nginx-shell-access: NGINX shell access
     ×  <span class="token punctuation">[</span><span class="token string">"root"</span><span class="token punctuation">]</span> is expected to be <span class="token keyword">in</span> <span class="token string">"admin"</span>
     expected <span class="token variable"><span class="token variable">`</span><span class="token punctuation">[</span><span class="token string">"root"</span><span class="token punctuation">]</span><span class="token variable">`</span></span> to be <span class="token keyword">in</span> the list: <span class="token variable"><span class="token variable">`</span><span class="token punctuation">[</span><span class="token string">"admin"</span><span class="token punctuation">]</span><span class="token variable">`</span></span> 
     Diff:
      <span class="token punctuation">[</span><span class="token string">"root"</span><span class="token punctuation">]</span>


Profile Summary: <span class="token number">3</span> successful controls, <span class="token number">2</span> control failures, <span class="token number">0</span> controls skipped
Test Summary: <span class="token number">9</span> successful, <span class="token number">2</span> failures, <span class="token number">0</span> skipped
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></template>
</CodeTabs>
<p>Remember, the first step, detect, is where you identify where the problems are so that you can accurately assess risk and prioritize remediation actions.</p>
<p>For the second step, correct, you can use a configuration management tool or some other automation framework to correct compliance failures for you.</p>
<p>You won't correct this issue in this module, but later you can check out the <a href="https://learn.chef.io/tracks/integrated-compliance#/" target="_blank" rel="noopener noreferrer">Integrated Compliance with Chef<ExternalLinkIcon/></a> track to learn more about how to correct compliance issues using Chef.</p>
<details class="hint-container details"><summary>The Target ID in the InSpec exec output</summary>
<p>The target_id in the reporter is the UUID generated by train to uniquely identify the target system/node. Reference the <a href="https://github.com/inspec/inspec/pull/5895" target="_blank" rel="noopener noreferrer">PR that made this update<ExternalLinkIcon/></a></p>
</details>
</div></template>


