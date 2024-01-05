<template><div><h3 id="rhel7-pipeline-example" tabindex="-1"><a class="header-anchor" href="#rhel7-pipeline-example" aria-hidden="true">#</a> RHEL7 Pipeline example</h3>
<p>Below is a <a href="https://github.com/mitre/redhat-enterprise-linux-7-stig-baseline/blob/master/.github/workflows/verify-ec2.yml" target="_blank" rel="noopener noreferrer">RedHat 7 example<ExternalLinkIcon/></a> of an automated pipeline that creates and configures two machines with the RedHat 7 operating system - one of which is set up as a vanilla configuration, and one of which is hardened using hardening scripts run by the Chef configuration management tool called kitchen.</p>
<p>This pipeline is intended to validate that the RHEL7 InSpec profile itself functions correctly. We're not too concerned with whether out &quot;hardened&quot; box is actually hardened; we just want to know if InSpec is assessing it correctly.</p>
<div class="hint-container note">
<p class="hint-container-title">Why Vanilla and Hardened?</p>
<p>Having two test suites, where one is hardened and one is not, can be useful for seeing the differences between how a profile behaves on different types of systems.</p>
<p>It also has the added bonus of simultaneously validating that whatever tool we use for hardening is working correctly.</p>
</div>
<div class="hint-container info">
<p class="hint-container-title">Modularity in Automation</p>
<p>We will demonstrate the automation process through this example, but note that the different orchestration tools, configuration mangement tools, and targets can be traded out for different uses while following the same automation flow and security automation framework.</p>
</div>
<figure><img src="@source/assets/img/CI_Pipeline_Flow_EC2_Example.png" alt="The CI Pipeline" tabindex="0" loading="lazy"><figcaption>The CI Pipeline</figcaption></figure>
<div class="language-yaml line-numbers-mode" data-ext="yml"><pre v-pre class="language-yaml"><code><span class="token key atrule">name</span><span class="token punctuation">:</span> EC2 Testing Matrix

<span class="token key atrule">on</span><span class="token punctuation">:</span>
  <span class="token key atrule">push</span><span class="token punctuation">:</span>
    <span class="token key atrule">branches</span><span class="token punctuation">:</span> <span class="token punctuation">[</span> main <span class="token punctuation">]</span>
  <span class="token key atrule">pull_request</span><span class="token punctuation">:</span>
    <span class="token key atrule">branches</span><span class="token punctuation">:</span> <span class="token punctuation">[</span> main <span class="token punctuation">]</span>

<span class="token key atrule">jobs</span><span class="token punctuation">:</span>
  <span class="token key atrule">my-job</span><span class="token punctuation">:</span>
    <span class="token key atrule">name</span><span class="token punctuation">:</span> Validate my profile
    <span class="token key atrule">runs-on</span><span class="token punctuation">:</span> ubuntu<span class="token punctuation">-</span>latest
    <span class="token key atrule">env</span><span class="token punctuation">:</span>
      <span class="token key atrule">CHEF_LICENSE</span><span class="token punctuation">:</span> accept<span class="token punctuation">-</span>silent
      <span class="token key atrule">KITCHEN_LOCAL_YAML</span><span class="token punctuation">:</span> kitchen.ec2.yml
      <span class="token key atrule">LC_ALL</span><span class="token punctuation">:</span> <span class="token string">"en_US.UTF-8"</span>
    <span class="token key atrule">strategy</span><span class="token punctuation">:</span>
      <span class="token key atrule">matrix</span><span class="token punctuation">:</span>
        <span class="token key atrule">suite</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">'vanilla'</span><span class="token punctuation">,</span> <span class="token string">'hardened'</span><span class="token punctuation">]</span>
      <span class="token key atrule">fail-fast</span><span class="token punctuation">:</span> <span class="token boolean important">false</span>
    <span class="token key atrule">steps</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> add needed packages
        <span class="token key atrule">run</span><span class="token punctuation">:</span> sudo apt<span class="token punctuation">-</span>get install <span class="token punctuation">-</span>y jq
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Configure AWS credentials
        <span class="token key atrule">env</span><span class="token punctuation">:</span>
          <span class="token key atrule">AWS_SG_ID</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span><span class="token punctuation">{</span> secrets.SAF_AWS_SG_ID <span class="token punctuation">}</span><span class="token punctuation">}</span>
          <span class="token key atrule">AWS_SUBNET_ID</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span><span class="token punctuation">{</span> secrets.SAF_AWS_SUBNET_ID <span class="token punctuation">}</span><span class="token punctuation">}</span>
        <span class="token key atrule">uses</span><span class="token punctuation">:</span> aws<span class="token punctuation">-</span>actions/configure<span class="token punctuation">-</span>aws<span class="token punctuation">-</span>credentials@v1
        <span class="token key atrule">with</span><span class="token punctuation">:</span>
          <span class="token key atrule">aws-access-key-id</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span><span class="token punctuation">{</span> secrets.SAF_AWS_ACCESS_KEY_ID <span class="token punctuation">}</span><span class="token punctuation">}</span>
          <span class="token key atrule">aws-secret-access-key</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span><span class="token punctuation">{</span> secrets.SAF_AWS_SECRET_ACCESS_KEY <span class="token punctuation">}</span><span class="token punctuation">}</span>
          <span class="token key atrule">aws-region</span><span class="token punctuation">:</span> us<span class="token punctuation">-</span>east<span class="token punctuation">-</span><span class="token number">1</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Check out repository
        <span class="token key atrule">uses</span><span class="token punctuation">:</span> actions/checkout@v2
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Clone full repository so we can push
        <span class="token key atrule">run</span><span class="token punctuation">:</span> git fetch <span class="token punctuation">-</span><span class="token punctuation">-</span>prune <span class="token punctuation">-</span><span class="token punctuation">-</span>unshallow
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Setup Ruby
        <span class="token key atrule">uses</span><span class="token punctuation">:</span> ruby/setup<span class="token punctuation">-</span>ruby@v1
        <span class="token key atrule">with</span><span class="token punctuation">:</span>
          <span class="token key atrule">ruby-version</span><span class="token punctuation">:</span> <span class="token string">'2.7'</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Disable ri and rdoc
        <span class="token key atrule">run</span><span class="token punctuation">:</span> <span class="token string">'echo "gem: --no-ri --no-rdoc" >> ~/.gemrc'</span>
      <span class="token punctuation">-</span> <span class="token key atrule">run</span><span class="token punctuation">:</span> bundle install
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Regenerate current `profile.json`
        <span class="token key atrule">run</span><span class="token punctuation">:</span> <span class="token punctuation">|</span><span class="token scalar string">
          bundle exec inspec json . | jq . > profile.json</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Lint the Inspec profile
        <span class="token key atrule">run</span><span class="token punctuation">:</span> bundle exec inspec check .
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Run kitchen test
        <span class="token key atrule">run</span><span class="token punctuation">:</span> bundle exec kitchen test <span class="token punctuation">-</span><span class="token punctuation">-</span>destroy=always $<span class="token punctuation">{</span><span class="token punctuation">{</span> matrix.suite <span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token punctuation">-</span>rhel<span class="token punctuation">-</span>7 <span class="token punctuation">|</span><span class="token punctuation">|</span> true
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Display our $<span class="token punctuation">{</span><span class="token punctuation">{</span> matrix.suite <span class="token punctuation">}</span><span class="token punctuation">}</span> results summary
        <span class="token key atrule">uses</span><span class="token punctuation">:</span> mitre/saf_action@v1
        <span class="token key atrule">with</span><span class="token punctuation">:</span>
          <span class="token key atrule">command_string</span><span class="token punctuation">:</span> <span class="token string">'view summary -i spec/results/ec2_rhel-7_${{ matrix.suite }}.json'</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Ensure the scan meets our $<span class="token punctuation">{</span><span class="token punctuation">{</span> matrix.suite <span class="token punctuation">}</span><span class="token punctuation">}</span> results threshold
        <span class="token key atrule">uses</span><span class="token punctuation">:</span> mitre/saf_action@v1
        <span class="token key atrule">with</span><span class="token punctuation">:</span>
          <span class="token key atrule">command_string</span><span class="token punctuation">:</span> <span class="token string">'validate threshold -i spec/results/ec2_rhel-7_${{ matrix.suite }}.json -F ${{ matrix.suite }}.threshold.yml'</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Save Test Result JSON
        <span class="token key atrule">uses</span><span class="token punctuation">:</span> actions/upload<span class="token punctuation">-</span>artifact@v2
        <span class="token key atrule">with</span><span class="token punctuation">:</span>
          <span class="token key atrule">path</span><span class="token punctuation">:</span> spec/results/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>The two machines are then tested by running an InSpec profile. The results are viewed and validated against a threshold to allow the pipeline to automatically pass or fail based on whether the results meet those thresholds. The SAF CLI is used to view and validate.</p>
<div class="hint-container tip">
<p class="hint-container-title">Use Examples to Help Automate</p>
<p>To get more information on setting up the whole automation pipeline for your use case, use examples, such as the <a href="https://github.com/mitre/redhat-enterprise-linux-7-stig-baseline/" target="_blank" rel="noopener noreferrer">RedHat 7 repository<ExternalLinkIcon/></a>. You can view results of the workflows in the <a href="https://github.com/mitre/redhat-enterprise-linux-7-stig-baseline/actions" target="_blank" rel="noopener noreferrer">Actions tab<ExternalLinkIcon/></a>.</p>
</div>
<h3 id="_5-2-pipeline-example-with-manual-attestations" tabindex="-1"><a class="header-anchor" href="#_5-2-pipeline-example-with-manual-attestations" aria-hidden="true">#</a> 5.2. Pipeline Example with Manual Attestations</h3>
<p>You could also add manual attestations with the SAF CLI to the pipeline to combine applicable manual attestations to the automated test results to determine a more full and accurate look at the overall security posture.​ SAF supports the validation of all controls including both automatable controls and manual attestation of those controls that cannot be automated. This expands the SAF’s coverage across interview, examination, and policy controls.​​</p>
<p>In a general sense we can use the SAF CLI to manage security data in the pipeline, supporting activities for managing POA&amp;Ms.</p>
<p>To practice doing manual attestations, take a look at the <RouterLink to="/courses/user/12.html">User Class</RouterLink>.</p>
<figure><img src="@source/assets/img/CI_Pipeline_Flow_EC2_Example_With_Attestation.png" alt="The CI Pipeline - Attestation" tabindex="0" loading="lazy"><figcaption>The CI Pipeline - Attestation</figcaption></figure>
</div></template>


