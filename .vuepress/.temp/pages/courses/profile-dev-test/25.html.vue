<template><div><h1 id="prepair-your-environment" tabindex="-1"><a class="header-anchor" href="#prepair-your-environment" aria-hidden="true">#</a> Prepair Your Environment</h1>
<ul>
<li><strong>Download New Guidance:</strong> Download the appropriate profile from the <a href="https://public.cyber.mil/stigs/downloads/" target="_blank" rel="noopener noreferrer">DISA Document Library<ExternalLinkIcon/></a>. Unzip the downloaded folder and identify the <code v-pre>&lt;name&gt;xccdf.xml</code> file.</li>
<li><strong>Create the InSpec Profile JSON File:</strong> Clone or download the InSpec profile locally. Run the <code v-pre>inspec json</code> command to create the InSpec Profile JSON file to be used in the <code v-pre>saf generate delta</code> command.</li>
</ul>
<h2 id="delta-workflow-process" tabindex="-1"><a class="header-anchor" href="#delta-workflow-process" aria-hidden="true">#</a> Delta Workflow Process</h2>
<figure><img src="https://user-images.githubusercontent.com/13986875/228628448-ad6b9fd9-d165-4e65-95e2-a951031d19e2.png" alt="Delta Workflow Process" tabindex="0" loading="lazy"><figcaption>Delta Workflow Process Image</figcaption></figure>
<h2 id="using-delta" tabindex="-1"><a class="header-anchor" href="#using-delta" aria-hidden="true">#</a> Using Delta</h2>
<p>The SAF InSpec Delta workflow typically involves two phases, <code v-pre>preformatting</code> and <code v-pre>delta</code>.</p>
<p>Before starting, ensure you have the latest SAF-CLI, the InSpec Profile JSON file, and the updated guidance file.</p>
<ol>
<li><strong>Preformat the Source Profile:</strong> Before running the Delta command, preformat your source profile (usually the Patch Release profile) using the <code v-pre>saf generate update_controls4delta</code> command. This prepares the profile for the Delta process.</li>
<li><strong>Run the Delta Command:</strong> Execute <code v-pre>saf generate delta [arguments]</code> to start the Delta process.</li>
</ol>
<p>For more information on these commands, refer to the following documentation:</p>
<ul>
<li><a href="https://saf-cli.mitre.org/#delta-supporting-options" target="_blank" rel="noopener noreferrer">update_controls4delta<ExternalLinkIcon/></a></li>
<li><a href="https://saf-cli.mitre.org/#delta" target="_blank" rel="noopener noreferrer">saf generate delta<ExternalLinkIcon/></a></li>
</ul>
<h2 id="scope-of-changes-by-delta" tabindex="-1"><a class="header-anchor" href="#scope-of-changes-by-delta" aria-hidden="true">#</a> Scope of Changes by Delta</h2>
<p>Delta focuses on specific modifications migrating the changes from the XCCDF Benchmark Rules to the Profiles controls, and updating the 'metadata' of each of thosin the <code v-pre>control ID</code>, <code v-pre>title</code>, <code v-pre>default desc</code>, <code v-pre>check text</code>, and <code v-pre>fix text</code>, between the XCCDF Benchmark Rules and the Profile Controls.</p>
<p>If the XCCDF Guidance Document introduces a new 'Rule' or <code v-pre>inspec control</code> that is not in the current profile's <code v-pre>controls</code> directory, Delta will add it to the controls directory, populating the metadata from the XCCDF Benchmark data, similar to the <a href="https://saf-cli.mitre.org/#xccdf-benchmark-to-inspec-stub" target="_blank" rel="noopener noreferrer">xccdf-benchmark-to-inspec-stubs<ExternalLinkIcon/></a> tool.</p>
<p>It also adjusts the <code v-pre>tags</code> and introduces a <code v-pre>ref</code> between the <code v-pre>impact</code> and <code v-pre>tags</code>.</p>
<p>Delta does not modify the Ruby/InSpec code within the control, leaving it intact. Instead, it updates the 'control metadata' using the information from the supplied XCCDF guidance document. This applies to 'matched controls' between the XCCDF Guidance Document and the InSpec profile.</p>
<h3 id="further-inspec-delta-information-and-background" tabindex="-1"><a class="header-anchor" href="#further-inspec-delta-information-and-background" aria-hidden="true">#</a> Further InSpec Delta Information and Background</h3>
<ul>
<li>The original Delta branch can be found <a href="https://github.com/mitre/saf/pull/485" target="_blank" rel="noopener noreferrer">here<ExternalLinkIcon/></a>.</li>
<li>Delta moves lines not labeled with 'desc' to the bottom, between tags and InSpec code.</li>
<li>Whether the controls are formatted to be 80 lines or not, Delta exhibits the same behavior with the extra text.</li>
<li>Parameterizing should be considered.</li>
</ul>
</div></template>


