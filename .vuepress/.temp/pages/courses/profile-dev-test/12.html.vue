<template><div><p>A <code v-pre>Release Update</code> involves creating a new branch, <code v-pre>v#{x}R#{x+1}</code>, from the current main or latest patch release branch. The <code v-pre>saf generate delta</code> workflow is then run, which updates the metadata of the <code v-pre>controls</code>, <code v-pre>inspec.yml</code>, <code v-pre>README.md</code>, and other profile elements, while preserving the <code v-pre>describe</code> and <code v-pre>ruby code logic</code>. This workflow is detailed in the <a href="#2-inspec-delta">Inspec Delta</a> section. After the initial commit of the new release branch, follow these steps to keep your work organized:</p>
<ol>
<li><strong>Track Control IDs:</strong> Create a table of all new <code v-pre>control ids</code> in the updated benchmark. This can be in CSV, Markdown Table, or in the PR overview information section. This helps track completed and pending work. PRs off the <code v-pre>v#{x}r#{x+1}</code> can also be linked in the table, especially if using a <code v-pre>micro</code> vs <code v-pre>massive</code> PR approach.</li>
<li><strong>Ensure Consistency:</strong> Add 'check box columns' to your tracking table to ensure each requirement of the updated Benchmark receives the same level of scrutiny.</li>
<li><strong>Update CI/CD Process:</strong> Update elements such as the <code v-pre>hardening</code> content (ansible, puppet, chef, hardened docker images, hardened vagrant boxes) to meet new requirements. Ensure the CI/CD process still functions with the updated elements, preferably on the PR as well.</li>
<li><strong>Update Labels:</strong> Update <code v-pre>titles</code> and other labels to reflect the updated release number of the Benchmark.</li>
<li><strong>Commit Changes:</strong> Commit these changes to your release branch, ensuring your CI/CD process exits cleanly.</li>
<li><strong>Follow Patch Update Workflow:</strong> With the above in place, follow the 'Patch Update' process, but expect a larger number of requirements to revalidate or update.</li>
<li><strong>Identify Potential Code Changes:</strong> Controls with changes to the <code v-pre>check text</code> or <code v-pre>fix text</code> are likely to require <code v-pre>inspec code changes</code>. If the <code v-pre>check text</code> and <code v-pre>fix text</code> of a control remain unchanged, it's likely only a cosmetic update, with no change in the security requirement or validation code.</li>
</ol>
</div></template>


