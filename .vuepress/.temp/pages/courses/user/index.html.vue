<template><div><h2 id="_1-1-class-overview" tabindex="-1"><a class="header-anchor" href="#_1-1-class-overview" aria-hidden="true">#</a> 1.1 Class Overview</h2>
<p>The purpose of this class is to gain understanding and hands-on practical use of MITRE's Security Automation Framework with a focus on automating security validation and visualization. There is a survey at the end to give feedback on the class.</p>
<h2 id="_1-2-consider-your-current-status" tabindex="-1"><a class="header-anchor" href="#_1-2-consider-your-current-status" aria-hidden="true">#</a> 1.2 Consider your current status</h2>
<div class="hint-container tip">
<p class="hint-container-title">Take Inventory</p>
<p>How is software secured and maintained in your context? Think about your situation to paint the picture for learning throughout the class.</p>
</div>
<ol>
<li>What is your role in the security process of your organization?</li>
<li>How frequently and for how much time does the software get assessed?</li>
<li>What is the biggest challenge for maintaining and assessing software security?</li>
<li>What changes would improve software assessment in your context?</li>
<li>What do you want to learn from this training?</li>
</ol>
<h2 id="_1-3-class-objectives" tabindex="-1"><a class="header-anchor" href="#_1-3-class-objectives" aria-hidden="true">#</a> 1.3 Class Objectives:</h2>
<p>By the end of the SAF User Class, you should be able to achieve all of the following objectives.</p>
<ul>
<li>Identify and locate security guidance for a software component.</li>
<li>Understand the capabilities available in the main pillars of the MITRE Security Automation Framework - Plan, Harden, Validate, Normalize, Visualize.</li>
<li>Define and run an InSpec profile to validate a component against security guidance.</li>
<li>Visualize InSpec results and third party security tool data.</li>
<li>Automatically export checklist results from a security assessment.</li>
</ul>
<h2 id="_1-4-the-road-to-security-automation" tabindex="-1"><a class="header-anchor" href="#_1-4-the-road-to-security-automation" aria-hidden="true">#</a> 1.4 The Road to Security Automation</h2>
<p>As you can see from the picture below, the process for developing automated security tests starts with requirements documents like SRGs, STIGs or CIS Benchmark that are written in regular, human language and then implemented as code. We need that code to record test results in a standardized format so that we can easily export our security data somewhere people can use it to make decisions (like the Heimdall visualization app).</p>
<p>This challenge is what the <a href="https://saf.mitre.org" target="_blank" rel="noopener noreferrer">MITRE Security Automation Framework<ExternalLinkIcon/></a> or MITRE SAF was developed to simplify -- to make the journey from a Requirement Document to an automated test profile and back again a little easier to navigate.</p>
<figure><img src="@source/assets/img/saf-lifecycle.png" alt="SAF Lifecycle" tabindex="0" loading="lazy"><figcaption>SAF Lifecycle</figcaption></figure>
</div></template>


