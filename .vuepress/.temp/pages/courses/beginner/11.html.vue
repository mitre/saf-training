<template><div><h2 id="from-stig-to-profile" tabindex="-1"><a class="header-anchor" href="#from-stig-to-profile" aria-hidden="true">#</a> From STIG to Profile</h2>
<p>You have seen in some of our examples in this class that a robust profile's controls will include a large number of metadata tags:</p>
<details class="hint-container details"><summary>InSpec control with many STIG-related tags</summary>
<p>Taken from the <a href="https://github.com/mitre/redhat-enterprise-linux-7-stig-baseline/blob/main/controls/SV-204392.rb" target="_blank" rel="noopener noreferrer">SAF RHEL7 profile<ExternalLinkIcon/></a>:</p>
<div class="language-ruby line-numbers-mode" data-ext="rb"><pre v-pre class="language-ruby"><code>control <span class="token string-literal"><span class="token string">'SV-204392'</span></span> <span class="token keyword">do</span>
  title 'The Red Hat Enterprise Linux operating system must be configured so that the file permissions<span class="token punctuation">,</span> ownership<span class="token punctuation">,</span>
    <span class="token keyword">and</span> group membership of system files <span class="token keyword">and</span> commands match the vendor values<span class="token punctuation">.</span>'
  desc 'Discretionary access control is weakened <span class="token keyword">if</span> a user <span class="token keyword">or</span> group has access permissions to system files <span class="token keyword">and</span>
    directories greater than the default<span class="token punctuation">.</span>'
  desc <span class="token string-literal"><span class="token string">'check'</span></span><span class="token punctuation">,</span> <span class="token operator">...</span>
  desc <span class="token string-literal"><span class="token string">'fix'</span></span><span class="token punctuation">,</span> <span class="token operator">...</span>
  impact <span class="token number">0.7</span>
  tag legacy<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string-literal"><span class="token string">'V-71849'</span></span><span class="token punctuation">,</span> <span class="token string-literal"><span class="token string">'SV-86473'</span></span><span class="token punctuation">]</span>
  tag severity<span class="token operator">:</span> <span class="token string-literal"><span class="token string">'high'</span></span>
  tag gtitle<span class="token operator">:</span> <span class="token string-literal"><span class="token string">'SRG-OS-000257-GPOS-00098'</span></span>
  tag satisfies<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string-literal"><span class="token string">'SRG-OS-000257-GPOS-00098'</span></span><span class="token punctuation">,</span> <span class="token string-literal"><span class="token string">'SRG-OS-000278-GPOS-00108'</span></span><span class="token punctuation">]</span>
  tag gid<span class="token operator">:</span> <span class="token string-literal"><span class="token string">'V-204392'</span></span>
  tag rid<span class="token operator">:</span> <span class="token string-literal"><span class="token string">'SV-204392r880752_rule'</span></span>
  tag stig_id<span class="token operator">:</span> <span class="token string-literal"><span class="token string">'RHEL-07-010010'</span></span>
  tag fix_id<span class="token operator">:</span> <span class="token string-literal"><span class="token string">'F-36302r880751_fix'</span></span>
  tag cci<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string-literal"><span class="token string">'CCI-001494'</span></span><span class="token punctuation">,</span> <span class="token string-literal"><span class="token string">'CCI-001496'</span></span><span class="token punctuation">,</span> <span class="token string-literal"><span class="token string">'CCI-002165'</span></span><span class="token punctuation">,</span> <span class="token string-literal"><span class="token string">'CCI-002235'</span></span><span class="token punctuation">]</span>
  tag nist<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string-literal"><span class="token string">'AU-9'</span></span><span class="token punctuation">,</span> <span class="token string-literal"><span class="token string">'AU-9 (3)'</span></span><span class="token punctuation">,</span> <span class="token string-literal"><span class="token string">'AC-3 (4)'</span></span><span class="token punctuation">,</span> <span class="token string-literal"><span class="token string">'AC-6 (10)'</span></span><span class="token punctuation">]</span>
  tag subsystems<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string-literal"><span class="token string">'permissions'</span></span><span class="token punctuation">,</span> <span class="token string-literal"><span class="token string">'package'</span></span><span class="token punctuation">,</span> <span class="token string-literal"><span class="token string">'rpm'</span></span><span class="token punctuation">]</span>
  tag <span class="token string-literal"><span class="token string">'host'</span></span>
  tag <span class="token string-literal"><span class="token string">'container'</span></span>

  describe the_actual_test <span class="token keyword">do</span> <span class="token comment"># the actual describe block appears on line 54 of this control!</span>
    <span class="token operator">...</span>
  <span class="token keyword">end</span>
<span class="token keyword">end</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>We <em>really</em> do not want to stuck with labeling all of these controls by hand. Let's cheat and use the <a href="https://saf-cli.mitre.org" target="_blank" rel="noopener noreferrer">SAF CLI<ExternalLinkIcon/></a> benchmark generator.</p>
<h3 id="download-stig-requirements" tabindex="-1"><a class="header-anchor" href="#download-stig-requirements" aria-hidden="true">#</a> Download STIG Requirements</h3>
<p>First, let's discuss where all of that metadata comes from in the first place -- the baseline security guidance that we are automating using InSpec. We'll crack open a STIG XCCDF XML file to show you where the control metadata is sourced from.</p>
<p>Download the latest STIG Viewer located here <a href="https://public.cyber.mil/stigs/srg-stig-tools/" target="_blank" rel="noopener noreferrer">STIG Viewer<ExternalLinkIcon/></a>.</p>
<figure><img src="@source/assets/img/Download_STIG_Viewer.png" alt="Downloading STIG Viewer" tabindex="0" loading="lazy"><figcaption>Downloading STIG Viewer</figcaption></figure>
<p>Download the <code v-pre>Red Hat Enterprise Linux 8 STIG</code> located here <a href="https://public.cyber.mil/stigs/downloads/?_dl_facet_stigs=operating-systems%2Cunix-linux" target="_blank" rel="noopener noreferrer">RHEL8 STIG Download<ExternalLinkIcon/></a></p>
<p>(The RHEL8 STIG is at version 1, release 5 at time of writing, but may have been updated by the time you downloaded. This will not affect how we use the STIG in this class.)</p>
<figure><img src="@source/assets/img/Download_STIG.png" alt="Downloading STIGs" tabindex="0" loading="lazy"><figcaption>Downloading STIGs</figcaption></figure>
<h3 id="convert-the-stig-xccdf-benchmark-to-an-inspec-stubs-profile" tabindex="-1"><a class="header-anchor" href="#convert-the-stig-xccdf-benchmark-to-an-inspec-stubs-profile" aria-hidden="true">#</a> Convert the STIG XCCDF Benchmark To an InSpec Stubs Profile</h3>
<div class="hint-container note">
<p class="hint-container-title">Timesaver Ahead!</p>
<p>We already converted the XCCDF STIG Benchmark into a starter profile using the <code v-pre>saf generate xccdf_benchmark2inspec_stub</code> command using the correct flags, mapping file and other options. In a moment we will show you how to grab our pre-made profile that we generated with the SAF CLI.</p>
</div>
</details>
<p>The SAF CLI has the <code v-pre>generate xccdf_benchmark2inspec_stub</code> sub-command which can help you quickly convert an XCCDF Benchmark document into the start of an InSpec Profile.</p>
<p>To learn how you can use the <code v-pre>saf generate xccdf_benchmark2inspec_stub</code> or any other <code v-pre>saf</code> cli command, go to the <a href="https://saf-cli.mitre.org/#generate" target="_blank" rel="noopener noreferrer">saf-cli homepage<ExternalLinkIcon/></a> or use the help commands. An example help command to generate the stubs of the InSpec profile is below.</p>
<CodeTabs id="50" :data='[{"id":"Command"},{"id":"Output"}]' tab-id="shell">
<template #title0="{ value, isActive }">Command</template>
<template #title1="{ value, isActive }">Output</template>
<template #tab0="{ value, isActive }">
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>saf generate xccdf_benchmark2inspec_stub <span class="token parameter variable">--help</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></template>
<template #tab1="{ value, isActive }">
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>Translate an XCCDF benchmark <span class="token function">file</span> to a skeleton <span class="token keyword">for</span> an InSpec profile

USAGE
  $ saf saf generate xccdf_benchmark2inspec_stub <span class="token parameter variable">-i</span> <span class="token operator">&lt;</span>stig-xccdf-xml<span class="token operator">></span> <span class="token punctuation">[</span>-o <span class="token operator">&lt;</span>output-folder<span class="token operator">></span><span class="token punctuation">]</span> <span class="token punctuation">[</span>-h<span class="token punctuation">]</span> <span class="token punctuation">[</span>-m <span class="token operator">&lt;</span>metadata-json<span class="token operator">></span><span class="token punctuation">]</span> <span class="token punctuation">[</span>-T
    <span class="token punctuation">(</span>rule<span class="token operator">|</span>group<span class="token operator">|</span>cis<span class="token operator">|</span>version<span class="token punctuation">)</span><span class="token punctuation">]</span> <span class="token punctuation">[</span>-s<span class="token punctuation">]</span> <span class="token punctuation">[</span>-L <span class="token punctuation">(</span>info<span class="token operator">|</span>warn<span class="token operator">|</span>debug<span class="token operator">|</span>verbose<span class="token punctuation">)</span><span class="token punctuation">]</span>

FLAGS
  -L, <span class="token parameter variable">--logLevel</span><span class="token operator">=</span><span class="token operator">&lt;</span>option<span class="token operator">></span>        <span class="token punctuation">[</span>default: info<span class="token punctuation">]</span>
                                 <span class="token operator">&lt;</span>options: info<span class="token operator">|</span>warn<span class="token operator">|</span>debug<span class="token operator">|</span>verbose<span class="token operator">></span>
  -O, <span class="token parameter variable">--ovalDefinitions</span><span class="token operator">=</span><span class="token operator">&lt;</span>value<span class="token operator">></span>  Path to an OVAL definitions <span class="token function">file</span> to populate profile elements that reference OVAL definitions
  -T, <span class="token parameter variable">--idType</span><span class="token operator">=</span><span class="token operator">&lt;</span>option<span class="token operator">></span>          <span class="token punctuation">[</span>default: rule<span class="token punctuation">]</span> Control ID Types: <span class="token string">'rule'</span> - Vulnerability IDs <span class="token punctuation">(</span>ex. <span class="token string">'SV-XXXXX'</span><span class="token punctuation">)</span>, <span class="token string">'group'</span> - Group IDs <span class="token punctuation">(</span>ex.
                                 <span class="token string">'V-XXXXX'</span><span class="token punctuation">)</span>, <span class="token string">'cis'</span> - CIS Rule IDs <span class="token punctuation">(</span>ex. C-1.1.1.1<span class="token punctuation">)</span>, <span class="token string">'version'</span> - Version IDs <span class="token punctuation">(</span>ex. RHEL-07-010020 - also
                                 known as STIG IDs<span class="token punctuation">)</span>
                                 <span class="token operator">&lt;</span>options: rule<span class="token operator">|</span>group<span class="token operator">|</span>cis<span class="token operator">|</span>version<span class="token operator">></span>
  -h, <span class="token parameter variable">--help</span>                     Show CLI help.
  -i, <span class="token parameter variable">--input</span><span class="token operator">=</span><span class="token operator">&lt;</span>value<span class="token operator">></span>            <span class="token punctuation">(</span>required<span class="token punctuation">)</span> Path to the XCCDF benchmark <span class="token function">file</span>
  -m, <span class="token parameter variable">--metadata</span><span class="token operator">=</span><span class="token operator">&lt;</span>value<span class="token operator">></span>         Path to a JSON <span class="token function">file</span> with additional metadata <span class="token keyword">for</span> the inspec.yml <span class="token function">file</span>
  -o, <span class="token parameter variable">--output</span><span class="token operator">=</span><span class="token operator">&lt;</span>value<span class="token operator">></span>           <span class="token punctuation">[</span>default: profile<span class="token punctuation">]</span> The output folder to <span class="token function">write</span> the generated InSpec content
  -s, <span class="token parameter variable">--singleFile</span>               Output the resulting controls as a single <span class="token function">file</span>

DESCRIPTION
  Translate an XCCDF benchmark <span class="token function">file</span> to a skeleton <span class="token keyword">for</span> an InSpec profile

EXAMPLES
  $ saf generate xccdf_benchmark2inspec_stub <span class="token parameter variable">-i</span> ./U_RHEL_6_STIG_V2R2_Manual-xccdf.xml <span class="token parameter variable">-T</span> group <span class="token parameter variable">--logLevel</span> debug <span class="token parameter variable">-r</span> rhel-6-update-report.md

  $ saf generate xccdf_benchmark2inspec_stub <span class="token parameter variable">-i</span> ./CIS_Ubuntu_Linux_18.04_LTS_Benchmark_v1.1.0-xccdf.xml <span class="token parameter variable">-O</span> ./CIS_Ubuntu_Linux_18.04_LTS_Benchmark_v1.1.0-oval.xml <span class="token parameter variable">--logLevel</span> debug
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></template>
</CodeTabs>
<h3 id="how-to-get-the-pre-made-profile" tabindex="-1"><a class="header-anchor" href="#how-to-get-the-pre-made-profile" aria-hidden="true">#</a> How to Get the Pre-made Profile</h3>
<p>We have a pre-made profile generated with the <code v-pre>saf generate xccdf_benchmark2inspec_stub</code> command sitting on the <a href="https://mitre.github.io/saf-training/resources/#rhel8-baseline-stubs" target="_blank" rel="noopener noreferrer">Resources<ExternalLinkIcon/></a> page for these classes. For the purposes of this class, you'll need to download it into your Codespaces library. You can do this with the <code v-pre>wget</code> shell command.</p>
<CodeTabs id="64" :data='[{"id":"Fetching the pre-made profile with <code v-pre>wget</code>"},{"id":"Output"}]' tab-id="shell">
<template #title0="{ value, isActive }">Fetching the pre-made profile with <code v-pre>wget</code></template>
<template #title1="{ value, isActive }">Output</template>
<template #tab0="{ value, isActive }">
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">wget</span> https://github.com/mitre/inspec-profile-developer-course-lab-environment/raw/main/resources/rhel8-baseline-stubs.tar.gz
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></template>
<template #tab1="{ value, isActive }">
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>/workspaces/saf-training-lab-environment/rhel8-baseline-stubs <span class="token punctuation">(</span>main<span class="token punctuation">)</span> $ <span class="token function">wget</span> https://github.com/mitre/inspec-profile-developer-course-lab-environment/raw/main/resources/rhel8-baseline-stubs.tar.gz
--2023-02-09 <span class="token number">14</span>:51:56--  https://github.com/mitre/inspec-profile-developer-course-lab-environment/raw/main/resources/rhel8-baseline-stubs.tar.gz
Resolving github.com <span class="token punctuation">(</span>github.com<span class="token punctuation">)</span><span class="token punctuation">..</span>. <span class="token number">140.82</span>.112.4
Connecting to github.com <span class="token punctuation">(</span>github.com<span class="token punctuation">)</span><span class="token operator">|</span><span class="token number">140.82</span>.112.4<span class="token operator">|</span>:443<span class="token punctuation">..</span>. connected.
HTTP request sent, awaiting response<span class="token punctuation">..</span>. <span class="token number">302</span> Found
Location: https://raw.githubusercontent.com/mitre/inspec-profile-developer-course-lab-environment/main/resources/rhel8-baseline-stubs.tar.gz <span class="token punctuation">[</span>following<span class="token punctuation">]</span>
--2023-02-09 <span class="token number">14</span>:51:57--  https://raw.githubusercontent.com/mitre/inspec-profile-developer-course-lab-environment/main/resources/rhel8-baseline-stubs.tar.gz
Resolving raw.githubusercontent.com <span class="token punctuation">(</span>raw.githubusercontent.com<span class="token punctuation">)</span><span class="token punctuation">..</span>. <span class="token number">185.199</span>.109.133, <span class="token number">185.199</span>.110.133, <span class="token number">185.199</span>.111.133, <span class="token punctuation">..</span>.
Connecting to raw.githubusercontent.com <span class="token punctuation">(</span>raw.githubusercontent.com<span class="token punctuation">)</span><span class="token operator">|</span><span class="token number">185.199</span>.109.133<span class="token operator">|</span>:443<span class="token punctuation">..</span>. connected.
HTTP request sent, awaiting response<span class="token punctuation">..</span>. <span class="token number">200</span> OK
Length: <span class="token number">197531</span> <span class="token punctuation">(</span>193K<span class="token punctuation">)</span> <span class="token punctuation">[</span>application/octet-stream<span class="token punctuation">]</span>
Saving to: ‘rhel8-baseline-stubs.tar.gz’

rhel8-baseline-stubs.tar.gz                   <span class="token number">100</span>%<span class="token punctuation">[</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">==</span><span class="token operator">=</span><span class="token operator">></span><span class="token punctuation">]</span> <span class="token number">192</span>.90K  --.-KB/s    <span class="token keyword">in</span> <span class="token number">0</span>.004s  

<span class="token number">2023</span>-02-09 <span class="token number">14</span>:51:57 <span class="token punctuation">(</span><span class="token number">47.0</span> MB/s<span class="token punctuation">)</span> - ‘rhel8-baseline-stubs.tar.gz’ saved <span class="token punctuation">[</span><span class="token number">197531</span>/197531<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></template>
</CodeTabs>
<p>Once you've used <code v-pre>wget</code> to grab the compressed profile, we need to uncompress it so that we can work with the control files inside.</p>
<CodeTabs id="75" :data='[{"id":"Uncompressing the profile"},{"id":"Output"}]' tab-id="shell">
<template #title0="{ value, isActive }">Uncompressing the profile</template>
<template #title1="{ value, isActive }">Output</template>
<template #tab0="{ value, isActive }">
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token function">tar</span> zxvfp ./rhel8-baseline-stubs.tar.gz
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></template>
<template #tab1="{ value, isActive }">
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>rhel8-baseline-stubs/
rhel8-baseline-stubs/libraries/
rhel8-baseline-stubs/README.md
rhel8-baseline-stubs/controls/
rhel8-baseline-stubs/inspec.yml
rhel8-baseline-stubs/controls/SV-230281.rb
rhel8-baseline-stubs/controls/SV-230390.rb
rhel8-baseline-stubs/controls/SV-230363.rb
rhel8-baseline-stubs/controls/SV-230223.rb
rhel8-baseline-stubs/controls/SV-230332.rb
rhel8-baseline-stubs/controls/SV-230272.rb
rhel8-baseline-stubs/controls/SV-245540.rb
rhel8-baseline-stubs/controls/SV-230246.rb
rhel8-baseline-stubs/controls/SV-230306.rb
rhel8-baseline-stubs/controls/SV-230357.rb
rhel8-baseline-stubs/controls/SV-230559.rb
rhel8-baseline-stubs/controls/SV-230419.rb
rhel8-baseline-stubs/controls/SV-230508.rb
rhel8-baseline-stubs/controls/SV-230448.rb
rhel8-baseline-stubs/controls/SV-230518.rb
rhel8-baseline-stubs/controls/SV-230409.rb
rhel8-baseline-stubs/controls/SV-230549.rb
rhel8-baseline-stubs/controls/SV-230347.rb
rhel8-baseline-stubs/controls/SV-230316.rb
rhel8-baseline-stubs/controls/SV-230256.rb
rhel8-baseline-stubs/controls/SV-230262.rb
rhel8-baseline-stubs/controls/SV-230322.rb
rhel8-baseline-stubs/controls/SV-230233.rb
rhel8-baseline-stubs/controls/SV-230373.rb
rhel8-baseline-stubs/controls/SV-230380.rb
rhel8-baseline-stubs/controls/SV-230291.rb
rhel8-baseline-stubs/controls/SV-230353.rb
rhel8-baseline-stubs/controls/SV-230302.rb
rhel8-baseline-stubs/controls/SV-230394.rb
rhel8-baseline-stubs/controls/SV-230285.rb
rhel8-baseline-stubs/controls/SV-230336.rb
rhel8-baseline-stubs/controls/SV-230276.rb
rhel8-baseline-stubs/controls/SV-230367.rb
rhel8-baseline-stubs/controls/SV-230227.rb
rhel8-baseline-stubs/controls/SV-230429.rb
rhel8-baseline-stubs/controls/SV-230478.rb
rhel8-baseline-stubs/controls/SV-230538.rb
rhel8-baseline-stubs/controls/SV-230468.rb
rhel8-baseline-stubs/controls/SV-230439.rb
rhel8-baseline-stubs/controls/SV-230237.rb
rhel8-baseline-stubs/controls/SV-230377.rb
rhel8-baseline-stubs/controls/SV-230266.rb
rhel8-baseline-stubs/controls/SV-230326.rb
rhel8-baseline-stubs/controls/SV-230295.rb
rhel8-baseline-stubs/controls/SV-230384.rb
rhel8-baseline-stubs/controls/SV-230312.rb
rhel8-baseline-stubs/controls/SV-230252.rb
rhel8-baseline-stubs/controls/SV-230343.rb
rhel8-baseline-stubs/controls/SV-237641.rb
rhel8-baseline-stubs/controls/SV-230352.rb
rhel8-baseline-stubs/controls/SV-230243.rb
rhel8-baseline-stubs/controls/SV-230303.rb
rhel8-baseline-stubs/controls/SV-230395.rb
rhel8-baseline-stubs/controls/SV-230284.rb
rhel8-baseline-stubs/controls/SV-230337.rb
rhel8-baseline-stubs/controls/SV-230277.rb
rhel8-baseline-stubs/controls/SV-230366.rb
rhel8-baseline-stubs/controls/SV-230226.rb
rhel8-baseline-stubs/controls/SV-230428.rb
rhel8-baseline-stubs/controls/SV-230479.rb
rhel8-baseline-stubs/controls/SV-230539.rb
rhel8-baseline-stubs/controls/SV-230529.rb
rhel8-baseline-stubs/controls/SV-230469.rb
rhel8-baseline-stubs/controls/SV-230438.rb
rhel8-baseline-stubs/controls/SV-230236.rb
rhel8-baseline-stubs/controls/SV-230376.rb
rhel8-baseline-stubs/controls/SV-230267.rb
rhel8-baseline-stubs/controls/SV-230327.rb
rhel8-baseline-stubs/controls/SV-230294.rb
rhel8-baseline-stubs/controls/SV-230385.rb
rhel8-baseline-stubs/controls/SV-230313.rb
rhel8-baseline-stubs/controls/SV-230253.rb
rhel8-baseline-stubs/controls/SV-230342.rb
rhel8-baseline-stubs/controls/SV-237640.rb
rhel8-baseline-stubs/controls/SV-230280.rb
rhel8-baseline-stubs/controls/SV-230362.rb
rhel8-baseline-stubs/controls/SV-230222.rb
rhel8-baseline-stubs/controls/SV-230333.rb
rhel8-baseline-stubs/controls/SV-230273.rb
rhel8-baseline-stubs/controls/SV-230247.rb
rhel8-baseline-stubs/controls/SV-230307.rb
rhel8-baseline-stubs/controls/SV-230356.rb
rhel8-baseline-stubs/controls/SV-230558.rb
rhel8-baseline-stubs/controls/SV-230418.rb
rhel8-baseline-stubs/controls/SV-230509.rb
rhel8-baseline-stubs/controls/SV-230449.rb
rhel8-baseline-stubs/controls/SV-230519.rb
rhel8-baseline-stubs/controls/SV-230408.rb
rhel8-baseline-stubs/controls/SV-230548.rb
rhel8-baseline-stubs/controls/SV-230346.rb
rhel8-baseline-stubs/controls/SV-230317.rb
rhel8-baseline-stubs/controls/SV-230257.rb
rhel8-baseline-stubs/controls/SV-230263.rb
rhel8-baseline-stubs/controls/SV-230323.rb
rhel8-baseline-stubs/controls/SV-230232.rb
rhel8-baseline-stubs/controls/SV-230372.rb
rhel8-baseline-stubs/controls/SV-230381.rb
rhel8-baseline-stubs/controls/SV-230290.rb
rhel8-baseline-stubs/controls/SV-230553.rb
rhel8-baseline-stubs/controls/SV-230413.rb
rhel8-baseline-stubs/controls/SV-230502.rb
rhel8-baseline-stubs/controls/SV-230485.rb
rhel8-baseline-stubs/controls/SV-230476.rb
rhel8-baseline-stubs/controls/SV-230536.rb
rhel8-baseline-stubs/controls/SV-230427.rb
rhel8-baseline-stubs/controls/SV-230369.rb
rhel8-baseline-stubs/controls/SV-244521.rb
rhel8-baseline-stubs/controls/SV-230229.rb
rhel8-baseline-stubs/controls/SV-230338.rb
rhel8-baseline-stubs/controls/SV-230278.rb
rhel8-baseline-stubs/controls/SV-244544.rb
rhel8-baseline-stubs/controls/SV-244554.rb
rhel8-baseline-stubs/controls/SV-230268.rb
rhel8-baseline-stubs/controls/SV-230328.rb
rhel8-baseline-stubs/controls/SV-244531.rb
rhel8-baseline-stubs/controls/SV-230239.rb
rhel8-baseline-stubs/controls/SV-230379.rb
rhel8-baseline-stubs/controls/SV-230437.rb
rhel8-baseline-stubs/controls/SV-230526.rb
rhel8-baseline-stubs/controls/SV-230466.rb
rhel8-baseline-stubs/controls/SV-230495.rb
rhel8-baseline-stubs/controls/SV-230512.rb
rhel8-baseline-stubs/controls/SV-230403.rb
rhel8-baseline-stubs/controls/SV-230543.rb
rhel8-baseline-stubs/controls/SV-251714.rb
rhel8-baseline-stubs/controls/SV-230481.rb
rhel8-baseline-stubs/controls/SV-230423.rb
rhel8-baseline-stubs/controls/SV-230472.rb
rhel8-baseline-stubs/controls/SV-230532.rb
rhel8-baseline-stubs/controls/SV-230506.rb
rhel8-baseline-stubs/controls/SV-230446.rb
rhel8-baseline-stubs/controls/SV-230557.rb
rhel8-baseline-stubs/controls/SV-230359.rb
rhel8-baseline-stubs/controls/SV-230248.rb
rhel8-baseline-stubs/controls/SV-244540.rb
rhel8-baseline-stubs/controls/SV-230308.rb
rhel8-baseline-stubs/controls/SV-244525.rb
rhel8-baseline-stubs/controls/SV-250316.rb
rhel8-baseline-stubs/controls/SV-244535.rb
rhel8-baseline-stubs/controls/SV-230318.rb
rhel8-baseline-stubs/controls/SV-230258.rb
rhel8-baseline-stubs/controls/SV-244550.rb
rhel8-baseline-stubs/controls/SV-230349.rb
rhel8-baseline-stubs/controls/SV-230407.rb
rhel8-baseline-stubs/controls/SV-230547.rb
rhel8-baseline-stubs/controls/SV-230456.rb
rhel8-baseline-stubs/controls/SV-230516.rb
rhel8-baseline-stubs/controls/SV-251710.rb
rhel8-baseline-stubs/controls/SV-230522.rb
rhel8-baseline-stubs/controls/SV-230462.rb
rhel8-baseline-stubs/controls/SV-230433.rb
rhel8-baseline-stubs/controls/SV-230491.rb
rhel8-baseline-stubs/controls/SV-230480.rb
rhel8-baseline-stubs/controls/SV-230422.rb
rhel8-baseline-stubs/controls/SV-230473.rb
rhel8-baseline-stubs/controls/SV-230533.rb
rhel8-baseline-stubs/controls/SV-230507.rb
rhel8-baseline-stubs/controls/SV-230447.rb
rhel8-baseline-stubs/controls/SV-230556.rb
rhel8-baseline-stubs/controls/SV-230358.rb
rhel8-baseline-stubs/controls/SV-244541.rb
rhel8-baseline-stubs/controls/SV-230249.rb
rhel8-baseline-stubs/controls/SV-230309.rb
rhel8-baseline-stubs/controls/SV-244524.rb
rhel8-baseline-stubs/controls/SV-250317.rb
rhel8-baseline-stubs/controls/SV-244534.rb
rhel8-baseline-stubs/controls/SV-230319.rb
rhel8-baseline-stubs/controls/SV-244551.rb
rhel8-baseline-stubs/controls/SV-230259.rb
rhel8-baseline-stubs/controls/SV-230348.rb
rhel8-baseline-stubs/controls/SV-230406.rb
rhel8-baseline-stubs/controls/SV-230546.rb
rhel8-baseline-stubs/controls/SV-230517.rb
rhel8-baseline-stubs/controls/SV-251711.rb
rhel8-baseline-stubs/controls/SV-230523.rb
rhel8-baseline-stubs/controls/SV-230463.rb
rhel8-baseline-stubs/controls/SV-230432.rb
rhel8-baseline-stubs/controls/SV-230552.rb
rhel8-baseline-stubs/controls/SV-230412.rb
rhel8-baseline-stubs/controls/SV-230503.rb
rhel8-baseline-stubs/controls/SV-230484.rb
rhel8-baseline-stubs/controls/SV-230477.rb
rhel8-baseline-stubs/controls/SV-230537.rb
rhel8-baseline-stubs/controls/SV-230426.rb
rhel8-baseline-stubs/controls/SV-230368.rb
rhel8-baseline-stubs/controls/SV-230228.rb
rhel8-baseline-stubs/controls/SV-230339.rb
rhel8-baseline-stubs/controls/SV-230279.rb
rhel8-baseline-stubs/controls/SV-244545.rb
rhel8-baseline-stubs/controls/SV-230269.rb
rhel8-baseline-stubs/controls/SV-230329.rb
rhel8-baseline-stubs/controls/SV-230238.rb
rhel8-baseline-stubs/controls/SV-244530.rb
rhel8-baseline-stubs/controls/SV-230378.rb
rhel8-baseline-stubs/controls/SV-230436.rb
rhel8-baseline-stubs/controls/SV-230527.rb
rhel8-baseline-stubs/controls/SV-230467.rb
rhel8-baseline-stubs/controls/SV-230494.rb
rhel8-baseline-stubs/controls/SV-230513.rb
rhel8-baseline-stubs/controls/SV-230402.rb
rhel8-baseline-stubs/controls/SV-230542.rb
rhel8-baseline-stubs/controls/SV-251715.rb
rhel8-baseline-stubs/controls/SV-230470.rb
rhel8-baseline-stubs/controls/SV-230530.rb
rhel8-baseline-stubs/controls/SV-230421.rb
rhel8-baseline-stubs/controls/SV-230561.rb
rhel8-baseline-stubs/controls/SV-230483.rb
rhel8-baseline-stubs/controls/SV-230555.rb
rhel8-baseline-stubs/controls/SV-230504.rb
rhel8-baseline-stubs/controls/SV-230444.rb
rhel8-baseline-stubs/controls/SV-244542.rb
rhel8-baseline-stubs/controls/SV-244527.rb
rhel8-baseline-stubs/controls/SV-244537.rb
rhel8-baseline-stubs/controls/SV-244552.rb
rhel8-baseline-stubs/controls/SV-251712.rb
rhel8-baseline-stubs/controls/SV-230514.rb
rhel8-baseline-stubs/controls/SV-230405.rb
rhel8-baseline-stubs/controls/SV-230545.rb
rhel8-baseline-stubs/controls/SV-230493.rb
rhel8-baseline-stubs/controls/SV-230431.rb
rhel8-baseline-stubs/controls/SV-230520.rb
rhel8-baseline-stubs/controls/SV-230500.rb
rhel8-baseline-stubs/controls/SV-230551.rb
rhel8-baseline-stubs/controls/SV-230411.rb
rhel8-baseline-stubs/controls/SV-251706.rb
rhel8-baseline-stubs/controls/SV-230425.rb
rhel8-baseline-stubs/controls/SV-230474.rb
rhel8-baseline-stubs/controls/SV-230534.rb
rhel8-baseline-stubs/controls/SV-230487.rb
rhel8-baseline-stubs/controls/SV-230398.rb
rhel8-baseline-stubs/controls/SV-230289.rb
rhel8-baseline-stubs/controls/SV-244523.rb
rhel8-baseline-stubs/controls/SV-244546.rb
rhel8-baseline-stubs/controls/SV-244533.rb
rhel8-baseline-stubs/controls/SV-230299.rb
rhel8-baseline-stubs/controls/SV-230388.rb
rhel8-baseline-stubs/controls/SV-230497.rb
rhel8-baseline-stubs/controls/SV-230524.rb
rhel8-baseline-stubs/controls/SV-230464.rb
rhel8-baseline-stubs/controls/SV-230435.rb
rhel8-baseline-stubs/controls/SV-251716.rb
rhel8-baseline-stubs/controls/SV-230401.rb
rhel8-baseline-stubs/controls/SV-230541.rb
rhel8-baseline-stubs/controls/SV-230510.rb
rhel8-baseline-stubs/controls/SV-230550.rb
rhel8-baseline-stubs/controls/SV-230410.rb
rhel8-baseline-stubs/controls/SV-251707.rb
rhel8-baseline-stubs/controls/SV-230424.rb
rhel8-baseline-stubs/controls/SV-230475.rb
rhel8-baseline-stubs/controls/SV-230535.rb
rhel8-baseline-stubs/controls/SV-230486.rb
rhel8-baseline-stubs/controls/SV-230399.rb
rhel8-baseline-stubs/controls/SV-230288.rb
rhel8-baseline-stubs/controls/SV-244522.rb
rhel8-baseline-stubs/controls/SV-244547.rb
rhel8-baseline-stubs/controls/SV-244532.rb
rhel8-baseline-stubs/controls/SV-230298.rb
rhel8-baseline-stubs/controls/SV-230389.rb
rhel8-baseline-stubs/controls/SV-230496.rb
rhel8-baseline-stubs/controls/SV-230525.rb
rhel8-baseline-stubs/controls/SV-230465.rb
rhel8-baseline-stubs/controls/SV-230434.rb
rhel8-baseline-stubs/controls/SV-251717.rb
rhel8-baseline-stubs/controls/SV-230400.rb
rhel8-baseline-stubs/controls/SV-230540.rb
rhel8-baseline-stubs/controls/SV-230511.rb
rhel8-baseline-stubs/controls/SV-230471.rb
rhel8-baseline-stubs/controls/SV-230531.rb
rhel8-baseline-stubs/controls/SV-230560.rb
rhel8-baseline-stubs/controls/SV-230482.rb
rhel8-baseline-stubs/controls/SV-230554.rb
rhel8-baseline-stubs/controls/SV-230505.rb
rhel8-baseline-stubs/controls/SV-244543.rb
rhel8-baseline-stubs/controls/SV-250315.rb
rhel8-baseline-stubs/controls/SV-244526.rb
rhel8-baseline-stubs/controls/SV-244536.rb
rhel8-baseline-stubs/controls/SV-244553.rb
rhel8-baseline-stubs/controls/SV-251713.rb
rhel8-baseline-stubs/controls/SV-230455.rb
rhel8-baseline-stubs/controls/SV-230515.rb
rhel8-baseline-stubs/controls/SV-230404.rb
rhel8-baseline-stubs/controls/SV-230544.rb
rhel8-baseline-stubs/controls/SV-230492.rb
rhel8-baseline-stubs/controls/SV-230430.rb
rhel8-baseline-stubs/controls/SV-230521.rb
rhel8-baseline-stubs/controls/SV-244548.rb
rhel8-baseline-stubs/controls/SV-230240.rb
rhel8-baseline-stubs/controls/SV-230300.rb
rhel8-baseline-stubs/controls/SV-244519.rb
rhel8-baseline-stubs/controls/SV-230351.rb
rhel8-baseline-stubs/controls/SV-230365.rb
rhel8-baseline-stubs/controls/SV-230225.rb
rhel8-baseline-stubs/controls/SV-230334.rb
rhel8-baseline-stubs/controls/SV-230274.rb
rhel8-baseline-stubs/controls/SV-230287.rb
rhel8-baseline-stubs/controls/SV-230396.rb
rhel8-baseline-stubs/controls/SV-230489.rb
rhel8-baseline-stubs/controls/SV-251708.rb
rhel8-baseline-stubs/controls/SV-251718.rb
rhel8-baseline-stubs/controls/SV-230499.rb
rhel8-baseline-stubs/controls/SV-230386.rb
rhel8-baseline-stubs/controls/SV-230264.rb
rhel8-baseline-stubs/controls/SV-230324.rb
rhel8-baseline-stubs/controls/SV-230235.rb
rhel8-baseline-stubs/controls/SV-230375.rb
rhel8-baseline-stubs/controls/SV-237643.rb
rhel8-baseline-stubs/controls/SV-230341.rb
rhel8-baseline-stubs/controls/SV-230310.rb
rhel8-baseline-stubs/controls/SV-230250.rb
rhel8-baseline-stubs/controls/SV-230330.rb
rhel8-baseline-stubs/controls/SV-230270.rb
rhel8-baseline-stubs/controls/SV-230361.rb
rhel8-baseline-stubs/controls/SV-230221.rb
rhel8-baseline-stubs/controls/SV-244529.rb
rhel8-baseline-stubs/controls/SV-230392.rb
rhel8-baseline-stubs/controls/SV-230283.rb
rhel8-baseline-stubs/controls/SV-230355.rb
rhel8-baseline-stubs/controls/SV-230244.rb
rhel8-baseline-stubs/controls/SV-230304.rb
rhel8-baseline-stubs/controls/SV-230314.rb
rhel8-baseline-stubs/controls/SV-230254.rb
rhel8-baseline-stubs/controls/SV-230345.rb
rhel8-baseline-stubs/controls/SV-230293.rb
rhel8-baseline-stubs/controls/SV-230382.rb
rhel8-baseline-stubs/controls/SV-230231.rb
rhel8-baseline-stubs/controls/SV-244539.rb
rhel8-baseline-stubs/controls/SV-230371.rb
rhel8-baseline-stubs/controls/SV-230260.rb
rhel8-baseline-stubs/controls/SV-230320.rb
rhel8-baseline-stubs/controls/SV-230331.rb
rhel8-baseline-stubs/controls/SV-230271.rb
rhel8-baseline-stubs/controls/SV-230360.rb
rhel8-baseline-stubs/controls/SV-244528.rb
rhel8-baseline-stubs/controls/SV-230393.rb
rhel8-baseline-stubs/controls/SV-230282.rb
rhel8-baseline-stubs/controls/SV-230354.rb
rhel8-baseline-stubs/controls/SV-230245.rb
rhel8-baseline-stubs/controls/SV-230305.rb
rhel8-baseline-stubs/controls/SV-230315.rb
rhel8-baseline-stubs/controls/SV-230255.rb
rhel8-baseline-stubs/controls/SV-230344.rb
rhel8-baseline-stubs/controls/SV-230292.rb
rhel8-baseline-stubs/controls/SV-230383.rb
rhel8-baseline-stubs/controls/SV-244538.rb
rhel8-baseline-stubs/controls/SV-230230.rb
rhel8-baseline-stubs/controls/SV-230370.rb
rhel8-baseline-stubs/controls/SV-230261.rb
rhel8-baseline-stubs/controls/SV-230321.rb
rhel8-baseline-stubs/controls/SV-230241.rb
rhel8-baseline-stubs/controls/SV-244549.rb
rhel8-baseline-stubs/controls/SV-230301.rb
rhel8-baseline-stubs/controls/SV-230350.rb
rhel8-baseline-stubs/controls/SV-230364.rb
rhel8-baseline-stubs/controls/SV-230224.rb
rhel8-baseline-stubs/controls/SV-230335.rb
rhel8-baseline-stubs/controls/SV-230275.rb
rhel8-baseline-stubs/controls/SV-230286.rb
rhel8-baseline-stubs/controls/SV-230397.rb
rhel8-baseline-stubs/controls/SV-230488.rb
rhel8-baseline-stubs/controls/SV-251709.rb
rhel8-baseline-stubs/controls/SV-230498.rb
rhel8-baseline-stubs/controls/SV-230387.rb
rhel8-baseline-stubs/controls/SV-230296.rb
rhel8-baseline-stubs/controls/SV-230265.rb
rhel8-baseline-stubs/controls/SV-230325.rb
rhel8-baseline-stubs/controls/SV-230234.rb
rhel8-baseline-stubs/controls/SV-230374.rb
rhel8-baseline-stubs/controls/SV-237642.rb
rhel8-baseline-stubs/controls/SV-230340.rb
rhel8-baseline-stubs/controls/SV-230311.rb
rhel8-baseline-stubs/controls/SV-230251.rb
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></template>
</CodeTabs>
<h3 id="example-stub-control-sv-230502" tabindex="-1"><a class="header-anchor" href="#example-stub-control-sv-230502" aria-hidden="true">#</a> Example 'Stub' Control SV-230502</h3>
<p>Let's take a look at one of the stub InSpec controls created by the <code v-pre>saf generate xccdf_benchmark2inspec_stub</code> command and the completed InSpec control.</p>
<CodeTabs id="89" :data='[{"id":"Stub Generated InSpec Control"},{"id":"Completed InSpec Control"}]' tab-id="shell">
<template #title0="{ value, isActive }">Stub Generated InSpec Control</template>
<template #title1="{ value, isActive }">Completed InSpec Control</template>
<template #tab0="{ value, isActive }">
<div class="language-ruby line-numbers-mode" data-ext="rb"><pre v-pre class="language-ruby"><code>control <span class="token string-literal"><span class="token string">'SV-230502'</span></span> <span class="token keyword">do</span>
  title <span class="token string-literal"><span class="token string">'The RHEL 8 file system automounter must be disabled unless required.'</span></span>
  desc  "Automatically mounting file systems permits easy introduction of
unknown devices<span class="token punctuation">,</span> thereby facilitating malicious activity<span class="token punctuation">.</span>"
  desc  <span class="token string-literal"><span class="token string">'rationale'</span></span><span class="token punctuation">,</span> <span class="token string-literal"><span class="token string">''</span></span>
  desc  <span class="token string-literal"><span class="token string">'check'</span></span><span class="token punctuation">,</span> "
    Verify the operating system disables the ability to automount devices<span class="token punctuation">.</span>

    Check to see <span class="token keyword">if</span> automounter service is active with the following command<span class="token operator">:</span>

    <span class="token symbol">Note</span><span class="token operator">:</span> If the autofs service is <span class="token keyword">not</span> installed<span class="token punctuation">,</span> this requirement is <span class="token keyword">not</span>
applicable<span class="token punctuation">.</span>

    $ sudo systemctl status autofs

    autofs<span class="token punctuation">.</span>service <span class="token operator">-</span> Automounts filesystems on demand
    <span class="token symbol">Loaded</span><span class="token operator">:</span> loaded <span class="token punctuation">(</span><span class="token operator">/</span>usr<span class="token operator">/</span>lib<span class="token operator">/</span>systemd<span class="token operator">/</span>system<span class="token operator">/</span>autofs<span class="token punctuation">.</span>service<span class="token punctuation">;</span> disabled<span class="token punctuation">)</span>
    <span class="token symbol">Active</span><span class="token operator">:</span> inactive <span class="token punctuation">(</span>dead<span class="token punctuation">)</span>

    If the \"autofs\" status is set to \"active\" <span class="token keyword">and</span> is <span class="token keyword">not</span> documented with
the Information System Security Officer <span class="token punctuation">(</span><span class="token constant">ISSO</span><span class="token punctuation">)</span> as an operational requirement<span class="token punctuation">,</span>
this is a finding<span class="token punctuation">.</span>
  "
  desc <span class="token string-literal"><span class="token string">'fix'</span></span><span class="token punctuation">,</span> "
    Configure the operating system to disable the ability to automount devices<span class="token punctuation">.</span>

    Turn off the automount service with the following commands<span class="token operator">:</span>

    $ sudo systemctl stop autofs
    $ sudo systemctl disable autofs

    If \"autofs\" is required <span class="token keyword">for</span> Network <span class="token builtin">File</span> System <span class="token punctuation">(</span><span class="token constant">NFS</span><span class="token punctuation">)</span><span class="token punctuation">,</span> it must be
documented with the <span class="token constant">ISSO</span><span class="token punctuation">.</span>
  "
  impact <span class="token number">0.5</span>
  tag severity<span class="token operator">:</span> <span class="token string-literal"><span class="token string">'medium'</span></span>
  tag gtitle<span class="token operator">:</span> <span class="token string-literal"><span class="token string">'SRG-OS-000114-GPOS-00059'</span></span>
  tag gid<span class="token operator">:</span> <span class="token string-literal"><span class="token string">'V-230502'</span></span>
  tag rid<span class="token operator">:</span> <span class="token string-literal"><span class="token string">'SV-230502r627750_rule'</span></span>
  tag stig_id<span class="token operator">:</span> <span class="token string-literal"><span class="token string">'RHEL-08-040070'</span></span>
  tag fix_id<span class="token operator">:</span> <span class="token string-literal"><span class="token string">'F-33146r568253_fix'</span></span>
  tag cci<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string-literal"><span class="token string">'CCI-000778'</span></span><span class="token punctuation">]</span>
  tag nist<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string-literal"><span class="token string">'IA-3'</span></span><span class="token punctuation">]</span>

  <span class="token comment"># ...add your describe blocks here ... #</span>

<span class="token keyword">end</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></template>
<template #tab1="{ value, isActive }">
<div class="language-ruby line-numbers-mode" data-ext="rb"><pre v-pre class="language-ruby"><code>control <span class="token string-literal"><span class="token string">'SV-230502'</span></span> <span class="token keyword">do</span>
  title <span class="token string-literal"><span class="token string">'The RHEL 8 file system automounter must be disabled unless required.'</span></span>
  desc  "Automatically mounting file systems permits easy introduction of
unknown devices<span class="token punctuation">,</span> thereby facilitating malicious activity<span class="token punctuation">.</span>"
  desc  <span class="token string-literal"><span class="token string">'rationale'</span></span><span class="token punctuation">,</span> <span class="token string-literal"><span class="token string">''</span></span>
  desc  <span class="token string-literal"><span class="token string">'check'</span></span><span class="token punctuation">,</span> "
    Verify the operating system disables the ability to automount devices<span class="token punctuation">.</span>

    Check to see <span class="token keyword">if</span> automounter service is active with the following command<span class="token operator">:</span>

    <span class="token symbol">Note</span><span class="token operator">:</span> If the autofs service is <span class="token keyword">not</span> installed<span class="token punctuation">,</span> this requirement is <span class="token keyword">not</span>
applicable<span class="token punctuation">.</span>

    $ sudo systemctl status autofs

    autofs<span class="token punctuation">.</span>service <span class="token operator">-</span> Automounts filesystems on demand
    <span class="token symbol">Loaded</span><span class="token operator">:</span> loaded <span class="token punctuation">(</span><span class="token operator">/</span>usr<span class="token operator">/</span>lib<span class="token operator">/</span>systemd<span class="token operator">/</span>system<span class="token operator">/</span>autofs<span class="token punctuation">.</span>service<span class="token punctuation">;</span> disabled<span class="token punctuation">)</span>
    <span class="token symbol">Active</span><span class="token operator">:</span> inactive <span class="token punctuation">(</span>dead<span class="token punctuation">)</span>

    If the \"autofs\" status is set to \"active\" <span class="token keyword">and</span> is <span class="token keyword">not</span> documented with
the Information System Security Officer <span class="token punctuation">(</span><span class="token constant">ISSO</span><span class="token punctuation">)</span> as an operational requirement<span class="token punctuation">,</span>
this is a finding<span class="token punctuation">.</span>
  "
  desc <span class="token string-literal"><span class="token string">'fix'</span></span><span class="token punctuation">,</span> "
    Configure the operating system to disable the ability to automount devices<span class="token punctuation">.</span>

    Turn off the automount service with the following commands<span class="token operator">:</span>

    $ sudo systemctl stop autofs
    $ sudo systemctl disable autofs

    If \"autofs\" is required <span class="token keyword">for</span> Network <span class="token builtin">File</span> System <span class="token punctuation">(</span><span class="token constant">NFS</span><span class="token punctuation">)</span><span class="token punctuation">,</span> it must be
documented with the <span class="token constant">ISSO</span><span class="token punctuation">.</span>
  "
  impact <span class="token number">0.5</span>
  tag severity<span class="token operator">:</span> <span class="token string-literal"><span class="token string">'medium'</span></span>
  tag gtitle<span class="token operator">:</span> <span class="token string-literal"><span class="token string">'SRG-OS-000114-GPOS-00059'</span></span>
  tag gid<span class="token operator">:</span> <span class="token string-literal"><span class="token string">'V-230502'</span></span>
  tag rid<span class="token operator">:</span> <span class="token string-literal"><span class="token string">'SV-230502r627750_rule'</span></span>
  tag stig_id<span class="token operator">:</span> <span class="token string-literal"><span class="token string">'RHEL-08-040070'</span></span>
  tag fix_id<span class="token operator">:</span> <span class="token string-literal"><span class="token string">'F-33146r568253_fix'</span></span>
  tag cci<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string-literal"><span class="token string">'CCI-000778'</span></span><span class="token punctuation">]</span>
  tag nist<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string-literal"><span class="token string">'IA-3'</span></span><span class="token punctuation">]</span>

  <span class="token keyword">if</span> virtualization<span class="token punctuation">.</span>system<span class="token punctuation">.</span>eql<span class="token operator">?</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'docker'</span></span><span class="token punctuation">)</span>
    impact <span class="token number">0.0</span>
    describe <span class="token string-literal"><span class="token string">"Control not applicable within a container"</span></span> <span class="token keyword">do</span>
      skip <span class="token string-literal"><span class="token string">"Control not applicable within a container"</span></span>
    <span class="token keyword">end</span>
  <span class="token keyword">else</span>
    <span class="token keyword">if</span> package<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'autofs'</span></span><span class="token punctuation">)</span><span class="token punctuation">.</span>installed<span class="token operator">?</span>
      describe systemd_service<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'autofs.service'</span></span><span class="token punctuation">)</span> <span class="token keyword">do</span>
        it <span class="token punctuation">{</span> should_not be_running <span class="token punctuation">}</span>
        it <span class="token punctuation">{</span> should_not be_enabled <span class="token punctuation">}</span>
        it <span class="token punctuation">{</span> should_not be_installed <span class="token punctuation">}</span>
      <span class="token keyword">end</span>
    <span class="token keyword">else</span>
      impact <span class="token number">0.0</span>
      describe <span class="token string-literal"><span class="token string">'The autofs service is not installed'</span></span> <span class="token keyword">do</span>
        skip <span class="token string-literal"><span class="token string">'The autofs service is not installed, this control is Not Applicable.'</span></span>
      <span class="token keyword">end</span>
    <span class="token keyword">end</span>
  <span class="token keyword">end</span>
<span class="token keyword">end</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></template>
</CodeTabs>
<div class="hint-container warning">
<p class="hint-container-title">Where did the metadata tags come from?</p>
<p>From the structured data inside the published STIG document's XCCDF XML file. The <code v-pre>saf generate</code> tool simply reformats it into an InSpec control.</p>
</div>
<div class="hint-container warning">
<p class="hint-container-title">Where did the describe block come from?</p>
<p>From the real <a href="https://github.com/mitre/redhat-enterprise-linux-8-stig-baseline/blob/main/controls/SV-230502.rb" target="_blank" rel="noopener noreferrer">MITRE SAF RHEL8 InSpec profile<ExternalLinkIcon/></a>. Note that the control accounts for a few more edge cases than what we've done in this class, but it's still recognizably just a bunch of <em>entities</em> and <em>expectations</em> wrapped in <code v-pre>describe</code> blocks.</p>
</div>
<p>You may note that these InSpec controls feature a set of metadata tags -- impact, severity, and alignment back to requirements such as a NIST control family. All of that metadata was taken from the original XCCDF document that we used to create this profile; the SAF CLI automatically added it to the profile controls. These tags are the reason that tools like Heimdall can sort and display data in high fidelity. This is the benefit of using the SAF CLI to generate profiles straight off of the original benchmark documentation where possible -- tagging the controls with the requirement that they are testing means that reading a control will tell you not only <em>what</em> you are testing, but <em>why</em>!</p>
<div class="hint-container tip">
<p class="hint-container-title">STIGs</p>
<p>For more background on STIGs, see the <RouterLink to="/courses/guidance/03.html">SAF Guidance content</RouterLink>.</p>
</div>
</div></template>


