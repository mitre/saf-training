<template><div><h1 id="differences-between-security-benchmark-code-and-traditional-software-projects" tabindex="-1"><a class="header-anchor" href="#differences-between-security-benchmark-code-and-traditional-software-projects" aria-hidden="true">#</a> Differences Between Security Benchmark Code and Traditional Software Projects</h1>
<p>When planning your team's approach, remember that a Security Benchmark is only considered 'complete and valid' when all requirements for that specific Release or Major Version are met. This differs from traditional software projects where features and capabilities can be incrementally added.</p>
<h1 id="security-benchmarks-are-release-specific" tabindex="-1"><a class="header-anchor" href="#security-benchmarks-are-release-specific" aria-hidden="true">#</a> Security Benchmarks Are Release-Specific</h1>
<p>A Security Benchmark and <em><strong>its corresponding InSpec Profile</strong></em> are only applicable within the context of a specific 'Release' of that Benchmark.</p>
<p>The choice between a <code v-pre>micro</code> or <code v-pre>massive</code> approach depends more on your team's work style preference.</p>
<p>Regardless of the approach, the final release of the Benchmark will be the same. The deciding factors for its readiness for release are the expected thresholds, hardening, and validation results.</p>
<h1 id="main-is-out-of-scope-for-a-benchmark" tabindex="-1"><a class="header-anchor" href="#main-is-out-of-scope-for-a-benchmark" aria-hidden="true">#</a> 'main' is <code v-pre>out of scope</code> for a Benchmark</h1>
<p>Benchmarks do not accommodate 'incremental requirements'. Therefore, your team should always work off a fork of the last release. If there is a 'main' or 'development' branch in your profile, it should be considered as a candidate for merging into the next patch or update release.</p>
</div></template>


