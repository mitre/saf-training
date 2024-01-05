<template><div><h2 id="verification" tabindex="-1"><a class="header-anchor" href="#verification" aria-hidden="true">#</a> Verification</h2>
<p>At this point we have a much more mature workflow file. We have one more activity we need to do -- verification, or checking that the output of our validation run met our expectations.</p>
<p>Note that &quot;meeting our expectations&quot; does <em>not</em> automatically mean that there are no failing tests. In many real-world use cases, security tests fail, but the software is still considered worth the risk to deploy because of mitigations for that risk, or perhaps the requirement is inapplicable due to the details of the deployment. With that said, we still want to run our tests to make sure we are continually collecting data; we just don't want our pipeline to halt if it finds a test that we were always expecting to fail.</p>
<p>By default, the InSpec executable returns a code 100 if <em>any</em> tests in a profile run fail. Pipeline orchestrators, like most software, interpret any non-zero return code as a serious failure, and will halt the pipeline run accordingly unless we explicitly tell it to ignore errors. This is why the &quot;VALIDATE - Run InSpec&quot; step has the <code v-pre>continue-on-error: true </code> attribute specified.</p>
<p>Our goal is to complete our InSpec scan, collect the result as a report file, and then parse that file to determine if we met our own <em>threshold</em> of security. We can do this with the SAF CLI.</p>
<h3 id="the-saf-cli" tabindex="-1"><a class="header-anchor" href="#the-saf-cli" aria-hidden="true">#</a> The SAF CLI</h3>
<p>The <a href="https://saf-cli.mitre.org/" target="_blank" rel="noopener noreferrer">SAF CLI<ExternalLinkIcon/></a> is one the tool that the SAF supports to help automate security validation. It is our &quot;kitchen-sink&quot; utility for pipelines. If you took the <RouterLink to="/courses/user/">SAF User Class</RouterLink>, you are already familiar with the SAF CLI's <RouterLink to="/courses/user/12.html">attestation</RouterLink> function.</p>
<p>This tool was installed alongside InSpec when you ran the <code v-pre>./build-lab.sh</code> script. For general installation instructions, see the first link in the above paragraph.</p>
<h4 id="saf-cli-capabilities" tabindex="-1"><a class="header-anchor" href="#saf-cli-capabilities" aria-hidden="true">#</a> SAF CLI Capabilities</h4>
<p>Some SAF CLI capabilities are listed in this diagram, but you can see all of them on the <a href="https://saf-cli.mitre.org/" target="_blank" rel="noopener noreferrer">SAF CLI documentation<ExternalLinkIcon/></a>.</p>
<p>In addition to the documentation site, you can view the SAF CLI's capabilities by running:</p>
<CodeTabs id="33" :data='[{"id":"Command"},{"id":"Output"}]'>
<template #title0="{ value, isActive }">Command</template>
<template #title1="{ value, isActive }">Output</template>
<template #tab0="{ value, isActive }">
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>saf <span class="token builtin class-name">help</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></template>
<template #tab1="{ value, isActive }">
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>The MITRE Security Automation Framework <span class="token punctuation">(</span>SAF<span class="token punctuation">)</span> Command Line Interface <span class="token punctuation">(</span>CLI<span class="token punctuation">)</span> brings together applications, techniques, libraries, and tools developed by MITRE and the security community to streamline security automation <span class="token keyword">for</span> systems and DevOps pipelines

VERSION
  @mitre/saf/1.2.5 linux-x64 node-v16.19.0

USAGE
  $ saf <span class="token punctuation">[</span>COMMAND<span class="token punctuation">]</span>

TOPICS
  attest      <span class="token punctuation">[</span>Attest<span class="token punctuation">]</span>       Attest to <span class="token string">'Not Reviewed'</span> control requirements <span class="token punctuation">(</span>that can’t be tested automatically by security tools and hence require manual review<span class="token punctuation">)</span>, helping to
              account <span class="token keyword">for</span> all requirements
  convert     <span class="token punctuation">[</span>Normalize<span class="token punctuation">]</span>    Convert security results from all your security tools between common data formats
  emasser     <span class="token punctuation">[</span>eMASS<span class="token punctuation">]</span>        The eMASS REST API implementation
  generate    <span class="token punctuation">[</span>Generate<span class="token punctuation">]</span>     Generate pipeline thresholds, configuration files, and <span class="token function">more</span>
  harden      <span class="token punctuation">[</span>Harden<span class="token punctuation">]</span>       Implement security baselines using Ansible, Chef, and Terraform content: Visit https://saf.mitre.org/<span class="token comment">#/harden to explore and run hardening scripts</span>
  plugins     List installed plugins.
  scan        <span class="token punctuation">[</span>Scan<span class="token punctuation">]</span>         Scan to get detailed security testing results: Visit https://saf.mitre.org/<span class="token comment">#/validate to explore and run inspec profiles</span>
  supplement  <span class="token punctuation">[</span>Supplement<span class="token punctuation">]</span>   Supplement <span class="token punctuation">(</span>ex. <span class="token builtin class-name">read</span> or modify<span class="token punctuation">)</span> elements that provide contextual information <span class="token keyword">in</span> the Heimdall Data Format results JSON <span class="token function">file</span> such as <span class="token variable"><span class="token variable">`</span>passthrough<span class="token variable">`</span></span> or
              <span class="token variable"><span class="token variable">`</span>target<span class="token variable">`</span></span>
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></template>
</CodeTabs>
<p>You can get more information on a specific topic by running:</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>saf <span class="token punctuation">[</span>TOPIC<span class="token punctuation">]</span> <span class="token parameter variable">-h</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="updating-the-workflow-file" tabindex="-1"><a class="header-anchor" href="#updating-the-workflow-file" aria-hidden="true">#</a> Updating the Workflow File</h3>
<p>Let's add two steps to our pipeline to use the SAF CLI to understand our InSpec scan results before we verify them against a threshold.</p>
<CodeTabs id="51" :data='[{"id":"Adding Verify Steps"},{"id":"<code v-pre>pipeline.yml</code> after adding verify steps"}]' tab-id="shell">
<template #title0="{ value, isActive }">Adding Verify Steps</template>
<template #title1="{ value, isActive }"><code v-pre>pipeline.yml</code> after adding verify steps</template>
<template #tab0="{ value, isActive }">
<div class="language-yaml line-numbers-mode" data-ext="yml"><pre v-pre class="language-yaml"><code><span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> VERIFY <span class="token punctuation">-</span> Display our results summary 
  <span class="token key atrule">uses</span><span class="token punctuation">:</span> mitre/saf_action@v1
  <span class="token key atrule">with</span><span class="token punctuation">:</span>
    <span class="token key atrule">command_string</span><span class="token punctuation">:</span> <span class="token string">"view summary -i results/pipeline_run.json"</span>

<span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> VERIFY <span class="token punctuation">-</span> Ensure the scan meets our results threshold
  <span class="token key atrule">uses</span><span class="token punctuation">:</span> mitre/saf_action@v1             <span class="token comment"># check if the pipeline passes our defined threshold</span>
  <span class="token key atrule">with</span><span class="token punctuation">:</span>
    <span class="token key atrule">command_string</span><span class="token punctuation">:</span> <span class="token string">"validate threshold -i results/pipeline_run.json -F threshold.yml"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></template>
<template #tab1="{ value, isActive }">
<div class="language-yaml line-numbers-mode" data-ext="yml"><pre v-pre class="language-yaml"><code><span class="token key atrule">name</span><span class="token punctuation">:</span> Demo Security Validation Gold Image Pipeline

<span class="token key atrule">on</span><span class="token punctuation">:</span>
  <span class="token key atrule">push</span><span class="token punctuation">:</span>
    <span class="token key atrule">branches</span><span class="token punctuation">:</span> <span class="token punctuation">[</span>main<span class="token punctuation">]</span> <span class="token comment"># trigger this action on any push to main branch</span>

<span class="token key atrule">jobs</span><span class="token punctuation">:</span>
  <span class="token key atrule">gold-image</span><span class="token punctuation">:</span>
    <span class="token key atrule">name</span><span class="token punctuation">:</span> Gold Image NGINX
    <span class="token key atrule">runs-on</span><span class="token punctuation">:</span> ubuntu<span class="token punctuation">-</span><span class="token number">20.04</span>
    <span class="token key atrule">env</span><span class="token punctuation">:</span>
      <span class="token key atrule">CHEF_LICENSE</span><span class="token punctuation">:</span> accept <span class="token comment"># so that we can use InSpec without manually accepting the license</span>
      <span class="token key atrule">PROFILE</span><span class="token punctuation">:</span> my_nginx <span class="token comment"># path to our profile</span>
    <span class="token key atrule">steps</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> PREP <span class="token punctuation">-</span> Update runner <span class="token comment"># updating all dependencies is always a good start</span>
        <span class="token key atrule">run</span><span class="token punctuation">:</span> sudo apt<span class="token punctuation">-</span>get update

      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> PREP <span class="token punctuation">-</span> Install InSpec executable 
        <span class="token key atrule">run</span><span class="token punctuation">:</span> curl https<span class="token punctuation">:</span>//omnitruck.chef.io/install.sh <span class="token punctuation">|</span> sudo bash <span class="token punctuation">-</span>s <span class="token punctuation">-</span><span class="token punctuation">-</span> <span class="token punctuation">-</span>P inspec <span class="token punctuation">-</span>v 5

      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> PREP <span class="token punctuation">-</span> Check out this repository  <span class="token comment"># because that's where our profile is!</span>
        <span class="token key atrule">uses</span><span class="token punctuation">:</span> actions/checkout@v3
        
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> LINT <span class="token punctuation">-</span> Run InSpec Check           <span class="token comment"># double-check that we don't have any serious issues in our profile code</span>
        <span class="token key atrule">run</span><span class="token punctuation">:</span> inspec check $PROFILE

      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> DEPLOY <span class="token punctuation">-</span> Run a Docker container from nginx
        <span class="token key atrule">run</span><span class="token punctuation">:</span> docker run <span class="token punctuation">-</span>dit <span class="token punctuation">-</span><span class="token punctuation">-</span>name nginx nginx<span class="token punctuation">:</span>latest

      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> DEPLOY <span class="token punctuation">-</span> Install Python for our nginx container
        <span class="token key atrule">run</span><span class="token punctuation">:</span> <span class="token punctuation">|</span><span class="token scalar string">
          docker exec nginx apt-get update -y
          docker exec nginx apt-get install -y python3</span>

      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> HARDEN <span class="token punctuation">-</span> Fetch Ansible role
        <span class="token key atrule">run</span><span class="token punctuation">:</span> <span class="token punctuation">|</span><span class="token scalar string">
          git clone --branch docker https://github.com/mitre/ansible-nginx-stigready-hardening.git || true
          chmod 755 ansible-nginx-stigready-hardening</span>

      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> HARDEN <span class="token punctuation">-</span> Fetch Ansible requirements
        <span class="token key atrule">run</span><span class="token punctuation">:</span> ansible<span class="token punctuation">-</span>galaxy install <span class="token punctuation">-</span>r ansible<span class="token punctuation">-</span>nginx<span class="token punctuation">-</span>stigready<span class="token punctuation">-</span>hardening/requirements.yml

      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> HARDEN <span class="token punctuation">-</span> Run Ansible hardening
        <span class="token key atrule">run</span><span class="token punctuation">:</span> ansible<span class="token punctuation">-</span>playbook <span class="token punctuation">-</span><span class="token punctuation">-</span>inventory=nginx<span class="token punctuation">,</span> <span class="token punctuation">-</span><span class="token punctuation">-</span>connection=docker ansible<span class="token punctuation">-</span>nginx<span class="token punctuation">-</span>stigready<span class="token punctuation">-</span>hardening/hardening<span class="token punctuation">-</span>playbook.yml
        
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> VALIDATE <span class="token punctuation">-</span> Run InSpec
        <span class="token key atrule">continue-on-error</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>                 <span class="token comment"># we dont want to stop if our InSpec run finds failures, we want to continue and record the result</span>
        <span class="token key atrule">run</span><span class="token punctuation">:</span> <span class="token punctuation">|</span><span class="token scalar string">
          inspec exec $PROFILE \
          --input-file=$PROFILE/inputs.yml \
          --target docker://nginx \
          --reporter cli json:results/pipeline_run.json</span>

      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> VALIDATE <span class="token punctuation">-</span> Save Test Result JSON  <span class="token comment"># save our results to the pipeline artifacts, even if the InSpec run found failing tests</span>
        <span class="token key atrule">uses</span><span class="token punctuation">:</span> actions/upload<span class="token punctuation">-</span>artifact@v3
        <span class="token key atrule">with</span><span class="token punctuation">:</span>
          <span class="token key atrule">path</span><span class="token punctuation">:</span> results/pipeline_run.json

      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> VERIFY <span class="token punctuation">-</span> Display our results summary 
        <span class="token key atrule">uses</span><span class="token punctuation">:</span> mitre/saf_action@v1
        <span class="token key atrule">with</span><span class="token punctuation">:</span>
          <span class="token key atrule">command_string</span><span class="token punctuation">:</span> <span class="token string">"view summary -i results/pipeline_run.json"</span>

      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> VERIFY <span class="token punctuation">-</span> Ensure the scan meets our results threshold
        <span class="token key atrule">uses</span><span class="token punctuation">:</span> mitre/saf_action@v1             <span class="token comment"># check if the pipeline passes our defined threshold</span>
        <span class="token key atrule">with</span><span class="token punctuation">:</span>
          <span class="token key atrule">command_string</span><span class="token punctuation">:</span> <span class="token string">"validate threshold -i results/pipeline_run.json -F threshold.yml"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></template>
</CodeTabs>
<p>A few things to note here:</p>
<ul>
<li>Both steps are using the <a href="https://github.com/mitre/saf_action" target="_blank" rel="noopener noreferrer">SAF CLI GitHub Action<ExternalLinkIcon/></a>. This way, we don't need to install it directly on the runner; we can just pass in the command string.</li>
<li>We added the <code v-pre>summary</code> step because it will print us a concise summary inside the pipeline job view itself. That command takes one file argument; the results file we want to summarize.</li>
<li>The <code v-pre>validate threshold</code> command, however, needs two files -- one is our report file as usual, and the other is a <strong>threshold file</strong>.</li>
</ul>
<h4 id="threshold-files" tabindex="-1"><a class="header-anchor" href="#threshold-files" aria-hidden="true">#</a> Threshold Files</h4>
<p>Threshold files are what we use to define what &quot;passing&quot; means for our pipeline, since like we said earlier, it's more complicated than failing the pipeline on a failed test.</p>
<p>Consider the following sample threshold file:</p>
<div class="language-yaml line-numbers-mode" data-ext="yml"><pre v-pre class="language-yaml"><code><span class="token comment"># threshold.yml file</span>
<span class="token key atrule">compliance</span><span class="token punctuation">:</span>
  <span class="token key atrule">min</span><span class="token punctuation">:</span> <span class="token number">80</span>
<span class="token key atrule">passed</span><span class="token punctuation">:</span>
  <span class="token key atrule">total</span><span class="token punctuation">:</span>
    <span class="token key atrule">min</span><span class="token punctuation">:</span> <span class="token number">1</span>
<span class="token key atrule">failed</span><span class="token punctuation">:</span>
  <span class="token key atrule">total</span><span class="token punctuation">:</span>
    <span class="token key atrule">max</span><span class="token punctuation">:</span> <span class="token number">2</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>This file specifies that we require a <em>minimum of 80% of the tests to pass.</em> We also specify that <em>at least one of them should pass, and that at maximum two of them can fail.</em></p>
<div class="hint-container info">
<p class="hint-container-title">Threshold Files Options</p>
<p>To make more specific or detailed thresholds, check out <a href="https://github.com/mitre/saf/wiki/Validation-with-Thresholds" target="_blank" rel="noopener noreferrer">this documentation on generating theshold files<ExternalLinkIcon/></a>.</p>
<p><em>NOTE: You can name the threshold file something else or put it in a different location. We specify the name and location only for convenience.</em></p>
</div>
<p>This is a sample pipeline, so we are not too worried about being very stringent. For now, let's settle for running the pipeline with no <em>errors</em> (that is, as long as each test runs, we do not care if it passed or failed, but a source code error should still fail the pipeline).</p>
<p>Create a new file called <code v-pre>threshold.yml</code> in the main directory to specify the threshold for acceptable test results:</p>
<div class="language-yaml line-numbers-mode" data-ext="yml"><pre v-pre class="language-yaml"><code><span class="token key atrule">error</span><span class="token punctuation">:</span>
  <span class="token key atrule">total</span><span class="token punctuation">:</span>
    <span class="token key atrule">max</span><span class="token punctuation">:</span> <span class="token number">0</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="hint-container note">
<p class="hint-container-title">How could we change this threshold file to ensure that the pipeline run will fail?</p>
</div>
<p>And with that, we have a complete pipeline file. Let's commit our changes and see what happens.</p>
<CodeTabs id="112" :data='[{"id":"Committing And Pushing Code"},{"id":"Output of Pushing Code"}]' tab-id="shell">
<template #title0="{ value, isActive }">Committing And Pushing Code</template>
<template #title1="{ value, isActive }">Output of Pushing Code</template>
<template #tab0="{ value, isActive }">
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">git</span> <span class="token function">add</span> .github
<span class="token function">git</span> commit <span class="token parameter variable">-s</span> <span class="token parameter variable">-m</span> <span class="token string">"finishing the pipeline"</span>
<span class="token function">git</span> push origin main
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></template>
<template #tab1="{ value, isActive }">
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>$<span class="token operator">></span> <span class="token function">git</span> <span class="token function">add</span> <span class="token builtin class-name">.</span>
$<span class="token operator">></span> <span class="token function">git</span> commit <span class="token parameter variable">-s</span> <span class="token parameter variable">-m</span> <span class="token string">"finishing the pipeline"</span>
<span class="token punctuation">[</span>main e796abd<span class="token punctuation">]</span> finishing the pipeline
 <span class="token number">2</span> files changed, <span class="token number">14</span> insertions<span class="token punctuation">(</span>+<span class="token punctuation">)</span>, <span class="token number">1</span> deletion<span class="token punctuation">(</span>-<span class="token punctuation">)</span>
 create mode <span class="token number">100644</span> threshold.yml
$<span class="token operator">></span> <span class="token function">git</span> push origin main
Enumerating objects: <span class="token number">10</span>, done.
Counting objects: <span class="token number">100</span>% <span class="token punctuation">(</span><span class="token number">10</span>/10<span class="token punctuation">)</span>, done.
Delta compression using up to <span class="token number">2</span> threads
Compressing objects: <span class="token number">100</span>% <span class="token punctuation">(</span><span class="token number">3</span>/3<span class="token punctuation">)</span>, done.
Writing objects: <span class="token number">100</span>% <span class="token punctuation">(</span><span class="token number">6</span>/6<span class="token punctuation">)</span>, <span class="token number">720</span> bytes <span class="token operator">|</span> <span class="token number">720.00</span> KiB/s, done.
Total <span class="token number">6</span> <span class="token punctuation">(</span>delta <span class="token number">2</span><span class="token punctuation">)</span>, reused <span class="token number">1</span> <span class="token punctuation">(</span>delta <span class="token number">0</span><span class="token punctuation">)</span>, pack-reused <span class="token number">0</span>
remote: Resolving deltas: <span class="token number">100</span>% <span class="token punctuation">(</span><span class="token number">2</span>/2<span class="token punctuation">)</span>, completed with <span class="token number">2</span> <span class="token builtin class-name">local</span> objects.
To https://github.com/wdower/saf-training-lab-environment
   c4d9c67<span class="token punctuation">..</span>e796abd  main -<span class="token operator">></span> main
$<span class="token operator">></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></template>
</CodeTabs>
<p>Let's hop back to our browser and take a look at the output:</p>
<figure><img src="@source/assets/img/the_completed_pipeline_run.png" alt="The Completed Pipeline Run" tabindex="0" loading="lazy"><figcaption>The Completed Pipeline Run</figcaption></figure>
<p>There we go! All validation tests passed!</p>
<p>Note in the SAF CLI Summary step, we get a simple YAML output summary of the InSpec scan:</p>
<figure><img src="@source/assets/img/summary_data.png" alt="The Summary" tabindex="0" loading="lazy"><figcaption>The Summary</figcaption></figure>
<p>We see five critical tests (remember how we set them all to <code v-pre>impact 1.0</code>?) passing, and no failures:</p>
<div class="language-yaml line-numbers-mode" data-ext="yml"><pre v-pre class="language-yaml"><code><span class="token punctuation">-</span> <span class="token key atrule">profileName</span><span class="token punctuation">:</span> my_nginx
  <span class="token key atrule">resultSets</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> pipeline_run.json
  <span class="token key atrule">compliance</span><span class="token punctuation">:</span> <span class="token number">100</span>
  <span class="token key atrule">passed</span><span class="token punctuation">:</span>
    <span class="token key atrule">critical</span><span class="token punctuation">:</span> <span class="token number">5</span>
    <span class="token key atrule">high</span><span class="token punctuation">:</span> <span class="token number">0</span>
    <span class="token key atrule">medium</span><span class="token punctuation">:</span> <span class="token number">0</span>
    <span class="token key atrule">low</span><span class="token punctuation">:</span> <span class="token number">0</span>
    <span class="token key atrule">total</span><span class="token punctuation">:</span> <span class="token number">5</span>
  <span class="token key atrule">failed</span><span class="token punctuation">:</span>
    <span class="token key atrule">critical</span><span class="token punctuation">:</span> <span class="token number">0</span>
    <span class="token key atrule">high</span><span class="token punctuation">:</span> <span class="token number">0</span>
    <span class="token key atrule">medium</span><span class="token punctuation">:</span> <span class="token number">0</span>
    <span class="token key atrule">low</span><span class="token punctuation">:</span> <span class="token number">0</span>
    <span class="token key atrule">total</span><span class="token punctuation">:</span> <span class="token number">0</span>
  <span class="token key atrule">skipped</span><span class="token punctuation">:</span>
    <span class="token key atrule">critical</span><span class="token punctuation">:</span> <span class="token number">0</span>
    <span class="token key atrule">high</span><span class="token punctuation">:</span> <span class="token number">0</span>
    <span class="token key atrule">medium</span><span class="token punctuation">:</span> <span class="token number">0</span>
    <span class="token key atrule">low</span><span class="token punctuation">:</span> <span class="token number">0</span>
    <span class="token key atrule">total</span><span class="token punctuation">:</span> <span class="token number">0</span>
  <span class="token key atrule">error</span><span class="token punctuation">:</span>
    <span class="token key atrule">critical</span><span class="token punctuation">:</span> <span class="token number">0</span>
    <span class="token key atrule">high</span><span class="token punctuation">:</span> <span class="token number">0</span>
    <span class="token key atrule">medium</span><span class="token punctuation">:</span> <span class="token number">0</span>
    <span class="token key atrule">low</span><span class="token punctuation">:</span> <span class="token number">0</span>
    <span class="token key atrule">total</span><span class="token punctuation">:</span> <span class="token number">0</span>
  <span class="token key atrule">no_impact</span><span class="token punctuation">:</span>
    <span class="token key atrule">none</span><span class="token punctuation">:</span> <span class="token number">0</span>
    <span class="token key atrule">total</span><span class="token punctuation">:</span> <span class="token number">0</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Note also that our test report is avaiable as an artifact from the overall pipeline run summary view now:</p>
<figure><img src="@source/assets/img/the_completed_pipeline_run.png" alt="The Artifact" tabindex="0" loading="lazy"><figcaption>The Artifact</figcaption></figure>
<p>From here, we can download that file and drop it off in somehting like Heimdall or feed into some other security process at our leisure (or we can add a pipeline step to do that for us!).</p>
<p>In a real use case, if our pipeline passed, we would next save our bonafide hardened image to a secure registry where it could be distributed to developers. If the pipeline did not pass, we would have already collected data describing why, in the form of InSpec scan reports that we save as artifacts.</p>
</div></template>


