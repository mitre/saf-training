import{_ as t}from"./plugin-vue_export-helper-DlAUqK2U.js";import{e as i,f as n,o as s}from"./app-DjCdDQJ2.js";const o={};function a(r,e){return s(),i("div",null,e[0]||(e[0]=[n(`<h2 id="tips-tricks-and-troubleshooting" tabindex="-1"><a class="header-anchor" href="#tips-tricks-and-troubleshooting"><span>Tips, Tricks, and Troubleshooting</span></a></h2><h3 id="test-kitchen" tabindex="-1"><a class="header-anchor" href="#test-kitchen"><span>Test Kitchen</span></a></h3><h4 id="locating-test-target-login-details" tabindex="-1"><a class="header-anchor" href="#locating-test-target-login-details"><span>Locating Test Target Login Details</span></a></h4><p>Test Kitchen stores the current host details of your provisioned test targets in the <code>.kitchen/</code> directory. Here, you&#39;ll find a <code>yml</code> file containing your target&#39;s <code>hostname</code>, <code>ip address</code>, <code>host details</code>, and login credentials, which could be an <code>ssh pem key</code> or another type of credential.</p><div class="language-shell line-numbers-mode" data-highlighter="shiki" data-ext="shell" data-title="shell" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">.kitchen</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">├──</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> .kitchen/hardened-container.yml</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">├──</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> .kitchen/hardened-rhel-8.pem</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">├──</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> .kitchen/hardened-rhel-8.yml</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">├──</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> .kitchen/logs</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">├──</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> .kitchen/vanilla-container.yml</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">├──</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> .kitchen/vanilla-rhel-8.pem</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">├──</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> .kitchen/vanilla-rhel-8.yml</span></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">└──</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;"> .kitchen/vanilla-ubi8.yml</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="restoring-access-to-a-halted-or-restarted-test-target" tabindex="-1"><a class="header-anchor" href="#restoring-access-to-a-halted-or-restarted-test-target"><span>Restoring Access to a Halted or Restarted Test Target</span></a></h4><p>If your test target reboots or updates its network information, you don&#39;t need to execute <code>bundle exec kitchen destroy</code>. Instead, update the corresponding <code>.kitchen/#{suite}-#{target}.yml</code> file with the updated information. This will ensure that your <code>kitchen login</code>, <code>kitchen validate</code>, and other kitchen commands function correctly, as they&#39;ll be connecting to the correct location instead of using outdated data.</p><h4 id="aws-console-and-ec2-oddities" tabindex="-1"><a class="header-anchor" href="#aws-console-and-ec2-oddities"><span>AWS Console and EC2 Oddities</span></a></h4><p>Since we&#39;re using the free-tier for our AWS testing resources instead of a dedicated host, your test targets might shut down or reboot in the background if you stop interacting with them, halt them, put them in a stop state, or leave them unattended overnight. To regain access, edit the <code>.kitchen/#{suite}-#{target}.yml</code> file. As mentioned above, there&#39;s no need to recreate your testing targets if you can simply point Test Kitchen to the correct IP address.</p><div class="hint-container warning"><p class="hint-container-title">Auto-generated, sensitive files</p><p>Since the <code>.kitchen/</code> directory is automatically generated by Test Kitchen, you need to be careful not to accidentally mess up its internal workings when editing it by hand as suggested above. Additionally, be sure not to place this directory underneath version control since you could unintentionally leak sensitive information such as your ip addresses and credentials!</p></div><h2 id="inspec-ruby" tabindex="-1"><a class="header-anchor" href="#inspec-ruby"><span>InSpec / Ruby</span></a></h2><h3 id="using-pry-and-pry-byebug-for-debugging-controls" tabindex="-1"><a class="header-anchor" href="#using-pry-and-pry-byebug-for-debugging-controls"><span>Using <code>pry</code> and <code>pry-byebug</code> for Debugging Controls</span></a></h3><p>When developing InSpec controls, it&#39;s beneficial to use the <code>kitchen-test</code> suite, the <code>INSPEC_CONTROL</code> environment variable, and <code>pry</code> or <code>pry-byebug</code>. This combination allows you to quickly debug, update, and experiment with your fixes in the context of the InSpec code, without having to run the full test suite.</p><p><code>pry</code> and <code>pry-byebug</code> are powerful tools for debugging Ruby code, including InSpec controls. Here&#39;s how you can use them:</p><ol><li>First, add <code>require &#39;pry&#39;</code> or <code>require &#39;pry-byebug&#39;</code> at the top of your control file.</li><li>Then, insert <code>binding.pry</code> at the point in your code where you want to start debugging.</li><li>When you run your tests, execution will stop at the <code>binding.pry</code> line, and you can inspect variables, step through the code, and more.</li></ol><div class="hint-container tip"><p class="hint-container-title">Linter</p><p>Remember to remove or comment out the <code>binding.pry</code> lines when you&#39;re done debugging or you won&#39;t have a good &#39;linting&#39; down the road.</p></div><h3 id="streamlining-your-testing-with-inspec-shell" tabindex="-1"><a class="header-anchor" href="#streamlining-your-testing-with-inspec-shell"><span>Streamlining Your Testing with <code>inspec shell</code></span></a></h3><p>The <code>inspec shell</code> command allows you to test your full control update on your test target directly. To do this, you&#39;ll need to retrieve the IP address and SSH PEM key for your target instance from the Test Kitchen <code>.kitchen</code> directory. For more details on this, refer to the <a href="#locating-test-target-login-details">Locating Test Target Login Details</a> section.</p><p>Once you have your IP address and SSH PEM key (for AWS target instances), or the container ID (for Docker test instances), you can use the following commands:</p><ul><li>For AWS test targets: <code>bundle exec inspec shell -i #{pem-key} -t ssh://ec2-user@#{ipaddress} --sudo</code></li><li>For Docker test instances: <code>bundle exec inspec shell -t docker://#{container-id}</code></li></ul><h3 id="using-kitchen-login-for-easy-test-review-and-modification" tabindex="-1"><a class="header-anchor" href="#using-kitchen-login-for-easy-test-review-and-modification"><span>Using <code>kitchen login</code> for Easy Test Review and Modification</span></a></h3><p>The <code>kitchen login</code> command provides an easy way to review and modify your test target. This tool is particularly useful for introducing test cases, exploring corner cases, and validating both positive and negative test scenarios.</p>`,22)]))}const c=t(o,[["render",a],["__file","24.html.vue"]]),h=JSON.parse('{"path":"/courses/profile-dev-test/24.html","title":"24. Tips, Tricks, and Troubleshooting","lang":"en-US","frontmatter":{"order":24,"next":"25.md","title":"24. Tips, Tricks, and Troubleshooting","author":"Aaron Lippold","description":"Tips, Tricks, and Troubleshooting Test Kitchen Locating Test Target Login Details Test Kitchen stores the current host details of your provisioned test targets in the .kitchen/ ...","head":[["meta",{"property":"og:url","content":"https://mitre.github.io/saf-training/saf-training/courses/profile-dev-test/24.html"}],["meta",{"property":"og:site_name","content":"MITRE SAF Training"}],["meta",{"property":"og:title","content":"24. Tips, Tricks, and Troubleshooting"}],["meta",{"property":"og:description","content":"Tips, Tricks, and Troubleshooting Test Kitchen Locating Test Target Login Details Test Kitchen stores the current host details of your provisioned test targets in the .kitchen/ ..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"en-US"}],["meta",{"property":"og:updated_time","content":"2024-12-13T06:47:34.000Z"}],["meta",{"property":"article:author","content":"Aaron Lippold"}],["meta",{"property":"article:modified_time","content":"2024-12-13T06:47:34.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"24. Tips, Tricks, and Troubleshooting\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-12-13T06:47:34.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Aaron Lippold\\"}]}"]]},"headers":[{"level":2,"title":"Tips, Tricks, and Troubleshooting","slug":"tips-tricks-and-troubleshooting","link":"#tips-tricks-and-troubleshooting","children":[{"level":3,"title":"Test Kitchen","slug":"test-kitchen","link":"#test-kitchen","children":[]}]},{"level":2,"title":"InSpec / Ruby","slug":"inspec-ruby","link":"#inspec-ruby","children":[{"level":3,"title":"Using pry and pry-byebug for Debugging Controls","slug":"using-pry-and-pry-byebug-for-debugging-controls","link":"#using-pry-and-pry-byebug-for-debugging-controls","children":[]},{"level":3,"title":"Streamlining Your Testing with inspec shell","slug":"streamlining-your-testing-with-inspec-shell","link":"#streamlining-your-testing-with-inspec-shell","children":[]},{"level":3,"title":"Using kitchen login for Easy Test Review and Modification","slug":"using-kitchen-login-for-easy-test-review-and-modification","link":"#using-kitchen-login-for-easy-test-review-and-modification","children":[]}]}],"git":{"createdTime":1704493101000,"updatedTime":1734072454000,"contributors":[{"name":"Aaron Lippold","username":"Aaron Lippold","email":"lippold@gmail.com","commits":4,"url":"https://github.com/Aaron Lippold"},{"name":"Daniel Medina","username":"Daniel Medina","email":"dmedina@mitre.org","commits":1,"url":"https://github.com/Daniel Medina"},{"name":"Amndeep Singh Mann","username":"Amndeep Singh Mann","email":"amann@mitre.org","commits":2,"url":"https://github.com/Amndeep Singh Mann"}]},"readingTime":{"minutes":2.15,"words":646},"filePathRelative":"courses/profile-dev-test/24.md","localizedDate":"January 5, 2024","autoDesc":true}');export{c as comp,h as data};
