<template><div><h1 id="test-kitchen-create-stage" tabindex="-1"><a class="header-anchor" href="#test-kitchen-create-stage" aria-hidden="true">#</a> Test Kitchen Create Stage</h1>
<p>The <code v-pre>create</code> stage in Test Kitchen sets up testing environments. It uses standard and patched images from AWS and Red Hat, including AMI EC2 images, Docker containers, and Vagrant boxes.</p>
<p>Test Kitchen automatically fetches the latest images from sources like Amazon Marketplace, DockerHub, Vagrant Marketplace, and Bento Hub. You can customize this to use different images, private repositories (like Platform One's Iron Bank), or local images.</p>
<p>For more details on how Test Kitchen manages images, visit the <a href="https://kitchen.ci" target="_blank" rel="noopener noreferrer">Test Kitchen website<ExternalLinkIcon/></a>. You can also refer to the GitHub documentation for the <code v-pre>kitchen-ec2</code>, <code v-pre>kitchen-vagrant</code>, <code v-pre>kitchen-sync</code>, and  <a href="https://github.com/inspec/kitchen-inspec" target="_blank" rel="noopener noreferrer"><code v-pre>kitchen-inspec</code><ExternalLinkIcon/></a> project on GitHub.</p>
</div></template>


