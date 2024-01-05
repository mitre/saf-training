<template><div><h2 id="profile-dependencies-overlays" tabindex="-1"><a class="header-anchor" href="#profile-dependencies-overlays" aria-hidden="true">#</a> Profile Dependencies (Overlays)</h2>
<p>In addition to its own controls, an InSpec profile can leverage controls from one or more other InSpec profiles.</p>
<p>When a profile depends on controls from other profiles, it can be referred to as an &quot;overlay&quot; or &quot;wrapper&quot; profile. We'll use the term overlay profile in this section.</p>
<p>An overlay can include all, select specific, skip some, or modify controls it uses from the profiles it is depending on.</p>
<div class="language-flow line-numbers-mode" data-ext="flow"><pre v-pre class="language-flow"><code>overlay<span class="token operator">=></span>operation<span class="token operator">:</span> my_nginx_overlay
e<span class="token operator">=></span>end<span class="token operator">:</span> my_nginx

e<span class="token operator">-</span><span class="token operator">></span>overlay
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>To recap, here are the controls that are in the <code v-pre>my_nginx</code> profile:</p>
<div class="language-ruby line-numbers-mode" data-ext="rb"><pre v-pre class="language-ruby"><code>control <span class="token string-literal"><span class="token string">'nginx-version'</span></span> <span class="token keyword">do</span>
  impact <span class="token number">1.0</span>
  title <span class="token string-literal"><span class="token string">'NGINX version'</span></span>
  desc <span class="token string-literal"><span class="token string">'The required version of NGINX should be installed.'</span></span>
  describe nginx <span class="token keyword">do</span>
    its<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'version'</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span> should cmp <span class="token operator">>=</span> input<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'nginx_version'</span></span><span class="token punctuation">)</span> <span class="token punctuation">}</span>
  <span class="token keyword">end</span>
<span class="token keyword">end</span>

control <span class="token string-literal"><span class="token string">'nginx-modules'</span></span> <span class="token keyword">do</span>
  impact <span class="token number">1.0</span>
  title <span class="token string-literal"><span class="token string">'NGINX modules'</span></span>
  desc <span class="token string-literal"><span class="token string">'The required NGINX modules should be installed.'</span></span>
  required_modules <span class="token operator">=</span> input<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'nginx_modules'</span></span><span class="token punctuation">)</span>
  describe nginx <span class="token keyword">do</span>
    required_modules<span class="token punctuation">.</span><span class="token keyword">each</span> <span class="token keyword">do</span> <span class="token operator">|</span>required_module<span class="token operator">|</span>
      its<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'modules'</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span> should <span class="token keyword">include</span> required_module <span class="token punctuation">}</span>
    <span class="token keyword">end</span>
  <span class="token keyword">end</span>
<span class="token keyword">end</span>

control <span class="token string-literal"><span class="token string">'nginx-conf-file'</span></span> <span class="token keyword">do</span>
  impact <span class="token number">1.0</span>
  title <span class="token string-literal"><span class="token string">'NGINX configuration file'</span></span>
  desc <span class="token string-literal"><span class="token string">'The NGINX config file should exist.'</span></span>
  describe file<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'/etc/nginx/nginx.conf'</span></span><span class="token punctuation">)</span> <span class="token keyword">do</span>
    it <span class="token punctuation">{</span> should be_file <span class="token punctuation">}</span>
  <span class="token keyword">end</span>
<span class="token keyword">end</span>

control <span class="token string-literal"><span class="token string">'nginx-conf-perms'</span></span> <span class="token keyword">do</span>
  impact <span class="token number">1.0</span>
  title <span class="token string-literal"><span class="token string">'NGINX configuration permissions'</span></span>
  desc <span class="token string-literal"><span class="token string">'The NGINX config file should owned by root, be writable only by owner, and not writeable or and readable by others.'</span></span>
  describe file<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'/etc/nginx/nginx.conf'</span></span><span class="token punctuation">)</span> <span class="token keyword">do</span>
    it <span class="token punctuation">{</span> should be_owned_by <span class="token string-literal"><span class="token string">'root'</span></span> <span class="token punctuation">}</span>
    it <span class="token punctuation">{</span> should be_grouped_into <span class="token string-literal"><span class="token string">'root'</span></span> <span class="token punctuation">}</span>
    it <span class="token punctuation">{</span> should_not be_readable<span class="token punctuation">.</span>by<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'others'</span></span><span class="token punctuation">)</span> <span class="token punctuation">}</span>
    it <span class="token punctuation">{</span> should_not be_writable<span class="token punctuation">.</span>by<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'others'</span></span><span class="token punctuation">)</span> <span class="token punctuation">}</span>
    it <span class="token punctuation">{</span> should_not be_executable<span class="token punctuation">.</span>by<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'others'</span></span><span class="token punctuation">)</span> <span class="token punctuation">}</span>
  <span class="token keyword">end</span>
<span class="token keyword">end</span>

control <span class="token string-literal"><span class="token string">'nginx-shell-access'</span></span> <span class="token keyword">do</span>
  impact <span class="token number">1.0</span>
  title <span class="token string-literal"><span class="token string">'NGINX shell access'</span></span>
  desc <span class="token string-literal"><span class="token string">'The NGINX shell access should be restricted to admin users.'</span></span>
  describe users<span class="token punctuation">.</span>shells<span class="token punctuation">(</span><span class="token regex-literal"><span class="token regex">/bash/</span></span><span class="token punctuation">)</span><span class="token punctuation">.</span>usernames <span class="token keyword">do</span>
    it <span class="token punctuation">{</span> should be_in input<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'admin_users'</span></span><span class="token punctuation">)</span><span class="token punctuation">}</span>
  <span class="token keyword">end</span>
<span class="token keyword">end</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr>
<h3 id="creating-the-overlay" tabindex="-1"><a class="header-anchor" href="#creating-the-overlay" aria-hidden="true">#</a> Creating the Overlay</h3>
<h4 id="mini-quiz-do-you-remember-how-to-initialize-a-profile" tabindex="-1"><a class="header-anchor" href="#mini-quiz-do-you-remember-how-to-initialize-a-profile" aria-hidden="true">#</a> Mini Quiz: Do you remember how to initialize a profile?</h4>
<details class="hint-container details"><summary>How to initialize the overlay</summary>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>inspec init profile my_nginx_overlay
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>The terminal output should look like the following:</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>Create new profile at /<span class="token operator">&lt;</span>pwd<span class="token operator">></span>/my_nginx_overlay
 * Create directory controls
 * Create <span class="token function">file</span> controls/example.rb
 * Create <span class="token function">file</span> inspec.yml
 * Create <span class="token function">file</span> README.md
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details>
<p>In this example, we will rename the <code v-pre>example.rb</code> to <code v-pre>overlay.rb</code> to avoid confusion.</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>tree my_nginx_overlay
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>Which should look like:</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>      my_nginx_overlay
      ├── README.md
      ├── controls
      │   └── overlay.rb
      └── inspec.yml

      <span class="token number">1</span> directory, <span class="token number">3</span> files
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="defining-the-profile-dependency" tabindex="-1"><a class="header-anchor" href="#defining-the-profile-dependency" aria-hidden="true">#</a> Defining the Profile Dependency</h3>
<p>For a profile to use controls from another profile, the dependency needs to be included in the <code v-pre>depends</code> section of the overlay's <code v-pre>inspec.yml</code> file. For example, you can develop <code v-pre>my_nginx_overlay</code> that uses controls from the <code v-pre>my_nginx</code> profile. In this case, the <code v-pre>depends</code> section of <code v-pre>inspec.yml</code> of <code v-pre>my_nginx_overlay</code> should list the name and location of <code v-pre>my_nginx</code>. One way of declaring the dependency is:</p>
<CodeTabs id="45" :data='[{"id":"my_nginx_overlay/inspec.yml"}]'>
<template #title0="{ value, isActive }">my_nginx_overlay/inspec.yml</template>
<template #tab0="{ value, isActive }">
<div class="language-yaml line-numbers-mode" data-ext="yml"><pre v-pre class="language-yaml"><code><span class="token key atrule">name</span><span class="token punctuation">:</span> my_nginx_overlay
<span class="token comment"># Metadata</span>

<span class="token key atrule">depends</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> my_nginx
    <span class="token key atrule">path</span><span class="token punctuation">:</span> ../my_nginx <span class="token comment"># {path relative to the overlay}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></template>
</CodeTabs>
<p>Once defined in the <code v-pre>inspec.yml</code> file, controls from the included profiles can be used!</p>
<div class="hint-container info">
<p class="hint-container-title">More dependency info</p>
<p>Note that a dependency definition can lead to an HTTP/S path or a .git link, just like how <code v-pre>inspec exec</code> can reference profiles that live on the network.</p>
<p>See the docs' <a href="https://www.inspec.io/docs/reference/profiles/#sts=Profile%20Dependencies" target="_blank" rel="noopener noreferrer">Profile Dependencies<ExternalLinkIcon/></a> section for details.</p>
</div>
<h3 id="including-all-controls" tabindex="-1"><a class="header-anchor" href="#including-all-controls" aria-hidden="true">#</a> Including All Controls</h3>
<p>After defining the dependency in the <code v-pre>inspec.yml</code> of <code v-pre>my_nginx_overlay</code>, controls from <code v-pre>my_nginx</code> are available to be used in the overlay. By using <code v-pre>include_controls &lt;profile&gt;</code> in the <code v-pre>overlay.rb</code> of the overlay profile, all controls from the named profile will be executed every time the overlay is executed. Below you can see an example of an <code v-pre>overlay.rb</code> file in the <code v-pre>controls</code> folder of the overlay.</p>
<CodeTabs id="67" :data='[{"id":"my_nginx_overlay/controls/overlay.rb"}]'>
<template #title0="{ value, isActive }">my_nginx_overlay/controls/overlay.rb</template>
<template #tab0="{ value, isActive }">
<div class="language-ruby line-numbers-mode" data-ext="rb"><pre v-pre class="language-ruby"><code>include_controls <span class="token string-literal"><span class="token string">'my_nginx'</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></template>
</CodeTabs>
<p>In the example above, every time <code v-pre>my_nginx_overlay</code> profile is executed, all the controls from <code v-pre>my_nginx</code> profile are also executed. Therefore, the following controls would be executed for <code v-pre>my_nginx_overlay</code>:</p>
<table>
<thead>
<tr>
<th>Controls</th>
<th>Executed</th>
</tr>
</thead>
<tbody>
<tr>
<td>nginx-version</td>
<td>✓</td>
</tr>
<tr>
<td>nginx-modules</td>
<td>✓</td>
</tr>
<tr>
<td>nginx-conf-file</td>
<td>✓</td>
</tr>
<tr>
<td>nginx-conf-perms</td>
<td>✓</td>
</tr>
<tr>
<td>nginx-shell-access</td>
<td>✓</td>
</tr>
</tbody>
</table>
<h3 id="skipping-a-control" tabindex="-1"><a class="header-anchor" href="#skipping-a-control" aria-hidden="true">#</a> Skipping a Control</h3>
<p>What if you don't want to run one of the controls from the included profile? Luckily, it is not necessary to maintain a slightly-modified copy of the included profile just to delete a control. The <code v-pre>skip_control</code> command tells InSpec not to run a particular control.</p>
<CodeTabs id="135" :data='[{"id":"my_nginx_overlay/controls/overlay.rb"}]'>
<template #title0="{ value, isActive }">my_nginx_overlay/controls/overlay.rb</template>
<template #tab0="{ value, isActive }">
<div class="language-ruby line-numbers-mode" data-ext="rb"><pre v-pre class="language-ruby"><code>include_controls <span class="token string-literal"><span class="token string">'my_nginx'</span></span> <span class="token keyword">do</span>
  skip_control <span class="token string-literal"><span class="token string">'nginx-conf-perms'</span></span>
<span class="token keyword">end</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></template>
</CodeTabs>
<p>In the above example, all controls from <code v-pre>my_nginx</code> profile will be executed, <strong>except</strong> for control <code v-pre>nginx-conf-perms</code>, every time <code v-pre>my_nginx_overlay</code> is executed. Therefore, the following controls will be executed for <code v-pre>my_nginx_overlay</code>:</p>
<table>
<thead>
<tr>
<th>Controls</th>
<th>Executed</th>
</tr>
</thead>
<tbody>
<tr>
<td>nginx-version</td>
<td>✓</td>
</tr>
<tr>
<td>nginx-modules</td>
<td>✓</td>
</tr>
<tr>
<td>nginx-conf-file</td>
<td>✓</td>
</tr>
<tr>
<td>nginx-conf-perms</td>
<td>✗</td>
</tr>
<tr>
<td>nginx-shell-access</td>
<td>✓</td>
</tr>
</tbody>
</table>
<h3 id="selectively-including-controls" tabindex="-1"><a class="header-anchor" href="#selectively-including-controls" aria-hidden="true">#</a> Selectively Including Controls</h3>
<p>If there are only a handful of controls that should be executed from an included profile, it’s not necessary to skip all the unneeded controls, or worse, copy/paste those controls bit-for-bit into your profile<sup class="footnote-ref"><a href="#footnote1">[1]</a><a class="footnote-anchor" id="footnote-ref1" /></sup>. Instead, use the <code v-pre>require_controls</code> command.</p>
<CodeTabs id="203" :data='[{"id":"my_nginx_overlay/controls/overlay.rb"}]'>
<template #title0="{ value, isActive }">my_nginx_overlay/controls/overlay.rb</template>
<template #tab0="{ value, isActive }">
<div class="language-ruby line-numbers-mode" data-ext="rb"><pre v-pre class="language-ruby"><code>require_controls <span class="token string-literal"><span class="token string">'my_nginx'</span></span> <span class="token keyword">do</span>
  control <span class="token string-literal"><span class="token string">'nginx-version'</span></span>
  control <span class="token string-literal"><span class="token string">'nginx-modules'</span></span>
<span class="token keyword">end</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></template>
</CodeTabs>
<p>Whenever <code v-pre>my_nginx_overlay</code> is executed, it will run only the controls from <code v-pre>my_nginx</code> that are specified in the <code v-pre>require_controls</code> block. In the case, the following controls would be executed:</p>
<table>
<thead>
<tr>
<th>Controls</th>
<th>Executed</th>
</tr>
</thead>
<tbody>
<tr>
<td>nginx-version</td>
<td>✓</td>
</tr>
<tr>
<td>nginx-modules</td>
<td>✓</td>
</tr>
<tr>
<td>nginx-conf-file</td>
<td>✗</td>
</tr>
<tr>
<td>nginx-conf-perms</td>
<td>✗</td>
</tr>
<tr>
<td>nginx-shell-access</td>
<td>✗</td>
</tr>
</tbody>
</table>
<p>Controls <code v-pre>nginx-conf-file</code>, <code v-pre>nginx-conf-perms</code>, and <code v-pre>nginx-shell-access</code> would not be executed, just as if they were manually skipped. This method of including specific controls ensures only the controls specified are executed.</p>
<div class="hint-container warning">
<p class="hint-container-title">Warning</p>
<p>If new controls are added to a later version of <code v-pre>my_nginx</code>, they would not be executed unless explicitly required in this scenario.</p>
</div>
<h3 id="modifying-a-control" tabindex="-1"><a class="header-anchor" href="#modifying-a-control" aria-hidden="true">#</a> Modifying a Control</h3>
<p>Let’s say a particular control from an included profile should still run, but the impact level set in the control isn’t appropriate. When a control is included or required, it can also be modified!</p>
<CodeTabs id="279" :data='[{"id":"include_controls"},{"id":"require_controls"}]'>
<template #title0="{ value, isActive }">include_controls</template>
<template #title1="{ value, isActive }">require_controls</template>
<template #tab0="{ value, isActive }">
<div class="language-ruby line-numbers-mode" data-ext="rb"><pre v-pre class="language-ruby"><code>include_controls <span class="token string-literal"><span class="token string">'my_nginx'</span></span> <span class="token keyword">do</span>
  control <span class="token string-literal"><span class="token string">'nginx-modules'</span></span> <span class="token keyword">do</span>
    impact <span class="token number">0.5</span>
  <span class="token keyword">end</span>
<span class="token keyword">end</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></template>
<template #tab1="{ value, isActive }">
<div class="language-ruby line-numbers-mode" data-ext="rb"><pre v-pre class="language-ruby"><code>require_controls <span class="token string-literal"><span class="token string">'my_nginx'</span></span> <span class="token keyword">do</span>
  control <span class="token string-literal"><span class="token string">'nginx-modules'</span></span> <span class="token keyword">do</span>
    impact <span class="token number">0.5</span>
  <span class="token keyword">end</span>
  control <span class="token string-literal"><span class="token string">'nginx-conf-file'</span></span>
<span class="token keyword">end</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></template>
</CodeTabs>
<p>In the above example, all included or required controls from <code v-pre>my_nginx</code> profile are executed. However, should control <code v-pre>nginx-modules</code> fail, it will be raised with an impact of <code v-pre>0.5</code> instead of the originally-intended impact of <code v-pre>1.0</code>.</p>
<div class="hint-container note">
<p class="hint-container-title">Note</p>
<p>Any fields that you <em>do not</em> explicitly modify in an included control will not be changed from the baseline.</p>
<p>Therefore, you can import a control and only override a single field like the <code v-pre>impact</code> while leaving the actual control code and the rest of the metadata tags untouched.</p>
</div>
<h3 id="additional-examples" tabindex="-1"><a class="header-anchor" href="#additional-examples" aria-hidden="true">#</a> Additional Examples</h3>
<p>Let's poke around a few more examples of inheritance.</p>
<ul>
<li><a href="https://github.com/mitre/helloworld-web-baseline" target="_blank" rel="noopener noreferrer">Sample Hello World Web <ExternalLinkIcon/></a></li>
<li><a href="https://github.com/mitre/sample-rhel8-overlay" target="_blank" rel="noopener noreferrer">Sample RHEL8 Overlay <ExternalLinkIcon/></a></li>
<li><a href="https://github.com/mitre/sample-mysql-overlay" target="_blank" rel="noopener noreferrer">Sample MySQL Overlay <ExternalLinkIcon/></a></li>
<li><a href="https://github.com/mitre/aws-rds-oracle-database-19c-cis-baseline" target="_blank" rel="noopener noreferrer">AWS RDS Oracle 19c <ExternalLinkIcon/></a> (Advanced)</li>
</ul>
<div class="hint-container note">
<p class="hint-container-title">Cloud environment overlays</p>
<p>MITRE SAF's <a href="https://saf.mitre.org/libs/validation" target="_blank" rel="noopener noreferrer">Validation library<ExternalLinkIcon/></a> includes several AWS RDS overlays for common databases. Cloud environment deployment often requires an overlay to be written for the underlying technology. For example, suddenly every system has a CSP-default account (e.g. <code v-pre>ec2-user</code>).</p>
</div>
<hr class="footnotes-sep">
<section class="footnotes">
<ol class="footnotes-list">
<li id="footnote1" class="footnote-item"><p>Copying and pasting controls from a profile, instead of creating an overlay, can lead to important updates not being reflected. Overlays keep the profile changes in sync as they pull the latest updates. <a href="#footnote-ref1" class="footnote-backref">↩︎</a></p>
</li>
</ol>
</section>
</div></template>


