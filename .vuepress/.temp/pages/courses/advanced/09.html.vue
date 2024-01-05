<template><div><h2 id="github-actions" tabindex="-1"><a class="header-anchor" href="#github-actions" aria-hidden="true">#</a> GitHub Actions</h2>
<p>Let's create a GitHub Action workflow to define our pipeline.</p>
<h3 id="the-workflow-file" tabindex="-1"><a class="header-anchor" href="#the-workflow-file" aria-hidden="true">#</a> The Workflow file</h3>
<p>Pipeline orchestration tools are usually configured in a predefined workflow file, which defines a set of tasks and the order they should run in. Workflow files live in the <code v-pre>.github</code> folder for GitHub Actions (the equivalent is the <code v-pre>gitlab-ci</code> file for GitLab CI, for example).</p>
<p>Let's create a new file to store our workflow.</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">mkdir</span> .github
<span class="token function">mkdir</span> .github/workflows
<span class="token function">touch</span> .github/workflows/pipeline.yml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Neither command has output, but you should see a new file if you examine your <code v-pre>.github</code> directory:</p>
<CodeTabs id="19" :data='[{"id":"Tree Command"},{"id":"Expected Output - .github folder structure"}]' tab-id="shell">
<template #title0="{ value, isActive }">Tree Command</template>
<template #title1="{ value, isActive }">Expected Output - .github folder structure</template>
<template #tab0="{ value, isActive }">
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>tree .github
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></template>
<template #tab1="{ value, isActive }">
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>.github
└── workflows
    └── pipeline.yml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></template>
</CodeTabs>
<p>Open that file up for editing.</p>
<h3 id="workflow-file-complete-example" tabindex="-1"><a class="header-anchor" href="#workflow-file-complete-example" aria-hidden="true">#</a> Workflow File - Complete Example</h3>
<p>For reference, this is the complete workflow file we will end up with at the end of the class:</p>
<div class="language-yaml line-numbers-mode" data-ext="yml"><pre v-pre class="language-yaml"><code><span class="token key atrule">name</span><span class="token punctuation">:</span> Demo Security Validation Gold Image Pipeline

<span class="token key atrule">on</span><span class="token punctuation">:</span>
  <span class="token key atrule">push</span><span class="token punctuation">:</span>
    <span class="token key atrule">branches</span><span class="token punctuation">:</span> <span class="token punctuation">[</span> main<span class="token punctuation">,</span> pipeline <span class="token punctuation">]</span>                <span class="token comment"># trigger this action on any push to main branch</span>

<span class="token key atrule">jobs</span><span class="token punctuation">:</span>
  <span class="token key atrule">gold-image</span><span class="token punctuation">:</span>
    <span class="token key atrule">name</span><span class="token punctuation">:</span> Gold Image NGINX
    <span class="token key atrule">runs-on</span><span class="token punctuation">:</span> ubuntu<span class="token punctuation">-</span><span class="token number">20.04</span>
    <span class="token key atrule">env</span><span class="token punctuation">:</span>
      <span class="token key atrule">CHEF_LICENSE</span><span class="token punctuation">:</span> accept                      <span class="token comment"># so that we can use InSpec without manually accepting the license</span>
      <span class="token key atrule">PROFILE</span><span class="token punctuation">:</span> my_nginx                         <span class="token comment"># path to our profile</span>
    <span class="token key atrule">steps</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> PREP <span class="token punctuation">-</span> Update runner              <span class="token comment"># updating all dependencies is always a good start</span>
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>This is a bit much all in one bite, so let's construct this full pipeline piece by piece.</p>
<h3 id="workflow-triggers" tabindex="-1"><a class="header-anchor" href="#workflow-triggers" aria-hidden="true">#</a> Workflow Triggers</h3>
<p>Pipeline orchestrators need you to define some set of events that should trigger the pipeline to run. The first thing we want to define in a new pipeline is what triggers it.</p>
<p>In our case, we want this pipeline to be a continuous integration pipeline, which should trigger every time we push code to the repository. Other options include &quot;trigger this pipeline when a pull request is opened on a branch,&quot; or &quot;trigger this pipeline when someone opens an issue on our repository,&quot; or even &quot;trigger this pipeline when I hit the manual trigger button.&quot;</p>
<div class="hint-container note">
<p class="hint-container-title">Saving Files vs. Pushing Code</p>
<p>In all class content so far, we have been taking advantage of Codespaces' autosave feature. We have been saving our many edits to our profiles locally.</p>
<p><em>Pushing code</em>, by contrast, means taking your saved code and officially adding it to your base repository's committed codebase, making it a permanent change. Codespaces won't do that automatically.</p>
</div>
<p>Let's give our pipeline a name and add a workflow trigger. Add the following into the <code v-pre>pipeline.yml</code> file:</p>
<div class="language-yaml line-numbers-mode" data-ext="yml"><pre v-pre class="language-yaml"><code><span class="token key atrule">name</span><span class="token punctuation">:</span> Demo Security Validation Gold Image Pipeline

<span class="token key atrule">on</span><span class="token punctuation">:</span>
  <span class="token key atrule">push</span><span class="token punctuation">:</span>
    <span class="token key atrule">branches</span><span class="token punctuation">:</span> <span class="token punctuation">[</span>main<span class="token punctuation">]</span> <span class="token comment"># trigger this action on any push to main branch</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>GitHub Actions has a number of <a href="https://docs.github.com/en/actions/using-workflows/triggering-a-workflow" target="_blank" rel="noopener noreferrer">pre-defined workflow triggers<ExternalLinkIcon/></a> we can lean on and refer to as attributes in our YAML file. GitHub will now watch for pushes to our <code v-pre>main</code> branch and run the workflow when it sees a push.</p>
<div class="hint-container warning">
<p class="hint-container-title">YAML Syntax</p>
<p>We will be heavily editing <code v-pre>pipeline.yml</code> throughout this part of the class. Recall that YAML files like this are whitespace-delimited. If you hit confusing errors when we run these pipelines, always be sure to double-check your code lines up with the examples.</p>
</div>
<div class="hint-container note">
<p class="hint-container-title">Why Is `[main]` in brackets?</p>
<p>The <code v-pre>branches</code> attribute in a workflow file can accept an array of branches we want to trigger the pipeline if they see a commit. We are only concerned with <code v-pre>main</code> at present, so we wind up with '<code v-pre>[main]</code>'.</p>
</div>
<h3 id="our-first-step" tabindex="-1"><a class="header-anchor" href="#our-first-step" aria-hidden="true">#</a> Our First Step</h3>
<p>Next, we need to define some kind of task to complete when the event triggers.</p>
<p>First, we'll define a <code v-pre>job</code>, the logical group for our tasks. In our <code v-pre>pipeline.yml</code> file, add:</p>
<CodeTabs id="83" :data='[{"id":"Adding a Job"},{"id":"<code v-pre>pipeline.yml</code> after adding a job"}]' tab-id="shell">
<template #title0="{ value, isActive }">Adding a Job</template>
<template #title1="{ value, isActive }"><code v-pre>pipeline.yml</code> after adding a job</template>
<template #tab0="{ value, isActive }">
<div class="language-yaml line-numbers-mode" data-ext="yml"><pre v-pre class="language-yaml"><code><span class="token key atrule">jobs</span><span class="token punctuation">:</span>
  <span class="token key atrule">gold-image</span><span class="token punctuation">:</span>
    <span class="token key atrule">name</span><span class="token punctuation">:</span> Gold Image NGINX
    <span class="token key atrule">runs-on</span><span class="token punctuation">:</span> ubuntu<span class="token punctuation">-</span><span class="token number">20.04</span>
    <span class="token key atrule">env</span><span class="token punctuation">:</span>
      <span class="token key atrule">CHEF_LICENSE</span><span class="token punctuation">:</span> accept <span class="token comment"># so that we can use InSpec without manually accepting the license</span>
      <span class="token key atrule">PROFILE</span><span class="token punctuation">:</span> my_nginx <span class="token comment"># path to our profile</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></template>
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></template>
</CodeTabs>
<ul>
<li><code v-pre>gold-image</code> is an arbitrary name we gave this job. It would be more useful if we were running more than one.</li>
<li><code v-pre>name</code> is a simple title for this job.</li>
<li><code v-pre>runs-on</code> declares what operating system we want our runner node to be. We picked Ubuntu (and we suggest you do to to make sure the rest of the workflow commands work correctly).</li>
<li><code v-pre>env</code> declares environment variables for use by any step of this job. We will go ahead and set a few variables for running InSpec later on:
<ul>
<li><code v-pre>CHEF_LICENSE</code> will automatically accept the license prompt when you run InSpec the first time so that we don' hang waiting for input!</li>
<li><code v-pre>PROFILE</code> is set to the path of the InSpec profile we will use to test. This will make it easier to refer to the profile multiple times and still make it easy to swap out.</li>
</ul>
</li>
</ul>
<h3 id="the-next-step" tabindex="-1"><a class="header-anchor" href="#the-next-step" aria-hidden="true">#</a> The Next Step</h3>
<p>Now that we have our job metadata in place, let's add an actual task for the runner to complete, which GitHub Actions refer to as <strong>steps</strong> -- a quick update on our runner node's dependencies (this shouldn't be strictly necessary, but it's always good to practice good dependency hygiene!). In our <code v-pre>pipeline.yml</code> file, add:</p>
<CodeTabs id="131" :data='[{"id":"Adding a Step"},{"id":"<code v-pre>pipeline.yml</code> after adding a step"}]' tab-id="shell">
<template #title0="{ value, isActive }">Adding a Step</template>
<template #title1="{ value, isActive }"><code v-pre>pipeline.yml</code> after adding a step</template>
<template #tab0="{ value, isActive }">
<div class="language-yaml line-numbers-mode" data-ext="yml"><pre v-pre class="language-yaml"><code><span class="token key atrule">steps</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> PREP <span class="token punctuation">-</span> Update runner <span class="token comment"># updating all dependencies is always a good start</span>
    <span class="token key atrule">run</span><span class="token punctuation">:</span> sudo apt<span class="token punctuation">-</span>get update
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></template>
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></template>
</CodeTabs>
<div class="hint-container warning">
<p class="hint-container-title">Again, be very careful about your whitespacing when filling out this structure!</p>
</div>
<p>We now have a valid workflow file that we can run. We can trigger this pipeline to run by simply committing what we have written so far to our repository -- because of the event trigger we set, GitHub will catch the commit event and trigger our pipeline for us. Let's do this now. At your terminal:</p>
<CodeTabs id="144" :data='[{"id":"Committing And Pushing Code"},{"id":"Output of Pushing Code"}]' tab-id="shell">
<template #title0="{ value, isActive }">Committing And Pushing Code</template>
<template #title1="{ value, isActive }">Output of Pushing Code</template>
<template #tab0="{ value, isActive }">
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">git</span> <span class="token function">add</span> .github
<span class="token function">git</span> commit <span class="token parameter variable">-s</span> <span class="token parameter variable">-m</span> <span class="token string">"adding the github workflow file"</span>
<span class="token function">git</span> push origin main
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></template>
<template #tab1="{ value, isActive }">
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>$<span class="token operator">></span> <span class="token function">git</span> <span class="token function">add</span> <span class="token builtin class-name">.</span>
$<span class="token operator">></span> <span class="token function">git</span> commit <span class="token parameter variable">-s</span> <span class="token parameter variable">-m</span> <span class="token string">"adding the github workflow file"</span>
<span class="token punctuation">[</span>main c2c357b<span class="token punctuation">]</span> adding the github workflow <span class="token function">file</span>
 <span class="token number">1</span> <span class="token function">file</span> changed, <span class="token number">16</span> insertions<span class="token punctuation">(</span>+<span class="token punctuation">)</span>
 create mode <span class="token number">100644</span> .github/workflows/pipeline.yml
$<span class="token operator">></span> <span class="token function">git</span> push origin main
Enumerating objects: <span class="token number">6</span>, done.
Counting objects: <span class="token number">100</span>% <span class="token punctuation">(</span><span class="token number">6</span>/6<span class="token punctuation">)</span>, done.
Delta compression using up to <span class="token number">2</span> threads
Compressing objects: <span class="token number">100</span>% <span class="token punctuation">(</span><span class="token number">3</span>/3<span class="token punctuation">)</span>, done.
Writing objects: <span class="token number">100</span>% <span class="token punctuation">(</span><span class="token number">5</span>/5<span class="token punctuation">)</span>, <span class="token number">713</span> bytes <span class="token operator">|</span> <span class="token number">713.00</span> KiB/s, done.
Total <span class="token number">5</span> <span class="token punctuation">(</span>delta <span class="token number">1</span><span class="token punctuation">)</span>, reused <span class="token number">0</span> <span class="token punctuation">(</span>delta <span class="token number">0</span><span class="token punctuation">)</span>, pack-reused <span class="token number">0</span>
remote: Resolving deltas: <span class="token number">100</span>% <span class="token punctuation">(</span><span class="token number">1</span>/1<span class="token punctuation">)</span>, completed with <span class="token number">1</span> <span class="token builtin class-name">local</span> object.
To https://github.com/<span class="token operator">&lt;</span>your githiub profile<span class="token operator">></span>/saf-training-lab-environment
   199b158<span class="token punctuation">..</span>c2c357b  main -<span class="token operator">></span> main
$<span class="token operator">></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></template>
</CodeTabs>
<p>Once we push our code, you can go to another tab in our browser, load up your personal code repository for the class content that you forked earlier, and check out the Actions tab to see your pipeline executing.</p>
<figure><img src="@source/assets/img/triggered_workflow.png" alt="The Pipeline Run" tabindex="0" loading="lazy"><figcaption>The Pipeline Run</figcaption></figure>
<p>Note the little green checkmark next to your pipeline run. This indicates that the pipeline has finished running. You may also see a yellow circle to indicate that the pipeline has not completed yet, or a red X mark to indicate an errr, depending on the status of your pipeline when you examine it.</p>
<p>If we click on the card for our pipeline run, we get more detail:</p>
<figure><img src="@source/assets/img/workflow_view.png" alt="The Workflow" tabindex="0" loading="lazy"><figcaption>The Workflow</figcaption></figure>
<p>You can see some info on the triggered run, including a card showing the job that we defined earlier. Clicking it gives us a view of the step we've worked into our pipeline -- we can even see the stdout (terminal output) of running that step on the runner.</p>
<figure><img src="@source/assets/img/job.png" alt="The Job" tabindex="0" loading="lazy"><figcaption>The Job</figcaption></figure>
<p>Congratulations, you've run a pipeline! Now we just need to make it do something useful for us.</p>
<details class="hint-container details"><summary>How Often Should I Push Code? Won't Each Push Trigger a Pipeline Run?</summary>
<p>It's up to you.</p>
<p>Some orchestration tools let you run pipelines locally, and in a real repo, you'd probably want to do this on a branch other than the <code v-pre>main</code> one to keep it clean. But in practice it has been the authors' experience that everyone winds up simply creating dozens of commits to the repo to trigger the pipeline and watch for the next spot where it breaks. There's nothing wrong with doing this.</p>
<p>For example, consider how many failed pipelines the author had while designing the test pipeline for this class, and how many of them involve fixing simple typos. . .</p>
<figure><img src="@source/assets/img/many_commits_are_ok.png" alt="No Big Deal!" tabindex="0" loading="lazy"><figcaption>No Big Deal!</figcaption></figure>
</details>
</div></template>


