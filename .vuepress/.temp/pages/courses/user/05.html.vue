<template><div><h2 id="_5-from-plan-to-validate" tabindex="-1"><a class="header-anchor" href="#_5-from-plan-to-validate" aria-hidden="true">#</a> 5. From &quot;Plan&quot; to &quot;Validate&quot;</h2>
<p>After identifying software components for your environment and knowing what security guidance exists for those components, a great next step is validation, or in other words, testing.</p>
<figure><img src="@source/assets/img/SAF_Capabilities_Validate.png" alt="The Validation Capability" tabindex="0" loading="lazy"><figcaption>The Validation Capability</figcaption></figure>
<div class="hint-container info">
<p class="hint-container-title">WAIT!</p>
<p>But what about the &quot;Harden&quot; pillar? Why would we focus on testing that a software component is secure before we secure it?</p>
<p>Actually, starting with the tests, rather than the changes to be tested, can level-set the expectations and see what the current state of the software is while giving a clear understanding of the goal or measurement of success.</p>
<p>When using this mindset in software development, this kind of development can be referred to as Test Driven Development.</p>
</div>
<details class="hint-container details"><summary>A note on Test Driven Development (TDD)</summary>
<p>The idea of using Test Driven Development (in other words, having the code driven by tests and therefore, the requirements) helps the humans confirm that the software does exactly what it is supposed to do - not more and not less.</p>
<p>This process starts with a FAILING test. Then, the minimal amount of change required is done to fix the code so that the test passes. Once the test passes, the code can be refactored to be cleaner, more readable, etc. This is a cycle, and returns to the top to create a new failing test. As development continues, all tests should be run to confirm that all tests still pass! These tests can be put in an automated suite to validate the code set whenever there are changes overall.</p>
<p>The SAF team values this methodology and helps teams implement security compliance tests using InSpec so they can understand the state of the system and the goal state of a secured system, using automated tests to get this information easier, quicker, and more often.<br>
<img src="@source/assets/img/TestDrivenDevelopment.png" alt="Test-Driven Development" loading="lazy"></p>
</details>
<h2 id="_5-1-what-is-inspec" tabindex="-1"><a class="header-anchor" href="#_5-1-what-is-inspec" aria-hidden="true">#</a> 5.1 What is InSpec?</h2>
<p>&quot;Chef <a href="https://www.chef.io/downloads/tools/inspec" target="_blank" rel="noopener noreferrer">InSpec<ExternalLinkIcon/></a> is an infrastructure security and compliance testing framework with a human- and machine-readable language for comparing actual versus desired system state.&quot;</p>
<p>The SAF uses InSpec profiles to test software components against a security baseline. These automated tests produce data showing what security controls passed or failed, or were skipped or not reviewed and gives the reason and more information to fix it if not passing.</p>
<div class="hint-container note">
<p class="hint-container-title">What is an InSpec profile?</p>
<p>The term <strong>InSpec profile</strong> refers a collection of security tests written in InSpec (the programming language).<br>
To learn more, look at the Beginner Developer's section on <RouterLink to="/courses/beginner/02.md/#what-is-an-inspec-profile">What is an InSpec Profile</RouterLink> and test your understanding in <RouterLink to="/courses/beginner/02.md/#check-in">this comprehension check</RouterLink>.</p>
</div>
<h2 id="_5-2-examples-of-inspec-profiles" tabindex="-1"><a class="header-anchor" href="#_5-2-examples-of-inspec-profiles" aria-hidden="true">#</a> 5.2 Examples of InSpec profiles</h2>
<p>Let's review the READMEs for each profile for more information and specific run instructions. The README is the first document in the GitHub repository, and contains the following information:</p>
<ol>
<li>The name of the profile</li>
<li>The security guidance that the profile is based on (ex: a DISA STIG)</li>
<li>Available inputs for tailoring to your environment</li>
<li>Instructions for running the profile</li>
</ol>
<h3 id="_5-2-1-rhel8-baseline-profile" tabindex="-1"><a class="header-anchor" href="#_5-2-1-rhel8-baseline-profile" aria-hidden="true">#</a> 5.2.1 RHEL8 baseline profile</h3>
<p>Let's take the <a href="https://github.com/CMSgov/redhat-enterprise-linux-8-stig-baseline" target="_blank" rel="noopener noreferrer">RHEL8 baseline profile<ExternalLinkIcon/></a> as an example. You can find this InSpec profile at the provided link or through the <a href="https://saf.mitre.org/libs/validate" target="_blank" rel="noopener noreferrer">validation library of the SAF site<ExternalLinkIcon/></a>.</p>
<figure><img src="@source/assets/img/Github_Rhel8.png" alt="The Red Hat 8 Profile" tabindex="0" loading="lazy"><figcaption>The Red Hat 8 Profile</figcaption></figure>
<h3 id="_5-2-2-nginx-baseline-profile" tabindex="-1"><a class="header-anchor" href="#_5-2-2-nginx-baseline-profile" aria-hidden="true">#</a> 5.2.2 NGINX baseline profile</h3>
<p>Let's take the <a href="https://github.com/mitre/nginx-stigready-baseline" target="_blank" rel="noopener noreferrer">NGINX baseline profile<ExternalLinkIcon/></a> as an example. You can find this InSpec profile at the provided link or through the <a href="https://saf.mitre.org/libs/validate" target="_blank" rel="noopener noreferrer">validation library of the SAF site<ExternalLinkIcon/></a>.</p>
<figure><img src="@source/assets/img/Github_nginx.png" alt="The NGINX Profile" tabindex="0" loading="lazy"><figcaption>The NGINX Profile</figcaption></figure>
</div></template>


