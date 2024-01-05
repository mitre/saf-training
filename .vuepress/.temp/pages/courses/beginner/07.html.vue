<template><div><h2 id="inspec-control-enhancements" tabindex="-1"><a class="header-anchor" href="#inspec-control-enhancements" aria-hidden="true">#</a> InSpec Control Enhancements</h2>
<p>You should have the basic idea of how an InSpec test is written and how to leverage InSpec's built-in features to help you write tests quickly and easily. Now let's discuss some of the more powerful features available to you when writing tests to control what output is displayed to the user.</p>
<h3 id="rspec" tabindex="-1"><a class="header-anchor" href="#rspec" aria-hidden="true">#</a> RSpec</h3>
<p>The InSpec testing framework is itself built on <a href="https://rspec.info/" target="_blank" rel="noopener noreferrer">RSpec<ExternalLinkIcon/></a>, a unit testing module for Ruby. InSpec extended rspec by including features like the resources library and more user-friendly syntax for writing tests, but we can still write our tests using RSpec syntax and they will work just fine.</p>
<p>Most of the time you won't need to use RSpec syntax to write a good test. But we want to show you a few neat tricks you can accomplish with RSpec.</p>
<h3 id="rspec-explicit-subject" tabindex="-1"><a class="header-anchor" href="#rspec-explicit-subject" aria-hidden="true">#</a> RSpec Explicit Subject</h3>
<p>We will write a few tests in this section to demonstrate the difference between InSpec's default syntax and RSpec syntax.</p>
<p>Let's pretend we have a new requirement for NGINX:</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token number">6</span>. NGINX's /etc/nginx directory should not be empty.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>(It's a bit of an odd requirement, but bear with us for the sake of this example.)</p>
<p>First, we'll try a test that <em>does not</em> use RSpec syntax to illustrate the problem we want to solve:</p>
<CodeTabs id="31" :data='[{"id":"Code"},{"id":"Output"}]'>
<template #title0="{ value, isActive }">Code</template>
<template #title1="{ value, isActive }">Output</template>
<template #tab0="{ value, isActive }">
<div class="language-ruby line-numbers-mode" data-ext="rb"><pre v-pre class="language-ruby"><code>control <span class="token string-literal"><span class="token string">'Requirement 6'</span></span> <span class="token keyword">do</span>
  impact <span class="token number">1.0</span>
  title <span class="token string-literal"><span class="token string">'Checking that /etc/nginx does not return empty'</span></span>
  desc <span class="token string-literal"><span class="token string">'Let\'s do this the ugly way.'</span></span>
  describe command<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'ls -al'</span></span><span class="token punctuation">)</span><span class="token punctuation">.</span>stdout<span class="token punctuation">.</span>strip <span class="token keyword">do</span>
    it <span class="token punctuation">{</span> should_not be_empty <span class="token punctuation">}</span>
  <span class="token keyword">end</span>
<span class="token keyword">end</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></template>
<template #tab1="{ value, isActive }">
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>  ✔  Requirement <span class="token number">6</span>: Checking that /etc/nginx does not <span class="token builtin class-name">return</span> empty
     ✔  total <span class="token number">76</span>
     drwxr-xr-x   <span class="token number">1</span> root root <span class="token number">4096</span> Nov  <span class="token number">8</span> <span class="token number">20</span>:21 <span class="token builtin class-name">.</span>
     drwxr-xr-x   <span class="token number">1</span> root root <span class="token number">4096</span> Nov  <span class="token number">8</span> <span class="token number">20</span>:21 <span class="token punctuation">..</span>
     -rwxr-xr-x   <span class="token number">1</span> root root    <span class="token number">0</span> Nov  <span class="token number">8</span> <span class="token number">20</span>:21 .dockerenv
     lrwxrwxrwx   <span class="token number">1</span> root root    <span class="token number">7</span> Oct <span class="token number">30</span> 00:00 bin -<span class="token operator">></span> usr/bin
     drwxr-xr-x   <span class="token number">2</span> root root <span class="token number">4096</span> Sep <span class="token number">29</span> <span class="token number">20</span>:04 boot
     drwxr-xr-x   <span class="token number">5</span> root root  <span class="token number">360</span> Nov  <span class="token number">8</span> <span class="token number">20</span>:21 dev
     drwxr-xr-x   <span class="token number">1</span> root root <span class="token number">4096</span> Nov  <span class="token number">1</span> 05:12 docker-entrypoint.d
     -rwxrwxr-x   <span class="token number">1</span> root root <span class="token number">1620</span> Nov  <span class="token number">1</span> 05:11 docker-entrypoint.sh
     drwxr-xr-x   <span class="token number">1</span> root root <span class="token number">4096</span> Nov  <span class="token number">8</span> <span class="token number">20</span>:21 etc
     drwxr-xr-x   <span class="token number">2</span> root root <span class="token number">4096</span> Sep <span class="token number">29</span> <span class="token number">20</span>:04 home
     lrwxrwxrwx   <span class="token number">1</span> root root    <span class="token number">7</span> Oct <span class="token number">30</span> 00:00 lib -<span class="token operator">></span> usr/lib
     lrwxrwxrwx   <span class="token number">1</span> root root    <span class="token number">9</span> Oct <span class="token number">30</span> 00:00 lib32 -<span class="token operator">></span> usr/lib32
     lrwxrwxrwx   <span class="token number">1</span> root root    <span class="token number">9</span> Oct <span class="token number">30</span> 00:00 lib64 -<span class="token operator">></span> usr/lib64
     lrwxrwxrwx   <span class="token number">1</span> root root   <span class="token number">10</span> Oct <span class="token number">30</span> 00:00 libx32 -<span class="token operator">></span> usr/libx32
     drwxr-xr-x   <span class="token number">2</span> root root <span class="token number">4096</span> Oct <span class="token number">30</span> 00:00 media
     drwxr-xr-x   <span class="token number">2</span> root root <span class="token number">4096</span> Oct <span class="token number">30</span> 00:00 mnt
     drwxr-xr-x   <span class="token number">2</span> root root <span class="token number">4096</span> Oct <span class="token number">30</span> 00:00 opt
     dr-xr-xr-x <span class="token number">228</span> root root    <span class="token number">0</span> Nov  <span class="token number">8</span> <span class="token number">20</span>:21 proc
     drwx------   <span class="token number">2</span> root root <span class="token number">4096</span> Oct <span class="token number">30</span> 00:00 root
     drwxr-xr-x   <span class="token number">1</span> root root <span class="token number">4096</span> Nov  <span class="token number">8</span> <span class="token number">20</span>:21 run
     lrwxrwxrwx   <span class="token number">1</span> root root    <span class="token number">8</span> Oct <span class="token number">30</span> 00:00 sbin -<span class="token operator">></span> usr/sbin
     drwxr-xr-x   <span class="token number">2</span> root root <span class="token number">4096</span> Oct <span class="token number">30</span> 00:00 srv
     dr-xr-xr-x  <span class="token number">12</span> root root    <span class="token number">0</span> Nov  <span class="token number">8</span> <span class="token number">20</span>:21 sys
     drwxrwxrwt   <span class="token number">1</span> root root <span class="token number">4096</span> Nov  <span class="token number">1</span> 05:12 tmp
     drwxr-xr-x   <span class="token number">1</span> root root <span class="token number">4096</span> Oct <span class="token number">30</span> 00:00 usr
     drwxr-xr-x   <span class="token number">1</span> root root <span class="token number">4096</span> Oct <span class="token number">30</span> 00:00 var is expected not to be empty
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></template>
</CodeTabs>
<p>Well. . . it <em>sort of</em> works.</p>
<p>Notice how much output InSpec printed here to answer the simple question of &quot;did this command return empty?&quot; Imagine if we had done this on a directory with many files in it. We'd just be cluttering up the screen (and our report files).</p>
<div class="hint-container warning">
<p class="hint-container-title">Wait, couldn't we have just used the directory resource for this?</p>
<p>Correct. That would have been a much better way of doing this, and illustrates the general principle of &quot;don't use raw shell commands with the <code v-pre>command</code> resource unless you have to.&quot;</p>
<p>We're just doing it this way for the example.</p>
</div>
<p>If we would like to have a more detailed and cleaner feedback to our user, we can override the standard title of our describe block with a specific message that describes the intent of the test and use the <a href="https://relishapp.com/rspec/rspec-core/docs/subject/explicit-subject" target="_blank" rel="noopener noreferrer">Explicit Subject<ExternalLinkIcon/></a> to tell inspec what the &quot;subject&quot; is for the test, then, we could refactor the code like this:</p>
<CodeTabs id="56" :data='[{"id":"Code"},{"id":"Output"}]'>
<template #title0="{ value, isActive }">Code</template>
<template #title1="{ value, isActive }">Output</template>
<template #tab0="{ value, isActive }">
<div class="language-ruby line-numbers-mode" data-ext="rb"><pre v-pre class="language-ruby"><code>control <span class="token string-literal"><span class="token string">'Requirement 6'</span></span> <span class="token keyword">do</span>
  impact <span class="token number">1.0</span>
  title <span class="token string-literal"><span class="token string">'Checking that /etc/nginx does not return empty'</span></span>
  desc <span class="token string-literal"><span class="token string">'Let\'s do this the concise way.'</span></span>
  describe <span class="token string-literal"><span class="token string">"The /etc/nginx directory"</span></span> <span class="token keyword">do</span>
    subject <span class="token punctuation">{</span> command<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'ls -al'</span></span><span class="token punctuation">)</span><span class="token punctuation">.</span>stdout<span class="token punctuation">.</span>strip <span class="token punctuation">}</span>
    it <span class="token punctuation">{</span> should_not be_empty <span class="token punctuation">}</span>
  <span class="token keyword">end</span>
<span class="token keyword">end</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></template>
<template #tab1="{ value, isActive }">
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>  ✔  Requirement <span class="token number">6</span>: Checking that /etc/nginx does not <span class="token builtin class-name">return</span> empty
     ✔  The /etc/nginx directory is expected not to be empty
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></template>
</CodeTabs>
<p>Much better, right? We can override InSpec's default output to print a message that is actually useful.</p>
<div class="hint-container info">
<p class="hint-container-title">Info</p>
<p>Another benefit to using <code v-pre>subject</code> is preventing command output from being stored in the report.</p>
</div>
<h3 id="the-should-vs-expect-syntax" tabindex="-1"><a class="header-anchor" href="#the-should-vs-expect-syntax" aria-hidden="true">#</a> The <code v-pre>should</code> vs. <code v-pre>expect</code> syntax</h3>
<p>Users familiar with the RSpec testing framework may know that there are two ways to write test statements: <code v-pre>should</code> and <code v-pre>expect</code>. The RSpec community decided that <code v-pre>expect</code> is the preferred syntax.</p>
<p>InSpec recommends the <code v-pre>should</code> syntax as it tends to read more easily. However, there are times when the <code v-pre>expect</code> syntax will communicate much more clearly to the end-user. InSpec will continue to support both methods of writing tests.</p>
<p>Let's copy the <code v-pre>describe</code> shown below directly into our <code v-pre>example.rb</code> file (we don't need to wrap them in a <code v-pre>control</code> block for this section). Consider this <code v-pre>describe</code> block from your <code v-pre>my_nginx</code> profile:</p>
<CodeTabs id="84" :data='[{"id":"Code"},{"id":"Output"}]'>
<template #title0="{ value, isActive }">Code</template>
<template #title1="{ value, isActive }">Output</template>
<template #tab0="{ value, isActive }">
<div class="language-ruby line-numbers-mode" data-ext="rb"><pre v-pre class="language-ruby"><code>describe file<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'/etc/nginx/nginx.conf'</span></span><span class="token punctuation">)</span> <span class="token keyword">do</span>
  it <span class="token punctuation">{</span> should be_file <span class="token punctuation">}</span>
<span class="token keyword">end</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></template>
<template #tab1="{ value, isActive }">
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>File /etc/nginx/nginx.conf
   ✔  should be a <span class="token function">file</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></template>
</CodeTabs>
<p>This can be re-written with expect syntax.</p>
<CodeTabs id="95" :data='[{"id":"Code"},{"id":"Output"}]'>
<template #title0="{ value, isActive }">Code</template>
<template #title1="{ value, isActive }">Output</template>
<template #tab0="{ value, isActive }">
<div class="language-ruby line-numbers-mode" data-ext="rb"><pre v-pre class="language-ruby"><code>describe file<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'/etc/nginx/nginx.conf'</span></span><span class="token punctuation">)</span> <span class="token keyword">do</span>
  it <span class="token string-literal"><span class="token string">'should be a file'</span></span> <span class="token keyword">do</span>
    expect<span class="token punctuation">(</span>subject<span class="token punctuation">)</span><span class="token punctuation">.</span>to<span class="token punctuation">(</span>be_file<span class="token punctuation">)</span>
  <span class="token keyword">end</span>
<span class="token keyword">end</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></template>
<template #tab1="{ value, isActive }">
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>File /etc/nginx/nginx.conf
   ✔  should be a <span class="token function">file</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></template>
</CodeTabs>
<p>Notice that the output is the same for both the examples above.</p>
<p>In addition, you can make use of the <code v-pre>subject</code> keyword to further control your output if you choose:</p>
<CodeTabs id="109" :data='[{"id":"Code"},{"id":"Output"}]'>
<template #title0="{ value, isActive }">Code</template>
<template #title1="{ value, isActive }">Output</template>
<template #tab0="{ value, isActive }">
<div class="language-ruby line-numbers-mode" data-ext="rb"><pre v-pre class="language-ruby"><code>describe <span class="token string-literal"><span class="token string">'I can make this any string I want!'</span></span> <span class="token keyword">do</span>
  subject <span class="token punctuation">{</span> file<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'/etc/nginx/nginx.conf'</span></span><span class="token punctuation">)</span> <span class="token punctuation">}</span>
  it <span class="token string-literal"><span class="token string">'should be a file'</span></span> <span class="token keyword">do</span>
    expect<span class="token punctuation">(</span>subject<span class="token punctuation">)</span><span class="token punctuation">.</span>to<span class="token punctuation">(</span>be_file<span class="token punctuation">)</span>
  <span class="token keyword">end</span>
<span class="token keyword">end</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></template>
<template #tab1="{ value, isActive }">
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>  I can <span class="token function">make</span> this any string I want<span class="token operator">!</span>
     ✔  should be a <span class="token function">file</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></template>
</CodeTabs>
<div class="hint-container info">
<p class="hint-container-title">Info</p>
<p>Note that all three of the above code examples are running the same test that will pass or fail in the same circumstances — the difference is that the second two examples give more control over the message output that appears to the test performer. If you write tests that will later be executed by other people, you should be sure to write descriptive test output!</p>
</div>
<p>Reference: <a href="https://docs.chef.io/inspec/profiles/" target="_blank" rel="noopener noreferrer">https://docs.chef.io/inspec/profiles/<ExternalLinkIcon/></a></p>
<h3 id="expect-syntax-with-a-failure-message" tabindex="-1"><a class="header-anchor" href="#expect-syntax-with-a-failure-message" aria-hidden="true">#</a> <code v-pre>expect</code> syntax with a failure message</h3>
<p>In addition to using an <code v-pre>expect</code> statement, a failure message can be added to provide a meaningful output to the end user.</p>
<p>Consider this shell access test from your nginx profile:</p>
<CodeTabs id="134" :data='[{"id":"Code"},{"id":"Output"}]'>
<template #title0="{ value, isActive }">Code</template>
<template #title1="{ value, isActive }">Output</template>
<template #tab0="{ value, isActive }">
<div class="language-ruby line-numbers-mode" data-ext="rb"><pre v-pre class="language-ruby"><code>describe users<span class="token punctuation">.</span>shells<span class="token punctuation">(</span><span class="token regex-literal"><span class="token regex">/bash/</span></span><span class="token punctuation">)</span><span class="token punctuation">.</span>usernames <span class="token keyword">do</span>
  it <span class="token punctuation">{</span> should be_in input<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'admin_users'</span></span><span class="token punctuation">)</span><span class="token punctuation">}</span>
<span class="token keyword">end</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></template>
<template #tab1="{ value, isActive }">
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>  <span class="token punctuation">[</span><span class="token string">"root"</span><span class="token punctuation">]</span>
     ×  is expected to be <span class="token keyword">in</span> <span class="token string">"admin"</span>
     expected <span class="token variable"><span class="token variable">`</span><span class="token punctuation">[</span><span class="token string">"root"</span><span class="token punctuation">]</span><span class="token variable">`</span></span> to be <span class="token keyword">in</span> the list: <span class="token variable"><span class="token variable">`</span><span class="token punctuation">[</span><span class="token string">"admin"</span><span class="token punctuation">]</span><span class="token variable">`</span></span> 
     Diff:
      <span class="token punctuation">[</span><span class="token string">"root"</span><span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></template>
</CodeTabs>
<p>Again, this is a valid test, and will return the right pass/fail answer when run, but it is difficult for a person to parse if they were not the author (&quot;The root user is supposed to be 'in' the admin user? What does that mean?!&quot;).</p>
<p>The output of a test like this can be refined to provide a cleaner output to the user. This can be done using a custom failure message:</p>
<CodeTabs id="148" :data='[{"id":"Code"},{"id":"Output"}]'>
<template #title0="{ value, isActive }">Code</template>
<template #title1="{ value, isActive }">Output</template>
<template #tab0="{ value, isActive }">
<div class="language-ruby line-numbers-mode" data-ext="rb"><pre v-pre class="language-ruby"><code>non_admin_users <span class="token operator">=</span> users<span class="token punctuation">.</span>shells<span class="token punctuation">(</span><span class="token regex-literal"><span class="token regex">/bash/</span></span><span class="token punctuation">)</span><span class="token punctuation">.</span>usernames
describe <span class="token string-literal"><span class="token string">"Shell access for non-admin users"</span></span> <span class="token keyword">do</span>
  it <span class="token string-literal"><span class="token string">"should be removed."</span></span> <span class="token keyword">do</span>
    failure_message <span class="token operator">=</span> <span class="token string-literal"><span class="token string">"These non-admin should not have shell access: </span><span class="token interpolation"><span class="token delimiter punctuation">#{</span><span class="token content">non_admin_users<span class="token punctuation">.</span>join<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">", "</span></span><span class="token punctuation">)</span></span><span class="token delimiter punctuation">}</span></span><span class="token string">"</span></span>
    expect<span class="token punctuation">(</span>non_admin_users<span class="token punctuation">)</span><span class="token punctuation">.</span>to eq<span class="token punctuation">(</span>input<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'admin_users'</span></span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">,</span> failure_message
  <span class="token keyword">end</span>
<span class="token keyword">end</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></template>
<template #tab1="{ value, isActive }">
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>  Shell access <span class="token keyword">for</span> non-admin <span class="token function">users</span>
     ×  should be removed.
     These non-admin should not have shell access: root
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></template>
</CodeTabs>
<p>The <code v-pre>failure_message</code> variable in the above <code v-pre>describe</code> block is assigned a value by pure Ruby assignment. Remember how we said that, since InSpec is built on Ruby, any Ruby syntax will work inside an InSpec test? Ruby's string formatting syntax (the <code v-pre>#{non_admin_users.join(&quot;, &quot;)}</code>) can create a string that lists the users who fail the test by having shell access when they shouldn't.</p>
<div class="hint-container tip">
<p class="hint-container-title">Writing good failure messages</p>
<p>The trick to writing useful failure messages is to use Ruby to find the <em>subset</em> of all elements we are testing (here, the users) that actually fail the test. We don't need to print a statement for <em>every array element we tested;</em> we only need to print a statement that shows the elements that failed.</p>
</div>
<h3 id="expect-syntax-and-password-hashes" tabindex="-1"><a class="header-anchor" href="#expect-syntax-and-password-hashes" aria-hidden="true">#</a> <code v-pre>Expect</code> syntax and Password Hashes</h3>
<p>Here's another example -- we have an InSpec test that checks if passwords are SHA512 hashes.</p>
<p>As we said, when possible, and when there is a high change of a large set only having a few offending items, attempt to find only those items that could be outside our requirements. If there are none -- wonderful! We met our requirement.</p>
<div class="language-ruby line-numbers-mode" data-ext="rb"><pre v-pre class="language-ruby"><code>bad_users <span class="token operator">=</span> inspec<span class="token punctuation">.</span>shadow<span class="token punctuation">.</span>where <span class="token punctuation">{</span> password <span class="token operator">!=</span> <span class="token string-literal"><span class="token string">"*"</span></span> <span class="token operator">&amp;&amp;</span> password <span class="token operator">!=</span> <span class="token string-literal"><span class="token string">"!"</span></span> <span class="token operator">&amp;&amp;</span> password <span class="token operator">!~</span> <span class="token regex-literal"><span class="token regex">/\$6\$/</span></span> <span class="token punctuation">}</span><span class="token punctuation">.</span>users <span class="token comment"># note that SHA12-encrypted passwords are marked by starting with '$6$' in /etc/shadow</span>

describe <span class="token string-literal"><span class="token string">'Password hashes in /etc/shadow'</span></span> <span class="token keyword">do</span>
  it <span class="token string-literal"><span class="token string">'should only contain SHA512 hashes'</span></span> <span class="token keyword">do</span>
    failure_message <span class="token operator">=</span> <span class="token string-literal"><span class="token string">"Users without SHA512 hashes: </span><span class="token interpolation"><span class="token delimiter punctuation">#{</span><span class="token content">bad_users<span class="token punctuation">.</span>join<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">', '</span></span><span class="token punctuation">)</span></span><span class="token delimiter punctuation">}</span></span><span class="token string">"</span></span>
    expect<span class="token punctuation">(</span>bad_users<span class="token punctuation">)</span><span class="token punctuation">.</span>to be_empty<span class="token punctuation">,</span> failure_message
  <span class="token keyword">end</span>
<span class="token keyword">end</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="using-multiple-resources-for-one-test" tabindex="-1"><a class="header-anchor" href="#using-multiple-resources-for-one-test" aria-hidden="true">#</a> Using Multiple Resources For One Test</h3>
<p>The <code v-pre>file</code> resource is perfect for looking at single files and their properties. However, it does not look at <em>groups</em> of files. To do that, we need to use multiple resources in concert.</p>
<p>Take a look at this example from a profile for use in AWS virtual machines. We use the <code v-pre>command</code> resource to run the <code v-pre>find</code> command and then use the <code v-pre>file</code> resource to investigate each result. Using multiple resources together is one of the key values InSpec provides, allowing you to get at just the data you need when you need it.</p>
<div class="language-ruby line-numbers-mode" data-ext="rb"><pre v-pre class="language-ruby"><code>command<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'find ~/* -type f -maxdepth 0 -xdev'</span></span><span class="token punctuation">)</span><span class="token punctuation">.</span>stdout<span class="token punctuation">.</span>split<span class="token punctuation">.</span><span class="token keyword">each</span> <span class="token keyword">do</span> <span class="token operator">|</span>fname<span class="token operator">|</span>  <span class="token comment"># we need to be careful about using 'find' --</span>
                                                                            <span class="token comment"># there could be a LOT of output if we are not specific enough with the search!</span>
  describe file<span class="token punctuation">(</span>fname<span class="token punctuation">)</span> <span class="token keyword">do</span>
    its<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'owner'</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span> should cmp <span class="token string-literal"><span class="token string">'ec2-user'</span></span> <span class="token punctuation">}</span>
  <span class="token keyword">end</span>
<span class="token keyword">end</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="hint-container warning">
<p class="hint-container-title">Avoid Large Sets or 'Check Everyone at the Door' Approaches</p>
<p>For IO intensive (full filesystem, or global scans) or large scale processes, try to be as specific as possible with your searches. Think about using 'negative logic' vs 'positive logic' - &quot;Find me all the items outside my target set&quot; vs &quot;Look at each item in the set and ensure it has these properties&quot;.</p>
<p>This 'find the outsiders' vs 'check everyone at the door' approach can really speed things along. Again, keep your data set as small as possible, don't inspect more than the requirements require!</p>
</div>
</div></template>


