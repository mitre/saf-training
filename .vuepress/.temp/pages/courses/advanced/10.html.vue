<template><div><h2 id="more-pipeline-steps" tabindex="-1"><a class="header-anchor" href="#more-pipeline-steps" aria-hidden="true">#</a> More Pipeline Steps</h2>
<p>Let's make this pipeline deploy, harden, validate, and verify an NGINX container.</p>
<h3 id="prep-steps" tabindex="-1"><a class="header-anchor" href="#prep-steps" aria-hidden="true">#</a> Prep Steps</h3>
<p>First, we need to make sure that the node that runs our pipeline will have access to the executables it needs. By default, Gitub's runners have quite a bit of software pre-installed, including Docker and Ansible (see the full list <a href="https://github.com/actions/runner-images/blob/main/images/linux/Ubuntu2004-Readme.md" target="_blank" rel="noopener noreferrer">here<ExternalLinkIcon/></a>). However, the Ubuntu image we are using does not have InSpec installed, nor does it have a copy of our test code. Let's add to our pipeline file to fix this.</p>
<CodeTabs id="12" :data='[{"id":"Adding More Steps"},{"id":"<code v-pre>pipeline.yml</code> after adding more steps"}]' tab-id="shell">
<template #title0="{ value, isActive }">Adding More Steps</template>
<template #title1="{ value, isActive }"><code v-pre>pipeline.yml</code> after adding more steps</template>
<template #tab0="{ value, isActive }">
<div class="language-yaml line-numbers-mode" data-ext="yml"><pre v-pre class="language-yaml"><code><span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> PREP <span class="token punctuation">-</span> Install InSpec executable 
  <span class="token key atrule">run</span><span class="token punctuation">:</span> curl https<span class="token punctuation">:</span>//omnitruck.chef.io/install.sh <span class="token punctuation">|</span> sudo bash <span class="token punctuation">-</span>s <span class="token punctuation">-</span><span class="token punctuation">-</span> <span class="token punctuation">-</span>P inspec <span class="token punctuation">-</span>v 5

<span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> PREP <span class="token punctuation">-</span> Check out this repository  <span class="token comment"># because that's where our profile is!</span>
  <span class="token key atrule">uses</span><span class="token punctuation">:</span> actions/checkout@v3
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></template>
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></template>
</CodeTabs>
<p>The first new step installs the InSpec executable using the install instructions for Ubuntu as given <a href="https://docs.chef.io/inspec/install/#cli-1" target="_blank" rel="noopener noreferrer">here<ExternalLinkIcon/></a>. Remember that GitHub gives us a brand-new runner node every time we execute the pipeline; if we don't install it and it isn't on the pre-installed software list, it won't be available!</p>
<h3 id="actions" tabindex="-1"><a class="header-anchor" href="#actions" aria-hidden="true">#</a> Actions</h3>
<p>The next step (&quot;PREP - Check out this repository&quot;) is our first one to use an Action. Actions are pre-packaged pipeline steps published to the <a href="https://github.com/marketplace?type=" target="_blank" rel="noopener noreferrer">GitHub Marketplace<ExternalLinkIcon/></a>. Any project or developer can publish an Action to the Marketplace as part of the GitHub Actions ecosystem. Most other orchestration tools for pipelines have a similar plugin system.</p>
<p>We can use Actions as shortcuts in the same way we use InSpec resources to abstract out quite a bit of test code logic. Actions are invoked with the <code v-pre>uses</code> attribute in a step in place of the <code v-pre>run</code> attribute we have been using so far, which simply executes a terminal command.</p>
<p>This Action in particular is one of the most common -- <a href="https://github.com/marketplace/actions/checkout" target="_blank" rel="noopener noreferrer"><code v-pre>checkout</code><ExternalLinkIcon/></a>. If called with no other attributes attached to it, it simply checks out and changes directory into the repository where the workflow file lives to the runner that is currently executing the workflow. We need to do this to make sure we have access to InSpec profile you created earlier!</p>
<h3 id="linting" tabindex="-1"><a class="header-anchor" href="#linting" aria-hidden="true">#</a> Linting</h3>
<p>Most CI pipelines will also include a lint step, where the code is statically tested to make sure that it does not contain errors that we can spot before we even execute it, and to make sure it is conforming to a project style guide. For our purposes, it's a good idea to run the <code v-pre>inspec check</code> command to ensure that InSpec can recognize our tests as a real profile.</p>
<p>::: Note We can run InSpec inside this runner now because we installed it in a prior step!<br>
:::</p>
<p>Let's add the lint step:</p>
<CodeTabs id="47" :data='[{"id":"Adding Lint Step"},{"id":"<code v-pre>pipeline.yml</code> after adding lint step"}]' tab-id="shell">
<template #title0="{ value, isActive }">Adding Lint Step</template>
<template #title1="{ value, isActive }"><code v-pre>pipeline.yml</code> after adding lint step</template>
<template #tab0="{ value, isActive }">
<div class="language-yaml line-numbers-mode" data-ext="yml"><pre v-pre class="language-yaml"><code><span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> LINT <span class="token punctuation">-</span> Run InSpec Check           <span class="token comment"># double-check that we don't have any serious issues in our profile code</span>
  <span class="token key atrule">run</span><span class="token punctuation">:</span> inspec check $PROFILE
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div></template>
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></template>
</CodeTabs>
<h3 id="deploy-test-container" tabindex="-1"><a class="header-anchor" href="#deploy-test-container" aria-hidden="true">#</a> Deploy Test Container</h3>
<p>We now have <code v-pre>inspec exec</code> and the <code v-pre>my_nginx</code> profile available in our pipeline. Now we need the image we're going to harden.</p>
<p>Luckily, the Ubuntu runner we are using already has the Docker Engine installed, so we can deploy a container easily. We will deploy the same container image we have been using in this class so far. We will also name it <code v-pre>nginx</code> to keep things consistent, but recall that this container is running on a GitHub cloud runner, not inside your codespace like your local containers we've been using for prior classwork.</p>
<p>We'll also need to make sure that our test target has Python installed, since that's how Ansible will connect to it later to harden it.</p>
<p>(You didn't have to do that for your local NGINX container because the <code v-pre>build-lab.sh</code> script did all that config for you.)</p>
<CodeTabs id="70" :data='[{"id":"Adding Deploy Steps"},{"id":"<code v-pre>pipeline.yml</code> after adding deploy steps"}]' tab-id="shell">
<template #title0="{ value, isActive }">Adding Deploy Steps</template>
<template #title1="{ value, isActive }"><code v-pre>pipeline.yml</code> after adding deploy steps</template>
<template #tab0="{ value, isActive }">
<div class="language-yaml line-numbers-mode" data-ext="yml"><pre v-pre class="language-yaml"><code><span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> DEPLOY <span class="token punctuation">-</span> Run a Docker container from nginx
  <span class="token key atrule">run</span><span class="token punctuation">:</span> docker run <span class="token punctuation">-</span>dit <span class="token punctuation">-</span><span class="token punctuation">-</span>name nginx nginx<span class="token punctuation">:</span>latest

<span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> DEPLOY <span class="token punctuation">-</span> Install Python for our nginx container
  <span class="token key atrule">run</span><span class="token punctuation">:</span> <span class="token punctuation">|</span><span class="token scalar string">
    docker exec nginx apt-get update -y
    docker exec nginx apt-get install -y python3</span>
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></template>
</CodeTabs>
<div class="hint-container tip">
<p class="hint-container-title">Multiline `run` commands</p>
<p>You can run a multiline script in a single <code v-pre>run</code> step by passing it as a multiline string, which is denoted with a pipe character (<code v-pre>|</code>).</p>
</div>
<h3 id="hardening" tabindex="-1"><a class="header-anchor" href="#hardening" aria-hidden="true">#</a> Hardening</h3>
<p>Alright, if our pipeline makes it this far, then we have installed InSpec, pulled our profile, checked it for errors, and deployed a test target. It's time to harden the target.</p>
<p>In our case, we're going to borrow an open-source Ansible role for NGINX that is part of the <a href="https://saf.mitre.org/libs/harden" target="_blank" rel="noopener noreferrer">SAF Hardening Library<ExternalLinkIcon/></a>. If you took the <RouterLink to="/courses/user/">SAF User Class</RouterLink>, you might recognize this role as what you ran manually during the <RouterLink to="/courses/user/10.html">Hardening</RouterLink> section of that class. Again, we are borrowing some of the steps from the lab setup script and executing them against our runner system, for convenience.</p>
<p>Let's add the Hardening steps now.</p>
<CodeTabs id="95" :data='[{"id":"Adding Harden Steps"},{"id":"<code v-pre>pipeline.yml</code> after adding hardening steps"}]' tab-id="shell">
<template #title0="{ value, isActive }">Adding Harden Steps</template>
<template #title1="{ value, isActive }"><code v-pre>pipeline.yml</code> after adding hardening steps</template>
<template #tab0="{ value, isActive }">
<div class="language-yaml line-numbers-mode" data-ext="yml"><pre v-pre class="language-yaml"><code><span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> HARDEN <span class="token punctuation">-</span> Fetch Ansible role
  <span class="token key atrule">run</span><span class="token punctuation">:</span> <span class="token punctuation">|</span><span class="token scalar string">
    git clone --branch docker https://github.com/mitre/ansible-nginx-stigready-hardening.git || true
    chmod 755 ansible-nginx-stigready-hardening</span>

<span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> HARDEN <span class="token punctuation">-</span> Fetch Ansible requirements
  <span class="token key atrule">run</span><span class="token punctuation">:</span> ansible<span class="token punctuation">-</span>galaxy install <span class="token punctuation">-</span>r ansible<span class="token punctuation">-</span>nginx<span class="token punctuation">-</span>stigready<span class="token punctuation">-</span>hardening/requirements.yml

<span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> HARDEN <span class="token punctuation">-</span> Run Ansible hardening
  <span class="token key atrule">run</span><span class="token punctuation">:</span> ansible<span class="token punctuation">-</span>playbook <span class="token punctuation">-</span><span class="token punctuation">-</span>inventory=nginx<span class="token punctuation">,</span> <span class="token punctuation">-</span><span class="token punctuation">-</span>connection=docker ansible<span class="token punctuation">-</span>nginx<span class="token punctuation">-</span>stigready<span class="token punctuation">-</span>hardening/hardening<span class="token punctuation">-</span>playbook.yml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></template>
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></template>
</CodeTabs>
<h3 id="validation" tabindex="-1"><a class="header-anchor" href="#validation" aria-hidden="true">#</a> Validation</h3>
<p>Time for the main event. Our gold image container should now be hardened, but we need to <em>prove it</em>.</p>
<p>Let's run InSpec:</p>
<CodeTabs id="112" :data='[{"id":"Adding Validate Steps"},{"id":"<code v-pre>pipeline.yml</code> after adding validate steps"}]' tab-id="shell">
<template #title0="{ value, isActive }">Adding Validate Steps</template>
<template #title1="{ value, isActive }"><code v-pre>pipeline.yml</code> after adding validate steps</template>
<template #tab0="{ value, isActive }">
<div class="language-yaml line-numbers-mode" data-ext="yml"><pre v-pre class="language-yaml"><code><span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> VALIDATE <span class="token punctuation">-</span> Run InSpec
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></template>
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></template>
</CodeTabs>
<p>You may notice that the step that runs InSpec sets an attribute called <code v-pre>continue-on-error</code> to <code v-pre>true</code>. We'll discuss why we do that in the next section.</p>
<div class="hint-container note">
<p class="hint-container-title">Where are we in the directory structure right now?!</p>
<p>Remember that we used the <code v-pre>checkout</code> action earlier, so the pipeline is currently running inside the root of our repo as it exists on the runner system. That's why we can refer to files in this repo by local paths (like the profile repo itself, and the <code v-pre>results</code> subdirectory).</p>
</div>
<h3 id="artifacts" tabindex="-1"><a class="header-anchor" href="#artifacts" aria-hidden="true">#</a> Artifacts</h3>
<p>We used the <code v-pre>--reporter json</code> flag when we invoked InSpec, so we should now have a report file sitting on the runner. We want to be able to access that file -- both so that we can read it ourselves, and so that we can do some later processing on it in later jobs if we want to.</p>
<p>That's why we used <code v-pre>upload-artifact</code>, another extremely common Action. This one makes whatever file or files you pass it available for download through the browser when we examine the pipeline run later, and also makes those files available to later jobs even if they take place on different runners in this workflow (by default, any files created by a runner do not persist when the workflow ends).</p>
<details class="hint-container details"><summary>Any Other Steps?</summary>
<p>Let's do some brainstorming -- are there any other steps you'd like to insert into the pipeline? What else do you want to know about the profile or do with it?</p>
</details>
</div></template>


