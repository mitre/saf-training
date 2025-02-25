import{_ as l}from"./plugin-vue_export-helper-DlAUqK2U.js";import{e as u,f as n,h as o,g as t,j as i,i as c,r as a,o as p}from"./app-DjCdDQJ2.js";const h="/saf-training/assets/edit_controls-weeg8O_1.png",d="/saf-training/assets/selecting_controls-B09v1RPH.png",m="/saf-training/assets/selected_control-yiQ06YOD.png",f="/saf-training/assets/assigning_status-D9Zfl0Qa.png",g="/saf-training/assets/inherently_met_control-U9RHUymS.png",y="/saf-training/assets/inherently_met_control_picking_status-DfXxl0HS.png",b="/saf-training/assets/justification-BJmnEiI6.png",w="/saf-training/assets/saving_requirement-D9WRIx8o.png",q="/saf-training/assets/saving_requirement_comment-Dc5yMabC.png",v="/saf-training/assets/revision_history-B-ZvjjvI.png",_="/saf-training/assets/before_and_after-CW-nY4t1.png",k={},S={class:"footnotes"},R={class:"footnotes-list"},x={id:"footnote2",class:"footnote-item"};function A(I,e){const s=a("Mermaid"),r=a("RouteLink");return p(),u("div",null,[e[5]||(e[5]=n('<h2 id="_7-1-editing-components" tabindex="-1"><a class="header-anchor" href="#_7-1-editing-components"><span>7.1 Editing Components</span></a></h2><p>For your Component, you&#39;ll need to decide what requirements are applicable to your specific piece of software (hint: not all of them will be). Of the applicable requirements, you&#39;ll need to tailor them to give specific implementation guidance.</p><p>Let&#39;s practice.</p><h2 id="_7-2-the-editing-window" tabindex="-1"><a class="header-anchor" href="#_7-2-the-editing-window"><span>7.2 The Editing Window</span></a></h2><p>Click the &quot;Edit Component Controls&quot; button at the top of your Vulcan window on the left hand side.</p><figure><img src="'+h+'" alt="Edit Component Controls Button" tabindex="0" loading="lazy"><figcaption>Edit Component Controls Button</figcaption></figure><div class="hint-container note"><p class="hint-container-title">Controls vs. Requirements</p><p>You may note that Vulcan refers to the STIG requirements as &quot;controls.&quot; A <strong>security control</strong> is an action taken by an organization <em>in order to meet a security requirement.</em></p><p>STIGs are technically comprised of a set of <em>requirements,</em> but each requirement&#39;s main focus is describing a control to meet that requirement (i.e. the Check and Fix content).</p><p>Many organizations tend to conflate these terms.</p></div><p>Now let&#39;s select a requirement. On the left-hand side of the Vulcan Component view you will see a list of every single requirement Let&#39;s start with RHEL-09-000004. (Normally, we&#39;d start with number 1, but for this exercise we&#39;re picking a simple example.)</p><figure><img src="'+d+'" alt="Selecting a Requirement" tabindex="0" loading="lazy"><figcaption>Selecting a Requirement</figcaption></figure><p>You&#39;ll see a view of the requirement&#39;s text fields, like the vulnerability discussion, the check text, and the fix text.</p><figure><img src="'+m+'" alt="An Unedited Requirement" tabindex="0" loading="lazy"><figcaption>An Unedited Requirement</figcaption></figure><p>Note how all of these text fields are:</p><ul><li>Pre-populated with the underlying SRG data for the general requirement (in this case <code>SRG-OS-000021-GPOS-00005</code>)</li><li>Grayed-out and uneditable at present.</li></ul><p>We can&#39;t edit these text fields yet because we haven&#39;t yet told Vulcan if this requirement is even applicable to our Component. Let&#39;s fix that.</p><h2 id="_7-3-requirement-statuses" tabindex="-1"><a class="header-anchor" href="#_7-3-requirement-statuses"><span>7.3 Requirement Statuses</span></a></h2><p>The process of tailoring SRG requirements into specific STIG controls first requires you to determine which of the following statuses applies to each requirement<sup class="footnote-ref"><a href="#footnote1">[1]</a><a class="footnote-anchor" id="footnote-ref1"></a></sup>:</p><ul><li><p><strong>Applicable – Configurable</strong>: The product requires configuration or the application of policy settings to achieve compliance.</p></li><li><p><strong>Applicable – Inherently Meets</strong>: The product is compliant in its initial state and cannot be subsequently reconfigured to a noncompliant state.</p></li><li><p><strong>Applicable – Does Not Meet</strong>: There are no technical means to achieve compliance.</p></li><li><p><strong>Not Applicable</strong>: The requirement addresses a capability or use case that the product does not support.</p></li></ul><p>(Note that these definitions come straight from DISA&#39;s &quot;Vendor STIG Process&quot; document, so what we call &quot;Components&quot; they call &quot;products.&quot;)</p><p>If you select any status other than &quot;Applicable - Configurable&quot; for a requirement, you&#39;ll need to fill out a few fields explaining why you did so. We&#39;ll take a look at a requirement like that in a moment.</p><h3 id="_7-3-1-picking-a-status" tabindex="-1"><a class="header-anchor" href="#_7-3-1-picking-a-status"><span>7.3.1 Picking a Status</span></a></h3><p>Based on the above definitions, we can use the following workflow to determine the right status.</p>',21)),o(s,{id:"mermaid-99",code:"eJyVUctOwzAQvOcrVuXSSs2h78eBClqCeqAHipAQ6sFNtq2lZB1sRyh/j+04aZBAiOPOzu7OzIZhGGiuU1zCXjNdKNhjirHmgoJY0ImflwGAvmBmGEemsK5emeTsmKKyfYBc8ozJci1SIZfQuYkG0Sgad1wv5YRNYz7bPERRJ7CHT6n4jC9Mani5d0wWdysVS7jL85TH9gKEsHZKCmnLnmPy7Gfmli4okXRawhOiVp5Nf7I3AhXshHZj1RSxZso2rpO9oNqaDN63ysYB++dHkPhRcGmiIQ3sekULyErjIMsFmVbfpZiAIOBawakgF/bqAGF4a1YOu29Yq04GHhx1d6LGRg4j5suhp4xrKW0ZSmSoL5zOpsP0Nx0QMyLjKhFwLEHxLDchmGfQuaIjVO83oVt9oEwSuDr4q2N/ddJWW4PTltpJhZEvp54y+6/axL6HN+/qA6PE0LiqfRyNYKveRGv8/G6ksTDzUuZtCzW4aFmYV1jmy4UrWRx8AUWkAWA="}),e[6]||(e[6]=n('<h3 id="_7-3-2-our-first-requirement-status" tabindex="-1"><a class="header-anchor" href="#_7-3-2-our-first-requirement-status"><span>7.3.2 Our First Requirement Status</span></a></h3><p>Let&#39;s pick a status for RHEL-09-000004. We will do this by reading the SRG requirement and determining if it applies to this particular component, and if so, if it is an innate feature of the system or not.</p><p>The requirement&#39;s title is <em>&quot;The operating system must enforce the limit of three consecutive invalid logon attempts by a user during a 15-minute time period.&quot;</em></p><details class="hint-container details"><summary>Based on the title, do you think this requirement applies to RHEL9 or not? If it applies, does RHEL9 need to be configured/can it be configured to do it?</summary><p>This requirement does apply. RHEL9, like any other operating system, must be able to lock down an account to stop someone from simply brute-forcing the password.</p><p>RHEL9, luckily, has a built-in capability to do this. RHEL&#39;s <code>authselect</code> utility can turn on the faillock feature. Note that this requirement is considered configurable (i.e. it is possible to have the system configured to <em>either</em> meet or not meet this requirement).</p></details><div class="hint-container tip"><p class="hint-container-title">How do we know all this about the system?</p><p>If you are not familiar with the RHEL9 auditing system, don&#39;t worry; it&#39;s just an example we&#39;re using for the class. We promise we will not quiz you on how the <code>authselect</code> utility works.</p><p>If you have to develop STIG content for a project, it will concern a Component that you are familiar with enough to answer these questions (or are at least in a position to research).</p></div><details class="hint-container details"><summary>Based on your decision, what status should we give this component?</summary><p>We would consider this requirement <strong>Applicable - Configurable.</strong> The system is capable of complying with the SRG requirement, but <em>only if properly configured</em>.</p></details><p>Based on our decision, let&#39;s edit the status field in the Component editing screen.</p><details class="hint-container details"><summary>Changing status</summary><figure><img src="'+f+'" alt="Updating the Status on RHEL-09-000004" tabindex="0" loading="lazy"><figcaption>Updating the Status on RHEL-09-000004</figcaption></figure><p>In the wild, it may be the case that most SRG requirements wind up being to Configurable - Applicable to your Component, and only a handful may be either Not Applicable, Inherently Met or Inherently Not Met. Or vice versa; many applications writing up guidance based on the ASD STIG realize that most of those requirements are not applicable to their simple web apps.</p><p>We still have to check each one to be sure!</p></details><p>Note that once we select the status, the text fields become editable. Now we can tailor the general guidance from the SRG into specific guidance.</p><p>Before we do that, let&#39;s investigate a the Status field a bit more.</p><h3 id="_7-3-3-another-requirement-status" tabindex="-1"><a class="header-anchor" href="#_7-3-3-another-requirement-status"><span>7.3.3 Another Requirement Status</span></a></h3><p>Let&#39;s double back and pick an example with a different status. On the sidebar, click on RHEL-09-000045.</p><figure><img src="'+g+'" alt="RHEL-09-000044" tabindex="0" loading="lazy"><figcaption>RHEL-09-000044</figcaption></figure><p>Our title here is &quot;The operating system must obscure feedback of authentication information during the authentication process to protect the information from possible exploitation/use by unauthorized individuals.&quot;</p><details class="hint-container details"><summary>Based on the title, do you think this requirement applies to RHEL9 or not? If it applies, does RHEL9 need to be configured/can it be configured to do it?</summary><p>Yes, this requirement still applies. Like most requirements, RHEL9 doesn&#39;t have any quirks that would make this requirement not apply.</p><p>However, you may know that RHEL (and all Linux OSes) obscure user passwords when they are entered either into the GUI or on the terminal. This behavior is baked into the RHEL source code -- there is no way for a user to configure the system to not do this.</p><p>As such, the status should be <strong>Applicable - Inherently Meets.</strong></p></details><p>Let&#39;s once again update the status of our requirement to match what we picked.</p><details class="hint-container details"><summary>Updating Status</summary><figure><img src="'+y+'" alt="RHEL-09-000044" tabindex="0" loading="lazy"><figcaption>RHEL-09-000044</figcaption></figure></details><p>Notice that this time, several of the fields in the Vulcan editing window changed.</p><h2 id="_7-4-mitigations-artifacts-and-justifications" tabindex="-1"><a class="header-anchor" href="#_7-4-mitigations-artifacts-and-justifications"><span>7.4 Mitigations, Artifacts and Justifications</span></a></h2><p>If a requirement is flagged as any of Not Applicable, Inherently Met, or Inherently Not Met, then we need to offer proof that this is the case, and give the end users guidance on how to mitigate the vulnerability if the requirement cannot be met.</p><p>If we select any of those statuses in Vulcan, we therefore get a different set of fields to complete. We can&#39;t describe them better than DISA can, so we will refer you to the Vendor STIG guide<sup class="footnote-ref"><a href="#footnote2">[2]</a><a class="footnote-anchor" id="footnote-ref2"></a></sup> for the definitions of the new fields.</p><h3 id="_7-4-1-mitigation" tabindex="-1"><a class="header-anchor" href="#_7-4-1-mitigation"><span>7.4.1 Mitigation</span></a></h3><p>Per Per the Vendor STIG Process Guide section 4.1.15 -</p><p>&quot;The Mitigation offers a method for minimizing risk. Mitigations do not eliminate the need for the requirement.</p><p>The “Mitigation” field must be populated if the status of the requirement is Applicable – Does Not Meet.</p><p>After the mitigation, include a summary statement to address any impact to the overall risk associated with this requirement.</p><p>Example summary statements:</p><ul><li>With the implementation of this mitigation, the overall risk can be decreased to a CAT [II or III].</li><li>With the implementation of this mitigation, the overall risk is fully mitigated.</li><li>Although the listed mitigation is supporting the security function, it is not sufficient to reduce the residual risk of this requirement.</li></ul><p>An “Applicable – Does Not Meet” vulnerability may be fully mitigated by the application of another STIG check or by the underlying operating system. In these instances, include a statement in the Mitigation as shown in the example below.</p><p>Examples of risk mitigated by other STIG requirements:</p><ul><li>This requirement is fully mitigated by the Apache Server 2.4 Windows Server STIG. The Apache Web Server accounts not used by installed features (e.g., tools, utilities, specific services) must not be created and must be deleted when the Apache web server feature is uninstalled. (AS24-W1-000280)</li><li>This requirement is fully mitigated by the underlying operating system. (WN16-SO-000430)&quot;</li></ul><h3 id="_7-4-2-artifacts" tabindex="-1"><a class="header-anchor" href="#_7-4-2-artifacts"><span>7.4.2 Artifacts</span></a></h3><p>Per the Vendor STIG Process Guide section 4.1.16 -</p><p>&quot;Populate this information for requirements that have a status of Applicable – Inherently Meets. The Artifact Description describes the artifacts or substantiating information that shows how the product inherently meets the requirement.</p><p>All self-certification claims must be accompanied by supporting vendor documentation, which taken as a whole, provides DISA with reasonable assurance that the particular requirement has been met.</p><p>This field provides citations to the documentary evidence that describe how each requirement is satisfied. Examples of artifacts include:</p><ul><li>A test report describing the test procedures used to verify compliance and corresponding results, including the specific version of tools used to test and date of test.</li><li>A published administrative manual or configuration guide explaining how compliance can be achieved.</li><li>An attestation from the product developer that the product is compliant, accompanied by a brief statement describing the technical means by which compliance is achieved.</li><li>Steps to verify the product cannot be configured to be out of compliance with the requirement.</li></ul><p>Note: Blogs and email messages are not sufficient documentation to support an Applicable – Inherently Meets status.&quot;</p><h3 id="_7-4-3-status-justification" tabindex="-1"><a class="header-anchor" href="#_7-4-3-status-justification"><span>7.4.3 Status Justification</span></a></h3><p>Per the Vendor STIG Process Guide section 4.1.17 -</p><p>&quot;For requirements that have a status of Not Applicable:</p><ul><li>Explain in the Status Justification text why the requirement is not applicable.</li><li>The most common explanations are that the requirements concern a capability that is not present on the device (e.g., encryption of removable data storage media where the product does not support removable media) or the requirement pertains to an operational environment in which the product will not be placed (e.g., the requirement applies to classified processing when the product is intended only for unclassified applications).</li></ul><p>For requirements that have a status of Applicable – Does Not Meet:</p><ul><li>Explain in the Status Justification text what function or feature is not present.</li><li>If some part of the requirement is achievable, the Status Justifications should explain what part of the requirement is unmet and what is met (e.g., the system can lock an account after certain failed logon attempts, but these failures are not limited to a specific window of time).</li><li>If no part of the requirement can be fulfilled, note this information.</li><li>Describe the residual risk after any mitigation is applied.</li></ul><p>For requirements that have a status of Applicable – Inherently Meets</p><ul><li>List in the Status Justification text the specific feature of the product that supports this requirement and that cannot be changed.</li><li>Note the type of evidence used to establish compliance (e.g., test report, vendor documentation, or vendor attestation).&quot;</li></ul><div class="hint-container warning"><p class="hint-container-title">What about the Vendor Comments field?</p><p>You may note that picking any status in Vulcan opens the Vendor Comments field for editing.</p><p>That field is purely stored in Vulcan and will not be included in any exports. It exists for the content authors to leave comments on the process of writing the requirement.</p><p>For example, an author may add their references for a control&#39;s Check or Fix text in the Vendor Comment field, since a reviewer might like to know how they arrived at their conclusions.</p></div><h3 id="_7-4-4-completing-our-requirement" tabindex="-1"><a class="header-anchor" href="#_7-4-4-completing-our-requirement"><span>7.4.4 Completing Our Requirement</span></a></h3><p>We will not complete the Artifact field in RHEL-09-000045 because digging around in the RHEL9 source code is beyond the scope of this course.</p><p>However, let&#39;s be sure to enter in a Status Justification:</p><p><strong>RHEL9 automatically obfuscates user passwords in the graphical user interface and at the command line interface.</strong></p><p>Like so:</p><figure><img src="'+b+'" alt="Adding a Status Justification" tabindex="0" loading="lazy"><figcaption>Adding a Status Justification</figcaption></figure><p>Hit &quot;Save Control&quot; when finished.</p><figure><img src="'+w+'" alt="Saving the Requirement" tabindex="0" loading="lazy"><figcaption>Saving the Requirement</figcaption></figure><p>You&#39;ll be asked to fill out a short description of the change you made. If you are familiar with a source code manager like Git, this process is analogous to adding a commit message when you add code to version control.</p><figure><img src="'+q+'" alt="Adding a Comment" tabindex="0" loading="lazy"><figcaption>Adding a Comment</figcaption></figure><h2 id="_7-5-revision-history" tabindex="-1"><a class="header-anchor" href="#_7-5-revision-history"><span>7.5 Revision History</span></a></h2><p>Once we save edits, we will see the Revision History on the right side of the screen automatically update:</p><figure><img src="'+v+'" alt="Revision History" tabindex="0" loading="lazy"><figcaption>Revision History</figcaption></figure><p>Clicking the &quot;Rule Was Updated&quot; button will show a before and after view of what was changed by the edit.</p><figure><img src="'+_+'" alt="Checking a Revision" tabindex="0" loading="lazy"><figcaption>Checking a Revision</figcaption></figure><p>You can even select changes to revert, again similar to how a source code manager lets you roll back changes.</p><div class="hint-container tip"><p class="hint-container-title">Why would I revert changes?</p><p>Remember that writing requirements in Vulcan is intended to be done in groups. Authors can and do often disagree about how a requirement should be completed.</p><p>Having the ability to granularly revert edits -- and even just track what change was made, when, and by who -- is an important part of a collaborative workflow.</p></div><hr class="footnotes-sep">',65)),t("section",S,[t("ol",R,[e[4]||(e[4]=t("li",{id:"footnote1",class:"footnote-item"},[t("p",null,[i("Definitions from Table 4-1 in DISA's Vendor STIG Process Guide. See Resources. "),t("a",{href:"#footnote-ref1",class:"footnote-backref"},"↩︎")])],-1)),t("li",x,[t("p",null,[e[1]||(e[1]=i('Sections 4.1.15 through 4.1.17 of the "Vendor STIG Process", Version 4 Release 1. See ')),o(r,{to:"/resources/"},{default:c(()=>e[0]||(e[0]=[i("Resources")])),_:1}),e[2]||(e[2]=i(". ")),e[3]||(e[3]=t("a",{href:"#footnote-ref2",class:"footnote-backref"},"↩︎",-1))])])])])])}const T=l(k,[["render",A],["__file","07.html.vue"]]),L=JSON.parse(`{"path":"/courses/guidance/07.html","title":"7. Editing Components","lang":"en-US","frontmatter":{"order":7,"next":"08.md","title":"7. Editing Components","author":"Will Dower","headerDepth":3,"description":"7.1 Editing Components For your Component, you'll need to decide what requirements are applicable to your specific piece of software (hint: not all of them will be). Of the appl...","head":[["meta",{"property":"og:url","content":"https://mitre.github.io/saf-training/saf-training/courses/guidance/07.html"}],["meta",{"property":"og:site_name","content":"MITRE SAF Training"}],["meta",{"property":"og:title","content":"7. Editing Components"}],["meta",{"property":"og:description","content":"7.1 Editing Components For your Component, you'll need to decide what requirements are applicable to your specific piece of software (hint: not all of them will be). Of the appl..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"en-US"}],["meta",{"property":"og:updated_time","content":"2024-12-02T03:46:43.000Z"}],["meta",{"property":"article:author","content":"Will Dower"}],["meta",{"property":"article:modified_time","content":"2024-12-02T03:46:43.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"7. Editing Components\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-12-02T03:46:43.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Will Dower\\"}]}"]]},"headers":[{"level":2,"title":"7.1 Editing Components","slug":"_7-1-editing-components","link":"#_7-1-editing-components","children":[]},{"level":2,"title":"7.2 The Editing Window","slug":"_7-2-the-editing-window","link":"#_7-2-the-editing-window","children":[]},{"level":2,"title":"7.3 Requirement Statuses","slug":"_7-3-requirement-statuses","link":"#_7-3-requirement-statuses","children":[{"level":3,"title":"7.3.1 Picking a Status","slug":"_7-3-1-picking-a-status","link":"#_7-3-1-picking-a-status","children":[]},{"level":3,"title":"7.3.2 Our First Requirement Status","slug":"_7-3-2-our-first-requirement-status","link":"#_7-3-2-our-first-requirement-status","children":[]},{"level":3,"title":"7.3.3 Another Requirement Status","slug":"_7-3-3-another-requirement-status","link":"#_7-3-3-another-requirement-status","children":[]}]},{"level":2,"title":"7.4 Mitigations, Artifacts and Justifications","slug":"_7-4-mitigations-artifacts-and-justifications","link":"#_7-4-mitigations-artifacts-and-justifications","children":[{"level":3,"title":"7.4.1 Mitigation","slug":"_7-4-1-mitigation","link":"#_7-4-1-mitigation","children":[]},{"level":3,"title":"7.4.2 Artifacts","slug":"_7-4-2-artifacts","link":"#_7-4-2-artifacts","children":[]},{"level":3,"title":"7.4.3 Status Justification","slug":"_7-4-3-status-justification","link":"#_7-4-3-status-justification","children":[]},{"level":3,"title":"7.4.4 Completing Our Requirement","slug":"_7-4-4-completing-our-requirement","link":"#_7-4-4-completing-our-requirement","children":[]}]},{"level":2,"title":"7.5 Revision History","slug":"_7-5-revision-history","link":"#_7-5-revision-history","children":[]}],"git":{"createdTime":1698171733000,"updatedTime":1733111203000,"contributors":[{"name":"wdower","username":"wdower","email":"57142072+wdower@users.noreply.github.com","commits":3,"url":"https://github.com/wdower"},{"name":"ssayed118","username":"ssayed118","email":"sumaasayed@mitre.org","commits":1,"url":"https://github.com/ssayed118"},{"name":"sumaa","username":"sumaa","email":"79539195+ssayed118@users.noreply.github.com","commits":1,"url":"https://github.com/sumaa"},{"name":"Emily Rodriguez","username":"Emily Rodriguez","email":"ecrodriguez@mitre.org","commits":5,"url":"https://github.com/Emily Rodriguez"},{"name":"Aaron Lippold","username":"Aaron Lippold","email":"lippold@gmail.com","commits":3,"url":"https://github.com/Aaron Lippold"}]},"readingTime":{"minutes":7.74,"words":2321},"filePathRelative":"courses/guidance/07.md","localizedDate":"October 24, 2023","autoDesc":true}`);export{T as comp,L as data};
