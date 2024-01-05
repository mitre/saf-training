<template><div><h2 id="_4-start-with-planning" tabindex="-1"><a class="header-anchor" href="#_4-start-with-planning" aria-hidden="true">#</a> 4. Start with Planning</h2>
<p>The SAF's main pillars are Plan, Harden, Validate, Normalize, and Visualize. First, it is necessary to plan what components will be in your system and identify the security guidance available for those components.</p>
<figure><img src="@source/assets/img/SAF_Capabilities_Plan.png" alt="The Plan Capability" tabindex="0" loading="lazy"><figcaption>The Plan Capability</figcaption></figure>
<h3 id="_4-1-identify-your-stack-of-components-for-the-system" tabindex="-1"><a class="header-anchor" href="#_4-1-identify-your-stack-of-components-for-the-system" aria-hidden="true">#</a> 4.1 Identify your stack of components for the system</h3>
<p>Your software system is composed of multiple components. i.e., Cloud Services, Virtualization Platforms, Operating Systems, Databases, Application Logic, and Web Servers.</p>
<p>The first step of any assessment is identifying the components for the system you are assessing.</p>
<!-- [[Graphic of Stack with Redhat 7, NGINX]] -->
<h3 id="_4-2-what-is-the-guidance" tabindex="-1"><a class="header-anchor" href="#_4-2-what-is-the-guidance" aria-hidden="true">#</a> 4.2 What is the guidance?</h3>
<p>There could be Security Technical Implementation Guides (STIGs), Security Requirements Guides (SRGs), Center for Internet Security (CIS) Benchmarks, or vendor guidance written for the components in your software stack. Being aware of these can help inform which profile to use. Additionally, note here any specific requirements for your organization that might differ from the specific published guidance. This will inform how to tailor the profiles later on.</p>
<h3 id="_4-3-content-libraries-for-software-components" tabindex="-1"><a class="header-anchor" href="#_4-3-content-libraries-for-software-components" aria-hidden="true">#</a> 4.3. Content libraries for software components</h3>
<p>As you saw in the previous section's <a href="./03">SAF Site scavenger hunt</a>, the SAF website hosts links, informaiton, and tools to ease the security process. To get a better idea of what may be in your software stack and what kind of content is available for automated testing, you can peruse the SAF's hardening and validation content libraries when you are making a plan.</p>
<details class="hint-container details"><summary>Go to saf.mitre.org</summary>
<p>Go to the <a href="saf.mitre.org">SAF site</a> to peruse the hardening and validation libraries. As the security community develops more automation content, we update this site as a landing page for all of the content. The site will look like this:<br>
<img src="@source/assets/img/SAF_Home.png" alt="The SAF Homepage" loading="lazy"></p>
</details>
<details class="hint-container details"><summary>Peruse Hardening Content</summary>
<p>Navigate to the <a href="https://saf.mitre.org/#/harden" target="_blank" rel="noopener noreferrer">Harden page<ExternalLinkIcon/></a> to find library content for hardening different software components. Hardening content is software used to configure a component to comply with security guidance.<br>
<img src="@source/assets/img/SAF_Site_Harden.png" alt="Hardening" loading="lazy"></p>
</details>
<details class="hint-container details"><summary>Peruse Validation Content</summary>
<p>Navigate to the <a href="https://saf.mitre.org/#/validate" target="_blank" rel="noopener noreferrer">Validate page<ExternalLinkIcon/></a> to find library content for validating different software components against security guidance. Validation content is software used to test whether the component is configured to some security guidance. We will be looking more at the Validation library in a moment.<br>
<img src="@source/assets/img/SAF_Site_Validate.png" alt="Validation" loading="lazy"></p>
</details>
<h3 id="_4-4-what-if-there-is-no-content-for-a-software-component" tabindex="-1"><a class="header-anchor" href="#_4-4-what-if-there-is-no-content-for-a-software-component" aria-hidden="true">#</a> 4.4. What if there is no content for a software component?</h3>
<ul>
<li>First, reach out to the SAF team at <a href="mailto:saf@groups.mitre.org">saf@groups.mitre.org</a> to find out if there is a profile in development or otherwise available but not listed that could meet your needs.</li>
<li>Second, if there is still no profile available, identify the security guidance to which the profile should comply and reach out to find out how to best create that profile. We help teams do this and provide training courses on that as well!</li>
<li>Third, if there is no guidance available for your particular component, talk with us about developing the guidance using <a href="https://vulcan.mitre.org/" target="_blank" rel="noopener noreferrer">MITRE's Vulcan application<ExternalLinkIcon/></a>. Reference the <a href="../guidance">training class</a> on security guidance development.</li>
</ul>
</div></template>


