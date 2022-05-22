<template><h2 id="profile-inheritance-and-overlays" tabindex="-1"><a class="header-anchor" href="#profile-inheritance-and-overlays" aria-hidden="true">#</a> Profile Inheritance and Overlays</h2>
<p>In addition to its own controls, an InSpec profile can bring in the controls from another InSpec profile. Additionally, when inheriting the controls of another profile, a profile can skip or even modify those included controls.</p>
<p>When a profile includes controls from another profile, it is usually referred to as a “meta profile” or a “profile overlay.” Those of us with Chef background sometimes call it a “wrapper profile”.</p>
<div class="custom-container tip"><p class="custom-container-title">Further information on inheritance</p>
<p>You can find out more about inhertiance here <a href="https://www.inspec.io/docs/reference/profiles/#sts=Profile%20Dependencies" target="_blank" rel="noopener noreferrer">https://www.inspec.io/docs/reference/profiles/#sts=Profile%20Dependencies<ExternalLinkIcon/></a></p>
</div>
<h3 id="defining-the-profile-dependency" tabindex="-1"><a class="header-anchor" href="#defining-the-profile-dependency" aria-hidden="true">#</a> Defining the Profile Dependency</h3>
<p>Before a profile can use controls from another profile, the to-be-included profile needs to be specified in the including profile’s inspec.yml file in the depends section. For each profile to be included, a location for the profile from where to be fetched and a name for the profile should be included. For example:</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">depends</span><span class="token punctuation">:</span>
 <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> linux<span class="token punctuation">-</span>baseline
   <span class="token key atrule">url</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//github.com/dev<span class="token punctuation">-</span>sec/linux<span class="token punctuation">-</span>baseline/archive/master.tar.gz
 <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> ssh<span class="token punctuation">-</span>baseline
   <span class="token key atrule">url</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//github.com/dev<span class="token punctuation">-</span>sec/ssh<span class="token punctuation">-</span>baseline/archive/master.tar.gz
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Once defined in the inspec.yml, controls from the included profiles can be used!</p>
<h3 id="including-all-controls-from-a-profile" tabindex="-1"><a class="header-anchor" href="#including-all-controls-from-a-profile" aria-hidden="true">#</a> Including All Controls from a Profile</h3>
<p>With the include_controls command in a profile, all controls from the named profile will be executed every time the including profile is executed.</p>
<p><code v-pre>my_nginx</code> profile</p>
<div class="language-ruby ext-rb line-numbers-mode"><pre v-pre class="language-ruby"><code>control <span class="token string-literal"><span class="token string">'nginx-version'</span></span> <span class="token keyword">do</span>
  impact <span class="token number">1.0</span>
  title <span class="token string-literal"><span class="token string">'NGINX version'</span></span>
  desc <span class="token string-literal"><span class="token string">'The required version of NGINX should be installed.'</span></span>
<span class="token keyword">end</span>

control <span class="token string-literal"><span class="token string">'nginx-modules'</span></span> <span class="token keyword">do</span>
  impact <span class="token number">1.0</span>
  title <span class="token string-literal"><span class="token string">'NGINX modules'</span></span>
  desc <span class="token string-literal"><span class="token string">'The required NGINX modules should be installed.'</span></span>
<span class="token keyword">end</span>

control <span class="token string-literal"><span class="token string">'nginx-conf'</span></span> <span class="token keyword">do</span>
  impact <span class="token number">1.0</span>
  title <span class="token string-literal"><span class="token string">'NGINX configuration'</span></span>
  desc <span class="token string-literal"><span class="token string">'The NGINX config file should owned by root, be writable only by owner, and not writeable or and readable by others.'</span></span>
<span class="token keyword">end</span>

include_controls <span class="token command-literal"><span class="token command string">`my_nginx_overlay`</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>my_nginx_overlay</code></p>
<div class="language-ruby ext-rb line-numbers-mode"><pre v-pre class="language-ruby"><code>control <span class="token command-literal"><span class="token command string">`first-overlay-control`</span></span>
control <span class="token command-literal"><span class="token command string">`second-overlay-control`</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>In the example above, every time <code v-pre>my_nginx</code> profile is executed, all the controls from <code v-pre>my_nginx_overlay</code> are also executed. Therefore, the following controls would be executed:</p>
<ul>
<li>nginx-version</li>
<li>nginx-modules</li>
<li>nginx-conf</li>
<li>first-overlay-control</li>
<li>second-overlay-control</li>
</ul>
<h3 id="skipping-a-control-from-a-profile" tabindex="-1"><a class="header-anchor" href="#skipping-a-control-from-a-profile" aria-hidden="true">#</a> Skipping a Control From a Profile</h3>
<p>What if one of the controls from the included profile does not apply to your environment? Luckily, it is not necessary to maintain a slightly-modified copy of the included profile just to delete a control. The skip_control command tells InSpec to not run a particular control.</p>
<p><code v-pre>my_nginx</code> profile</p>
<div class="language-ruby ext-rb line-numbers-mode"><pre v-pre class="language-ruby"><code>control <span class="token string-literal"><span class="token string">'nginx-version'</span></span> <span class="token keyword">do</span>
  impact <span class="token number">1.0</span>
  title <span class="token string-literal"><span class="token string">'NGINX version'</span></span>
  desc <span class="token string-literal"><span class="token string">'The required version of NGINX should be installed.'</span></span>
<span class="token keyword">end</span>

control <span class="token string-literal"><span class="token string">'nginx-modules'</span></span> <span class="token keyword">do</span>
  impact <span class="token number">1.0</span>
  title <span class="token string-literal"><span class="token string">'NGINX modules'</span></span>
  desc <span class="token string-literal"><span class="token string">'The required NGINX modules should be installed.'</span></span>
<span class="token keyword">end</span>

control <span class="token string-literal"><span class="token string">'nginx-conf'</span></span> <span class="token keyword">do</span>
  impact <span class="token number">1.0</span>
  title <span class="token string-literal"><span class="token string">'NGINX configuration'</span></span>
  desc <span class="token string-literal"><span class="token string">'The NGINX config file should owned by root, be writable only by owner, and not writeable or and readable by others.'</span></span>
<span class="token keyword">end</span>

include_controls <span class="token command-literal"><span class="token command string">`my_nginx_overlay`</span></span> <span class="token keyword">do</span>
  skip_control <span class="token command-literal"><span class="token command string">`second-overlay-control`</span></span>
<span class="token keyword">end</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>my_nginx_overlay</code></p>
<div class="language-ruby ext-rb line-numbers-mode"><pre v-pre class="language-ruby"><code>control <span class="token command-literal"><span class="token command string">`first-overlay-control`</span></span>
control <span class="token command-literal"><span class="token command string">`second-overlay-control`</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>In the above example, all controls from <code v-pre>my_nginx</code> profile and <code v-pre>my_nginx_overlay</code> profile will be executed every time my-app-profile is executed <strong>except</strong> for control <code v-pre>second-overlay-control</code> from the <code v-pre>my_nginx_overlay</code> profile.</p>
<h3 id="modifying-a-control" tabindex="-1"><a class="header-anchor" href="#modifying-a-control" aria-hidden="true">#</a> Modifying a Control</h3>
<p>Let’s say a particular control from an included profile should still be run, but the impact isn’t appropriate? Perhaps the test should still run, but if it fails it should be treated as low severity instead of high severity?</p>
<p>When a control is included, it can also be modified!</p>
<p><code v-pre>my_nginx</code> profile</p>
<div class="language-ruby ext-rb line-numbers-mode"><pre v-pre class="language-ruby"><code>control <span class="token string-literal"><span class="token string">'nginx-version'</span></span> <span class="token keyword">do</span>
  impact <span class="token number">1.0</span>
  title <span class="token string-literal"><span class="token string">'NGINX version'</span></span>
  desc <span class="token string-literal"><span class="token string">'The required version of NGINX should be installed.'</span></span>
<span class="token keyword">end</span>

control <span class="token string-literal"><span class="token string">'nginx-modules'</span></span> <span class="token keyword">do</span>
  impact <span class="token number">1.0</span>
  title <span class="token string-literal"><span class="token string">'NGINX modules'</span></span>
  desc <span class="token string-literal"><span class="token string">'The required NGINX modules should be installed.'</span></span>
<span class="token keyword">end</span>

control <span class="token string-literal"><span class="token string">'nginx-conf'</span></span> <span class="token keyword">do</span>
  impact <span class="token number">1.0</span>
  title <span class="token string-literal"><span class="token string">'NGINX configuration'</span></span>
  desc <span class="token string-literal"><span class="token string">'The NGINX config file should owned by root, be writable only by owner, and not writeable or and readable by others.'</span></span>
<span class="token keyword">end</span>

include_controls <span class="token command-literal"><span class="token command string">`my_nginx_overlay`</span></span> <span class="token keyword">do</span>
  control <span class="token command-literal"><span class="token command string">`second-overlay-control`</span></span> <span class="token keyword">do</span>
    impact <span class="token number">0.5</span>
  <span class="token keyword">end</span>
<span class="token keyword">end</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>my_nginx_overlay</code></p>
<div class="language-ruby ext-rb line-numbers-mode"><pre v-pre class="language-ruby"><code>control <span class="token command-literal"><span class="token command string">`first-overlay-control`</span></span> <span class="token keyword">do</span>
  impact <span class="token number">1.0</span>
<span class="token keyword">end</span>
control <span class="token command-literal"><span class="token command string">`second-overlay-control`</span></span> <span class="token keyword">do</span>
  impact <span class="token number">1.0</span>
<span class="token keyword">end</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>In the above example, all controls from <code v-pre>my_nginx</code> profile are executed along with all the controls from the including profile, <code v-pre>my_nginx_overlay</code>. However, should control <code v-pre>second-overlay-control</code> fail, it will be raised with an impact of <code v-pre>0.5</code> instead of the originally-intended impact of <code v-pre>1.0</code>.</p>
<h3 id="selectively-including-controls-from-a-profile" tabindex="-1"><a class="header-anchor" href="#selectively-including-controls-from-a-profile" aria-hidden="true">#</a> Selectively Including Controls From a Profile</h3>
<p>If there are only a handful of controls that should be executed from an included profile, it’s not necessary to skip all the unneeded controls, or worse, copy/paste those controls bit-for-bit into your profile. Instead, use the require_controls command.</p>
<p><code v-pre>my_nginx</code> profile</p>
<div class="language-ruby ext-rb line-numbers-mode"><pre v-pre class="language-ruby"><code>control <span class="token string-literal"><span class="token string">'nginx-version'</span></span> <span class="token keyword">do</span>
  impact <span class="token number">1.0</span>
  title <span class="token string-literal"><span class="token string">'NGINX version'</span></span>
  desc <span class="token string-literal"><span class="token string">'The required version of NGINX should be installed.'</span></span>
<span class="token keyword">end</span>

control <span class="token string-literal"><span class="token string">'nginx-modules'</span></span> <span class="token keyword">do</span>
  impact <span class="token number">1.0</span>
  title <span class="token string-literal"><span class="token string">'NGINX modules'</span></span>
  desc <span class="token string-literal"><span class="token string">'The required NGINX modules should be installed.'</span></span>
<span class="token keyword">end</span>

control <span class="token string-literal"><span class="token string">'nginx-conf'</span></span> <span class="token keyword">do</span>
  impact <span class="token number">1.0</span>
  title <span class="token string-literal"><span class="token string">'NGINX configuration'</span></span>
  desc <span class="token string-literal"><span class="token string">'The NGINX config file should owned by root, be writable only by owner, and not writeable or and readable by others.'</span></span>
<span class="token keyword">end</span>

require_controls <span class="token command-literal"><span class="token command string">`my_nginx_overlay`</span></span> <span class="token keyword">do</span>
  control <span class="token command-literal"><span class="token command string">`first-overlay-control`</span></span>
  control <span class="token command-literal"><span class="token command string">`third-overlay-control`</span></span>
<span class="token keyword">end</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>my_nginx_overlay</code></p>
<div class="language-ruby ext-rb line-numbers-mode"><pre v-pre class="language-ruby"><code>control <span class="token command-literal"><span class="token command string">`first-overlay-control`</span></span>
control <span class="token command-literal"><span class="token command string">`second-overlay-control`</span></span>
control <span class="token command-literal"><span class="token command string">`third-overlay-control`</span></span>
control <span class="token command-literal"><span class="token command string">`fourth-overlay-control`</span></span>
control <span class="token command-literal"><span class="token command string">`fifth-overlay-control`</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Whenever <code v-pre>my_nginx</code> is executed, in addition to its own controls, it will run only the controls specified in the require_controls block. In the case, the following controls would be executed:</p>
<ul>
<li>nginx-version</li>
<li>nginx-modules</li>
<li>nginx-conf</li>
<li>first-overlay-control</li>
<li>third-overlay-control</li>
</ul>
<p>Controls <code v-pre>second-overlay-control</code>, <code v-pre>fourth-overlay-control</code>, and <code v-pre>fifth-overlay-control</code> would not be run, just as if they were manually skipped. This method of including specific controls ensures only the controls specified are executed; if new controls are added to a later version of <code v-pre>my_nginx_overlay</code>, they would not be run.</p>
<p>And, just the way its possible to modify controls when using include_controls, controls can be modified as well.</p>
<p><code v-pre>my_nginx</code> profile</p>
<div class="language-ruby ext-rb line-numbers-mode"><pre v-pre class="language-ruby"><code>control <span class="token string-literal"><span class="token string">'nginx-version'</span></span> <span class="token keyword">do</span>
  impact <span class="token number">1.0</span>
  title <span class="token string-literal"><span class="token string">'NGINX version'</span></span>
  desc <span class="token string-literal"><span class="token string">'The required version of NGINX should be installed.'</span></span>
<span class="token keyword">end</span>

control <span class="token string-literal"><span class="token string">'nginx-modules'</span></span> <span class="token keyword">do</span>
  impact <span class="token number">1.0</span>
  title <span class="token string-literal"><span class="token string">'NGINX modules'</span></span>
  desc <span class="token string-literal"><span class="token string">'The required NGINX modules should be installed.'</span></span>
<span class="token keyword">end</span>

control <span class="token string-literal"><span class="token string">'nginx-conf'</span></span> <span class="token keyword">do</span>
  impact <span class="token number">1.0</span>
  title <span class="token string-literal"><span class="token string">'NGINX configuration'</span></span>
  desc <span class="token string-literal"><span class="token string">'The NGINX config file should owned by root, be writable only by owner, and not writeable or and readable by others.'</span></span>
<span class="token keyword">end</span>

require_controls <span class="token command-literal"><span class="token command string">`my_nginx_overlay`</span></span> <span class="token keyword">do</span>
  control <span class="token command-literal"><span class="token command string">`first-overlay-control`</span></span> <span class="token keyword">do</span>
    impact <span class="token number">0.5</span>
  <span class="token keyword">end</span>
  control <span class="token command-literal"><span class="token command string">`third-overlay-control`</span></span>
<span class="token keyword">end</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>my_nginx_overlay</code></p>
<div class="language-ruby ext-rb line-numbers-mode"><pre v-pre class="language-ruby"><code>control <span class="token command-literal"><span class="token command string">`first-overlay-control`</span></span> <span class="token keyword">do</span>
  impact <span class="token number">1.0</span>
<span class="token keyword">end</span>

control <span class="token command-literal"><span class="token command string">`second-overlay-control`</span></span>
control <span class="token command-literal"><span class="token command string">`third-overlay-control`</span></span>
control <span class="token command-literal"><span class="token command string">`fourth-overlay-control`</span></span>
control <span class="token command-literal"><span class="token command string">`fifth-overlay-control`</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>As with the prior example, only <code v-pre>first-overlay-control</code> and <code v-pre>third-overlay-control</code> are executed, but if <code v-pre>first-overlay-control</code> fails, it will report with an impact of <code v-pre>0.5</code> instead of the originally-intended <code v-pre>1.0</code> impact.</p>
<h3 id="additional-examples" tabindex="-1"><a class="header-anchor" href="#additional-examples" aria-hidden="true">#</a> Additional Examples</h3>
<ul>
<li><a href="https://github.com/mitre/helloworld-web-baseline" target="_blank" rel="noopener noreferrer">https://github.com/mitre/helloworld-web-baseline<ExternalLinkIcon/></a></li>
<li><a href="https://github.com/chris-rock/acme-inspec-profile" target="_blank" rel="noopener noreferrer">https://github.com/chris-rock/acme-inspec-profile<ExternalLinkIcon/></a></li>
<li><a href="https://github.com/mitre/aws-rds-crunchy-data-postgresql-9-stig-baseline" target="_blank" rel="noopener noreferrer">https://github.com/mitre/aws-rds-crunchy-data-postgresql-9-stig-baseline<ExternalLinkIcon/></a></li>
</ul>
</template>
