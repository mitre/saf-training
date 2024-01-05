<template><div><p>The repository and profile are organized into two primary branches: <code v-pre>main</code> and <code v-pre>TBD</code>. The repository has a set of <code v-pre>tags</code> representing iterative releases of the STIG from one Benchmark major version to the next. It also has a set of releases for fixes and updates to the profile between STIG Benchmark Releases.</p>
<h2 id="branches" tabindex="-1"><a class="header-anchor" href="#branches" aria-hidden="true">#</a> Branches</h2>
<h3 id="main-branch" tabindex="-1"><a class="header-anchor" href="#main-branch" aria-hidden="true">#</a> <code v-pre>main</code> branch</h3>
<p>The <code v-pre>main</code> branch contains the most recent code for the profile. It may include bugs and is typically aligned with the latest patch release for the profile. This branch is primarily used for development and testing workflows for the various testing targets. For production validation, use the latest stable patch release.</p>
<h3 id="v-x-r-xx-branches" tabindex="-1"><a class="header-anchor" href="#v-x-r-xx-branches" aria-hidden="true">#</a> <code v-pre>v{x}r{xx}</code> branches</h3>
<p>The <code v-pre>v{x}r{xx}</code> branches represent the changes between releases of the benchmark. They align with the STIG releases for the Benchmark found at the DISA STIG <a href="https://public.cyber.mil/stigs/downloads/" target="_blank" rel="noopener noreferrer">Document Library<ExternalLinkIcon/></a>.</p>
<h2 id="releases" tabindex="-1"><a class="header-anchor" href="#releases" aria-hidden="true">#</a> Releases</h2>
<p>Releases use Semantic Versioning (SemVer), aligning with the STIG Benchmark versioning system of Major Version and Release. The SemVer patch number is used for updates, bug fixes, and code changes between STIG Benchmark Releases for the given product. STIG Benchmarks use a Version and Release tagging pattern <code v-pre>v{x}r{xx}</code> - like V1R12 - and we mirror that pattern in our SemVer releases.</p>
<h2 id="tags" tabindex="-1"><a class="header-anchor" href="#tags" aria-hidden="true">#</a> Tags</h2>
<h3 id="current-tag" tabindex="-1"><a class="header-anchor" href="#current-tag" aria-hidden="true">#</a> Current Tag</h3>
<p>We don't use a specific <code v-pre>current</code> or <code v-pre>latest</code> tag. The <code v-pre>current</code>/<code v-pre>latest</code> tag for the profile and repository will always be the latest major tag of the benchmark. For example, if <code v-pre>v1.12.3</code> is the latest Benchmark release from the STIG author, then the tag <code v-pre>v1.12</code> will point to the <code v-pre>v1.12.3</code> release of the code.</p>
<p>To use the current <code v-pre>main</code>, point directly to the GitHub repo.</p>
<h3 id="major-tags" tabindex="-1"><a class="header-anchor" href="#major-tags" aria-hidden="true">#</a> Major Tags</h3>
<p>Major tags point to the latest patch release of the benchmark. For example, <code v-pre>v1.3</code> and <code v-pre>v1.3.0</code> represent the first release of the Red Hat Enterprise Linux 8 STIG V1R3 Benchmark. The <code v-pre>v1.12.xx</code> tag(s) would represent the V1R12 Benchmark releases as we find bugs, fixes, or general improvements to the testing profile. This tag will point to its <code v-pre>v{x}r{xx}</code> counterpart.</p>
<h3 id="patch-releases" tabindex="-1"><a class="header-anchor" href="#patch-releases" aria-hidden="true">#</a> Patch Releases</h3>
<p>The latest patch release always points to the major release for the profile.</p>
<p>For example, after releasing <code v-pre>v1.12.0</code>, we will point <code v-pre>v1.12</code> to that patch release: <code v-pre>v1.12.0</code>. When an issue is found, we will fix, tag, and release <code v-pre>v1.12.1</code>. We will then 'move' the <code v-pre>v1.12</code> tag so that it points to tag <code v-pre>v1.12.1</code>. This way, your pipelines can choose if they want to pin on a specific release of the InSpec profile or always run 'current'.</p>
</div></template>


