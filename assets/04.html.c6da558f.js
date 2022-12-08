import{_ as l}from"./plugin-vue_export-helper.21dcd24c.js";import{r as t,o,c,a as n,b as a,F as r,e as s,d as i}from"./app.3b4d192a.js";const d={},u=n("h2",{id:"_4-saf-cli",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#_4-saf-cli","aria-hidden":"true"},"#"),s(" 4. SAF CLI")],-1),p=s("The SAF supports tools that can help you automate your security validation. This includes the "),m={href:"https://saf-cli.mitre.org/",target:"_blank",rel:"noopener noreferrer"},v=s("SAF CLI tool"),h=s("."),b=i(`<p>If you are working in the course development lab environment, this tool is provided for you. If not, reference the page for installation guidance.</p><p>To update the SAF CLI version with <code>npm</code>, run:</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">npm</span> update -g @mitre/saf
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_4-1-saf-cli-capability" tabindex="-1"><a class="header-anchor" href="#_4-1-saf-cli-capability" aria-hidden="true">#</a> 4.1. SAF CLI Capability</h3><p>In addition to the documentation site, you can view the SAF CLI capabilities by running:</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>saf <span class="token builtin class-name">help</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>This will output:</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>The MITRE Security Automation Framework <span class="token punctuation">(</span>SAF<span class="token punctuation">)</span> Command Line Interface <span class="token punctuation">(</span>CLI<span class="token punctuation">)</span> brings together applications, techniques, libraries, and tools developed by MITRE and the security community to streamline security automation <span class="token keyword">for</span> systems and DevOps pipelines

VERSION
  @mitre/saf/1.1.10 linux-x64 node-v16.14.2

USAGE
  $ saf <span class="token punctuation">[</span>COMMAND<span class="token punctuation">]</span>

TOPICS
  convert   <span class="token punctuation">[</span>Normalize<span class="token punctuation">]</span>    Convert security results from all your security tools between common data formats
  generate  <span class="token punctuation">[</span>Validate<span class="token punctuation">]</span>     Set pipeline thresholds
  harden    <span class="token punctuation">[</span>Harden<span class="token punctuation">]</span>       Implement security baselines using Ansible, Chef, and Terraform content: Visit
            https://saf.mitre.org/<span class="token comment">#/harden to explore and run hardening scripts</span>
  plugins   List installed plugins.
  scan      <span class="token punctuation">[</span>Validate<span class="token punctuation">]</span>     Scan to get detailed security testing results: Visit https://saf.mitre.org/<span class="token comment">#/validate to explore and run inspec profiles</span>
  validate  <span class="token punctuation">[</span>Validate<span class="token punctuation">]</span>     Verify pipeline thresholds
  view      <span class="token punctuation">[</span>Visualize<span class="token punctuation">]</span>    Identify overall security status and deep-dive to solve specific security defects

COMMANDS
  convert ckl2poam  Translate DISA Checklist CKL file<span class="token punctuation">(</span>s<span class="token punctuation">)</span> to POA<span class="token operator">&amp;</span>M files
  harden            Visit https://saf.mitre.org/<span class="token comment">#/harden to explore and run hardening scripts</span>
  heimdall          Run an instance of Heimdall Lite to visualize your Data
  <span class="token builtin class-name">help</span>              Display <span class="token builtin class-name">help</span> <span class="token keyword">for</span> saf.
  plugins           List installed plugins.
  scan              Visit https://saf.mitre.org/<span class="token comment">#/validate to explore and run inspec profiles</span>
  summary           Get a quick compliance overview of an HDF <span class="token function">file</span>
  version
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>You can get more information on a specific topic by running:</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>saf <span class="token punctuation">[</span>TOPIC<span class="token punctuation">]</span> -h
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_4-2-view-summary-of-results" tabindex="-1"><a class="header-anchor" href="#_4-2-view-summary-of-results" aria-hidden="true">#</a> 4.2. View Summary of Results</h3><p>Let&#39;s try out using the SAF CLI to understand our InSpec scan results.</p><p>You can view a summary of the results by running:</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>saf view summary -i path/to/output.json
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>This will show the high level information about the test results:</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>- profileName: my_nginx
  resultSets:
    - output.json
  compliance: <span class="token number">67</span>
  passed:
    critical: <span class="token number">2</span>
    high: <span class="token number">0</span>
    medium: <span class="token number">0</span>
    low: <span class="token number">0</span>
    total: <span class="token number">2</span>
  failed:
    critical: <span class="token number">1</span>
    high: <span class="token number">0</span>
    medium: <span class="token number">0</span>
    low: <span class="token number">0</span>
    total: <span class="token number">1</span>
  skipped:
    critical: <span class="token number">0</span>
    high: <span class="token number">0</span>
    medium: <span class="token number">0</span>
    low: <span class="token number">0</span>
    total: <span class="token number">0</span>
  error:
    critical: <span class="token number">0</span>
    high: <span class="token number">0</span>
    medium: <span class="token number">0</span>
    low: <span class="token number">0</span>
    total: <span class="token number">0</span>
  no_impact:
    none: <span class="token number">0</span>
    total: <span class="token number">0</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_4-3-validate-results-against-a-threshold" tabindex="-1"><a class="header-anchor" href="#_4-3-validate-results-against-a-threshold" aria-hidden="true">#</a> 4.3. Validate Results Against a Threshold</h3><p>We can also generate a threshold for the results to be validated against. We will later see how this can be helpful in automated testing pipelines to indicate whether the pipeline should be considered a failure or a success.</p><p>Create a new file in your <code>my_nginx</code> folder to specify the thresholds for acceptable test results.These file contents specify some basic thresholds, such as the minimum compliance level, minimum number of tests passed, and maximum number of tests failed.</p><div class="language-yaml ext-yml line-numbers-mode"><pre class="language-yaml"><code><span class="token comment"># threshold.yml file</span>
<span class="token key atrule">compliance</span><span class="token punctuation">:</span>
  <span class="token key atrule">min</span><span class="token punctuation">:</span> <span class="token number">50</span>
<span class="token key atrule">passed</span><span class="token punctuation">:</span>
  <span class="token key atrule">total</span><span class="token punctuation">:</span>
    <span class="token key atrule">min</span><span class="token punctuation">:</span> <span class="token number">1</span>
<span class="token key atrule">failed</span><span class="token punctuation">:</span>
  <span class="token key atrule">total</span><span class="token punctuation">:</span>
    <span class="token key atrule">max</span><span class="token punctuation">:</span> <span class="token number">2</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,20),k={class:"custom-container info"},g=n("p",{class:"custom-container-title"},"Threshold Files",-1),f=s("To make more specific or detailed thresholds, check out "),y={href:"https://github.com/mitre/saf/wiki/Validation-with-Thresholds",target:"_blank",rel:"noopener noreferrer"},_=s("this documentation on generating theshold files"),x=s("."),w=i(`<p>Now, validate the InSpec results against this threshold by running:</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>saf validate threshold -i output.json -F threshold.yml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>This should result in:</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>All validation tests passed
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>If you try changing the threshold values to be more strict, you can see failing results. For example, update the threshold file like this:</p><div class="language-yaml ext-yml line-numbers-mode"><pre class="language-yaml"><code><span class="token comment"># threshold.yml file</span>
<span class="token key atrule">compliance</span><span class="token punctuation">:</span>
  <span class="token key atrule">min</span><span class="token punctuation">:</span> <span class="token number">50</span>
<span class="token key atrule">passed</span><span class="token punctuation">:</span>
  <span class="token key atrule">total</span><span class="token punctuation">:</span>
    <span class="token key atrule">min</span><span class="token punctuation">:</span> <span class="token number">1</span>
<span class="token key atrule">failed</span><span class="token punctuation">:</span>
  <span class="token key atrule">total</span><span class="token punctuation">:</span>
    <span class="token key atrule">max</span><span class="token punctuation">:</span> <span class="token number">0</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>To receive this output:</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>Error: failed.total.max: Received <span class="token number">1</span> <span class="token operator">&gt;</span> Expected <span class="token number">0</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="custom-container tip"><p class="custom-container-title">Using Threshold Files for Automation</p><p>Threshold files are used in CI to ensure minimum compliance levels and validate control severities and statuses using the saf validate threshold command.</p></div>`,9);function I(T,S){const e=t("ExternalLinkIcon");return o(),c(r,null,[u,n("p",null,[p,n("a",m,[v,a(e)]),h]),b,n("div",k,[g,n("p",null,[f,n("a",y,[_,a(e)]),x])]),w],64)}var V=l(d,[["render",I],["__file","04.html.vue"]]);export{V as default};
