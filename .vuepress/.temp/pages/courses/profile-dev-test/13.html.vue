<template><div><p>A <code v-pre>Major Version Update</code> involves transitioning to a new STIG Benchmark, which introduces a new Rule ID index. This process is more complex than a <code v-pre>Release Update</code> due to the need for aligning old requirements (Rule IDs) with the new ones.</p>
<p>For example, when transitioning from RedHat Enterprise Linux 8 v1R12 to Red Hat Enterprise Linux 9 V1R1, the alignment of InSpec tests to the new requirements must be <code v-pre>fuzzy matched</code>. This involves using common identifiers such as <code v-pre>SRG ID</code>, <code v-pre>CCIs</code>, and, if necessary, the <code v-pre>title</code> and <code v-pre>descriptions</code>.</p>
<p>This is crucial when a single requirement from the old benchmark is split into multiple requirements in the new benchmark, although this is usually a rare occurrence.</p>
<p>We use a similar process in our <a href="https://vulcan.mitre.org" target="_blank" rel="noopener noreferrer">MITRE Vulcan<ExternalLinkIcon/></a> to align 'Related Controls' in your Vulcan project to existing published STIG documents. However, the <code v-pre>Delta</code> tool currently requires manual intervention, and improvements are needed to automate this process.</p>
<p>The good news is that <strong>these improvements are within reach</strong>. We can leverage the existing work from <code v-pre>Vulcan</code> and hopefully soon incorporate these improvements into the SAF <code v-pre>Delta</code> tool as a direct function.</p>
<p>Once the 'old controls' and 'new controls' are aligned across 'Rule IDs', you can migrate the InSpec / Ruby code into their respective places.</p>
<p>Then, you follow the same setup, CI/CD organization, and control update process as in the <code v-pre>Release Update</code> process and hopfully finding that the actual InSpec code from the previous benchmark is very close to the needed InSpec code for the same 'requirement' in the new Benchmark.</p>
</div></template>


