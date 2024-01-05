<template><div><h1 id="getting-to-know-the-testing-suite" tabindex="-1"><a class="header-anchor" href="#getting-to-know-the-testing-suite" aria-hidden="true">#</a> Getting to know the Testing Suite</h1>
<p>Once you've set up the necessary tools, you're ready to run the profile. The testing environment is determined by Test Kitchen using environment variables.</p>
<p>There are four testing environments to choose from:</p>
<ol>
<li>AWS VPC Testing: This environment uses an AWS VPC for testing.</li>
<li>Docker Testing: This environment uses Docker containers for testing.</li>
<li>Vagrant Testing: This environment uses Vagrant virtual machines for testing.</li>
<li>Local Testing: This environment uses your local machine for testing.</li>
</ol>
<p>The specifics of each environment's configuration are detailed in the following sections.</p>
<h1 id="getting-your-first-test-kitchen-tk-run" tabindex="-1"><a class="header-anchor" href="#getting-your-first-test-kitchen-tk-run" aria-hidden="true">#</a> Getting Your First Test Kitchen (TK) Run</h1>
<p>For each of these examples, you need to update the <code v-pre>KITCHEN_LOCAL_YAML</code> environment variable to point to the correct <code v-pre>kitchen.&lt;TEST-TARGET&gt;.yaml</code> file. Ensure that any required supporting environment settings, environment variables, profiles, etc., are in place. See Environment Variables and Testing Target Environments for more information.</p>
<p>Learn more about the Test Kitchen project at: <a href="https://kitchen.ci/" title="Test Kitchen Project Homepage" target="_blank" rel="noopener noreferrer">kitchen.ci<ExternalLinkIcon/></a></p>
<h2 id="kitchen-stages" tabindex="-1"><a class="header-anchor" href="#kitchen-stages" aria-hidden="true">#</a> Kitchen Stages</h2>
<p>Test Kitchen has four major steps: <code v-pre>create</code>, <code v-pre>converge</code>, <code v-pre>verify</code>, and <code v-pre>destroy</code>. Use these stages to create, configure, run tests, and destroy your testing target. When starting your testing, it's useful to run each of these in turn to ensure your environment, Test Kitchen, and credentials are set up and working correctly.</p>
<ol>
<li><code v-pre>create</code>:<br>
The <code v-pre>create</code> stage sets up your testing instance and prepares the necessary login credentials and other components so you can use your testing target.</li>
<li><code v-pre>converge</code>:<br>
The <code v-pre>converge</code> stage runs the provisioner of the Test Kitchen suite - the configuration management code set up in the test suite. This could be any configuration management script, such as Ansible, Chef, Puppet, Terraform, Shell, etc., that you and your team use.</li>
<li><code v-pre>verify</code>:<br>
The <code v-pre>verify</code> stage runs the actual InSpec profile against your testing target. Test Kitchen supports multiple testing frameworks, which are well documented on the project website.</li>
<li><code v-pre>destroy</code>:<br>
The <code v-pre>destroy</code> stage tears down your test target - like an EC2 instance, Docker container, or Vagrant Box.</li>
</ol>
<p>During your testing, you will use each of these steps to run the full profile, run individual controls (using the <code v-pre>INSPEC_CONTROL</code> environment variable), and manage your test instances. You will also use other Test Kitchen commands, such as <code v-pre>login</code>, <code v-pre>test</code>, and others, which are documented on the <a href="https://kitchen.ci" title="Test Kitchen Project Homepage" target="_blank" rel="noopener noreferrer">Test Kitchen Project<ExternalLinkIcon/></a> page.</p>
<p>You can also isolate which of the 'target suites' - either <code v-pre>vanilla</code> or <code v-pre>hardened</code> in our case - to run by appending either <code v-pre>hardened</code> or <code v-pre>vanilla</code> to the end of your Test Kitchen command. For example, <code v-pre>bundle exec kitchen verify</code> will run the Test Kitchen stages all the way through <code v-pre>verify</code> on <em>both</em> the <code v-pre>hardened</code> and <code v-pre>vanilla</code> suites. However, if you say, <code v-pre>bundle exec kitchen verify vanilla</code>, it will only run it on the <code v-pre>vanilla</code> test target.</p>
<h1 id="useful-test-kitchen-commands" tabindex="-1"><a class="header-anchor" href="#useful-test-kitchen-commands" aria-hidden="true">#</a> Useful Test Kitchen Commands</h1>
<ul>
<li><code v-pre>login</code>: Allows you to easily log in using the credentials created when you ran <code v-pre>bundle exec kitchen create</code>.</li>
<li><code v-pre>test</code>: Runs all the Test Kitchen stages starting with create through destroy to easily allow you to go through a full clean test run.</li>
</ul>
</div></template>


