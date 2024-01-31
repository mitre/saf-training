import{_ as r}from"./plugin-vue_export-helper-x3n3nnut.js";import{r as o,o as d,c as k,b as l,w as a,a as p,d as n,e as s,f as i}from"./app-KhTIoQwo.js";const m={},v=i(`<h2 id="refactoring-the-code-to-use-inputs" tabindex="-1"><a class="header-anchor" href="#refactoring-the-code-to-use-inputs"><span>Refactoring the code to use Inputs</span></a></h2><p>Your <code>my_nginx</code> profile is off to a great start. As your requirements evolve, you can add additional controls. You can also run this profile as often as you need to verify whether your systems remain in compliance.</p><p>Let&#39;s review the control file, <code>example.rb</code>.</p><div class="language-ruby line-numbers-mode" data-ext="rb" data-title="rb"><pre class="language-ruby"><code>control <span class="token string-literal"><span class="token string">&#39;nginx-version&#39;</span></span> <span class="token keyword">do</span>
  impact <span class="token number">1.0</span>
  title <span class="token string-literal"><span class="token string">&#39;NGINX version&#39;</span></span>
  desc <span class="token string-literal"><span class="token string">&#39;The required version of NGINX should be installed.&#39;</span></span>
  describe nginx <span class="token keyword">do</span>
    its<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&#39;version&#39;</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span> should cmp <span class="token operator">&gt;=</span> <span class="token string-literal"><span class="token string">&#39;1.10.3&#39;</span></span> <span class="token punctuation">}</span>
  <span class="token keyword">end</span>
<span class="token keyword">end</span>

control <span class="token string-literal"><span class="token string">&#39;nginx-modules&#39;</span></span> <span class="token keyword">do</span>
  impact <span class="token number">1.0</span>
  title <span class="token string-literal"><span class="token string">&#39;NGINX modules&#39;</span></span>
  desc <span class="token string-literal"><span class="token string">&#39;The required NGINX modules should be installed.&#39;</span></span>
  describe nginx <span class="token keyword">do</span>
    its<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&#39;modules&#39;</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span> should <span class="token keyword">include</span> <span class="token string-literal"><span class="token string">&#39;http_ssl&#39;</span></span> <span class="token punctuation">}</span>
    its<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&#39;modules&#39;</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span> should <span class="token keyword">include</span> <span class="token string-literal"><span class="token string">&#39;stream_ssl&#39;</span></span> <span class="token punctuation">}</span>
    its<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&#39;modules&#39;</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span> should <span class="token keyword">include</span> <span class="token string-literal"><span class="token string">&#39;mail_ssl&#39;</span></span> <span class="token punctuation">}</span>
  <span class="token keyword">end</span>
<span class="token keyword">end</span>

control <span class="token string-literal"><span class="token string">&#39;nginx-conf-file&#39;</span></span> <span class="token keyword">do</span>
  impact <span class="token number">1.0</span>
  title <span class="token string-literal"><span class="token string">&#39;NGINX configuration file&#39;</span></span>
  desc <span class="token string-literal"><span class="token string">&#39;The NGINX config file should exist.&#39;</span></span>
  describe file<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&#39;/etc/nginx/nginx.conf&#39;</span></span><span class="token punctuation">)</span> <span class="token keyword">do</span>
    it <span class="token punctuation">{</span> should be_file <span class="token punctuation">}</span>
  <span class="token keyword">end</span>
<span class="token keyword">end</span>

control <span class="token string-literal"><span class="token string">&#39;nginx-conf-perms&#39;</span></span> <span class="token keyword">do</span>
  impact <span class="token number">1.0</span>
  title <span class="token string-literal"><span class="token string">&#39;NGINX configuration&#39;</span></span>
  desc <span class="token string-literal"><span class="token string">&#39;The NGINX config file should owned by root, be writable only by owner, and not writeable or and readable by others.&#39;</span></span>
  describe file<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&#39;/etc/nginx/nginx.conf&#39;</span></span><span class="token punctuation">)</span> <span class="token keyword">do</span>
    it <span class="token punctuation">{</span> should be_owned_by <span class="token string-literal"><span class="token string">&#39;root&#39;</span></span> <span class="token punctuation">}</span>
    it <span class="token punctuation">{</span> should be_grouped_into <span class="token string-literal"><span class="token string">&#39;root&#39;</span></span> <span class="token punctuation">}</span>
    it <span class="token punctuation">{</span> should_not be_readable<span class="token punctuation">.</span>by<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&#39;others&#39;</span></span><span class="token punctuation">)</span> <span class="token punctuation">}</span>
    it <span class="token punctuation">{</span> should_not be_writable<span class="token punctuation">.</span>by<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&#39;others&#39;</span></span><span class="token punctuation">)</span> <span class="token punctuation">}</span>
    it <span class="token punctuation">{</span> should_not be_executable<span class="token punctuation">.</span>by<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&#39;others&#39;</span></span><span class="token punctuation">)</span> <span class="token punctuation">}</span>
  <span class="token keyword">end</span>
<span class="token keyword">end</span>

control <span class="token string-literal"><span class="token string">&#39;nginx-shell-access&#39;</span></span> <span class="token keyword">do</span>
  impact <span class="token number">1.0</span>
  title <span class="token string-literal"><span class="token string">&#39;NGINX shell access&#39;</span></span>
  desc <span class="token string-literal"><span class="token string">&#39;The NGINX shell access should be restricted to admin users.&#39;</span></span>
  describe users<span class="token punctuation">.</span>shells<span class="token punctuation">(</span><span class="token regex-literal"><span class="token regex">/bash/</span></span><span class="token punctuation">)</span><span class="token punctuation">.</span>usernames <span class="token keyword">do</span>
    it <span class="token punctuation">{</span> should be_in <span class="token punctuation">[</span><span class="token string-literal"><span class="token string">&#39;admin&#39;</span></span><span class="token punctuation">]</span><span class="token punctuation">}</span>
  <span class="token keyword">end</span>
<span class="token keyword">end</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Although these rules do what you expect, imagine your control file contains dozens or hundreds of tests. As the data you check for, such as the version or which modules are installed, evolve, it can become tedious to locate and update your tests. You may also find that you repeat the same data across multiple control files.</p><p>One way to improve these tests is to use <code>inputs</code>. <code>Inputs</code> enable you to separate the <strong>logic of your tests</strong> from the <strong>data of your tests</strong>. <code>Input files</code> are typically expressed as a <code>YAML</code> file (files ending in <code>.yaml</code> or <code>.yml</code>).</p><p><code>Profile Inputs</code> exist in your profile&#39;s main directory within the <code>inspec.yml</code> for global <code>inputs</code> to be used across all the controls in your profile.</p><p>Let&#39;s create the <code>inspec.yml</code> file for our profile:</p><div class="language-yaml line-numbers-mode" data-ext="yml" data-title="yml"><pre class="language-yaml"><code><span class="token key atrule">name</span><span class="token punctuation">:</span> my_nginx
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>To access an input you will use the input keyword. You can use this anywhere in your control code.</p><p>For example:</p><div class="language-ruby line-numbers-mode" data-ext="rb" data-title="rb"><pre class="language-ruby"><code>control <span class="token string-literal"><span class="token string">&#39;nginx-version&#39;</span></span> <span class="token keyword">do</span>
  impact <span class="token number">1.0</span>
  title <span class="token string-literal"><span class="token string">&#39;NGINX version&#39;</span></span>
  desc <span class="token string-literal"><span class="token string">&#39;The required version of NGINX should be installed.&#39;</span></span>
  describe nginx <span class="token keyword">do</span>
    its<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&#39;version&#39;</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span> should cmp <span class="token operator">&gt;=</span> input<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&#39;nginx_version&#39;</span></span><span class="token punctuation">)</span> <span class="token punctuation">}</span>
  <span class="token keyword">end</span>
<span class="token keyword">end</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>For our next control we require specific modules</p><p>Example of adding an array object of servers:</p>`,14),b=n("div",{class:"language-yaml line-numbers-mode","data-ext":"yml","data-title":"yml"},[n("pre",{class:"language-yaml"},[n("code",null,[s("  "),n("span",{class:"token punctuation"},"-"),s(),n("span",{class:"token key atrule"},"name"),n("span",{class:"token punctuation"},":"),s(` servers
    `),n("span",{class:"token key atrule"},"type"),n("span",{class:"token punctuation"},":"),s(` Array
    `),n("span",{class:"token key atrule"},"value"),n("span",{class:"token punctuation"},":"),s(`
      `),n("span",{class:"token punctuation"},"-"),s(` server1
      `),n("span",{class:"token punctuation"},"-"),s(` server2
      `),n("span",{class:"token punctuation"},"-"),s(` server3
`)])]),n("div",{class:"line-numbers","aria-hidden":"true"},[n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"})])],-1),y=n("div",{class:"language-yaml line-numbers-mode","data-ext":"yml","data-title":"yml"},[n("pre",{class:"language-yaml"},[n("code",null,[s("  "),n("span",{class:"token punctuation"},"-"),s(),n("span",{class:"token key atrule"},"name"),n("span",{class:"token punctuation"},":"),s(` nginx_modules
    `),n("span",{class:"token key atrule"},"type"),n("span",{class:"token punctuation"},":"),s(` Array
    `),n("span",{class:"token key atrule"},"value"),n("span",{class:"token punctuation"},":"),s(`
      `),n("span",{class:"token punctuation"},"-"),s(` http_ssl
      `),n("span",{class:"token punctuation"},"-"),s(` stream_ssl
      `),n("span",{class:"token punctuation"},"-"),s(` mail_ssl
`)])]),n("div",{class:"line-numbers","aria-hidden":"true"},[n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"})])],-1),g=n("div",{class:"language-yaml line-numbers-mode","data-ext":"yml","data-title":"yml"},[n("pre",{class:"language-yaml"},[n("code",null,[n("span",{class:"token key atrule"},"name"),n("span",{class:"token punctuation"},":"),s(` my_nginx
`),n("span",{class:"token key atrule"},"title"),n("span",{class:"token punctuation"},":"),s(` InSpec Profile
`),n("span",{class:"token key atrule"},"maintainer"),n("span",{class:"token punctuation"},":"),s(` The Authors
`),n("span",{class:"token key atrule"},"copyright"),n("span",{class:"token punctuation"},":"),s(` The Authors
`),n("span",{class:"token key atrule"},"copyright_email"),n("span",{class:"token punctuation"},":"),s(` you@example.com
`),n("span",{class:"token key atrule"},"license"),n("span",{class:"token punctuation"},":"),s(" Apache"),n("span",{class:"token punctuation"},"-"),n("span",{class:"token number"},"2.0"),s(`
`),n("span",{class:"token key atrule"},"summary"),n("span",{class:"token punctuation"},":"),s(` An InSpec Compliance Profile
`),n("span",{class:"token key atrule"},"version"),n("span",{class:"token punctuation"},":"),s(` 0.1.0
`),n("span",{class:"token key atrule"},"supports"),n("span",{class:"token punctuation"},":"),s(`
  `),n("span",{class:"token key atrule"},"platform"),n("span",{class:"token punctuation"},":"),s(` os

`),n("span",{class:"token key atrule"},"inputs"),n("span",{class:"token punctuation"},":"),s(`
  `),n("span",{class:"token punctuation"},"-"),s(),n("span",{class:"token key atrule"},"name"),n("span",{class:"token punctuation"},":"),s(` nginx_version
    `),n("span",{class:"token key atrule"},"type"),n("span",{class:"token punctuation"},":"),s(` String
    `),n("span",{class:"token key atrule"},"value"),n("span",{class:"token punctuation"},":"),s(` 1.10.3

  `),n("span",{class:"token punctuation"},"-"),s(),n("span",{class:"token key atrule"},"name"),n("span",{class:"token punctuation"},":"),s(` nginx_modules
    `),n("span",{class:"token key atrule"},"type"),n("span",{class:"token punctuation"},":"),s(` Array
    `),n("span",{class:"token key atrule"},"value"),n("span",{class:"token punctuation"},":"),s(`
      `),n("span",{class:"token punctuation"},"-"),s(` http_ssl
      `),n("span",{class:"token punctuation"},"-"),s(` stream_ssl
      `),n("span",{class:"token punctuation"},"-"),s(` mail_ssl
`)])]),n("div",{class:"highlight-lines"},[n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("div",{class:"highlight-line"}," "),n("div",{class:"highlight-line"}," "),n("div",{class:"highlight-line"}," "),n("div",{class:"highlight-line"}," "),n("div",{class:"highlight-line"}," "),n("div",{class:"highlight-line"}," ")]),n("div",{class:"line-numbers","aria-hidden":"true"},[n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"})])],-1),h=i(`<p>Your control can be changed to look like this:</p><div class="language-ruby line-numbers-mode" data-ext="rb" data-title="rb"><pre class="language-ruby"><code>control <span class="token string-literal"><span class="token string">&#39;nginx-modules&#39;</span></span> <span class="token keyword">do</span>
  impact <span class="token number">1.0</span>
  title <span class="token string-literal"><span class="token string">&#39;NGINX modules&#39;</span></span>
  desc <span class="token string-literal"><span class="token string">&#39;The required NGINX modules should be installed.&#39;</span></span>

  nginx_modules <span class="token operator">=</span> input<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&#39;nginx_modules&#39;</span></span><span class="token punctuation">)</span>
  
  describe nginx <span class="token keyword">do</span>
    nginx_modules<span class="token punctuation">.</span><span class="token keyword">each</span> <span class="token keyword">do</span> <span class="token operator">|</span>current_module<span class="token operator">|</span>
      its<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&#39;modules&#39;</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span> should <span class="token keyword">include</span> current_module <span class="token punctuation">}</span>
    <span class="token keyword">end</span>
  <span class="token keyword">end</span>
<span class="token keyword">end</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Lastly, we can edit our <code>inspec.yml</code> file to create a list of admin users:</p>`,3),f=n("div",{class:"language-yaml line-numbers-mode","data-ext":"yml","data-title":"yml"},[n("pre",{class:"language-yaml"},[n("code",null,[s("  "),n("span",{class:"token punctuation"},"-"),s(),n("span",{class:"token key atrule"},"name"),n("span",{class:"token punctuation"},":"),s(` admin_users
    `),n("span",{class:"token key atrule"},"type"),n("span",{class:"token punctuation"},":"),s(` Array
    `),n("span",{class:"token key atrule"},"value"),n("span",{class:"token punctuation"},":"),s(`
      `),n("span",{class:"token punctuation"},"-"),s(` admin
`)])]),n("div",{class:"line-numbers","aria-hidden":"true"},[n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"})])],-1),_=n("div",{class:"language-yaml line-numbers-mode","data-ext":"yml","data-title":"yml"},[n("pre",{class:"language-yaml"},[n("code",null,[n("span",{class:"token key atrule"},"name"),n("span",{class:"token punctuation"},":"),s(` my_nginx
`),n("span",{class:"token key atrule"},"title"),n("span",{class:"token punctuation"},":"),s(` InSpec Profile
`),n("span",{class:"token key atrule"},"maintainer"),n("span",{class:"token punctuation"},":"),s(` The Authors
`),n("span",{class:"token key atrule"},"copyright"),n("span",{class:"token punctuation"},":"),s(` The Authors
`),n("span",{class:"token key atrule"},"copyright_email"),n("span",{class:"token punctuation"},":"),s(` you@example.com
`),n("span",{class:"token key atrule"},"license"),n("span",{class:"token punctuation"},":"),s(" Apache"),n("span",{class:"token punctuation"},"-"),n("span",{class:"token number"},"2.0"),s(`
`),n("span",{class:"token key atrule"},"summary"),n("span",{class:"token punctuation"},":"),s(` An InSpec Compliance Profile
`),n("span",{class:"token key atrule"},"version"),n("span",{class:"token punctuation"},":"),s(` 0.1.0
`),n("span",{class:"token key atrule"},"supports"),n("span",{class:"token punctuation"},":"),s(`
  `),n("span",{class:"token key atrule"},"platform"),n("span",{class:"token punctuation"},":"),s(` os

`),n("span",{class:"token key atrule"},"inputs"),n("span",{class:"token punctuation"},":"),s(`
  `),n("span",{class:"token punctuation"},"-"),s(),n("span",{class:"token key atrule"},"name"),n("span",{class:"token punctuation"},":"),s(` nginx_version
    `),n("span",{class:"token key atrule"},"type"),n("span",{class:"token punctuation"},":"),s(` String
    `),n("span",{class:"token key atrule"},"value"),n("span",{class:"token punctuation"},":"),s(` 1.10.3

  `),n("span",{class:"token punctuation"},"-"),s(),n("span",{class:"token key atrule"},"name"),n("span",{class:"token punctuation"},":"),s(` nginx_modules
    `),n("span",{class:"token key atrule"},"type"),n("span",{class:"token punctuation"},":"),s(` Array
    `),n("span",{class:"token key atrule"},"value"),n("span",{class:"token punctuation"},":"),s(`
      `),n("span",{class:"token punctuation"},"-"),s(` http_ssl
      `),n("span",{class:"token punctuation"},"-"),s(` stream_ssl
      `),n("span",{class:"token punctuation"},"-"),s(` mail_ssl

  `),n("span",{class:"token punctuation"},"-"),s(),n("span",{class:"token key atrule"},"name"),n("span",{class:"token punctuation"},":"),s(` admin_users
    `),n("span",{class:"token key atrule"},"type"),n("span",{class:"token punctuation"},":"),s(` Array
    `),n("span",{class:"token key atrule"},"value"),n("span",{class:"token punctuation"},":"),s(`
      `),n("span",{class:"token punctuation"},"-"),s(` admin
`)])]),n("div",{class:"highlight-lines"},[n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("br"),n("div",{class:"highlight-line"}," "),n("div",{class:"highlight-line"}," "),n("div",{class:"highlight-line"}," "),n("div",{class:"highlight-line"}," ")]),n("div",{class:"line-numbers","aria-hidden":"true"},[n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"})])],-1),x=i(`<p>Your fifth control can be changed to look like this:</p><div class="language-ruby line-numbers-mode" data-ext="rb" data-title="rb"><pre class="language-ruby"><code>control <span class="token string-literal"><span class="token string">&#39;nginx-shell-access&#39;</span></span> <span class="token keyword">do</span>
  impact <span class="token number">1.0</span>
  title <span class="token string-literal"><span class="token string">&#39;NGINX shell access&#39;</span></span>
  desc <span class="token string-literal"><span class="token string">&#39;The NGINX shell access should be restricted to admin users.&#39;</span></span>
  describe users<span class="token punctuation">.</span>shells<span class="token punctuation">(</span><span class="token regex-literal"><span class="token regex">/bash/</span></span><span class="token punctuation">)</span><span class="token punctuation">.</span>usernames <span class="token keyword">do</span>
    it <span class="token punctuation">{</span> should be_in input<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&#39;admin_users&#39;</span></span><span class="token punctuation">)</span><span class="token punctuation">}</span>
  <span class="token keyword">end</span>
<span class="token keyword">end</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="input-file-example" tabindex="-1"><a class="header-anchor" href="#input-file-example"><span>Input File Example</span></a></h2><p>To change your inputs for platform specific cases you can setup multiple input files.</p><p>For example, an NGINX web server could be run on a Windows or Linux machine, which may require different admin users for each context. The inputs can be tailored for each system. You can create the <code>inputs-windows.yml</code> and <code>inputs-linux.yml</code> files in your home directory.</p><div class="hint-container note"><p class="hint-container-title">Note</p><p>Another example is that a production and development environment may require different inputs.</p></div>`,6),w=n("div",{class:"language-yaml line-numbers-mode","data-ext":"yml","data-title":"yml"},[n("pre",{class:"language-yaml"},[n("code",null,[n("span",{class:"token key atrule"},"admin_users"),n("span",{class:"token punctuation"},":"),s(`
  `),n("span",{class:"token punctuation"},"-"),s(` Administrator
  `),n("span",{class:"token punctuation"},"-"),s(` Randy
`)])]),n("div",{class:"line-numbers","aria-hidden":"true"},[n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"})])],-1),A=n("div",{class:"language-yaml line-numbers-mode","data-ext":"yml","data-title":"yml"},[n("pre",{class:"language-yaml"},[n("code",null,[n("span",{class:"token key atrule"},"admin_users"),n("span",{class:"token punctuation"},":"),s(`
  `),n("span",{class:"token punctuation"},"-"),s(` root
  `),n("span",{class:"token punctuation"},"-"),s(` randy
`)])]),n("div",{class:"line-numbers","aria-hidden":"true"},[n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"})])],-1),N=n("div",{class:"language-yaml line-numbers-mode","data-ext":"yml","data-title":"yml"},[n("pre",{class:"language-yaml"},[n("code",null,[n("span",{class:"token key atrule"},"name"),n("span",{class:"token punctuation"},":"),s(` my_nginx
`),n("span",{class:"token key atrule"},"title"),n("span",{class:"token punctuation"},":"),s(` InSpec Profile
`),n("span",{class:"token key atrule"},"maintainer"),n("span",{class:"token punctuation"},":"),s(` The Authors
`),n("span",{class:"token key atrule"},"copyright"),n("span",{class:"token punctuation"},":"),s(` The Authors
`),n("span",{class:"token key atrule"},"copyright_email"),n("span",{class:"token punctuation"},":"),s(` you@example.com
`),n("span",{class:"token key atrule"},"license"),n("span",{class:"token punctuation"},":"),s(" Apache"),n("span",{class:"token punctuation"},"-"),n("span",{class:"token number"},"2.0"),s(`
`),n("span",{class:"token key atrule"},"summary"),n("span",{class:"token punctuation"},":"),s(` An InSpec Compliance Profile
`),n("span",{class:"token key atrule"},"version"),n("span",{class:"token punctuation"},":"),s(` 0.1.0
`),n("span",{class:"token key atrule"},"supports"),n("span",{class:"token punctuation"},":"),s(`
  `),n("span",{class:"token key atrule"},"platform"),n("span",{class:"token punctuation"},":"),s(` os

`),n("span",{class:"token key atrule"},"inputs"),n("span",{class:"token punctuation"},":"),s(`
  `),n("span",{class:"token punctuation"},"-"),s(),n("span",{class:"token key atrule"},"name"),n("span",{class:"token punctuation"},":"),s(` nginx_version
    `),n("span",{class:"token key atrule"},"type"),n("span",{class:"token punctuation"},":"),s(` String
    `),n("span",{class:"token key atrule"},"value"),n("span",{class:"token punctuation"},":"),s(` 1.10.3

  `),n("span",{class:"token punctuation"},"-"),s(),n("span",{class:"token key atrule"},"name"),n("span",{class:"token punctuation"},":"),s(` nginx_modules
    `),n("span",{class:"token key atrule"},"type"),n("span",{class:"token punctuation"},":"),s(` Array
    `),n("span",{class:"token key atrule"},"value"),n("span",{class:"token punctuation"},":"),s(`
      `),n("span",{class:"token punctuation"},"-"),s(` http_ssl
      `),n("span",{class:"token punctuation"},"-"),s(` stream_ssl
      `),n("span",{class:"token punctuation"},"-"),s(` mail_ssl

  `),n("span",{class:"token punctuation"},"-"),s(),n("span",{class:"token key atrule"},"name"),n("span",{class:"token punctuation"},":"),s(` admin_users
    `),n("span",{class:"token key atrule"},"type"),n("span",{class:"token punctuation"},":"),s(` Array
    `),n("span",{class:"token key atrule"},"value"),n("span",{class:"token punctuation"},":"),s(`
      `),n("span",{class:"token punctuation"},"-"),s(` admin
`)])]),n("div",{class:"line-numbers","aria-hidden":"true"},[n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"})])],-1),I=i(`<p>The following command runs the tests and applies the inputs specified, first, on the Linux system:</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>inspec <span class="token builtin class-name">exec</span> ./my_nginx <span class="token parameter variable">-t</span> docker://nginx --input-file inputs-linux.yml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>And, on our Windows systems:</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>inspec <span class="token builtin class-name">exec</span> ./my_nginx <span class="token parameter variable">-t</span> docker://nginx --input-file inputs-windows.yml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div>`,4),T={class:"hint-container details"},G=n("summary",null,"Best Practice - inputs.yml file",-1);function X(S,C){const c=o("CodeTabs"),u=o("RouterLink");return d(),k("div",null,[v,l(c,{id:"36",data:[{id:"Array Input Generic"},{id:"Array Input - NGINX Modules"},{id:"Full inspec.yml file"}],"tab-id":"shell"},{title0:a(({value:e,isActive:t})=>[s("Array Input Generic")]),title1:a(({value:e,isActive:t})=>[s("Array Input - NGINX Modules")]),title2:a(({value:e,isActive:t})=>[s("Full inspec.yml file")]),tab0:a(({value:e,isActive:t})=>[b]),tab1:a(({value:e,isActive:t})=>[y]),tab2:a(({value:e,isActive:t})=>[g]),_:1},8,["data"]),h,l(c,{id:"54",data:[{id:"Array Input - Admin Users"},{id:"Full inspec.yml file"}],"tab-id":"shell"},{title0:a(({value:e,isActive:t})=>[s("Array Input - Admin Users")]),title1:a(({value:e,isActive:t})=>[s("Full inspec.yml file")]),tab0:a(({value:e,isActive:t})=>[f]),tab1:a(({value:e,isActive:t})=>[_]),_:1},8,["data"]),x,l(c,{id:"80",data:[{id:"inputs-windows.yml"},{id:"inputs-linux.yml"},{id:"inspec.yml"}],"tab-id":"shell"},{title0:a(({value:e,isActive:t})=>[s("inputs-windows.yml")]),title1:a(({value:e,isActive:t})=>[s("inputs-linux.yml")]),title2:a(({value:e,isActive:t})=>[s("inspec.yml")]),tab0:a(({value:e,isActive:t})=>[w]),tab1:a(({value:e,isActive:t})=>[A]),tab2:a(({value:e,isActive:t})=>[N]),_:1},8,["data"]),p(` The control file:

\`\`\`ruby
control 'system-users' do
  impact 0.8
  desc 'Confirm the proper users are created on the system'

  describe users do
    its('usernames') { should eq input('users') }
  end
end
\`\`\` `),I,n("details",T,[G,n("p",null,[s("It is best practice to create a separate file for inputs when using the provided profile. The exception to this is when working with an overlay profile, which you will see in "),l(u,{to:"/courses/beginner/10.html"},{default:a(()=>[s("Section 10")]),_:1}),s(".")]),p(" If you wanted to write an input file with non default values, you can create an `inputs.yml` file. `inputs.yml` for our profile:\n\n![Alt text](../../assets/img/my_nginx_profile_create_input_file.png) ")])])}const F=r(m,[["render",X],["__file","06.html.vue"]]);export{F as default};
