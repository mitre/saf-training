<template><div><h1 id="test-kitchen-converge-stage" tabindex="-1"><a class="header-anchor" href="#test-kitchen-converge-stage" aria-hidden="true">#</a> Test Kitchen Converge Stage</h1>
<p>The <code v-pre>converge</code> stage uses Ansible Playbooks from the Ansible Lockdown project to apply hardening configurations, specifically the RHEL8-STIG playbook, and RedHat managed containers.</p>
<h2 id="ec2-and-vagrant-converge" tabindex="-1"><a class="header-anchor" href="#ec2-and-vagrant-converge" aria-hidden="true">#</a> EC2 and Vagrant Converge</h2>
<p>For EC2 and Vagrant, we use 'wrapper playbooks' for the 'vanilla' and 'hardened' suites.</p>
<ul>
<li>The 'vanilla' playbook establishes a basic test environment.</li>
<li>The 'hardened' playbook applies the 'vanilla role' and the Ansible Lockdown RHEL8-STIG role to the 'hardened' target, using Ansible Galaxy, a <code v-pre>requirements.txt</code>, and Ansible Roles.</li>
</ul>
<p>Some tasks in the hardening role were disabled for automated testing, but this doesn't significantly impact our security posture. We can still meet our validation and thresholds.</p>
<p>For more on using these playbooks, running Ansible, or modifying the playbooks, roles, and tasks, see the Ansible Project Website.</p>
<p>Find these roles and 'wrapper playbooks' in the <RouterLink to="/courses/profile-dev-test/spec/">spec/</RouterLink> directory.</p>
<h2 id="container-converge" tabindex="-1"><a class="header-anchor" href="#container-converge" aria-hidden="true">#</a> Container Converge</h2>
<p>We use RedHat vendor images for both the <code v-pre>vanilla</code> and <code v-pre>hardened</code> containers.</p>
<ul>
<li><strong><code v-pre>vanilla</code>:</strong> This container uses the <code v-pre>registry.access.redhat.com/ubi8/ubi:8.9-1028</code> image from RedHat's community repositories.</li>
<li><strong><code v-pre>hardened</code>:</strong> This container uses the <code v-pre>registry1.dso.mil/ironbank/redhat/ubi/ubi8</code> image from Red Hat's Platform One Iron Bank project.</li>
</ul>
<p>The Iron Bank UBI8 image is regularly patched, updated, and hardened according to STIG requirements.</p>
</div></template>


