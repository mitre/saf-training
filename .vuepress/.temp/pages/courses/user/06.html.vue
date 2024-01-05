<template><div><h2 id="_6-how-to-run-inspec" tabindex="-1"><a class="header-anchor" href="#_6-how-to-run-inspec" aria-hidden="true">#</a> 6. How to Run InSpec</h2>
<p>In this section, we will talk about how to run InSpec. In <RouterLink to="/courses/user/08.html">Section 8</RouterLink>, you will put this into practice!</p>
<h3 id="_6-1-requirements" tabindex="-1"><a class="header-anchor" href="#_6-1-requirements" aria-hidden="true">#</a> 6.1 Requirements</h3>
<p>To run InSpec, you must have:</p>
<ol>
<li><strong>InSpec</strong> - you must have InSpec downloaded on whatever machine is running the scans. This does not have to be the same machine that is being tested! <em>(We will run InSpec from the GitHub codespaces lab environment. Inspec is already downloaded in the GitHub codespaces lab environment after running the <code v-pre>./lab-setup.sh</code> script)</em> Check out the <a href="../../installation">Installation Tab</a> for more information on installing InSpec in a different environment.</li>
<li><strong>A Target</strong> - you have to have something to test! <em>In the GitHub codespaces in the lab environment, we have two Docker containers running to test.</em></li>
<li><strong>An InSpec Profile</strong> - you have to have the tests themselves! This is the code itself that will be run with all of the controls, or tests, against the target. You may have this code stored locally on your runner machine, or you may get it from GitHub if your system has access to the internet. We will look at both of those examples.</li>
</ol>
<h3 id="_6-2-the-inspec-command-formula" tabindex="-1"><a class="header-anchor" href="#_6-2-the-inspec-command-formula" aria-hidden="true">#</a> 6.2 The InSpec Command Formula</h3>
<p>You run InSpec from the command line. There are many different options for this command, but let's break down the simple formula based on the requirements above.</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>inspec <span class="token builtin class-name">exec</span> WHERE_IS_THE_PROFILE <span class="token parameter variable">-t</span> WHAT_IS_THE_TARGET --more-flags EXTRA_STUFF <span class="token parameter variable">--reporter</span> WHAT_SHOULD_INSPEC_DO_WITH_THE_RESULTS
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="start-with-inspec-exec" tabindex="-1"><a class="header-anchor" href="#start-with-inspec-exec" aria-hidden="true">#</a> Start with inspec exec</h4>
<p>You need to start with <code v-pre>inspec exec</code> so that your terminal knows what it is trying to do in the first place.</p>
<h4 id="where-is-the-profile" tabindex="-1"><a class="header-anchor" href="#where-is-the-profile" aria-hidden="true">#</a> WHERE_IS_THE_PROFILE</h4>
<p>Then, you can give the location of the InSpec profile, in other words, the code for the tests themselves. If the InSpec profile is stored locally, you can write a path to that file location, such as <code v-pre>/root/path/to/InSpecProfiles/nginx-profile</code>. If you are hoping to directly access the profile from GitHub, you can enter the url of the GitHub profile, such as <code v-pre>https://github.com/mitre/nginx-stigready-baseline</code>.</p>
<h4 id="what-is-the-target" tabindex="-1"><a class="header-anchor" href="#what-is-the-target" aria-hidden="true">#</a> WHAT_IS_THE_TARGET</h4>
<p>Next, you need to tell your computer what the target is. You add this information after the <code v-pre>-t</code> flag. You could test against your local machine (which is less common), you could test a Virtual Machine, you could test a Docker container, or more. You could connect to that machine via SSH, WinRM, or more. We will talk more about these options later.</p>
<h4 id="extra-stuff" tabindex="-1"><a class="header-anchor" href="#extra-stuff" aria-hidden="true">#</a> EXTRA_STUFF</h4>
<p>There are MANY more options that you can specify when running the InSpec command. The next most common one is specifying inputs for your profile, for example <code v-pre>--input-file /path/to/inputs.yml</code> where you can add inputs that tailor the profile to your environmnent's needs. You can find more information on inputs in the <a href="./07">Tailoring Inputs</a> section.</p>
<h4 id="what-should-inspec-do-with-the-results" tabindex="-1"><a class="header-anchor" href="#what-should-inspec-do-with-the-results" aria-hidden="true">#</a> WHAT_SHOULD_INSPEC_DO_WITH_THE_RESULTS</h4>
<p>And of course you probably want to see the results. You can specify where those results are displayed or saved based on what you enter after the <code v-pre>--reporter</code> flag at the end of your command. For example, the following would print the results on the command line and save it to a file (by creating or overwriting) the file at /path/to/results.json: <code v-pre>--reporter cli json:/path/to/results.json</code>. If you do not add this information, the command will default to providing results on the command line, but it will not save those into a file unless you specify the <code v-pre>--reporter</code> flag like the example.</p>
<p>Each profile's README should give an example of running the InSpec command for that profile, however, you can always reference the complete documentation on the InSpec command options <a href="https://docs.chef.io/inspec/cli/" target="_blank" rel="noopener noreferrer">here<ExternalLinkIcon/></a>.</p>
<details class="hint-container details"><summary>Want to give it a try?</summary>
<p>We will go more in depth on this example in the next two sections, but if you want a head start, you can give running InSpec a try by running this command in your Codespace terminal.</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>inspec <span class="token builtin class-name">exec</span> https://github.com/mitre/nginx-stigready-baseline <span class="token parameter variable">-t</span> docker://nginx <span class="token parameter variable">--reporter</span> cli
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>In the above example, we are testing an NGINX server. We get the InSpec profile (all of the tests) from GitHub by stating <code v-pre>https://github.com/mitre/nginx-stigready-baseline</code>. We use the NGINX target that is running via docker in our Codespace environment by stating <code v-pre>docker://nginx</code>, we do not put any extra flags in this example, and lastly, we only report the results to the terminal (in other words, cli output). Later we will refine this command and talk through it in more detail.</p>
<p><em>Note: The first time you run InSpec, it will likely ask you to accept Chef's license like this:</em></p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>+---------------------------------------------+
            Chef License Acceptance

Before you can continue, <span class="token number">1</span> product license
must be accepted. View the license at
https://www.chef.io/end-user-license-agreement/

License that need accepting:
  * Chef InSpec

Do you accept the <span class="token number">1</span> product license <span class="token punctuation">(</span>yes/no<span class="token punctuation">)</span>?

<span class="token operator">></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>You can type <code v-pre>yes</code> and press enter. This will only happen one time.</p>
<p>If you are using InSpec in a pipeline, you can silently accept the license. Reference <a href="https://docs.chef.io/chef_license_accept/" target="_blank" rel="noopener noreferrer">Chef's documentation<ExternalLinkIcon/></a> for more information.</p>
</details>
<details class="hint-container details"><summary>Transports - Advanced Examples</summary>
<p>The <code v-pre>-t</code> flag (or <code v-pre>--target</code> flag in long form) specifies <strong>what</strong> target you want InSpec to scan. <strong>How</strong> you connect to that target is via a transport. Transports use standard ports and protocols. Some examples are SSH, WinRM, AWS SSM, Docker, and Kubernetes.</p>
<h3 id="containers-docker-transport" tabindex="-1"><a class="header-anchor" href="#containers-docker-transport" aria-hidden="true">#</a> Containers (docker transport)</h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>inspec <span class="token builtin class-name">exec</span> https://github.com/mitre/nginx-stigready-baseline 
  <span class="token parameter variable">-t</span> docker://instance_id 
  --input-file <span class="token operator">&lt;</span>path_to_your_input_file/name_of_your_input_file.yml<span class="token operator">></span> 
  <span class="token parameter variable">--reporter</span> json:<span class="token operator">&lt;</span>path_to_your_output_file/name_of_your_output_file.json<span class="token operator">></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="ssh-transport" tabindex="-1"><a class="header-anchor" href="#ssh-transport" aria-hidden="true">#</a> SSH Transport</h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>inspec <span class="token builtin class-name">exec</span> https://github.com/mitre/nginx-stigready-baseline
  <span class="token parameter variable">-t</span> ssh://Username:Password@IP 
  --input-file <span class="token operator">&lt;</span>path_to_your_input_file/name_of_your_input_file.yml<span class="token operator">></span> 
  <span class="token parameter variable">--reporter</span> json:<span class="token operator">&lt;</span>path_to_your_output_file/name_of_your_output_file.json<span class="token operator">></span> 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details>
<div class="hint-container tip">
<p class="hint-container-title">Defaults</p>
<p>Note that if you do not provide one of the required flags in the InSpec exec command, there is default behavior.</p>
<table>
<thead>
<tr>
<th>Missing Flag</th>
<th>Default Behavior</th>
</tr>
</thead>
<tbody>
<tr>
<td>No target (-t or --target)</td>
<td>Uses your local machine (where InSpec is running) as the target.</td>
</tr>
<tr>
<td>No --reporter flag</td>
<td>Prints results to the terminal on the InSpec runner machine</td>
</tr>
</tbody>
</table>
</div>
<h3 id="_6-3-how-to-deploy-inspec" tabindex="-1"><a class="header-anchor" href="#_6-3-how-to-deploy-inspec" aria-hidden="true">#</a> 6.3 How to Deploy InSpec</h3>
<p>It is intended and recommended that InSpec be installed on a &quot;runner&quot; host (such as a DevOps orchestration server, an administrative management system, or a developer's workstation/laptop) and run against the target remotely. However, InSpec may be deployed in <a href="https://saf.mitre.org/faq/7" target="_blank" rel="noopener noreferrer">various ways<ExternalLinkIcon/></a> depending on the needs of the user:</p>
<figure><img src="@source/assets/img/runner.png" alt="Running InSpec" tabindex="0" loading="lazy"><figcaption>Running InSpec</figcaption></figure>
</div></template>


