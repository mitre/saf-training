<template><div><h2 id="_1-1-class-overview" tabindex="-1"><a class="header-anchor" href="#_1-1-class-overview" aria-hidden="true">#</a> 1.1 Class Overview</h2>
<p>The purpose of this class is to outline how security guidance fits in the security validation lifecycle and equip participants with the tools and knowledge to create and use security guidance. There is a survey at the end to give feedback on the class.</p>
<h3 id="_1-1-1-class-objectives" tabindex="-1"><a class="header-anchor" href="#_1-1-1-class-objectives" aria-hidden="true">#</a> 1.1.1 Class Objectives:</h3>
<p>By the end of this class, you should be able to achieve all of the following objectives.</p>
<ul>
<li>Identify and locate security guidance for a software component.</li>
<li>Differentiate between different types of security guidance, such as SRGs and STIGs.</li>
<li>Create tailored security guidance using Vulcan.</li>
<li>Classify security requirements as Applicable - Configurable, Applicable - Inherently Meets, Applicable - Does Not Meet, Not Applicable, or Not Yet Determined for a given software component.</li>
<li>Export security guidance as InSpec stubs to assist in automated security validation.</li>
<li>Understand how STIG-ready content can be formally peer reviewed by DISA and published to the security community</li>
<li>Create guidance with Vulcan to support Authority To Operate (ATO) efforts</li>
</ul>
<h2 id="_1-2-the-road-to-security-automation" tabindex="-1"><a class="header-anchor" href="#_1-2-the-road-to-security-automation" aria-hidden="true">#</a> 1.2 The Road to Security Automation</h2>
<p>As you can see from the picture below, the process for developing automated security tests starts with requirements documents like SRGs, STIGs or CIS Benchmark that are written in regular, human language and then implemented as code. We need that code to record test results in a standardized format so that we can easily export our security data somewhere people can use it to make decisions (like the Heimdall visualization app).</p>
<p>This challenge is what the <a href="https://saf.mitre.org" target="_blank" rel="noopener noreferrer">MITRE Security Automation Framework<ExternalLinkIcon/></a> or MITRE SAF was developed to simplify -- to make the journey from a Requirement Document to an automated test profile and back again a little easier to navigate.</p>
<figure><img src="@source/assets/img/saf-lifecycle.png" alt="The SAF Lifecycle" tabindex="0" loading="lazy"><figcaption>The SAF Lifecycle</figcaption></figure>
</div></template>


