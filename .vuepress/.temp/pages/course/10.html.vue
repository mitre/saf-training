<template><h2 id="from-stig-to-profile" tabindex="-1"><a class="header-anchor" href="#from-stig-to-profile" aria-hidden="true">#</a> From STIG to Profile</h2>
<h3 id="download-stig-requirements" tabindex="-1"><a class="header-anchor" href="#download-stig-requirements" aria-hidden="true">#</a> Download STIG Requirements</h3>
<p>Download the latest STIG Viewer located here <a href="https://public.cyber.mil/stigs/srg-stig-tools/" target="_blank" rel="noopener noreferrer">STIG Viewer<ExternalLinkIcon/></a></p>
<p><img src="@source/assets/img/Download_STIG_Viewer.png" alt="Alt text" loading="lazy"></p>
<p>Download the <code v-pre>Red Hat Enterprise Linux 8 STIG - Ver 1, Rel 5</code> located here <a href="https://public.cyber.mil/stigs/downloads/?_dl_facet_stigs=operating-systems%2Cunix-linux" target="_blank" rel="noopener noreferrer">RHEL8 STIG Download<ExternalLinkIcon/></a></p>
<p><img src="@source/assets/img/Download_STIG.png" alt="Alt text" loading="lazy"></p>
<h3 id="convert-the-stig-xccdf-benchmark-to-an-inspec-stubs-profile" tabindex="-1"><a class="header-anchor" href="#convert-the-stig-xccdf-benchmark-to-an-inspec-stubs-profile" aria-hidden="true">#</a> Convert the STIG XCCDF Benchmark To an InSpec Stubs Profile</h3>
<div class="custom-container note"><p class="custom-container-title">Timesaver Ahead!</p>
<p>We already converted the XCCDF STIG Benchmark into a starter profile using the <code v-pre>saf generate xccdf2inspec_stub</code> command using the correct flags, mapping file and other options.</p>
</div>
<p>The SAF CLI has the <code v-pre>generate xccdf2inspec_stub</code> sub-command which can help you quickly convert an XCCDF Benchmark document into the start of an InSpec Profile.</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>XCCDF to InSpec Stub
generate xccdf2inspec_stub              Generate an InSpec profile stub from a DISA STIG XCCDF XML <span class="token function">file</span>

  USAGE
    $ saf generate xccdf2inspec_stub -i, --input<span class="token operator">=</span>XML -o, --output<span class="token operator">=</span>FOLDER

  OPTIONS
    -S, --useStigID              Use STIG IDs <span class="token punctuation">(</span><span class="token operator">&lt;</span>Group/Rule/Version<span class="token operator">></span><span class="token punctuation">)</span> instead of Group IDs <span class="token punctuation">(</span>ex. <span class="token string">'V-XXXXX'</span><span class="token punctuation">)</span> <span class="token keyword">for</span> InSpec Control IDs
    -i, --input<span class="token operator">=</span>input            <span class="token punctuation">(</span>required<span class="token punctuation">)</span> Path to the DISA STIG XCCDF <span class="token function">file</span>
    -l, --lineLength<span class="token operator">=</span>lineLength  <span class="token punctuation">[</span>default: <span class="token number">80</span><span class="token punctuation">]</span> Characters between lines within InSpec controls
    -e, --encodingHeader         Add the <span class="token string">"# encoding: UTF-8"</span> comment at the <span class="token function">top</span> of each control
    -m, --metadata<span class="token operator">=</span>metadata      Path to a JSON <span class="token function">file</span> with additional metadata <span class="token keyword">for</span> the inspec.yml <span class="token function">file</span>
    -o, --output<span class="token operator">=</span>output          <span class="token punctuation">(</span>required<span class="token punctuation">)</span> <span class="token punctuation">[</span>default: profile<span class="token punctuation">]</span>
    -r, --useVulnerabilityId     Use Vulnerability IDs <span class="token punctuation">(</span>ex. <span class="token string">'SV-XXXXX'</span><span class="token punctuation">)</span> instead of Group IDs <span class="token punctuation">(</span>ex. <span class="token string">'V-XXXXX'</span><span class="token punctuation">)</span> <span class="token keyword">for</span> InSpec control IDs
    -s, --singleFile             Output the resulting controls as a single <span class="token function">file</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>To learn how you can use the <code v-pre>saf generate xccdf2stub</code>, go to the saf-cli homepage which has all the options and capabilities as well as all the other utilities provided by the saf-cli, at <a href="https://saf-cli.mitre.org/#generate" target="_blank" rel="noopener noreferrer">https://saf-cli.mitre.org/#generate<ExternalLinkIcon/></a>.</p>
<h3 id="example-stub-control-sv-230502" tabindex="-1"><a class="header-anchor" href="#example-stub-control-sv-230502" aria-hidden="true">#</a> Example 'Stub' Control SV-230502</h3>
<p>Let's take a look at what one of the <code v-pre>stubs</code> created by the <code v-pre>saf-cli generate xccdf2stub</code> command:</p>
<div class="language-ruby ext-rb line-numbers-mode"><pre v-pre class="language-ruby"><code>control <span class="token string-literal"><span class="token string">'SV-230502'</span></span> <span class="token keyword">do</span>
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="completed-sv-230502-control" tabindex="-1"><a class="header-anchor" href="#completed-sv-230502-control" aria-hidden="true">#</a> Completed SV-230502 Control</h3>
<p>Let's take a look at how we would write the InSpec control for SV-230502:</p>
<div class="language-ruby ext-rb line-numbers-mode"><pre v-pre class="language-ruby"><code>control <span class="token string-literal"><span class="token string">'SV-230502'</span></span> <span class="token keyword">do</span>
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
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="getting-started-on-the-rhel8-baseline" tabindex="-1"><a class="header-anchor" href="#getting-started-on-the-rhel8-baseline" aria-hidden="true">#</a> Getting Started on the RHEL8 Baseline</h3>
<h4 id="controls-we-will-demonstrate" tabindex="-1"><a class="header-anchor" href="#controls-we-will-demonstrate" aria-hidden="true">#</a> Controls We Will Demonstrate</h4>
<ul>
<li>SV-230324 &lt;---login_defs resource</li>
<li>SV-230250 &lt;---directory resource</li>
<li>SV-230243 &lt;---directory looping &amp; file resource</li>
<li>SV-230505 &lt;---non applicable use case &amp; package resource</li>
</ul>
<h4 id="suggested-level-1-controls" tabindex="-1"><a class="header-anchor" href="#suggested-level-1-controls" aria-hidden="true">#</a> Suggested Level 1 Controls</h4>
<ul>
<li>SV-230383 &lt;---login_defs resource</li>
<li>SV-230249 &lt;---directory resource</li>
<li>SV-230242 &lt;---directory looping &amp; file resource</li>
<li>SV-230241 &lt;---non applicable use case &amp; package resource</li>
</ul>
<h4 id="suggested-level-2-controls" tabindex="-1"><a class="header-anchor" href="#suggested-level-2-controls" aria-hidden="true">#</a> Suggested Level 2 Controls</h4>
<ul>
<li>SV-230281 &lt;---parse config file</li>
<li>SV-230365 &lt;---login_defs resource</li>
<li>SV-230264 &lt;---file content</li>
</ul>
<h4 id="suggested-inspec-resources-to-review" tabindex="-1"><a class="header-anchor" href="#suggested-inspec-resources-to-review" aria-hidden="true">#</a> Suggested InSpec Resources to Review</h4>
<ul>
<li><a href="https://www.inspec.io/docs/reference/resources/command/" target="_blank" rel="noopener noreferrer">command<ExternalLinkIcon/></a></li>
<li><a href="https://www.inspec.io/docs/reference/resources/file/" target="_blank" rel="noopener noreferrer">file<ExternalLinkIcon/></a></li>
<li><a href="https://www.inspec.io/docs/reference/resources/directory/" target="_blank" rel="noopener noreferrer">directory<ExternalLinkIcon/></a></li>
<li><a href="https://www.inspec.io/docs/reference/resources/parse_config_file/" target="_blank" rel="noopener noreferrer">parse_config_file<ExternalLinkIcon/></a></li>
<li><a href="https://www.inspec.io/docs/reference/resources/package/" target="_blank" rel="noopener noreferrer">package<ExternalLinkIcon/></a></li>
<li><a href="https://docs.chef.io/inspec/resources/login_defs/" target="_blank" rel="noopener noreferrer">login_defs<ExternalLinkIcon/></a></li>
</ul>
<h3 id="completed-rhel8-profile-for-reference" tabindex="-1"><a class="header-anchor" href="#completed-rhel8-profile-for-reference" aria-hidden="true">#</a> Completed RHEL8 Profile for Reference</h3>
<p>Below is the url to the completed RHEL8 Inspec Profile for reference, and a few things to take note of.</p>
<ol>
<li><a href="https://github.com/CMSgov/redhat-enterprise-linux-8-stig-baseline" target="_blank" rel="noopener noreferrer">redhat-enterprise-linux-8-stig-baseline<ExternalLinkIcon/></a></li>
</ol>
<div class="custom-container tip"><p class="custom-container-title">Key Elements in this Profile</p>
<ul>
<li>The use of <code v-pre>impact 0</code> for NA &amp; Container Aware Controls</li>
<li>How we make the controls <code v-pre>container aware</code>, and</li>
<li>The <code v-pre>fail fast</code> approach to testing execution.</li>
</ul>
</div>
</template>
