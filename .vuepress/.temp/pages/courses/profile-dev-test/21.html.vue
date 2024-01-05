<template><div><h1 id="understanding-the-kitchen-ec2-yml-file" tabindex="-1"><a class="header-anchor" href="#understanding-the-kitchen-ec2-yml-file" aria-hidden="true">#</a> Understanding the <code v-pre>kitchen.ec2.yml</code> File</h1>
<p>The <code v-pre>kitchen.ec2.yml</code> file is instrumental in setting up our testing targets within the AWS environment. It outlines the configuration details for these targets, including their VPC assignments and the specific settings for each VPC.</p>
<p>This file leverages the <code v-pre> AWS CLI and AWS Credentials</code> configured as described in the previous <a href="#13-required-software">Required Software</a> section.</p>
<p>Alternatively, if you've set up AWS Environment Variables, the file will use those for AWS interactions.</p>
<h2 id="example-kitchen-ec2-yml-file" tabindex="-1"><a class="header-anchor" href="#example-kitchen-ec2-yml-file" aria-hidden="true">#</a> Example <code v-pre>kitchen.ec2.yml</code> file</h2>
<div class="language-yaml line-numbers-mode" data-ext="yml"><pre v-pre class="language-yaml"><code><span class="token punctuation">---</span>
<span class="token key atrule">platforms</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> rhel<span class="token punctuation">-</span><span class="token number">8</span>

<span class="token key atrule">driver</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> ec2
  <span class="token key atrule">metadata_options</span><span class="token punctuation">:</span>
    <span class="token key atrule">http_tokens</span><span class="token punctuation">:</span> required
    <span class="token key atrule">http_put_response_hop_limit</span><span class="token punctuation">:</span> <span class="token number">1</span>
    <span class="token key atrule">instance_metadata_tags</span><span class="token punctuation">:</span> enabled
  <span class="token key atrule">instance_type</span><span class="token punctuation">:</span> m5.large
  <span class="token key atrule">associate_public_ip</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
  <span class="token key atrule">interface</span><span class="token punctuation">:</span> public
  <span class="token key atrule">skip_cost_warning</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
  <span class="token key atrule">privileged</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
  <span class="token key atrule">tags</span><span class="token punctuation">:</span>
    <span class="token key atrule">CreatedBy</span><span class="token punctuation">:</span> test<span class="token punctuation">-</span>kitchen

<span class="token key atrule">provisioner</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> ansible_playbook
  <span class="token key atrule">hosts</span><span class="token punctuation">:</span> all
  <span class="token key atrule">require_chef_for_busser</span><span class="token punctuation">:</span> <span class="token boolean important">false</span>
  <span class="token key atrule">require_ruby_for_busser</span><span class="token punctuation">:</span> <span class="token boolean important">false</span>
  <span class="token key atrule">ansible_binary_path</span><span class="token punctuation">:</span> /usr/local/bin
  <span class="token key atrule">require_pip3</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
  <span class="token key atrule">ansible_verbose</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
  <span class="token key atrule">roles_path</span><span class="token punctuation">:</span> spec/ansible/roles
  <span class="token key atrule">galaxy_ignore_certs</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
  <span class="token key atrule">requirements_path</span><span class="token punctuation">:</span> spec/ansible/roles/requirements.yml
  <span class="token key atrule">ansible_extra_flags</span><span class="token punctuation">:</span> &lt;%= ENV<span class="token punctuation">[</span><span class="token string">'ANSIBLE_EXTRA_FLAGS'</span><span class="token punctuation">]</span> %<span class="token punctuation">></span>

<span class="token key atrule">lifecycle</span><span class="token punctuation">:</span>
  <span class="token key atrule">pre_converge</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">remote</span><span class="token punctuation">:</span> <span class="token punctuation">|</span><span class="token scalar string">
        echo "NOTICE - Installing needed packages"
        sudo dnf -y clean all
        sudo dnf -y install --nogpgcheck bc bind-utils redhat-lsb-core vim
        echo "updating system packages"
        sudo dnf -y update --nogpgcheck --nobest
        sudo dnf -y distro-sync
        echo "NOTICE - Updating the ec2-user to keep sudo working"
        sudo chage -d $(( $( date +%s ) / 86400 )) ec2-user
        echo "NOTICE - updating ec2-user sudo config"
        sudo chmod 600 /etc/sudoers &amp;&amp; sudo sed -i'' "/ec2-user/d" /etc/sudoers &amp;&amp; sudo chmod 400 /etc/sudoers</span>

<span class="token key atrule">transport</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> ssh
  <span class="token key atrule">max_ssh_sessions</span><span class="token punctuation">:</span> <span class="token number">2</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="breakdown-of-the-kitchen-ec2-yml-file" tabindex="-1"><a class="header-anchor" href="#breakdown-of-the-kitchen-ec2-yml-file" aria-hidden="true">#</a> Breakdown of the <code v-pre>kitchen.ec2.yml</code> file</h1>
<div class="language-yaml line-numbers-mode" data-ext="yml"><pre v-pre class="language-yaml"><code><span class="token key atrule">platforms</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> rhel<span class="token punctuation">-</span><span class="token number">8</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>This section defines the platforms on which your tests will run. In this case, it's Red Hat Enterprise Linux 8.</p>
<div class="language-yaml line-numbers-mode" data-ext="yml"><pre v-pre class="language-yaml"><code><span class="token key atrule">driver</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> ec2
  <span class="token punctuation">...</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>This section configures the driver, which is responsible for creating and managing the instances. Here, it's set to use Amazon EC2 instances. The various options configure the EC2 instances, such as instance type (<code v-pre>m5.large</code>), whether to associate a public IP address (<code v-pre>associate_public_ip: true</code>), and various metadata options.</p>
<div class="language-yaml line-numbers-mode" data-ext="yml"><pre v-pre class="language-yaml"><code><span class="token key atrule">provisioner</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> ansible_playbook
  <span class="token punctuation">...</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>This section configures the provisioner, which is the tool that brings your system to the desired state. Here, it's using Ansible playbooks. The various options configure how Ansible is run, such as the path to the Ansible binary (<code v-pre>ansible_binary_path: /usr/local/bin</code>), whether to require pip3 (<code v-pre>require_pip3: true</code>), and the path to the roles and requirements files.</p>
<div class="language-yaml line-numbers-mode" data-ext="yml"><pre v-pre class="language-yaml"><code><span class="token key atrule">lifecycle</span><span class="token punctuation">:</span>
  <span class="token key atrule">pre_converge</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> <span class="token key atrule">remote</span><span class="token punctuation">:</span> <span class="token punctuation">|</span><span class="token scalar string">
        ...</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>This section defines lifecycle hooks, which are commands that run at certain points in the Test Kitchen run. Here, it's running a series of commands before the converge phase (i.e., before applying the infrastructure code). These commands install necessary packages, update system packages, and update the <code v-pre>ec2-user</code> configuration.</p>
<div class="language-yaml line-numbers-mode" data-ext="yml"><pre v-pre class="language-yaml"><code><span class="token key atrule">transport</span><span class="token punctuation">:</span>
  <span class="token key atrule">name</span><span class="token punctuation">:</span> ssh
  <span class="token key atrule">max_ssh_sessions</span><span class="token punctuation">:</span> <span class="token number">2</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>This section configures the transport, which is the method Test Kitchen uses to communicate with the instance. Here, it's using SSH and allowing a maximum of 2 SSH sessions.</p>
<p>The workflow of Test Kitchen involves the following steps:</p>
<ol>
<li><strong>Create:</strong> Test Kitchen uses the driver to create an instance of the platform.</li>
<li><strong>Converge:</strong> Test Kitchen uses the provisioner to apply the infrastructure code to the instance. Before this phase, it runs the commands defined in the <code v-pre>pre_converge</code> lifecycle hook.</li>
<li><strong>Verify:</strong> Test Kitchen checks if the instance is in the desired state. This is not shown in your file, but it would be configured in the <code v-pre>verifier</code> section.</li>
<li><strong>Destroy:</strong> Test Kitchen uses the driver to destroy the instance after testing. This is not shown in your file, but it would be configured in the <code v-pre>driver</code> section.</li>
</ol>
<p>The <code v-pre>transport</code> is used in all these steps to communicate with the instance.</p>
</div></template>


