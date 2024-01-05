<template><div><h1 id="test-kitchen-validate-stage" tabindex="-1"><a class="header-anchor" href="#test-kitchen-validate-stage" aria-hidden="true">#</a> Test Kitchen Validate Stage</h1>
<p>The <code v-pre>verify</code> stage uses the <code v-pre>kitchen-inspec</code> verifier from Test Kitchen to run the profile against the test targets.</p>
<p>For this stage, the profile receives a set of tailored <code v-pre>input</code> YAML files. These files adjust the testing for each target, ensuring accurate validation against the expected state and minimizing false results.</p>
<p>There are also specific <code v-pre>threshold</code> files for each target environment platform (EC2, container, and Vagrant) in both the <code v-pre>vanilla</code> and <code v-pre>hardened</code> suites.</p>
<p>The following sections provide a detailed breakdown of these files, their structure, and the workflow organization.</p>
</div></template>


