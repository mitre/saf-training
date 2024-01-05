<template><div><h1 id="docker-suite-setup" tabindex="-1"><a class="header-anchor" href="#docker-suite-setup" aria-hidden="true">#</a> Docker Suite Setup</h1>
<ol>
<li>Make sure Docker or Podman is running</li>
<li>Login to your docker registry</li>
<li>Clone the repository</li>
<li>Go into the profile repository root dir</li>
<li><code v-pre>bundle install</code></li>
<li><code v-pre>export KITCHEN_LOCAL_YAML=kitchen.container.yml</code> (uses the <a href="https://kitchen.ci/docs/drivers/dokken/" title="Test Kitchen Dokken Driver Documentation" target="_blank" rel="noopener noreferrer">kitchen-dokken driver<ExternalLinkIcon/></a>)</li>
<li><code v-pre>export VANILLA_CONTAINER_IMAGE=registry.access.redhat.com/ubi8/ubi:8.9-1028</code></li>
<li><code v-pre>export HARDENED_CONTAINER_IMAGE=registry1.dso.mil/ironbank/redhat/ubi/ubi8</code></li>
<li>(optional) <code v-pre>export INSPEC_CONTROL='SV-230222'</code></li>
</ol>
<h1 id="running-through-the-docker-test-suite" tabindex="-1"><a class="header-anchor" href="#running-through-the-docker-test-suite" aria-hidden="true">#</a> Running Through the Docker Test Suite</h1>
<ol start="10">
<li>List the kitchen instances with: <code v-pre>bundle exec kitchen list</code></li>
</ol>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>➜  redhat-enterprise-linux-8-stig-baseline git:<span class="token punctuation">(</span>main*<span class="token punctuation">)</span>bundle <span class="token builtin class-name">exec</span> kitchen list
Instance       Driver  Provisioner  Verifier  Transport  Last Action    Last Error
vanilla-ubi8   Dokken  Dummy        Inspec    Dokken     <span class="token operator">&lt;</span>Not Created<span class="token operator">></span>  <span class="token operator">&lt;</span>None<span class="token operator">></span>
hardened-ubi8  Dokken  Dummy        Inspec    Dokken     <span class="token operator">&lt;</span>Not Created<span class="token operator">></span>  <span class="token operator">&lt;</span>None<span class="token operator">></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="11">
<li>Create the kitchen instance: <code v-pre>bundle exec kitchen create vanilla</code></li>
</ol>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>-----<span class="token operator">></span> Starting Test Kitchen <span class="token punctuation">(</span>v3.5.1<span class="token punctuation">)</span>
-----<span class="token operator">></span> Creating <span class="token operator">&lt;</span>vanilla-ubi<span class="token operator"><span class="token file-descriptor important">8</span>></span><span class="token punctuation">..</span>.
      Creating kitchen sandbox at /Users/alippold/.dokken/kitchen_sandbox/de2da32d73-vanilla-ubi8
      Creating verifier sandbox at /Users/alippold/.dokken/verifier_sandbox/de2da32d73-vanilla-ubi8
      Building work image<span class="token punctuation">..</span>
      Creating container de2da32d73-vanilla-ubi8
      Finished creating <span class="token operator">&lt;</span>vanilla-ubi<span class="token operator"><span class="token file-descriptor important">8</span>></span> <span class="token punctuation">(</span>0m0.88s<span class="token punctuation">)</span>.
-----<span class="token operator">></span> Test Kitchen is finished. <span class="token punctuation">(</span>0m1.77s<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="12">
<li>Converge the kitchen instance: <code v-pre>bundle exec kitchen converge  vanilla</code></li>
</ol>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>➜  redhat-enterprise-linux-8-stig-baseline git:<span class="token punctuation">(</span>main*<span class="token punctuation">)</span>bundle <span class="token builtin class-name">exec</span> kitchen converge vanilla
-----<span class="token operator">></span> Starting Test Kitchen <span class="token punctuation">(</span>v3.5.1<span class="token punctuation">)</span>
-----<span class="token operator">></span> Converging <span class="token operator">&lt;</span>vanilla-ubi<span class="token operator"><span class="token file-descriptor important">8</span>></span><span class="token punctuation">..</span>.
      <span class="token punctuation">..</span>.
      Finished converging <span class="token operator">&lt;</span>vanilla-ubi<span class="token operator"><span class="token file-descriptor important">8</span>></span> <span class="token punctuation">(</span>0m0.00s<span class="token punctuation">)</span>.
-----<span class="token operator">></span> Test Kitchen is finished. <span class="token punctuation">(</span>0m0.88s<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="13">
<li>Run InSpec on the kitchen instance: <code v-pre>bundle exec kitchen verify vanilla</code></li>
</ol>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>-----<span class="token operator">></span> Starting Test Kitchen <span class="token punctuation">(</span>v3.5.1<span class="token punctuation">)</span>
-----<span class="token operator">></span> Verifying <span class="token operator">&lt;</span>vanilla-ubi<span class="token operator"><span class="token file-descriptor important">8</span>></span><span class="token punctuation">..</span>.
      Loaded redhat-enterprise-linux-8-stig-baseline

Profile:   redhat-enterprise-linux-8-stig-baseline <span class="token punctuation">(</span>redhat-enterprise-linux-8-stig-baseline<span class="token punctuation">)</span>
Version:   <span class="token number">1.12</span>.0
Target:    docker://c4e89b7406dc0ebf8658fe90d6384d69885a7f07ab9bfbc91c85c64483868c44
Target ID: da39a3ee-5e6b-5b0d-b255-bfef95601890

  ×  SV-230222: RHEL <span class="token number">8</span> vendor packaged system security patches and updates must be installed and up to date. <span class="token punctuation">(</span><span class="token number">4</span> failed<span class="token punctuation">)</span>
<span class="token punctuation">..</span>.

Profile Summary: <span class="token number">0</span> successful controls, <span class="token number">1</span> control failure, <span class="token number">0</span> controls skipped
Test Summary: <span class="token number">0</span> successful, <span class="token number">4</span> failures, <span class="token number">0</span> skipped
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="this-error-is-just-fine" tabindex="-1"><a class="header-anchor" href="#this-error-is-just-fine" aria-hidden="true">#</a> This error is just fine</h2>
<p>The error below is just Test Kitchen telling you that not all of the Contrls in the profile passed.</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token operator">>></span><span class="token operator">>></span><span class="token operator">>></span> ------Exception-------
<span class="token operator">>></span><span class="token operator">>></span><span class="token operator">>></span> Class: Kitchen::ActionFailed
<span class="token operator">>></span><span class="token operator">>></span><span class="token operator">>></span> Message: <span class="token number">1</span> actions failed.
<span class="token operator">>></span><span class="token operator">>></span><span class="token operator">>></span>     Verify failed on instance <span class="token operator">&lt;</span>vanilla-ubi<span class="token operator"><span class="token file-descriptor important">8</span>></span>.  Please see .kitchen/logs/vanilla-ubi8.log <span class="token keyword">for</span> <span class="token function">more</span> details
<span class="token operator">>></span><span class="token operator">>></span><span class="token operator">>></span> ----------------------
<span class="token operator">>></span><span class="token operator">>></span><span class="token operator">>></span> Please see .kitchen/logs/kitchen.log <span class="token keyword">for</span> <span class="token function">more</span> details
<span class="token operator">>></span><span class="token operator">>></span><span class="token operator">>></span> Also try running <span class="token variable"><span class="token variable">`</span>kitchen diagnose <span class="token parameter variable">--all</span><span class="token variable">`</span></span> <span class="token keyword">for</span> configuration
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="14">
<li>For steps that apply to making updates, patches, and updates to the profile, see the next section, <a href="#updating-the-profile">Updating the Profile</a>.</li>
<li>Your InSpec scan results are located in the <code v-pre>./spec/results/</code> directory, named <code v-pre>./spec/results/ubi-8_*.</code></li>
<li>Use Heimdall Lite to load both the <code v-pre>hardened</code> and <code v-pre>vanilla</code> results to ensure your changes and updates, &quot;failed as expected and passed as expected and covered your corner cases.&quot;</li>
</ol>
</div></template>


