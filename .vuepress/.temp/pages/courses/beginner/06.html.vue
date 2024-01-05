<template><div><h2 id="refactoring-the-code-to-use-inputs" tabindex="-1"><a class="header-anchor" href="#refactoring-the-code-to-use-inputs" aria-hidden="true">#</a> Refactoring the code to use Inputs</h2>
<p>Your <code v-pre>my_nginx</code> profile is off to a great start. As your requirements evolve, you can add additional controls. You can also run this profile as often as you need to verify whether your systems remain in compliance.</p>
<p>Let's review the control file, <code v-pre>example.rb</code>.</p>
<div class="language-ruby line-numbers-mode" data-ext="rb"><pre v-pre class="language-ruby"><code>control <span class="token string-literal"><span class="token string">'nginx-version'</span></span> <span class="token keyword">do</span>
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

control <span class="token string-literal"><span class="token string">'nginx-shell-access'</span></span> <span class="token keyword">do</span>
  impact <span class="token number">1.0</span>
  title <span class="token string-literal"><span class="token string">'NGINX shell access'</span></span>
  desc <span class="token string-literal"><span class="token string">'The NGINX shell access should be restricted to admin users.'</span></span>
  describe users<span class="token punctuation">.</span>shells<span class="token punctuation">(</span><span class="token regex-literal"><span class="token regex">/bash/</span></span><span class="token punctuation">)</span><span class="token punctuation">.</span>usernames <span class="token keyword">do</span>
    it <span class="token punctuation">{</span> should be_in <span class="token punctuation">[</span><span class="token string-literal"><span class="token string">'admin'</span></span><span class="token punctuation">]</span><span class="token punctuation">}</span>
  <span class="token keyword">end</span>
<span class="token keyword">end</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Although these rules do what you expect, imagine your control file contains dozens or hundreds of tests. As the data you check for, such as the version or which modules are installed, evolve, it can become tedious to locate and update your tests. You may also find that you repeat the same data across multiple control files.</p>
<p>One way to improve these tests is to use <code v-pre>inputs</code>. <code v-pre>Inputs</code> enable you to separate the <strong>logic of your tests</strong> from the <strong>data of your tests</strong>. <code v-pre>Input files</code> are typically expressed as a <code v-pre>YAML</code> file (files ending in <code v-pre>.yaml</code> or <code v-pre>.yml</code>).</p>
<p><code v-pre>Profile Inputs</code> exist in your profile's main directory within the <code v-pre>inspec.yml</code> for global <code v-pre>inputs</code> to be used across all the controls in your profile.</p>
<p>Let's create the <code v-pre>inspec.yml</code> file for our profile:</p>
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>To access an input you will use the input keyword. You can use this anywhere in your control code.</p>
<p>For example:</p>
<div class="language-ruby line-numbers-mode" data-ext="rb"><pre v-pre class="language-ruby"><code>control <span class="token string-literal"><span class="token string">'nginx-version'</span></span> <span class="token keyword">do</span>
  impact <span class="token number">1.0</span>
  title <span class="token string-literal"><span class="token string">'NGINX version'</span></span>
  desc <span class="token string-literal"><span class="token string">'The required version of NGINX should be installed.'</span></span>
  describe nginx <span class="token keyword">do</span>
    its<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'version'</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span> should cmp <span class="token operator">>=</span> input<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'nginx_version'</span></span><span class="token punctuation">)</span> <span class="token punctuation">}</span>
  <span class="token keyword">end</span>
<span class="token keyword">end</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>For our next control we require specific modules</p>
<p>Example of adding an array object of servers:</p>
<CodeTabs id="36" :data='[{"id":"Array Input Generic"},{"id":"Array Input - NGINX Modules"},{"id":"Full inspec.yml file"}]' tab-id="shell">
<template #title0="{ value, isActive }">Array Input Generic</template>
<template #title1="{ value, isActive }">Array Input - NGINX Modules</template>
<template #title2="{ value, isActive }">Full inspec.yml file</template>
<template #tab0="{ value, isActive }">
<div class="language-yaml line-numbers-mode" data-ext="yml"><pre v-pre class="language-yaml"><code>  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> servers
    <span class="token key atrule">type</span><span class="token punctuation">:</span> Array
    <span class="token key atrule">value</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> server1
      <span class="token punctuation">-</span> server2
      <span class="token punctuation">-</span> server3
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></template>
<template #tab1="{ value, isActive }">
<div class="language-yaml line-numbers-mode" data-ext="yml"><pre v-pre class="language-yaml"><code>  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> nginx_modules
    <span class="token key atrule">type</span><span class="token punctuation">:</span> Array
    <span class="token key atrule">value</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> http_ssl
      <span class="token punctuation">-</span> stream_ssl
      <span class="token punctuation">-</span> mail_ssl
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></template>
<template #tab2="{ value, isActive }">
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
</code></pre><div class="highlight-lines"><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div></div><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></template>
</CodeTabs>
<p>Your control can be changed to look like this:</p>
<div class="language-ruby line-numbers-mode" data-ext="rb"><pre v-pre class="language-ruby"><code>control <span class="token string-literal"><span class="token string">'nginx-modules'</span></span> <span class="token keyword">do</span>
  impact <span class="token number">1.0</span>
  title <span class="token string-literal"><span class="token string">'NGINX modules'</span></span>
  desc <span class="token string-literal"><span class="token string">'The required NGINX modules should be installed.'</span></span>

  nginx_modules <span class="token operator">=</span> input<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'nginx_modules'</span></span><span class="token punctuation">)</span>
  
  describe nginx <span class="token keyword">do</span>
    nginx_modules<span class="token punctuation">.</span><span class="token keyword">each</span> <span class="token keyword">do</span> <span class="token operator">|</span>current_module<span class="token operator">|</span>
      its<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'modules'</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span> should <span class="token keyword">include</span> current_module <span class="token punctuation">}</span>
    <span class="token keyword">end</span>
  <span class="token keyword">end</span>
<span class="token keyword">end</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Lastly, we can edit our <code v-pre>inspec.yml</code> file to create a list of admin users:</p>
<CodeTabs id="54" :data='[{"id":"Array Input - Admin Users"},{"id":"Full inspec.yml file"}]' tab-id="shell">
<template #title0="{ value, isActive }">Array Input - Admin Users</template>
<template #title1="{ value, isActive }">Full inspec.yml file</template>
<template #tab0="{ value, isActive }">
<div class="language-yaml line-numbers-mode" data-ext="yml"><pre v-pre class="language-yaml"><code>  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> admin_users
    <span class="token key atrule">type</span><span class="token punctuation">:</span> Array
    <span class="token key atrule">value</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> admin
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></template>
<template #tab1="{ value, isActive }">
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
</code></pre><div class="highlight-lines"><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div><div class="highlight-line">&nbsp;</div></div><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></template>
</CodeTabs>
<p>Your fifth control can be changed to look like this:</p>
<div class="language-ruby line-numbers-mode" data-ext="rb"><pre v-pre class="language-ruby"><code>control <span class="token string-literal"><span class="token string">'nginx-shell-access'</span></span> <span class="token keyword">do</span>
  impact <span class="token number">1.0</span>
  title <span class="token string-literal"><span class="token string">'NGINX shell access'</span></span>
  desc <span class="token string-literal"><span class="token string">'The NGINX shell access should be restricted to admin users.'</span></span>
  describe users<span class="token punctuation">.</span>shells<span class="token punctuation">(</span><span class="token regex-literal"><span class="token regex">/bash/</span></span><span class="token punctuation">)</span><span class="token punctuation">.</span>usernames <span class="token keyword">do</span>
    it <span class="token punctuation">{</span> should be_in input<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'admin_users'</span></span><span class="token punctuation">)</span><span class="token punctuation">}</span>
  <span class="token keyword">end</span>
<span class="token keyword">end</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="input-file-example" tabindex="-1"><a class="header-anchor" href="#input-file-example" aria-hidden="true">#</a> Input File Example</h2>
<p>To change your inputs for platform specific cases you can setup multiple input files.</p>
<p>For example, an NGINX web server could be run on a Windows or Linux machine, which may require different admin users for each context. The inputs can be tailored for each system. You can create the <code v-pre>inputs-windows.yml</code> and <code v-pre>inputs-linux.yml</code> files in your home directory.</p>
<div class="hint-container note">
<p class="hint-container-title">Note</p>
<p>Another example is that a production and development environment may require different inputs.</p>
</div>
<CodeTabs id="80" :data='[{"id":"inputs-windows.yml"},{"id":"inputs-linux.yml"},{"id":"inspec.yml"}]' tab-id="shell">
<template #title0="{ value, isActive }">inputs-windows.yml</template>
<template #title1="{ value, isActive }">inputs-linux.yml</template>
<template #title2="{ value, isActive }">inspec.yml</template>
<template #tab0="{ value, isActive }">
<div class="language-yaml line-numbers-mode" data-ext="yml"><pre v-pre class="language-yaml"><code><span class="token key atrule">admin_users</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> Administrator
  <span class="token punctuation">-</span> Randy
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></template>
<template #tab1="{ value, isActive }">
<div class="language-yaml line-numbers-mode" data-ext="yml"><pre v-pre class="language-yaml"><code><span class="token key atrule">admin_users</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> root
  <span class="token punctuation">-</span> randy
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></template>
<template #tab2="{ value, isActive }">
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></template>
</CodeTabs>
<!-- The control file:

```ruby
control 'system-users' do
  impact 0.8
  desc 'Confirm the proper users are created on the system'

  describe users do
    its('usernames') { should eq input('users') }
  end
end
``` -->
<p>The following command runs the tests and applies the inputs specified, first, on the Linux system:</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>inspec <span class="token builtin class-name">exec</span> ./my_nginx <span class="token parameter variable">-t</span> docker://nginx --input-file inputs-linux.yml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>And, on our Windows systems:</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>inspec <span class="token builtin class-name">exec</span> ./my_nginx <span class="token parameter variable">-t</span> docker://nginx --input-file inputs-windows.yml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><details class="hint-container details"><summary>Best Practice - inputs.yml file</summary>
<p>It is best practice to create a separate file for inputs when using the provided profile. The exception to this is when working with an overlay profile, which you will see in <RouterLink to="/courses/beginner/10.html">Section 10</RouterLink>.</p>
<!-- If you wanted to write an input file with non default values, you can create an `inputs.yml` file. `inputs.yml` for our profile:

![Alt text](../../assets/img/my_nginx_profile_create_input_file.png) -->
</details>
</div></template>


