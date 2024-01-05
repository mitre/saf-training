<template><div><h2 id="_8-1-check-and-fix" tabindex="-1"><a class="header-anchor" href="#_8-1-check-and-fix" aria-hidden="true">#</a> 8.1 Check and Fix</h2>
<p>Let's go back to our requirement for earlier that we said was &quot;Applicable - Configurable.&quot; It's time to fill it out completely.</p>
<p>The Check and Fix fields are the ones that acually tell the user:</p>
<ol>
<li>How to determine if a piece of software is compliant with the requirement, and</li>
<li>How to bring it into compliance if it isn't already.</li>
</ol>
<p>As such, these fields represent the bulk of what you will need to research and modify when constructing your security guidance.</p>
<p>DISA requires that STIG authors use very specific language for these sections. Again, we will leverage the official guidance<sup class="footnote-ref"><a href="#footnote1">[1]</a><a class="footnote-anchor" id="footnote-ref1" /></sup> for instructions.</p>
<h2 id="_8-2-check" tabindex="-1"><a class="header-anchor" href="#_8-2-check" aria-hidden="true">#</a> 8.2 Check</h2>
<p>Per the Vendor STIG Process Guide section 4.1.11 -</p>
<p>&quot;The Check is used to provide specific instruction on how to validate product configuration settings. It must include any information and procedures necessary for validating the configured value.</p>
<p>The Check should also state:</p>
<ul>
<li>What system privileges, if any, are necessary to perform the check.</li>
<li>Whether the check procedure requires local access or can be performed remotely.</li>
<li>Whether performing the check impacts system reliability or availability.</li>
</ul>
<p>If the vendor is leveraging third-party tools to satisfy a requirement, identify in the Check the product and the specific steps to check compliance.</p>
<p>If the product is expected to be compatible with a number of third-party tools, include in the Check general instructions that would enable a systems administrator with reasonable familiarity with the third-party tool to perform the necessary procedure.</p>
<p>For example, if the requirement is to block certain TCP ports on a firewall, a general instruction to this effect may suffice.<br>
&quot;</p>
<h3 id="_8-2-1-check-writing-style" tabindex="-1"><a class="header-anchor" href="#_8-2-1-check-writing-style" aria-hidden="true">#</a> 8.2.1 Check Writing Style</h3>
<p>&quot;Write the Check so the user can easily follow the steps to assess and determine compliance.</p>
<ul>
<li>If the check procedure is not applicable for a specific condition, state that at the top of the Check. (Refer to “Check text example” below.)</li>
<li>Do not restate the requirement in the Check.</li>
<li>Do not include steps to alter values or settings.</li>
<li>Do not use words such as “should,” shall,” or “please.”</li>
<li>Use action verbs such as “verify,” “navigate,” “identify,” “type,” “obtain,” etc.</li>
<li>Give exact steps to test compliance with the requirement.</li>
<li>For checks that require a sequence of actions, use numbered steps as shown below:
<ol>
<li>Log on to…</li>
<li>Open the…</li>
<li>Click….</li>
<li>Determine…</li>
</ol>
</li>
<li>Include a “finding” statement written as: “If….this is a finding”.</li>
</ul>
<p><strong>Check text example:</strong></p>
<pre><code>If Bluetooth connectivity is required to facilitate use of approved external devices, this is not applicable.

To determine if any hardware components for Bluetooth are loaded in the system, run the following command:

# sudo kextstat | grep -i Bluetooth

If a result is returned, this is a finding.

In some cases, determining when an item is NOT a finding might be appropriate.
</code></pre>
<p><strong>Check text example:</strong></p>
<pre><code>If the &quot;xyz&quot; parameter is set to &quot;5&quot;, this is not a finding.

When using a command to inspect the status of a host, listing example output can be helpful. The output must comply with STIG requirements unless an example of a failure is needed and is clearly explained.
</code></pre>
<p><strong>Check text example:</strong></p>
<pre><code>Find the file systems that contain the directories being exported with the following command:

# cat /etc/fstab | grep nfs
UUID=e06097bb-cfcd-437b-9e4d-a691f5662a7d    /store        nfs        rw,nosuid     0 0

If a file system found in &quot;/etc/fstab&quot; refers to NFS and does not have the &quot;nosuid&quot; option set, this is a finding.
</code></pre>
<p>&quot;</p>
<div class="hint-container note">
<p class="hint-container-title">The Finding Statement</p>
<p>We want to call out the Finding statement as particularly important. STIG content must be very clear on when exactly a misconfiguration becomes a <strong>finding,</strong> or non-compliance with the requirement.</p>
<p>Recall that a STIG is intended to be something that can be followed by someone who is not an expert in the system at hand; recall also that we want to eventually automate these checks, and as such we want to make it easier for us as well!</p>
</div>
<h2 id="_8-3-fix" tabindex="-1"><a class="header-anchor" href="#_8-3-fix" aria-hidden="true">#</a> 8.3 Fix</h2>
<p>Per the Vendor STIG Process Guide section 4.1.11 -</p>
<p>&quot;The Fix is used to provide specific instructions on how to configure the product to comply with the requirement.</p>
<p>After steps in the Fix text are implemented, the resulting system state should be the same no matter how many times the instructions are followed.&quot;</p>
<h2 id="_8-3-1-fix-writing-style" tabindex="-1"><a class="header-anchor" href="#_8-3-1-fix-writing-style" aria-hidden="true">#</a> 8.3.1 Fix Writing Style</h2>
<p>&quot;When writing the Fix content, the vendor must include all steps needed to configure the product to comply with the requirement.</p>
<ul>
<li>Do not use general language. When writing the criteria statement in the Fix text, be specific. Use the exact steps to take to bring the product into compliance with the requirement.</li>
<li>Do not restate the requirement in the Fix.</li>
<li>In the Fix procedures, do not use such words as “should,” shall,” or “please.”</li>
<li>Use action verbs such as “ensure,” “configure,” “set,” “select,” etc.</li>
<li>For Fix procedures that require a sequence of actions, use numbered steps as shown below:
<ol>
<li>Log on to…</li>
<li>Open the…</li>
<li>Click the….</li>
<li>Ensure…</li>
</ol>
</li>
<li>Do not include a finding statement in the Fix.<br>
&quot;</li>
</ul>
<h2 id="_8-4-completing-our-requirement" tabindex="-1"><a class="header-anchor" href="#_8-4-completing-our-requirement" aria-hidden="true">#</a> 8.4 Completing Our Requirement</h2>
<p>Let's go back and try this for requirement RHEL-09-000003. Right now, the requirement is only populated by the original SRG text. We need to tailor this to RHEL9.</p>
<h3 id="_8-4-1-using-other-stigs-as-reference" tabindex="-1"><a class="header-anchor" href="#_8-4-1-using-other-stigs-as-reference" aria-hidden="true">#</a> 8.4.1 Using Other STIGs as Reference</h3>
<p>Remember that STIG writing is an open-book test. We encourage authors to go back and take a look at how other authors filled out their requirements for similar systems. In fact, the best place to look for reference is usually in a prior major version of the same software. That is, the best place to start for security guidance for RHEL9 is to <em>see what they did for other RHEL versions!</em></p>
<p>Luckily, Vulcan has access to every STIG and SRG you have uploaded to the instance for cross-referencing.</p>
<ol>
<li>Click on the RHEL-09-000003 requirement again and click on the &quot;View Related Rules&quot; button on the right-hand side.</li>
</ol>
<figure><img src="@source/assets/img/view_related_rules.png" alt="Related Rules Button" tabindex="0" loading="lazy"><figcaption>Related Rules Button</figcaption></figure>
<p>You'll see a view of every requirement Vulcan can find in its content library that also refers back to the same SRG ID.</p>
<figure><img src="@source/assets/img/related_rules.png" alt="Related Rules" tabindex="0" loading="lazy"><figcaption>Related Rules</figcaption></figure>
<p>You can filter and search through this library for keywords if you like, or even restrict the results to only show content your team has written inside this Vulcan instance's Components. For now, though, we are likely interested only in the published STIGs.</p>
<ol start="2">
<li>Let's take a look at some of these RHEL7 STIG requirements. They seem promising. We can even copy them directly into the Check and Fix fields on our RHEL9 STIG requirement if we want to! Let's do that now.</li>
</ol>
<figure><img src="@source/assets/img/copying_existing_content.png" alt="Copying Existing Content" tabindex="0" loading="lazy"><figcaption>Copying Existing Content</figcaption></figure>
<div class="hint-container warning">
<p class="hint-container-title">Warning</p>
<p>The real, published RHEL9 STIG is uploaded to this Vulcan instance. For the purposes of this exercise, though, we will use an earlier version of RHEL.</p>
</div>
<p>Great! Now we have a Check and Fix field that actually have content. Note also that this content is already following STIG syntax; the commands are very direct, and the line on what counts as a finding is clearly drawn.</p>
<figure><img src="@source/assets/img/check_and_fix_updated.png" alt="Updated Check and Fix Text" tabindex="0" loading="lazy"><figcaption>Updated Check and Fix Text</figcaption></figure>
<ol start="3">
<li>Save the requirement.</li>
</ol>
<div class="hint-container warning">
<p class="hint-container-title">Is It Always This Easy?</p>
<p>Prior STIGs are always an excellent <em>starting point,</em> but new STIG content does require research and testing to ensure that guidance from the prior STIGs is still accurate for our current Component.</p>
</div>
<div class="hint-container note">
<p class="hint-container-title">The Original SRG content</p>
<p>If you scroll down in the requirement window, you can expand out the original SRG content that this STIG requirement was sourced from. This can be useful to reference if you want to make sure your Check and Fix are still addressing the SRG requirement.</p>
<figure><img src="@source/assets/img/srgcontents.png" alt="Original SRG content" tabindex="0" loading="lazy"><figcaption>Original SRG content</figcaption></figure>
</div>
<hr class="footnotes-sep">
<section class="footnotes">
<ol class="footnotes-list">
<li id="footnote1" class="footnote-item"><p>Sections 4.1.11 and 4.1.13 of the &quot;Vendor STIG Process&quot;, Version 4 Release 1. <a href="#footnote-ref1" class="footnote-backref">↩︎</a></p>
</li>
</ol>
</section>
</div></template>


