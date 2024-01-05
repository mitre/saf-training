<template><div><h2 id="_2-1-security-guidance" tabindex="-1"><a class="header-anchor" href="#_2-1-security-guidance" aria-hidden="true">#</a> 2.1 Security Guidance</h2>
<p>Before we go further, let's discuss what we mean by &quot;security guidance&quot; and some of its characteristics that matter to us as security (and automation!) practitioners.</p>
<p><strong>Security guidance</strong> is documentation that defines what constitutes a secure configuration for a software component or category of components. It includes organizational requirements for security, best practices, and instructions on how to fix problems. It answers the important question that all developers and engineers ask when they want to secure their software -- &quot;What counts as 'secure' for my system in the first place?&quot;</p>
<p>Most software projects will (or at least <em>should</em>) align themselves to a particular source for security guidance and follow it as a baseline that answers this question. For example, many commercial companies (and even some civilian government agencies) use the Center for Internet Security Benchmarks (CIS Benchmarks) as their baseline, while software deployed by the US Department of Defense is required to comply with the Defense Information Systems Agency's Security Technical Implementation Guides (STIGs), broadly speaking.</p>
<p>There are many different types of guidance documentation available to software developers. Software vendors often publish best practices guides, administration guides, or business requirements documents to instruct their userbase on how to best make use of the product. Security guidance is ultimately just another type of guidance document for effectively using a piece of software.</p>
<div class="hint-container note">
<p class="hint-container-title">Other Guidance Sources</p>
<p>Have you used security guidance documents from other sources besides the ones mentioned here?</p>
</div>
<div class="hint-container warning">
<p class="hint-container-title">Security Requirements Are Functional Requirements!</p>
<p>Software developers have a historical tendency to consider security as a completely separate activity from the basic process of building a software product. In a DevSecOps environment, however, security is just another functional requirement of your code.</p>
<p>You cannot ship code if it does not meet a functional requirement. Likewise, you cannot ship code that does not meet a security requirement!</p>
</div>
<p>This class content will be giving heavy focus to STIGs, since Vulcan was originally created to address pain points in the authorship process for STIG documents (which we will describe in detail a little later). We assume that most of the students who engage with this content will be working on government projects that require securing systems to &quot;STIG standard,&quot; or that the students work for software vendors who need to write such guidance. However, the principles behind what makes a quality STIG can be applied to security guidance of all kinds, and we hope you can take the lessons here and apply them to whatever guidance you create for your software.</p>
<h3 id="_2-1-1-organizational-policy-vs-baselines" tabindex="-1"><a class="header-anchor" href="#_2-1-1-organizational-policy-vs-baselines" aria-hidden="true">#</a> 2.1.1 Organizational Policy vs. Baselines</h3>
<p>Many organizations that use popular secrity guidance documents as their baselines have their own specific organizational security policies which conflict with that baseline. For example, let's say that the STIG for the Red Hat 8 operating system specifies that users should have, at minimum, 15 characters in their passwords, but your company's security policy requires a minimum of 20.</p>
<p>Consequently, many government agencies use baseline security guidance as foundations to create their own tailored content for in-house use. In addition to Vulcan's usual workflow for creating new baselines, you can use it to ingest a published baseline document and conduct this tailoring process to create security guidance tailored to your organization.</p>
<div class="hint-container tip">
<p class="hint-container-title">Automating Overlay Validation</p>
<p>You can check out the <a href="https://mitre.github.io/saf-training/courses/beginner/10.html#profile-dependencies-overlays" target="_blank" rel="noopener noreferrer">Beginner Security Automation Developer Class<ExternalLinkIcon/></a> for examples of how to write automated validation code with InSpec that is tailored from a baseline.</p>
</div>
<h2 id="_2-2-finding-security-guidance-documentation-baselines" tabindex="-1"><a class="header-anchor" href="#_2-2-finding-security-guidance-documentation-baselines" aria-hidden="true">#</a> 2.2 Finding Security Guidance Documentation Baselines</h2>
<p>Commonly-used security guidance is often available on the open Internet.</p>
<ul>
<li>CIS publishes its popular <a href="https://www.cisecurity.org/cis-benchmarks" target="_blank" rel="noopener noreferrer">Benchmarks<ExternalLinkIcon/></a> for free with registration (in PDF form, other formats require a subscription to CIS's SecureSuite)</li>
<li>DISA publishes all STIGs (and all the rest of its security documentation materials) for free on the <a href="https://public.cyber.mil/stigs/downloads/" target="_blank" rel="noopener noreferrer">DOD Cyber Exchange<ExternalLinkIcon/></a> public web page.
<ul>
<li>DISA distributes STIGs as a set of PDFs describing metadata like a changelog and cover sheets, where the underlying STIG itself is stored as an XML document.</li>
</ul>
</li>
</ul>
<p>Your first question when planning for securing your software component should always be &quot;is there already published guidance documentation available for it?&quot;</p>
<h3 id="_2-2-1-what-do-i-do-if-there-isn-t-already-published-guidance-documentation-available-for-it" tabindex="-1"><a class="header-anchor" href="#_2-2-1-what-do-i-do-if-there-isn-t-already-published-guidance-documentation-available-for-it" aria-hidden="true">#</a> 2.2.1 What Do I Do If There Isn't Already Published Guidance Documentation Available For It?</h3>
<p>Similarly, if you need to secure a software component that <em>does not</em> have a published guidance document already, your best strategy is to find the next-closest guidance document and use it to inform the content you create. You can think of the process of writing security guidance as an open-book test; you should feel free to borrow the best ideas other from other baselines!</p>
<p>In the case of STIGs, DISA's official guidance (as per their <a href="https://public.cyber.mil/stigs/faqs/#toggle-id-11" target="_blank" rel="noopener noreferrer">FAQ<ExternalLinkIcon/></a>) states to check for a STIG for an earlier version of the same software and modify it as necessary.</p>
<p>Therefore, where no guidance exists, use the closest reasonable baseline.</p>
<h3 id="_2-2-2-what-if-there-are-no-reasonably-close-baselines" tabindex="-1"><a class="header-anchor" href="#_2-2-2-what-if-there-are-no-reasonably-close-baselines" aria-hidden="true">#</a> 2.2.2 What If There Are No Reasonably Close Baselines?</h3>
<p>Then use Vulcan to make some. Good news; you're already reading the instructions on how to do that.</p>
<h2 id="_2-3-wait-aren-t-these-classes-about-automation-why-are-we-writing-documentation" tabindex="-1"><a class="header-anchor" href="#_2-3-wait-aren-t-these-classes-about-automation-why-are-we-writing-documentation" aria-hidden="true">#</a> 2.3 Wait, Aren't These Classes About Automation? Why Are We Writing Documentation?</h2>
<p>One of the overall goals of the Security Automation Framework is to get people writing <em>quality</em> security automation content, not just any old hardening scripts and test suites.</p>
<p>In formal government assessment settings, you will need to prove that you are covering particular categories of security controls with your activities. You can only do that if you build your automation content around a well-built security guidance document that itself heavily references all of your upstream requirements.</p>
<p>Therefore, the Planning capability of the SAF -- dealing with the selection and creation of security baselines for automation -- is a critical component of the overall framework, even though it itself is not automated.</p>
<figure><img src="@source/assets/img/SAFPlan.png" alt="SAF Plan Capability" tabindex="0" loading="lazy"><figcaption>SAF Plan Capability</figcaption></figure>
<p>The Plan capability comes first in the list because every other capability needs to refer back to it!</p>
</div></template>


