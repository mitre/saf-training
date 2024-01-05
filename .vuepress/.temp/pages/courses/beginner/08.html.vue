<template><div><h2 id="generating-inspec-results" tabindex="-1"><a class="header-anchor" href="#generating-inspec-results" aria-hidden="true">#</a> Generating InSpec Results</h2>
<h3 id="try-it-out" tabindex="-1"><a class="header-anchor" href="#try-it-out" aria-hidden="true">#</a> Try it out!</h3>
<p>InSpec allows you to send your test results to one or more <em>reporters</em>, or output formats. The following command outputs results to both the terminal (<code v-pre>cli</code>) and to a JSON report file (<code v-pre>json:baseline_output.json</code>).</p>
<!-- 
You can configure the reporter(s) using either the `--json-config` option or the `--reporter` option. While you can configure multiple reporters to write to different files, only one reporter can output to the screen (via stdout). -->
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>inspec <span class="token builtin class-name">exec</span> my_nginx <span class="token parameter variable">-t</span> docker://nginx <span class="token parameter variable">--reporter</span> cli json:baseline_output.json
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="generating-good-report-filenames-in-practice" tabindex="-1"><a class="header-anchor" href="#generating-good-report-filenames-in-practice" aria-hidden="true">#</a> Generating good report filenames in practice</h3>
<p>When using InSpec in practice, most users aggregate report files from multiple systems over time, so we recommend that you generate reports that specify:</p>
<ul>
<li>the target they were run against</li>
<li>a timestamp</li>
</ul>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>inspec <span class="token builtin class-name">exec</span> my_nginx <span class="token parameter variable">--reporter</span> json:nginx-<span class="token variable"><span class="token variable">$(</span><span class="token function">date</span> +<span class="token string">"%Y-%m-%d-%H-%M-%S"</span><span class="token variable">)</span></span>.json
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>Here we add a bash <code v-pre>eval</code> (the <code v-pre>$(date +&quot;%Y-%m-%d-%H-%M-%S&quot;)</code>) to our filename when we invoke <code v-pre>inspec exec</code>. Now we can run tests multiple times with the same command and get a different filename each time.</p>
<div class="hint-container caution">
<p class="hint-container-title">Caution</p>
<p>Note that if you save InSpec results to a file (such as with the <code v-pre>json</code> reporter), and then re-run the same command, you will overwrite the original contents of that file with the more recent results. Be sure that all of your reports have unique names.</p>
</div>
<h3 id="additional-reporter-examples-for-reference" tabindex="-1"><a class="header-anchor" href="#additional-reporter-examples-for-reference" aria-hidden="true">#</a> Additional Reporter Examples for Reference</h3>
<details class="hint-container details"><summary>Output JSON to screen</summary>
<CodeTabs id="42" :data='[{"id":"Command"},{"id":"Alternative Command"}]' tab-id="shell">
<template #title0="{ value, isActive }">Command</template>
<template #title1="{ value, isActive }">Alternative Command</template>
<template #tab0="{ value, isActive }">
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>inspec <span class="token builtin class-name">exec</span> my_nginx <span class="token parameter variable">--reporter</span> json
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></template>
<template #tab1="{ value, isActive }">
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>inspec <span class="token builtin class-name">exec</span> my_nginx <span class="token parameter variable">--reporter</span> json:-
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></template>
</CodeTabs>
</details>
<details class="hint-container details"><summary>Output YAML to screen</summary>
<CodeTabs id="52" :data='[{"id":"Command"},{"id":"Alternative Command"}]' tab-id="shell">
<template #title0="{ value, isActive }">Command</template>
<template #title1="{ value, isActive }">Alternative Command</template>
<template #tab0="{ value, isActive }">
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>inspec <span class="token builtin class-name">exec</span> my_nginx <span class="token parameter variable">--reporter</span> yaml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></template>
<template #tab1="{ value, isActive }">
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>inspec <span class="token builtin class-name">exec</span> my_nginx <span class="token parameter variable">--reporter</span> yaml:-
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></template>
</CodeTabs>
</details>
<details class="hint-container details"><summary>Output to screen and to a JSON file</summary>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>inspec <span class="token builtin class-name">exec</span> my_nginx <span class="token parameter variable">--reporter</span> cli json:tmp/output.json
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></details>
<details class="hint-container details"><summary>Output only to files - a junit and HTML file</summary>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>inspec <span class="token builtin class-name">exec</span> my_nginx <span class="token parameter variable">--reporter</span> junit2:tmp/junit.xml html:www/index.html
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></details>
<details class="hint-container details"><summary>Output JSON to the terminal and make a junit file</summary>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>inspec <span class="token builtin class-name">exec</span> my_nginx <span class="token parameter variable">--reporter</span> json junit2:tmp/junit.xml <span class="token operator">|</span> <span class="token function">tee</span> out.json
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></details>
<!-- How can you list two profiles? That doesn't make sense to me -->
<!-- ::: tip Flag order
If you wish to pass the profiles directly after specifying the reporters, you will need to use the end of options flag `--`:
```sh
inspec exec --reporter json junit2:tmp/junit.xml -- profile1 profile2
```
::: -->
<h3 id="using-a-configuration-file-instead-of-the-reporter-flag" tabindex="-1"><a class="header-anchor" href="#using-a-configuration-file-instead-of-the-reporter-flag" aria-hidden="true">#</a> Using a configuration file instead of the --reporter flag</h3>
<p>InSpec also lets you capture all of these reporter options in a configuration file:</p>
<div class="language-json line-numbers-mode" data-ext="json"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">"reporter"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">"cli"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">"stdout"</span><span class="token operator">:</span> <span class="token boolean">true</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token property">"json"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">"file"</span><span class="token operator">:</span> <span class="token string">"tmp/output.json"</span><span class="token punctuation">,</span>
      <span class="token property">"stdout"</span><span class="token operator">:</span> <span class="token boolean">false</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>You can read more about this at <a href="https://docs.chef.io/inspec/config/" target="_blank" rel="noopener noreferrer">https://docs.chef.io/inspec/config/<ExternalLinkIcon/></a></p>
<h3 id="supported-reporters" tabindex="-1"><a class="header-anchor" href="#supported-reporters" aria-hidden="true">#</a> Supported Reporters</h3>
<p>The following are supported reporters:</p>
<ul>
<li>cli</li>
<li>json</li>
<li>json-min</li>
<li>yaml</li>
<li>documentation</li>
<li>junit2</li>
<li>progress</li>
<li>progress-bar</li>
<li>json-rspec</li>
<li>html2</li>
<li>automate</li>
<li>json-automate</li>
</ul>
<p>You can read more here: <a href="https://www.inspec.io/docs/reference/reporters/" target="_blank" rel="noopener noreferrer">https://www.inspec.io/docs/reference/reporters/<ExternalLinkIcon/></a></p>
<details class="hint-container details"><summary>Enhanced Outcomes</summary>
<p>InSpec includes the <code v-pre>--enhanced-outcomes</code> flag to enrich the output format slightly if more detail is needed.</p>
<p>When this flag is passed, the control level status outcomes of the profile execution are <code v-pre>Passed</code>, <code v-pre>Failed</code>, <code v-pre>Not Applicable (N/A)</code>, <code v-pre>Not Reviewed (N/R)</code>, or <code v-pre>Error (ERR)</code>.</p>
</details>
<h3 id="running-profiles-from-network-locations" tabindex="-1"><a class="header-anchor" href="#running-profiles-from-network-locations" aria-hidden="true">#</a> Running Profiles from Network Locations</h3>
<p>So far, we have been executing InSpec profiles that we have written ourselves and saved to the local machine. InSpec also gives you the ability to execute a profile that lives on the other end of an HTTP/S link or a <code v-pre>.git</code> link.</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>inspec <span class="token builtin class-name">exec</span> https://github.com/mitre/nginx-stigready-baseline <span class="token parameter variable">-t</span> docker://nginx
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="hint-container tip">
<p class="hint-container-title">Pulling Profiles from the Network</p>
<p>We suggest that, when possible, you host your profile code on a version control system accessible from the internet (e.g. GitHub). That way, you are always running an up-to-date version of the code.</p>
<p>Note that &quot;an up-to-date version&quot; does not necessarily mean &quot;run the <code v-pre>main</code> branch of the profile as it exists on GitHub.&quot; You can make use of releases in your code repository, and then use the link to a stable release (<a href="https://docs.github.com/en/repositories/releasing-projects-on-github/linking-to-releases" target="_blank" rel="noopener noreferrer">GitHub example<ExternalLinkIcon/></a>) as your input to <code v-pre>inspec exec</code>. This conforms to best practices in automation -- avoid running any code that has not been thoroughly vetted as part of an offical release.</p>
</div>
<div class="hint-container warning">
<p class="hint-container-title">Wait, what if I can't publish to GitHub?</p>
<p>Not everyone can open source their code, or make it available on the open Internet. Your organization or environment may be more suited to using a private code repository (e.g. GitLab or BitBucket) to store profiles. InSpec supports passing authentication tokens as part of profile locations:</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>inspec <span class="token builtin class-name">exec</span> https://API_TOKEN@gitlab.supersecret.com/profiles/inspec_baseline.git
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>See the <a href="https://docs.chef.io/inspec/cli/#exec" target="_blank" rel="noopener noreferrer">exec command docs<ExternalLinkIcon/></a> for details.</p>
</div>
<h3 id="practice-running-inspec-using-a-profile-from-github" tabindex="-1"><a class="header-anchor" href="#practice-running-inspec-using-a-profile-from-github" aria-hidden="true">#</a> Practice Running InSpec Using a Profile From GitHub</h3>
<p>Let's try running an already-complete profile and generating a report.</p>
<p>The following command will run the SAF Validation Library's NGINX baseline profile from MITRE GitHub, and use the reporter to output a json file. You will need this JSON file for the next section, where we'll load our results into Heimdall:</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>inspec <span class="token builtin class-name">exec</span> https://github.com/mitre/nginx-stigready-baseline <span class="token parameter variable">-t</span> docker://nginx <span class="token parameter variable">--reporter</span> cli json:nginx-full-baseline-<span class="token variable"><span class="token variable">$(</span><span class="token function">date</span> +<span class="token string">"%Y-%m-%d-%H-%M-%S"</span><span class="token variable">)</span></span>.json
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></div></template>


