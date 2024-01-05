<template><div><h2 id="_12-manual-attestations" tabindex="-1"><a class="header-anchor" href="#_12-manual-attestations" aria-hidden="true">#</a> 12. Manual Attestations</h2>
<p>What about controls that cannot be automated and require manual review? You may have noticed that Heimdall displays controls in 4 statuses: <code v-pre>Passed</code>, <code v-pre>Failed</code>, <code v-pre>Not Applicable</code>, and <code v-pre>Not Reviewed</code>.</p>
<p>Controls may be <code v-pre>Not Reviewed</code> for multiple reasons. One major reason is that the control requires manual review. You can explore the details of the <code v-pre>Not Reviewed</code> controls to find out more.</p>
<h3 id="_12-1-explore-the-not-reviewed-controls" tabindex="-1"><a class="header-anchor" href="#_12-1-explore-the-not-reviewed-controls" aria-hidden="true">#</a> 12.1 Explore the Not Reviewed Controls</h3>
<p>Look at the hardened results again in Heimdall. Go back to the menu in the top left to toggle off &quot;Comparison View&quot; and select on the hardened results.</p>
<figure><img src="@source/assets/img/Heimdall_NotReviewed_Filter.png" alt="Filtering by Not Reviewed" tabindex="0" loading="lazy"><figcaption>Filtering by Not Reviewed</figcaption></figure>
<p>Scroll down to see the details and learn why the controls were not reviewed.</p>
<figure><img src="@source/assets/img/Heimdall_NotReviewed_Data.png" alt="&quot;Not Reviewed&quot; Controls" tabindex="0" loading="lazy"><figcaption>&quot;Not Reviewed&quot; Controls</figcaption></figure>
<p>You can see that for various reasons, many of these controls require manual review. If someone does that manual review, how can we show that in the data?</p>
<h3 id="_12-2-manual-attestations-using-saf-cli" tabindex="-1"><a class="header-anchor" href="#_12-2-manual-attestations-using-saf-cli" aria-hidden="true">#</a> 12.2 Manual Attestations Using SAF CLI</h3>
<p>You have already seen the InSpec profiles and the Heimdall application that the SAF provides. Another feature of the SAF is the SAF CLI. This is a command line utility tool that helps with various steps in the security automation process. You can see all of the SAF CLI's capability <a href="https://saf-cli.mitre.org/" target="_blank" rel="noopener noreferrer">here<ExternalLinkIcon/></a>, but we will look more at how we can use it to add manual attestation data to our overall results.</p>
<h3 id="_12-3-get-familiar-with-saf-cli" tabindex="-1"><a class="header-anchor" href="#_12-3-get-familiar-with-saf-cli" aria-hidden="true">#</a> 12.3 Get Familiar with SAF CLI</h3>
<p>SAF CLI has been downloaded into your Codespaces lab environmnet, so it is available for you to use on the command line. Try out a few commands to see what you can do!</p>
<CodeTabs id="39" :data='[{"id":"Command"},{"id":"Output"}]'>
<template #title0="{ value, isActive }">Command</template>
<template #title1="{ value, isActive }">Output</template>
<template #tab0="{ value, isActive }">
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>saf <span class="token parameter variable">--version</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></template>
<template #tab1="{ value, isActive }">
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>@mitre/saf/1.2.34 linux-x64 node-v20.8.1
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></template>
</CodeTabs>
<p>The help command will give you the information on how to use the SAF CLI:</p>
<CodeTabs id="50" :data='[{"id":"Command"},{"id":"Output"}]'>
<template #title0="{ value, isActive }">Command</template>
<template #title1="{ value, isActive }">Output</template>
<template #tab0="{ value, isActive }">
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>saf <span class="token builtin class-name">help</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></template>
<template #tab1="{ value, isActive }">
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>The MITRE Security Automation Framework <span class="token punctuation">(</span>SAF<span class="token punctuation">)</span> Command Line Interface <span class="token punctuation">(</span>CLI<span class="token punctuation">)</span> brings together applications, techniques, libraries, and tools developed by MITRE and the security community to streamline security automation <span class="token keyword">for</span> systems and DevOps pipelines.

VERSION
  @mitre/saf/1.2.34 linux-x64 node-v20.8.1

USAGE
  $ saf <span class="token punctuation">[</span>COMMAND<span class="token punctuation">]</span>

TOPICS
  attest      <span class="token punctuation">[</span>Attest<span class="token punctuation">]</span>       Attest to <span class="token string">'Not Reviewed'</span> control requirements <span class="token punctuation">(</span>that can’t be tested automatically by security tools and hence require manual review<span class="token punctuation">)</span>, helping to account <span class="token keyword">for</span> all requirements
  convert     <span class="token punctuation">[</span>Normalize<span class="token punctuation">]</span>    Convert security results from all your security tools between common data formats
  emasser     <span class="token punctuation">[</span>eMASS<span class="token punctuation">]</span>        The eMASS REST API implementation
  generate    <span class="token punctuation">[</span>Generate<span class="token punctuation">]</span>     Generate pipeline thresholds, configuration files, and <span class="token function">more</span>
  harden      <span class="token punctuation">[</span>Harden<span class="token punctuation">]</span>       Implement security baselines using Ansible, Chef, and Terraform content: Visit https://saf.mitre.org/<span class="token comment">#/harden to explore and run hardening scripts</span>
  plugins     List installed plugins.
  scan        <span class="token punctuation">[</span>Scan<span class="token punctuation">]</span>         Scan to get detailed security testing results: Visit https://saf.mitre.org/<span class="token comment">#/validate to explore and run inspec profiles</span>
  supplement  <span class="token punctuation">[</span>Supplement<span class="token punctuation">]</span>   Supplement <span class="token punctuation">(</span>ex. <span class="token builtin class-name">read</span> or modify<span class="token punctuation">)</span> elements that provide contextual information <span class="token keyword">in</span> the Heimdall Data Format results JSON <span class="token function">file</span> such as <span class="token variable"><span class="token variable">`</span>passthrough<span class="token variable">`</span></span> or <span class="token variable"><span class="token variable">`</span>target<span class="token variable">`</span></span>
  validate    <span class="token punctuation">[</span>Validate<span class="token punctuation">]</span>     Verify pipeline thresholds
  view        <span class="token punctuation">[</span>Visualize<span class="token punctuation">]</span>    Identify overall security status and deep-dive to solve specific security defects

COMMANDS
  convert   The generic convert <span class="token builtin class-name">command</span> translates any supported file-based security results <span class="token builtin class-name">set</span> into the Heimdall Data Format
  harden    Visit https://saf.mitre.org/<span class="token comment">#/harden to explore and run hardening scripts</span>
  heimdall  Run an instance of Heimdall Lite to visualize your data
  <span class="token builtin class-name">help</span>      Display <span class="token builtin class-name">help</span> <span class="token keyword">for</span> saf.
  plugins   List installed plugins.
  scan      Visit https://saf.mitre.org/<span class="token comment">#/validate to explore and run inspec profiles</span>
  summary   Get a quick compliance overview of an HDF <span class="token function">file</span>
  version
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></template>
</CodeTabs>
<p>You can use the <code v-pre>-h</code> flag to get more information on the different topics and commands.</p>
<CodeTabs id="61" :data='[{"id":"Command"},{"id":"Output"}]'>
<template #title0="{ value, isActive }">Command</template>
<template #title1="{ value, isActive }">Output</template>
<template #tab0="{ value, isActive }">
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>saf attest <span class="token parameter variable">-h</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></template>
<template #tab1="{ value, isActive }">
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token punctuation">[</span>Attest<span class="token punctuation">]</span>       Attest to <span class="token string">'Not Reviewed'</span> control requirements <span class="token punctuation">(</span>that can’t be tested automatically by security tools and hence require manual review<span class="token punctuation">)</span>, helping to account <span class="token keyword">for</span> all requirements

USAGE
  $ saf attest COMMAND

COMMANDS
  attest apply   Apply one or <span class="token function">more</span> attestation files to one or <span class="token function">more</span> HDF results sets
  attest create  Create attestation files <span class="token keyword">for</span> use with <span class="token variable"><span class="token variable">`</span>saf attest apply<span class="token variable">`</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></template>
</CodeTabs>
<h3 id="_12-4-create-manual-attestation-data" tabindex="-1"><a class="header-anchor" href="#_12-4-create-manual-attestation-data" aria-hidden="true">#</a> 12.4 Create Manual Attestation Data</h3>
<p>After someone on your team completes the manual check that is required for your security control, record that information with the help of the SAF CLI.</p>
<p>First, look at the flags for the <code v-pre>saf attest create</code> command.</p>
<CodeTabs id="78" :data='[{"id":"Command"},{"id":"Output"}]'>
<template #title0="{ value, isActive }">Command</template>
<template #title1="{ value, isActive }">Output</template>
<template #tab0="{ value, isActive }">
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>saf attest create <span class="token parameter variable">-h</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></template>
<template #tab1="{ value, isActive }">
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>Create attestation files <span class="token keyword">for</span> use with <span class="token variable"><span class="token variable">`</span>saf attest apply<span class="token variable">`</span></span>

USAGE
  $ saf attest create <span class="token parameter variable">-o</span> <span class="token operator">&lt;</span>attestation-file<span class="token operator">></span> <span class="token punctuation">[</span>-i <span class="token operator">&lt;</span>hdf-json<span class="token operator">></span> <span class="token parameter variable">-t</span> <span class="token operator">&lt;</span>json <span class="token operator">|</span> xlsx <span class="token operator">|</span> yml <span class="token operator">|</span> yaml<span class="token operator">></span><span class="token punctuation">]</span>

FLAGS
  -h, <span class="token parameter variable">--help</span>             Show CLI help.
  -i, <span class="token parameter variable">--input</span><span class="token operator">=</span><span class="token operator">&lt;</span>value<span class="token operator">></span>    <span class="token punctuation">(</span>optional<span class="token punctuation">)</span> An input HDF <span class="token function">file</span> to search <span class="token keyword">for</span> controls
  -o, <span class="token parameter variable">--output</span><span class="token operator">=</span><span class="token operator">&lt;</span>value<span class="token operator">></span>   <span class="token punctuation">(</span>required<span class="token punctuation">)</span> The output filename
  -t, <span class="token parameter variable">--format</span><span class="token operator">=</span><span class="token operator">&lt;</span>option<span class="token operator">></span>  <span class="token punctuation">[</span>default: json<span class="token punctuation">]</span> <span class="token punctuation">(</span>optional<span class="token punctuation">)</span> The output <span class="token function">file</span> <span class="token builtin class-name">type</span>
                         <span class="token operator">&lt;</span>options: json<span class="token operator">|</span>xlsx<span class="token operator">|</span>yml<span class="token operator">|</span>yaml<span class="token operator">></span>

DESCRIPTION
  Create attestation files <span class="token keyword">for</span> use with <span class="token variable"><span class="token variable">`</span>saf attest apply<span class="token variable">`</span></span>

EXAMPLES
  $ saf attest create <span class="token parameter variable">-o</span> attestation.json <span class="token parameter variable">-i</span> hdf.json

  $ saf attest create <span class="token parameter variable">-o</span> attestation.xlsx <span class="token parameter variable">-t</span> xlsx
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></template>
</CodeTabs>
<p>Here is an example of an attested control that we can create based on</p>
<ol>
<li>The results we saw in Heimdall</li>
<li>Our (hypothetical) completed manual check (Let's pretend that we did check this!)</li>
</ol>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>saf attest create <span class="token parameter variable">-o</span> ./results/manual_attestation_results.json
Enter a control ID or enter <span class="token string">'q'</span> to exit: V-40792
Attestation explanation: Verified that the server-side session management is configured correctly.
Frequency <span class="token punctuation">(</span>1d/3d/1wk/2wk/1m/3m/6m/1y/1.5y/custom<span class="token punctuation">)</span>: 3m
Enter status <span class="token punctuation">((</span>p<span class="token punctuation">)</span>assed/<span class="token punctuation">(</span>f<span class="token punctuation">)</span>ailed<span class="token punctuation">)</span>: p
Updated By: Emily Rodriguez
Enter a control ID or enter <span class="token string">'q'</span> to exit: 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Now, go through and add more attestations of the Not Reviewed results. You can decide if they should pass or fail as if you hypothetically did check these controls manually. Type <code v-pre>q</code> when you are done.</p>
<h3 id="_12-5-apply-the-manual-attestation-data" tabindex="-1"><a class="header-anchor" href="#_12-5-apply-the-manual-attestation-data" aria-hidden="true">#</a> 12.5 Apply the Manual Attestation Data</h3>
<p>Use the <code v-pre>-h</code> flag to learn about applying attestations.</p>
<CodeTabs id="111" :data='[{"id":"Command"},{"id":"Output"}]'>
<template #title0="{ value, isActive }">Command</template>
<template #title1="{ value, isActive }">Output</template>
<template #tab0="{ value, isActive }">
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>saf attest apply <span class="token parameter variable">-h</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></template>
<template #tab1="{ value, isActive }">
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>Apply one or <span class="token function">more</span> attestation files to one or <span class="token function">more</span> HDF results sets

USAGE
  $ saf attest apply <span class="token parameter variable">-i</span> <span class="token operator">&lt;</span>input-hdf-json<span class="token operator">></span><span class="token punctuation">..</span>. <span class="token operator">&lt;</span>attestation<span class="token operator">></span><span class="token punctuation">..</span>. <span class="token parameter variable">-o</span> <span class="token operator">&lt;</span>output-hdf-path<span class="token operator">></span>

FLAGS
  -h, <span class="token parameter variable">--help</span>              Show CLI help.
  -i, <span class="token parameter variable">--input</span><span class="token operator">=</span><span class="token operator">&lt;</span>value<span class="token operator">></span><span class="token punctuation">..</span>.  <span class="token punctuation">(</span>required<span class="token punctuation">)</span> Your input HDF and Attestation file<span class="token punctuation">(</span>s<span class="token punctuation">)</span>
  -o, <span class="token parameter variable">--output</span><span class="token operator">=</span><span class="token operator">&lt;</span>value<span class="token operator">></span>    <span class="token punctuation">(</span>required<span class="token punctuation">)</span> Output <span class="token function">file</span> or folder <span class="token punctuation">(</span>for multiple executions<span class="token punctuation">)</span>

DESCRIPTION
  Apply one or <span class="token function">more</span> attestation files to one or <span class="token function">more</span> HDF results sets

EXAMPLES
  $ saf attest apply <span class="token parameter variable">-i</span> hdf.json attestation.json <span class="token parameter variable">-o</span> new-hdf.json

  $ saf attest apply <span class="token parameter variable">-i</span> hdf1.json hdf2.json attestation.xlsx <span class="token parameter variable">-o</span> outputDir
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></template>
</CodeTabs>
<p>Apply the attestation like this:</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>saf attest apply <span class="token parameter variable">-i</span> ./results/nginx_hardened_results.json ./results/manual_attestation_results.json <span class="token parameter variable">-o</span> ./results/nginx_hardened_with_manual_attestations.json
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_12-6-visualize-the-results-heimdall" tabindex="-1"><a class="header-anchor" href="#_12-6-visualize-the-results-heimdall" aria-hidden="true">#</a> 12.6 Visualize the Results - Heimdall</h3>
<p>As we have done before,</p>
<ol>
<li>Download the <code v-pre>nginx_hardened_with_manual_attestations.json</code> file.</li>
<li>Upload this file to Heimdall.</li>
<li>Click on the top left menu and toggle on the Comparison View</li>
<li>Compare the results.</li>
</ol>
<p>In the example, a few manual attestations were completed, some of which were recorded as passing and some as failing. You may have chosen to do your manual attestations differently and have different metrics.</p>
<figure><img src="@source/assets/img/Heimdall_Comparison_WithAttestations.png" alt="Visualizing Attestations" tabindex="0" loading="lazy"><figcaption>Visualizing Attestations</figcaption></figure>
<p>You can look at the details to find the attestation information captured. Expand the details for each control to view this data.</p>
<figure><img src="@source/assets/img/Heimdall_WithAttestations_Details.png" alt="Details on Attestations" tabindex="0" loading="lazy"><figcaption>Details on Attestations</figcaption></figure>
</div></template>


