<template><div><h2 id="class-objectives" tabindex="-1"><a class="header-anchor" href="#class-objectives" aria-hidden="true">#</a> Class Objectives</h2>
<p>The purpose of this class is to give you the fundamentals of how to develop security validation content, particularly through hands-on examples developing InSpec profiles. This class will also show participants how to visualize and analyze their security results. By the end, you should be able to achieve all of the following objectives.</p>
<h3 id="objectives" tabindex="-1"><a class="header-anchor" href="#objectives" aria-hidden="true">#</a> Objectives:</h3>
<ul>
<li>Describe the InSpec framework and its capabilities</li>
<li>Describe the architecture of an InSpec profile</li>
<li>Build an InSpec profile to transform security policy into automated security testing</li>
<li>Inherit controls from existing profile baselines into your profiles to avoid rework</li>
<li>Run an InSpec profile against a target - a component of an application stack</li>
<li>View and analyze InSpec results</li>
<li>Report Results</li>
<li>Create concise, human-readable control output using RSpec syntax in InSpec profiles</li>
</ul>
<h2 id="inspec-101" tabindex="-1"><a class="header-anchor" href="#inspec-101" aria-hidden="true">#</a> InSpec 101</h2>
<ul>
<li>InSpec is an open-source, community-developed compliance validation framework</li>
<li>Provides a mechanism for defining machine-readable compliance and security requirements</li>
<li>Easy to create, validate, and read content</li>
<li>Cross-platform (Windows, Linux, Mac)</li>
<li>Agnostic to other DevOps tools and techniques</li>
<li>Integrates into multiple configuration management tools</li>
</ul>
<h2 id="the-road-to-security-automation" tabindex="-1"><a class="header-anchor" href="#the-road-to-security-automation" aria-hidden="true">#</a> The Road to Security Automation</h2>
<p>InSpec is one of the primary tools in the Security Automation workflow. It integrates easily with orchestration and configuration management tools found in the DevOps world.</p>
<p>As you can see from the picture below, the process for developing automated security tests is a bit of a journey -- we need to start with a human-language requirements documents like SRGs, STIGs or CIS Benchmark and then implement them as code. We need that code to record test results in a standardized format so that we can easily export our security data somewhere people can use it to make decisions (like the Heimdall visualization app, which we will discuss later).</p>
<p>This challenge is what the <a href="https://saf.mitre.org" target="_blank" rel="noopener noreferrer">MITRE Security Automation Framework<ExternalLinkIcon/></a> or MITRE SAF was developed to simplify -- to make the journey from a Requirement Document to an automated test profile and back again a little easier to navigate.</p>
<figure><img src="@source/assets/img/saf-lifecycle.png" alt="The SAF Lifecycle" tabindex="0" loading="lazy"><figcaption>The SAF Lifecycle</figcaption></figure>
<p>We hope that during this class you will become comfortable with the tools, parts and processes involved in the end-to-end process, and gain the confidence to start automating your compliance journey with the information presented here.</p>
<p>Let's get started!</p>
</div></template>


