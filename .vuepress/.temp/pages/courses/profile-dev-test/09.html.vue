<template><div><p>When updating the profile, you'll be making one of three types of changes:</p>
<ol>
<li><strong>Patch Update:</strong> These frequent updates cover missing corner cases of testing for one or more benchmark requirements, or improvements to the InSpec code for a requirement. These updates result in a new patch release of the benchmark, such as going from <code v-pre>v1.12.4</code> to <code v-pre>v1.12.5</code>. We aim to release these updates on a regular schedule, either weekly, bi-weekly, or monthly.</li>
<li><strong>Release Update:</strong> These updates occur when the STIG Benchmark owner releases an updated version of the STIG, for example, going from Red Hat Enterprise Linux V1R12 to V1R13.</li>
<li><strong>Major Version Update:</strong> These updates occur when a software vendor releases a new major version of their product's STIG. For example, when Red Hat releases version 9 of Red Hat Enterprise Linux or Microsoft releases a new major version of Windows, such as Windows 2024 or Windows 12.</li>
</ol>
<h3 id="scope-of-the-update-patterns" tabindex="-1"><a class="header-anchor" href="#scope-of-the-update-patterns" aria-hidden="true">#</a> Scope of the Update Patterns</h3>
<p>The STIGs and CIS Benchmarks are scoped within the Major Version of the software products they represent.</p>
<p>Updates or amendments to a Benchmark's requirements are tracked within the 'Releases' of the Benchmark.</p>
<p>As we mentioned in the previous section, <em><strong>there is no concept of 'back-patching'</strong></em>; it is a <em><strong>'forward-only'</strong></em> process.</p>
<p>Each requirement is indexed from their source SRG document, aligned to a CCI, and then given a unique <code v-pre>Rule ID</code> and <code v-pre>STIG ID</code> in the respective XCCDF Benchmark document.</p>
<p>Here is an example of various indices you may recognize:</p>
<div class="language-ruby line-numbers-mode" data-ext="rb"><pre v-pre class="language-ruby"><code>tag gtitle<span class="token operator">:</span> <span class="token string-literal"><span class="token string">'SRG-OS-000480-GPOS-00227'</span></span>
tag gid<span class="token operator">:</span> <span class="token string-literal"><span class="token string">'V-230221'</span></span>
tag rid<span class="token operator">:</span> <span class="token string-literal"><span class="token string">'SV-230221r858734_rule'</span></span>
tag stig_id<span class="token operator">:</span> <span class="token string-literal"><span class="token string">'RHEL-08-010000'</span></span>
tag fix_id<span class="token operator">:</span> <span class="token string-literal"><span class="token string">'F-32865r567410_fix'</span></span>
tag cci<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string-literal"><span class="token string">'CCI-000366'</span></span><span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


