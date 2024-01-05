<template><div><p>When updating Benchmark Profiles, adhere to these key principles to maintain alignment with the original Guidance Documents:</p>
<ol>
<li>
<p><strong>Maintain Version Integrity:</strong> <strong>Never Merge</strong> new requirements into older benchmark branches. This will create a 'mixed baseline' that doesn't align with any specific guidance document. Benchmarks, STIGs, and Guidance Documents form a 'proper subset' - they should be treated as 'all or nothing'. Mixing requirements from different versions can invalidate the concept of 'testing to a known benchmark'.</p>
</li>
<li>
<p><strong>Benchmarks are a Complete Set of Requirements:</strong> A Security Benchmark is 'complete and valid' only when all requirements for a specific Release or Major Version are met. Unlike traditional software projects, features and capabilities cannot be incrementally added. A Security Benchmark and its corresponding InSpec Profile are valid only within the scope of a specific 'Release' of that Benchmark.</p>
</li>
<li>
<p><strong>Release Readiness Is Predefined:</strong> A Benchmark is considered 'ready for release' when it meets the expected thresholds, hardening, and validation results. Don't be overwhelmed by the multitude of changes across the files. Instead, focus on the specific requirement you are working on. Understand its expected failure and success states on each of the target testing platforms. This approach prevents you from being overwhelmed and provides solid pivot points as you work through the implementation of the automated tests for each requirement and its 'contexts'.</p>
</li>
<li>
<p><strong>Use Vendor-Managed Standard Releases:</strong> When setting up a test suite, prioritize using vendor-managed standard releases for software installations and baseline configurations. This should be the starting point for both 'vanilla' and 'hardening' workflows. This approach ensures that your initial and ongoing testing, hardening, and validation closely mirror the real-world usage scenarios of your end-users.</p>
</li>
</ol>
<p>By adhering to these principles, you ensure that your updates to Benchmark Profiles are consistent, accurate, and aligned with the original guidance documents.</p>
</div></template>


