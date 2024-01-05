<template><div><h2 id="_9-visualize-mitre-heimdall" tabindex="-1"><a class="header-anchor" href="#_9-visualize-mitre-heimdall" aria-hidden="true">#</a> 9. Visualize - MITRE Heimdall</h2>
<p>Now we want to SEE our results in a more meaningful way!</p>
<figure><img src="@source/assets/img/SAF_Capabilities_Visualize.png" alt="The Visualize Capability" tabindex="0" loading="lazy"><figcaption>The Visualize Capability</figcaption></figure>
<p>Navigate to the our online version of the Heimdall application, the visualization tool, <a href="https://heimdall-lite.mitre.org/" target="_blank" rel="noopener noreferrer">Heimdall Lite<ExternalLinkIcon/></a>.</p>
<h3 id="_9-1-upload-results" tabindex="-1"><a class="header-anchor" href="#_9-1-upload-results" aria-hidden="true">#</a> 9.1 Upload Results</h3>
<p>Click on the button <code v-pre>Upload</code> and navigate to your json output file that you saved from your previous step and select that file then click open.</p>
<p>This will allow you to view the InSpec results in the Heimdall viewer.</p>
<figure><img src="@source/assets/img/Heimdall_Load.png" alt="Loading Data Into Heimdall" tabindex="0" loading="lazy"><figcaption>Loading Data Into Heimdall</figcaption></figure>
<h3 id="_9-2-visualize-results" tabindex="-1"><a class="header-anchor" href="#_9-2-visualize-results" aria-hidden="true">#</a> 9.2 Visualize Results</h3>
<p>Your visualization should look similar to the following:</p>
<figure><img src="@source/assets/img/Heimdall_NGINX_Vanilla_With_Inputs.png" alt="Visualizing NGINX" tabindex="0" loading="lazy"><figcaption>Visualizing NGINX</figcaption></figure>
<h3 id="_9-3-explore-heimdall" tabindex="-1"><a class="header-anchor" href="#_9-3-explore-heimdall" aria-hidden="true">#</a> 9.3 Explore Heimdall</h3>
<p>Heimdall can allow you to see a lot of different information based on the available data. See if you can find the following information from your uploaded results!</p>
<details class="hint-container details"><summary>What is the overall compliance level?</summary>
<p>In this example, the overall compliance is 46.77%. As you can see, the compliance formula is written in the GUI. This is the number of passed controls divided by the total passed, failed, not reviewed, and errors. Not Applicable controls are not included in the overall compliance total.</p>
</details>
<details class="hint-container details"><summary>Can you filter to just the failures?</summary>
<p>You can interact with many different icons to filter for the specific results you want to see. For example, you can filter on the status, you can filter from the the severity level, you can filter from the search bar at the top, or you can filter using the tree map as some ways to drill down on a particular category or control. Here is a view of filtering with for failures.<br>
<img src="@source/assets/img/Heimdall_Filter_Failure.png" alt="Filtering on Failed Controls" loading="lazy"></p>
</details>
<details class="hint-container details"><summary>How do you know which NIST 800-53 control is failing?</summary>
<p>How can expand different sections of the NIST SP 800-53 Control Tree Map to see your coverage based on the NIST controls. In this image, the filter on failed controls is still applied, but you can clear that filter to see the overall tree map for your system.<br>
<img src="@source/assets/img/Heimdall_TreeMap_Failures.png" alt="Tree Map Filtered by Failing Controls" loading="lazy"></p>
</details>
<details class="hint-container details"><summary>Can you find the reason for a failure? For example, V-41670?</summary>
<p>As you continue to scroll down, you can see the Results View Data. You can expand the results for a given control to see the individual subcontrols or subtests that were run to test the requirement. If any subtests fail, the control overall will be recorded as a failed control. In this case, we can see that a subtest looking at the permission of the <code v-pre>/var/log/nginx</code> file was more permissive than it should be to meet the security requirements.<br>
<img src="@source/assets/img/Heimdall_V-41670_ResultsDetails.png" alt="Result Details" loading="lazy"></p>
</details>
<details class="hint-container details"><summary>Where can you find information on how to fix a failed control? For example, V-41670?</summary>
<p>You can click on the &quot;Details&quot; or &quot;Code&quot; tab to see more information about how to check or fix a particular control. In this case, the fix text is written as follows:</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>Fix:

To protect the integrity of the data that is being captured in the
  log files, ensure that only the members of the Auditors group, Administrators,
  and the user assigned to run the web server software is granted permissions to
  read the log files.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="@source/assets/img/Heimdall_V-41670_ResultsDetails_Code.png" alt="The Code Tab" tabindex="0" loading="lazy"><figcaption>The Code Tab</figcaption></figure>
</details>
<details class="hint-container details"><summary>How can you see information about the results file, such as the run date or the platform this scan was run on?</summary>
<p>You can view file information by clicking &quot;File Info&quot; on the top of the application where the file name is listed. This can show you things like the platform that this scan was completed on, how long it took, the date of the scan, and more. If you click on the &quot;Inputs&quot; tab, this will show what values were used for different variables in the profile's automated tests. This will show the inputs that we specified in the inputs file, and the default values for any variables that we did not put in the inputs file.<br>
<img src="@source/assets/img/Heimdall_NGINX_Inputs.png" alt="NGINX Profile Inputs in Heimdall" loading="lazy"></p>
</details>
</div></template>


