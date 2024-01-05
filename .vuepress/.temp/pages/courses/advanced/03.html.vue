<template><div><h2 id="revisiting-the-nginx-web-server-inspec-profile" tabindex="-1"><a class="header-anchor" href="#revisiting-the-nginx-web-server-inspec-profile" aria-hidden="true">#</a> Revisiting the NGINX Web Server InSpec Profile</h2>
<p>In the <RouterLink to="/courses/beginner/05.html">beginner class</RouterLink>, we wrote and ran an InSpec profile against a test container. We then generated a report on our results and loaded them into Heimdall for analysis. Let's recap this process with some practice.</p>
<h3 id="the-target" tabindex="-1"><a class="header-anchor" href="#the-target" aria-hidden="true">#</a> The Target</h3>
<p>InSpec is a framework which is used to validate the security configuration of a certain target. In this case, we are interested in validating that an NGINX server complies with our requirements.</p>
<p>First let's find our nginx container id using the <code v-pre>docker ps</code> command:</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">docker</span> <span class="token function">ps</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>Which will return something like:</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>CONTAINER ID   IMAGE         COMMAND      CREATED      STATUS     PORTS   NAMES
8bs80z6b5n9s   redhat/ubi8   <span class="token string">"/bin/bash"</span>  <span class="token number">2</span> weeks ago  Up <span class="token number">1</span> hour          redhat8
8ba6b8av5n7s   nginx:latest  <span class="token string">"/docker.…"</span>  <span class="token number">2</span> weeks ago  Up <span class="token number">1</span> hour  <span class="token number">80</span>/tcp  nginx
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>We can then use the container name of our nginx container <code v-pre>nginx</code> to target the inspec validation scans at that container.</p>
<h3 id="the-requirements" tabindex="-1"><a class="header-anchor" href="#the-requirements" aria-hidden="true">#</a> The Requirements</h3>
<p>InSpec profiles are a set of automated tests that relate back to a security requirements benchmark, so the controls are always motivated by the requirements.</p>
<details class="hint-container details"><summary>Review</summary>
<ol>
<li>NGINX version 1.10.3 or later.</li>
<li>The following NGINX modules should be installed:
<ul>
<li><code v-pre>http_ssl</code></li>
<li><code v-pre>stream_ssl</code></li>
<li><code v-pre>mail_ssl</code></li>
</ul>
</li>
<li>The NGINX configuration file - <code v-pre>/etc/nginx/nginx.conf</code>- should exist as a file.</li>
<li>The NGINX configuration file should:
<ul>
<li>be owned by the <code v-pre>root</code> user and group.</li>
<li>not be readable, writeable, or executable by others.</li>
</ul>
</li>
<li>The NGINX shell access should be restricted to admin users.</li>
</ol>
</details>
<h3 id="the-controls" tabindex="-1"><a class="header-anchor" href="#the-controls" aria-hidden="true">#</a> The Controls</h3>
<p>InSpec profiles consist of automated tests, that align to security requirements, written in ruby files inside the controls directory.</p>
<details class="hint-container details"><summary>Review</summary>
<p>If you don't have <code v-pre>my_nginx</code> profile, run the following command to initialize your InSpec profile.</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>inspec init profile my_nginx
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>Append the <code v-pre>inputs</code> sections in your profile at <code v-pre>my_nginx/inspec.yml</code></p>
<div class="language-yaml line-numbers-mode" data-ext="yml"><pre v-pre class="language-yaml"><code><span class="token key atrule">name</span><span class="token punctuation">:</span> my_nginx
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
    <span class="token key atrule">type</span><span class="token punctuation">:</span> String
    <span class="token key atrule">value</span><span class="token punctuation">:</span> 1.10.3

  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> nginx_modules
    <span class="token key atrule">type</span><span class="token punctuation">:</span> Array
    <span class="token key atrule">value</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> http_ssl
      <span class="token punctuation">-</span> stream_ssl
      <span class="token punctuation">-</span> mail_ssl

  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> admin_users
    <span class="token key atrule">type</span><span class="token punctuation">:</span> Array
    <span class="token key atrule">value</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> admin
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Create an inputs file in your profile at <code v-pre>inputs-linux.yml</code></p>
<div class="language-yaml line-numbers-mode" data-ext="yml"><pre v-pre class="language-yaml"><code><span class="token key atrule">admin_users</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> admin
  <span class="token punctuation">-</span> root
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Paste the following controls in your profile at <code v-pre>my_nginx/controls/example.rb</code></p>
<div class="language-ruby line-numbers-mode" data-ext="rb"><pre v-pre class="language-ruby"><code>control <span class="token string-literal"><span class="token string">'nginx-version'</span></span> <span class="token keyword">do</span>
  impact <span class="token number">1.0</span>
  title <span class="token string-literal"><span class="token string">'NGINX version'</span></span>
  desc <span class="token string-literal"><span class="token string">'The required version of NGINX should be installed.'</span></span>
  describe nginx <span class="token keyword">do</span>
    its<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'version'</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span> should cmp <span class="token operator">>=</span> input<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'nginx_version'</span></span><span class="token punctuation">)</span> <span class="token punctuation">}</span>
  <span class="token keyword">end</span>
<span class="token keyword">end</span>

control <span class="token string-literal"><span class="token string">'nginx-modules'</span></span> <span class="token keyword">do</span>
  impact <span class="token number">1.0</span>
  title <span class="token string-literal"><span class="token string">'NGINX modules'</span></span>
  desc <span class="token string-literal"><span class="token string">'The required NGINX modules should be installed.'</span></span>
  required_modules <span class="token operator">=</span> input<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'nginx_modules'</span></span><span class="token punctuation">)</span>
  describe nginx <span class="token keyword">do</span>
    required_modules<span class="token punctuation">.</span><span class="token keyword">each</span> <span class="token keyword">do</span> <span class="token operator">|</span>required_module<span class="token operator">|</span>
      its<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'modules'</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span> should <span class="token keyword">include</span> required_module <span class="token punctuation">}</span>
    <span class="token keyword">end</span>
  <span class="token keyword">end</span>
<span class="token keyword">end</span>

control <span class="token string-literal"><span class="token string">'nginx-conf-file'</span></span> <span class="token keyword">do</span>
  impact <span class="token number">1.0</span>
  title <span class="token string-literal"><span class="token string">'NGINX configuration file'</span></span>
  desc <span class="token string-literal"><span class="token string">'The NGINX config file should exist.'</span></span>
  describe file<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'/etc/nginx/nginx.conf'</span></span><span class="token punctuation">)</span> <span class="token keyword">do</span>
    it <span class="token punctuation">{</span> should be_file <span class="token punctuation">}</span>
  <span class="token keyword">end</span>
<span class="token keyword">end</span>

control <span class="token string-literal"><span class="token string">'nginx-conf-perms'</span></span> <span class="token keyword">do</span>
  impact <span class="token number">1.0</span>
  title <span class="token string-literal"><span class="token string">'NGINX configuration permissions'</span></span>
  desc <span class="token string-literal"><span class="token string">'The NGINX config file should owned by root, be writable only by owner, and not writeable or and readable by others.'</span></span>
  describe file<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'/etc/nginx/nginx.conf'</span></span><span class="token punctuation">)</span> <span class="token keyword">do</span>
    it <span class="token punctuation">{</span> should be_owned_by <span class="token string-literal"><span class="token string">'root'</span></span> <span class="token punctuation">}</span>
    it <span class="token punctuation">{</span> should be_grouped_into <span class="token string-literal"><span class="token string">'root'</span></span> <span class="token punctuation">}</span>
    it <span class="token punctuation">{</span> should_not be_readable<span class="token punctuation">.</span>by<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'others'</span></span><span class="token punctuation">)</span> <span class="token punctuation">}</span>
    it <span class="token punctuation">{</span> should_not be_writable<span class="token punctuation">.</span>by<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'others'</span></span><span class="token punctuation">)</span> <span class="token punctuation">}</span>
    it <span class="token punctuation">{</span> should_not be_executable<span class="token punctuation">.</span>by<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'others'</span></span><span class="token punctuation">)</span> <span class="token punctuation">}</span>
  <span class="token keyword">end</span>
<span class="token keyword">end</span>

control <span class="token string-literal"><span class="token string">'nginx-shell-access'</span></span> <span class="token keyword">do</span>
  impact <span class="token number">1.0</span>
  title <span class="token string-literal"><span class="token string">'NGINX shell access'</span></span>
  desc <span class="token string-literal"><span class="token string">'The NGINX shell access should be restricted to admin users.'</span></span>
  non_admin_users <span class="token operator">=</span> users<span class="token punctuation">.</span>shells<span class="token punctuation">(</span><span class="token regex-literal"><span class="token regex">/bash/</span></span><span class="token punctuation">)</span><span class="token punctuation">.</span>usernames
  describe <span class="token string-literal"><span class="token string">"Shell access for non-admin users"</span></span> <span class="token keyword">do</span>
    it <span class="token string-literal"><span class="token string">"should be removed."</span></span> <span class="token keyword">do</span>
      failure_message <span class="token operator">=</span> <span class="token string-literal"><span class="token string">"These non-admin should not have shell access: </span><span class="token interpolation"><span class="token delimiter punctuation">#{</span><span class="token content">non_admin_users<span class="token punctuation">.</span>join<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">", "</span></span><span class="token punctuation">)</span></span><span class="token delimiter punctuation">}</span></span><span class="token string">"</span></span>
      expect<span class="token punctuation">(</span>non_admin_users<span class="token punctuation">)</span><span class="token punctuation">.</span>to be_in<span class="token punctuation">(</span>input<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'admin_users'</span></span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span> failure_message
    <span class="token keyword">end</span>
  <span class="token keyword">end</span>
<span class="token keyword">end</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details>
<h3 id="running-the-controls" tabindex="-1"><a class="header-anchor" href="#running-the-controls" aria-hidden="true">#</a> Running the Controls</h3>
<p>To run <code v-pre>inspec exec</code> on the target, ensure that you are in the directory that has <code v-pre>my_nginx</code> profile.</p>
<CodeTabs id="117" :data='[{"id":"command"},{"id":"output"}]'>
<template #title0="{ value, isActive }">command</template>
<template #title1="{ value, isActive }">output</template>
<template #tab0="{ value, isActive }">
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>inspec <span class="token builtin class-name">exec</span> my_nginx <span class="token parameter variable">-t</span> docker://nginx --input-file inputs-linux.yml 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></template>
<template #tab1="{ value, isActive }">
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>  Profile: InSpec Profile <span class="token punctuation">(</span>my_nginx<span class="token punctuation">)</span>
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
  ×  nginx-conf-perms: NGINX configuration permissions <span class="token punctuation">(</span><span class="token number">1</span> failed<span class="token punctuation">)</span>
     ✔  File /etc/nginx/nginx.conf is expected to be owned by <span class="token string">"root"</span>
     ✔  File /etc/nginx/nginx.conf is expected to be grouped into <span class="token string">"root"</span>
     ×  File /etc/nginx/nginx.conf is expected not to be readable by others
     expected File /etc/nginx/nginx.conf not to be readable by others
     ✔  File /etc/nginx/nginx.conf is expected not to be writable by others
     ✔  File /etc/nginx/nginx.conf is expected not to be executable by others
  ✔  nginx-shell-access: NGINX shell access
     ✔  Shell access <span class="token keyword">for</span> non-admin <span class="token function">users</span> should be removed.


Profile Summary: <span class="token number">4</span> successful controls, <span class="token number">1</span> control failure, <span class="token number">0</span> controls skipped
Test Summary: <span class="token number">10</span> successful, <span class="token number">1</span> failure, <span class="token number">0</span> skipped
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></template>
</CodeTabs>
<h3 id="reporting-results" tabindex="-1"><a class="header-anchor" href="#reporting-results" aria-hidden="true">#</a> Reporting Results</h3>
<p>In the <RouterLink to="/courses/beginner/08.html">beginner class</RouterLink>, we mentioned that you can specify an InSpec reporter to indicate the format in which you desire the results. If you want to read the results on the command line as well as save them in a JSON file, you can run this command.</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>inspec <span class="token builtin class-name">exec</span> my_nginx <span class="token parameter variable">-t</span> docker://nginx --input-file inputs-linux.yml <span class="token parameter variable">--reporter</span> cli json:my_nginx_results.json
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="visualizing-results" tabindex="-1"><a class="header-anchor" href="#visualizing-results" aria-hidden="true">#</a> Visualizing Results</h3>
<p>You can use this output file to upload and visualize your results in <a href="https://heimdall-lite.mitre.org/" target="_blank" rel="noopener noreferrer">Heimdall <ExternalLinkIcon/></a>.</p>
<figure><img src="@source/assets/img/NGINX_Heimdall_Report_View.png" alt="NGINX Heimdall Report View" tabindex="0" loading="lazy"><figcaption>NGINX Heimdall Report View</figcaption></figure>
</div></template>


