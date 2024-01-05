<template><div><h1 id="background-and-definitions" tabindex="-1"><a class="header-anchor" href="#background-and-definitions" aria-hidden="true">#</a> Background and Definitions</h1>
<h2 id="background" tabindex="-1"><a class="header-anchor" href="#background" aria-hidden="true">#</a> Background</h2>
<h3 id="evolution-of-stigs-and-security-benchmarks" tabindex="-1"><a class="header-anchor" href="#evolution-of-stigs-and-security-benchmarks" aria-hidden="true">#</a> Evolution of STIGs and Security Benchmarks</h3>
<p>The Department of Defense (DOD) has continually updated its databases that track rules and Security Technical Implementation Guides (STIGs) that house those rules.</p>
<p>Initially, the system was known as the Vulnerability Management System (VMS).</p>
<p>In the STIGs, you might come across data elements that are remnants from these iterations. These include <code v-pre>Group Title</code> (gid or gtitle), <code v-pre>Vulnerability ID</code> (VulnID), <code v-pre>Rule ID</code> (rule_id), <code v-pre>STIG ID</code> (stig_id), and others.</p>
<p>A significant change was the shift from using <code v-pre>STIG ID</code> to <code v-pre>Rule ID</code> in many security scanning tools. This change occurred because the Vulnerability Management System used the STIG_ID as the primary index for the requirements in each Benchmark in VMS.</p>
<p>However, when DISA updated the Vendor STIG Processes and replaced the VMS, they decided to migrate the primary ID from the STIG ID to the Rule ID, tracking changes in the Rules as described above.</p>
<p>Examples of tools that still use either fully or in part the 'STIG ID' vs the 'Rule ID' as a primary index are: the DISA STIG Viewer, Nessus Audit Scans, and Open SCAP client.</p>
<p>While these elements might seem confusing, understanding their historical context is essential.</p>
<p>In our modern profiles, some data from the XCCDF Benchmarks still exist in the document but are not used or rendered in the modern InSpec Profiles. However, in some of the older profiles, you may see many of these data elements as <code v-pre>tags</code> in the profile. The intention was to ensure easy and lossless conversion between XCCDF Benchmark and HDF Profile.</p>
<p>It was later realized that since the structure of these data elements was 'static', they could be easily reintroduced when converting back to an XCCDF Benchmark. Therefore, rendering them in the profile was deemed unnecessary.</p>
</div></template>


