<template><div><h2 id="_1-1-class-objectives" tabindex="-1"><a class="header-anchor" href="#_1-1-class-objectives" aria-hidden="true">#</a> 1.1 Class Objectives</h2>
<p>The purpose of this class is to take you beyond profile development and give you the tools to actively participate in the open source security automation community. The advanced class builds off of the beginner class fundamentals, and by the end, you should be able to achieve the following objectives.</p>
<h3 id="_1-1-2-advanced-class-objectives" tabindex="-1"><a class="header-anchor" href="#_1-1-2-advanced-class-objectives" aria-hidden="true">#</a> 1.1.2 Advanced Class Objectives:</h3>
<ul>
<li>Apply SAF to your organization’s mission and understand the overall mission of SAF and the tools/techniques.</li>
<li>Automate security testing and go/no-go decisions by integrating InSpec scans and the SAF CLI into a workflow, such as CI/CD pipelines.</li>
<li>Understand how an existing InSpec profile works under-the-hood.</li>
<li>Improve existing InSpec resources to better query its intended target/component.</li>
<li>Develop new InSpec resources to query new types of targets or components.</li>
<li>Know how to propose a pull request to Chef InSpec to contribute your improved/developed InSpec    - resources back to the community.</li>
</ul>
<h2 id="_1-2-about-inspec" tabindex="-1"><a class="header-anchor" href="#_1-2-about-inspec" aria-hidden="true">#</a> 1.2 About InSpec</h2>
<ul>
<li>InSpec is an open-source, community-developed  compliance validation framework</li>
<li>Provides a mechanism for defining machine-readable compliance and security requirements</li>
<li>Easy to create, validate, and read content</li>
<li>Cross-platform (Windows, Linux, Mac)</li>
<li>Agnostic to other DevOps tools and techniques</li>
<li>Integrates into multiple configuration managament tools</li>
</ul>
<h2 id="_1-3-the-road-to-security-automation" tabindex="-1"><a class="header-anchor" href="#_1-3-the-road-to-security-automation" aria-hidden="true">#</a> 1.3 The Road to Security Automation</h2>
<p>InSpec is one of the primary tools in the Security Automation workflow. It integrates easily with orchestration and configuration management tools found in the DevOps world.</p>
<p>As you can see from the picture below, the process for developing automated security tests starts with a human-language requirements documents like SRGs, STIGs or CIS Benchmark and then implements them as code. We need that code to record test results in a standardized format so that we can easily export our security data somewhere people can use it to make decisions (like the Heimdall visualization app).</p>
<p>This challenge is what the <a href="https://saf.mitre.org" target="_blank" rel="noopener noreferrer">MITRE Security Automation Framework<ExternalLinkIcon/></a> or MITRE SAF was developed to simplify -- to make the journey from a Requirement Document to an automated test profile and back again a little easier to navigate.</p>
<figure><img src="@source/assets/img/saf-lifecycle.png" alt="The SAF Lifecycle" tabindex="0" loading="lazy"><figcaption>The SAF Lifecycle</figcaption></figure>
<!-- ## About Security Automation

Orchestration, Configuration Management, Validation to Deployment
InSpec operates with most orchestration and CM tools found in the DevOps pipeline implementations

![Alt text](../../assets/img/InSpec_Orchestration.png) -->
<h2 id="_1-4-where-can-i-start-on-my-own" tabindex="-1"><a class="header-anchor" href="#_1-4-where-can-i-start-on-my-own" aria-hidden="true">#</a> 1.4 Where can I start on my own?</h2>
<p>You can contribute to existing profiles that can be found here:<br>
<a href="https://github.com/mitre" target="_blank" rel="noopener noreferrer">https://github.com/mitre<ExternalLinkIcon/></a></p>
<p>Otherwise you can create your own profiles if they don't exist using the following security guidelines:<br>
<a href="https://public.cyber.mil/stigs/downloads/" target="_blank" rel="noopener noreferrer">https://public.cyber.mil/stigs/downloads/<ExternalLinkIcon/></a><br>
<a href="https://www.cisecurity.org/cis-benchmarks/" target="_blank" rel="noopener noreferrer">https://www.cisecurity.org/cis-benchmarks/<ExternalLinkIcon/></a></p>
</div></template>


