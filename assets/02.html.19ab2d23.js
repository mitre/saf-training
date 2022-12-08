import{_ as i}from"./plugin-vue_export-helper.21dcd24c.js";import{r as n,o as c,c as r,a as s,b as t,w as l,F as d,e,d as p}from"./app.3b4d192a.js";const u={},h=e("In the "),m=e("beginner class"),k=e(", we explained the structure and output of InSpec Profiles. Let's review some content, then practice by revisiting, running, and viewing results of an InSpec profile."),b=p(`<h2 id="_2-inspec-content-review" tabindex="-1"><a class="header-anchor" href="#_2-inspec-content-review" aria-hidden="true">#</a> 2. InSpec Content Review</h2><h3 id="_2-1-inspec-profile-structure" tabindex="-1"><a class="header-anchor" href="#_2-1-inspec-profile-structure" aria-hidden="true">#</a> 2.1 InSpec Profile Structure</h3><p>Remember that a <code>profile</code> is a set of automated tests that usually relates directly back to a Security Requirements Benchmark.</p><p>Profiles have two (2) required elements:</p><ul><li>An <code>inspec.yml</code> file</li><li>A <code>controls</code> directory</li></ul><p>and four (4) optional elements:</p><ul><li>A <code>libraries</code> directory</li><li>A <code>files</code> directory</li><li>An <code>inputs.yml</code> file</li><li>A <code>README.md</code> file</li></ul><h3 id="_2-2-control-structure" tabindex="-1"><a class="header-anchor" href="#_2-2-control-structure" aria-hidden="true">#</a> 2.2 Control Structure</h3><p>Let&#39;s take a look at the default control file, <code>controls/example.rb</code>.</p><div class="language-ruby ext-rb line-numbers-mode"><pre class="language-ruby"><code>title <span class="token string-literal"><span class="token string">&#39;sample section&#39;</span></span>

<span class="token comment"># you can also use plain tests</span>
describe file<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&#39;/tmp&#39;</span></span><span class="token punctuation">)</span> <span class="token keyword">do</span>
  it <span class="token punctuation">{</span> should be_directory <span class="token punctuation">}</span>
<span class="token keyword">end</span>

<span class="token comment"># you add controls here</span>
control <span class="token string-literal"><span class="token string">&#39;tmp-1.0&#39;</span></span> <span class="token keyword">do</span>                        <span class="token comment"># A unique ID for this control</span>
  impact <span class="token number">0.7</span>                                <span class="token comment"># The criticality, if this control fails.</span>
  title <span class="token string-literal"><span class="token string">&#39;Create /tmp directory&#39;</span></span>             <span class="token comment"># A human-readable title</span>
  desc <span class="token string-literal"><span class="token string">&#39;An optional description...&#39;</span></span>
  describe file<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&#39;/tmp&#39;</span></span><span class="token punctuation">)</span> <span class="token keyword">do</span>                  <span class="token comment"># The actual test</span>
    it <span class="token punctuation">{</span> should be_directory <span class="token punctuation">}</span>
  <span class="token keyword">end</span>
<span class="token keyword">end</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>This example shows two tests. Both tests check for the existence of the <code>/tmp</code> directory. The second test provides additional information about the test. Let&#39;s break down each component.</p><ul><li><code>control</code> (line 9) is followed by the control&#39;s name. Each control in a profile has a unique name.</li><li><code>impact</code> (line 10) measures the relative importance of the test and must be a value between 0.0 and 1.0.</li><li><code>title</code> (line 11) defines the control&#39;s purpose.</li><li><code>desc</code> (line 12) provides a more complete description of what the control checks for.</li><li><code>describe</code> (lines 13 \u2014 15) defines the test. Here, the test checks for the existence of the <code>/tmp</code> directory.</li></ul><h3 id="_2-3-describe-block-structure" tabindex="-1"><a class="header-anchor" href="#_2-3-describe-block-structure" aria-hidden="true">#</a> 2.3 Describe Block Structure</h3><p>As with many test frameworks, InSpec code resembles natural language. Here&#39;s the format of a describe block.</p><div class="language-ruby ext-rb line-numbers-mode"><pre class="language-ruby"><code>describe <span class="token operator">&lt;</span>entity<span class="token operator">&gt;</span> <span class="token keyword">do</span>
  it <span class="token punctuation">{</span> <span class="token operator">&lt;</span>expectation<span class="token operator">&gt;</span> <span class="token punctuation">}</span>
<span class="token keyword">end</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,15),v={class:"custom-container tip"},f=s("p",{class:"custom-container-title"},"Inspec Resources",-1),_=e("InSpec uses resources like the "),y=s("code",null,"file",-1),g=e(" resource to aid in control development. These resources can often be used as the "),w=s("code",null,"<entity>",-1),x=e(" in the describe block, where the expectation is checking a requirement of that entity. Find a list of resources "),A={href:"https://docs.chef.io/inspec/resources/",target:"_blank",rel:"noopener noreferrer"},I=e("here"),S=e(".");function L(R,B){const a=n("RouterLink"),o=n("ExternalLinkIcon");return c(),r(d,null,[s("p",null,[h,t(a,{to:"/courses/beginner/"},{default:l(()=>[m]),_:1}),k]),b,s("div",v,[f,s("p",null,[_,y,g,w,x,s("a",A,[I,t(o)]),S])])],64)}var q=i(u,[["render",L],["__file","02.html.vue"]]);export{q as default};
