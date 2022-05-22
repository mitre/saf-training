<template><h2 id="_6-generating-results" tabindex="-1"><a class="header-anchor" href="#_6-generating-results" aria-hidden="true">#</a> 6. Generating Results</h2>
<p>InSpec allows you to output your test results to one or more reporters. You can configure the reporter(s) using either the --json-config option or the --reporter option. While you can configure multiple reporters to write to different files, only one reporter can output to the screen(stdout).</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>inspec <span class="token builtin class-name">exec</span> /root/my_nginx -t docker://CONTAINER_NAME --reporter cli json:baseline_output.json
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_6-1-syntax" tabindex="-1"><a class="header-anchor" href="#_6-1-syntax" aria-hidden="true">#</a> 6.1. Syntax</h3>
<p>You can specify one or more reporters using the --reporter cli flag. You can also specify a output by appending a path separated by a colon.</p>
<p>Output json to screen.</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>inspec <span class="token builtin class-name">exec</span> /root/my_nginx --reporter json
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>or</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>inspec <span class="token builtin class-name">exec</span> /root/my_nginx --reporter json:-
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>Output yaml to screen</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>inspec <span class="token builtin class-name">exec</span> /root/my_nginx --reporter yaml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>or</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>inspec <span class="token builtin class-name">exec</span> /root/my_nginx --reporter yaml:-
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>Output cli to screen and write json to a file.</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>inspec <span class="token builtin class-name">exec</span> /root/my_nginx --reporter cli json:/tmp/output.json
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>Output nothing to screen and write junit and html to a file.</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>inspec <span class="token builtin class-name">exec</span> /root/my_nginx --reporter junit:/tmp/junit.xml html:www/index.html
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>Output json to screen and write to a junit file.</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>inspec <span class="token builtin class-name">exec</span> /root/my_nginx --reporter json junit:/tmp/junit.xml <span class="token operator">|</span> <span class="token function">tee</span> out.json
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>If you wish to pass the profiles directly after specifying the reporters you will need to use the end of options flag --.</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>inspec <span class="token builtin class-name">exec</span> --reporter json junit:/tmp/junit.xml -- profile1 profile2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>Output cli to screen and write json to a file.</p>
<h4 id="inspec-config-json-file" tabindex="-1"><a class="header-anchor" href="#inspec-config-json-file" aria-hidden="true">#</a> InSpec <code v-pre>config.json</code> file</h4>
<p>InSpec also let's you capture all these in a reuaable configuration file:</p>
<div class="language-json ext-json line-numbers-mode"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">"reporter"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">"cli"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">"stdout"</span><span class="token operator">:</span> <span class="token boolean">true</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token property">"json"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">"file"</span><span class="token operator">:</span> <span class="token string">"/tmp/output.json"</span><span class="token punctuation">,</span>
      <span class="token property">"stdout"</span><span class="token operator">:</span> <span class="token boolean">false</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>You can read more about this at <a href="https://docs.chef.io/inspec/config/" target="_blank" rel="noopener noreferrer">https://docs.chef.io/inspec/config/<ExternalLinkIcon/></a></p>
<h3 id="_6-2-supported-reporters" tabindex="-1"><a class="header-anchor" href="#_6-2-supported-reporters" aria-hidden="true">#</a> 6.2. Supported Reporters</h3>
<p>The following are the current supported reporters:</p>
<ul>
<li>cli</li>
<li>json</li>
<li>json-min</li>
<li>yaml</li>
<li>documentation</li>
<li>junit</li>
<li>progress</li>
<li>json-rspec</li>
<li>html</li>
</ul>
<p>You can read more here: <a href="https://www.inspec.io/docs/reference/reporters/" target="_blank" rel="noopener noreferrer">https://www.inspec.io/docs/reference/reporters/<ExternalLinkIcon/></a></p>
<h3 id="_6-3-putting-it-all-together" tabindex="-1"><a class="header-anchor" href="#_6-3-putting-it-all-together" aria-hidden="true">#</a> 6.3. Putting it all together</h3>
<p>The following command will run the nginx baseline profile from github and use the reporter to output a json, you will need this for the next step loading it into heimdall:</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>inspec <span class="token builtin class-name">exec</span> https://github.com/dev-sec/nginx-baseline -t ssh://TARGET_USERNAME:TARGET_PASSWORD@TARGET_IP --reporter cli json:baseline_output.json
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></template>
