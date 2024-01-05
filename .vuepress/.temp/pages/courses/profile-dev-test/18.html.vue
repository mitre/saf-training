<template><div><h1 id="test-kitchen-destroy-stage" tabindex="-1"><a class="header-anchor" href="#test-kitchen-destroy-stage" aria-hidden="true">#</a> Test Kitchen Destroy Stage</h1>
<p>The <code v-pre>destroy</code> stage terminates the EC2 instances, Vagrant boxes, or containers that Test Kitchen created for testing.</p>
<p>Occasionally, the <code v-pre>destroy</code> stage may encounter issues if the hosting platforms have altered the state of the provisioned instance during your writing, testing, or debugging sessions. If you face any problems with the <code v-pre>destroy</code> stage or any other Test Kitchen commands, verify the following:</p>
<ul>
<li>The test target's login, hostname, and IP address are still accurate.</li>
<li>The test instance is still running on the hosting platforms.</li>
</ul>
<p>Sometimes, the solution can be as simple as checking if the instance is still active.</p>
</div></template>


