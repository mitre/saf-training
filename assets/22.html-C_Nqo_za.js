import{_ as s}from"./plugin-vue_export-helper-DlAUqK2U.js";import{e,f as n,o as a}from"./app-DjCdDQJ2.js";const t={};function l(h,i){return a(),e("div",null,i[0]||(i[0]=[n(`<h2 id="understanding-the-kitchen-container-yml-file" tabindex="-1"><a class="header-anchor" href="#understanding-the-kitchen-container-yml-file"><span>Understanding the <code>kitchen.container.yml</code> File</span></a></h2><p>The <code>kitchen.container.yml</code> file orchestrates our container-based test suite. It defines two types of containers: hardened and vanilla, and specifies the InSpec tests to run against them. It also configures the generation and storage of test reports.</p><p>Unlike other test suites, the container suite skips the &#39;provisioner&#39; stage for the vanilla and hardened targets. Instead, during the create stage, it simply downloads and starts the specified images. This is due to the use of the <a href="https://github.com/test-kitchen/test-kitchen/blob/main/lib/kitchen/driver/dummy.rb" target="_blank" rel="noopener noreferrer">dummy Test Kitchen driver</a>, which is ideal for interacting with pre-configured or immutable targets like containers.</p><p>This approach allows for the evaluation of existing containers, even those created by other workflows. It can be leveraged to build a generalized workflow for validating any container against our Benchmark requirements, providing a comprehensive assessment of its security posture.</p><h2 id="example-kitchen-container-yml-file" tabindex="-1"><a class="header-anchor" href="#example-kitchen-container-yml-file"><span>Example <code>kitchen.container.yml</code> file</span></a></h2><div class="language-yaml line-numbers-mode" data-highlighter="shiki" data-ext="yaml" data-title="yaml" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">---</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;"># see: https://kitchen.ci/docs/drivers/dokken/</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">provisioner</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">:</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">  name</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">dummy</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">driver</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">:</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">  name</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">dokken</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">  pull_platform_image</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">false</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">transport</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">:</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">  name</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">dokken</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">platforms</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">:</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">  - </span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">name</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">ubi9</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">suites</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">:</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">  - </span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">name</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">vanilla</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">    driver</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">:</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">      image</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&lt;%= ENV[&#39;VANILLA_CONTAINER_IMAGE&#39;] || &quot;registry.access.redhat.com/ubi9/ubi:9.3-1610&quot; %&gt;</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">    verifier</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">:</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">      input_files</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">:</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">        - </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">container.vanilla.inputs.yml</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">  - </span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">name</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">hardened</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">    driver</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">:</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">      image</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&lt;%= ENV[&#39;HARDENED_CONTAINER_IMAGE&#39;] || &quot;registry1.dso.mil/ironbank/redhat/ubi/ubi9&quot; %&gt;</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">    verifier</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">:</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">      input_files</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">:</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">        - </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">container.hardened.inputs.yml</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">      # creds_file: &#39;./creds.json&#39;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="breakdown-of-the-kitchen-container-yml-file" tabindex="-1"><a class="header-anchor" href="#breakdown-of-the-kitchen-container-yml-file"><span>Breakdown of the <code>kitchen.container.yml</code> file</span></a></h1><div class="language-yaml line-numbers-mode" data-highlighter="shiki" data-ext="yaml" data-title="yaml" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">provisioner</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">:</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">  name</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">dummy</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><p>This section configures the provisioner, which is the tool that brings your system to the desired state. Here, it&#39;s using the dummy provisioner, which means no provisioning will be done.</p><div class="language-yaml line-numbers-mode" data-highlighter="shiki" data-ext="yaml" data-title="yaml" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">driver</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">:</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">  name</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">dokken</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">  pull_platform_image</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">false</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>This section configures the driver, which is responsible for creating and managing the instances. Here, it&#39;s set to use the Dokken driver, which is designed for running tests in Docker containers. The <code>pull_platform_image: false</code> option means that it won&#39;t automatically pull the Docker image for the platform; it will use the image specified in the suite.</p><div class="language-yaml line-numbers-mode" data-highlighter="shiki" data-ext="yaml" data-title="yaml" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">transport</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">:</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">  name</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">dokken</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><p>This section configures the transport, which is the method Test Kitchen uses to communicate with the instance. Here, it&#39;s using the Dokken transport, which communicates with the Docker container.</p><div class="language-yaml line-numbers-mode" data-highlighter="shiki" data-ext="yaml" data-title="yaml" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">platforms</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">:</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">  - </span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">name</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">ubi9</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><p>This section defines the platforms on which your tests will run. In this case, it&#39;s UBI 9 (Red Hat&#39;s Universal Base Image 9).</p><div class="language-yaml line-numbers-mode" data-highlighter="shiki" data-ext="yaml" data-title="yaml" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">suites</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">:</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">  - </span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">name</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">vanilla</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">    driver</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">:</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">      image</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&lt;%= ENV[&#39;VANILLA_CONTAINER_IMAGE&#39;] || &quot;registry.access.redhat.com/ubi9/ubi:9.3-1610&quot; %&gt;</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">    verifier</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">:</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">      input_files</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">:</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">        - </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">container.vanilla.inputs.yml</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">  - </span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">name</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">hardened</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">    driver</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">:</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">      image</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&lt;%= ENV[&#39;HARDENED_CONTAINER_IMAGE&#39;] || &quot;registry1.dso.mil/ironbank/redhat/ubi/ubi9&quot; %&gt;</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">    verifier</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">:</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">      input_files</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">:</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">        - </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">container.hardened.inputs.yml</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>This section defines the test suites. Each suite represents a different configuration to test.</p><ul><li>Each suite has a <code>name</code>, a <code>driver</code>, and a <code>verifier</code>.</li><li>The <code>driver</code> section specifies the Docker image to use for the suite. It&#39;s dynamically set based on the <code>VANILLA_CONTAINER_IMAGE</code> or <code>HARDENED_CONTAINER_IMAGE</code> environment variable, with a default value if the variable is not set.</li><li>The <code>verifier</code> section specifies files that contain input variables for the InSpec profile.</li></ul><p>The workflow of Test Kitchen involves the following steps:</p><ol><li><strong>Create:</strong> Test Kitchen uses the driver to create a Docker container of the platform.</li><li><strong>Converge:</strong> Test Kitchen uses the provisioner to apply the infrastructure code to the container. In this case, no provisioning is done.</li><li><strong>Verify:</strong> Test Kitchen checks if the container is in the desired state. This is not shown in your file, but it would be configured in the <code>verifier</code> section.</li><li><strong>Destroy:</strong> Test Kitchen uses the driver to destroy the container after testing. This is not shown in your file, but it would be configured in the <code>driver</code> section.</li></ol><p>The <code>transport</code> is used in all these steps to communicate with the container.</p><h2 id="environment-variables-in-kitchen-container-yml" tabindex="-1"><a class="header-anchor" href="#environment-variables-in-kitchen-container-yml"><span>Environment Variables in <code>kitchen.container.yml</code></span></a></h2><p>The <code>kitchen.container.yml</code> file uses the following environment variables to select the containers used during its <code>hardened</code> and <code>vanilla</code> testing runs. You can test any container using these environment variables, even though standard defaults are set.</p><ul><li><code>VANILLA_CONTAINER_IMAGE</code>: This variable specifies the Docker container image considered &#39;not hardened&#39;. <ul><li>default: <code>registry.access.redhat.com/ubi9/ubi:9.3-1610</code></li></ul></li><li><code>HARDENED_CONTAINER_IMAGE</code>: This variable specifies the Docker container image considered &#39;hardened&#39;. <ul><li>default: <code>registry1.dso.mil/ironbank/redhat/ubi/ubi9</code></li></ul></li></ul>`,24)]))}const p=s(t,[["render",l],["__file","22.html.vue"]]),k=JSON.parse('{"path":"/courses/profile-dev-test/22.html","title":"22. Test Kitchen - `kitchen.container.yml` File","lang":"en-US","frontmatter":{"order":22,"next":"23.md","title":"22. Test Kitchen - `kitchen.container.yml` File","author":"Aaron Lippold","description":"Understanding the kitchen.container.yml File The kitchen.container.yml file orchestrates our container-based test suite. It defines two types of containers: hardened and vanilla...","head":[["meta",{"property":"og:url","content":"https://mitre.github.io/saf-training/saf-training/courses/profile-dev-test/22.html"}],["meta",{"property":"og:site_name","content":"MITRE SAF Training"}],["meta",{"property":"og:title","content":"22. Test Kitchen - `kitchen.container.yml` File"}],["meta",{"property":"og:description","content":"Understanding the kitchen.container.yml File The kitchen.container.yml file orchestrates our container-based test suite. It defines two types of containers: hardened and vanilla..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"en-US"}],["meta",{"property":"og:updated_time","content":"2024-12-13T06:04:07.000Z"}],["meta",{"property":"article:author","content":"Aaron Lippold"}],["meta",{"property":"article:modified_time","content":"2024-12-13T06:04:07.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"22. Test Kitchen - `kitchen.container.yml` File\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-12-13T06:04:07.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Aaron Lippold\\"}]}"]]},"headers":[{"level":2,"title":"Understanding the kitchen.container.yml File","slug":"understanding-the-kitchen-container-yml-file","link":"#understanding-the-kitchen-container-yml-file","children":[]},{"level":2,"title":"Example kitchen.container.yml file","slug":"example-kitchen-container-yml-file","link":"#example-kitchen-container-yml-file","children":[]},{"level":2,"title":"Environment Variables in kitchen.container.yml","slug":"environment-variables-in-kitchen-container-yml","link":"#environment-variables-in-kitchen-container-yml","children":[]}],"git":{"createdTime":1704493101000,"updatedTime":1734069847000,"contributors":[{"name":"Aaron Lippold","username":"Aaron Lippold","email":"lippold@gmail.com","commits":4,"url":"https://github.com/Aaron Lippold"},{"name":"Amndeep Singh Mann","username":"Amndeep Singh Mann","email":"amann@mitre.org","commits":1,"url":"https://github.com/Amndeep Singh Mann"}]},"readingTime":{"minutes":2.16,"words":648},"filePathRelative":"courses/profile-dev-test/22.md","localizedDate":"January 5, 2024","autoDesc":true}');export{p as comp,k as data};
