<template><div><p>As an example we will go through a few custom resources that were built and approved.</p>
<h3 id="_14-1-ipv6-resource" tabindex="-1"><a class="header-anchor" href="#_14-1-ipv6-resource" aria-hidden="true">#</a> 14.1. IPv6 resource</h3>
<h4 id="_14-1-1-docs-resources-ip6tables-md-erb" tabindex="-1"><a class="header-anchor" href="#_14-1-1-docs-resources-ip6tables-md-erb" aria-hidden="true">#</a> 14.1.1. docs/resources/ip6tables.md.erb</h4>
<div class="language-ruby line-numbers-mode" data-ext="rb"><pre v-pre class="language-ruby"><code><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span>
<span class="token symbol">title</span><span class="token operator">:</span> About the ip6tables Resource
<span class="token symbol">platform</span><span class="token operator">:</span> linux
<span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span>

<span class="token comment"># ip6tables</span>

Use the <span class="token command-literal"><span class="token command string">`ip6tables`</span></span> Chef InSpec audit resource to test rules that are <span class="token keyword">defined</span> <span class="token keyword">in</span> <span class="token command-literal"><span class="token command string">`ip6tables`</span></span><span class="token punctuation">,</span> which maintains tables of <span class="token constant">IP</span> packet filtering rules <span class="token keyword">for</span> IPv6<span class="token punctuation">.</span> There may be more than one table<span class="token punctuation">.</span> Each table contains one <span class="token punctuation">(</span><span class="token keyword">or</span> more<span class="token punctuation">)</span> chains <span class="token punctuation">(</span>both built<span class="token operator">-</span><span class="token keyword">in</span> <span class="token keyword">and</span> custom<span class="token punctuation">)</span><span class="token punctuation">.</span> <span class="token constant">A</span> chain is a list of rules that match packets<span class="token punctuation">.</span> When the rule matches<span class="token punctuation">,</span> the rule defines what target to assign to the packet<span class="token punctuation">.</span>

<span class="token operator">&lt;</span>br<span class="token operator">></span>

<span class="token comment">## Availability</span>

<span class="token comment">### Installation</span>

This resource is distributed along with Chef InSpec itself<span class="token punctuation">.</span> You can use it automatically<span class="token punctuation">.</span>

<span class="token comment">### Version</span>

This resource first became available <span class="token keyword">in</span> v4<span class="token punctuation">.</span><span class="token number">6.9</span> of InSpec<span class="token punctuation">.</span>

<span class="token comment">## Syntax</span>

<span class="token constant">A</span> <span class="token command-literal"><span class="token command string">`ip6tables`</span></span> resource block declares tests <span class="token keyword">for</span> rules <span class="token keyword">in</span> <span class="token constant">IP</span> tables<span class="token operator">:</span>

    describe ip6tables<span class="token punctuation">(</span><span class="token symbol">rule</span><span class="token operator">:</span><span class="token string-literal"><span class="token string">'name'</span></span><span class="token punctuation">,</span> <span class="token symbol">table</span><span class="token operator">:</span><span class="token string-literal"><span class="token string">'name'</span></span><span class="token punctuation">,</span> <span class="token symbol">chain</span><span class="token operator">:</span> <span class="token string-literal"><span class="token string">'name'</span></span><span class="token punctuation">)</span> <span class="token keyword">do</span>
      it <span class="token punctuation">{</span> should have_rule<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'RULE'</span></span><span class="token punctuation">)</span> <span class="token punctuation">}</span>
    <span class="token keyword">end</span>

where

<span class="token operator">*</span> <span class="token command-literal"><span class="token command string">`ip6tables()`</span></span> may specify any combination of <span class="token command-literal"><span class="token command string">`rule`</span></span><span class="token punctuation">,</span> <span class="token command-literal"><span class="token command string">`table`</span></span><span class="token punctuation">,</span> <span class="token keyword">or</span> <span class="token command-literal"><span class="token command string">`chain`</span></span>
<span class="token operator">*</span> <span class="token command-literal"><span class="token command string">`rule:'name'`</span></span> is the name of a rule that matches a set of packets
<span class="token operator">*</span> <span class="token command-literal"><span class="token command string">`table:'name'`</span></span> is the packet matching table against which the test is run
<span class="token operator">*</span> <span class="token command-literal"><span class="token command string">`chain: 'name'`</span></span> is the name of a user<span class="token operator">-</span><span class="token keyword">defined</span> chain <span class="token keyword">or</span> one of <span class="token command-literal"><span class="token command string">`ACCEPT`</span></span><span class="token punctuation">,</span> <span class="token command-literal"><span class="token command string">`DROP`</span></span><span class="token punctuation">,</span> <span class="token command-literal"><span class="token command string">`QUEUE`</span></span><span class="token punctuation">,</span> <span class="token keyword">or</span> <span class="token command-literal"><span class="token command string">`RETURN`</span></span>
<span class="token operator">*</span> <span class="token command-literal"><span class="token command string">`have_rule('RULE')`</span></span> tests that rule <span class="token keyword">in</span> the ip6tables list<span class="token punctuation">.</span> This must match the entire line taken from <span class="token command-literal"><span class="token command string">`ip6tables -S CHAIN`</span></span><span class="token punctuation">.</span>

<span class="token operator">&lt;</span>br<span class="token operator">></span>

<span class="token comment">## Examples</span>

The following examples show how to use this Chef InSpec audit resource<span class="token punctuation">.</span>

<span class="token comment">### Test if the INPUT chain is in default ACCEPT mode</span>

    describe ip6tables <span class="token keyword">do</span>
      it <span class="token punctuation">{</span> should have_rule<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'-P INPUT ACCEPT'</span></span><span class="token punctuation">)</span> <span class="token punctuation">}</span>
    <span class="token keyword">end</span>

<span class="token comment">### Test if the INPUT chain from the mangle table is in ACCEPT mode</span>

    describe ip6tables<span class="token punctuation">(</span><span class="token symbol">table</span><span class="token operator">:</span><span class="token string-literal"><span class="token string">'mangle'</span></span><span class="token punctuation">,</span> <span class="token symbol">chain</span><span class="token operator">:</span> <span class="token string-literal"><span class="token string">'INPUT'</span></span><span class="token punctuation">)</span> <span class="token keyword">do</span>
      it <span class="token punctuation">{</span> should have_rule<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'-P INPUT ACCEPT'</span></span><span class="token punctuation">)</span> <span class="token punctuation">}</span>
    <span class="token keyword">end</span>

<span class="token comment">### Test if there is a rule allowing Postgres (5432/TCP) traffic</span>

    describe ip6tables <span class="token keyword">do</span>
      it <span class="token punctuation">{</span> should have_rule<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'-A INPUT -p tcp -m tcp -m multiport --dports 5432 -m comment --comment "postgres" -j ACCEPT'</span></span><span class="token punctuation">)</span> <span class="token punctuation">}</span>
    <span class="token keyword">end</span>

Note that the rule specification must exactly match what<span class="token string-literal"><span class="token string">'s in the output of `ip6tables -S INPUT`, which will depend on how you'</span></span>ve built your rules<span class="token punctuation">.</span>

<span class="token operator">&lt;</span>br<span class="token operator">></span>

<span class="token comment">## Matchers</span>

For a full list of available matchers<span class="token punctuation">,</span> please visit our <span class="token punctuation">[</span>matchers page<span class="token punctuation">]</span><span class="token punctuation">(</span><span class="token symbol">https</span><span class="token operator">:</span><span class="token operator">/</span><span class="token operator">/</span>www<span class="token punctuation">.</span>inspec<span class="token punctuation">.</span>io<span class="token operator">/</span>docs<span class="token operator">/</span>reference<span class="token regex-literal"><span class="token regex">/matchers/</span></span><span class="token punctuation">)</span><span class="token punctuation">.</span>

<span class="token comment">### have_rule</span>

The <span class="token command-literal"><span class="token command string">`have_rule`</span></span> matcher tests the named rule against the information <span class="token keyword">in</span> the <span class="token command-literal"><span class="token command string">`ip6tables`</span></span> file<span class="token operator">:</span>

    it <span class="token punctuation">{</span> should have_rule<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'RULE'</span></span><span class="token punctuation">)</span> <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_14-1-2-lib-inspec-resources-rb" tabindex="-1"><a class="header-anchor" href="#_14-1-2-lib-inspec-resources-rb" aria-hidden="true">#</a> 14.1.2. lib/inspec/resources.rb</h4>
<div class="language-ruby line-numbers-mode" data-ext="rb"><pre v-pre class="language-ruby"><code><span class="token keyword">require</span> <span class="token string-literal"><span class="token string">"inspec/resources/iis_site"</span></span>
<span class="token keyword">require</span> <span class="token string-literal"><span class="token string">"inspec/resources/inetd_conf"</span></span>
<span class="token keyword">require</span> <span class="token string-literal"><span class="token string">"inspec/resources/interface"</span></span>
<span class="token keyword">require</span> <span class="token string-literal"><span class="token string">"inspec/resources/ip6tables"</span></span>
<span class="token keyword">require</span> <span class="token string-literal"><span class="token string">"inspec/resources/iptables"</span></span>
<span class="token keyword">require</span> <span class="token string-literal"><span class="token string">"inspec/resources/kernel_module"</span></span>
<span class="token keyword">require</span> <span class="token string-literal"><span class="token string">"inspec/resources/kernel_parameter"</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_14-1-3-lib-inspec-resources-ip6tables-rb" tabindex="-1"><a class="header-anchor" href="#_14-1-3-lib-inspec-resources-ip6tables-rb" aria-hidden="true">#</a> 14.1.3. lib/inspec/resources/ip6tables.rb</h4>
<div class="language-ruby line-numbers-mode" data-ext="rb"><pre v-pre class="language-ruby"><code><span class="token keyword">require</span> <span class="token string-literal"><span class="token string">"inspec/resources/command"</span></span>

<span class="token comment"># Usage:</span>
<span class="token comment"># describe ip6tables do</span>
<span class="token comment">#   it { should have_rule('-P INPUT ACCEPT') }</span>
<span class="token comment"># end</span>
<span class="token comment">#</span>
<span class="token comment"># The following serverspec sytax is not implemented:</span>
<span class="token comment"># describe ip6tables do</span>
<span class="token comment">#   it { should have_rule('-P INPUT ACCEPT').with_table('mangle').with_chain('INPUT') }</span>
<span class="token comment"># end</span>
<span class="token comment"># Please use the new sytax:</span>
<span class="token comment"># describe ip6tables(table:'mangle', chain: 'input') do</span>
<span class="token comment">#   it { should have_rule('-P INPUT ACCEPT') }</span>
<span class="token comment"># end</span>
<span class="token comment">#</span>
<span class="token comment"># Note: Docker containers normally do not have ip6tables installed</span>
<span class="token comment">#</span>
<span class="token comment"># @see http://ipset.netfilter.org/ip6tables.man.html</span>
<span class="token comment"># @see http://ipset.netfilter.org/ip6tables.man.html</span>
<span class="token keyword">module</span> <span class="token class-name">Inspec</span><span class="token double-colon punctuation">::</span>Resources
  <span class="token keyword">class</span> <span class="token class-name">Ip6Tables</span> <span class="token operator">&lt;</span> Inspec<span class="token punctuation">.</span>resource<span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
    name <span class="token string-literal"><span class="token string">"ip6tables"</span></span>
    supports platform<span class="token operator">:</span> <span class="token string-literal"><span class="token string">"linux"</span></span>
    desc <span class="token string-literal"><span class="token string">"Use the ip6tables InSpec audit resource to test rules that are defined in ip6tables, which maintains tables of IP packet filtering rules. There may be more than one table. Each table contains one (or more) chains (both built-in and custom). A chain is a list of rules that match packets. When the rule matches, the rule defines what target to assign to the packet."</span></span>
    example <span class="token string-literal heredoc-string"><span class="token delimiter"><span class="token punctuation">&lt;&lt;~</span><span class="token symbol">EXAMPLE</span></span><span class="token string">
      describe ip6tables do
        it { should have_rule('-P INPUT ACCEPT') }
      end
    </span><span class="token delimiter"><span class="token symbol">EXAMPLE</span></span></span>

    <span class="token keyword">def</span> <span class="token method-definition"><span class="token function">initialize</span></span><span class="token punctuation">(</span>params <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
      <span class="token variable">@table</span> <span class="token operator">=</span> params<span class="token punctuation">[</span><span class="token symbol">:table</span><span class="token punctuation">]</span>
      <span class="token variable">@chain</span> <span class="token operator">=</span> params<span class="token punctuation">[</span><span class="token symbol">:chain</span><span class="token punctuation">]</span>

      <span class="token comment"># we're done if we are on linux</span>
      <span class="token keyword">return</span> <span class="token keyword">if</span> inspec<span class="token punctuation">.</span>os<span class="token punctuation">.</span>linux<span class="token operator">?</span>

      <span class="token comment"># ensures, all calls are aborted for non-supported os</span>
      <span class="token variable">@ip6tables_cache</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
      skip_resource <span class="token string-literal"><span class="token string">"The `ip6tables` resource is not supported on your OS yet."</span></span>
    <span class="token keyword">end</span>

    <span class="token keyword">def</span> <span class="token method-definition"><span class="token function">has_rule</span></span><span class="token operator">?</span><span class="token punctuation">(</span>rule <span class="token operator">=</span> <span class="token keyword">nil</span><span class="token punctuation">,</span> _table <span class="token operator">=</span> <span class="token keyword">nil</span><span class="token punctuation">,</span> _chain <span class="token operator">=</span> <span class="token keyword">nil</span><span class="token punctuation">)</span>
      <span class="token comment"># checks if the rule is part of the ruleset</span>
      <span class="token comment"># for now, we expect an exact match</span>
      retrieve_rules<span class="token punctuation">.</span>any<span class="token operator">?</span> <span class="token punctuation">{</span> <span class="token operator">|</span>line<span class="token operator">|</span> line<span class="token punctuation">.</span>casecmp<span class="token punctuation">(</span>rule<span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token number">0</span> <span class="token punctuation">}</span>
    <span class="token keyword">end</span>

    <span class="token keyword">def</span> <span class="token method-definition"><span class="token function">retrieve_rules</span></span>
      <span class="token keyword">return</span> <span class="token variable">@ip6tables_cache</span> <span class="token keyword">if</span> <span class="token keyword">defined</span><span class="token operator">?</span><span class="token punctuation">(</span><span class="token variable">@ip6tables_cache</span><span class="token punctuation">)</span>

      <span class="token comment"># construct ip6tables command to read all rules</span>
      bin <span class="token operator">=</span> find_ip6tables_or_error
      table_cmd <span class="token operator">=</span> <span class="token string-literal"><span class="token string">"-t </span><span class="token interpolation"><span class="token delimiter punctuation">#{</span><span class="token content"><span class="token variable">@table</span></span><span class="token delimiter punctuation">}</span></span><span class="token string">"</span></span> <span class="token keyword">if</span> <span class="token variable">@table</span>
      ip6tables_cmd <span class="token operator">=</span> format<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">"%s %s -S %s"</span></span><span class="token punctuation">,</span> bin<span class="token punctuation">,</span> table_cmd<span class="token punctuation">,</span> <span class="token variable">@chain</span><span class="token punctuation">)</span><span class="token punctuation">.</span>strip

      cmd <span class="token operator">=</span> inspec<span class="token punctuation">.</span>command<span class="token punctuation">(</span>ip6tables_cmd<span class="token punctuation">)</span>
      <span class="token keyword">return</span> <span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token keyword">if</span> cmd<span class="token punctuation">.</span>exit_status<span class="token punctuation">.</span>to_i <span class="token operator">!=</span> <span class="token number">0</span>

      <span class="token comment"># split rules, returns array or rules</span>
      <span class="token variable">@ip6tables_cache</span> <span class="token operator">=</span> cmd<span class="token punctuation">.</span>stdout<span class="token punctuation">.</span>split<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">"\n"</span></span><span class="token punctuation">)</span><span class="token punctuation">.</span>map<span class="token punctuation">(</span><span class="token operator">&amp;</span><span class="token symbol">:strip</span><span class="token punctuation">)</span>
    <span class="token keyword">end</span>

    <span class="token keyword">def</span> <span class="token method-definition"><span class="token function">to_s</span></span>
      format<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">"Ip6tables %s %s"</span></span><span class="token punctuation">,</span> <span class="token variable">@table</span> <span class="token operator">&amp;&amp;</span> <span class="token string-literal"><span class="token string">"table: </span><span class="token interpolation"><span class="token delimiter punctuation">#{</span><span class="token content"><span class="token variable">@table</span></span><span class="token delimiter punctuation">}</span></span><span class="token string">"</span></span><span class="token punctuation">,</span> <span class="token variable">@chain</span> <span class="token operator">&amp;&amp;</span> <span class="token string-literal"><span class="token string">"chain: </span><span class="token interpolation"><span class="token delimiter punctuation">#{</span><span class="token content"><span class="token variable">@chain</span></span><span class="token delimiter punctuation">}</span></span><span class="token string">"</span></span><span class="token punctuation">)</span><span class="token punctuation">.</span>strip
    <span class="token keyword">end</span>

    <span class="token keyword">private</span>

    <span class="token keyword">def</span> <span class="token method-definition"><span class="token function">find_ip6tables_or_error</span></span>
      <span class="token string-literal"><span class="token string">%w{/usr/sbin/ip6tables /sbin/ip6tables ip6tables}</span></span><span class="token punctuation">.</span><span class="token keyword">each</span> <span class="token keyword">do</span> <span class="token operator">|</span>cmd<span class="token operator">|</span>
        <span class="token keyword">return</span> cmd <span class="token keyword">if</span> inspec<span class="token punctuation">.</span>command<span class="token punctuation">(</span>cmd<span class="token punctuation">)</span><span class="token punctuation">.</span>exist<span class="token operator">?</span>
      <span class="token keyword">end</span>

      <span class="token keyword">raise</span> Inspec<span class="token double-colon punctuation">::</span>Exceptions<span class="token double-colon punctuation">::</span>ResourceFailed<span class="token punctuation">,</span> <span class="token string-literal"><span class="token string">"Could not find `ip6tables`"</span></span>
    <span class="token keyword">end</span>
  <span class="token keyword">end</span>
<span class="token keyword">end</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="hint-container tip">
<p class="hint-container-title">Code Reuse</p>
<p>While submitting PR it may be possible to extend existing test elements from current resources to perform integration and unit testing such is seen in this example, the ipv6 resource extends the testing for <a href="https://www.inspec.io/docs/reference/resources/iptables/" target="_blank" rel="noopener noreferrer">iptables<ExternalLinkIcon/></a> resource</p>
</div>
<h4 id="_14-1-4-test-integration-default-controls-ip6tables-spec-rb" tabindex="-1"><a class="header-anchor" href="#_14-1-4-test-integration-default-controls-ip6tables-spec-rb" aria-hidden="true">#</a> 14.1.4. test/integration/default/controls/ip6tables_spec.rb</h4>
<div class="language-ruby line-numbers-mode" data-ext="rb"><pre v-pre class="language-ruby"><code><span class="token keyword">case</span> os<span class="token punctuation">[</span><span class="token symbol">:family</span><span class="token punctuation">]</span>
<span class="token keyword">when</span> <span class="token string-literal"><span class="token string">'ubuntu'</span></span><span class="token punctuation">,</span> <span class="token string-literal"><span class="token string">'fedora'</span></span><span class="token punctuation">,</span> <span class="token string-literal"><span class="token string">'debian'</span></span><span class="token punctuation">,</span> <span class="token string-literal"><span class="token string">'suse'</span></span>
  describe ip6tables <span class="token keyword">do</span>
    it <span class="token punctuation">{</span> should have_rule<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'-A INPUT -i eth0 -p tcp -m tcp --dport 80 -m state --state NEW -m comment --comment "http v6 on 80" -j ACCEPT'</span></span><span class="token punctuation">)</span> <span class="token punctuation">}</span>
    it <span class="token punctuation">{</span> should_not have_rule<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'-A INPUT -i eth1 -p tcp -m tcp --dport 80 -j ACCEPT'</span></span><span class="token punctuation">)</span> <span class="token punctuation">}</span>

    <span class="token comment"># single-word comments have their quotes dropped</span>
    it <span class="token punctuation">{</span> should have_rule<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'-A derby-cognos-web-v6 -p tcp -m tcp --dport 80 -m comment --comment derby-cognos-web-v6 -j ACCEPT'</span></span><span class="token punctuation">)</span> <span class="token punctuation">}</span>
  <span class="token keyword">end</span>
<span class="token keyword">when</span>  <span class="token string-literal"><span class="token string">'redhat'</span></span><span class="token punctuation">,</span> <span class="token string-literal"><span class="token string">'centos'</span></span>
  describe ip6tables <span class="token keyword">do</span>
    it <span class="token punctuation">{</span> should have_rule<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'-A INPUT -i eth0 -p tcp -m tcp --dport 80 -m state --state NEW -m comment --comment "http v6 on 80" -j ACCEPT'</span></span><span class="token punctuation">)</span> <span class="token punctuation">}</span>
    it <span class="token punctuation">{</span> should_not have_rule<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'-A INPUT -i eth1 -p tcp -m tcp --dport 80 -j ACCEPT'</span></span><span class="token punctuation">)</span> <span class="token punctuation">}</span>
  <span class="token keyword">end</span>

  describe ip6tables <span class="token keyword">do</span>
    it <span class="token punctuation">{</span> should have_rule<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'-A derby-cognos-web-v6 -p tcp -m tcp --dport 80 -m comment --comment "derby-cognos-web-v6" -j ACCEPT'</span></span><span class="token punctuation">)</span> <span class="token punctuation">}</span>
  <span class="token keyword">end</span> <span class="token keyword">if</span> os<span class="token punctuation">[</span><span class="token symbol">:release</span><span class="token punctuation">]</span> <span class="token operator">==</span> <span class="token number">6</span>

  describe ip6tables <span class="token keyword">do</span>
    it <span class="token punctuation">{</span> should have_rule<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'-A derby-cognos-web-v6 -p tcp -m tcp --dport 80 -m comment --comment derby-cognos-web-v6 -j ACCEPT'</span></span><span class="token punctuation">)</span> <span class="token punctuation">}</span>
  <span class="token keyword">end</span> <span class="token keyword">if</span> os<span class="token punctuation">[</span><span class="token symbol">:release</span><span class="token punctuation">]</span> <span class="token operator">==</span> <span class="token number">7</span>
<span class="token keyword">end</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_14-1-5-test-unit-resources-ip6tables-test-rb" tabindex="-1"><a class="header-anchor" href="#_14-1-5-test-unit-resources-ip6tables-test-rb" aria-hidden="true">#</a> 14.1.5. test/unit/resources/ip6tables_test.rb</h4>
<div class="language-ruby line-numbers-mode" data-ext="rb"><pre v-pre class="language-ruby"><code><span class="token keyword">require</span> <span class="token string-literal"><span class="token string">"helper"</span></span>
<span class="token keyword">require</span> <span class="token string-literal"><span class="token string">"inspec/resource"</span></span>
<span class="token keyword">require</span> <span class="token string-literal"><span class="token string">"inspec/resources/ip6tables"</span></span>

describe <span class="token string-literal"><span class="token string">"Inspec::Resources::Ip6tables"</span></span> <span class="token keyword">do</span>

  <span class="token comment"># ubuntu 14.04</span>
  it <span class="token string-literal"><span class="token string">"verify ip6tables on ubuntu"</span></span> <span class="token keyword">do</span>
    resource <span class="token operator">=</span> <span class="token class-name">MockLoader</span><span class="token punctuation">.</span><span class="token keyword">new</span><span class="token punctuation">(</span><span class="token symbol">:ubuntu1404</span><span class="token punctuation">)</span><span class="token punctuation">.</span>load_resource<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">"ip6tables"</span></span><span class="token punctuation">)</span>
    _<span class="token punctuation">(</span>resource<span class="token punctuation">.</span>has_rule<span class="token operator">?</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">"-P OUTPUT ACCEPT"</span></span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span>must_equal <span class="token boolean">true</span>
    _<span class="token punctuation">(</span>resource<span class="token punctuation">.</span>has_rule<span class="token operator">?</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">"-P OUTPUT DROP"</span></span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span>must_equal <span class="token boolean">false</span>
  <span class="token keyword">end</span>

  it <span class="token string-literal"><span class="token string">"verify ip6tables with comments on ubuntu"</span></span> <span class="token keyword">do</span>
    resource <span class="token operator">=</span> <span class="token class-name">MockLoader</span><span class="token punctuation">.</span><span class="token keyword">new</span><span class="token punctuation">(</span><span class="token symbol">:ubuntu1404</span><span class="token punctuation">)</span><span class="token punctuation">.</span>load_resource<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">"ip6tables"</span></span><span class="token punctuation">)</span>
    _<span class="token punctuation">(</span>resource<span class="token punctuation">.</span>has_rule<span class="token operator">?</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'-A INPUT -i eth0 -p tcp -m tcp --dport 80 -m state --state NEW -m comment --comment "http-v6 like its 1990" -j ACCEPT'</span></span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span>must_equal <span class="token boolean">true</span>
  <span class="token keyword">end</span>

  it <span class="token string-literal"><span class="token string">"verify ip6tables on windows"</span></span> <span class="token keyword">do</span>
    resource <span class="token operator">=</span> <span class="token class-name">MockLoader</span><span class="token punctuation">.</span><span class="token keyword">new</span><span class="token punctuation">(</span><span class="token symbol">:windows</span><span class="token punctuation">)</span><span class="token punctuation">.</span>load_resource<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">"ip6tables"</span></span><span class="token punctuation">)</span>
    _<span class="token punctuation">(</span>resource<span class="token punctuation">.</span>has_rule<span class="token operator">?</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">"-P OUTPUT ACCEPT"</span></span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span>must_equal <span class="token boolean">false</span>
    _<span class="token punctuation">(</span>resource<span class="token punctuation">.</span>has_rule<span class="token operator">?</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">"-P OUTPUT DROP"</span></span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span>must_equal <span class="token boolean">false</span>
  <span class="token keyword">end</span>

  <span class="token comment"># undefined</span>
  it <span class="token string-literal"><span class="token string">"verify ip6tables on unsupported os"</span></span> <span class="token keyword">do</span>
    resource <span class="token operator">=</span> <span class="token class-name">MockLoader</span><span class="token punctuation">.</span><span class="token keyword">new</span><span class="token punctuation">(</span><span class="token symbol">:undefined</span><span class="token punctuation">)</span><span class="token punctuation">.</span>load_resource<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">"ip6tables"</span></span><span class="token punctuation">)</span>
    _<span class="token punctuation">(</span>resource<span class="token punctuation">.</span>has_rule<span class="token operator">?</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">"-P OUTPUT ACCEPT"</span></span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span>must_equal <span class="token boolean">false</span>
    _<span class="token punctuation">(</span>resource<span class="token punctuation">.</span>has_rule<span class="token operator">?</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">"-P OUTPUT DROP"</span></span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span>must_equal <span class="token boolean">false</span>
  <span class="token keyword">end</span>

<span class="token keyword">end</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_14-2-nginx-resource" tabindex="-1"><a class="header-anchor" href="#_14-2-nginx-resource" aria-hidden="true">#</a> 14.2. NGINX resource</h3>
<h4 id="_14-2-1-docs-resources-nginx-md-erb" tabindex="-1"><a class="header-anchor" href="#_14-2-1-docs-resources-nginx-md-erb" aria-hidden="true">#</a> 14.2.1. docs/resources/nginx.md.erb</h4>
<div class="language-ruby line-numbers-mode" data-ext="rb"><pre v-pre class="language-ruby"><code><span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span>
<span class="token symbol">title</span><span class="token operator">:</span> The Nginx Resource
<span class="token operator">-</span><span class="token operator">-</span><span class="token operator">-</span>

<span class="token comment"># nginx</span>

Use the <span class="token command-literal"><span class="token command string">`nginx`</span></span> InSpec audit resource to test the fields <span class="token keyword">and</span> validity of nginx<span class="token punctuation">.</span>

Nginx resource extracts <span class="token keyword">and</span> exposes data reported by the command <span class="token string-literal"><span class="token string">'nginx -V'</span></span>

<span class="token comment">## Syntax</span>

An <span class="token command-literal"><span class="token command string">`nginx`</span></span> InSpec audit resource block extracts configuration settings that should be tested<span class="token operator">:</span>

    describe nginx <span class="token keyword">do</span>
      its<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'attribute'</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span> should eq <span class="token string-literal"><span class="token string">'value'</span></span> <span class="token punctuation">}</span>
    <span class="token keyword">end</span>

    describe nginx<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'path to nginx'</span></span><span class="token punctuation">)</span> <span class="token keyword">do</span>
      its<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'attribute'</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span> should eq <span class="token string-literal"><span class="token string">'value'</span></span> <span class="token punctuation">}</span>
    <span class="token keyword">end</span>

where

<span class="token operator">*</span> <span class="token command-literal"><span class="token command string">`'attribute'`</span></span> is a configuration parsed from result of the command <span class="token string-literal"><span class="token string">'nginx -V'</span></span>
<span class="token operator">*</span> <span class="token command-literal"><span class="token command string">`'value'`</span></span> is the value that is expected of the attribute

<span class="token comment">## Supported Properties</span>

<span class="token operator">*</span> <span class="token string-literal"><span class="token string">'compiler_info'</span></span><span class="token punctuation">,</span>  <span class="token string-literal"><span class="token string">'error_log_path'</span></span><span class="token punctuation">,</span>  <span class="token string-literal"><span class="token string">'http_client_body_temp_path'</span></span><span class="token punctuation">,</span>  <span class="token string-literal"><span class="token string">'http_fastcgi_temp_path'</span></span><span class="token punctuation">,</span>  <span class="token string-literal"><span class="token string">'http_log_path'</span></span><span class="token punctuation">,</span>  <span class="token string-literal"><span class="token string">'http_proxy_temp_path'</span></span><span class="token punctuation">,</span>  <span class="token string-literal"><span class="token string">'http_scgi_temp_path'</span></span><span class="token punctuation">,</span>  <span class="token string-literal"><span class="token string">'http_uwsgi_temp_path'</span></span><span class="token punctuation">,</span>  <span class="token string-literal"><span class="token string">'lock_path'</span></span><span class="token punctuation">,</span>  <span class="token string-literal"><span class="token string">'modules'</span></span><span class="token punctuation">,</span> <span class="token string-literal"><span class="token string">'modules_path'</span></span><span class="token punctuation">,</span>  <span class="token string-literal"><span class="token string">'openssl_version'</span></span><span class="token punctuation">,</span>  <span class="token string-literal"><span class="token string">'prefix'</span></span><span class="token punctuation">,</span>  <span class="token string-literal"><span class="token string">'sbin_path'</span></span><span class="token punctuation">,</span>  <span class="token string-literal"><span class="token string">'service'</span></span><span class="token punctuation">,</span>  <span class="token string-literal"><span class="token string">'support_info'</span></span><span class="token punctuation">,</span>  <span class="token string-literal"><span class="token string">'version'</span></span>

<span class="token comment">## Property Examples and Return Types</span>

<span class="token comment">### version(String)</span>

<span class="token command-literal"><span class="token command string">`version`</span></span> returns a string of the version of the running nginx instance

    describe nginx <span class="token keyword">do</span>
      its<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'version'</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span> should eq <span class="token string-literal"><span class="token string">'1.12.0'</span></span> <span class="token punctuation">}</span>
    <span class="token keyword">end</span>

<span class="token comment">### modules(String)</span>

<span class="token command-literal"><span class="token command string">`modules`</span></span> returns a array modules <span class="token keyword">in</span> the running nginx instance

    describe nginx <span class="token keyword">do</span>
      its<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'modules'</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span> should <span class="token keyword">include</span> <span class="token string-literal"><span class="token string">'my_module'</span></span> <span class="token punctuation">}</span>
    <span class="token keyword">end</span>

<span class="token comment">### openssl_version(Hash)</span>

<span class="token command-literal"><span class="token command string">`openssl_version `</span></span> returns a hash with <span class="token string-literal"><span class="token string">'version'</span></span> <span class="token keyword">and</span> <span class="token string-literal"><span class="token string">'date'</span></span> as keys

    describe nginx <span class="token keyword">do</span>
      its<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'openssl_version.date'</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span> should eq <span class="token string-literal"><span class="token string">'11 Feb 2013'</span></span> <span class="token punctuation">}</span>
    <span class="token keyword">end</span>

<span class="token comment">### compiler_info(Hash)</span>

<span class="token command-literal"><span class="token command string">`compiler_info `</span></span> returns a hash with <span class="token string-literal"><span class="token string">'compiler'</span></span> <span class="token punctuation">,</span> version<span class="token string-literal"><span class="token string">' and '</span></span>date' as keys

    describe nginx <span class="token keyword">do</span>
      its<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'compiler_info.compiler'</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span> should eq <span class="token string-literal"><span class="token string">'gcc'</span></span> <span class="token punctuation">}</span>
    <span class="token keyword">end</span>

<span class="token comment">### support_info(String)</span>

<span class="token command-literal"><span class="token command string">`support_info `</span></span> returns a string containing supported protocols

    describe nginx <span class="token keyword">do</span>
      its<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'support_info'</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span> should match <span class="token regex-literal"><span class="token regex">/TLS/</span></span> <span class="token punctuation">}</span>
    <span class="token keyword">end</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_14-2-2-lib-inspec-resource-rb" tabindex="-1"><a class="header-anchor" href="#_14-2-2-lib-inspec-resource-rb" aria-hidden="true">#</a> 14.2.2. lib/inspec/resource.rb</h4>
<div class="language-ruby line-numbers-mode" data-ext="rb"><pre v-pre class="language-ruby"><code><span class="token keyword">require</span> <span class="token string-literal"><span class="token string">'resources/mysql'</span></span>
<span class="token keyword">require</span> <span class="token string-literal"><span class="token string">'resources/mysql_conf'</span></span>
<span class="token keyword">require</span> <span class="token string-literal"><span class="token string">'resources/mysql_session'</span></span>
<span class="token keyword">require</span> <span class="token string-literal"><span class="token string">'resources/nginx'</span></span>
<span class="token keyword">require</span> <span class="token string-literal"><span class="token string">'resources/nginx_conf'</span></span>
<span class="token keyword">require</span> <span class="token string-literal"><span class="token string">'resources/npm'</span></span>
<span class="token keyword">require</span> <span class="token string-literal"><span class="token string">'resources/ntp_conf'</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_14-2-3-lib-resources-nginx-rb" tabindex="-1"><a class="header-anchor" href="#_14-2-3-lib-resources-nginx-rb" aria-hidden="true">#</a> 14.2.3. lib/resources/nginx.rb</h4>
<div class="language-ruby line-numbers-mode" data-ext="rb"><pre v-pre class="language-ruby"><code><span class="token comment"># encoding: utf-8</span>
<span class="token comment"># author: Aaron Lippold, lippold@gmail.com</span>
<span class="token comment"># author: Rony Xavier, rx294@gmail.com</span>

<span class="token keyword">require</span> <span class="token string-literal"><span class="token string">'pathname'</span></span>
<span class="token keyword">require</span> <span class="token string-literal"><span class="token string">'hashie/mash'</span></span>

<span class="token keyword">module</span> <span class="token class-name">Inspec</span><span class="token double-colon punctuation">::</span>Resources
  <span class="token keyword">class</span> <span class="token class-name">Nginx</span> <span class="token operator">&lt;</span> Inspec<span class="token punctuation">.</span>resource<span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
    name <span class="token string-literal"><span class="token string">'nginx'</span></span>
    desc <span class="token string-literal"><span class="token string">'Use the nginx InSpec audit resource to test information about your NGINX instance.'</span></span>
    example "
      describe nginx <span class="token keyword">do</span>
        its<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'conf_path'</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span> should cmp <span class="token string-literal"><span class="token string">'/etc/nginx/nginx.conf'</span></span> <span class="token punctuation">}</span>
      <span class="token keyword">end</span>
      describe nginx<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'/etc/sbin/'</span></span><span class="token punctuation">)</span> <span class="token keyword">do</span>
        its<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'version'</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span> should be <span class="token operator">>=</span> <span class="token string-literal"><span class="token string">'1.0.0'</span></span> <span class="token punctuation">}</span>
      <span class="token keyword">end</span>
      describe nginx <span class="token keyword">do</span>
        its<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'modules'</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span> should <span class="token keyword">include</span> <span class="token string-literal"><span class="token string">'my_module'</span></span> <span class="token punctuation">}</span>
      <span class="token keyword">end</span>
    "
    attr_reader <span class="token symbol">:params</span><span class="token punctuation">,</span> <span class="token symbol">:bin_dir</span>

    <span class="token keyword">def</span> <span class="token method-definition"><span class="token function">initialize</span></span><span class="token punctuation">(</span>nginx_path <span class="token operator">=</span> <span class="token string-literal"><span class="token string">'/usr/sbin/nginx'</span></span><span class="token punctuation">)</span>
      <span class="token keyword">return</span> skip_resource <span class="token string-literal"><span class="token string">'The `nginx` resource is not yet available on your OS.'</span></span> <span class="token keyword">if</span> inspec<span class="token punctuation">.</span>os<span class="token punctuation">.</span>windows<span class="token operator">?</span>
      <span class="token keyword">return</span> skip_resource <span class="token string-literal"><span class="token string">'The `nginx` binary not found in the path provided.'</span></span> <span class="token keyword">unless</span> inspec<span class="token punctuation">.</span>command<span class="token punctuation">(</span>nginx_path<span class="token punctuation">)</span><span class="token punctuation">.</span>exist<span class="token operator">?</span>

      cmd <span class="token operator">=</span> inspec<span class="token punctuation">.</span>command<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">"</span><span class="token interpolation"><span class="token delimiter punctuation">#{</span><span class="token content">nginx_path</span><span class="token delimiter punctuation">}</span></span><span class="token string"> -V 2>&amp;1"</span></span><span class="token punctuation">)</span>
      <span class="token keyword">if</span> <span class="token operator">!</span>cmd<span class="token punctuation">.</span>exit_status<span class="token punctuation">.</span>zero<span class="token operator">?</span>
        <span class="token keyword">return</span> skip_resource <span class="token string-literal"><span class="token string">'Error using the command nginx -V'</span></span>
      <span class="token keyword">end</span>
      <span class="token variable">@data</span> <span class="token operator">=</span> cmd<span class="token punctuation">.</span>stdout
      <span class="token variable">@params</span> <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
      read_content
    <span class="token keyword">end</span>

    <span class="token string-literal"><span class="token string">%w{compiler_info error_log_path http_client_body_temp_path http_fastcgi_temp_path http_log_path http_proxy_temp_path http_scgi_temp_path http_uwsgi_temp_path lock_path modules_path openssl_version prefix sbin_path service support_info version}</span></span><span class="token punctuation">.</span><span class="token keyword">each</span> <span class="token keyword">do</span> <span class="token operator">|</span>property<span class="token operator">|</span>
      <span class="token keyword">define_method</span><span class="token punctuation">(</span>property<span class="token punctuation">.</span>to_sym<span class="token punctuation">)</span> <span class="token keyword">do</span>
        <span class="token variable">@params</span><span class="token punctuation">[</span>property<span class="token punctuation">.</span>to_sym<span class="token punctuation">]</span>
      <span class="token keyword">end</span>
    <span class="token keyword">end</span>

    <span class="token keyword">def</span> <span class="token method-definition"><span class="token function">openssl_version</span></span>
      result <span class="token operator">=</span> <span class="token variable">@data</span><span class="token punctuation">.</span>scan<span class="token punctuation">(</span><span class="token regex-literal"><span class="token regex">/built with OpenSSL\s(\S+)\s(\d+\s\S+\s\d{4})/</span></span><span class="token punctuation">)</span><span class="token punctuation">.</span>flatten
      Hashie<span class="token double-colon punctuation">::</span><span class="token class-name">Mash</span><span class="token punctuation">.</span><span class="token keyword">new</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token string-literal"><span class="token string">'version'</span></span> <span class="token operator">=></span> result<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token string-literal"><span class="token string">'date'</span></span> <span class="token operator">=></span> result<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token keyword">end</span>

    <span class="token keyword">def</span> <span class="token method-definition"><span class="token function">compiler_info</span></span>
      result <span class="token operator">=</span> <span class="token variable">@data</span><span class="token punctuation">.</span>scan<span class="token punctuation">(</span><span class="token regex-literal"><span class="token regex">/built by (\S+)\s(\S+)\s(\S+)/</span></span><span class="token punctuation">)</span><span class="token punctuation">.</span>flatten
      Hashie<span class="token double-colon punctuation">::</span><span class="token class-name">Mash</span><span class="token punctuation">.</span><span class="token keyword">new</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token string-literal"><span class="token string">'compiler'</span></span> <span class="token operator">=></span> result<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token string-literal"><span class="token string">'version'</span></span> <span class="token operator">=></span> result<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token string-literal"><span class="token string">'date'</span></span> <span class="token operator">=></span> result<span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token keyword">end</span>

    <span class="token keyword">def</span> <span class="token method-definition"><span class="token function">support_info</span></span>
      support_info <span class="token operator">=</span> <span class="token variable">@data</span><span class="token punctuation">.</span>scan<span class="token punctuation">(</span><span class="token regex-literal"><span class="token regex">/(.*\S+) support enabled/</span></span><span class="token punctuation">)</span><span class="token punctuation">.</span>flatten
      support_info<span class="token punctuation">.</span>empty<span class="token operator">?</span> <span class="token operator">?</span> <span class="token keyword">nil</span> <span class="token operator">:</span> support_info<span class="token punctuation">.</span>join<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">' '</span></span><span class="token punctuation">)</span>
    <span class="token keyword">end</span>

    <span class="token keyword">def</span> <span class="token method-definition"><span class="token function">modules</span></span>
      <span class="token variable">@data</span><span class="token punctuation">.</span>scan<span class="token punctuation">(</span><span class="token regex-literal"><span class="token regex">/--with-(\S+)_module/</span></span><span class="token punctuation">)</span><span class="token punctuation">.</span>flatten
    <span class="token keyword">end</span>

    <span class="token keyword">def</span> <span class="token method-definition"><span class="token function">to_s</span></span>
      <span class="token string-literal"><span class="token string">'Nginx Environment'</span></span>
    <span class="token keyword">end</span>

    <span class="token keyword">private</span>

    <span class="token keyword">def</span> <span class="token method-definition"><span class="token function">read_content</span></span>
      parse_config
      parse_path
      parse_http_path
    <span class="token keyword">end</span>

    <span class="token keyword">def</span> <span class="token method-definition"><span class="token function">parse_config</span></span>
      <span class="token variable">@params</span><span class="token punctuation">[</span><span class="token symbol">:prefix</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token variable">@data</span><span class="token punctuation">.</span>scan<span class="token punctuation">(</span><span class="token regex-literal"><span class="token regex">/--prefix=(\S+)\s/</span></span><span class="token punctuation">)</span><span class="token punctuation">.</span>flatten<span class="token punctuation">.</span>first
      <span class="token variable">@params</span><span class="token punctuation">[</span><span class="token symbol">:service</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string-literal"><span class="token string">'nginx'</span></span>
      <span class="token variable">@params</span><span class="token punctuation">[</span><span class="token symbol">:version</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token variable">@data</span><span class="token punctuation">.</span>scan<span class="token punctuation">(</span><span class="token regex-literal"><span class="token regex">%r{nginx version: nginx\/(\S+)\s}</span></span><span class="token punctuation">)</span><span class="token punctuation">.</span>flatten<span class="token punctuation">.</span>first
    <span class="token keyword">end</span>

    <span class="token keyword">def</span> <span class="token method-definition"><span class="token function">parse_path</span></span>
      <span class="token variable">@params</span><span class="token punctuation">[</span><span class="token symbol">:sbin_path</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token variable">@data</span><span class="token punctuation">.</span>scan<span class="token punctuation">(</span><span class="token regex-literal"><span class="token regex">/--sbin-path=(\S+)\s/</span></span><span class="token punctuation">)</span><span class="token punctuation">.</span>flatten<span class="token punctuation">.</span>first
      <span class="token variable">@params</span><span class="token punctuation">[</span><span class="token symbol">:modules_path</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token variable">@data</span><span class="token punctuation">.</span>scan<span class="token punctuation">(</span><span class="token regex-literal"><span class="token regex">/--modules-path=(\S+)\s/</span></span><span class="token punctuation">)</span><span class="token punctuation">.</span>flatten<span class="token punctuation">.</span>first
      <span class="token variable">@params</span><span class="token punctuation">[</span><span class="token symbol">:error_log_path</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token variable">@data</span><span class="token punctuation">.</span>scan<span class="token punctuation">(</span><span class="token regex-literal"><span class="token regex">/--error-log-path=(\S+)\s/</span></span><span class="token punctuation">)</span><span class="token punctuation">.</span>flatten<span class="token punctuation">.</span>first
      <span class="token variable">@params</span><span class="token punctuation">[</span><span class="token symbol">:http_log_path</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token variable">@data</span><span class="token punctuation">.</span>scan<span class="token punctuation">(</span><span class="token regex-literal"><span class="token regex">/--http-log-path=(\S+)\s/</span></span><span class="token punctuation">)</span><span class="token punctuation">.</span>flatten<span class="token punctuation">.</span>first
      <span class="token variable">@params</span><span class="token punctuation">[</span><span class="token symbol">:lock_path</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token variable">@data</span><span class="token punctuation">.</span>scan<span class="token punctuation">(</span><span class="token regex-literal"><span class="token regex">/--lock-path=(\S+)\s/</span></span><span class="token punctuation">)</span><span class="token punctuation">.</span>flatten<span class="token punctuation">.</span>first
    <span class="token keyword">end</span>

    <span class="token keyword">def</span> <span class="token method-definition"><span class="token function">parse_http_path</span></span>
      <span class="token variable">@params</span><span class="token punctuation">[</span><span class="token symbol">:http_client_body_temp_path</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token variable">@data</span><span class="token punctuation">.</span>scan<span class="token punctuation">(</span><span class="token regex-literal"><span class="token regex">/--http-client-body-temp-path=(\S+)\s/</span></span><span class="token punctuation">)</span><span class="token punctuation">.</span>flatten<span class="token punctuation">.</span>first
      <span class="token variable">@params</span><span class="token punctuation">[</span><span class="token symbol">:http_proxy_temp_path</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token variable">@data</span><span class="token punctuation">.</span>scan<span class="token punctuation">(</span><span class="token regex-literal"><span class="token regex">/--http-proxy-temp-path=(\S+)\s/</span></span><span class="token punctuation">)</span><span class="token punctuation">.</span>flatten<span class="token punctuation">.</span>first
      <span class="token variable">@params</span><span class="token punctuation">[</span><span class="token symbol">:http_fastcgi_temp_path</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token variable">@data</span><span class="token punctuation">.</span>scan<span class="token punctuation">(</span><span class="token regex-literal"><span class="token regex">/--http-fastcgi-temp-path=(\S+)\s/</span></span><span class="token punctuation">)</span><span class="token punctuation">.</span>flatten<span class="token punctuation">.</span>first
      <span class="token variable">@params</span><span class="token punctuation">[</span><span class="token symbol">:http_uwsgi_temp_path</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token variable">@data</span><span class="token punctuation">.</span>scan<span class="token punctuation">(</span><span class="token regex-literal"><span class="token regex">/--http-uwsgi-temp-path=(\S+)\s/</span></span><span class="token punctuation">)</span><span class="token punctuation">.</span>flatten<span class="token punctuation">.</span>first
      <span class="token variable">@params</span><span class="token punctuation">[</span><span class="token symbol">:http_scgi_temp_path</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token variable">@data</span><span class="token punctuation">.</span>scan<span class="token punctuation">(</span><span class="token regex-literal"><span class="token regex">/--http-scgi-temp-path=(\S+)\s/</span></span><span class="token punctuation">)</span><span class="token punctuation">.</span>flatten<span class="token punctuation">.</span>first
    <span class="token keyword">end</span>
  <span class="token keyword">end</span>
<span class="token keyword">end</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_14-2-4-test-unit-resources-nginx-test-rb" tabindex="-1"><a class="header-anchor" href="#_14-2-4-test-unit-resources-nginx-test-rb" aria-hidden="true">#</a> 14.2.4. test/unit/resources/nginx_test.rb</h4>
<div class="language-ruby line-numbers-mode" data-ext="rb"><pre v-pre class="language-ruby"><code><span class="token comment"># encoding: utf-8</span>
<span class="token comment"># author: Aaron Lippold, lippold@gmail.com</span>
<span class="token comment"># author: Rony Xavier, rx294@nyu.edu</span>

<span class="token keyword">require</span> <span class="token string-literal"><span class="token string">'helper'</span></span>
<span class="token keyword">require</span> <span class="token string-literal"><span class="token string">'inspec/resource'</span></span>

describe <span class="token string-literal"><span class="token string">'Inspec::Resources::Nginx'</span></span> <span class="token keyword">do</span>
  describe <span class="token string-literal"><span class="token string">'NGINX Methods'</span></span> <span class="token keyword">do</span>
    it <span class="token string-literal"><span class="token string">'Verify nginx parsing `support_info` - `TLS SNI`'</span></span> <span class="token keyword">do</span>
      resource <span class="token operator">=</span> load_resource<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'nginx'</span></span><span class="token punctuation">)</span>
      _<span class="token punctuation">(</span>resource<span class="token punctuation">.</span>support_info<span class="token punctuation">)</span><span class="token punctuation">.</span>must_match <span class="token string-literal"><span class="token string">'TLS SNI'</span></span>
    <span class="token keyword">end</span>
    it <span class="token string-literal"><span class="token string">'Verify nginx parsing `openssl_version` - `1.0.1e-fips/11 Feb 2013`'</span></span> <span class="token keyword">do</span>
      resource <span class="token operator">=</span> load_resource<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'nginx'</span></span><span class="token punctuation">)</span>
      _<span class="token punctuation">(</span>resource<span class="token punctuation">.</span>openssl_version<span class="token punctuation">.</span>date<span class="token punctuation">)</span><span class="token punctuation">.</span>must_match <span class="token string-literal"><span class="token string">'11 Feb 2013'</span></span>
      _<span class="token punctuation">(</span>resource<span class="token punctuation">.</span>openssl_version<span class="token punctuation">.</span>version<span class="token punctuation">)</span><span class="token punctuation">.</span>must_match <span class="token string-literal"><span class="token string">'1.0.1e-fips'</span></span>
    <span class="token keyword">end</span>
    it <span class="token string-literal"><span class="token string">'Verify nginx parsing `compiler_info` - `gcc 4.8.5 20150623 (Red Hat 4.8.5-4) (GCC)`'</span></span> <span class="token keyword">do</span>
      resource <span class="token operator">=</span> load_resource<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'nginx'</span></span><span class="token punctuation">)</span>
      _<span class="token punctuation">(</span>resource<span class="token punctuation">.</span>compiler_info<span class="token punctuation">.</span>compiler<span class="token punctuation">)</span><span class="token punctuation">.</span>must_match <span class="token string-literal"><span class="token string">'gcc'</span></span>
      _<span class="token punctuation">(</span>resource<span class="token punctuation">.</span>compiler_info<span class="token punctuation">.</span>version<span class="token punctuation">)</span><span class="token punctuation">.</span>must_match <span class="token string-literal"><span class="token string">'4.8.5'</span></span>
      _<span class="token punctuation">(</span>resource<span class="token punctuation">.</span>compiler_info<span class="token punctuation">.</span>date<span class="token punctuation">)</span><span class="token punctuation">.</span>must_match <span class="token string-literal"><span class="token string">'20150623'</span></span>
    <span class="token keyword">end</span>
    it <span class="token string-literal"><span class="token string">'Verify nginx parsing `version` - 1.12.0'</span></span> <span class="token keyword">do</span>
      resource <span class="token operator">=</span> load_resource<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'nginx'</span></span><span class="token punctuation">)</span>
      _<span class="token punctuation">(</span>resource<span class="token punctuation">.</span>version<span class="token punctuation">)</span><span class="token punctuation">.</span>must_match <span class="token string-literal"><span class="token string">'1.12.0'</span></span>
    <span class="token keyword">end</span>
    it <span class="token string-literal"><span class="token string">'Verify nginx_module parsing with custom path`version` - 1.12.0'</span></span> <span class="token keyword">do</span>
      resource <span class="token operator">=</span> load_resource<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'nginx'</span></span><span class="token punctuation">,</span><span class="token string-literal"><span class="token string">'/usr/sbin/nginx'</span></span><span class="token punctuation">)</span>
      _<span class="token punctuation">(</span>resource<span class="token punctuation">.</span>version<span class="token punctuation">)</span><span class="token punctuation">.</span>must_match <span class="token string-literal"><span class="token string">'1.12.0'</span></span>
    <span class="token keyword">end</span>
    it <span class="token string-literal"><span class="token string">'Verify nginx_module parsing with a broken custom path`version` - 1.12.0'</span></span> <span class="token keyword">do</span>
      resource <span class="token operator">=</span> load_resource<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'nginx'</span></span><span class="token punctuation">,</span><span class="token string-literal"><span class="token string">'/usr/sbin/nginx'</span></span><span class="token punctuation">)</span>
      _<span class="token punctuation">(</span>resource<span class="token punctuation">.</span>version<span class="token punctuation">)</span><span class="token punctuation">.</span>must_match <span class="token string-literal"><span class="token string">'1.12.0'</span></span>
    <span class="token keyword">end</span>
    it <span class="token string-literal"><span class="token string">'Verify nginx parsing `service` - `nginx`'</span></span> <span class="token keyword">do</span>
      resource <span class="token operator">=</span> load_resource<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'nginx'</span></span><span class="token punctuation">)</span>
      _<span class="token punctuation">(</span>resource<span class="token punctuation">.</span>service<span class="token punctuation">)</span><span class="token punctuation">.</span>must_match <span class="token string-literal"><span class="token string">'nginx'</span></span>
    <span class="token keyword">end</span>
    it <span class="token string-literal"><span class="token string">'Verify nginx parsing `modules` - `nginx`'</span></span> <span class="token keyword">do</span>
      resource <span class="token operator">=</span> load_resource<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'nginx'</span></span><span class="token punctuation">)</span>
      _<span class="token punctuation">(</span>resource<span class="token punctuation">.</span>modules<span class="token punctuation">)</span><span class="token punctuation">.</span>must_include <span class="token string-literal"><span class="token string">'http_addition'</span></span>
    <span class="token keyword">end</span>
    it <span class="token string-literal"><span class="token string">'Verify nginx parsing `prefix` - `/etc/nginx`'</span></span> <span class="token keyword">do</span>
      resource <span class="token operator">=</span> load_resource<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'nginx'</span></span><span class="token punctuation">)</span>
      _<span class="token punctuation">(</span>resource<span class="token punctuation">.</span>prefix<span class="token punctuation">)</span><span class="token punctuation">.</span>must_match <span class="token string-literal"><span class="token string">'/etc/nginx'</span></span>
    <span class="token keyword">end</span>
    it <span class="token string-literal"><span class="token string">'Verify nginx parsing `sbin_path` - `/usr/sbin/nginx`'</span></span> <span class="token keyword">do</span>
      resource <span class="token operator">=</span> load_resource<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'nginx'</span></span><span class="token punctuation">)</span>
      _<span class="token punctuation">(</span>resource<span class="token punctuation">.</span>sbin_path<span class="token punctuation">)</span><span class="token punctuation">.</span>must_match <span class="token string-literal"><span class="token string">'/usr/sbin/nginx'</span></span>
    <span class="token keyword">end</span>
    it <span class="token string-literal"><span class="token string">'Verify nginx parsing `modules_path` - `/usr/lib64/nginx/modules`'</span></span> <span class="token keyword">do</span>
      resource <span class="token operator">=</span> load_resource<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'nginx'</span></span><span class="token punctuation">)</span>
      _<span class="token punctuation">(</span>resource<span class="token punctuation">.</span>modules_path<span class="token punctuation">)</span><span class="token punctuation">.</span>must_match <span class="token string-literal"><span class="token string">'/usr/lib64/nginx/modules'</span></span>
    <span class="token keyword">end</span>
    it <span class="token string-literal"><span class="token string">'Verify nginx parsing `error_log_path` - `/var/log/nginx/error.log`'</span></span> <span class="token keyword">do</span>
      resource <span class="token operator">=</span> load_resource<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'nginx'</span></span><span class="token punctuation">)</span>
      _<span class="token punctuation">(</span>resource<span class="token punctuation">.</span>error_log_path<span class="token punctuation">)</span><span class="token punctuation">.</span>must_match <span class="token string-literal"><span class="token string">'/var/log/nginx/error.log'</span></span>
    <span class="token keyword">end</span>
    it <span class="token string-literal"><span class="token string">'Verify nginx parsing `error_log_path` - `/var/log/nginx/access.log`'</span></span> <span class="token keyword">do</span>
      resource <span class="token operator">=</span> load_resource<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'nginx'</span></span><span class="token punctuation">)</span>
      _<span class="token punctuation">(</span>resource<span class="token punctuation">.</span>http_log_path<span class="token punctuation">)</span><span class="token punctuation">.</span>must_match <span class="token string-literal"><span class="token string">'/var/log/nginx/access.log'</span></span>
    <span class="token keyword">end</span>
    it <span class="token string-literal"><span class="token string">'Verify nginx parsing `lock_path` - `/var/run/nginx.lock`'</span></span> <span class="token keyword">do</span>
      resource <span class="token operator">=</span> load_resource<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'nginx'</span></span><span class="token punctuation">)</span>
      _<span class="token punctuation">(</span>resource<span class="token punctuation">.</span>lock_path<span class="token punctuation">)</span><span class="token punctuation">.</span>must_match <span class="token string-literal"><span class="token string">'/var/run/nginx.lock'</span></span>
    <span class="token keyword">end</span>
    it <span class="token string-literal"><span class="token string">'Verify nginx parsing `http_client_body_temp_path` - `/var/cache/nginx/client_temp`'</span></span> <span class="token keyword">do</span>
      resource <span class="token operator">=</span> load_resource<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'nginx'</span></span><span class="token punctuation">)</span>
      _<span class="token punctuation">(</span>resource<span class="token punctuation">.</span>http_client_body_temp_path<span class="token punctuation">)</span><span class="token punctuation">.</span>must_match <span class="token string-literal"><span class="token string">'/var/cache/nginx/client_temp'</span></span>
    <span class="token keyword">end</span>
    it <span class="token string-literal"><span class="token string">'Verify nginx parsing `http_proxy_temp_path` - `/var/cache/nginx/proxy_temp`'</span></span> <span class="token keyword">do</span>
      resource <span class="token operator">=</span> load_resource<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'nginx'</span></span><span class="token punctuation">)</span>
      _<span class="token punctuation">(</span>resource<span class="token punctuation">.</span>http_proxy_temp_path<span class="token punctuation">)</span><span class="token punctuation">.</span>must_match <span class="token string-literal"><span class="token string">'/var/cache/nginx/proxy_temp'</span></span>
    <span class="token keyword">end</span>
    it <span class="token string-literal"><span class="token string">'Verify nginx parsing `http_fastcgi_temp_path` - `/var/cache/nginx/fastcgi_temp`'</span></span> <span class="token keyword">do</span>
      resource <span class="token operator">=</span> load_resource<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'nginx'</span></span><span class="token punctuation">)</span>
      _<span class="token punctuation">(</span>resource<span class="token punctuation">.</span>http_fastcgi_temp_path<span class="token punctuation">)</span><span class="token punctuation">.</span>must_match <span class="token string-literal"><span class="token string">'/var/cache/nginx/fastcgi_temp'</span></span>
    <span class="token keyword">end</span>
    it <span class="token string-literal"><span class="token string">'Verify nginx parsing `http_uwsgi_temp_path` - `/var/cache/nginx/uwsgi_temp`'</span></span> <span class="token keyword">do</span>
      resource <span class="token operator">=</span> load_resource<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'nginx'</span></span><span class="token punctuation">)</span>
      _<span class="token punctuation">(</span>resource<span class="token punctuation">.</span>http_uwsgi_temp_path<span class="token punctuation">)</span><span class="token punctuation">.</span>must_match <span class="token string-literal"><span class="token string">'/var/cache/nginx/uwsgi_temp'</span></span>
    <span class="token keyword">end</span>
    it <span class="token string-literal"><span class="token string">'Verify nginx parsing `http_scgi_temp_path` - `/var/cache/nginx/scgi_temp`'</span></span> <span class="token keyword">do</span>
      resource <span class="token operator">=</span> load_resource<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'nginx'</span></span><span class="token punctuation">)</span>
      _<span class="token punctuation">(</span>resource<span class="token punctuation">.</span>http_scgi_temp_path<span class="token punctuation">)</span><span class="token punctuation">.</span>must_match <span class="token string-literal"><span class="token string">'/var/cache/nginx/scgi_temp'</span></span>
    <span class="token keyword">end</span>
    it <span class="token string-literal"><span class="token string">'Verify nginx parsing `http_scgi_temp_path` - `/var/cache/nginx/scgi_temp`'</span></span> <span class="token keyword">do</span>
      resource <span class="token operator">=</span> load_resource<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'nginx'</span></span><span class="token punctuation">)</span>
      _<span class="token punctuation">(</span>resource<span class="token punctuation">.</span>http_scgi_temp_path<span class="token punctuation">)</span><span class="token punctuation">.</span>must_match <span class="token string-literal"><span class="token string">'/var/cache/nginx/scgi_temp'</span></span>
    <span class="token keyword">end</span>
  <span class="token keyword">end</span>
<span class="token keyword">end</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_14-3-additional-examples" tabindex="-1"><a class="header-anchor" href="#_14-3-additional-examples" aria-hidden="true">#</a> 14.3. Additional examples</h3>
<h4 id="_14-3-1-pam-resource-currently-open-pr" tabindex="-1"><a class="header-anchor" href="#_14-3-1-pam-resource-currently-open-pr" aria-hidden="true">#</a> 14.3.1. PAM resource currently open PR</h4>
<ul>
<li><a href="https://github.com/simp/inspec-profile-disa_stig-el7/blob/master/libraries/pam.rb" target="_blank" rel="noopener noreferrer">PAM Resource<ExternalLinkIcon/></a></li>
<li><a href="https://github.com/inspec/inspec/pull/3993" target="_blank" rel="noopener noreferrer">PAM PR<ExternalLinkIcon/></a></li>
</ul>
<h4 id="_14-3-2-customizing-an-already-existing-resource-windows-registry" tabindex="-1"><a class="header-anchor" href="#_14-3-2-customizing-an-already-existing-resource-windows-registry" aria-hidden="true">#</a> 14.3.2. Customizing an already existing resource (windows registry)</h4>
<ul>
<li><a href="https://github.com/mitre/microsoft-windows-2012r2-memberserver-stig-baseline/blob/master/libraries/windows_registry.rb" target="_blank" rel="noopener noreferrer">https://github.com/mitre/microsoft-windows-2012r2-memberserver-stig-baseline/blob/master/libraries/windows_registry.rb<ExternalLinkIcon/></a></li>
</ul>
</div></template>


