<template><div><h2 id="_7-what-are-inputs-and-why-do-i-need-them" tabindex="-1"><a class="header-anchor" href="#_7-what-are-inputs-and-why-do-i-need-them" aria-hidden="true">#</a> 7. What are inputs and why do I need them?</h2>
<p>Every InSpec profile on the SAF site is written to comply with some security guidance. However, every team's environment may be just a little bit different. For example, the path to a file may be different in different environments, or the list of permitted users for a certain system may vary with the environment.</p>
<p>To accomodate for these kinds of differences, InSpec profiles utilize inputs. In the previous section, we ran the InSpec profile on the NGINX component without specifying any inputs. This means that it just used the defaults. Now, let's review these variables and decide which inputs we want to change for our environment.</p>
<div class="hint-container tip">
<p class="hint-container-title">Best Practice</p>
<p>It is best practice to always run profiles with inputs so that the profile is properly tailored to your environment.</p>
</div>
<h2 id="_7-1-profile-inputs-see-inspec-yml-file" tabindex="-1"><a class="header-anchor" href="#_7-1-profile-inputs-see-inspec-yml-file" aria-hidden="true">#</a> 7.1 Profile Inputs (see <code v-pre>inspec.yml</code> file)</h2>
<p>This profile uses InSpec Inputs to make the tests more flexible. You are able to provide inputs at runtime either via the cli or via YAML files to help the profile work best in your deployment.</p>
<div class="hint-container caution">
<p class="hint-container-title">Caution</p>
<p><strong>DO NOT</strong> change the inputs in the <code v-pre>inspec.yml</code> file. This is where the variables and their defaults are defined.</p>
<p><strong>DO</strong> create a separate file (often named <code v-pre>inputs.yml</code>) or pass values via the command line to overwrite default values to tailor the profile.</p>
</div>
<p>The <code v-pre>inputs</code> configured in the <code v-pre>inspec.yml</code> file are <strong>profile definition and defaults for the profile</strong> and not for the user. Automated InSpec scans are frequently run from a script, inside a pipeline or some kind of task scheduler where the runner will often not have access to the <code v-pre>inspec.yml</code>. However, those scripts or pipelines can easily pass an inputs file or command line arguments to modify the default values defined in the <code v-pre>inspec.yml</code> file.</p>
<p>To tailor the tested values for your deployment or organizationally defined values, <strong><em>you may update the inputs</em></strong>.</p>
<p>More information about InSpec inputs can be found in the <a href="https://docs.chef.io/inspec/inputs/" target="_blank" rel="noopener noreferrer">InSpec Inputs Documentation<ExternalLinkIcon/></a>.</p>
<h2 id="_7-2-use-an-input-file-to-tailor-an-inspec-profile" tabindex="-1"><a class="header-anchor" href="#_7-2-use-an-input-file-to-tailor-an-inspec-profile" aria-hidden="true">#</a> 7.2 Use an --input-file to tailor an InSpec profile</h2>
<p>For the NGINX example, we are going to add the following inputs. Make a new file called <code v-pre>inputs.yml</code> in your lab environment:</p>
<ol>
<li>Right click near the file list on the left side</li>
<li>Click &quot;New File...&quot;</li>
<li>Copy the code below into your <code v-pre>inputs.yml</code> file.</li>
</ol>
<div class="language-yaml line-numbers-mode" data-ext="yml"><pre v-pre class="language-yaml"><code><span class="token punctuation">---</span>
<span class="token key atrule">key_file_path</span><span class="token punctuation">:</span> /etc/ssl/nginx<span class="token punctuation">-</span>selfsigned.pem
<span class="token key atrule">org_allowed_nginx_version</span><span class="token punctuation">:</span> 1.23.1
<span class="token key atrule">nginx_owner</span><span class="token punctuation">:</span> <span class="token string">"nginx"</span>
<span class="token key atrule">uses_pki</span><span class="token punctuation">:</span> <span class="token boolean important">false</span>
<span class="token key atrule">sys_admin</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">"root"</span><span class="token punctuation">]</span>
<span class="token key atrule">sys_admin_group</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">"root"</span><span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>In your codespaces, it should look like this:</p>
<figure><img src="@source/assets/img/Codespaces_InputFile_NGINX.png" alt="NGINX Input File" tabindex="0" loading="lazy"><figcaption>NGINX Input File</figcaption></figure>
<div class="hint-container tip">
<p class="hint-container-title">How do I find the values that should be in the input file?</p>
<p>Start by checking the README on the GitHub repository for that InSpec profile. Most of the profiles have a &quot;Tailoring to Your Environment&quot; section that leads you through what variables are available as inputs.</p>
<p>To determine the value itself, you should think about the environment, talk to your assessor, and explore the target to see if you can find the necessary information.</p>
<p>If the profile does not have a &quot;Tailoring to Your Environment&quot; section in their README, then you can reference the <code v-pre>inspec.yml</code> file to see what inputs are defined and available and what their default values are. However, remember not to modify the <code v-pre>inspec.yml</code> file itself.</p>
</div>
<div class="hint-container info">
<p class="hint-container-title">What is the difference between tailoring an InSpec profile with inputs vs. overlays?</p>
<p><strong>Inputs</strong> are meant to tailor the profile while <em>still complying</em> to the guidance document for which the profile is based.</p>
<p><strong>Overlays</strong> are used in the case that the organization requirements <em>differ</em> from the security guidance. For example, if there are additional controls required or some controls not available for the organization's requirements.</p>
</div>
<!-- ## 7.3 Rerun InSpec using the inputs file

We are going to make 2 changes to our InSpec command that we ran before. 
1. We are going to add `--input-file inputs.yml` to specify the inputs to the profile
2. We are going to change the name of our results file to `./results/nginx_vanilla_results_with_inputs.json` so it easy for us to distinguish the results later on.

This makes our new command:

```sh
inspec exec https://github.com/mitre/nginx-stigready-baseline -t docker://nginx --input-file inputs.yml --reporter cli json:./results/nginx_vanilla_results_with_inputs.json
```

### 7.3.1 CLI Results

You will see this result in the cli:

```sh
inspec exec https://github.com/mitre/nginx-stigready-baseline -t docker://nginx --input-file inputs.yml --reporter cli json:./results/nginx_vanilla_results_with_inputs.json
[2022-09-23T21:57:23+00:00] WARN: URL target https://github.com/mitre/nginx-stigready-baseline transformed to https://github.com/mitre/nginx-stigready-baseline/archive/master.tar.gz. Consider using the git fetcher
...
  ✔  V-56033: The web server must install security-relevant software updates within
    the configured time period directed by an authoritative source (e.g., IAVM,
    CTOs, DTMs, and STIGs).
     ✔  NGINX version v1.23.1 installed is not more then one patch level behind v1.23.0 is expected to cmp >= "1.23.0"
     ✔  NGINX version v1.23.1 installed is greater then or equal to the organization approved version v1.23.1 is expected to cmp >= "1.23.1"
  ✔  V-56035: The NGINX web server must display a default hosted application web page, not
    a directory listing, when a requested web page cannot be found.
     ✔  The root directory /usr/share/nginx/html should include the default index.html file.
  ↺  V-61353: The web server must remove all export ciphers to protect the
  confidentiality and integrity of transmitted information. (2 skipped)
     ↺  This test is NA because the ssl_prefer_server_ciphers directive has not been configured.
     ↺  This test is NA because the ssl_ciphers directive has not been configured.


Profile Summary: 29 successful controls, 24 control failures, 36 controls skipped
Test Summary: 131 successful, 89 failures, 55 skipped
```

### 7.3.2 The Results Visualized

Download the new results file.

![Alt text](../../assets/img/Codespaces_Inputs_NGINX_Results.png)

Upload your new results to [Heimdall](https://heimdall-lite.mitre.org/). When you look at the results in Heimdall, you can verify the inputs that were changed by expanding the File Info and looking at the inputs.

![Alt text](../../assets/img/Heimdall_Inputs_Changed.png) -->
</div></template>


