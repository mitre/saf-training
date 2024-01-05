<template><div><h1 id="required-software" tabindex="-1"><a class="header-anchor" href="#required-software" aria-hidden="true">#</a> Required Software</h1>
<ul>
<li>RVM, or another Ruby Management Tool</li>
<li>Ruby v3 or higher</li>
<li>Git</li>
<li>VS Code or another IDE</li>
<li>Docker (if you want to test hardened and non-hardened containers)</li>
<li>AWS CLI</li>
<li>AWS Account</li>
</ul>
<h1 id="required-accounts" tabindex="-1"><a class="header-anchor" href="#required-accounts" aria-hidden="true">#</a> Required Accounts</h1>
<ol>
<li><a href="https://aws.amazon.com/console/" title="AWS Console Account" target="_blank" rel="noopener noreferrer">AWS Console Account<ExternalLinkIcon/></a></li>
<li><a href="https://login.dso.mil/register" title="Platform One Account" target="_blank" rel="noopener noreferrer">Platform One Account<ExternalLinkIcon/></a> (used for container testing)</li>
<li><a href="https://login.dso.mil/auth/realms/baby-yoda/protocol/openid-connect/auth?client_id=harbor&amp;redirect_uri=https%3A%2F%2Fregistry1.dso.mil%2Fc%2Foidc%2Fcallback&amp;response_type=code&amp;scope=openid+profile+email+offline_access&amp;state=WS3BsNb5JevECV4aiy3irfegFETBHfRd" title="DSO Harbor Login" target="_blank" rel="noopener noreferrer">P1 Harbor Token<ExternalLinkIcon/></a> (used for container testing)</li>
</ol>
<h1 id="test-suite-environment-variables" tabindex="-1"><a class="header-anchor" href="#test-suite-environment-variables" aria-hidden="true">#</a> Test Suite Environment Variables</h1>
<ol>
<li>Environment Variables used by Test Kitchen</li>
</ol>
<ul>
<li><code v-pre>INSPEC_CONTROL</code>: Specifies which single control to run in the <code v-pre>bundle exec kitchen verify</code> phase, useful for testing and debugging a single requirement.
<ul>
<li>default: <code v-pre>none</code></li>
</ul>
</li>
<li><code v-pre>KITCHEN_LOCAL_YAML</code>: Specifies the target testing environment you want to use to run and validate the profile.
<ul>
<li>default: <code v-pre>none</code></li>
</ul>
</li>
<li><code v-pre>VANILLA_CONTAINER_IMAGE</code>: Specifies the Docker container image you consider 'not hardened' (used by <code v-pre>kitchen.container.yml</code>).
<ul>
<li>default: <code v-pre>registry.access.redhat.com/ubi8/ubi:8.9-1028</code></li>
</ul>
</li>
<li><code v-pre>HARDENED_CONTAINER_IMAGE</code>: Specifies the Docker container image you consider 'hardened' (used by <code v-pre>kitchen.container.yml</code>).
<ul>
<li>default: <code v-pre>registry1.dso.mil/ironbank/redhat/ubi/ubi8</code></li>
</ul>
</li>
</ul>
<ol start="2">
<li>AWS Environment</li>
</ol>
<p>You can either use standard AWS Profiles to configure your environment or use the standard AWS Environment variables to run the test suite. See: <a href="https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html" title="AWS CLI Install Guide" target="_blank" rel="noopener noreferrer">AWS CLI Installation &amp; Configuration<ExternalLinkIcon/></a></p>
<ul>
<li>Use the <code v-pre>AWS_PROFILE</code> environment variable and AWS Credential Profiles to simplify testing on multiple AWS environments or segments. This will allow you to easily manage multiple sets of AWS secrets and access keys with adjustments to a single variable. (See: <a href="https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-files.html" title="AWS CLI Profiles Setup" target="_blank" rel="noopener noreferrer">AWS CLI and Profile Setup<ExternalLinkIcon/></a>)</li>
</ul>
<h1 id="setting-up-your-environment" tabindex="-1"><a class="header-anchor" href="#setting-up-your-environment" aria-hidden="true">#</a> Setting Up Your Environment</h1>
<ol>
<li>Set up your Ruby Version Management system.</li>
<li>Install Ruby 3.1 or higher.</li>
<li>Configure OpenSSL, organization certificates, etc., for your environment and tooling.</li>
<li>Set up your AWS CLI.</li>
<li>Clone the repository.</li>
<li>Obtain your <a href="https://registry1.dso.mil/harbor/projects" title="DSO Harbor Projects Page" target="_blank" rel="noopener noreferrer">Harbor CLI Secret<ExternalLinkIcon/></a>.</li>
<li>After logging in, click on your User Profile &quot;About&quot; to get the token.</li>
<li>Log in to the P1 Docker Registry.</li>
<li>Use the command <code v-pre>docker login -u {PI USER NAME} -p '{HARBOR CLI SECRET}' registry1.dso.mil</code>.</li>
<li>Run <code v-pre>bundle install</code> in your isolated Ruby environment.</li>
</ol>
<h1 id="post-setup-checks" tabindex="-1"><a class="header-anchor" href="#post-setup-checks" aria-hidden="true">#</a> Post-Setup Checks</h1>
<ul>
<li>Verify your newly installed Ruby environment by running <code v-pre>ruby --version</code>.</li>
<li>Confirm that InSpec was installed by running <code v-pre>bundle exec inspec --version</code>.</li>
<li>Check that Test Kitchen was installed by running <code v-pre>bundle exec kitchen version</code>.</li>
<li>Verify that your <code v-pre>aws-cli</code> is correctly configured by running <code v-pre>aws s3 ls</code> (or your preferred test command for AWS CLI).</li>
<li>Confirm your bundle installation by running <code v-pre>bundle exec inspec --version</code>.</li>
<li>Verify you can pull from RepoOne by running <code v-pre>docker pull https://repo1.dso.mil/dsop/redhat/ubi/ubi8</code>.</li>
<li>Celebrate 🎉️ if everything went well.</li>
</ul>
</div></template>


