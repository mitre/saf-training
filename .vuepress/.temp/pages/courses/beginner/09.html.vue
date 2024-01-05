<template><div><h2 id="viewing-and-analyzing-results" tabindex="-1"><a class="header-anchor" href="#viewing-and-analyzing-results" aria-hidden="true">#</a> Viewing and Analyzing Results</h2>
<p>We discussed using <code v-pre>reporters</code> in the last section to capture InSpec's output in convenient JSON files. JSON reports like these are a transport medium for data; they are generated because they are intended to be ingested by some other tool or process later.</p>
<p>Let's imagine the case where we have been running InSpec scans -- a <em>lot</em> of InSpec scans -- and we want to examine all of our reports to dig into the root causes of failing tests. We will do this using the Heimdall security data visualization application.</p>
<h3 id="heimdall" tabindex="-1"><a class="header-anchor" href="#heimdall" aria-hidden="true">#</a> Heimdall</h3>
<p>Take a look at <a href="https://saf.mitre.org/apps/heimdall" target="_blank" rel="noopener noreferrer">Heimdall's page<ExternalLinkIcon/></a> on the MITRE SAF website for a quick description of what the tool is and what it does. You can also check out the <a href="https://saf.mitre.org/docs/heimdall-install" target="_blank" rel="noopener noreferrer">Heimdall docs<ExternalLinkIcon/></a>.</p>
<p>We won't get too far into all the cool things Heimdall does here, because this class is focused on InSpec. Suffice to say that Heimdall is our visualization tool for actually understanding InSpec's reports.</p>
<div class="hint-container warning">
<p class="hint-container-title">Wait, do I have to use Heimdall with InSpec?</p>
<p>No. There are plenty of dashboarding solutions that are widely used for aggregating and visualizing security data (ELK Stack and Splunk come to mind). Your team may already use one (or several).</p>
<p>The MITRE SAF team favors Heimdall because <s>we wrote it</s> it is a) free, b) extremely effective in normalizing and visualizing security data from disparate sources and tools, and c) free.</p>
</div>
<div class="hint-container warning">
<p class="hint-container-title">Wait, does Heimdall only work with InSpec reports?</p>
<p>No. Heimdall can ingest security data from an ever-growing list of commercial and open-source security tools. See the MITRE SAF <a href="https://saf.mitre.org/framework/normalize" target="_blank" rel="noopener noreferrer">Normalize capability<ExternalLinkIcon/></a> for details.</p>
</div>
<h3 id="heimdall-lite" tabindex="-1"><a class="header-anchor" href="#heimdall-lite" aria-hidden="true">#</a> Heimdall Lite</h3>
<p>We're going to use Heimdall Lite, the demo version of Heimdall that is freely accesible to the internet, for this part of the class.</p>
<p>Navigate to the web page for <a href="https://heimdall-lite.mitre.org/" target="_blank" rel="noopener noreferrer">Heimdall Lite<ExternalLinkIcon/></a>.</p>
<p>Click on the <code v-pre>Upload</code> button and navigate to your json output file that you saved from your previous step. Select that file then click open.</p>
<p>This will allow you to view the InSpec results in the Heimdall viewer.</p>
<figure><img src="@source/assets/img/Heimdall_Load.png" alt="Uploading To Heimdall" tabindex="0" loading="lazy"><figcaption>Uploading To Heimdall</figcaption></figure>
<p>Your visualization should look similar to the following:</p>
<figure><img src="@source/assets/img/Heimdall_Results.png" alt="Heimdall Results View" tabindex="0" loading="lazy"><figcaption>Heimdall Results View</figcaption></figure>
</div></template>


