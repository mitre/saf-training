<template><div><h2 id="_7-1-editing-components" tabindex="-1"><a class="header-anchor" href="#_7-1-editing-components" aria-hidden="true">#</a> 7.1 Editing Components</h2>
<p>For your Component, you'll need to decide what requirements are appliable to your specific Component (hint: not all of them will be). Of the applicable requirements, you'll need to tailor them to give specific implementation guidance.</p>
<h2 id="_7-2-the-editing-window" tabindex="-1"><a class="header-anchor" href="#_7-2-the-editing-window" aria-hidden="true">#</a> 7.2 The Editing Window</h2>
<ol>
<li>Click the &quot;Edit Component Controls&quot; button at the top of your Vulcan window on the left hand side.</li>
</ol>
<figure><img src="@source/assets/img/edit_controls.png" alt="Edit Component Controls Button" tabindex="0" loading="lazy"><figcaption>Edit Component Controls Button</figcaption></figure>
<div class="hint-container note">
<p class="hint-container-title">Controls vs. Requirements</p>
<p>You may note that Vulcan refers to the STIG requirements as &quot;controls.&quot; A <strong>security control</strong> is an action taken by an organization <em>in order to meet a security requirement.</em></p>
<p>STIGs are technically comprised of a set of <em>requirements,</em> but each requirement's main focus is describing a control to meet that requirement (i.e. the Check and Fix content).</p>
</div>
<ol start="2">
<li>Now let's select a requirement. Let's start with RHEL-09-000003. (Normally, we'd start with number 1, but for this exercise we'll pick a simple requirement.)</li>
</ol>
<figure><img src="@source/assets/img/selecting_controls.png" alt="Selecting a Requirement" tabindex="0" loading="lazy"><figcaption>Selecting a Requirement</figcaption></figure>
<p>You'll see a view of the requirement's text fields, like the vulnerability discussion, the check text, and the fix text.</p>
<figure><img src="@source/assets/img/selected_control.png" alt="An Unedited Requirement" tabindex="0" loading="lazy"><figcaption>An Unedited Requirement</figcaption></figure>
<p>Note how all of these text fields are:</p>
<ul>
<li>Pre-populated with the underlying SRG data for the general requirement (in this case SRG-OS-000004-GPOS-00004)</li>
<li>Grayed-out and uneditable at present.</li>
</ul>
<p>We can't edit these text fields yet because we haven't yet told Vulcan if this requirement is even applicable to our Component. Let's fix that.</p>
<h2 id="_7-3-requirement-statuses" tabindex="-1"><a class="header-anchor" href="#_7-3-requirement-statuses" aria-hidden="true">#</a> 7.3 Requirement Statuses</h2>
<p>The process of tailoring SRG requirements into specific STIG controls first requires you to determine which of the following statuses applies to each requirement<sup class="footnote-ref"><a href="#footnote1">[1]</a><a class="footnote-anchor" id="footnote-ref1" /></sup>:</p>
<ul>
<li>
<p><strong>Applicable – Configurable</strong>: The product requires configuration or the application of policy settings to achieve compliance.</p>
</li>
<li>
<p><strong>Applicable – Inherently Meets</strong>: The product is compliant in its initial state and cannot be subsequently reconfigured to a noncompliant state.</p>
</li>
<li>
<p><strong>Applicable – Does Not Meet</strong>: There are no technical means to achieve compliance.</p>
</li>
<li>
<p><strong>Not Applicable</strong>: The requirement addresses a capability or use case that the product does not support.</p>
</li>
</ul>
<p>If you select any status other than &quot;Applicable - Configurable&quot; for a requirement, you'll need to fill out a few fields explaining why you did so. We'll take a look at a requirement like that in a moment.</p>
<h3 id="_7-3-1-picking-a-status" tabindex="-1"><a class="header-anchor" href="#_7-3-1-picking-a-status" aria-hidden="true">#</a> 7.3.1 Picking a Status</h3>
<p>Based on the above definitions, we can use the following workflow to determine the right status.</p>
<Mermaid id="mermaid-98" code="eJyVUctOwzAQvOcrVuVSpObQ9+NABS1BPdADRUgIenCTbWspWQfbEcrfYztOGiQQ4rizs7szs2EYBprrFBew00wXCnaYYqy5oCAWdOSnRQCgz5gZxoEprKsXJjk7pKhsHyCXPGOyXIlUyAV0rqJ+NIxGHddLOWHTmE3X91HUCezhYyo+4zOTGp7vHJPF3UrFAm7zPOWxvQAhrJySQtry2jF59jNzQ2eUSDot4RFRK8+mP9lrgQq2QruxaopYM2Ubl8nroNqa9N82ysYBu6cHkPhRcGmiIQ3sckULyErjIMsFmVbPpZiAIOBawbEgF/ZyD2F4Y1YOuq9Yq076Hhx2t6LGhg4j5suBp4xqKW0ZSmSoz5xOpsP0Nx0QMyLjKhFwKEHxLDchmGfQqaIjVO83oVt9oEwSuNz7qyN/ddxWW4OTltpxhZEvJ54y/a/axL6HN+/qvROjxPC4qo0cjGIr32RrDP3upPEw9VpmbQ81OG95mFVY5su5K1kcfAF49gIK"></Mermaid><h3 id="_7-3-2-our-first-requirement-status" tabindex="-1"><a class="header-anchor" href="#_7-3-2-our-first-requirement-status" aria-hidden="true">#</a> 7.3.2 Our First Requirement Status</h3>
<ol start="3">
<li>Let's pick a status for RHEL-09-000003. We will do this by reading the SRG requirement and determining if it applies to this particular component, and if so, if it is an innate feature of the system or not.</li>
</ol>
<p>The requirement's title is <em>&quot;The operating system must audit all account creations.&quot;</em></p>
<details class="hint-container details"><summary>Based on the title, do you think this requirement applies to RHEL9 or not? If it applies, does RHEL9 need to be configured/can it be configured to do it?</summary>
<p>This requirement does apply. RHEL9, like any other operating system, must have a functioning auditing system; no inherent aspect of RHEL would change this.</p>
<p>RHEL9, like all operating systems, has a built in auditing capability. The auditing capability is configurable (i.e. it is possible to have the system configured to <em>either</em> meet or not meet this requirement).</p>
</details>
<div class="hint-container tip">
<p class="hint-container-title">How do we know all this about the system?</p>
<p>If you are not familiar with the RHEL9 auditing system, don't worry; it's just an example we're using for the class. We promise we will not quiz you on how the <code v-pre>auditd</code> service works.</p>
<p>If you have to develop STIG content for a project, it will concern a Component that you are familiar with enough to answer these questions (or are at least in a position to research).</p>
</div>
<details class="hint-container details"><summary>Based on your decision, what status should we give this component?</summary>
<p>We would consider this requirement <strong>Applicable - Configurable.</strong> The system is capable of complying with the SRG requirement, but only if properly configured.</p>
</details>
<ol start="4">
<li>Based on our decision, let's edit the status field in the Component editing screen.</li>
</ol>
<details class="hint-container details"><summary>Changing status</summary>
<figure><img src="@source/assets/img/assigning_status.png" alt="Updating the Status on RHEL-09-000003" tabindex="0" loading="lazy"><figcaption>Updating the Status on RHEL-09-000003</figcaption></figure>
<p>Hint: Most SRG requirements wind up being applicable to Components. A handful may be either Not Applicable, Inherently Met or Inherently Not Met. We still have to check.</p>
</details>
<p>Note that once we select the status, the text fields become editable. Now we can tailor the general guidance from the SRG into specific guidance.</p>
<p>Before we do that, let's investigate a the Status field a bit more.</p>
<h3 id="_7-3-3-another-requirement-status" tabindex="-1"><a class="header-anchor" href="#_7-3-3-another-requirement-status" aria-hidden="true">#</a> 7.3.3 Another Requirement Status</h3>
<ol start="5">
<li>Let's skip ahead and pick an example with a different status. On the sidebar, click on RHEL-09-000045.</li>
</ol>
<figure><img src="@source/assets/img/inherently_met_control.png" alt="RHEL-09-000045" tabindex="0" loading="lazy"><figcaption>RHEL-09-000045</figcaption></figure>
<p>Our title here is &quot;The operating system must obscure feedback of authentication information during the authentication process to protect the information from possible exploitation/use by unauthorized individuals.&quot;</p>
<details class="hint-container details"><summary>Based on the title, do you think this requirement applies to RHEL9 or not? If it applies, does RHEL9 need to be configured/can it be configured to do it?</summary>
<p>Yes, this requirement still applies. Like most requirements, RHEL9 doesn't have any quirks that would make this requirement not apply.</p>
<p>However, you may know that RHEL (and all Linux OSes) obscure user passwords when they are entered either into the GUI or on the terminal. This behavior is baked into the RHEL source code -- there is no way for a user to configure the system to not do this.</p>
<p>As such, the status should be <strong>Applicable - Inherently Meets.</strong></p>
</details>
<ol start="6">
<li>Let's once again update the status of our requirement to match what we picked.</li>
</ol>
<details class="hint-container details"><summary>Updating Status</summary>
<figure><img src="@source/assets/img/inherently_met_control_picking_status.png" alt="RHEL-09-000045" tabindex="0" loading="lazy"><figcaption>RHEL-09-000045</figcaption></figure>
</details>
<p>Notice that this time, several of the fields in the Vulcan editing window changed.</p>
<h2 id="_7-4-mitigations-artifacts-and-justifications" tabindex="-1"><a class="header-anchor" href="#_7-4-mitigations-artifacts-and-justifications" aria-hidden="true">#</a> 7.4 Mitigations, Artifacts and Justifications</h2>
<p>If a requirement is flagged as any of Not Applicable, Inherently Met, or Inherently Not Met, then we need to offer proof that this is the case, and give the end users guidance on how to mitigate the vulnerability if the requirement cannot be met.</p>
<p>If we select any of those statuses in Vulcan, we therefore get a different set of fields to complete. We can't describe them better than DISA can, so we will refer you to the Vendor STIG guide<sup class="footnote-ref"><a href="#footnote2">[2]</a><a class="footnote-anchor" id="footnote-ref2" /></sup> for the definitions of the new fields.</p>
<h3 id="_7-4-1-mitigation" tabindex="-1"><a class="header-anchor" href="#_7-4-1-mitigation" aria-hidden="true">#</a> 7.4.1 Mitigation</h3>
<p>Per Per the Vendor STIG Process Guide section 4.1.15 -</p>
<p>&quot;The Mitigation offers a method for minimizing risk. Mitigations do not eliminate the need for the requirement.</p>
<p>The “Mitigation” field must be populated if the status of the requirement is Applicable – Does Not Meet.</p>
<p>After the mitigation, include a summary statement to address any impact to the overall risk associated with this requirement.</p>
<p>Example summary statements:</p>
<ul>
<li>With the implementation of this mitigation, the overall risk can be decreased to a CAT [II or III].</li>
<li>With the implementation of this mitigation, the overall risk is fully mitigated.</li>
<li>Although the listed mitigation is supporting the security function, it is not sufficient to reduce the residual risk of this requirement.</li>
</ul>
<p>An “Applicable – Does Not Meet” vulnerability may be fully mitigated by the application of another STIG check or by the underlying operating system. In these instances, include a statement in the Mitigation as shown in the example below.</p>
<p>Examples of risk mitigated by other STIG requirements:</p>
<ul>
<li>This requirement is fully mitigated by the Apache Server 2.4 Windows Server STIG. The Apache Web Server accounts not used by installed features (e.g., tools, utilities, specific services) must not be created and must be deleted when the Apache web server feature is uninstalled. (AS24-W1-000280)</li>
<li>This requirement is fully mitigated by the underlying operating system. (WN16-SO-000430)&quot;</li>
</ul>
<h3 id="_7-4-2-artifacts" tabindex="-1"><a class="header-anchor" href="#_7-4-2-artifacts" aria-hidden="true">#</a> 7.4.2 Artifacts</h3>
<p>Per the Vendor STIG Process Guide section 4.1.16 -</p>
<p>&quot;Populate this information for requirements that have a status of Applicable – Inherently Meets. The Artifact Description describes the artifacts or substantiating information that shows how the product inherently meets the requirement.</p>
<p>All self-certification claims must be accompanied by supporting vendor documentation, which taken as a whole, provides DISA with reasonable assurance that the particular requirement has been met.</p>
<p>This field provides citations to the documentary evidence that describe how each requirement is satisfied. Examples of artifacts include:</p>
<ul>
<li>A test report describing the test procedures used to verify compliance and corresponding results, including the specific version of tools used to test and date of test.</li>
<li>A published administrative manual or configuration guide explaining how compliance can be achieved.</li>
<li>An attestation from the product developer that the product is compliant, accompanied by a brief statement describing the technical means by which compliance is achieved.</li>
<li>Steps to verify the product cannot be configured to be out of compliance with the requirement.</li>
</ul>
<p>Note: Blogs and email messages are not sufficient documentation to support an Applicable – Inherently Meets status.&quot;</p>
<h3 id="_7-4-3-status-justification" tabindex="-1"><a class="header-anchor" href="#_7-4-3-status-justification" aria-hidden="true">#</a> 7.4.3 Status Justification</h3>
<p>Per the Vendor STIG Process Guide section 4.1.17 -</p>
<p>&quot;For requirements that have a status of Not Applicable:</p>
<ul>
<li>Explain in the Status Justification text why the requirement is not applicable.</li>
<li>The most common explanations are that the requirements concern a capability that is not present on the device (e.g., encryption of removable data storage media where the product does not support removable media) or the requirement pertains to an operational environment in which the product will not be placed (e.g., the requirement applies to classified processing when the product is intended only for unclassified applications).</li>
</ul>
<p>For requirements that have a status of Applicable – Does Not Meet:</p>
<ul>
<li>Explain in the Status Justification text what function or feature is not present.</li>
<li>If some part of the requirement is achievable, the Status Justifications should explain what part of the requirement is unmet and what is met (e.g., the system can lock an account after certain failed logon attempts, but these failures are not limited to a specific window of time).</li>
<li>If no part of the requirement can be fulfilled, note this information.</li>
<li>Describe the residual risk after any mitigation is applied.</li>
</ul>
<p>For requirements that have a status of Applicable – Inherently Meets</p>
<ul>
<li>List in the Status Justification text the specific feature of the product that supports this requirement and that cannot be changed.</li>
<li>Note the type of evidence used to establish compliance (e.g., test report, vendor documentation, or vendor attestation).&quot;</li>
</ul>
<div class="hint-container warning">
<p class="hint-container-title">What about the Vendor Comments field?</p>
<p>You may note that picking any status in Vulcan opens the Vendor Comments field for editing.</p>
<p>That field is purely stored in Vulcan and will not be included in any exports. It exists for the content authors to leave comments on the process of writing the requirement.</p>
<p>For example, an author may add their references for a control's Check or Fix text in the Vendor Comment field, since a reviewer might like to know how they arrived at their conclusions.</p>
</div>
<h3 id="_7-4-4-completing-our-requirement" tabindex="-1"><a class="header-anchor" href="#_7-4-4-completing-our-requirement" aria-hidden="true">#</a> 7.4.4 Completing Our Requirement</h3>
<p>We will not complete the Artifact field in RHEL-09-000045 because digging around in the RHEL9 source code is beyond the scope of this course.</p>
<ol start="7">
<li>However, let's be sure to enter in a Status Justification:</li>
</ol>
<p><strong>RHEL9 automatically obfuscates user passwords in the graphical user interface and at the command line interface.</strong></p>
<p>Like so:</p>
<figure><img src="@source/assets/img/justification.png" alt="Adding a Status Justification" tabindex="0" loading="lazy"><figcaption>Adding a Status Justification</figcaption></figure>
<p>Hit &quot;Save Control&quot; when finished.</p>
<figure><img src="@source/assets/img/saving_requirement.png" alt="Saving the Requirement" tabindex="0" loading="lazy"><figcaption>Saving the Requirement</figcaption></figure>
<p>You'll be asked to fill out a short description of the change you made. If you are familiar with a source code manager like Git, this process is analogous to adding a commit message when you add code to version control.</p>
<figure><img src="@source/assets/img/saving_requirement_comment.png" alt="Adding a Comment" tabindex="0" loading="lazy"><figcaption>Adding a Comment</figcaption></figure>
<h2 id="_7-5-revision-history" tabindex="-1"><a class="header-anchor" href="#_7-5-revision-history" aria-hidden="true">#</a> 7.5 Revision History</h2>
<p>Once we save edits, we will see the Revision History on the right side of the screen automatically update:</p>
<figure><img src="@source/assets/img/revision_history.png" alt="Revision History" tabindex="0" loading="lazy"><figcaption>Revision History</figcaption></figure>
<p>Clicking the &quot;Rule Was Updated&quot; button will show a before and after view of what was changed by the edit.</p>
<figure><img src="@source/assets/img/before_and_after.png" alt="Checking a Revision" tabindex="0" loading="lazy"><figcaption>Checking a Revision</figcaption></figure>
<p>You can even select changes to revert, again similar to how a source code manager lets you roll back changes.</p>
<div class="hint-container tip">
<p class="hint-container-title">Why would I revert changes?</p>
<p>Remember that writing requirements in Vulcan is intended to be done in groups. Authors can and do often disagree about how a requirement should be completed.</p>
<p>Having the ability to granularly revert edits -- and even just track what change was made, when, and by who -- is an important part of a collaborative workflow.</p>
</div>
<hr class="footnotes-sep">
<section class="footnotes">
<ol class="footnotes-list">
<li id="footnote1" class="footnote-item"><p>Definitions from Table 4-1 in DISA's Vendor STIG Process Guide. See Resources. <a href="#footnote-ref1" class="footnote-backref">↩︎</a></p>
</li>
<li id="footnote2" class="footnote-item"><p>Sections 4.1.15 through 4.1.17 of the &quot;Vendor STIG Process&quot;, Version 4 Release 1. <a href="#footnote-ref2" class="footnote-backref">↩︎</a></p>
</li>
</ol>
</section>
</div></template>


