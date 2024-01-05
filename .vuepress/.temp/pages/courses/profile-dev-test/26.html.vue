<template><div><h1 id="tips-tricks-and-troubleshooting" tabindex="-1"><a class="header-anchor" href="#tips-tricks-and-troubleshooting" aria-hidden="true">#</a> Tips, Tricks and Troubleshooting</h1>
<h2 id="test-kitchen" tabindex="-1"><a class="header-anchor" href="#test-kitchen" aria-hidden="true">#</a> Test Kitchen</h2>
<h3 id="locating-test-target-login-details" tabindex="-1"><a class="header-anchor" href="#locating-test-target-login-details" aria-hidden="true">#</a> Locating Test Target Login Details</h3>
<p>Test Kitchen stores the current host details of your provisioned test targets in the <code v-pre>.kitchen/</code> directory. Here, you'll find a <code v-pre>yml</code> file containing your target's <code v-pre>hostname</code>, <code v-pre>ip address</code>, <code v-pre>host details</code>, and login credentials, which could be an <code v-pre>ssh pem key</code> or another type of credential.</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>.kitchen
├── .kitchen/hardened-container.yml
├── .kitchen/hardened-rhel-8.pem
├── .kitchen/hardened-rhel-8.yml
├── .kitchen/logs
├── .kitchen/vanilla-container.yml
├── .kitchen/vanilla-rhel-8.pem
├── .kitchen/vanilla-rhel-8.yml
└── .kitchen/vanilla-ubi8.yml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="restoring-access-to-a-halted-or-restarted-test-target" tabindex="-1"><a class="header-anchor" href="#restoring-access-to-a-halted-or-restarted-test-target" aria-hidden="true">#</a> Restoring Access to a Halted or Restarted Test Target</h3>
<p>If your test target reboots or updates its network information, you don't need to execute bundle exec kitchen destroy. Instead, update the corresponding .kitchen/#{suite}-#{target}.yml file with the updated information. This will ensure that your kitchen login, kitchen validate, and other kitchen commands function correctly, as they'll be connecting to the correct location instead of using outdated data.</p>
<h3 id="aws-console-and-ec2-oddities" tabindex="-1"><a class="header-anchor" href="#aws-console-and-ec2-oddities" aria-hidden="true">#</a> AWS Console and EC2 Oddities</h3>
<p>Since we're using the free-tier for our AWS testing resources instead of a dedicated host, your test targets might shut down or 'reboot in the background' if you stop interacting with them, halt them, put them in a stop state, or leave them overnight. To regain access, edit the .kitchen/#{suite}-#{target}.yml file. As mentioned above, there's no need to recreate your testing targets if you can simply point Test Kitchen to the correct IP address.</p>
<h2 id="inspec-ruby" tabindex="-1"><a class="header-anchor" href="#inspec-ruby" aria-hidden="true">#</a> InSpec / Ruby</h2>
<h3 id="using-pry-and-pry-byebug-for-debugging-controls" tabindex="-1"><a class="header-anchor" href="#using-pry-and-pry-byebug-for-debugging-controls" aria-hidden="true">#</a> Using <code v-pre>pry</code> and <code v-pre>pry-byebug</code> for Debugging Controls</h3>
<p>When developing InSpec controls, it's beneficial to use the <code v-pre>kitchen-test</code> suite, the <code v-pre>INSPEC_CONTROL</code> environment variable, and <code v-pre>pry</code> or <code v-pre>pry-byebug</code>. This combination allows you to quickly debug, update, and experiment with your fixes in the context of the InSpec code, without having to run the full test suite.</p>
<p><code v-pre>pry</code> and <code v-pre>pry-byebug</code> are powerful tools for debugging Ruby code, including InSpec controls. Here's how you can use them:</p>
<ol>
<li>First, add <code v-pre>require 'pry'</code> or <code v-pre>require 'pry-byebug'</code> at the top of your control file.</li>
<li>Then, insert <code v-pre>binding.pry</code> at the point in your code where you want to start debugging.</li>
<li>When you run your tests, execution will stop at the <code v-pre>binding.pry</code> line, and you can inspect variables, step through the code, and more.</li>
</ol>
<p><em><strong>!Pro Tip!</strong></em></p>
<ul>
<li>Remember to remove or comment out the <code v-pre>binding.pry</code> lines when you're done debugging or you won't have a good 'linting' down the road.</li>
</ul>
<h3 id="streamlining-your-testing-with-inspec-shell" tabindex="-1"><a class="header-anchor" href="#streamlining-your-testing-with-inspec-shell" aria-hidden="true">#</a> Streamlining Your Testing with <code v-pre>inspec shell</code></h3>
<p>The <code v-pre>inspec shell</code> command allows you to test your full control update on your test target directly. To do this, you'll need to retrieve the IP address and SSH PEM key for your target instance from the Test Kitchen <code v-pre>.kitchen</code> directory. For more details on this, refer to the <a href="#311-locating-test-target-login-details">Finding Your Test Target Login Details</a> section.</p>
<p>Once you have your IP address and SSH PEM key (for AWS target instances), or the container ID (for Docker test instances), you can use the following commands:</p>
<ul>
<li>For AWS test targets: <code v-pre>bundle exec inspec shell -i #{pem-key} -t ssh://ec2-user@#{ipaddress} --sudo</code></li>
<li>For Docker test instances: <code v-pre>bundle exec inspec shell -t docker://#{container-id}</code></li>
</ul>
<h3 id="using-kitchen-login-for-easy-test-review-and-modification" tabindex="-1"><a class="header-anchor" href="#using-kitchen-login-for-easy-test-review-and-modification" aria-hidden="true">#</a> Using <code v-pre>kitchen login</code> for Easy Test Review and Modification</h3>
<p>The <code v-pre>kitchen login</code> command provides an easy way to review and modify your test target. This tool is particularly useful for introducing test cases, exploring corner cases, and validating both positive and negative test scenarios.</p>
</div></template>


