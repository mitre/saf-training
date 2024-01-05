<template><div><h1 id="aws-testing-setup" tabindex="-1"><a class="header-anchor" href="#aws-testing-setup" aria-hidden="true">#</a> AWS Testing Setup</h1>
<ol>
<li>Configure your AWS CLI and set up your AWS Credentials.</li>
<li>Test your AWS CLI access by running: <code v-pre>aws s3 ls</code>.</li>
<li>Clone the repository.</li>
<li>Navigate to the profile repository root directory.</li>
<li>Set the environment variable for the kitchen configuration file: <code v-pre>export KITCHEN_LOCAL_YAML=kitchen.ec2.yml</code>.</li>
<li>This uses the <a href="https://kitchen.ci/docs/drivers/aws/" title="Test Kitchen AWS EC2 Driver Documentation" target="_blank" rel="noopener noreferrer">kitchen-ec2 driver<ExternalLinkIcon/></a>.</li>
<li>(Optional) Set a specific control to run: <code v-pre>export INSPEC_CONTROL='SV-230222'</code>.</li>
</ol>
<h1 id="running-through-the-aws-test-suite" tabindex="-1"><a class="header-anchor" href="#running-through-the-aws-test-suite" aria-hidden="true">#</a> Running Through the AWS Test Suite</h1>
<ol start="6">
<li>List the kitchen instances with: <code v-pre>bundle exec kitchen list</code>. You should see something like this:</li>
</ol>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>  Instance         Driver  Provisioner      Verifier  Transport  Last Action  Last Error
  vanilla-rhel-8   Ec2     AnsiblePlaybook  Inspec    Ssh        Verified     None
  hardened-rhel-8  Ec2     AnsiblePlaybook  Inspec    Ssh        Verified     None
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="7">
<li>Create a kitchen instance: <code v-pre>bundle exec kitchen create vanilla</code>.</li>
</ol>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>➜  redhat-enterprise-linux-8-stig-baseline git:<span class="token punctuation">(</span>main*<span class="token punctuation">)</span>bundle <span class="token builtin class-name">exec</span> kitchen create vanilla
-----<span class="token operator">></span> Starting Test Kitchen <span class="token punctuation">(</span>v3.5.1<span class="token punctuation">)</span>
-----<span class="token operator">></span> Creating <span class="token operator">&lt;</span>vanilla-rhel-<span class="token operator"><span class="token file-descriptor important">8</span>></span><span class="token punctuation">..</span>.
    <span class="token operator">&lt;</span> OTHER OUTPUT <span class="token operator">></span>
    Finished creating <span class="token operator">&lt;</span>vanilla-rhel-<span class="token operator"><span class="token file-descriptor important">8</span>></span> <span class="token punctuation">(</span>0m0.00s<span class="token punctuation">)</span>.
-----<span class="token operator">></span> Test Kitchen is finished. <span class="token punctuation">(</span>0m1.21s<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="8">
<li>Converge the kitchen instance: <code v-pre>bundle exec kitchen converge</code>.</li>
</ol>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>➜  redhat-enterprise-linux-8-stig-baseline git:<span class="token punctuation">(</span>main*<span class="token punctuation">)</span>bundle <span class="token builtin class-name">exec</span> kitchen converge vanilla
-----<span class="token operator">></span> Starting Test Kitchen <span class="token punctuation">(</span>v3.5.1<span class="token punctuation">)</span>
      NOTICE - Installing needed packages
      Updating Subscription Management repositories.
      Unable to <span class="token builtin class-name">read</span> consumer identity

      This system is not registered with an entitlement server. You can use subscription-manager to register.

      <span class="token number">39</span> files removed
      <span class="token operator">&lt;</span> LOTS OF OTHER OUTPUT <span class="token operator">></span>
      Downloading files from <span class="token operator">&lt;</span>vanilla-rhel-<span class="token operator"><span class="token file-descriptor important">8</span>></span>
      Finished converging <span class="token operator">&lt;</span>vanilla-rhel-<span class="token operator"><span class="token file-descriptor important">8</span>></span> <span class="token punctuation">(</span>0m21.36s<span class="token punctuation">)</span>.
-----<span class="token operator">></span> Test Kitchen is finished. <span class="token punctuation">(</span>1m13.52s<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="9">
<li>Run InSpec on the kitchen instance: <code v-pre>bundle exec kitchen verify</code>.</li>
</ol>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>    ➜  redhat-enterprise-linux-8-stig-baseline git:<span class="token punctuation">(</span>main*<span class="token punctuation">)</span>bundle <span class="token builtin class-name">exec</span> kitchen verify vanilla
  -----<span class="token operator">></span> Starting Test Kitchen <span class="token punctuation">(</span>v3.5.1<span class="token punctuation">)</span>
  -----<span class="token operator">></span> Setting up <span class="token operator">&lt;</span>vanilla-rhel-<span class="token operator"><span class="token file-descriptor important">8</span>></span><span class="token punctuation">..</span>.
        Finished setting up <span class="token operator">&lt;</span>vanilla-rhel-<span class="token operator"><span class="token file-descriptor important">8</span>></span> <span class="token punctuation">(</span>0m0.00s<span class="token punctuation">)</span>.
  -----<span class="token operator">></span> Verifying <span class="token operator">&lt;</span>vanilla-rhel-<span class="token operator"><span class="token file-descriptor important">8</span>></span><span class="token punctuation">..</span>.
        Loaded redhat-enterprise-linux-8-stig-baseline
  Could not determine patch status.
  Profile:   redhat-enterprise-linux-8-stig-baseline <span class="token punctuation">(</span>redhat-enterprise-linux-8-stig-baseline<span class="token punctuation">)</span>
  Version:   <span class="token number">1.12</span>.0
  Target:    ssh://ec2-user@34.229.216.179:22
  Target ID: 4c62a305-69eb-5ed6-9ee7-723cdc21c578

    ✔  SV-230222: RHEL <span class="token number">8</span> vendor packaged system security patches and updates must be installed and up to date.
      ✔  List of out-of-date packages is expected to be empty
  Profile Summary: <span class="token number">1</span> successful control, <span class="token number">0</span> control failures, <span class="token number">0</span> controls skipped
  Test Summary: <span class="token number">1</span> successful, <span class="token number">0</span> failures, <span class="token number">0</span> skipped
        Finished verifying <span class="token operator">&lt;</span>vanilla-rhel-<span class="token operator"><span class="token file-descriptor important">8</span>></span> <span class="token punctuation">(</span>0m5.38s<span class="token punctuation">)</span>.
  -----<span class="token operator">></span> Test Kitchen is finished. <span class="token punctuation">(</span>0m6.62s<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="10">
<li>Destroy the kitchen instance: <code v-pre>bundle exec kitchen destroy vanilla</code>.</li>
<li>For steps that apply to making updates, patches, and updates to the profile, see the next section, <a href="#18-updating-the-profile">Updating the Profile</a>.</li>
<li>Your InSpec scan results are located in the <code v-pre>./spec/results/</code> directory, nameed <code v-pre>./spec/results/rhel-8_*</code>.</li>
<li>Use <a href="https://heimdall-lite.mitre.org" title="MITRE Heimdall Lite" target="_blank" rel="noopener noreferrer">Heimdall Lite<ExternalLinkIcon/></a> to load both the <code v-pre>hardened</code> and <code v-pre>vanilla</code> results to ensure your changes and updates, &quot;failed as expected and passed as expected and covered your courner cases.&quot;</li>
</ol>
</div></template>


