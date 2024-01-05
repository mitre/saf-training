<template><div><h2 id="_8-run-inspec-nginx-example" tabindex="-1"><a class="header-anchor" href="#_8-run-inspec-nginx-example" aria-hidden="true">#</a> 8. Run InSpec - NGINX Example</h2>
<h3 id="_8-1-example-running-an-inspec-profile-directly-from-github" tabindex="-1"><a class="header-anchor" href="#_8-1-example-running-an-inspec-profile-directly-from-github" aria-hidden="true">#</a> 8.1. Example running an InSpec profile directly from Github</h3>
<p>In this module, we use NGINX for learning purposes. If you're interested in NGINX specifically, you may be interested in the <a href="https://github.com/mitre/nginx-stigready-baseline" target="_blank" rel="noopener noreferrer">MITRE nginx-stigready-baseline<ExternalLinkIcon/></a> profile on GitHub.</p>
<details class="hint-container details"><summary>Alternative profiles</summary>
<p>Alternatively, you may also check out the <a href="https://supermarket.chef.io/tools/nginx-baseline" target="_blank" rel="noopener noreferrer">DevSec Nginx Baseline<ExternalLinkIcon/></a> profile on Chef Supermarket.</p>
<p>To execute the Chef Supermarket profile on your target system, run this <code v-pre>inspec supermarket exec</code> command.</p>
<p>Sometimes, there are multiple profiles available for the same software component. This could be because there are different people or teams who both wrote automation content, or it could be because one profile is based on one set of guidance (such as a DISA STIG) and another profile could be based on different guidance (such as a CIS Benchmark).</p>
<p>If you see multiple profiles available and are unsure what to use, read the READMEs in each to see what guidance they are based on to understand what is most useful for your situation. You can also run mutliple profiles and compare the results to see which is more informative for your assessment. Lastly, you can always reach out to <a href="mailto:saf@groups.mitre.org">saf@groups.mitre.org</a> if you have more questions.</p>
</details>
<h3 id="_8-2-forming-the-inspec-command" tabindex="-1"><a class="header-anchor" href="#_8-2-forming-the-inspec-command" aria-hidden="true">#</a> 8.2 Forming the InSpec Command</h3>
<ul>
<li>Since we are using the profile from GitHub, we will use the GitHub link <code v-pre>https://github.com/mitre/nginx-stigready-baseline</code> to specify the profile.</li>
<li>Because we are using a Docker container that is running in our lab environment, we can specify the target as <code v-pre>-t docker://nginx</code>.</li>
<li>We can chose to output the results to the command line and to a file like this <code v-pre>--reporter cli json:./results/nginx_vanilla_results.json</code></li>
<li>We can add the inputs file that we created so the profile is tailored to our environment like this <code v-pre>--input-file inputs.yml</code></li>
</ul>
<p>To execute this command to run the GitHub profile on your target system, run this <code v-pre>inspec exec</code> command.</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>inspec <span class="token builtin class-name">exec</span> https://github.com/mitre/nginx-stigready-baseline <span class="token parameter variable">-t</span> docker://nginx --input-file inputs.yml <span class="token parameter variable">--reporter</span> cli json:./results/nginx_vanilla_results.json
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_8-3-run-the-command" tabindex="-1"><a class="header-anchor" href="#_8-3-run-the-command" aria-hidden="true">#</a> 8.3 Run the Command</h3>
<p>Enter the command from the previous step in your terminal and press enter. It will take a moment to start running.</p>
<h4 id="_8-3-1-cli-command-line-results" tabindex="-1"><a class="header-anchor" href="#_8-3-1-cli-command-line-results" aria-hidden="true">#</a> 8.3.1 CLI (Command Line) Results</h4>
<p>You should see output similar to that below. The whole profile should execute in only a couple minutes.</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>inspec <span class="token builtin class-name">exec</span> https://github.com/mitre/nginx-stigready-baseline <span class="token parameter variable">-t</span> docker://nginx --input-file inputs.yml <span class="token parameter variable">--reporter</span> cli json:./results/nginx_vanilla_results.json
<span class="token punctuation">[</span><span class="token number">2023</span>-11-01T02:41:29+00:00<span class="token punctuation">]</span> WARN: URL target https://github.com/mitre/nginx-stigready-baseline transformed to https://github.com/mitre/nginx-stigready-baseline/archive/master.tar.gz. Consider using the <span class="token function">git</span> fetcher
  <span class="token punctuation">..</span>.
     ×  is expected not to be nil
     expected: not nil
          got: nil
     ↺  This <span class="token builtin class-name">test</span> is NA because the ssl_client_certificate directive has not been configured.
  ↺  V-56029: The NGINX web server must augment re-creation to a stable and known
    baseline.
     ↺  This <span class="token builtin class-name">test</span> requires a Manual Review: Interview the SA and ask <span class="token keyword">for</span> documentation on the
         disaster recovery methods <span class="token keyword">for</span> the NGINX web server <span class="token keyword">in</span> the event of the necessity <span class="token keyword">for</span> rollback.
  ↺  V-56031: The NGINX web server must encrypt user identifiers and passwords.
     ↺  This check is NA because NGINX does not manage authentication.
  ✔  V-56033: The web server must <span class="token function">install</span> security-relevant software updates within
    the configured <span class="token function">time</span> period directed by an authoritative <span class="token builtin class-name">source</span> <span class="token punctuation">(</span>e.g., IAVM,
    CTOs, DTMs, and STIGs<span class="token punctuation">)</span>.
     ✔  NGINX version v1.25.3 installed is not <span class="token function">more</span> <span class="token keyword">then</span> one patch level behind v1.25.2 is expected to <span class="token function">cmp</span> <span class="token operator">>=</span> <span class="token string">"1.25.2"</span>
     ✔  NGINX version v1.25.3 installed is greater <span class="token keyword">then</span> or equal to the organization approved version v1.23.1 is expected to <span class="token function">cmp</span> <span class="token operator">>=</span> <span class="token string">"1.23.1"</span>
  ✔  V-56035: The NGINX web server must display a default hosted application web page, not
    a directory listing, when a requested web page cannot be found.
     ✔  The root directory /usr/share/nginx/html should include the default index.html file.
  ↺  V-61353: The web server must remove all <span class="token builtin class-name">export</span> ciphers to protect the
  confidentiality and integrity of transmitted information. <span class="token punctuation">(</span><span class="token number">2</span> skipped<span class="token punctuation">)</span>
     ↺  This <span class="token builtin class-name">test</span> is NA because the ssl_prefer_server_ciphers directive has not been configured.
     ↺  This <span class="token builtin class-name">test</span> is NA because the ssl_ciphers directive has not been configured.


Profile Summary: <span class="token number">27</span> successful controls, <span class="token number">26</span> control failures, <span class="token number">36</span> controls skipped
Test Summary: <span class="token number">137</span> successful, <span class="token number">91</span> failures, <span class="token number">55</span> skipped
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>You see that many of the tests pass, while others fail and may require investigation.</p>
<!-- You may want to extend the `nginx-baseline` with your own custom requirements. To do that, you might use what's called a _wrapper profile_. You can check out [Create a custom InSpec profile](https://learn.chef.io/modules/create-a-custom-profile#/) for a more complete example. -->
<h4 id="_8-3-2-results-saved-to-a-file" tabindex="-1"><a class="header-anchor" href="#_8-3-2-results-saved-to-a-file" aria-hidden="true">#</a> 8.3.2 Results saved to a file</h4>
<p>You should also see your results in a JSON file located in <code v-pre>/results</code> folder with the name that you specified in the command, for example <code v-pre>nginx_vanilla_results.json</code>. If you are using the lab environment GitHub codespaces, you should see it on the top left of your screen under files. Right click that file and click &quot;Download&quot; so that you have this file locally for the next steps.<br>
<img src="@source/assets/img/ResultsFolder.png" alt="The Results Folder" loading="lazy"></p>
<details class="hint-container details"><summary>More on --reporter Options</summary>
<h4 id="different-reporter-options" tabindex="-1"><a class="header-anchor" href="#different-reporter-options" aria-hidden="true">#</a> Different --reporter Options</h4>
<p>InSpec allows you to output your test results to one or more reporters. You can configure the reporter(s) using either the --json-config option or the --reporter option. While you can configure multiple reporters to write to different files, only one reporter can output to the screen(stdout).</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>$ inspec exec /root/my_nginx -t ssh://TARGET_USERNAME:TARGET_PASSWORD@TARGET_IP --reporter cli json:baseline_output.json
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="syntax" tabindex="-1"><a class="header-anchor" href="#syntax" aria-hidden="true">#</a> Syntax</h4>
<p>You can specify one or more reporters using the --reporter cli flag. You can also specify a output by appending a path separated by a colon.</p>
<p>Output json to screen.</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>inspec exec /root/my_nginx --reporter json
or
inspec exec /root/my_nginx --reporter json:-
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Output yaml to screen</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>inspec exec /root/my_nginx --reporter yaml
or
inspec exec /root/my_nginx --reporter yaml:-
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Output cli to screen and write json to a file.</p>
<p><code v-pre>inspec exec /root/my_nginx --reporter cli json:/tmp/output.json</code></p>
<p>Output nothing to screen and write junit and html to a file.</p>
<p><code v-pre>inspec exec /root/my_nginx --reporter junit:/tmp/junit.xml html:www/index.html</code></p>
<p>Output json to screen and write to a file. Write junit to a file.</p>
<p><code v-pre>inspec exec /root/my_nginx --reporter json junit:/tmp/junit.xml | tee out.json</code></p>
<p>If you wish to pass the profiles directly after specifying the reporters you will need to use the end of options flag --.</p>
<p><code v-pre>inspec exec --reporter json junit:/tmp/junit.xml -- profile1 profile2</code></p>
<p>Output cli to screen and write json to a file.</p>
<div class="language-json line-numbers-mode" data-ext="json"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="supported-reporters" tabindex="-1"><a class="header-anchor" href="#supported-reporters" aria-hidden="true">#</a> Supported Reporters</h4>
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
<p>You can read more about <a href="https://www.inspec.io/docs/reference/reporters/" target="_blank" rel="noopener noreferrer">InSpec Reporters<ExternalLinkIcon/></a> on the documentation page.</p>
</details>
</div></template>


