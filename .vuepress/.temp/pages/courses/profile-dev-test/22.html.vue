<template><div><h1 id="understanding-the-kitchen-container-yml" tabindex="-1"><a class="header-anchor" href="#understanding-the-kitchen-container-yml" aria-hidden="true">#</a> Understanding the <a href="./kitchen.container.yml"><code v-pre>kitchen.container.yml</code></a></h1>
<p>The <code v-pre>kitchen.container.yml</code> file orchestrates our container-based test suite. It defines two types of containers, hardened and vanilla, and specifies the inspec_tests to run against them. It also configures the generation and storage of test reports.</p>
<p>Unlike other test suites, the container suite skips the 'provisioner' stage for the vanilla and hardened targets. Instead, during the create stage, it simply downloads and starts the specified images. This is due to the use of the <a href="https://github.com/test-kitchen/test-kitchen/blob/main/lib/kitchen/driver/dummy.rb" target="_blank" rel="noopener noreferrer">dummy Test Kitchen driver<ExternalLinkIcon/></a>, which is ideal for interacting with pre-configured or immutable targets like containers.</p>
<p>This approach allows for the evaluation of existing containers, even those created by other workflows. It can be leveraged to build a generalized workflow for validating any container against our Benchmark requirements, providing a comprehensive assessment of its security posture.</p>
<h2 id="example-kitchen-container-yml-file" tabindex="-1"><a class="header-anchor" href="#example-kitchen-container-yml-file" aria-hidden="true">#</a> Example <code v-pre>kitchen.container.yml</code> file</h2>
<div class="language-yaml line-numbers-mode" data-ext="yml"><pre v-pre class="language-yaml"><code><span class="token punctuation">---</span>
<span class="token comment"># see: https://kitchen.ci/docs/drivers/dokken/</span>

<span class="token key atrule">provisioner</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> dummy

<span class="token key atrule">driver</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> dokken
  <span class="token key atrule">pull_platform_image</span><span class="token punctuation">:</span> <span class="token boolean important">false</span>

<span class="token key atrule">transport</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> dokken

<span class="token key atrule">platforms</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> ubi8

<span class="token key atrule">suites</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> vanilla
    <span class="token key atrule">driver</span><span class="token punctuation">:</span>
      <span class="token key atrule">image</span><span class="token punctuation">:</span> &lt;%= ENV<span class="token punctuation">[</span><span class="token string">'VANILLA_CONTAINER_IMAGE'</span><span class="token punctuation">]</span> <span class="token punctuation">|</span><span class="token punctuation">|</span> "registry.access.redhat.com/ubi8/ubi<span class="token punctuation">:</span>8.9<span class="token punctuation">-</span>1028" %<span class="token punctuation">></span>
    <span class="token key atrule">verifier</span><span class="token punctuation">:</span>
      <span class="token key atrule">input_files</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> container.vanilla.inputs.yml
  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> hardened
    <span class="token key atrule">driver</span><span class="token punctuation">:</span>
      <span class="token key atrule">image</span><span class="token punctuation">:</span> &lt;%= ENV<span class="token punctuation">[</span><span class="token string">'HARDENED_CONTAINER_IMAGE'</span><span class="token punctuation">]</span> <span class="token punctuation">|</span><span class="token punctuation">|</span> "registry1.dso.mil/ironbank/redhat/ubi/ubi8" %<span class="token punctuation">></span>
    <span class="token key atrule">verifier</span><span class="token punctuation">:</span>
      <span class="token key atrule">input_files</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> container.hardened.inputs.yml
      <span class="token comment"># creds_file: './creds.json'</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="breakdown-of-the-kitchen-container-yml-file" tabindex="-1"><a class="header-anchor" href="#breakdown-of-the-kitchen-container-yml-file" aria-hidden="true">#</a> Breakdown of the <code v-pre>kitchen.container.yml</code> file:</h1>
<div class="language-yaml line-numbers-mode" data-ext="yml"><pre v-pre class="language-yaml"><code><span class="token key atrule">provisioner</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> dummy
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>This section configures the provisioner, which is the tool that brings your system to the desired state. Here, it's using a dummy provisioner, which means no provisioning will be done.</p>
<div class="language-yaml line-numbers-mode" data-ext="yml"><pre v-pre class="language-yaml"><code><span class="token key atrule">driver</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> dokken
  <span class="token key atrule">pull_platform_image</span><span class="token punctuation">:</span> <span class="token boolean important">false</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>This section configures the driver, which is responsible for creating and managing the instances. Here, it's set to use the Dokken driver, which is designed for running tests in Docker containers. The <code v-pre>pull_platform_image: false</code> option means that it won't automatically pull the Docker image for the platform; it will use the image specified in the suite.</p>
<div class="language-yaml line-numbers-mode" data-ext="yml"><pre v-pre class="language-yaml"><code><span class="token key atrule">transport</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> dokken
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>This section configures the transport, which is the method Test Kitchen uses to communicate with the instance. Here, it's using the Dokken transport, which communicates with the Docker container.</p>
<div class="language-yaml line-numbers-mode" data-ext="yml"><pre v-pre class="language-yaml"><code><span class="token key atrule">platforms</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> ubi8
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>This section defines the platforms on which your tests will run. In this case, it's UBI 8 (Red Hat's Universal Base Image 8).</p>
<div class="language-yaml line-numbers-mode" data-ext="yml"><pre v-pre class="language-yaml"><code><span class="token key atrule">suites</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> vanilla
    <span class="token key atrule">driver</span><span class="token punctuation">:</span>
      <span class="token key atrule">image</span><span class="token punctuation">:</span> &lt;%= ENV<span class="token punctuation">[</span><span class="token string">'VANILLA_CONTAINER_IMAGE'</span><span class="token punctuation">]</span> <span class="token punctuation">|</span><span class="token punctuation">|</span> "registry.access.redhat.com/ubi8/ubi<span class="token punctuation">:</span>8.9<span class="token punctuation">-</span>1028" %<span class="token punctuation">></span>
    <span class="token key atrule">verifier</span><span class="token punctuation">:</span>
      <span class="token key atrule">input_files</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> container.vanilla.inputs.yml
  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> hardened
    <span class="token key atrule">driver</span><span class="token punctuation">:</span>
      <span class="token key atrule">image</span><span class="token punctuation">:</span> &lt;%= ENV<span class="token punctuation">[</span><span class="token string">'HARDENED_CONTAINER_IMAGE'</span><span class="token punctuation">]</span> <span class="token punctuation">|</span><span class="token punctuation">|</span> "registry1.dso.mil/ironbank/redhat/ubi/ubi8" %<span class="token punctuation">></span>
    <span class="token key atrule">verifier</span><span class="token punctuation">:</span>
      <span class="token key atrule">input_files</span><span class="token punctuation">:</span>
        <span class="token punctuation">-</span> container.hardened.inputs.yml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>This section defines the test suites. Each suite represents a different configuration to test.</p>
<ul>
<li>Each suite has a <code v-pre>name</code>, a <code v-pre>driver</code>, and a <code v-pre>verifier</code>.</li>
<li>The <code v-pre>driver</code> section specifies the Docker image to use for the suite. It's dynamically set based on the <code v-pre>VANILLA_CONTAINER_IMAGE</code> or <code v-pre>HARDENED_CONTAINER_IMAGE</code> environment variable, with a default value if the variable is not set.</li>
<li>The <code v-pre>verifier</code> section specifies files that contain input variables for the InSpec profile.</li>
</ul>
<p>The workflow of Test Kitchen involves the following steps:</p>
<ol>
<li><strong>Create:</strong> Test Kitchen uses the driver to create a Docker container of the platform.</li>
<li><strong>Converge:</strong> Test Kitchen uses the provisioner to apply the infrastructure code to the container. In this case, no provisioning is done.</li>
<li><strong>Verify:</strong> Test Kitchen checks if the container is in the desired state. This is not shown in your file, but it would be configured in the <code v-pre>verifier</code> section.</li>
<li><strong>Destroy:</strong> Test Kitchen uses the driver to destroy the container after testing. This is not shown in your file, but it would be configured in the <code v-pre>driver</code> section.</li>
</ol>
<p>The <code v-pre>transport</code> is used in all these steps to communicate with the container.</p>
<h2 id="environment-variables-in-kitchen-container-yml" tabindex="-1"><a class="header-anchor" href="#environment-variables-in-kitchen-container-yml" aria-hidden="true">#</a> Environment Variables in <code v-pre>kitchen.container.yml</code></h2>
<p>The <code v-pre>kitchen.container.yml</code> file uses the following environment variables to select the containers used during its <code v-pre>hardened</code> and <code v-pre>vanilla</code> testing runs. You can test any container using these environment variables, even though standard defaults are set.</p>
<ul>
<li><code v-pre>VANILLA_CONTAINER_IMAGE</code>: This variable specifies the Docker container image considered 'not hardened'.
<ul>
<li>default: <code v-pre>registry.access.redhat.com/ubi8/ubi:8.9-1028</code></li>
</ul>
</li>
<li><code v-pre>HARDENED_CONTAINER_IMAGE</code>: This variable specifies the Docker container image considered 'hardened'.
<ul>
<li>default: <code v-pre>registry1.dso.mil/ironbank/redhat/ubi/ubi8</code></li>
</ul>
</li>
</ul>
</div></template>


