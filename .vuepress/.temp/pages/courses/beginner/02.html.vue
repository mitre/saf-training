<template><div><h3 id="check-in" tabindex="-1"><a class="header-anchor" href="#check-in" aria-hidden="true">#</a> Check-In</h3>
<details class="hint-container details"><summary>Have you used InSpec before?</summary>
<p>There is no right or wrong answer. If this is your first time using InSpec, welcome! If you have used it before, welcome back. If you want more information on the basics of Ruby (InSpec is built on Ruby), take a look at the Ruby materials linked on the <RouterLink to="/">home page</RouterLink>.</p>
</details>
<details class="hint-container details"><summary>Which goal of the MITRE Security Automation Framework (SAF) is supported by InSpec?</summary>
<p>InSpec is used in the <a href="https://saf.mitre.org/#/validate" target="_blank" rel="noopener noreferrer">Validate pillar<ExternalLinkIcon/></a>. InSpec is used to do security validation.</p>
<p><em>Note that InSpec is not the only validation solution, but the one preferred at the SAF. You are not required to use InSpec to use the rest of the SAF nor are you required to use the rest of the SAF to use InSpec.</em></p>
</details>
<details class="hint-container details"><summary>Is your Codespace environment set up successfully?</summary>
<p>This class will have hands-on activities. We recommend that you use the provided class <a href="https://github.com/mitre/saf-training-lab-environment" target="_blank" rel="noopener noreferrer">development lab environment<ExternalLinkIcon/></a> to participate in the hands-on activities. All you need is to login with a <a href="https://github.com/signup" target="_blank" rel="noopener noreferrer">GitHub<ExternalLinkIcon/></a> account (which you can make for free), and follow the directions in the <a href="https://github.com/mitre/saf-training-lab-environment#readme" target="_blank" rel="noopener noreferrer">README.md<ExternalLinkIcon/></a>. To verify that your environment is setup, run <code v-pre>./test-lab.sh</code>.</p>
</details>
<h2 id="what-is-an-inspec-profile" tabindex="-1"><a class="header-anchor" href="#what-is-an-inspec-profile" aria-hidden="true">#</a> What is an InSpec Profile?</h2>
<h3 id="inspec-profiles" tabindex="-1"><a class="header-anchor" href="#inspec-profiles" aria-hidden="true">#</a> InSpec Profiles</h3>
<p>InSpec organizes its code into <code v-pre>profiles</code>. A <code v-pre>profile</code> is a set of automated tests that usually relates directly back to a Security Requirements Benchmark -- such as a CIS Benchmark or a Defense Information Security Agency (DISA) Security Technical Implementation Guide (STIGs) - and provides an organized structure to articulate that set of requirements using tests in code.</p>
<p><strong>Profiles have two (2) required elements:</strong></p>
<ul>
<li>An <code v-pre>inspec.yml</code> file</li>
<li>A <code v-pre>controls</code> directory</li>
</ul>
<p><strong>and four (4) optional elements:</strong></p>
<ul>
<li>A <code v-pre>libraries</code> directory</li>
<li>A <code v-pre>files</code> directory</li>
<li>An <code v-pre>inputs.yml</code> file</li>
<li>A <code v-pre>README.md</code> file</li>
</ul>
<p>You can learn all the details here: <a href="https://docs.chef.io/inspec/profiles/" target="_blank" rel="noopener noreferrer">https://docs.chef.io/inspec/profiles/<ExternalLinkIcon/></a></p>
<p>We will be going over each of these during our class.</p>
<h3 id="inspec-profile-structure" tabindex="-1"><a class="header-anchor" href="#inspec-profile-structure" aria-hidden="true">#</a> InSpec Profile Structure</h3>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>$ tree nginx
      nginx
      └── profile
          ├── README.md
          ├── inputs.yml
          ├── controls
          │   ├── V-2230.rb
          │   └── V-2232.rb
          ├── files
          │   └── services-and-ports.yml
          ├── inspec.yml
          └── libraries
              └── nginx_helper.rb
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr>
<h3 id="inspec-controls-structure" tabindex="-1"><a class="header-anchor" href="#inspec-controls-structure" aria-hidden="true">#</a> InSpec Controls Structure</h3>
<div class="language-ruby line-numbers-mode" data-ext="rb"><pre v-pre class="language-ruby"><code>control <span class="token string-literal"><span class="token string">"V-13727"</span></span> <span class="token keyword">do</span>
  title <span class="token string-literal"><span class="token string">"The worker_processes StartServers directive must be set properly."</span></span>

  desc "These requirements are set to mitigate the effects of several types of
  denial of service attacks<span class="token punctuation">.</span> Although there is some latitude concerning the
  settings themselves<span class="token punctuation">,</span> the requirements attempt to provide reasonable limits
  <span class="token keyword">for</span> the protection of the web server<span class="token punctuation">.</span> If necessary<span class="token punctuation">,</span> these limits can be
  adjusted to accommodate the operational requirement of a given system<span class="token punctuation">.</span>"

  impact <span class="token number">0.5</span>
  tag <span class="token string-literal"><span class="token string">"severity"</span></span><span class="token operator">:</span> <span class="token string-literal"><span class="token string">"medium"</span></span>
  tag <span class="token string-literal"><span class="token string">"gtitle"</span></span><span class="token operator">:</span> <span class="token string-literal"><span class="token string">"WA000-WWA026"</span></span>
  tag <span class="token string-literal"><span class="token string">"gid"</span></span><span class="token operator">:</span> <span class="token string-literal"><span class="token string">"V-13727"</span></span>
  tag <span class="token string-literal"><span class="token string">"rid"</span></span><span class="token operator">:</span> <span class="token string-literal"><span class="token string">"SV-36645r2_rule"</span></span>
  tag <span class="token string-literal"><span class="token string">"stig_id"</span></span><span class="token operator">:</span> <span class="token string-literal"><span class="token string">"WA000-WWA026 A22"</span></span>
  tag <span class="token string-literal"><span class="token string">"nist"</span></span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string-literal"><span class="token string">"CM-6"</span></span><span class="token punctuation">,</span> <span class="token string-literal"><span class="token string">"Rev_4"</span></span><span class="token punctuation">]</span>

  tag <span class="token string-literal"><span class="token string">"check"</span></span><span class="token operator">:</span> "To view the worker_processes directive value enter the
  following command<span class="token operator">:</span>
  grep <span class="token string-literal"><span class="token string">""</span></span>worker_processes<span class="token string-literal"><span class="token string">""</span></span> on the nginx<span class="token punctuation">.</span>conf file <span class="token keyword">and</span> any separate included
  configuration files
  If the value of <span class="token string-literal"><span class="token string">""</span></span>worker_processes<span class="token string-literal"><span class="token string">""</span></span> is <span class="token keyword">not</span> set to auto <span class="token keyword">or</span> explicitly set<span class="token punctuation">,</span>
  this is a finding<span class="token operator">:</span>
  worker_processes   auto<span class="token punctuation">;</span>
  worker_processes defines the number of worker processes<span class="token punctuation">.</span> The optimal value
  depends on many factors including <span class="token punctuation">(</span>but <span class="token keyword">not</span> limited to<span class="token punctuation">)</span> the number of <span class="token constant">CPU</span>
  cores<span class="token punctuation">,</span> the number of hard disk drives that store data<span class="token punctuation">,</span> <span class="token keyword">and</span> load pattern<span class="token punctuation">.</span> When
  one is <span class="token keyword">in</span> doubt<span class="token punctuation">,</span> setting it to the number of available <span class="token constant">CPU</span> cores would be a
  good start <span class="token punctuation">(</span>the value “auto” will try to autodetect it<span class="token punctuation">)</span><span class="token punctuation">.</span>"

  tag <span class="token string-literal"><span class="token string">"fix"</span></span><span class="token operator">:</span> "Edit the configuration file <span class="token keyword">and</span> set the value of
  <span class="token string-literal"><span class="token string">""</span></span>worker_processes<span class="token string-literal"><span class="token string">""</span></span> to the value of auto <span class="token keyword">or</span> a value of <span class="token number">1</span> <span class="token keyword">or</span> higher<span class="token operator">:</span>
  worker_processes auto<span class="token punctuation">;</span>"

  describe nginx_conf<span class="token punctuation">(</span><span class="token constant">NGINX_CONF_FILE</span><span class="token punctuation">)</span><span class="token punctuation">.</span>params<span class="token punctuation">[</span><span class="token string-literal"><span class="token string">'worker_processes'</span></span><span class="token punctuation">]</span> <span class="token keyword">do</span>
    it <span class="token punctuation">{</span> should cmp <span class="token punctuation">[</span><span class="token punctuation">[</span><span class="token string-literal"><span class="token string">'auto'</span></span><span class="token punctuation">]</span><span class="token punctuation">]</span> <span class="token punctuation">}</span>
  <span class="token keyword">end</span>
<span class="token keyword">end</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="inspec-results" tabindex="-1"><a class="header-anchor" href="#inspec-results" aria-hidden="true">#</a> InSpec Results</h3>
<h4 id="failure" tabindex="-1"><a class="header-anchor" href="#failure" aria-hidden="true">#</a> Failure</h4>
<figure><img src="@source/assets/img/InSpec_Failure.png" alt="InSpec - A Failing Control" tabindex="0" loading="lazy"><figcaption>InSpec - A Failing Control</figcaption></figure>
<h4 id="pass" tabindex="-1"><a class="header-anchor" href="#pass" aria-hidden="true">#</a> Pass</h4>
<figure><img src="@source/assets/img/InSpec_Pass.png" alt="InSpec - A Passing Control" tabindex="0" loading="lazy"><figcaption>InSpec - A Passing Control</figcaption></figure>
<h4 id="multiple-controls" tabindex="-1"><a class="header-anchor" href="#multiple-controls" aria-hidden="true">#</a> Multiple Controls</h4>
<figure><img src="@source/assets/img/InSpec_Multiple_Controls.png" alt="InSpec - Multiple Controls" tabindex="0" loading="lazy"><figcaption>InSpec - Multiple Controls</figcaption></figure>
<h3 id="tooling-and-reporting" tabindex="-1"><a class="header-anchor" href="#tooling-and-reporting" aria-hidden="true">#</a> Tooling and Reporting</h3>
<figure><img src="@source/assets/img/Heimdall_Results.png" alt="Heimdall Results View" tabindex="0" loading="lazy"><figcaption>Heimdall Results View</figcaption></figure>
</div></template>


