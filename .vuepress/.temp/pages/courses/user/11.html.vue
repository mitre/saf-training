<template><div><h2 id="_11-comparing-results" tabindex="-1"><a class="header-anchor" href="#_11-comparing-results" aria-hidden="true">#</a> 11. Comparing Results</h2>
<h3 id="_11-1-validate-the-software-after-hardening" tabindex="-1"><a class="header-anchor" href="#_11-1-validate-the-software-after-hardening" aria-hidden="true">#</a> 11.1 Validate the software after hardening</h3>
<p>Now that we have hardened the software, we need to run InSpec again to see the results.</p>
<p>Let's change directories to get back to the root directory.</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token builtin class-name">cd</span> /workspaces/saf-training-lab-environment/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>Now, rerun the InSpec scan with a different file name by changing the <code v-pre>--reporter</code> to have a new file name indicating that these are the hardened results like this: <code v-pre>--reporter cli json:./results/nginx_hardened_results.json</code>.</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>inspec <span class="token builtin class-name">exec</span> https://github.com/mitre/nginx-stigready-baseline <span class="token parameter variable">-t</span> docker://nginx <span class="token parameter variable">--reporter</span> cli json:./results/nginx_hardened_results.json --input-file inputs.yml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_11-2-cli-results" tabindex="-1"><a class="header-anchor" href="#_11-2-cli-results" aria-hidden="true">#</a> 11.2 CLI Results</h3>
<p>After running the command, you should see different results than when we ran the vanilla InSpec scan.</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>inspec <span class="token builtin class-name">exec</span> https://github.com/mitre/nginx-stigready-baseline <span class="token parameter variable">-t</span> docker://nginx <span class="token parameter variable">--reporter</span> cli json:./results/nginx_hardened_results.json --input-file inputs.yml
<span class="token punctuation">[</span><span class="token number">2022</span>-09-26T12:33:00+00:00<span class="token punctuation">]</span> WARN: URL target https://github.com/mitre/nginx-stigready-baseline transformed to https://github.com/mitre/nginx-stigready-baseline/archive/master.tar.gz. Consider using the <span class="token function">git</span> fetcher
<span class="token punctuation">..</span>.
  ↺  V-56019: An NGINX web server utilizing mobile code must meet DoD-defined mobile code
    requirements.
     ↺  This check is NA because NGINX does not implement mobile code.
  ↺  V-56021: The NGINX web server must invalidate session identifiers upon hosted
    application user <span class="token builtin class-name">logout</span> or other session termination.
     ↺  This <span class="token builtin class-name">test</span> requires a Manual Review: Verify it invalidates session identifiers when a
           session is terminated by reviewing the NGINX documentation.
  ↺  V-56025: Cookies exchanged between the NGINX web server and client, such as session
    cookies, must have security settings that disallow cookie access outside the
    originating web server and hosted application.
     ↺  This check is NA because the proxy_cookie_path directive is not configured.
  ✔  V-56027: The web server must only accept client certificates issued by DoD PKI
  or DoD-approved PKI Certification Authorities <span class="token punctuation">(</span>CAs<span class="token punctuation">)</span>.
     ✔  <span class="token punctuation">[</span><span class="token punctuation">[</span><span class="token string">"/etc/ssl/nginx-selfsigned.pem"</span><span class="token punctuation">]</span><span class="token punctuation">]</span> is expected not to be nil
     ✔  x509_certificate /etc/ssl/nginx-selfsigned.pem is expected not to be nil
     ✔  x509_certificate /etc/ssl/nginx-selfsigned.pem subject.C is expected to <span class="token function">cmp</span> <span class="token operator">==</span> <span class="token string">"US"</span>
     ✔  x509_certificate /etc/ssl/nginx-selfsigned.pem subject.O is expected to <span class="token function">cmp</span> <span class="token operator">==</span> <span class="token string">"U.S. Government"</span>
     ✔  DoD is expected to be <span class="token keyword">in</span> <span class="token string">"DoD"</span> and <span class="token string">"ECA"</span>
  ↺  V-56029: The NGINX web server must augment re-creation to a stable and known
    baseline.
     ↺  This <span class="token builtin class-name">test</span> requires a Manual Review: Interview the SA and ask <span class="token keyword">for</span> documentation on the
         disaster recovery methods <span class="token keyword">for</span> the NGINX web server <span class="token keyword">in</span> the event of the necessity <span class="token keyword">for</span> rollback.
  ↺  V-56031: The NGINX web server must encrypt user identifiers and passwords.
     ↺  This check is NA because NGINX does not manage authentication.
  ✔  V-56033: The web server must <span class="token function">install</span> security-relevant software updates within
    the configured <span class="token function">time</span> period directed by an authoritative <span class="token builtin class-name">source</span> <span class="token punctuation">(</span>e.g., IAVM,
    CTOs, DTMs, and STIGs<span class="token punctuation">)</span>.
     ✔  NGINX version v1.23.1 installed is not <span class="token function">more</span> <span class="token keyword">then</span> one patch level behind v1.23.0 is expected to <span class="token function">cmp</span> <span class="token operator">>=</span> <span class="token string">"1.23.0"</span>
     ✔  NGINX version v1.23.1 installed is greater <span class="token keyword">then</span> or equal to the organization approved version v1.23.1 is expected to <span class="token function">cmp</span> <span class="token operator">>=</span> <span class="token string">"1.23.1"</span>
  ✔  V-56035: The NGINX web server must display a default hosted application web page, not
    a directory listing, when a requested web page cannot be found.
     ✔  The root directory /usr/share/nginx/html should include the default index.html file.
  ✔  V-61353: The web server must remove all <span class="token builtin class-name">export</span> ciphers to protect the
  confidentiality and integrity of transmitted information.
     ✔  The ssl_prefer_server_cipher should be <span class="token builtin class-name">set</span> to on.
     ✔  Each cipher found <span class="token keyword">in</span> configuration should be included <span class="token keyword">in</span> the list of ciphers approved to encrypt data
     ✔  Each cipher found <span class="token keyword">in</span> configuration should be included <span class="token keyword">in</span> the list of ciphers approved to encrypt data
     ✔  Each cipher found <span class="token keyword">in</span> configuration should be included <span class="token keyword">in</span> the list of ciphers approved to encrypt data
     ✔  Each cipher found <span class="token keyword">in</span> configuration should be included <span class="token keyword">in</span> the list of ciphers approved to encrypt data
     ✔  Each cipher found <span class="token keyword">in</span> configuration should be included <span class="token keyword">in</span> the list of ciphers approved to encrypt data
     ✔  Each cipher found <span class="token keyword">in</span> configuration should be included <span class="token keyword">in</span> the list of ciphers approved to encrypt data
     ✔  Each cipher found <span class="token keyword">in</span> configuration should be included <span class="token keyword">in</span> the list of ciphers approved to encrypt data
     ✔  Each cipher found <span class="token keyword">in</span> configuration should be included <span class="token keyword">in</span> the list of ciphers approved to encrypt data
     ✔  Each cipher found <span class="token keyword">in</span> configuration should be included <span class="token keyword">in</span> the list of ciphers approved to encrypt data
     ✔  Each cipher found <span class="token keyword">in</span> configuration should be included <span class="token keyword">in</span> the list of ciphers approved to encrypt data
     ✔  Each cipher found <span class="token keyword">in</span> configuration should be included <span class="token keyword">in</span> the list of ciphers approved to encrypt data
     ✔  Each cipher found <span class="token keyword">in</span> configuration should be included <span class="token keyword">in</span> the list of ciphers approved to encrypt data
     ✔  Each cipher found <span class="token keyword">in</span> configuration should be included <span class="token keyword">in</span> the list of ciphers approved to encrypt data
     ✔  Each cipher found <span class="token keyword">in</span> configuration should be included <span class="token keyword">in</span> the list of ciphers approved to encrypt data
     ✔  Each cipher found <span class="token keyword">in</span> configuration should be included <span class="token keyword">in</span> the list of ciphers approved to encrypt data
     ✔  Each cipher found <span class="token keyword">in</span> configuration should be included <span class="token keyword">in</span> the list of ciphers approved to encrypt data
     ✔  Each cipher found <span class="token keyword">in</span> configuration should be included <span class="token keyword">in</span> the list of ciphers approved to encrypt data
     ✔  Each cipher found <span class="token keyword">in</span> configuration should be included <span class="token keyword">in</span> the list of ciphers approved to encrypt data
     ✔  Each cipher found <span class="token keyword">in</span> configuration should be included <span class="token keyword">in</span> the list of ciphers approved to encrypt data
     ✔  Each cipher found <span class="token keyword">in</span> configuration should be included <span class="token keyword">in</span> the list of ciphers approved to encrypt data


Profile Summary: <span class="token number">62</span> successful controls, <span class="token number">3</span> control failures, <span class="token number">24</span> controls skipped
Test Summary: <span class="token number">303</span> successful, <span class="token number">3</span> failures, <span class="token number">24</span> skipped
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_11-3-download-the-results-file" tabindex="-1"><a class="header-anchor" href="#_11-3-download-the-results-file" aria-hidden="true">#</a> 11.3 Download the Results File</h3>
<p>As you did before, download the results file.</p>
<figure><img src="@source/assets/img/Codespaces_Download_Harden_Results.png" alt="Downloading the Results" tabindex="0" loading="lazy"><figcaption>Downloading the Results</figcaption></figure>
<h4 id="_11-3-1-multiple-files-in-heimdall" tabindex="-1"><a class="header-anchor" href="#_11-3-1-multiple-files-in-heimdall" aria-hidden="true">#</a> 11.3.1 Multiple Files in Heimdall?</h4>
<p>If you reopened <a href="https://heimdall-lite.mitre.org/" target="_blank" rel="noopener noreferrer">Heimdall<ExternalLinkIcon/></a> to upload your <code v-pre>nginx_hardened_results.json</code>, then there will only be one file loaded. However, if you uploaded the results to the same instance of Heimdall that you had open before, you will now see two sets of results - your vanilla results and hardened results. You can click the menu on the top left what files are loaded and select only those you wish to see. In this case, only select the hardened results so we can look more at those.</p>
<figure><img src="@source/assets/img/Heimdall_Select_Menu.png" alt="The Heimdall Select Menu" tabindex="0" loading="lazy"><figcaption>The Heimdall Select Menu</figcaption></figure>
<details class="hint-container details"><summary>Heimdall with a backend (server)</summary>
<p>Throughout this class, we are using the <a href="https://heimdall-lite.mitre.org/" target="_blank" rel="noopener noreferrer">Heimdall-lite<ExternalLinkIcon/></a> version of the Heimdall application. However, many organizations chose to deploy Heimdall with a backend (you can see a demo version <a href="https://heimdall-demo.mitre.org/" target="_blank" rel="noopener noreferrer">here<ExternalLinkIcon/></a>), in other words, with a server to store data. This requires more setup than just opening up Heimdall-lite in the webpage, however, you can:</p>
<ul>
<li>Store files in a database</li>
<li>Send files to the app via an API call</li>
<li>Share information across multiple users</li>
<li>Login via third part authenticators, like Keycloak.</li>
</ul>
<p>You can find out more details on the difference between the two versions of this application in the <a href="https://github.com/mitre/heimdall2#heimdall-lite-vs-heimdall-with-backend-server" target="_blank" rel="noopener noreferrer">Heimdall README<ExternalLinkIcon/></a>.</p>
</details>
<p>Take some time to explore the hardened results. Filter through different statuses, checkout the alignment to NIST 800-53 controls, and more!</p>
<h3 id="_11-4-visualize-the-results-in-heimdall" tabindex="-1"><a class="header-anchor" href="#_11-4-visualize-the-results-in-heimdall" aria-hidden="true">#</a> 11.4 Visualize the Results in Heimdall</h3>
<p>Another valuable view for monitoring changes and showing results is the comparison view.</p>
<ol>
<li>Make sure you have both the vanilla and hardened results uploaded into Heimdall.</li>
<li>To compare results, click on the three lines in the top, left corner and toggle the &quot;Comparison View&quot; on.</li>
<li>Explore what changed and why!</li>
</ol>
<p>You could use the Heimdall with backend version of the application and upload security results at regular intervals to see the changes over time. There are two graphs that show compliance over time and number of failed tests by severity over time.</p>
<figure><img src="@source/assets/img/Heimdall_Click_ComparisonView.png" alt="Comparison View" tabindex="0" loading="lazy"><figcaption>Comparison View</figcaption></figure>
</div></template>


