<template><div><h1 id="github-actions" tabindex="-1"><a class="header-anchor" href="#github-actions" aria-hidden="true">#</a> GitHub Actions</h1>
<h2 id="lint-profile-yml" tabindex="-1"><a class="header-anchor" href="#lint-profile-yml" aria-hidden="true">#</a> <a href=".github/workflows/lint-profile.yml"><code v-pre>lint-profile.yml</code></a></h2>
<p>This action checks out the repository, installs Ruby and InSpec, then runs <code v-pre>bundle exec inspec check .</code> to validate the structure and syntax of the InSpec profile and its Ruby code.</p>
<h2 id="verify-ec2-yml" tabindex="-1"><a class="header-anchor" href="#verify-ec2-yml" aria-hidden="true">#</a> <a href=".github/workflows/verify-ec2.yml"><code v-pre>verify-ec2.yml</code></a></h2>
<p>This action performs the following steps:</p>
<ol>
<li>Checks out the repository.</li>
<li>Installs Ruby, InSpec, AWS CLI, and Test Kitchen along with its drivers.</li>
<li>Sets up the 'runner'.</li>
<li>Configures access to the AWS VPC environment.</li>
<li>Runs the <code v-pre>vanilla</code> and <code v-pre>hardened</code> test suites.</li>
<li>Displays a summary of the test suite results.</li>
<li>Saves the test suite results.</li>
<li>Uploads the results to our Heimdall Demo server.</li>
<li>Determines the success or failure of the test run based on the validation of the test suite results against the <code v-pre>threshold.yml</code> files for each test suite (<code v-pre>hardened</code> and <code v-pre>vanilla</code>).</li>
</ol>
<h2 id="verify-container-yml" tabindex="-1"><a class="header-anchor" href="#verify-container-yml" aria-hidden="true">#</a> <a href=".github/workflows/verify-container.yml"><code v-pre>verify-container.yml</code></a></h2>
<p>This action performs similar steps to <code v-pre>verify-ec2.yml</code>, but with some differences:</p>
<ol>
<li>It configures access to the required container registries - Platform One and Red Hat.</li>
</ol>
<h2 id="verify-vagrant-yml-example" tabindex="-1"><a class="header-anchor" href="#verify-vagrant-yml-example" aria-hidden="true">#</a> <a href=".github/workflows/verify-vagrant.yml.example"><code v-pre>verify-vagrant.yml.example</code></a></h2>
<p>This action is similar to the <code v-pre>verify-ec2</code> workflow, but instead of using a remote AWS EC2 instance in a VPC, it uses a local Vagrant virtual machine as the test target. The user can configure whether to upload the results to our Heimdall Demo server or not by modifing the Github Action.</p>
</div></template>


