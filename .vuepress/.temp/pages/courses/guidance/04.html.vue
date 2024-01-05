<template><div><h2 id="_4-1-stig-template-fields" tabindex="-1"><a class="header-anchor" href="#_4-1-stig-template-fields" aria-hidden="true">#</a> 4.1 STIG Template Fields</h2>
<p>Each STIG is a set of requirements and implementation guidance on how to meet them (which we will abbreviate as just a &quot;STIG requirement&quot;). Let's dive into the technical details that make up a STIG requirement.</p>
<p>Each requirement in a STIG will contain the following fields.</p>
<details class="hint-container details"><summary>SRG-Inherited Fields</summary>
<p>These fields are imported unchanged from the SRG, so we do not need to worry about them too much as STIG content authors.</p>
<ul>
<li><strong>IA Control</strong>: The NIST control family from which the requirement is sourced.</li>
<li><strong>CCI</strong>: A DISA-curated intermediary ID for tying the IA control to individual requirements.</li>
<li><strong>SRG ID</strong>: The ID of the SRG requirement this STIG requirement implements.</li>
<li><strong>SRG Requirement</strong>: A text description of the SRG requirement this STIG requirement implements.</li>
<li><strong>SRG VulDiscussion</strong>: Text field describing the risk incurred by not fulfilling this requirement.</li>
<li><strong>SRG Check</strong>: General implementation guidance for how to test if the requirement is met, not specific for any one component. An SRG Check might tell you to see if your router's password has not been changed from the default, for example, but it will not tell you how to do on on a Cisco router, specifically.</li>
<li><strong>SRG Fix</strong>: General implementation guidance for how to fix your system if the requirement is not currently met, not specific for any one component.</li>
</ul>
</details>
<details class="hint-container details"><summary>STIG-Specific Fields</summary>
<p>These are the fields we will be responsible for.</p>
<ul>
<li><strong>VulDiscussion</strong>: Text field describing how the vulnerability affects the component that is the specific focus of the STIG.</li>
<li><strong>Status</strong>: Field indicating whether the underlying SRG requirement is applicable to the component in question. It might not be. We will discuss this in further detail when we start writing requirements in Vulcan.</li>
<li><strong>Check</strong>: Specific instruction on how to validate the component's configuration settings.</li>
<li><strong>Fix</strong>: Specific instructions on how to configure the component to comply with the requirement.</li>
</ul>
</details>
<div class="hint-container tip">
<p class="hint-container-title">Check and Fix</p>
<p>Much of your time writing STIGs will be researching how to fill out the Check and the Fix fields, since those comprise the bulk of the information in STIGs that is not copied from the SRG.</p>
</div>
<div class="hint-container tip">
<p class="hint-container-title">How Can I Examine STIGs?</p>
<p>We mentioned earlier that STIGs are distributed in XML format (Specifically, the files use the XCCDF XML schema).</p>
<p>There are several apps that allow you to crack open the XML for display:</p>
<ul>
<li>STIG Viewer: DISA's own application for STIG examination. You can download it fromo the <a href="https://public.cyber.mil/stigs/downloads/" target="_blank" rel="noopener noreferrer">DOD Cyber Exchange<ExternalLinkIcon/></a> just like the STIGs themselves.</li>
<li>Vulcan: Vulcan itself can of course be used to load and view XCCDF XML documents.</li>
<li><a href="https://saf.mitre.org/apps/heimdall" target="_blank" rel="noopener noreferrer">Heimdall<ExternalLinkIcon/></a> (coming soon!): The MITRE SAF team is working to implement all of STIG Viewer's functionality into the Heimdall application, so that policy documents and scan data can be examined by the same application.</li>
</ul>
</div>
<p>See DISA's Vendor STIG Process Guide section 4.1 for further details on these fields.</p>
<h2 id="_4-2-stig-ready-content" tabindex="-1"><a class="header-anchor" href="#_4-2-stig-ready-content" aria-hidden="true">#</a> 4.2 STIG-Ready Content</h2>
<p>A piece of security guidance is not a formal STIG until it has been peer reviewed and published by DISA itself. Before publishing, your security guidance is considered <strong>STIG-ready content</strong>.</p>
<h3 id="_4-2-1-when-should-i-get-my-content-formally-published" tabindex="-1"><a class="header-anchor" href="#_4-2-1-when-should-i-get-my-content-formally-published" aria-hidden="true">#</a> 4.2.1 When Should I Get My Content Formally Published?</h3>
<p>If all you are looking for is an Authority to Operate for the fancy system your team is making for your project, you may not need to undergo the formal process for peer reviewing and publishing your STIG-ready content through DISA. STIG-ready content, since it is tightly aligned to the requirements in its source SRG, is on its own an excellent foundation to use for security automation activities, such as building out automated hardening scripts and test suites.</p>
<p>If you are a software developer creating a product that you expect will be used by other projects within the DOD, it will likely be beneficial to you to formally publish a STIG for your product. Doing so will <strong>greatly lower</strong> the effort required for your software to be implemented by the Department -- you figure out security once, and no one else will have to reinvent the wheel.</p>
<Mermaid id="mermaid-126" code="eJxlUk1v2zAMvedXcNlhLTBjzUeTNIcVaz0XOWwrlmxFYfSg2EwsTBYzSZ7h/fpRruVm6U2PfCQfHxVF0cBJp3AJDwVqWBdUqRxWkJAphZJ/Eb40sN6s7qLvKPIGbkk71O56kJHeyf1yAOAKLLl+KywG9FMYKbYKrc8DHIwshWluSZFZwvBtMkomyXTY5pTU2CcW8/hzkgwHXtZOUZ0VwjjY3LRMmY/O0phYnEbMwRFkVB5UA7V0BcTfYjD4u5KG52tnr5/Ou6px+khVX5NTVnkCFFRDw4laKsVRFi7tU1cySTdEvFH+3mekA6GbWjQhPU2/er7Qv+wblpOTfuegFtzUUeBcpo9o22SIzNLhg5EOwWJW8aOBfSVzoTMEYXtdwknScPba8vNhaDT/z4biqCEbUlbav3jTLfflG/inwcoilC8TX9xZeJ2h8xUvFt6ji9RPFpmDeLX+9NxxLzXs2q/Rfgq+LGVo+/rRJL2vtkrawq90ROwJ02MC22+Aav52YYG7Tt+HG7QO7g1PlzygjWPf5DL9oXM0e3pWdkA0vOIfiXVPgSj66K9wgqfhgh2ehIN3eByud4LHHZ6HE3R4EVzs8Oiid6+LzE4qroLVJ/mZx363fsnQMmhsGa2Hg3/tXReD"></Mermaid><h2 id="_4-3-challenges-with-the-traditional-process-for-stig-authorship" tabindex="-1"><a class="header-anchor" href="#_4-3-challenges-with-the-traditional-process-for-stig-authorship" aria-hidden="true">#</a> 4.3 Challenges with the Traditional Process for STIG Authorship</h2>
<p>Vulcan exists because writing STIGs is very time-consuming for reasons that rarely have to do with actual security research.</p>
<div class="hint-container note">
<p class="hint-container-title">STIG Authorship Challenges</p>
<p>Have you ever been part of an effort to write a STIG before?</p>
</div>
<p>Before Vulcan, vendors could expect to take anywhere from <em>18 months to 2 years</em> to develop a STIG for a reasonably complex piece of software. An unacceptable amount of that time was locked up in document management activities -- simply keeping the author team all up-to-date with each other's work. STIG documents were often created using spreadsheets of requirements emailed back and forth between the authorship team.</p>
<div class="hint-container warning">
<p class="hint-container-title">Warning</p>
<p>If you've ever spent hours editing a document only to realize that the rest of your team was editing a completely separate version, take that feeling and multiply it by 300 requirements.</p>
</div>
<figure><img src="@source/assets/img/STIGchallenges.png" alt="Challenges Related to STIG Authorship" tabindex="0" loading="lazy"><figcaption>Challenges Related to STIG Authorship</figcaption></figure>
<p>The MITRE SAF© team, acting in collaboration with VMWare (which maintains roughly four dozen STIGs for its software components, at time of writing) and DISA, built the Vulcan webapp to move the STIG authorship workflow into the browser.</p>
<p>Vulcan adds in systems for:</p>
<ul>
<li>Peer Review</li>
<li>Role-based access control (RBAC)</li>
<li>Library of STIG and SRG reference content</li>
<li>Building automated tests alongside human-friendly guidance</li>
<li>Document Version Control</li>
</ul>
<p>VMWare has reported that with experienced authors, Vulcan cut down the time to write a STIG down to a few weeks. It also makes the problem of tracking and managing content <em>over time</em> much easier.</p>
<h3 id="_4-3-1-so-why-bother" tabindex="-1"><a class="header-anchor" href="#_4-3-1-so-why-bother" aria-hidden="true">#</a> 4.3.1 So. . . Why Bother?</h3>
<p>Software developers tend to ask themselves this frequently.</p>
<p>Why bother creating STIGs in the first place if it takes this much effort? Even with Vulcan speeding things up and taking on many management functions, creating a STIG takes quite a bit of time. Furthermore, there is a time cost inherent to maintaining the STIG over time, because every major change to a software component requires an update to the STIG as per DOD policy. Why go through the headache?</p>
<p>Recall that if you want to use your software anywhere under the Department of Defense's umbrella (and even in many civilian agencies!) you are <strong>required</strong> to comply with the Security Requirements Guides that apply to your system in order to recieve your Authority to Operate.</p>
<p>Taking the long view, <em>the easiest way to pass security assessments is to write up baseline security guidance early and stick to it.</em> That is, you have to follow the SRG anyway, and STIGs are ultimately just checklists on how to make your software follow the SRG. You're just writing all the security documentation you'd have to keep around anyway into one place.</p>
</div></template>


