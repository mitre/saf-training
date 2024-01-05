<template><div><h2 id="_9-1-automated-validation-tests" tabindex="-1"><a class="header-anchor" href="#_9-1-automated-validation-tests" aria-hidden="true">#</a> 9.1 Automated Validation Tests</h2>
<p>Now that we have written up some Check and Fix text, it's time to use one of Vulcan's other features -- the InSpec code pane.</p>
<p>We've already used Vulcan to generate a document that has most of the metadata in place that we would need to properly label an automated validation test. Now we can go the last mile or so to a complete security test.</p>
<h3 id="_9-1-1-the-inspec-control-body" tabindex="-1"><a class="header-anchor" href="#_9-1-1-the-inspec-control-body" aria-hidden="true">#</a> 9.1.1 The InSpec Control Body</h3>
<ol>
<li>Click on the InSpec Control Body tab in the requirement window.</li>
</ol>
<figure><img src="@source/assets/img/control_body.png" alt="InSpec Control Body" tabindex="0" loading="lazy"><figcaption>InSpec Control Body</figcaption></figure>
<p>You'll see a code editing window directly in Vulcan. What we can do now is write in the test code we want to use for testing the check we just wrote.</p>
<div class="hint-container warning">
<p class="hint-container-title">Wait, what if I have no idea how to write InSpec code?!</p>
<p>Great news, we have an in-depth <RouterLink to="/courses/beginner/">training class</RouterLink> on how to do this (<RouterLink to="/courses/advanced/">two of them</RouterLink>, actually).</p>
<p>But if you don't have the time for those, don't sweat it; we just want you to know that this is something you can do with Vulcan.</p>
</div>
<ol start="2">
<li>For demonstration purposes, we'll copy in the code from the actual MITRE SAF RHEL7 STIG InSpec profile<sup class="footnote-ref"><a href="#footnote1">[1]</a><a class="footnote-anchor" id="footnote-ref1" /></sup>.</li>
</ol>
<p>That code is as follows:</p>
<div class="language-ruby line-numbers-mode" data-ext="rb"><pre v-pre class="language-ruby"><code>audit_command <span class="token operator">=</span> <span class="token string-literal"><span class="token string">'/etc/passwd'</span></span>

<span class="token keyword">if</span> virtualization<span class="token punctuation">.</span>system<span class="token punctuation">.</span>eql<span class="token operator">?</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'docker'</span></span><span class="token punctuation">)</span>
  impact <span class="token number">0.0</span>
  describe <span class="token string-literal"><span class="token string">'Control not applicable - audit config must be done on the host'</span></span> <span class="token keyword">do</span>
    skip <span class="token string-literal"><span class="token string">'Control not applicable - audit config must be done on the host'</span></span>
  <span class="token keyword">end</span>
<span class="token keyword">else</span>
  describe <span class="token string-literal"><span class="token string">'Command'</span></span> <span class="token keyword">do</span>
    it <span class="token string-literal"><span class="token string">"</span><span class="token interpolation"><span class="token delimiter punctuation">#{</span><span class="token content">audit_command</span><span class="token delimiter punctuation">}</span></span><span class="token string"> is audited properly"</span></span> <span class="token keyword">do</span>
      audit_rule <span class="token operator">=</span> auditd<span class="token punctuation">.</span>file<span class="token punctuation">(</span>audit_command<span class="token punctuation">)</span>
      expect<span class="token punctuation">(</span>audit_rule<span class="token punctuation">)</span><span class="token punctuation">.</span>to exist
      expect<span class="token punctuation">(</span>audit_rule<span class="token punctuation">.</span>key<span class="token punctuation">)</span><span class="token punctuation">.</span>to cmp <span class="token string-literal"><span class="token string">'identity'</span></span>
      expect<span class="token punctuation">(</span>audit_rule<span class="token punctuation">.</span>permissions<span class="token punctuation">.</span>flatten<span class="token punctuation">)</span><span class="token punctuation">.</span>to <span class="token keyword">include</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'w'</span></span><span class="token punctuation">,</span> <span class="token string-literal"><span class="token string">'a'</span></span><span class="token punctuation">)</span>
    <span class="token keyword">end</span>
  <span class="token keyword">end</span>
<span class="token keyword">end</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="3">
<li>Go ahead and copy that code block and paste it into the editing window.</li>
</ol>
<figure><img src="@source/assets/img/describe_block.png" alt="InSpec Control" tabindex="0" loading="lazy"><figcaption>InSpec Control</figcaption></figure>
<div class="hint-container note">
<p class="hint-container-title">Note</p>
<p>If you have taken the SAF User class, you have used <code v-pre>inspec exec</code> to run code that looks like the above against a target system.</p>
</div>
<ol start="4">
<li>
<p>Save the requirement.</p>
</li>
<li>
<p>Now check the &quot;InSpec Control (Read-Only)&quot; tab. It has used the contents of the other two tabs to assemble a completed InSpec control from your requirement, including the complete context of your STIG control as metadata tags in the test.</p>
</li>
</ol>
<figure><img src="@source/assets/img/inspec_full.png" alt="InSpec Control" tabindex="0" loading="lazy"><figcaption>InSpec Control</figcaption></figure>
<p>We can export this content and start using it immediately if we wish (we'll discuss how in a later section).</p>
<h3 id="_9-1-2-why-am-i-writing-test-code-inside-vulcan" tabindex="-1"><a class="header-anchor" href="#_9-1-2-why-am-i-writing-test-code-inside-vulcan" aria-hidden="true">#</a> 9.1.2 Why am I writing test code inside Vulcan?</h3>
<p>Vulcan includes the ability to write InSpec control code right alongside original guidance because we need a tight binding between the human-readable guidance and the machine-readable automation code.</p>
<p>Using Vulcan will ensure that all of your guidance is included in your test code as metadata (you can also do this by creating a profile stub with the <a href="https://saf-cli.mitre.org/#xccdf-benchmark-to-inspec-stub" target="_blank" rel="noopener noreferrer">SAF CLI<ExternalLinkIcon/></a>.)</p>
<p>You can think of this process as recording the pedigree of your tests into the code, so that you dont lose it as your code moves down the pipeline, and so that you <em>always know why you are running a check</em>.</p>
<p>Furthermore, another reason we added the InSpec control editing window is because in most cases, you are writing security guidance because you want to write security validation code! Recall that the whole point of Vulcan is to help us define the security posture target so that we can automate reaching it!</p>
<div class="hint-container note">
<p class="hint-container-title">Do I need to use InSpec for my ATO process?</p>
<p>DOD does not and will not require teams to use any one particlar security validation tool.</p>
<p>MITRE SAF favors InSpec because it favors our use cases nicely, but there are many different security tools on the market, some of which are better suited to particular tasks.</p>
</div>
<hr class="footnotes-sep">
<section class="footnotes">
<ol class="footnotes-list">
<li id="footnote1" class="footnote-item"><p>See the full profile code <a href="https://github.com/mitre/redhat-enterprise-linux-7-stig-baseline" target="_blank" rel="noopener noreferrer">here<ExternalLinkIcon/></a>. Or see many more examples of InSpec profiles at <a href="https://saf.mitre.org/libs/validate" target="_blank" rel="noopener noreferrer">https://saf.mitre.org/libs/validate<ExternalLinkIcon/></a>. <a href="#footnote-ref1" class="footnote-backref">↩︎</a></p>
</li>
</ol>
</section>
</div></template>


