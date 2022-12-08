import{_ as l}from"./plugin-vue_export-helper.21dcd24c.js";import{r as i,o,c as r,a as n,b as a,F as t,e as s,d as c}from"./app.3b4d192a.js";const d={},p=n("h2",{id:"profile-inheritance-and-overlays",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#profile-inheritance-and-overlays","aria-hidden":"true"},"#"),s(" Profile Inheritance and Overlays")],-1),m=n("p",null,"In addition to its own controls, an InSpec profile can bring in the controls from another InSpec profile. Additionally, when inheriting the controls of another profile, a profile can skip or even modify those included controls.",-1),u=n("p",null,"When a profile includes controls from another profile, it is usually referred to as a \u201Cmeta profile\u201D or a \u201Cprofile overlay.\u201D Those of us with Chef background sometimes call it a \u201Cwrapper profile\u201D.",-1),v={class:"custom-container info"},b=n("p",{class:"custom-container-title"},"Further information on inheritance",-1),k=s("You can find out more about inhertiance here "),g={href:"https://www.inspec.io/docs/reference/profiles/#sts=Profile%20Dependencies",target:"_blank",rel:"noopener noreferrer"},h=s("https://www.inspec.io/docs/reference/profiles/#sts=Profile%20Dependencies"),y=c(`<h3 id="defining-the-profile-dependency" tabindex="-1"><a class="header-anchor" href="#defining-the-profile-dependency" aria-hidden="true">#</a> Defining the Profile Dependency</h3><p>Before a profile (e.g. <code>Profile A</code>) can use controls from another profile (e.g. <code>Profile B</code>), <code>Profile B</code> needs to be included in <code>Profile A</code>&#39;s <code>inspec.yml</code> file in the <code>depends</code> section. Each profile that <code>Profile A</code> depends on should list its name and location. For example:</p><div class="language-yaml ext-yml line-numbers-mode"><pre class="language-yaml"><code><span class="token key atrule">depends</span><span class="token punctuation">:</span>
 <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> linux<span class="token punctuation">-</span>baseline
   <span class="token key atrule">url</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//github.com/dev<span class="token punctuation">-</span>sec/linux<span class="token punctuation">-</span>baseline/archive/master.tar.gz
 <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> ssh<span class="token punctuation">-</span>baseline
   <span class="token key atrule">url</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//github.com/dev<span class="token punctuation">-</span>sec/ssh<span class="token punctuation">-</span>baseline/archive/master.tar.gz
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Once defined in the <code>inspec.yml</code> file, controls from the included profiles can be used!</p><h3 id="including-all-controls-from-a-profile" tabindex="-1"><a class="header-anchor" href="#including-all-controls-from-a-profile" aria-hidden="true">#</a> Including All Controls from a Profile</h3><p>With the <code>include_controls</code> command in a profile, all controls from the named profile will be executed every time the including profile is executed. Below you can see an example of a profile and overlay.</p><div class="language-ruby ext-rb line-numbers-mode"><pre class="language-ruby"><code><span class="token comment"># my_nginx profile</span>
control <span class="token string-literal"><span class="token string">&#39;nginx-version&#39;</span></span> <span class="token keyword">do</span>
  impact <span class="token number">1.0</span>
  title <span class="token string-literal"><span class="token string">&#39;NGINX version&#39;</span></span>
  desc <span class="token string-literal"><span class="token string">&#39;The required version of NGINX should be installed.&#39;</span></span>
<span class="token keyword">end</span>

control <span class="token string-literal"><span class="token string">&#39;nginx-modules&#39;</span></span> <span class="token keyword">do</span>
  impact <span class="token number">1.0</span>
  title <span class="token string-literal"><span class="token string">&#39;NGINX modules&#39;</span></span>
  desc <span class="token string-literal"><span class="token string">&#39;The required NGINX modules should be installed.&#39;</span></span>
<span class="token keyword">end</span>

control <span class="token string-literal"><span class="token string">&#39;nginx-conf&#39;</span></span> <span class="token keyword">do</span>
  impact <span class="token number">1.0</span>
  title <span class="token string-literal"><span class="token string">&#39;NGINX configuration&#39;</span></span>
  desc <span class="token string-literal"><span class="token string">&#39;The NGINX config file should owned by root, be writable only by owner, and not writeable or and readable by others.&#39;</span></span>
<span class="token keyword">end</span>

include_controls <span class="token command-literal"><span class="token command string">\`my_nginx_overlay\`</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-ruby ext-rb line-numbers-mode"><pre class="language-ruby"><code><span class="token comment"># my_nginx_overlay</span>
control <span class="token command-literal"><span class="token command string">\`first-overlay-control\`</span></span>
control <span class="token command-literal"><span class="token command string">\`second-overlay-control\`</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>In the example above, every time <code>my_nginx</code> profile is executed, all the controls from <code>my_nginx_overlay</code> are also executed. Therefore, the following controls would be executed:</p><ul><li>nginx-version</li><li>nginx-modules</li><li>nginx-conf</li><li>first-overlay-control</li><li>second-overlay-control</li></ul><h3 id="skipping-a-control-from-a-profile" tabindex="-1"><a class="header-anchor" href="#skipping-a-control-from-a-profile" aria-hidden="true">#</a> Skipping a Control From a Profile</h3><p>What if one of the controls from the included profile does not apply to your environment? Luckily, it is not necessary to maintain a slightly-modified copy of the included profile just to delete a control. The skip_control command tells InSpec to not run a particular control.</p><div class="language-ruby ext-rb line-numbers-mode"><pre class="language-ruby"><code><span class="token comment"># my_nginx profile</span>
control <span class="token string-literal"><span class="token string">&#39;nginx-version&#39;</span></span> <span class="token keyword">do</span>
  impact <span class="token number">1.0</span>
  title <span class="token string-literal"><span class="token string">&#39;NGINX version&#39;</span></span>
  desc <span class="token string-literal"><span class="token string">&#39;The required version of NGINX should be installed.&#39;</span></span>
<span class="token keyword">end</span>

control <span class="token string-literal"><span class="token string">&#39;nginx-modules&#39;</span></span> <span class="token keyword">do</span>
  impact <span class="token number">1.0</span>
  title <span class="token string-literal"><span class="token string">&#39;NGINX modules&#39;</span></span>
  desc <span class="token string-literal"><span class="token string">&#39;The required NGINX modules should be installed.&#39;</span></span>
<span class="token keyword">end</span>

control <span class="token string-literal"><span class="token string">&#39;nginx-conf&#39;</span></span> <span class="token keyword">do</span>
  impact <span class="token number">1.0</span>
  title <span class="token string-literal"><span class="token string">&#39;NGINX configuration&#39;</span></span>
  desc <span class="token string-literal"><span class="token string">&#39;The NGINX config file should owned by root, be writable only by owner, and not writeable or and readable by others.&#39;</span></span>
<span class="token keyword">end</span>

include_controls <span class="token command-literal"><span class="token command string">\`my_nginx_overlay\`</span></span> <span class="token keyword">do</span>
  skip_control <span class="token command-literal"><span class="token command string">\`second-overlay-control\`</span></span>
<span class="token keyword">end</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-ruby ext-rb line-numbers-mode"><pre class="language-ruby"><code><span class="token comment"># my_nginx_overlay</span>
control <span class="token command-literal"><span class="token command string">\`first-overlay-control\`</span></span>
control <span class="token command-literal"><span class="token command string">\`second-overlay-control\`</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>In the above example, all controls from <code>my_nginx</code> profile and <code>my_nginx_overlay</code> profile will be executed every time my-app-profile is executed <strong>except</strong> for control <code>second-overlay-control</code> from the <code>my_nginx_overlay</code> profile.</p><h3 id="modifying-a-control" tabindex="-1"><a class="header-anchor" href="#modifying-a-control" aria-hidden="true">#</a> Modifying a Control</h3><p>Let\u2019s say a particular control from an included profile should still run, but the impact isn\u2019t appropriate? Perhaps the test should still run, but if it fails it should be treated as low severity instead of high severity?</p><p>When a control is included, it can also be modified!</p><div class="language-ruby ext-rb line-numbers-mode"><pre class="language-ruby"><code><span class="token comment"># my_nginx profile</span>
control <span class="token string-literal"><span class="token string">&#39;nginx-version&#39;</span></span> <span class="token keyword">do</span>
  impact <span class="token number">1.0</span>
  title <span class="token string-literal"><span class="token string">&#39;NGINX version&#39;</span></span>
  desc <span class="token string-literal"><span class="token string">&#39;The required version of NGINX should be installed.&#39;</span></span>
<span class="token keyword">end</span>

control <span class="token string-literal"><span class="token string">&#39;nginx-modules&#39;</span></span> <span class="token keyword">do</span>
  impact <span class="token number">1.0</span>
  title <span class="token string-literal"><span class="token string">&#39;NGINX modules&#39;</span></span>
  desc <span class="token string-literal"><span class="token string">&#39;The required NGINX modules should be installed.&#39;</span></span>
<span class="token keyword">end</span>

control <span class="token string-literal"><span class="token string">&#39;nginx-conf&#39;</span></span> <span class="token keyword">do</span>
  impact <span class="token number">1.0</span>
  title <span class="token string-literal"><span class="token string">&#39;NGINX configuration&#39;</span></span>
  desc <span class="token string-literal"><span class="token string">&#39;The NGINX config file should owned by root, be writable only by owner, and not writeable or and readable by others.&#39;</span></span>
<span class="token keyword">end</span>

include_controls <span class="token command-literal"><span class="token command string">\`my_nginx_overlay\`</span></span> <span class="token keyword">do</span>
  control <span class="token command-literal"><span class="token command string">\`second-overlay-control\`</span></span> <span class="token keyword">do</span>
    impact <span class="token number">0.5</span>
  <span class="token keyword">end</span>
<span class="token keyword">end</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-ruby ext-rb line-numbers-mode"><pre class="language-ruby"><code><span class="token comment"># my_nginx_overlay</span>
control <span class="token command-literal"><span class="token command string">\`first-overlay-control\`</span></span> <span class="token keyword">do</span>
  impact <span class="token number">1.0</span>
<span class="token keyword">end</span>
control <span class="token command-literal"><span class="token command string">\`second-overlay-control\`</span></span> <span class="token keyword">do</span>
  impact <span class="token number">1.0</span>
<span class="token keyword">end</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>In the above example, all controls from <code>my_nginx</code> profile are executed along with all the controls from the including profile, <code>my_nginx_overlay</code>. However, should control <code>second-overlay-control</code> fail, it will be raised with an impact of <code>0.5</code> instead of the originally-intended impact of <code>1.0</code>.</p><h3 id="selectively-including-controls-from-a-profile" tabindex="-1"><a class="header-anchor" href="#selectively-including-controls-from-a-profile" aria-hidden="true">#</a> Selectively Including Controls From a Profile</h3><p>If there are only a handful of controls that should be executed from an included profile, it\u2019s not necessary to skip all the unneeded controls, or worse, copy/paste those controls bit-for-bit into your profile. Instead, use the <code>require_controls</code> command.</p><div class="language-ruby ext-rb line-numbers-mode"><pre class="language-ruby"><code><span class="token comment"># my_nginx profile  </span>
control <span class="token string-literal"><span class="token string">&#39;nginx-version&#39;</span></span> <span class="token keyword">do</span>
  impact <span class="token number">1.0</span>
  title <span class="token string-literal"><span class="token string">&#39;NGINX version&#39;</span></span>
  desc <span class="token string-literal"><span class="token string">&#39;The required version of NGINX should be installed.&#39;</span></span>
<span class="token keyword">end</span>

control <span class="token string-literal"><span class="token string">&#39;nginx-modules&#39;</span></span> <span class="token keyword">do</span>
  impact <span class="token number">1.0</span>
  title <span class="token string-literal"><span class="token string">&#39;NGINX modules&#39;</span></span>
  desc <span class="token string-literal"><span class="token string">&#39;The required NGINX modules should be installed.&#39;</span></span>
<span class="token keyword">end</span>

control <span class="token string-literal"><span class="token string">&#39;nginx-conf&#39;</span></span> <span class="token keyword">do</span>
  impact <span class="token number">1.0</span>
  title <span class="token string-literal"><span class="token string">&#39;NGINX configuration&#39;</span></span>
  desc <span class="token string-literal"><span class="token string">&#39;The NGINX config file should owned by root, be writable only by owner, and not writeable or and readable by others.&#39;</span></span>
<span class="token keyword">end</span>

require_controls <span class="token command-literal"><span class="token command string">\`my_nginx_overlay\`</span></span> <span class="token keyword">do</span>
  control <span class="token command-literal"><span class="token command string">\`first-overlay-control\`</span></span>
  control <span class="token command-literal"><span class="token command string">\`third-overlay-control\`</span></span>
<span class="token keyword">end</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-ruby ext-rb line-numbers-mode"><pre class="language-ruby"><code><span class="token comment"># my_nginx_overlay</span>
control <span class="token command-literal"><span class="token command string">\`first-overlay-control\`</span></span>
control <span class="token command-literal"><span class="token command string">\`second-overlay-control\`</span></span>
control <span class="token command-literal"><span class="token command string">\`third-overlay-control\`</span></span>
control <span class="token command-literal"><span class="token command string">\`fourth-overlay-control\`</span></span>
control <span class="token command-literal"><span class="token command string">\`fifth-overlay-control\`</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Whenever <code>my_nginx</code> is executed, in addition to its own controls, it will run only the controls specified in the <code>require_controls</code> block. In the case, the following controls would be executed:</p><ul><li>nginx-version</li><li>nginx-modules</li><li>nginx-conf</li><li>first-overlay-control</li><li>third-overlay-control</li></ul><p>Controls <code>second-overlay-control</code>, <code>fourth-overlay-control</code>, and <code>fifth-overlay-control</code> would not be run, just as if they were manually skipped. This method of including specific controls ensures only the controls specified are executed; if new controls are added to a later version of <code>my_nginx_overlay</code>, they would not be run.</p><p>And, just the way its possible to modify controls when using <code>include_controls</code>, controls can be modified as well.</p><div class="language-ruby ext-rb line-numbers-mode"><pre class="language-ruby"><code><span class="token comment"># my_nginx profile  </span>
control <span class="token string-literal"><span class="token string">&#39;nginx-version&#39;</span></span> <span class="token keyword">do</span>
  impact <span class="token number">1.0</span>
  title <span class="token string-literal"><span class="token string">&#39;NGINX version&#39;</span></span>
  desc <span class="token string-literal"><span class="token string">&#39;The required version of NGINX should be installed.&#39;</span></span>
<span class="token keyword">end</span>

control <span class="token string-literal"><span class="token string">&#39;nginx-modules&#39;</span></span> <span class="token keyword">do</span>
  impact <span class="token number">1.0</span>
  title <span class="token string-literal"><span class="token string">&#39;NGINX modules&#39;</span></span>
  desc <span class="token string-literal"><span class="token string">&#39;The required NGINX modules should be installed.&#39;</span></span>
<span class="token keyword">end</span>

control <span class="token string-literal"><span class="token string">&#39;nginx-conf&#39;</span></span> <span class="token keyword">do</span>
  impact <span class="token number">1.0</span>
  title <span class="token string-literal"><span class="token string">&#39;NGINX configuration&#39;</span></span>
  desc <span class="token string-literal"><span class="token string">&#39;The NGINX config file should owned by root, be writable only by owner, and not writeable or and readable by others.&#39;</span></span>
<span class="token keyword">end</span>

require_controls <span class="token command-literal"><span class="token command string">\`my_nginx_overlay\`</span></span> <span class="token keyword">do</span>
  control <span class="token command-literal"><span class="token command string">\`first-overlay-control\`</span></span> <span class="token keyword">do</span>
    impact <span class="token number">0.5</span>
  <span class="token keyword">end</span>
  control <span class="token command-literal"><span class="token command string">\`third-overlay-control\`</span></span>
<span class="token keyword">end</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-ruby ext-rb line-numbers-mode"><pre class="language-ruby"><code><span class="token comment"># my_nginx_overlay</span>
control <span class="token command-literal"><span class="token command string">\`first-overlay-control\`</span></span> <span class="token keyword">do</span>
  impact <span class="token number">1.0</span>
<span class="token keyword">end</span>

control <span class="token command-literal"><span class="token command string">\`second-overlay-control\`</span></span>
control <span class="token command-literal"><span class="token command string">\`third-overlay-control\`</span></span>
control <span class="token command-literal"><span class="token command string">\`fourth-overlay-control\`</span></span>
control <span class="token command-literal"><span class="token command string">\`fifth-overlay-control\`</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>As with the prior example, only <code>first-overlay-control</code> and <code>third-overlay-control</code> are executed, but if <code>first-overlay-control</code> fails, it will report with an impact of <code>0.5</code> instead of the originally-intended <code>1.0</code> impact.</p><h3 id="additional-examples" tabindex="-1"><a class="header-anchor" href="#additional-examples" aria-hidden="true">#</a> Additional Examples</h3>`,33),f={href:"https://github.com/mitre/helloworld-web-baseline",target:"_blank",rel:"noopener noreferrer"},w=s("https://github.com/mitre/helloworld-web-baseline"),_={href:"https://github.com/chris-rock/acme-inspec-profile",target:"_blank",rel:"noopener noreferrer"},x=s("https://github.com/chris-rock/acme-inspec-profile"),N={href:"https://github.com/mitre/aws-rds-crunchy-data-postgresql-9-stig-baseline",target:"_blank",rel:"noopener noreferrer"},I=s("https://github.com/mitre/aws-rds-crunchy-data-postgresql-9-stig-baseline");function G(X,T){const e=i("ExternalLinkIcon");return o(),r(t,null,[p,m,u,n("div",v,[b,n("p",null,[k,n("a",g,[h,a(e)])])]),y,n("ul",null,[n("li",null,[n("a",f,[w,a(e)])]),n("li",null,[n("a",_,[x,a(e)])]),n("li",null,[n("a",N,[I,a(e)])])])],64)}var A=l(d,[["render",G],["__file","09.html.vue"]]);export{A as default};
