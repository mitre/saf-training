<template><h2 id="exploring-the-inspec-shell" tabindex="-1"><a class="header-anchor" href="#exploring-the-inspec-shell" aria-hidden="true">#</a> Exploring the InSpec Shell</h2>
<p>Before we test our NGINX configuration, let's plan which resources and matchers we'll need.</p>
<p>When writing InSpec code, many resources are available to you.</p>
<ul>
<li>You can <a href="https://www.inspec.io/docs/" target="_blank" rel="noopener noreferrer">explore the InSpec documentation<ExternalLinkIcon/></a> to see which resources and matchers are available.</li>
<li>You can <a href="https://github.com/inspec/inspec" target="_blank" rel="noopener noreferrer">examine the source code<ExternalLinkIcon/></a> to see what's available. For example, you can see how file and other InSpec resources are implemented.</li>
<li>You can also use examples, such as profiles provided on <a href="https://supermarket.chef.io/tools-directory" target="_blank" rel="noopener noreferrer">Chef Supermarket<ExternalLinkIcon/></a>, as a guide.</li>
</ul>
<p>There's also <a href="https://www.inspec.io/docs/reference/shell/" target="_blank" rel="noopener noreferrer">InSpec shell<ExternalLinkIcon/></a>, which enables you to explore InSpec interactively. In this part, you'll use the InSpec shell to discover which resources you can use to test your NGINX configuration.</p>
<p>You're not required to use InSpec shell to develop your profiles. Some users find the InSpec shell to be a useful way to get immediate feedback and explore what's available. You can also use InSpec shell to debug your profiles.</p>
<h3 id="entering-the-inspec-shell" tabindex="-1"><a class="header-anchor" href="#entering-the-inspec-shell" aria-hidden="true">#</a> Entering the InSpec shell</h3>
<p>Run <code v-pre>inspec shell</code> to enter the interactive session.</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>inspec shell
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>Which should drop you into the shell, like this:</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>Welcome to the interactive InSpec Shell
To find out how to use it, type: help

You are currently running on:

    Name:      ubuntu
    Families:  debian, linux, unix
    Release:   16.04
    Arch:      x86_64
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Run <code v-pre>help</code> to see what commands are available.</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token builtin class-name">help</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>
inspec<span class="token operator">></span> <span class="token builtin class-name">help</span>
    You are currently running on:

        Name:      ubuntu
        Families:  debian, linux, unix
        Release:   <span class="token number">16.04</span>
        Arch:      x86_64

    Available commands:

        <span class="token variable"><span class="token variable">`</span><span class="token punctuation">[</span>resource<span class="token punctuation">]</span><span class="token variable">`</span></span> - run resource on target machine
        <span class="token variable"><span class="token variable">`</span><span class="token builtin class-name">help</span> resources<span class="token variable">`</span></span> - show all available resources that can be used as commands
        <span class="token variable"><span class="token variable">`</span><span class="token builtin class-name">help</span> <span class="token punctuation">[</span>resource<span class="token punctuation">]</span><span class="token variable">`</span></span> - information about a specific resource
        <span class="token variable"><span class="token variable">`</span><span class="token builtin class-name">help</span> matchers<span class="token variable">`</span></span> - show information about common matchers
        <span class="token variable"><span class="token variable">`</span><span class="token builtin class-name">exit</span><span class="token variable">`</span></span> - <span class="token builtin class-name">exit</span> the InSpec shell

    You can use resources <span class="token keyword">in</span> this environment to <span class="token builtin class-name">test</span> the target machine.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Run <code v-pre>help resources</code> to see which resources are available.</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token builtin class-name">help</span> resources
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>inspec<span class="token operator">></span> <span class="token builtin class-name">help</span> resources

         - aide_conf
         - apache
         - apache_conf
         - <span class="token function">apt</span>
         - audit_policy
         - auditd
         - auditd_conf
         <span class="token punctuation">..</span>.
         - <span class="token function">file</span>
         <span class="token punctuation">..</span>.
         - xml
         - yaml
         - yum
         - yumrepo
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>You see <code v-pre>file</code> and other resources listed.</p>
<h3 id="exploring-the-file-resource" tabindex="-1"><a class="header-anchor" href="#exploring-the-file-resource" aria-hidden="true">#</a> Exploring the <code v-pre>file</code> resource</h3>
<p>Earlier, we saw this <code v-pre>describe</code> block:</p>
<div class="language-ruby ext-rb line-numbers-mode"><pre v-pre class="language-ruby"><code>describe file<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'/tmp'</span></span><span class="token punctuation">)</span> <span class="token keyword">do</span>
  it <span class="token punctuation">{</span> should be_directory <span class="token punctuation">}</span>
<span class="token keyword">end</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Let's run a few commands from the InSpec shell to see how the <code v-pre>file</code> resource functions.</p>
<div class="custom-container tip"><p class="custom-container-title">InSpec is a DSL on top of Ruby</p>
<p>InSpec is built on the Ruby programming language. InSpec matchers are implemented as Ruby methods.</p>
</div>
<p>Run this command to list which methods are available to the <code v-pre>file</code> resource.</p>
<div class="language-ruby ext-rb line-numbers-mode"><pre v-pre class="language-ruby"><code>file<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'/tmp'</span></span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">.</span>superclass<span class="token punctuation">.</span>instance_methods<span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">.</span>sort
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>Which will give you the following output:</p>
<div class="language-ruby ext-rb line-numbers-mode"><pre v-pre class="language-ruby"><code>inspec<span class="token operator">></span> file<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'/tmp'</span></span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">.</span>superclass<span class="token punctuation">.</span>instance_methods<span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">.</span>sort

        <span class="token operator">=></span> <span class="token punctuation">[</span><span class="token symbol">:allowed?</span><span class="token punctuation">,</span>
         <span class="token symbol">:basename</span><span class="token punctuation">,</span>
         <span class="token symbol">:block_device?</span><span class="token punctuation">,</span>
         <span class="token symbol">:character_device?</span><span class="token punctuation">,</span>
         <span class="token symbol">:contain</span><span class="token punctuation">,</span>
         <span class="token symbol">:content</span><span class="token punctuation">,</span>
         <span class="token symbol">:directory?</span><span class="token punctuation">,</span>
         <span class="token operator">...</span>
         <span class="token symbol">:sticky</span><span class="token punctuation">,</span>
         <span class="token symbol">:sticky?</span><span class="token punctuation">,</span>
         <span class="token symbol">:suid</span><span class="token punctuation">,</span>
         <span class="token symbol">:symlink?</span><span class="token punctuation">,</span>
         <span class="token symbol">:to_s</span><span class="token punctuation">,</span>
         <span class="token symbol">:type</span><span class="token punctuation">,</span>
         <span class="token symbol">:uid</span><span class="token punctuation">,</span>
         <span class="token symbol">:version?</span><span class="token punctuation">,</span>
         <span class="token symbol">:writable?</span><span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>You can use the arrow or Page Up and Page Down keys to scroll through the list. When you're done, press <code v-pre>Q</code>.</p>
<div class="custom-container tip"><p class="custom-container-title">What is the InSpec Shell?</p>
<p>InSpec shell is based on a tool called <code v-pre>pry</code>. <code v-pre>pry</code> is an interactive debugging environment for ruby and is one of the ruby developers weapons against bugs.</p>
</div>
<p>Let's use the InSpec shell to explore some resources in InSpec. We will start with one of the most common elements on the system, a directory.</p>
<p>In the InSpec Shell call the <code v-pre>file.directory?</code> method.</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>file<span class="token punctuation">(</span><span class="token string">'/tmp'</span><span class="token punctuation">)</span>.directory?
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>Which will return <code v-pre>true</code>, since <code v-pre>/tmp</code> is a directry on the system.</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>inspec<span class="token operator">></span> file<span class="token punctuation">(</span><span class="token string">'/tmp'</span><span class="token punctuation">)</span>.directory?
        <span class="token operator">=</span><span class="token operator">></span> <span class="token boolean">true</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>You see that the <code v-pre>/tmp</code> directory exists on your workstation container.</p>
<p>InSpec - using rspec 'syntax sugar - exposes resource methods as matchers to make the language more logical and easy to read.</p>
<p>For example, the <code v-pre>file.directory?</code> method becomes the <code v-pre>be_directory</code> matcher, and the <code v-pre>file.readable?</code> method becomes the <code v-pre>be_readable</code> matcher. In fact any defined method with a <code v-pre>?</code> at the end will be turned into a <code v-pre>be_method-name</code> matcher in InSpec.</p>
<div class="custom-container tip"><p class="custom-container-title">Following the `boolean ?` convention is key</p>
<p>Given what we have just learned, the <code v-pre>best practice</code> of always having any method with a <code v-pre>?</code> at the end <em>always</em> return something that evaluates to <code v-pre>true</code> or <code v-pre>false</code> and is critical in InSpec and rSpec if you want your resources to function correctly. In Ruby, <code v-pre>false</code> and <code v-pre>nil</code> are <code v-pre>false</code>; everything else evaluates to <code v-pre>true</code>.</p>
<p>See <a href="http://ruby-for-beginners.rubymonstas.org/objects/predicates.html" target="_blank" rel="noopener noreferrer">Ruby predicate methods<ExternalLinkIcon/></a> to learn more...</p>
</div>
<p>The InSpec shell understands the structure of blocks. This enables you to run mutiline code. As an example, run the entire <code v-pre>describe</code> block like this.</p>
<div class="language-ruby ext-rb line-numbers-mode"><pre v-pre class="language-ruby"><code>describe file<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'/tmp'</span></span><span class="token punctuation">)</span> <span class="token keyword">do</span>
  it <span class="token punctuation">{</span> should be_directory <span class="token punctuation">}</span>
<span class="token keyword">end</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Which will run the entire block of code in the InSpec Shell and return the result.</p>
<div class="language-ruby ext-rb line-numbers-mode"><pre v-pre class="language-ruby"><code>inspec<span class="token operator">></span> describe file<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'/tmp'</span></span><span class="token punctuation">)</span> <span class="token keyword">do</span>
inspec<span class="token operator">></span>  it <span class="token punctuation">{</span> should be_directory <span class="token punctuation">}</span>
inspec<span class="token operator">></span> <span class="token keyword">end</span>

<span class="token symbol">Profile</span><span class="token operator">:</span> inspec<span class="token operator">-</span>shell
<span class="token symbol">Version</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token keyword">not</span> specified<span class="token punctuation">)</span>

<span class="token builtin">File</span> <span class="token operator">/</span>tmp
  ✔  should be directory

Test Summary<span class="token operator">:</span> <span class="token number">1</span> successful<span class="token punctuation">,</span> <span class="token number">0</span> failures<span class="token punctuation">,</span> <span class="token number">0</span> skipped
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>In practice, you don't typically run controls interactively this way for day to day use, but it is a great way to test out your ideas, find bugs or validate your approach before running a scan in it entirety on a target of evaluation.</p>
<h3 id="explore-the-nginx-resource" tabindex="-1"><a class="header-anchor" href="#explore-the-nginx-resource" aria-hidden="true">#</a> Explore The nginx Resource</h3>
<p>Now's a good time to define the requirements for our NGINX configuration. Let's say that you require:</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token number">1</span>. NGINX version <span class="token number">1.10</span>.3 or later.
<span class="token number">2</span>. the following NGINX modules should be installed:
   * <span class="token variable"><span class="token variable">`</span>http_ssl<span class="token variable">`</span></span>
   * <span class="token variable"><span class="token variable">`</span>stream_ssl<span class="token variable">`</span></span>
   * <span class="token variable"><span class="token variable">`</span>mail_ssl<span class="token variable">`</span></span>
<span class="token number">3</span>. the NGINX configuration <span class="token function">file</span> - <span class="token variable"><span class="token variable">`</span>/etc/nginx/nginx.conf<span class="token variable">`</span></span>- should:
   * be owned by the <span class="token variable"><span class="token variable">`</span>root<span class="token variable">`</span></span> user and group.
   * not be readable, writeable, or executable by others.

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Let's see what resources are available to help define these requirements as InSpec controls.</p>
<p>Run <code v-pre>help resources</code> a second time.</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token builtin class-name">help</span> resources
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>Notice InSpec provides two built-in resources to support NGINX – <code v-pre>nginx</code> and <code v-pre>nginx_conf</code>.</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>inspec<span class="token operator">></span> <span class="token builtin class-name">help</span> resources

         - aide_conf
         - apache
         - apache_conf
         - <span class="token function">apt</span>
         <span class="token punctuation">..</span>.
         - nginx
         - nginx_conf
         <span class="token punctuation">..</span>.
         - xml
         - yaml
         - yum
         - yumrepo
         - zfs_dataset
         - zfs_pool
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Run <code v-pre>nginx.methods</code>,</p>
<div class="language-ruby ext-rb line-numbers-mode"><pre v-pre class="language-ruby"><code>nginx<span class="token punctuation">.</span>methods
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>You see the <code v-pre>version</code> and <code v-pre>modules</code> methods.</p>
<p>You'll use these methods to define the first two requirements.</p>
<div class="language-ruby ext-rb line-numbers-mode"><pre v-pre class="language-ruby"><code>inspec<span class="token operator">></span> nginx<span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">.</span>superclass<span class="token punctuation">.</span>instance_methods<span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">.</span>sort

        <span class="token operator">=></span> <span class="token punctuation">[</span><span class="token symbol">:bin_dir</span><span class="token punctuation">,</span>
         <span class="token symbol">:compiler_info</span><span class="token punctuation">,</span>
         <span class="token symbol">:error_log_path</span><span class="token punctuation">,</span>
         <span class="token symbol">:http_client_body_temp_path</span><span class="token punctuation">,</span>
         <span class="token symbol">:http_fastcgi_temp_path</span><span class="token punctuation">,</span>
         <span class="token symbol">:http_log_path</span><span class="token punctuation">,</span>
         <span class="token symbol">:http_proxy_temp_path</span><span class="token punctuation">,</span>
         <span class="token symbol">:http_scgi_temp_path</span><span class="token punctuation">,</span>
         <span class="token symbol">:http_uwsgi_temp_path</span><span class="token punctuation">,</span>
         <span class="token symbol">:lock_path</span><span class="token punctuation">,</span>
         <span class="token symbol">:modules</span><span class="token punctuation">,</span>
         <span class="token symbol">:modules_path</span><span class="token punctuation">,</span>
         <span class="token symbol">:openssl_version</span><span class="token punctuation">,</span>
         <span class="token operator">...</span>
         <span class="token symbol">:to_s</span><span class="token punctuation">,</span>
         <span class="token symbol">:version</span><span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Run <code v-pre>nginx.version</code> to see what result you get.</p>
<div class="language-ruby ext-rb line-numbers-mode"><pre v-pre class="language-ruby"><code>nginx<span class="token punctuation">.</span>version
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-ruby ext-rb line-numbers-mode"><pre v-pre class="language-ruby"><code>inspec<span class="token operator">></span> nginx<span class="token punctuation">.</span>version

        <span class="token symbol">NoMethodError</span><span class="token operator">:</span> undefined method `<span class="token punctuation">[</span><span class="token punctuation">]</span>' <span class="token keyword">for</span> <span class="token keyword">nil</span><span class="token symbol">:NilClass</span>
        from <span class="token operator">/</span>opt<span class="token operator">/</span>inspec<span class="token operator">/</span>embedded<span class="token operator">/</span>lib<span class="token operator">/</span>ruby<span class="token operator">/</span>gems<span class="token operator">/</span><span class="token number">2.4</span><span class="token number">.0</span><span class="token operator">/</span>gems<span class="token operator">/</span>inspec<span class="token operator">-</span><span class="token number">2.0</span><span class="token number">.17</span><span class="token operator">/</span>lib<span class="token regex-literal"><span class="token regex">/resources/nginx</span></span><span class="token punctuation">.</span>rb<span class="token operator">:</span><span class="token number">39</span><span class="token symbol">:in</span> `block <span class="token punctuation">(</span><span class="token number">2</span> levels<span class="token punctuation">)</span> <span class="token keyword">in</span> <span class="token operator">&lt;</span><span class="token keyword">class</span><span class="token symbol">:Nginx</span><span class="token operator">></span>'
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container warning"><p class="custom-container-title">Expected Error Ahead</p>
<p>Recall that you're working on your workstation  environment, which does not have NGINX installed.</p>
</div>
<p>Run the following, and we can verify this with Inspec:</p>
<div class="language-ruby ext-rb line-numbers-mode"><pre v-pre class="language-ruby"><code>package<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'nginx'</span></span><span class="token punctuation">)</span><span class="token punctuation">.</span>installed<span class="token operator">?</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>As you can see we get <code v-pre>false</code> - since nginx is not installed on your <code v-pre>runner</code>.</p>
<div class="language-ruby ext-rb line-numbers-mode"><pre v-pre class="language-ruby"><code>inspec<span class="token operator">></span> package<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'nginx'</span></span><span class="token punctuation">)</span><span class="token punctuation">.</span>installed<span class="token operator">?</span>

        <span class="token operator">=></span> <span class="token boolean">false</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Now that we have explored and discovered the resource methods we need – <code v-pre>version</code> and <code v-pre>modules</code> – let's run InSpec shell commands against the target that does have NGINX installed to see what results we find.</p>
<p>To do so, first start by exiting your InSpec shell session.</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>inspec> exit
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>Run <code v-pre>inspec shell</code> a second time and this time, provide the <code v-pre>-t</code> argument to connect the shell session to the target container.</p>
<p>First let's find our nginx container id using the <code v-pre>docker ps</code> command:</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker</span> <span class="token function">ps</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>Which will return something like:</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>➜  course git:<span class="token punctuation">(</span>master<span class="token punctuation">)</span> ✗ <span class="token function">docker</span> <span class="token function">ps</span>
CONTAINER ID   IMAGE          COMMAND                  CREATED          STATUS          PORTS                NAMES
d4bcef5bb9e3   nginx:latest   <span class="token string">"/docker-entrypoint.…"</span>   <span class="token number">23</span> seconds ago   Up <span class="token number">22</span> seconds   <span class="token number">80</span>/tcp               nifty_shtern
4f0ceb9b5974   nginx:latest   <span class="token string">"/docker-entrypoint.…"</span>   <span class="token number">2</span> months ago     Up <span class="token number">45</span> seconds   <span class="token number">0.0</span>.0.0:80-<span class="token operator">></span><span class="token number">80</span>/tcp   nginx
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>We can then use the container id of our nginx container to target the inspec shell at that container.</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>inspec shell -t docker://CONTAINER_ID
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>InSpec will then return at the Shell Prompt as before but this time we see we are on our container.</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>Welcome to the interactive InSpec Shell
To <span class="token function">find</span> out how to use it, type: <span class="token builtin class-name">help</span>

You are currently running on:

    Name:      debian
    Families:  debian, linux, unix, os
    Release:   <span class="token number">11.2</span>
    Arch:      aarch64

inspec<span class="token operator">></span> 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Remember that the target does not have InSpec installed on it. Your shell session exists on the workstation; InSpec routes commands to the target instance over Docker.</p>
<p>Run the <code v-pre>package</code> resource a second time, this time on the target container.</p>
<div class="language-ruby ext-rb line-numbers-mode"><pre v-pre class="language-ruby"><code>package<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'nginx'</span></span><span class="token punctuation">)</span><span class="token punctuation">.</span>installed<span class="token operator">?</span>'
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>As you can see, how the InSpec <code v-pre>package</code> resources returns <code v-pre>true</code>.</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>inspec> package('nginx').installed?

        => true
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Now, let's get the <code v-pre>version</code> of NGINX that is installed on the target, run: <code v-pre>nginx.version</code></p>
<div class="language-ruby ext-rb line-numbers-mode"><pre v-pre class="language-ruby"><code>nginx<span class="token punctuation">.</span>version
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>You see that version 1.10.3 was installed on our container.</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>inspec> nginx.version

        => "1.10.3"
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>To complete the example, let's see which <code v-pre>modules</code> are enabled on the nginx container. Run <code v-pre>nginx.modules</code> to list the installed NGINX modules.</p>
<div class="language-ruby ext-rb line-numbers-mode"><pre v-pre class="language-ruby"><code>nginx<span class="token punctuation">.</span>modules
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>You see below - and hopefully on the data you got back on your container - that the required modules, <code v-pre>http_ssl</code>, <code v-pre>stream_ssl</code>, and <code v-pre>mail_ssl</code>, are installed.</p>
<div class="language-ruby ext-rb line-numbers-mode"><pre v-pre class="language-ruby"><code>inspec<span class="token operator">></span> nginx<span class="token punctuation">.</span>modules

        <span class="token operator">=></span> <span class="token punctuation">[</span><span class="token string-literal"><span class="token string">"http_ssl"</span></span><span class="token punctuation">,</span>
         <span class="token string-literal"><span class="token string">"http_stub_status"</span></span><span class="token punctuation">,</span>
         <span class="token string-literal"><span class="token string">"http_realip"</span></span><span class="token punctuation">,</span>
         <span class="token string-literal"><span class="token string">"http_auth_request"</span></span><span class="token punctuation">,</span>
         <span class="token string-literal"><span class="token string">"http_addition"</span></span><span class="token punctuation">,</span>
         <span class="token string-literal"><span class="token string">"http_dav"</span></span><span class="token punctuation">,</span>
         <span class="token string-literal"><span class="token string">"http_geoip"</span></span><span class="token punctuation">,</span>
         <span class="token string-literal"><span class="token string">"http_gunzip"</span></span><span class="token punctuation">,</span>
         <span class="token string-literal"><span class="token string">"http_gzip_static"</span></span><span class="token punctuation">,</span>
         <span class="token string-literal"><span class="token string">"http_image_filter"</span></span><span class="token punctuation">,</span>
         <span class="token string-literal"><span class="token string">"http_v2"</span></span><span class="token punctuation">,</span>
         <span class="token string-literal"><span class="token string">"http_sub"</span></span><span class="token punctuation">,</span>
         <span class="token string-literal"><span class="token string">"http_xslt"</span></span><span class="token punctuation">,</span>
         <span class="token string-literal"><span class="token string">"stream_ssl"</span></span><span class="token punctuation">,</span>
         <span class="token string-literal"><span class="token string">"mail_ssl"</span></span><span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>The <a href="https://www.inspec.io/docs/reference/resources/nginx_conf/" target="_blank" rel="noopener noreferrer">nginx_conf<ExternalLinkIcon/></a> resource examines the contents of the NGINX configuration file, <code v-pre>/etc/nginx/nginx.conf</code>.</p>
<p>Recall that the third requirement is to check whether the NGINX configuration file is owned by <code v-pre>root</code> and is not readable, writeable, or executable by others. Because we want to test attributes of the file itself, and not its contents, you'll use the <code v-pre>file</code> resource.</p>
<p>You saw earlier how the <code v-pre>file</code> resource provides the <code v-pre>readable</code>, <code v-pre>writeable</code>, and <code v-pre>executable</code> methods. You would also see that the <code v-pre>file</code> resource provides the <code v-pre>owned_by</code> and <code v-pre>grouped_into</code> methods.</p>
<div class="language-ruby ext-rb line-numbers-mode"><pre v-pre class="language-ruby"><code>inspec<span class="token operator">></span> file<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'/tmp'</span></span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">.</span>superclass<span class="token punctuation">.</span>instance_methods<span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">.</span>sort

        <span class="token operator">=></span> <span class="token punctuation">[</span><span class="token symbol">:allowed?</span><span class="token punctuation">,</span>
         <span class="token symbol">:directory?</span><span class="token punctuation">,</span>
         <span class="token symbol">:executable?</span><span class="token punctuation">,</span>
         <span class="token symbol">:exist?</span><span class="token punctuation">,</span>
         <span class="token symbol">:file</span><span class="token punctuation">,</span>
         <span class="token symbol">:file?</span><span class="token punctuation">,</span>
         <span class="token symbol">:file_version</span><span class="token punctuation">,</span>
         <span class="token symbol">:gid</span><span class="token punctuation">,</span>
         <span class="token symbol">:group</span><span class="token punctuation">,</span>
         <span class="token symbol">:grouped_into?</span><span class="token punctuation">,</span>
         <span class="token operator">...</span>
         <span class="token symbol">:owned_by?</span><span class="token punctuation">,</span>
         <span class="token operator">...</span>
         <span class="token symbol">:readable?</span><span class="token punctuation">,</span>
         <span class="token operator">...</span>
         <span class="token symbol">:to_s</span><span class="token punctuation">,</span>
         <span class="token symbol">:type</span><span class="token punctuation">,</span>
         <span class="token symbol">:uid</span><span class="token punctuation">,</span>
         <span class="token symbol">:version?</span><span class="token punctuation">,</span>
         <span class="token symbol">:writable?</span><span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>These 5 <code v-pre>file</code> methods – <code v-pre>grouped_into</code>, <code v-pre>executable</code>, <code v-pre>owned_by</code>, <code v-pre>readable</code> and <code v-pre>writeable</code> – provide everything we need for the third requirement.</p>
<p>Exit the InSpec shell session.</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>inspec<span class="token operator">></span> <span class="token builtin class-name">exit</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></template>
