<template><div><h2 id="_2-1-the-goal-of-the-saf" tabindex="-1"><a class="header-anchor" href="#_2-1-the-goal-of-the-saf" aria-hidden="true">#</a> 2.1 The Goal of the SAF</h2>
<h3 id="_1-accelerate-ato" tabindex="-1"><a class="header-anchor" href="#_1-accelerate-ato" aria-hidden="true">#</a> 1. Accelerate ATO</h3>
<ul>
<li>Automate tailored security configuration testing in every build</li>
<li>Aggregate all security assessment results in a single dashboard to show security status</li>
</ul>
<h3 id="_2-establish-security-requirements" tabindex="-1"><a class="header-anchor" href="#_2-establish-security-requirements" aria-hidden="true">#</a> 2. Establish Security Requirements</h3>
<ul>
<li>Align security tests to requirements</li>
<li>Write STIG-ready content for software components</li>
</ul>
<h3 id="_3-build-security-in" tabindex="-1"><a class="header-anchor" href="#_3-build-security-in" aria-hidden="true">#</a> 3. Build Security In</h3>
<ul>
<li>Automate security control assessment aligned to common standards</li>
<li>Implement security requirements within existing DevSecOps pipelines</li>
</ul>
<h3 id="_4-assess-monitor-vulnerabilities" tabindex="-1"><a class="header-anchor" href="#_4-assess-monitor-vulnerabilities" aria-hidden="true">#</a> 4. Assess/Monitor Vulnerabilities</h3>
<ul>
<li>Visualize results of all ongoing assessments to understand risk over time</li>
<li>Enable ongoing or continuous authorization to operate (cATO)</li>
</ul>
<figure><img src="@source/assets/img/SAF_Goals.png" alt="The Goals of the SAF" tabindex="0" loading="lazy"><figcaption>The Goals of the SAF</figcaption></figure>
<h2 id="_2-2-the-road-to-security-automation" tabindex="-1"><a class="header-anchor" href="#_2-2-the-road-to-security-automation" aria-hidden="true">#</a> 2.2 The Road to Security Automation</h2>
<p>As you can see from the picture below, the process for developing automated security tests starts with requirements documents like SRGs, STIGs or CIS Benchmark that are written in regular, human language and then implemented as code. We need that code to record test results in a standardized format so that we can easily export our security data somewhere people can use it to make decisions (like the Heimdall visualization app).</p>
<p>This challenge is what the <a href="https://saf.mitre.org" target="_blank" rel="noopener noreferrer">MITRE Security Automation Framework<ExternalLinkIcon/></a> or MITRE SAF was developed to simplify -- to make the journey from a Requirement Document to an automated test profile and back again a little easier to navigate.</p>
<figure><img src="@source/assets/img/saf-lifecycle.png" alt="The SAF Lifecycle" tabindex="0" loading="lazy"><figcaption>The SAF Lifecycle</figcaption></figure>
</div></template>


