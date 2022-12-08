import{_ as n}from"./plugin-vue_export-helper.21dcd24c.js";import{d as s}from"./app.3b4d192a.js";const a={},e=s(`<h3 id="_11-1-bridge" tabindex="-1"><a class="header-anchor" href="#_11-1-bridge" aria-hidden="true">#</a> 11.1. bridge</h3><div class="language-ruby ext-rb line-numbers-mode"><pre class="language-ruby"><code><span class="token keyword">require</span> <span class="token string-literal"><span class="token string">&quot;inspec/resources/file&quot;</span></span>

<span class="token comment"># Usage:</span>
<span class="token comment"># describe bridge(&#39;br0&#39;) do</span>
<span class="token comment">#   it { should exist }</span>
<span class="token comment">#   it { should have_interface &#39;eth0&#39; }</span>
<span class="token comment"># end</span>

<span class="token keyword">module</span> <span class="token class-name">Inspec</span><span class="token double-colon punctuation">::</span>Resources
  <span class="token keyword">class</span> <span class="token class-name">Bridge</span> <span class="token operator">&lt;</span> Inspec<span class="token punctuation">.</span>resource<span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
    name <span class="token string-literal"><span class="token string">&quot;bridge&quot;</span></span>
    supports platform<span class="token operator">:</span> <span class="token string-literal"><span class="token string">&quot;unix&quot;</span></span>
    desc <span class="token string-literal"><span class="token string">&quot;Use the bridge InSpec audit resource to test basic network bridge properties, such as name, if an interface is defined, and the associations for any defined interface.&quot;</span></span>
    example <span class="token string-literal heredoc-string"><span class="token delimiter"><span class="token punctuation">&lt;&lt;~</span><span class="token symbol">EXAMPLE</span></span><span class="token string">
      describe bridge &#39;br0&#39; do
        it { should exist }
        it { should have_interface &#39;eth0&#39; }
      end
    </span><span class="token delimiter"><span class="token symbol">EXAMPLE</span></span></span>

    <span class="token keyword">def</span> <span class="token method-definition"><span class="token function">initialize</span></span><span class="token punctuation">(</span>bridge_name<span class="token punctuation">)</span>
      <span class="token variable">@bridge_name</span> <span class="token operator">=</span> bridge_name

      <span class="token variable">@bridge_provider</span> <span class="token operator">=</span> <span class="token keyword">nil</span>
      <span class="token keyword">if</span> inspec<span class="token punctuation">.</span>os<span class="token punctuation">.</span>linux<span class="token operator">?</span>
        <span class="token variable">@bridge_provider</span> <span class="token operator">=</span> <span class="token class-name">LinuxBridge</span><span class="token punctuation">.</span><span class="token keyword">new</span><span class="token punctuation">(</span>inspec<span class="token punctuation">)</span>
      <span class="token keyword">elsif</span> inspec<span class="token punctuation">.</span>os<span class="token punctuation">.</span>windows<span class="token operator">?</span>
        <span class="token variable">@bridge_provider</span> <span class="token operator">=</span> <span class="token class-name">WindowsBridge</span><span class="token punctuation">.</span><span class="token keyword">new</span><span class="token punctuation">(</span>inspec<span class="token punctuation">)</span>
      <span class="token keyword">else</span>
        <span class="token keyword">return</span> skip_resource <span class="token string-literal"><span class="token string">&quot;The \`bridge\` resource is not supported on your OS yet.&quot;</span></span>
      <span class="token keyword">end</span>
    <span class="token keyword">end</span>

    <span class="token keyword">def</span> <span class="token method-definition"><span class="token function">exists</span></span><span class="token operator">?</span>
      <span class="token operator">!</span>bridge_info<span class="token punctuation">.</span><span class="token keyword">nil</span><span class="token operator">?</span> <span class="token operator">&amp;&amp;</span> <span class="token operator">!</span>bridge_info<span class="token punctuation">[</span><span class="token symbol">:name</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token keyword">nil</span><span class="token operator">?</span>
    <span class="token keyword">end</span>

    <span class="token keyword">def</span> <span class="token method-definition"><span class="token function">has_interface</span></span><span class="token operator">?</span><span class="token punctuation">(</span>interface<span class="token punctuation">)</span>
      <span class="token keyword">return</span> skip_resource <span class="token string-literal"><span class="token string">&quot;The \`bridge\` resource does not provide interface detection for Windows yet&quot;</span></span> <span class="token keyword">if</span> inspec<span class="token punctuation">.</span>os<span class="token punctuation">.</span>windows<span class="token operator">?</span>

      bridge_info<span class="token punctuation">.</span><span class="token keyword">nil</span><span class="token operator">?</span> <span class="token operator">?</span> <span class="token boolean">false</span> <span class="token operator">:</span> bridge_info<span class="token punctuation">[</span><span class="token symbol">:interfaces</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token keyword">include</span><span class="token operator">?</span><span class="token punctuation">(</span>interface<span class="token punctuation">)</span>
    <span class="token keyword">end</span>

    <span class="token keyword">def</span> <span class="token method-definition"><span class="token function">interfaces</span></span>
      bridge_info<span class="token punctuation">.</span><span class="token keyword">nil</span><span class="token operator">?</span> <span class="token operator">?</span> <span class="token keyword">nil</span> <span class="token operator">:</span> bridge_info<span class="token punctuation">[</span><span class="token symbol">:interfaces</span><span class="token punctuation">]</span>
    <span class="token keyword">end</span>

    <span class="token keyword">def</span> <span class="token method-definition"><span class="token function">to_s</span></span>
      <span class="token string-literal"><span class="token string">&quot;Bridge </span><span class="token interpolation"><span class="token delimiter punctuation">#{</span><span class="token content"><span class="token variable">@bridge_name</span></span><span class="token delimiter punctuation">}</span></span><span class="token string">&quot;</span></span>
    <span class="token keyword">end</span>

    <span class="token keyword">private</span>

    <span class="token keyword">def</span> <span class="token method-definition"><span class="token function">bridge_info</span></span>
      <span class="token keyword">return</span> <span class="token variable">@cache</span> <span class="token keyword">if</span> <span class="token keyword">defined</span><span class="token operator">?</span><span class="token punctuation">(</span><span class="token variable">@cache</span><span class="token punctuation">)</span>

      <span class="token variable">@cache</span> <span class="token operator">=</span> <span class="token variable">@bridge_provider</span><span class="token punctuation">.</span>bridge_info<span class="token punctuation">(</span><span class="token variable">@bridge_name</span><span class="token punctuation">)</span> <span class="token keyword">unless</span> <span class="token variable">@bridge_provider</span><span class="token punctuation">.</span><span class="token keyword">nil</span><span class="token operator">?</span>
    <span class="token keyword">end</span>
  <span class="token keyword">end</span>

  <span class="token keyword">class</span> <span class="token class-name">BridgeDetection</span>
    attr_reader <span class="token symbol">:inspec</span>
    <span class="token keyword">def</span> <span class="token method-definition"><span class="token function">initialize</span></span><span class="token punctuation">(</span>inspec<span class="token punctuation">)</span>
      <span class="token variable">@inspec</span> <span class="token operator">=</span> inspec
    <span class="token keyword">end</span>
  <span class="token keyword">end</span>

  <span class="token comment"># Linux Bridge</span>
  <span class="token comment"># If /sys/class/net/{interface}/bridge exists then it must be a bridge</span>
  <span class="token comment"># /sys/class/net/{interface}/brif contains the network interfaces</span>
  <span class="token comment"># @see http://www.tldp.org/HOWTO/BRIDGE-STP-HOWTO/set-up-the-bridge.html</span>
  <span class="token comment"># @see http://unix.stackexchange.com/questions/40560/how-to-know-if-a-network-interface-is-tap-tun-bridge-or-physical</span>
  <span class="token keyword">class</span> <span class="token class-name">LinuxBridge</span> <span class="token operator">&lt;</span> BridgeDetection
    <span class="token keyword">def</span> <span class="token method-definition"><span class="token function">bridge_info</span></span><span class="token punctuation">(</span>bridge_name<span class="token punctuation">)</span>
      <span class="token comment"># read bridge information</span>
      bridge <span class="token operator">=</span> inspec<span class="token punctuation">.</span>file<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;/sys/class/net/</span><span class="token interpolation"><span class="token delimiter punctuation">#{</span><span class="token content">bridge_name</span><span class="token delimiter punctuation">}</span></span><span class="token string">/bridge&quot;</span></span><span class="token punctuation">)</span><span class="token punctuation">.</span>directory<span class="token operator">?</span>
      <span class="token keyword">return</span> <span class="token keyword">nil</span> <span class="token keyword">unless</span> bridge

      <span class="token comment"># load interface names</span>
      interfaces <span class="token operator">=</span> inspec<span class="token punctuation">.</span>command<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;ls -1 /sys/class/net/</span><span class="token interpolation"><span class="token delimiter punctuation">#{</span><span class="token content">bridge_name</span><span class="token delimiter punctuation">}</span></span><span class="token string">/brif/&quot;</span></span><span class="token punctuation">)</span>
      interfaces <span class="token operator">=</span> interfaces<span class="token punctuation">.</span>stdout<span class="token punctuation">.</span>chomp<span class="token punctuation">.</span>split<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;\\n&quot;</span></span><span class="token punctuation">)</span>
      <span class="token punctuation">{</span>
        <span class="token symbol">name</span><span class="token operator">:</span> bridge_name<span class="token punctuation">,</span>
        <span class="token symbol">interfaces</span><span class="token operator">:</span> interfaces<span class="token punctuation">,</span>
      <span class="token punctuation">}</span>
    <span class="token keyword">end</span>
  <span class="token keyword">end</span>

  <span class="token comment"># Windows Bridge</span>
  <span class="token comment"># select netadapter by adapter binding for windows</span>
  <span class="token comment"># Get-NetAdapterBinding -ComponentID ms_bridge | Get-NetAdapter</span>
  <span class="token comment"># @see https://technet.microsoft.com/en-us/library/jj130921(v=wps.630).aspx</span>
  <span class="token comment"># RegKeys: HKEY_LOCAL_MACHINE\\SYSTEM\\CurrentControlSet\\Control\\Class\\{4D36E972-E325-11CE-BFC1-08002BE10318}</span>
  <span class="token keyword">class</span> <span class="token class-name">WindowsBridge</span> <span class="token operator">&lt;</span> BridgeDetection
    <span class="token keyword">def</span> <span class="token method-definition"><span class="token function">bridge_info</span></span><span class="token punctuation">(</span>bridge_name<span class="token punctuation">)</span>
      <span class="token comment"># find all bridge adapters</span>
      cmd <span class="token operator">=</span> inspec<span class="token punctuation">.</span>command<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;Get-NetAdapterBinding -ComponentID ms_bridge | Get-NetAdapter | Select-Object -Property Name, InterfaceDescription | ConvertTo-Json&quot;</span></span><span class="token punctuation">)</span>

      <span class="token comment"># filter network interface</span>
      <span class="token keyword">begin</span>
        bridges <span class="token operator">=</span> <span class="token constant">JSON</span><span class="token punctuation">.</span>parse<span class="token punctuation">(</span>cmd<span class="token punctuation">.</span>stdout<span class="token punctuation">)</span>
      <span class="token keyword">rescue</span> <span class="token constant">JSON</span><span class="token double-colon punctuation">::</span>ParserError <span class="token operator">=&gt;</span> _e
        <span class="token keyword">return</span> <span class="token keyword">nil</span>
      <span class="token keyword">end</span>

      <span class="token comment"># ensure we have an array of groups</span>
      bridges <span class="token operator">=</span> <span class="token punctuation">[</span>bridges<span class="token punctuation">]</span> <span class="token keyword">unless</span> bridges<span class="token punctuation">.</span>is_a<span class="token operator">?</span><span class="token punctuation">(</span><span class="token builtin">Array</span><span class="token punctuation">)</span>

      <span class="token comment"># select the requested interface</span>
      bridges <span class="token operator">=</span> bridges<span class="token punctuation">.</span>each_with_object<span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token keyword">do</span> <span class="token operator">|</span>adapter<span class="token punctuation">,</span> adapter_collection<span class="token operator">|</span>
        <span class="token comment"># map object</span>
        info <span class="token operator">=</span> <span class="token punctuation">{</span>
          <span class="token symbol">name</span><span class="token operator">:</span> adapter<span class="token punctuation">[</span><span class="token string-literal"><span class="token string">&quot;Name&quot;</span></span><span class="token punctuation">]</span><span class="token punctuation">,</span>
          <span class="token symbol">interfaces</span><span class="token operator">:</span> <span class="token keyword">nil</span><span class="token punctuation">,</span>
        <span class="token punctuation">}</span>
        adapter_collection<span class="token punctuation">.</span>push<span class="token punctuation">(</span>info<span class="token punctuation">)</span> <span class="token keyword">if</span> info<span class="token punctuation">[</span><span class="token symbol">:name</span><span class="token punctuation">]</span><span class="token punctuation">.</span>casecmp<span class="token punctuation">(</span>bridge_name<span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token number">0</span>
      <span class="token keyword">end</span>

      <span class="token keyword">return</span> <span class="token keyword">nil</span> <span class="token keyword">if</span> bridges<span class="token punctuation">.</span>empty<span class="token operator">?</span>

      warn <span class="token string-literal"><span class="token string">&quot;[Possible Error] detected multiple bridges interfaces with the name </span><span class="token interpolation"><span class="token delimiter punctuation">#{</span><span class="token content">bridge_name</span><span class="token delimiter punctuation">}</span></span><span class="token string">&quot;</span></span> <span class="token keyword">if</span> bridges<span class="token punctuation">.</span>size <span class="token operator">&gt;</span> <span class="token number">1</span>
      bridges<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span>
    <span class="token keyword">end</span>
  <span class="token keyword">end</span>
<span class="token keyword">end</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_11-2-command" tabindex="-1"><a class="header-anchor" href="#_11-2-command" aria-hidden="true">#</a> 11.2. command</h3><div class="language-ruby ext-rb line-numbers-mode"><pre class="language-ruby"><code><span class="token comment"># copyright: 2015, Vulcano Security GmbH</span>

<span class="token keyword">require</span> <span class="token string-literal"><span class="token string">&quot;inspec/resource&quot;</span></span>

<span class="token keyword">module</span> <span class="token class-name">Inspec</span><span class="token double-colon punctuation">::</span>Resources
  <span class="token keyword">class</span> <span class="token class-name">Cmd</span> <span class="token operator">&lt;</span> Inspec<span class="token punctuation">.</span>resource<span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
    name <span class="token string-literal"><span class="token string">&quot;command&quot;</span></span>
    supports platform<span class="token operator">:</span> <span class="token string-literal"><span class="token string">&quot;unix&quot;</span></span>
    supports platform<span class="token operator">:</span> <span class="token string-literal"><span class="token string">&quot;windows&quot;</span></span>
    desc <span class="token string-literal"><span class="token string">&quot;Use the command InSpec audit resource to test an arbitrary command that is run on the system.&quot;</span></span>
    example <span class="token string-literal heredoc-string"><span class="token delimiter"><span class="token punctuation">&lt;&lt;~</span><span class="token symbol">EXAMPLE</span></span><span class="token string">
      describe command(&#39;ls -al /&#39;) do
        its(&#39;stdout&#39;) { should match /bin/ }
        its(&#39;stderr&#39;) { should eq &#39;&#39; }
        its(&#39;exit_status&#39;) { should eq 0 }
      end

      command(&#39;ls -al /&#39;).exist? will return false. Existence of command should be checked this way.
      describe command(&#39;ls&#39;) do
        it { should exist }
      end
    </span><span class="token delimiter"><span class="token symbol">EXAMPLE</span></span></span>

    attr_reader <span class="token symbol">:command</span>

    <span class="token keyword">def</span> <span class="token method-definition"><span class="token function">initialize</span></span><span class="token punctuation">(</span>cmd<span class="token punctuation">,</span> options <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
      <span class="token keyword">if</span> cmd<span class="token punctuation">.</span><span class="token keyword">nil</span><span class="token operator">?</span>
        <span class="token keyword">raise</span> <span class="token string-literal"><span class="token string">&quot;InSpec \`command\` was called with \`nil\` as the argument. This is not supported. Please provide a valid command instead.&quot;</span></span>
      <span class="token keyword">end</span>

      <span class="token variable">@command</span> <span class="token operator">=</span> cmd

      <span class="token keyword">if</span> options<span class="token punctuation">[</span><span class="token symbol">:redact_regex</span><span class="token punctuation">]</span>
        <span class="token keyword">unless</span> options<span class="token punctuation">[</span><span class="token symbol">:redact_regex</span><span class="token punctuation">]</span><span class="token punctuation">.</span>is_a<span class="token operator">?</span><span class="token punctuation">(</span><span class="token builtin">Regexp</span><span class="token punctuation">)</span>
          <span class="token comment"># Make sure command is replaced so sensitive output isn&#39;t shown</span>
          <span class="token variable">@command</span> <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;ERROR&quot;</span></span>
          <span class="token keyword">raise</span> Inspec<span class="token double-colon punctuation">::</span>Exceptions<span class="token double-colon punctuation">::</span>ResourceFailed<span class="token punctuation">,</span>
            <span class="token string-literal"><span class="token string">&quot;The \`redact_regex\` option must be a regular expression&quot;</span></span>
        <span class="token keyword">end</span>
        <span class="token variable">@redact_regex</span> <span class="token operator">=</span> options<span class="token punctuation">[</span><span class="token symbol">:redact_regex</span><span class="token punctuation">]</span>
      <span class="token keyword">end</span>
    <span class="token keyword">end</span>

    <span class="token keyword">def</span> <span class="token method-definition"><span class="token function">result</span></span>
      <span class="token variable">@result</span> <span class="token operator">||=</span> inspec<span class="token punctuation">.</span>backend<span class="token punctuation">.</span>run_command<span class="token punctuation">(</span><span class="token variable">@command</span><span class="token punctuation">)</span>
    <span class="token keyword">end</span>

    <span class="token keyword">def</span> <span class="token method-definition"><span class="token function">stdout</span></span>
      result<span class="token punctuation">.</span>stdout
    <span class="token keyword">end</span>

    <span class="token keyword">def</span> <span class="token method-definition"><span class="token function">stderr</span></span>
      result<span class="token punctuation">.</span>stderr
    <span class="token keyword">end</span>

    <span class="token keyword">def</span> <span class="token method-definition"><span class="token function">exit_status</span></span>
      result<span class="token punctuation">.</span>exit_status<span class="token punctuation">.</span>to_i
    <span class="token keyword">end</span>

    <span class="token keyword">def</span> <span class="token method-definition"><span class="token function">exist</span></span><span class="token operator">?</span> <span class="token comment"># rubocop:disable Metrics/AbcSize</span>
      <span class="token comment"># silent for mock resources</span>
      <span class="token keyword">return</span> <span class="token boolean">false</span> <span class="token keyword">if</span> inspec<span class="token punctuation">.</span>os<span class="token punctuation">.</span>name<span class="token punctuation">.</span><span class="token keyword">nil</span><span class="token operator">?</span> <span class="token operator">||</span> inspec<span class="token punctuation">.</span>os<span class="token punctuation">.</span>name <span class="token operator">==</span> <span class="token string-literal"><span class="token string">&quot;mock&quot;</span></span>

      <span class="token keyword">if</span> inspec<span class="token punctuation">.</span>os<span class="token punctuation">.</span>linux<span class="token operator">?</span>
        res <span class="token operator">=</span> <span class="token keyword">if</span> inspec<span class="token punctuation">.</span>platform<span class="token punctuation">.</span>name <span class="token operator">==</span> <span class="token string-literal"><span class="token string">&quot;alpine&quot;</span></span>
                inspec<span class="token punctuation">.</span>backend<span class="token punctuation">.</span>run_command<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;which \\&quot;</span><span class="token interpolation"><span class="token delimiter punctuation">#{</span><span class="token content"><span class="token variable">@command</span></span><span class="token delimiter punctuation">}</span></span><span class="token string">\\&quot;&quot;</span></span><span class="token punctuation">)</span>
              <span class="token keyword">else</span>
                inspec<span class="token punctuation">.</span>backend<span class="token punctuation">.</span>run_command<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;bash -c &#39;type \\&quot;</span><span class="token interpolation"><span class="token delimiter punctuation">#{</span><span class="token content"><span class="token variable">@command</span></span><span class="token delimiter punctuation">}</span></span><span class="token string">\\&quot;&#39;&quot;</span></span><span class="token punctuation">)</span>
              <span class="token keyword">end</span>
      <span class="token keyword">elsif</span> inspec<span class="token punctuation">.</span>os<span class="token punctuation">.</span>windows<span class="token operator">?</span>
        res <span class="token operator">=</span> inspec<span class="token punctuation">.</span>backend<span class="token punctuation">.</span>run_command<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;Get-Command \\&quot;</span><span class="token interpolation"><span class="token delimiter punctuation">#{</span><span class="token content"><span class="token variable">@command</span></span><span class="token delimiter punctuation">}</span></span><span class="token string">\\&quot;&quot;</span></span><span class="token punctuation">)</span>
      <span class="token keyword">elsif</span> inspec<span class="token punctuation">.</span>os<span class="token punctuation">.</span>unix<span class="token operator">?</span>
        res <span class="token operator">=</span> inspec<span class="token punctuation">.</span>backend<span class="token punctuation">.</span>run_command<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;type \\&quot;</span><span class="token interpolation"><span class="token delimiter punctuation">#{</span><span class="token content"><span class="token variable">@command</span></span><span class="token delimiter punctuation">}</span></span><span class="token string">\\&quot;&quot;</span></span><span class="token punctuation">)</span>
      <span class="token keyword">else</span>
        warn <span class="token string-literal"><span class="token string">&quot;\`command(</span><span class="token interpolation"><span class="token delimiter punctuation">#{</span><span class="token content"><span class="token variable">@command</span></span><span class="token delimiter punctuation">}</span></span><span class="token string">).exist?\` is not supported on your OS: </span><span class="token interpolation"><span class="token delimiter punctuation">#{</span><span class="token content">inspec<span class="token punctuation">.</span>os<span class="token punctuation">[</span><span class="token symbol">:name</span><span class="token punctuation">]</span></span><span class="token delimiter punctuation">}</span></span><span class="token string">&quot;</span></span>
        <span class="token keyword">return</span> <span class="token boolean">false</span>
      <span class="token keyword">end</span>
      res<span class="token punctuation">.</span>exit_status<span class="token punctuation">.</span>to_i <span class="token operator">==</span> <span class="token number">0</span>
    <span class="token keyword">end</span>

    <span class="token keyword">def</span> <span class="token method-definition"><span class="token function">to_s</span></span>
      output <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;Command: \`</span><span class="token interpolation"><span class="token delimiter punctuation">#{</span><span class="token content"><span class="token variable">@command</span></span><span class="token delimiter punctuation">}</span></span><span class="token string">\`&quot;</span></span>
      <span class="token comment"># Redact output if the \`redact_regex\` option is passed</span>
      <span class="token comment"># If no capture groups are passed then \`\\1\` and \`\\2\` are ignored</span>
      output<span class="token punctuation">.</span>gsub<span class="token operator">!</span><span class="token punctuation">(</span><span class="token variable">@redact_regex</span><span class="token punctuation">,</span> <span class="token string-literal"><span class="token string">&#39;\\1REDACTED\\2&#39;</span></span><span class="token punctuation">)</span> <span class="token keyword">unless</span> <span class="token variable">@redact_regex</span><span class="token punctuation">.</span><span class="token keyword">nil</span><span class="token operator">?</span>
      output
    <span class="token keyword">end</span>
  <span class="token keyword">end</span>
<span class="token keyword">end</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_11-3-nginx" tabindex="-1"><a class="header-anchor" href="#_11-3-nginx" aria-hidden="true">#</a> 11.3. NGINX</h3><div class="language-ruby ext-rb line-numbers-mode"><pre class="language-ruby"><code><span class="token keyword">require</span> <span class="token string-literal"><span class="token string">&quot;pathname&quot;</span></span>
<span class="token keyword">require</span> <span class="token string-literal"><span class="token string">&quot;hashie/mash&quot;</span></span>
<span class="token keyword">require</span> <span class="token string-literal"><span class="token string">&quot;inspec/resources/command&quot;</span></span>

<span class="token keyword">module</span> <span class="token class-name">Inspec</span><span class="token double-colon punctuation">::</span>Resources
  <span class="token keyword">class</span> <span class="token class-name">Nginx</span> <span class="token operator">&lt;</span> Inspec<span class="token punctuation">.</span>resource<span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
    name <span class="token string-literal"><span class="token string">&quot;nginx&quot;</span></span>
    supports platform<span class="token operator">:</span> <span class="token string-literal"><span class="token string">&quot;unix&quot;</span></span>
    desc <span class="token string-literal"><span class="token string">&quot;Use the nginx InSpec audit resource to test information about your NGINX instance.&quot;</span></span>
    example <span class="token string-literal heredoc-string"><span class="token delimiter"><span class="token punctuation">&lt;&lt;~</span><span class="token symbol">EXAMPLE</span></span><span class="token string">
      describe nginx do
        its(&#39;conf_path&#39;) { should cmp &#39;/etc/nginx/nginx.conf&#39; }
      end
      describe nginx(&#39;/etc/sbin/&#39;) do
        its(&#39;version&#39;) { should be &gt;= &#39;1.0.0&#39; }
      end
      describe nginx do
        its(&#39;modules&#39;) { should include &#39;my_module&#39; }
      end
    </span><span class="token delimiter"><span class="token symbol">EXAMPLE</span></span></span>
    attr_reader <span class="token symbol">:params</span><span class="token punctuation">,</span> <span class="token symbol">:bin_dir</span>

    <span class="token keyword">def</span> <span class="token method-definition"><span class="token function">initialize</span></span><span class="token punctuation">(</span>nginx_path <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;/usr/sbin/nginx&quot;</span></span><span class="token punctuation">)</span>
      <span class="token keyword">return</span> skip_resource <span class="token string-literal"><span class="token string">&quot;The \`nginx\` resource is not yet available on your OS.&quot;</span></span> <span class="token keyword">if</span> inspec<span class="token punctuation">.</span>os<span class="token punctuation">.</span>windows<span class="token operator">?</span>
      <span class="token keyword">return</span> skip_resource <span class="token string-literal"><span class="token string">&quot;The \`nginx\` binary not found in the path provided.&quot;</span></span> <span class="token keyword">unless</span> inspec<span class="token punctuation">.</span>command<span class="token punctuation">(</span>nginx_path<span class="token punctuation">)</span><span class="token punctuation">.</span>exist<span class="token operator">?</span>

      cmd <span class="token operator">=</span> inspec<span class="token punctuation">.</span>command<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;</span><span class="token interpolation"><span class="token delimiter punctuation">#{</span><span class="token content">nginx_path</span><span class="token delimiter punctuation">}</span></span><span class="token string"> -V 2&gt;&amp;1&quot;</span></span><span class="token punctuation">)</span>
      <span class="token keyword">if</span> cmd<span class="token punctuation">.</span>exit_status <span class="token operator">!=</span> <span class="token number">0</span>
        <span class="token keyword">return</span> skip_resource <span class="token string-literal"><span class="token string">&quot;Error using the command nginx -V&quot;</span></span>
      <span class="token keyword">end</span>

      <span class="token variable">@data</span> <span class="token operator">=</span> cmd<span class="token punctuation">.</span>stdout
      <span class="token variable">@params</span> <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
      read_content
    <span class="token keyword">end</span>

    <span class="token string-literal"><span class="token string">%w{error_log_path http_client_body_temp_path http_fastcgi_temp_path http_log_path http_proxy_temp_path http_scgi_temp_path http_uwsgi_temp_path lock_path modules_path prefix sbin_path service version}</span></span><span class="token punctuation">.</span><span class="token keyword">each</span> <span class="token keyword">do</span> <span class="token operator">|</span>property<span class="token operator">|</span>
      <span class="token keyword">define_method</span><span class="token punctuation">(</span>property<span class="token punctuation">.</span>to_sym<span class="token punctuation">)</span> <span class="token keyword">do</span>
        <span class="token variable">@params</span><span class="token punctuation">[</span>property<span class="token punctuation">.</span>to_sym<span class="token punctuation">]</span>
      <span class="token keyword">end</span>
    <span class="token keyword">end</span>

    <span class="token keyword">def</span> <span class="token method-definition"><span class="token function">openssl_version</span></span>
      result <span class="token operator">=</span> <span class="token variable">@data</span><span class="token punctuation">.</span>scan<span class="token punctuation">(</span><span class="token regex-literal"><span class="token regex">/built with OpenSSL\\s(\\S+)\\s(\\d+\\s\\S+\\s\\d{4})/</span></span><span class="token punctuation">)</span><span class="token punctuation">.</span>flatten
      Hashie<span class="token double-colon punctuation">::</span><span class="token class-name">Mash</span><span class="token punctuation">.</span><span class="token keyword">new</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token string-literal"><span class="token string">&quot;version&quot;</span></span> <span class="token operator">=&gt;</span> result<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token string-literal"><span class="token string">&quot;date&quot;</span></span> <span class="token operator">=&gt;</span> result<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token keyword">end</span>

    <span class="token keyword">def</span> <span class="token method-definition"><span class="token function">compiler_info</span></span>
      result <span class="token operator">=</span> <span class="token variable">@data</span><span class="token punctuation">.</span>scan<span class="token punctuation">(</span><span class="token regex-literal"><span class="token regex">/built by (\\S+)\\s(\\S+)\\s(\\S+)/</span></span><span class="token punctuation">)</span><span class="token punctuation">.</span>flatten
      Hashie<span class="token double-colon punctuation">::</span><span class="token class-name">Mash</span><span class="token punctuation">.</span><span class="token keyword">new</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token string-literal"><span class="token string">&quot;compiler&quot;</span></span> <span class="token operator">=&gt;</span> result<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token string-literal"><span class="token string">&quot;version&quot;</span></span> <span class="token operator">=&gt;</span> result<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token string-literal"><span class="token string">&quot;date&quot;</span></span> <span class="token operator">=&gt;</span> result<span class="token punctuation">[</span><span class="token number">2</span><span class="token punctuation">]</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token keyword">end</span>

    <span class="token keyword">def</span> <span class="token method-definition"><span class="token function">support_info</span></span>
      support_info <span class="token operator">=</span> <span class="token variable">@data</span><span class="token punctuation">.</span>scan<span class="token punctuation">(</span><span class="token regex-literal"><span class="token regex">/(.*\\S+) support enabled/</span></span><span class="token punctuation">)</span><span class="token punctuation">.</span>flatten
      support_info<span class="token punctuation">.</span>empty<span class="token operator">?</span> <span class="token operator">?</span> <span class="token keyword">nil</span> <span class="token operator">:</span> support_info<span class="token punctuation">.</span>join<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot; &quot;</span></span><span class="token punctuation">)</span>
    <span class="token keyword">end</span>

    <span class="token keyword">def</span> <span class="token method-definition"><span class="token function">modules</span></span>
      <span class="token variable">@data</span><span class="token punctuation">.</span>scan<span class="token punctuation">(</span><span class="token regex-literal"><span class="token regex">/--with-(\\S+)_module/</span></span><span class="token punctuation">)</span><span class="token punctuation">.</span>flatten
    <span class="token keyword">end</span>

    <span class="token keyword">def</span> <span class="token method-definition"><span class="token function">to_s</span></span>
      <span class="token string-literal"><span class="token string">&quot;Nginx Environment&quot;</span></span>
    <span class="token keyword">end</span>

    <span class="token keyword">private</span>

    <span class="token keyword">def</span> <span class="token method-definition"><span class="token function">read_content</span></span>
      parse_config
      parse_path
      parse_http_path
    <span class="token keyword">end</span>

    <span class="token keyword">def</span> <span class="token method-definition"><span class="token function">parse_config</span></span>
      <span class="token variable">@params</span><span class="token punctuation">[</span><span class="token symbol">:prefix</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token variable">@data</span><span class="token punctuation">.</span>scan<span class="token punctuation">(</span><span class="token regex-literal"><span class="token regex">/--prefix=(\\S+)\\s/</span></span><span class="token punctuation">)</span><span class="token punctuation">.</span>flatten<span class="token punctuation">.</span>first
      <span class="token variable">@params</span><span class="token punctuation">[</span><span class="token symbol">:service</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;nginx&quot;</span></span>
      <span class="token variable">@params</span><span class="token punctuation">[</span><span class="token symbol">:version</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token variable">@data</span><span class="token punctuation">.</span>scan<span class="token punctuation">(</span><span class="token regex-literal"><span class="token regex">%r{nginx version: nginx\\/(\\S+)\\s}</span></span><span class="token punctuation">)</span><span class="token punctuation">.</span>flatten<span class="token punctuation">.</span>first
    <span class="token keyword">end</span>

    <span class="token keyword">def</span> <span class="token method-definition"><span class="token function">parse_path</span></span>
      <span class="token variable">@params</span><span class="token punctuation">[</span><span class="token symbol">:sbin_path</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token variable">@data</span><span class="token punctuation">.</span>scan<span class="token punctuation">(</span><span class="token regex-literal"><span class="token regex">/--sbin-path=(\\S+)\\s/</span></span><span class="token punctuation">)</span><span class="token punctuation">.</span>flatten<span class="token punctuation">.</span>first
      <span class="token variable">@params</span><span class="token punctuation">[</span><span class="token symbol">:modules_path</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token variable">@data</span><span class="token punctuation">.</span>scan<span class="token punctuation">(</span><span class="token regex-literal"><span class="token regex">/--modules-path=(\\S+)\\s/</span></span><span class="token punctuation">)</span><span class="token punctuation">.</span>flatten<span class="token punctuation">.</span>first
      <span class="token variable">@params</span><span class="token punctuation">[</span><span class="token symbol">:error_log_path</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token variable">@data</span><span class="token punctuation">.</span>scan<span class="token punctuation">(</span><span class="token regex-literal"><span class="token regex">/--error-log-path=(\\S+)\\s/</span></span><span class="token punctuation">)</span><span class="token punctuation">.</span>flatten<span class="token punctuation">.</span>first
      <span class="token variable">@params</span><span class="token punctuation">[</span><span class="token symbol">:http_log_path</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token variable">@data</span><span class="token punctuation">.</span>scan<span class="token punctuation">(</span><span class="token regex-literal"><span class="token regex">/--http-log-path=(\\S+)\\s/</span></span><span class="token punctuation">)</span><span class="token punctuation">.</span>flatten<span class="token punctuation">.</span>first
      <span class="token variable">@params</span><span class="token punctuation">[</span><span class="token symbol">:lock_path</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token variable">@data</span><span class="token punctuation">.</span>scan<span class="token punctuation">(</span><span class="token regex-literal"><span class="token regex">/--lock-path=(\\S+)\\s/</span></span><span class="token punctuation">)</span><span class="token punctuation">.</span>flatten<span class="token punctuation">.</span>first
    <span class="token keyword">end</span>

    <span class="token keyword">def</span> <span class="token method-definition"><span class="token function">parse_http_path</span></span>
      <span class="token variable">@params</span><span class="token punctuation">[</span><span class="token symbol">:http_client_body_temp_path</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token variable">@data</span><span class="token punctuation">.</span>scan<span class="token punctuation">(</span><span class="token regex-literal"><span class="token regex">/--http-client-body-temp-path=(\\S+)\\s/</span></span><span class="token punctuation">)</span><span class="token punctuation">.</span>flatten<span class="token punctuation">.</span>first
      <span class="token variable">@params</span><span class="token punctuation">[</span><span class="token symbol">:http_proxy_temp_path</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token variable">@data</span><span class="token punctuation">.</span>scan<span class="token punctuation">(</span><span class="token regex-literal"><span class="token regex">/--http-proxy-temp-path=(\\S+)\\s/</span></span><span class="token punctuation">)</span><span class="token punctuation">.</span>flatten<span class="token punctuation">.</span>first
      <span class="token variable">@params</span><span class="token punctuation">[</span><span class="token symbol">:http_fastcgi_temp_path</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token variable">@data</span><span class="token punctuation">.</span>scan<span class="token punctuation">(</span><span class="token regex-literal"><span class="token regex">/--http-fastcgi-temp-path=(\\S+)\\s/</span></span><span class="token punctuation">)</span><span class="token punctuation">.</span>flatten<span class="token punctuation">.</span>first
      <span class="token variable">@params</span><span class="token punctuation">[</span><span class="token symbol">:http_uwsgi_temp_path</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token variable">@data</span><span class="token punctuation">.</span>scan<span class="token punctuation">(</span><span class="token regex-literal"><span class="token regex">/--http-uwsgi-temp-path=(\\S+)\\s/</span></span><span class="token punctuation">)</span><span class="token punctuation">.</span>flatten<span class="token punctuation">.</span>first
      <span class="token variable">@params</span><span class="token punctuation">[</span><span class="token symbol">:http_scgi_temp_path</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token variable">@data</span><span class="token punctuation">.</span>scan<span class="token punctuation">(</span><span class="token regex-literal"><span class="token regex">/--http-scgi-temp-path=(\\S+)\\s/</span></span><span class="token punctuation">)</span><span class="token punctuation">.</span>flatten<span class="token punctuation">.</span>first
    <span class="token keyword">end</span>
  <span class="token keyword">end</span>
<span class="token keyword">end</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_11-4-file" tabindex="-1"><a class="header-anchor" href="#_11-4-file" aria-hidden="true">#</a> 11.4. File</h3><div class="language-ruby ext-rb line-numbers-mode"><pre class="language-ruby"><code><span class="token comment"># copyright: 2015, Vulcano Security GmbH</span>

<span class="token keyword">require</span> <span class="token string-literal"><span class="token string">&quot;shellwords&quot;</span></span>
<span class="token keyword">require</span> <span class="token string-literal"><span class="token string">&quot;inspec/utils/parser&quot;</span></span>

<span class="token keyword">module</span> <span class="token class-name">Inspec</span><span class="token double-colon punctuation">::</span>Resources
  <span class="token keyword">module</span> <span class="token class-name">FilePermissionsSelector</span>
    <span class="token keyword">def</span> <span class="token method-definition"><span class="token function">select_file_perms_style</span></span><span class="token punctuation">(</span>os<span class="token punctuation">)</span>
      <span class="token keyword">if</span> os<span class="token punctuation">.</span>unix<span class="token operator">?</span>
        <span class="token class-name">UnixFilePermissions</span><span class="token punctuation">.</span><span class="token keyword">new</span><span class="token punctuation">(</span>inspec<span class="token punctuation">)</span>
      <span class="token keyword">elsif</span> os<span class="token punctuation">.</span>windows<span class="token operator">?</span>
        <span class="token class-name">WindowsFilePermissions</span><span class="token punctuation">.</span><span class="token keyword">new</span><span class="token punctuation">(</span>inspec<span class="token punctuation">)</span>
      <span class="token keyword">end</span>
    <span class="token keyword">end</span>
  <span class="token keyword">end</span>

  <span class="token comment"># TODO: rename file_resource.rb</span>
  <span class="token keyword">class</span> <span class="token class-name">FileResource</span> <span class="token operator">&lt;</span> Inspec<span class="token punctuation">.</span>resource<span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
    <span class="token keyword">include</span> FilePermissionsSelector
    <span class="token keyword">include</span> LinuxMountParser

    name <span class="token string-literal"><span class="token string">&quot;file&quot;</span></span>
    supports platform<span class="token operator">:</span> <span class="token string-literal"><span class="token string">&quot;unix&quot;</span></span>
    supports platform<span class="token operator">:</span> <span class="token string-literal"><span class="token string">&quot;windows&quot;</span></span>
    desc <span class="token string-literal"><span class="token string">&quot;Use the file InSpec audit resource to test all system file types, including files, directories, symbolic links, named pipes, sockets, character devices, block devices, and doors.&quot;</span></span>
    example <span class="token string-literal heredoc-string"><span class="token delimiter"><span class="token punctuation">&lt;&lt;~</span><span class="token symbol">EXAMPLE</span></span><span class="token string">
      describe file(&#39;path&#39;) do
        it { should exist }
        it { should be_file }
        it { should be_readable }
        it { should be_writable }
        it { should be_executable.by_user(&#39;root&#39;) }
        it { should be_owned_by &#39;root&#39; }
        its(&#39;mode&#39;) { should cmp &#39;0644&#39; }
      end
    </span><span class="token delimiter"><span class="token symbol">EXAMPLE</span></span></span>

    attr_reader <span class="token symbol">:file</span><span class="token punctuation">,</span> <span class="token symbol">:mount_options</span>
    <span class="token keyword">def</span> <span class="token method-definition"><span class="token function">initialize</span></span><span class="token punctuation">(</span>path<span class="token punctuation">)</span>
      <span class="token comment"># select permissions style</span>
      <span class="token variable">@perms_provider</span> <span class="token operator">=</span> select_file_perms_style<span class="token punctuation">(</span>inspec<span class="token punctuation">.</span>os<span class="token punctuation">)</span>
      <span class="token variable">@file</span> <span class="token operator">=</span> inspec<span class="token punctuation">.</span>backend<span class="token punctuation">.</span>file<span class="token punctuation">(</span>path<span class="token punctuation">)</span>
    <span class="token keyword">end</span>

    <span class="token string-literal"><span class="token string">%w{
      type exist? file? block_device? character_device? socket? directory?
      symlink? pipe? mode mode? owner owned_by? group grouped_into?
      link_path shallow_link_path linked_to? mtime size selinux_label immutable?
      product_version file_version version? md5sum sha256sum
      path basename source source_path uid gid
    }</span></span><span class="token punctuation">.</span><span class="token keyword">each</span> <span class="token keyword">do</span> <span class="token operator">|</span>m<span class="token operator">|</span>
      <span class="token keyword">define_method</span> m <span class="token keyword">do</span> <span class="token operator">|</span><span class="token operator">*</span>args<span class="token operator">|</span>
        file<span class="token punctuation">.</span>send<span class="token punctuation">(</span>m<span class="token punctuation">,</span> <span class="token operator">*</span>args<span class="token punctuation">)</span>
      <span class="token keyword">end</span>
    <span class="token keyword">end</span>

    <span class="token keyword">def</span> <span class="token method-definition"><span class="token function">content</span></span>
      res <span class="token operator">=</span> file<span class="token punctuation">.</span>content
      <span class="token keyword">return</span> <span class="token keyword">nil</span> <span class="token keyword">if</span> res<span class="token punctuation">.</span><span class="token keyword">nil</span><span class="token operator">?</span>

      res<span class="token punctuation">.</span>force_encoding<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;utf-8&quot;</span></span><span class="token punctuation">)</span>
    <span class="token keyword">end</span>

    <span class="token keyword">def</span> <span class="token method-definition"><span class="token function">contain</span></span><span class="token punctuation">(</span><span class="token operator">*</span>_<span class="token punctuation">)</span>
      <span class="token keyword">raise</span> <span class="token string-literal"><span class="token string">&quot;Contain is not supported. Please use standard RSpec matchers.&quot;</span></span>
    <span class="token keyword">end</span>

    <span class="token keyword">def</span> <span class="token method-definition"><span class="token function">readable</span></span><span class="token operator">?</span><span class="token punctuation">(</span>by_usergroup<span class="token punctuation">,</span> by_specific_user<span class="token punctuation">)</span>
      <span class="token keyword">return</span> <span class="token boolean">false</span> <span class="token keyword">unless</span> exist<span class="token operator">?</span>
      <span class="token keyword">return</span> skip_resource <span class="token string-literal"><span class="token string">&quot;\`readable?\` is not supported on your OS yet.&quot;</span></span> <span class="token keyword">if</span> <span class="token variable">@perms_provider</span><span class="token punctuation">.</span><span class="token keyword">nil</span><span class="token operator">?</span>

      file_permission_granted<span class="token operator">?</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;read&quot;</span></span><span class="token punctuation">,</span> by_usergroup<span class="token punctuation">,</span> by_specific_user<span class="token punctuation">)</span>
    <span class="token keyword">end</span>

    <span class="token keyword">def</span> <span class="token method-definition"><span class="token function">writable</span></span><span class="token operator">?</span><span class="token punctuation">(</span>by_usergroup<span class="token punctuation">,</span> by_specific_user<span class="token punctuation">)</span>
      <span class="token keyword">return</span> <span class="token boolean">false</span> <span class="token keyword">unless</span> exist<span class="token operator">?</span>
      <span class="token keyword">return</span> skip_resource <span class="token string-literal"><span class="token string">&quot;\`writable?\` is not supported on your OS yet.&quot;</span></span> <span class="token keyword">if</span> <span class="token variable">@perms_provider</span><span class="token punctuation">.</span><span class="token keyword">nil</span><span class="token operator">?</span>

      file_permission_granted<span class="token operator">?</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;write&quot;</span></span><span class="token punctuation">,</span> by_usergroup<span class="token punctuation">,</span> by_specific_user<span class="token punctuation">)</span>
    <span class="token keyword">end</span>

    <span class="token keyword">def</span> <span class="token method-definition"><span class="token function">executable</span></span><span class="token operator">?</span><span class="token punctuation">(</span>by_usergroup<span class="token punctuation">,</span> by_specific_user<span class="token punctuation">)</span>
      <span class="token keyword">return</span> <span class="token boolean">false</span> <span class="token keyword">unless</span> exist<span class="token operator">?</span>
      <span class="token keyword">return</span> skip_resource <span class="token string-literal"><span class="token string">&quot;\`executable?\` is not supported on your OS yet.&quot;</span></span> <span class="token keyword">if</span> <span class="token variable">@perms_provider</span><span class="token punctuation">.</span><span class="token keyword">nil</span><span class="token operator">?</span>

      file_permission_granted<span class="token operator">?</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;execute&quot;</span></span><span class="token punctuation">,</span> by_usergroup<span class="token punctuation">,</span> by_specific_user<span class="token punctuation">)</span>
    <span class="token keyword">end</span>

    <span class="token keyword">def</span> <span class="token method-definition"><span class="token function">allowed</span></span><span class="token operator">?</span><span class="token punctuation">(</span>permission<span class="token punctuation">,</span> opts <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
      <span class="token keyword">return</span> <span class="token boolean">false</span> <span class="token keyword">unless</span> exist<span class="token operator">?</span>
      <span class="token keyword">return</span> skip_resource <span class="token string-literal"><span class="token string">&quot;\`allowed?\` is not supported on your OS yet.&quot;</span></span> <span class="token keyword">if</span> <span class="token variable">@perms_provider</span><span class="token punctuation">.</span><span class="token keyword">nil</span><span class="token operator">?</span>

      file_permission_granted<span class="token operator">?</span><span class="token punctuation">(</span>permission<span class="token punctuation">,</span> opts<span class="token punctuation">[</span><span class="token symbol">:by</span><span class="token punctuation">]</span><span class="token punctuation">,</span> opts<span class="token punctuation">[</span><span class="token symbol">:by_user</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
    <span class="token keyword">end</span>

    <span class="token keyword">def</span> <span class="token method-definition"><span class="token function">mounted</span></span><span class="token operator">?</span><span class="token punctuation">(</span>expected_options <span class="token operator">=</span> <span class="token keyword">nil</span><span class="token punctuation">,</span> identical <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">)</span>
      mounted <span class="token operator">=</span> file<span class="token punctuation">.</span>mounted

      <span class="token comment"># return if no additional parameters have been provided</span>
      <span class="token keyword">return</span> file<span class="token punctuation">.</span>mounted<span class="token operator">?</span> <span class="token keyword">if</span> expected_options<span class="token punctuation">.</span><span class="token keyword">nil</span><span class="token operator">?</span>

      <span class="token comment"># deprecation warning, this functionality will be removed in future version</span>
      Inspec<span class="token punctuation">.</span>deprecate<span class="token punctuation">(</span><span class="token symbol">:file_resource_be_mounted_matchers</span><span class="token punctuation">,</span> <span class="token string-literal"><span class="token string">&quot;The file resource \`be_mounted.with\` and \`be_mounted.only_with\` matchers are deprecated. Please use the \`mount\` resource instead&quot;</span></span><span class="token punctuation">)</span>

      <span class="token comment"># we cannot read mount data on non-Linux systems</span>
      <span class="token keyword">return</span> <span class="token keyword">nil</span> <span class="token keyword">unless</span> inspec<span class="token punctuation">.</span>os<span class="token punctuation">.</span>linux<span class="token operator">?</span>

      <span class="token comment"># parse content if we are on linux</span>
      <span class="token variable">@mount_options</span> <span class="token operator">||=</span> parse_mount_options<span class="token punctuation">(</span>mounted<span class="token punctuation">.</span>stdout<span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span>

      <span class="token keyword">if</span> identical
        <span class="token comment"># check if the options should be identical</span>
        <span class="token variable">@mount_options</span> <span class="token operator">==</span> expected_options
      <span class="token keyword">else</span>
        <span class="token comment"># otherwise compare the selected values</span>
        <span class="token variable">@mount_options</span><span class="token punctuation">.</span>contains<span class="token punctuation">(</span>expected_options<span class="token punctuation">)</span>
      <span class="token keyword">end</span>
    <span class="token keyword">end</span>

    <span class="token keyword">def</span> <span class="token method-definition"><span class="token function">suid</span></span>
      <span class="token punctuation">(</span>mode <span class="token operator">&amp;</span> <span class="token number">04000</span><span class="token punctuation">)</span> <span class="token operator">&gt;</span> <span class="token number">0</span>
    <span class="token keyword">end</span>

    <span class="token keyword">alias</span> setuid<span class="token operator">?</span> suid

    <span class="token keyword">def</span> <span class="token method-definition"><span class="token function">sgid</span></span>
      <span class="token punctuation">(</span>mode <span class="token operator">&amp;</span> <span class="token number">02000</span><span class="token punctuation">)</span> <span class="token operator">&gt;</span> <span class="token number">0</span>
    <span class="token keyword">end</span>

    <span class="token keyword">alias</span> setgid<span class="token operator">?</span> sgid

    <span class="token keyword">def</span> <span class="token method-definition"><span class="token function">sticky</span></span>
      <span class="token punctuation">(</span>mode <span class="token operator">&amp;</span> <span class="token number">01000</span><span class="token punctuation">)</span> <span class="token operator">&gt;</span> <span class="token number">0</span>
    <span class="token keyword">end</span>

    <span class="token keyword">alias</span> sticky<span class="token operator">?</span> sticky

    <span class="token keyword">def</span> <span class="token method-definition"><span class="token function">more_permissive_than</span></span><span class="token operator">?</span><span class="token punctuation">(</span>max_mode <span class="token operator">=</span> <span class="token keyword">nil</span><span class="token punctuation">)</span>
      <span class="token keyword">raise</span> Inspec<span class="token double-colon punctuation">::</span>Exceptions<span class="token double-colon punctuation">::</span>ResourceFailed<span class="token punctuation">,</span> <span class="token string-literal"><span class="token string">&quot;The file&quot;</span></span> <span class="token operator">+</span> file<span class="token punctuation">.</span>path <span class="token operator">+</span> <span class="token string-literal"><span class="token string">&quot;doesn&#39;t seem to exist&quot;</span></span> <span class="token keyword">unless</span> exist<span class="token operator">?</span>
      <span class="token keyword">raise</span> ArgumentError<span class="token punctuation">,</span> <span class="token string-literal"><span class="token string">&quot;You must proivde a value for the \`maximum allowable permission\` for the file.&quot;</span></span> <span class="token keyword">if</span> max_mode<span class="token punctuation">.</span><span class="token keyword">nil</span><span class="token operator">?</span>
      <span class="token keyword">raise</span> ArgumentError<span class="token punctuation">,</span> <span class="token string-literal"><span class="token string">&quot;You must proivde the \`maximum permission target\` as a \`String\`, you provided: &quot;</span></span> <span class="token operator">+</span> max_mode<span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">.</span>to_s <span class="token keyword">unless</span> max_mode<span class="token punctuation">.</span>is_a<span class="token operator">?</span><span class="token punctuation">(</span><span class="token builtin">String</span><span class="token punctuation">)</span>
      <span class="token keyword">raise</span> ArgumentError<span class="token punctuation">,</span> <span class="token string-literal"><span class="token string">&quot;The value of the \`maximum permission target\` should be a valid file mode in 4-ditgit octal format: for example, \`0644\` or \`0777\`&quot;</span></span> <span class="token keyword">unless</span> <span class="token regex-literal"><span class="token regex">/(0)?([0-7])([0-7])([0-7])/</span></span><span class="token punctuation">.</span>match<span class="token operator">?</span><span class="token punctuation">(</span>max_mode<span class="token punctuation">)</span>

      <span class="token comment"># Using the files mode and a few bit-wise calculations we can ensure a</span>
      <span class="token comment"># file is no more permisive than desired.</span>
      <span class="token comment">#</span>
      <span class="token comment"># 1. Calculate the inverse of the desired mode (e.g., 0644) by XOR it with</span>
      <span class="token comment"># 0777 (all 1s). We are interested in the bits that are currently 0 since</span>
      <span class="token comment"># it indicates that the actual mode is more permissive than the desired mode.</span>
      <span class="token comment"># Conversely, we dont care about the bits that are currently 1 because they</span>
      <span class="token comment"># cannot be any more permissive and we can safely ignore them.</span>
      <span class="token comment">#</span>
      <span class="token comment"># 2. Calculate the above result of ANDing the actual mode and the inverse</span>
      <span class="token comment"># mode. This will determine if any of the bits that would indicate a more</span>
      <span class="token comment"># permissive mode are set in the actual mode.</span>
      <span class="token comment">#</span>
      <span class="token comment"># 3. If the result is 0000, the files mode is equal</span>
      <span class="token comment"># to or less permissive than the desired mode (PASS). Otherwise, the files</span>
      <span class="token comment"># mode is more permissive than the desired mode (FAIL).</span>

      max_mode <span class="token operator">=</span> max_mode<span class="token punctuation">.</span>to_i<span class="token punctuation">(</span><span class="token number">8</span><span class="token punctuation">)</span>
      inv_mode <span class="token operator">=</span> <span class="token number">0777</span> <span class="token operator">^</span> max_mode

      inv_mode <span class="token operator">&amp;</span> file<span class="token punctuation">.</span>mode <span class="token operator">!=</span> <span class="token number">0</span>
    <span class="token keyword">end</span>

    <span class="token keyword">def</span> <span class="token method-definition"><span class="token function">to_s</span></span>
      <span class="token string-literal"><span class="token string">&quot;File </span><span class="token interpolation"><span class="token delimiter punctuation">#{</span><span class="token content">source_path</span><span class="token delimiter punctuation">}</span></span><span class="token string">&quot;</span></span>
    <span class="token keyword">end</span>

    <span class="token keyword">private</span>

    <span class="token keyword">def</span> <span class="token method-definition"><span class="token function">file_permission_granted</span></span><span class="token operator">?</span><span class="token punctuation">(</span>access_type<span class="token punctuation">,</span> by_usergroup<span class="token punctuation">,</span> by_specific_user<span class="token punctuation">)</span>
      <span class="token keyword">raise</span> <span class="token string-literal"><span class="token string">&quot;\`file_permission_granted?\` is not supported on your OS&quot;</span></span> <span class="token keyword">if</span> <span class="token variable">@perms_provider</span><span class="token punctuation">.</span><span class="token keyword">nil</span><span class="token operator">?</span>

      <span class="token keyword">if</span> by_specific_user<span class="token punctuation">.</span><span class="token keyword">nil</span><span class="token operator">?</span> <span class="token operator">||</span> by_specific_user<span class="token punctuation">.</span>empty<span class="token operator">?</span>
        <span class="token variable">@perms_provider</span><span class="token punctuation">.</span>check_file_permission_by_mask<span class="token punctuation">(</span>file<span class="token punctuation">,</span> access_type<span class="token punctuation">,</span> by_usergroup<span class="token punctuation">,</span> by_specific_user<span class="token punctuation">)</span>
      <span class="token keyword">else</span>
        <span class="token variable">@perms_provider</span><span class="token punctuation">.</span>check_file_permission_by_user<span class="token punctuation">(</span>access_type<span class="token punctuation">,</span> by_specific_user<span class="token punctuation">,</span> source_path<span class="token punctuation">)</span>
      <span class="token keyword">end</span>
    <span class="token keyword">end</span>
  <span class="token keyword">end</span>

  <span class="token keyword">class</span> <span class="token class-name">FilePermissions</span>
    attr_reader <span class="token symbol">:inspec</span>
    <span class="token keyword">def</span> <span class="token method-definition"><span class="token function">initialize</span></span><span class="token punctuation">(</span>inspec<span class="token punctuation">)</span>
      <span class="token variable">@inspec</span> <span class="token operator">=</span> inspec
    <span class="token keyword">end</span>
  <span class="token keyword">end</span>

  <span class="token keyword">class</span> <span class="token class-name">UnixFilePermissions</span> <span class="token operator">&lt;</span> FilePermissions
    <span class="token keyword">def</span> <span class="token method-definition"><span class="token function">permission_flag</span></span><span class="token punctuation">(</span>access_type<span class="token punctuation">)</span>
      <span class="token keyword">case</span> access_type
      <span class="token keyword">when</span> <span class="token string-literal"><span class="token string">&quot;read&quot;</span></span>
        <span class="token string-literal"><span class="token string">&quot;r&quot;</span></span>
      <span class="token keyword">when</span> <span class="token string-literal"><span class="token string">&quot;write&quot;</span></span>
        <span class="token string-literal"><span class="token string">&quot;w&quot;</span></span>
      <span class="token keyword">when</span> <span class="token string-literal"><span class="token string">&quot;execute&quot;</span></span>
        <span class="token string-literal"><span class="token string">&quot;x&quot;</span></span>
      <span class="token keyword">else</span>
        <span class="token keyword">raise</span> <span class="token string-literal"><span class="token string">&quot;Invalid access_type provided&quot;</span></span>
      <span class="token keyword">end</span>
    <span class="token keyword">end</span>

    <span class="token keyword">def</span> <span class="token method-definition"><span class="token function">usergroup_for</span></span><span class="token punctuation">(</span>usergroup<span class="token punctuation">,</span> specific_user<span class="token punctuation">)</span>
      <span class="token keyword">if</span> usergroup <span class="token operator">==</span> <span class="token string-literal"><span class="token string">&quot;others&quot;</span></span>
        <span class="token string-literal"><span class="token string">&quot;other&quot;</span></span>
      <span class="token keyword">elsif</span> <span class="token punctuation">(</span>usergroup<span class="token punctuation">.</span><span class="token keyword">nil</span><span class="token operator">?</span> <span class="token operator">||</span> usergroup<span class="token punctuation">.</span>empty<span class="token operator">?</span><span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> specific_user<span class="token punctuation">.</span><span class="token keyword">nil</span><span class="token operator">?</span>
        <span class="token string-literal"><span class="token string">&quot;all&quot;</span></span>
      <span class="token keyword">else</span>
        usergroup
      <span class="token keyword">end</span>
    <span class="token keyword">end</span>

    <span class="token keyword">def</span> <span class="token method-definition"><span class="token function">check_file_permission_by_mask</span></span><span class="token punctuation">(</span>file<span class="token punctuation">,</span> access_type<span class="token punctuation">,</span> usergroup<span class="token punctuation">,</span> specific_user<span class="token punctuation">)</span>
      usergroup <span class="token operator">=</span> usergroup_for<span class="token punctuation">(</span>usergroup<span class="token punctuation">,</span> specific_user<span class="token punctuation">)</span>
      flag <span class="token operator">=</span> permission_flag<span class="token punctuation">(</span>access_type<span class="token punctuation">)</span>
      mask <span class="token operator">=</span> file<span class="token punctuation">.</span>unix_mode_mask<span class="token punctuation">(</span>usergroup<span class="token punctuation">,</span> flag<span class="token punctuation">)</span>
      <span class="token keyword">raise</span> <span class="token string-literal"><span class="token string">&quot;Invalid usergroup/owner provided&quot;</span></span> <span class="token keyword">if</span> mask<span class="token punctuation">.</span><span class="token keyword">nil</span><span class="token operator">?</span>

      <span class="token punctuation">(</span>file<span class="token punctuation">.</span>mode <span class="token operator">&amp;</span> mask<span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token number">0</span>
    <span class="token keyword">end</span>

    <span class="token keyword">def</span> <span class="token method-definition"><span class="token function">check_file_permission_by_user</span></span><span class="token punctuation">(</span>access_type<span class="token punctuation">,</span> user<span class="token punctuation">,</span> path<span class="token punctuation">)</span>
      flag <span class="token operator">=</span> permission_flag<span class="token punctuation">(</span>access_type<span class="token punctuation">)</span>
      <span class="token keyword">if</span> inspec<span class="token punctuation">.</span>os<span class="token punctuation">.</span>linux<span class="token operator">?</span>
        perm_cmd <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;su -s /bin/sh -c \\&quot;test -</span><span class="token interpolation"><span class="token delimiter punctuation">#{</span><span class="token content">flag</span><span class="token delimiter punctuation">}</span></span><span class="token string"> </span><span class="token interpolation"><span class="token delimiter punctuation">#{</span><span class="token content">path</span><span class="token delimiter punctuation">}</span></span><span class="token string">\\&quot; </span><span class="token interpolation"><span class="token delimiter punctuation">#{</span><span class="token content">user</span><span class="token delimiter punctuation">}</span></span><span class="token string">&quot;</span></span>
      <span class="token keyword">elsif</span> inspec<span class="token punctuation">.</span>os<span class="token punctuation">.</span>bsd<span class="token operator">?</span> <span class="token operator">||</span> inspec<span class="token punctuation">.</span>os<span class="token punctuation">.</span>solaris<span class="token operator">?</span>
        perm_cmd <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;sudo -u </span><span class="token interpolation"><span class="token delimiter punctuation">#{</span><span class="token content">user</span><span class="token delimiter punctuation">}</span></span><span class="token string"> test -</span><span class="token interpolation"><span class="token delimiter punctuation">#{</span><span class="token content">flag</span><span class="token delimiter punctuation">}</span></span><span class="token string"> </span><span class="token interpolation"><span class="token delimiter punctuation">#{</span><span class="token content">path</span><span class="token delimiter punctuation">}</span></span><span class="token string">&quot;</span></span>
      <span class="token keyword">elsif</span> inspec<span class="token punctuation">.</span>os<span class="token punctuation">.</span>aix<span class="token operator">?</span>
        perm_cmd <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;su </span><span class="token interpolation"><span class="token delimiter punctuation">#{</span><span class="token content">user</span><span class="token delimiter punctuation">}</span></span><span class="token string"> -c test -</span><span class="token interpolation"><span class="token delimiter punctuation">#{</span><span class="token content">flag</span><span class="token delimiter punctuation">}</span></span><span class="token string"> </span><span class="token interpolation"><span class="token delimiter punctuation">#{</span><span class="token content">path</span><span class="token delimiter punctuation">}</span></span><span class="token string">&quot;</span></span>
      <span class="token keyword">elsif</span> inspec<span class="token punctuation">.</span>os<span class="token punctuation">.</span>hpux<span class="token operator">?</span>
        perm_cmd <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;su </span><span class="token interpolation"><span class="token delimiter punctuation">#{</span><span class="token content">user</span><span class="token delimiter punctuation">}</span></span><span class="token string"> -c \\&quot;test -</span><span class="token interpolation"><span class="token delimiter punctuation">#{</span><span class="token content">flag</span><span class="token delimiter punctuation">}</span></span><span class="token string"> </span><span class="token interpolation"><span class="token delimiter punctuation">#{</span><span class="token content">path</span><span class="token delimiter punctuation">}</span></span><span class="token string">\\&quot;&quot;</span></span>
      <span class="token keyword">else</span>
        <span class="token keyword">return</span> skip_resource <span class="token string-literal"><span class="token string">&quot;The \`file\` resource does not support \`by_user\` on your OS.&quot;</span></span>
      <span class="token keyword">end</span>

      cmd <span class="token operator">=</span> inspec<span class="token punctuation">.</span>command<span class="token punctuation">(</span>perm_cmd<span class="token punctuation">)</span>
      cmd<span class="token punctuation">.</span>exit_status <span class="token operator">==</span> <span class="token number">0</span> <span class="token operator">?</span> <span class="token boolean">true</span> <span class="token operator">:</span> <span class="token boolean">false</span>
    <span class="token keyword">end</span>
  <span class="token keyword">end</span>

  <span class="token keyword">class</span> <span class="token class-name">WindowsFilePermissions</span> <span class="token operator">&lt;</span> FilePermissions
    <span class="token keyword">def</span> <span class="token method-definition"><span class="token function">check_file_permission_by_mask</span></span><span class="token punctuation">(</span>_file<span class="token punctuation">,</span> _access_type<span class="token punctuation">,</span> _usergroup<span class="token punctuation">,</span> _specific_user<span class="token punctuation">)</span>
      <span class="token keyword">raise</span> <span class="token string-literal"><span class="token string">&quot;\`check_file_permission_by_mask\` is not supported on Windows&quot;</span></span>
    <span class="token keyword">end</span>

    <span class="token keyword">def</span> <span class="token method-definition"><span class="token function">more_permissive_than</span></span><span class="token operator">?</span><span class="token punctuation">(</span><span class="token operator">*</span><span class="token punctuation">)</span>
      <span class="token keyword">raise</span> Inspec<span class="token double-colon punctuation">::</span>Exceptions<span class="token double-colon punctuation">::</span>ResourceSkipped<span class="token punctuation">,</span> <span class="token string-literal"><span class="token string">&quot;The \`more_permissive_than?\` matcher is not supported on your OS yet.&quot;</span></span>
    <span class="token keyword">end</span>

    <span class="token keyword">def</span> <span class="token method-definition"><span class="token function">check_file_permission_by_user</span></span><span class="token punctuation">(</span>access_type<span class="token punctuation">,</span> user<span class="token punctuation">,</span> path<span class="token punctuation">)</span>
      access_rule <span class="token operator">=</span> translate_perm_names<span class="token punctuation">(</span>access_type<span class="token punctuation">)</span>
      access_rule <span class="token operator">=</span> convert_to_powershell_array<span class="token punctuation">(</span>access_rule<span class="token punctuation">)</span>

      cmd <span class="token operator">=</span> inspec<span class="token punctuation">.</span>command<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;@(@((Get-Acl &#39;</span><span class="token interpolation"><span class="token delimiter punctuation">#{</span><span class="token content">path</span><span class="token delimiter punctuation">}</span></span><span class="token string">&#39;).access | Where-Object {$_.AccessControlType -eq &#39;Allow&#39; -and $_.IdentityReference -eq &#39;</span><span class="token interpolation"><span class="token delimiter punctuation">#{</span><span class="token content">user</span><span class="token delimiter punctuation">}</span></span><span class="token string">&#39; }) | Where-Object {($_.FileSystemRights.ToString().Split(&#39;,&#39;) | % {$_.trim()} | ? {</span><span class="token interpolation"><span class="token delimiter punctuation">#{</span><span class="token content">access_rule</span><span class="token delimiter punctuation">}</span></span><span class="token string"> -contains $_}) -ne $null}) | measure | % { $_.Count }&quot;</span></span><span class="token punctuation">)</span>
      cmd<span class="token punctuation">.</span>stdout<span class="token punctuation">.</span>chomp <span class="token operator">==</span> <span class="token string-literal"><span class="token string">&quot;0&quot;</span></span> <span class="token operator">?</span> <span class="token boolean">false</span> <span class="token operator">:</span> <span class="token boolean">true</span>
    <span class="token keyword">end</span>

    <span class="token keyword">private</span>

    <span class="token keyword">def</span> <span class="token method-definition"><span class="token function">convert_to_powershell_array</span></span><span class="token punctuation">(</span>arr<span class="token punctuation">)</span>
      <span class="token keyword">if</span> arr<span class="token punctuation">.</span>empty<span class="token operator">?</span>
        <span class="token string-literal"><span class="token string">&quot;@()&quot;</span></span>
      <span class="token keyword">else</span>
        <span class="token string-literal"><span class="token string">%{@(&#39;</span><span class="token interpolation"><span class="token delimiter punctuation">#{</span><span class="token content">arr<span class="token punctuation">.</span>join<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;&#39;, &#39;&quot;</span></span><span class="token punctuation">)</span></span><span class="token delimiter punctuation">}</span></span><span class="token string">&#39;)}</span></span>
      <span class="token keyword">end</span>
    <span class="token keyword">end</span>

    <span class="token comment"># Translates a developer-friendly string into a list of acceptable</span>
    <span class="token comment"># FileSystemRights that match it, because Windows has a fun heirarchy</span>
    <span class="token comment"># of permissions that are able to be noted in multiple ways.</span>
    <span class="token comment">#</span>
    <span class="token comment"># See also: https://www.codeproject.com/Reference/871338/AccessControl-FileSystemRights-Permissions-Table</span>
    <span class="token keyword">def</span> <span class="token method-definition"><span class="token function">translate_perm_names</span></span><span class="token punctuation">(</span>access_type<span class="token punctuation">)</span>
      names <span class="token operator">=</span> translate_common_perms<span class="token punctuation">(</span>access_type<span class="token punctuation">)</span>
      names <span class="token operator">||=</span> translate_granular_perms<span class="token punctuation">(</span>access_type<span class="token punctuation">)</span>
      names <span class="token operator">||=</span> translate_uncommon_perms<span class="token punctuation">(</span>access_type<span class="token punctuation">)</span>
      <span class="token keyword">raise</span> <span class="token string-literal"><span class="token string">&quot;Invalid access_type provided&quot;</span></span> <span class="token keyword">unless</span> names

      names
    <span class="token keyword">end</span>

    <span class="token keyword">def</span> <span class="token method-definition"><span class="token function">translate_common_perms</span></span><span class="token punctuation">(</span>access_type<span class="token punctuation">)</span>
      <span class="token keyword">case</span> access_type
      <span class="token keyword">when</span> <span class="token string-literal"><span class="token string">&quot;full-control&quot;</span></span>
        <span class="token string-literal"><span class="token string">%w{FullControl}</span></span>
      <span class="token keyword">when</span> <span class="token string-literal"><span class="token string">&quot;modify&quot;</span></span>
        translate_perm_names<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;full-control&quot;</span></span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string-literal"><span class="token string">%w{Modify}</span></span>
      <span class="token keyword">when</span> <span class="token string-literal"><span class="token string">&quot;read&quot;</span></span>
        translate_perm_names<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;modify&quot;</span></span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string-literal"><span class="token string">%w{ReadAndExecute Read}</span></span>
      <span class="token keyword">when</span> <span class="token string-literal"><span class="token string">&quot;write&quot;</span></span>
        translate_perm_names<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;modify&quot;</span></span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string-literal"><span class="token string">%w{Write}</span></span>
      <span class="token keyword">when</span> <span class="token string-literal"><span class="token string">&quot;execute&quot;</span></span>
        translate_perm_names<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;modify&quot;</span></span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string-literal"><span class="token string">%w{ReadAndExecute ExecuteFile Traverse}</span></span>
      <span class="token keyword">when</span> <span class="token string-literal"><span class="token string">&quot;delete&quot;</span></span>
        translate_perm_names<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;modify&quot;</span></span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string-literal"><span class="token string">%w{Delete}</span></span>
      <span class="token keyword">end</span>
    <span class="token keyword">end</span>

    <span class="token keyword">def</span> <span class="token method-definition"><span class="token function">translate_uncommon_perms</span></span><span class="token punctuation">(</span>access_type<span class="token punctuation">)</span>
      <span class="token keyword">case</span> access_type
      <span class="token keyword">when</span> <span class="token string-literal"><span class="token string">&quot;delete-subdirectories-and-files&quot;</span></span>
        translate_perm_names<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;full-control&quot;</span></span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string-literal"><span class="token string">%w{DeleteSubdirectoriesAndFiles}</span></span>
      <span class="token keyword">when</span> <span class="token string-literal"><span class="token string">&quot;change-permissions&quot;</span></span>
        translate_perm_names<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;full-control&quot;</span></span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string-literal"><span class="token string">%w{ChangePermissions}</span></span>
      <span class="token keyword">when</span> <span class="token string-literal"><span class="token string">&quot;take-ownership&quot;</span></span>
        translate_perm_names<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;full-control&quot;</span></span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string-literal"><span class="token string">%w{TakeOwnership}</span></span>
      <span class="token keyword">when</span> <span class="token string-literal"><span class="token string">&quot;synchronize&quot;</span></span>
        translate_perm_names<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;full-control&quot;</span></span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string-literal"><span class="token string">%w{Synchronize}</span></span>
      <span class="token keyword">end</span>
    <span class="token keyword">end</span>

    <span class="token keyword">def</span> <span class="token method-definition"><span class="token function">translate_granular_perms</span></span><span class="token punctuation">(</span>access_type<span class="token punctuation">)</span>
      <span class="token keyword">case</span> access_type
      <span class="token keyword">when</span> <span class="token string-literal"><span class="token string">&quot;write-data&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal"><span class="token string">&quot;create-files&quot;</span></span>
        translate_perm_names<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;write&quot;</span></span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string-literal"><span class="token string">%w{WriteData CreateFiles}</span></span>
      <span class="token keyword">when</span> <span class="token string-literal"><span class="token string">&quot;append-data&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal"><span class="token string">&quot;create-directories&quot;</span></span>
        translate_perm_names<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;write&quot;</span></span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string-literal"><span class="token string">%w{CreateDirectories AppendData}</span></span>
      <span class="token keyword">when</span> <span class="token string-literal"><span class="token string">&quot;write-extended-attributes&quot;</span></span>
        translate_perm_names<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;write&quot;</span></span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string-literal"><span class="token string">%w{WriteExtendedAttributes}</span></span>
      <span class="token keyword">when</span> <span class="token string-literal"><span class="token string">&quot;write-attributes&quot;</span></span>
        translate_perm_names<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;write&quot;</span></span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string-literal"><span class="token string">%w{WriteAttributes}</span></span>
      <span class="token keyword">when</span> <span class="token string-literal"><span class="token string">&quot;read-data&quot;</span></span><span class="token punctuation">,</span> <span class="token string-literal"><span class="token string">&quot;list-directory&quot;</span></span>
        translate_perm_names<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;read&quot;</span></span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string-literal"><span class="token string">%w{ReadData ListDirectory}</span></span>
      <span class="token keyword">when</span> <span class="token string-literal"><span class="token string">&quot;read-attributes&quot;</span></span>
        translate_perm_names<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;read&quot;</span></span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string-literal"><span class="token string">%w{ReadAttributes}</span></span>
      <span class="token keyword">when</span> <span class="token string-literal"><span class="token string">&quot;read-extended-attributes&quot;</span></span>
        translate_perm_names<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;read&quot;</span></span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string-literal"><span class="token string">%w{ReadExtendedAttributes}</span></span>
      <span class="token keyword">when</span> <span class="token string-literal"><span class="token string">&quot;read-permissions&quot;</span></span>
        translate_perm_names<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;read&quot;</span></span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string-literal"><span class="token string">%w{ReadPermissions}</span></span>
      <span class="token keyword">end</span>
    <span class="token keyword">end</span>
  <span class="token keyword">end</span>
<span class="token keyword">end</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_11-5-directory" tabindex="-1"><a class="header-anchor" href="#_11-5-directory" aria-hidden="true">#</a> 11.5. Directory</h3><div class="language-ruby ext-rb line-numbers-mode"><pre class="language-ruby"><code><span class="token keyword">require</span> <span class="token string-literal"><span class="token string">&quot;inspec/resources/file&quot;</span></span>

<span class="token keyword">module</span> <span class="token class-name">Inspec</span><span class="token double-colon punctuation">::</span>Resources
  <span class="token keyword">class</span> <span class="token class-name">Directory</span> <span class="token operator">&lt;</span> FileResource
    name <span class="token string-literal"><span class="token string">&quot;directory&quot;</span></span>
    supports platform<span class="token operator">:</span> <span class="token string-literal"><span class="token string">&quot;unix&quot;</span></span>
    supports platform<span class="token operator">:</span> <span class="token string-literal"><span class="token string">&quot;windows&quot;</span></span>
    desc <span class="token string-literal"><span class="token string">&quot;Use the directory InSpec audit resource to test if the file type is a directory. This is equivalent to using the file InSpec audit resource and the be_directory matcher, but provides a simpler and more direct way to test directories. All of the matchers available to file may be used with directory.&quot;</span></span>
    example <span class="token string-literal heredoc-string"><span class="token delimiter"><span class="token punctuation">&lt;&lt;~</span><span class="token symbol">EXAMPLE</span></span><span class="token string">
      describe directory(&#39;path&#39;) do
        it { should be_directory }
      end
    </span><span class="token delimiter"><span class="token symbol">EXAMPLE</span></span></span>

    <span class="token keyword">def</span> <span class="token method-definition"><span class="token function">exist</span></span><span class="token operator">?</span>
      file<span class="token punctuation">.</span>exist<span class="token operator">?</span> <span class="token operator">&amp;&amp;</span> file<span class="token punctuation">.</span>directory<span class="token operator">?</span>
    <span class="token keyword">end</span>

    <span class="token keyword">def</span> <span class="token method-definition"><span class="token function">to_s</span></span>
      <span class="token string-literal"><span class="token string">&quot;Directory </span><span class="token interpolation"><span class="token delimiter punctuation">#{</span><span class="token content">source_path</span><span class="token delimiter punctuation">}</span></span><span class="token string">&quot;</span></span>
    <span class="token keyword">end</span>
  <span class="token keyword">end</span>
<span class="token keyword">end</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_11-6-etc-hosts" tabindex="-1"><a class="header-anchor" href="#_11-6-etc-hosts" aria-hidden="true">#</a> 11.6. etc_hosts</h3><div class="language-ruby ext-rb line-numbers-mode"><pre class="language-ruby"><code><span class="token keyword">require</span> <span class="token string-literal"><span class="token string">&quot;inspec/utils/parser&quot;</span></span>
<span class="token keyword">require</span> <span class="token string-literal"><span class="token string">&quot;inspec/utils/file_reader&quot;</span></span>

<span class="token keyword">class</span> <span class="token class-name">EtcHosts</span> <span class="token operator">&lt;</span> Inspec<span class="token punctuation">.</span>resource<span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
  name <span class="token string-literal"><span class="token string">&quot;etc_hosts&quot;</span></span>
  supports platform<span class="token operator">:</span> <span class="token string-literal"><span class="token string">&quot;linux&quot;</span></span>
  supports platform<span class="token operator">:</span> <span class="token string-literal"><span class="token string">&quot;bsd&quot;</span></span>
  supports platform<span class="token operator">:</span> <span class="token string-literal"><span class="token string">&quot;windows&quot;</span></span>
  desc &#39;Use the etc_hosts InSpec audit resource to find an
    ip_address <span class="token keyword">and</span> its associated hosts&#39;
  example <span class="token string-literal heredoc-string"><span class="token delimiter"><span class="token punctuation">&lt;&lt;~</span><span class="token symbol">EXAMPLE</span></span><span class="token string">
    describe etc_hosts.where { ip_address == &#39;127.0.0.1&#39; } do
      its(&#39;ip_address&#39;) { should cmp &#39;127.0.0.1&#39; }
      its(&#39;primary_name&#39;) { should cmp &#39;localhost&#39; }
      its(&#39;all_host_names&#39;) { should eq [[&#39;localhost&#39;, &#39;localhost.localdomain&#39;, &#39;localhost4&#39;, &#39;localhost4.localdomain4&#39;]] }
    end
  </span><span class="token delimiter"><span class="token symbol">EXAMPLE</span></span></span>

  attr_reader <span class="token symbol">:params</span>

  <span class="token keyword">include</span> CommentParser
  <span class="token keyword">include</span> FileReader

  <span class="token constant">DEFAULT_UNIX_PATH</span>    <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&quot;/etc/hosts&quot;</span></span><span class="token punctuation">.</span>freeze
  <span class="token constant">DEFAULT_WINDOWS_PATH</span> <span class="token operator">=</span> <span class="token string-literal"><span class="token string">&#39;C:\\windows\\system32\\drivers\\etc\\hosts&#39;</span></span><span class="token punctuation">.</span>freeze

  <span class="token keyword">def</span> <span class="token method-definition"><span class="token function">initialize</span></span><span class="token punctuation">(</span>hosts_path <span class="token operator">=</span> <span class="token keyword">nil</span><span class="token punctuation">)</span>
    content <span class="token operator">=</span> read_file_content<span class="token punctuation">(</span>hosts_path <span class="token operator">||</span> default_hosts_file_path<span class="token punctuation">)</span>

    <span class="token variable">@params</span> <span class="token operator">=</span> parse_conf<span class="token punctuation">(</span>content<span class="token punctuation">.</span>lines<span class="token punctuation">)</span>
  <span class="token keyword">end</span>

  FilterTable<span class="token punctuation">.</span>create
    <span class="token punctuation">.</span>register_column<span class="token punctuation">(</span><span class="token symbol">:ip_address</span><span class="token punctuation">,</span>     <span class="token symbol">field</span><span class="token operator">:</span> <span class="token string-literal"><span class="token string">&quot;ip_address&quot;</span></span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span>register_column<span class="token punctuation">(</span><span class="token symbol">:primary_name</span><span class="token punctuation">,</span>   <span class="token symbol">field</span><span class="token operator">:</span> <span class="token string-literal"><span class="token string">&quot;primary_name&quot;</span></span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span>register_column<span class="token punctuation">(</span><span class="token symbol">:all_host_names</span><span class="token punctuation">,</span> <span class="token symbol">field</span><span class="token operator">:</span> <span class="token string-literal"><span class="token string">&quot;all_host_names&quot;</span></span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span>install_filter_methods_on_resource<span class="token punctuation">(</span><span class="token keyword">self</span><span class="token punctuation">,</span> <span class="token symbol">:params</span><span class="token punctuation">)</span>

  <span class="token keyword">private</span>

  <span class="token keyword">def</span> <span class="token method-definition"><span class="token function">default_hosts_file_path</span></span>
    inspec<span class="token punctuation">.</span>os<span class="token punctuation">.</span>windows<span class="token operator">?</span> <span class="token operator">?</span> <span class="token constant">DEFAULT_WINDOWS_PATH</span> <span class="token operator">:</span> <span class="token constant">DEFAULT_UNIX_PATH</span>
  <span class="token keyword">end</span>

  <span class="token keyword">def</span> <span class="token method-definition"><span class="token function">parse_conf</span></span><span class="token punctuation">(</span>lines<span class="token punctuation">)</span>
    lines<span class="token punctuation">.</span>reject<span class="token punctuation">(</span><span class="token operator">&amp;</span><span class="token symbol">:empty?</span><span class="token punctuation">)</span><span class="token punctuation">.</span>reject<span class="token punctuation">(</span><span class="token operator">&amp;</span>comment<span class="token operator">?</span><span class="token punctuation">)</span><span class="token punctuation">.</span>map<span class="token punctuation">(</span><span class="token operator">&amp;</span>parse_data<span class="token punctuation">)</span><span class="token punctuation">.</span>map<span class="token punctuation">(</span><span class="token operator">&amp;</span>format_data<span class="token punctuation">)</span>
  <span class="token keyword">end</span>

  <span class="token keyword">def</span> <span class="token method-definition"><span class="token function">comment</span></span><span class="token operator">?</span>
    parse_options <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token symbol">comment_char</span><span class="token operator">:</span> <span class="token string-literal"><span class="token string">&quot;#&quot;</span></span><span class="token punctuation">,</span> <span class="token symbol">standalone_comments</span><span class="token operator">:</span> <span class="token boolean">false</span> <span class="token punctuation">}</span>

    <span class="token operator">-</span><span class="token operator">&gt;</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span> <span class="token punctuation">{</span> parse_comment_line<span class="token punctuation">(</span>data<span class="token punctuation">,</span> parse_options<span class="token punctuation">)</span><span class="token punctuation">.</span>first<span class="token punctuation">.</span>empty<span class="token operator">?</span> <span class="token punctuation">}</span>
  <span class="token keyword">end</span>

  <span class="token keyword">def</span> <span class="token method-definition"><span class="token function">parse_data</span></span>
    <span class="token operator">-</span><span class="token operator">&gt;</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token punctuation">[</span>data<span class="token punctuation">.</span>split<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">,</span> data<span class="token punctuation">.</span>split<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">,</span> data<span class="token punctuation">.</span>split<span class="token punctuation">[</span><span class="token number">1.</span><span class="token punctuation">.</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">]</span> <span class="token punctuation">}</span>
  <span class="token keyword">end</span>

  <span class="token keyword">def</span> <span class="token method-definition"><span class="token function">format_data</span></span>
    <span class="token operator">-</span><span class="token operator">&gt;</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token string-literal"><span class="token string">%w{ip_address primary_name all_host_names}</span></span><span class="token punctuation">.</span>zip<span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">.</span>to_h <span class="token punctuation">}</span>
  <span class="token keyword">end</span>
<span class="token keyword">end</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_11-7-docker" tabindex="-1"><a class="header-anchor" href="#_11-7-docker" aria-hidden="true">#</a> 11.7. Docker</h3><div class="language-ruby ext-rb line-numbers-mode"><pre class="language-ruby"><code><span class="token comment">#</span>
<span class="token comment"># Copyright 2017, Christoph Hartmann</span>
<span class="token comment">#</span>

<span class="token keyword">require</span> <span class="token string-literal"><span class="token string">&quot;inspec/resources/command&quot;</span></span>
<span class="token keyword">require</span> <span class="token string-literal"><span class="token string">&quot;inspec/utils/filter&quot;</span></span>
<span class="token keyword">require</span> <span class="token string-literal"><span class="token string">&quot;hashie/mash&quot;</span></span>

<span class="token keyword">module</span> <span class="token class-name">Inspec</span><span class="token double-colon punctuation">::</span>Resources
  <span class="token keyword">class</span> <span class="token class-name">DockerContainerFilter</span>
    <span class="token comment"># use filtertable for containers</span>
    filter <span class="token operator">=</span> FilterTable<span class="token punctuation">.</span>create
    filter<span class="token punctuation">.</span>register_custom_matcher<span class="token punctuation">(</span><span class="token symbol">:exists?</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token operator">|</span>x<span class="token operator">|</span> <span class="token operator">!</span>x<span class="token punctuation">.</span>entries<span class="token punctuation">.</span>empty<span class="token operator">?</span> <span class="token punctuation">}</span>
    filter<span class="token punctuation">.</span>register_column<span class="token punctuation">(</span><span class="token symbol">:commands</span><span class="token punctuation">,</span> <span class="token symbol">field</span><span class="token operator">:</span> <span class="token string-literal"><span class="token string">&quot;command&quot;</span></span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span>register_column<span class="token punctuation">(</span><span class="token symbol">:ids</span><span class="token punctuation">,</span>            <span class="token symbol">field</span><span class="token operator">:</span> <span class="token string-literal"><span class="token string">&quot;id&quot;</span></span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span>register_column<span class="token punctuation">(</span><span class="token symbol">:images</span><span class="token punctuation">,</span>         <span class="token symbol">field</span><span class="token operator">:</span> <span class="token string-literal"><span class="token string">&quot;image&quot;</span></span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span>register_column<span class="token punctuation">(</span><span class="token symbol">:labels</span><span class="token punctuation">,</span>         <span class="token symbol">field</span><span class="token operator">:</span> <span class="token string-literal"><span class="token string">&quot;labels&quot;</span></span><span class="token punctuation">,</span> <span class="token symbol">style</span><span class="token operator">:</span> <span class="token symbol">:simple</span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span>register_column<span class="token punctuation">(</span><span class="token symbol">:local_volumes</span><span class="token punctuation">,</span>  <span class="token symbol">field</span><span class="token operator">:</span> <span class="token string-literal"><span class="token string">&quot;localvolumes&quot;</span></span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span>register_column<span class="token punctuation">(</span><span class="token symbol">:mounts</span><span class="token punctuation">,</span>         <span class="token symbol">field</span><span class="token operator">:</span> <span class="token string-literal"><span class="token string">&quot;mounts&quot;</span></span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span>register_column<span class="token punctuation">(</span><span class="token symbol">:names</span><span class="token punctuation">,</span>          <span class="token symbol">field</span><span class="token operator">:</span> <span class="token string-literal"><span class="token string">&quot;names&quot;</span></span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span>register_column<span class="token punctuation">(</span><span class="token symbol">:networks</span><span class="token punctuation">,</span>       <span class="token symbol">field</span><span class="token operator">:</span> <span class="token string-literal"><span class="token string">&quot;networks&quot;</span></span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span>register_column<span class="token punctuation">(</span><span class="token symbol">:ports</span><span class="token punctuation">,</span>          <span class="token symbol">field</span><span class="token operator">:</span> <span class="token string-literal"><span class="token string">&quot;ports&quot;</span></span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span>register_column<span class="token punctuation">(</span><span class="token symbol">:running_for</span><span class="token punctuation">,</span>    <span class="token symbol">field</span><span class="token operator">:</span> <span class="token string-literal"><span class="token string">&quot;runningfor&quot;</span></span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span>register_column<span class="token punctuation">(</span><span class="token symbol">:sizes</span><span class="token punctuation">,</span>          <span class="token symbol">field</span><span class="token operator">:</span> <span class="token string-literal"><span class="token string">&quot;size&quot;</span></span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span>register_column<span class="token punctuation">(</span><span class="token symbol">:status</span><span class="token punctuation">,</span>         <span class="token symbol">field</span><span class="token operator">:</span> <span class="token string-literal"><span class="token string">&quot;status&quot;</span></span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span>register_custom_matcher<span class="token punctuation">(</span><span class="token symbol">:running?</span><span class="token punctuation">)</span> <span class="token keyword">do</span> <span class="token operator">|</span>x<span class="token operator">|</span>
        x<span class="token punctuation">.</span>where <span class="token punctuation">{</span> status<span class="token punctuation">.</span>downcase<span class="token punctuation">.</span>start_with<span class="token operator">?</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;up&quot;</span></span><span class="token punctuation">)</span> <span class="token punctuation">}</span>
      <span class="token keyword">end</span>
    filter<span class="token punctuation">.</span>install_filter_methods_on_resource<span class="token punctuation">(</span><span class="token keyword">self</span><span class="token punctuation">,</span> <span class="token symbol">:containers</span><span class="token punctuation">)</span>

    attr_reader <span class="token symbol">:containers</span>
    <span class="token keyword">def</span> <span class="token method-definition"><span class="token function">initialize</span></span><span class="token punctuation">(</span>containers<span class="token punctuation">)</span>
      <span class="token variable">@containers</span> <span class="token operator">=</span> containers
    <span class="token keyword">end</span>
  <span class="token keyword">end</span>

  <span class="token keyword">class</span> <span class="token class-name">DockerImageFilter</span>
    filter <span class="token operator">=</span> FilterTable<span class="token punctuation">.</span>create
    filter<span class="token punctuation">.</span>register_custom_matcher<span class="token punctuation">(</span><span class="token symbol">:exists?</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token operator">|</span>x<span class="token operator">|</span> <span class="token operator">!</span>x<span class="token punctuation">.</span>entries<span class="token punctuation">.</span>empty<span class="token operator">?</span> <span class="token punctuation">}</span>
    filter<span class="token punctuation">.</span>register_column<span class="token punctuation">(</span><span class="token symbol">:ids</span><span class="token punctuation">,</span> <span class="token symbol">field</span><span class="token operator">:</span> <span class="token string-literal"><span class="token string">&quot;id&quot;</span></span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span>register_column<span class="token punctuation">(</span><span class="token symbol">:repositories</span><span class="token punctuation">,</span>  <span class="token symbol">field</span><span class="token operator">:</span> <span class="token string-literal"><span class="token string">&quot;repository&quot;</span></span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span>register_column<span class="token punctuation">(</span><span class="token symbol">:tags</span><span class="token punctuation">,</span>          <span class="token symbol">field</span><span class="token operator">:</span> <span class="token string-literal"><span class="token string">&quot;tag&quot;</span></span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span>register_column<span class="token punctuation">(</span><span class="token symbol">:sizes</span><span class="token punctuation">,</span>         <span class="token symbol">field</span><span class="token operator">:</span> <span class="token string-literal"><span class="token string">&quot;size&quot;</span></span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span>register_column<span class="token punctuation">(</span><span class="token symbol">:digests</span><span class="token punctuation">,</span>       <span class="token symbol">field</span><span class="token operator">:</span> <span class="token string-literal"><span class="token string">&quot;digest&quot;</span></span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span>register_column<span class="token punctuation">(</span><span class="token symbol">:created</span><span class="token punctuation">,</span>       <span class="token symbol">field</span><span class="token operator">:</span> <span class="token string-literal"><span class="token string">&quot;createdat&quot;</span></span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span>register_column<span class="token punctuation">(</span><span class="token symbol">:created_since</span><span class="token punctuation">,</span> <span class="token symbol">field</span><span class="token operator">:</span> <span class="token string-literal"><span class="token string">&quot;createdsize&quot;</span></span><span class="token punctuation">)</span>
    filter<span class="token punctuation">.</span>install_filter_methods_on_resource<span class="token punctuation">(</span><span class="token keyword">self</span><span class="token punctuation">,</span> <span class="token symbol">:images</span><span class="token punctuation">)</span>

    attr_reader <span class="token symbol">:images</span>
    <span class="token keyword">def</span> <span class="token method-definition"><span class="token function">initialize</span></span><span class="token punctuation">(</span>images<span class="token punctuation">)</span>
      <span class="token variable">@images</span> <span class="token operator">=</span> images
    <span class="token keyword">end</span>
  <span class="token keyword">end</span>

  <span class="token keyword">class</span> <span class="token class-name">DockerPluginFilter</span>
    filter <span class="token operator">=</span> FilterTable<span class="token punctuation">.</span>create
    filter<span class="token punctuation">.</span>add<span class="token punctuation">(</span><span class="token symbol">:ids</span><span class="token punctuation">,</span> <span class="token symbol">field</span><span class="token operator">:</span> <span class="token string-literal"><span class="token string">&quot;id&quot;</span></span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span>add<span class="token punctuation">(</span><span class="token symbol">:names</span><span class="token punctuation">,</span>    <span class="token symbol">field</span><span class="token operator">:</span> <span class="token string-literal"><span class="token string">&quot;name&quot;</span></span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span>add<span class="token punctuation">(</span><span class="token symbol">:versions</span><span class="token punctuation">,</span> <span class="token symbol">field</span><span class="token operator">:</span> <span class="token string-literal"><span class="token string">&quot;version&quot;</span></span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span>add<span class="token punctuation">(</span><span class="token symbol">:enabled</span><span class="token punctuation">,</span>  <span class="token symbol">field</span><span class="token operator">:</span> <span class="token string-literal"><span class="token string">&quot;enabled&quot;</span></span><span class="token punctuation">)</span>
    filter<span class="token punctuation">.</span>connect<span class="token punctuation">(</span><span class="token keyword">self</span><span class="token punctuation">,</span> <span class="token symbol">:plugins</span><span class="token punctuation">)</span>

    attr_reader <span class="token symbol">:plugins</span>
    <span class="token keyword">def</span> <span class="token method-definition"><span class="token function">initialize</span></span><span class="token punctuation">(</span>plugins<span class="token punctuation">)</span>
      <span class="token variable">@plugins</span> <span class="token operator">=</span> plugins
    <span class="token keyword">end</span>
  <span class="token keyword">end</span>

  <span class="token keyword">class</span> <span class="token class-name">DockerServiceFilter</span>
    filter <span class="token operator">=</span> FilterTable<span class="token punctuation">.</span>create
    filter<span class="token punctuation">.</span>register_custom_matcher<span class="token punctuation">(</span><span class="token symbol">:exists?</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token operator">|</span>x<span class="token operator">|</span> <span class="token operator">!</span>x<span class="token punctuation">.</span>entries<span class="token punctuation">.</span>empty<span class="token operator">?</span> <span class="token punctuation">}</span>
    filter<span class="token punctuation">.</span>register_column<span class="token punctuation">(</span><span class="token symbol">:ids</span><span class="token punctuation">,</span> <span class="token symbol">field</span><span class="token operator">:</span> <span class="token string-literal"><span class="token string">&quot;id&quot;</span></span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span>register_column<span class="token punctuation">(</span><span class="token symbol">:names</span><span class="token punctuation">,</span>    <span class="token symbol">field</span><span class="token operator">:</span> <span class="token string-literal"><span class="token string">&quot;name&quot;</span></span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span>register_column<span class="token punctuation">(</span><span class="token symbol">:modes</span><span class="token punctuation">,</span>    <span class="token symbol">field</span><span class="token operator">:</span> <span class="token string-literal"><span class="token string">&quot;mode&quot;</span></span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span>register_column<span class="token punctuation">(</span><span class="token symbol">:replicas</span><span class="token punctuation">,</span> <span class="token symbol">field</span><span class="token operator">:</span> <span class="token string-literal"><span class="token string">&quot;replicas&quot;</span></span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span>register_column<span class="token punctuation">(</span><span class="token symbol">:images</span><span class="token punctuation">,</span>   <span class="token symbol">field</span><span class="token operator">:</span> <span class="token string-literal"><span class="token string">&quot;image&quot;</span></span><span class="token punctuation">)</span>
      <span class="token punctuation">.</span>register_column<span class="token punctuation">(</span><span class="token symbol">:ports</span><span class="token punctuation">,</span>    <span class="token symbol">field</span><span class="token operator">:</span> <span class="token string-literal"><span class="token string">&quot;ports&quot;</span></span><span class="token punctuation">)</span>
    filter<span class="token punctuation">.</span>install_filter_methods_on_resource<span class="token punctuation">(</span><span class="token keyword">self</span><span class="token punctuation">,</span> <span class="token symbol">:services</span><span class="token punctuation">)</span>

    attr_reader <span class="token symbol">:services</span>
    <span class="token keyword">def</span> <span class="token method-definition"><span class="token function">initialize</span></span><span class="token punctuation">(</span>services<span class="token punctuation">)</span>
      <span class="token variable">@services</span> <span class="token operator">=</span> services
    <span class="token keyword">end</span>
  <span class="token keyword">end</span>

  <span class="token comment"># This resource helps to parse information from the docker host</span>
  <span class="token comment"># For compatability with Serverspec we also offer the following resouses:</span>
  <span class="token comment"># - docker_container</span>
  <span class="token comment"># - docker_image</span>
  <span class="token keyword">class</span> <span class="token class-name">Docker</span> <span class="token operator">&lt;</span> Inspec<span class="token punctuation">.</span>resource<span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
    name <span class="token string-literal"><span class="token string">&quot;docker&quot;</span></span>
    supports platform<span class="token operator">:</span> <span class="token string-literal"><span class="token string">&quot;unix&quot;</span></span>
    desc &quot;
      <span class="token constant">A</span> resource to retrieve information about docker
    &quot;

    example <span class="token string-literal heredoc-string"><span class="token delimiter"><span class="token punctuation">&lt;&lt;~</span><span class="token symbol">EXAMPLE</span></span><span class="token string">
      describe docker.containers do
        its(&#39;images&#39;) { should_not include &#39;u12:latest&#39; }
      end

      describe docker.images do
        its(&#39;repositories&#39;) { should_not include &#39;inssecure_image&#39; }
      end

      describe docker.plugins.where { name == &#39;rexray/ebs&#39; } do
        it { should exist }
      end

      describe docker.services do
        its(&#39;images&#39;) { should_not include &#39;inssecure_image&#39; }
      end

      describe docker.version do
        its(&#39;Server.Version&#39;) { should cmp &gt;= &#39;1.12&#39;}
        its(&#39;Client.Version&#39;) { should cmp &gt;= &#39;1.12&#39;}
      end

      describe docker.object(id) do
        its(&#39;Configuration.Path&#39;) { should eq &#39;value&#39; }
      end

      docker.containers.ids.each do |id|
        # call docker inspect for a specific container id
        describe docker.object(id) do
          its(%w(HostConfig Privileged)) { should cmp false }
          its(%w(HostConfig Privileged)) { should_not cmp true }
        end
      end
    </span><span class="token delimiter"><span class="token symbol">EXAMPLE</span></span></span>

    <span class="token keyword">def</span> <span class="token method-definition"><span class="token function">containers</span></span>
      <span class="token class-name">DockerContainerFilter</span><span class="token punctuation">.</span><span class="token keyword">new</span><span class="token punctuation">(</span>parse_containers<span class="token punctuation">)</span>
    <span class="token keyword">end</span>

    <span class="token keyword">def</span> <span class="token method-definition"><span class="token function">images</span></span>
      <span class="token class-name">DockerImageFilter</span><span class="token punctuation">.</span><span class="token keyword">new</span><span class="token punctuation">(</span>parse_images<span class="token punctuation">)</span>
    <span class="token keyword">end</span>

    <span class="token keyword">def</span> <span class="token method-definition"><span class="token function">plugins</span></span>
      <span class="token class-name">DockerPluginFilter</span><span class="token punctuation">.</span><span class="token keyword">new</span><span class="token punctuation">(</span>parse_plugins<span class="token punctuation">)</span>
    <span class="token keyword">end</span>

    <span class="token keyword">def</span> <span class="token method-definition"><span class="token function">services</span></span>
      <span class="token class-name">DockerServiceFilter</span><span class="token punctuation">.</span><span class="token keyword">new</span><span class="token punctuation">(</span>parse_services<span class="token punctuation">)</span>
    <span class="token keyword">end</span>

    <span class="token keyword">def</span> <span class="token method-definition"><span class="token function">version</span></span>
      <span class="token keyword">return</span> <span class="token variable">@version</span> <span class="token keyword">if</span> <span class="token keyword">defined</span><span class="token operator">?</span><span class="token punctuation">(</span><span class="token variable">@version</span><span class="token punctuation">)</span>

      data <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
      cmd <span class="token operator">=</span> inspec<span class="token punctuation">.</span>command<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;docker version --format &#39;{{ json . }}&#39;&quot;</span></span><span class="token punctuation">)</span>
      data <span class="token operator">=</span> <span class="token constant">JSON</span><span class="token punctuation">.</span>parse<span class="token punctuation">(</span>cmd<span class="token punctuation">.</span>stdout<span class="token punctuation">)</span> <span class="token keyword">if</span> cmd<span class="token punctuation">.</span>exit_status <span class="token operator">==</span> <span class="token number">0</span>
      <span class="token variable">@version</span> <span class="token operator">=</span> Hashie<span class="token double-colon punctuation">::</span><span class="token class-name">Mash</span><span class="token punctuation">.</span><span class="token keyword">new</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span>
    <span class="token keyword">rescue</span> <span class="token constant">JSON</span><span class="token double-colon punctuation">::</span>ParserError <span class="token operator">=&gt;</span> _e
      Hashie<span class="token double-colon punctuation">::</span><span class="token class-name">Mash</span><span class="token punctuation">.</span><span class="token keyword">new</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token keyword">end</span>

    <span class="token keyword">def</span> <span class="token method-definition"><span class="token function">info</span></span>
      <span class="token keyword">return</span> <span class="token variable">@info</span> <span class="token keyword">if</span> <span class="token keyword">defined</span><span class="token operator">?</span><span class="token punctuation">(</span><span class="token variable">@info</span><span class="token punctuation">)</span>

      data <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span>
      <span class="token comment"># docke info format is only supported for Docker 17.03+</span>
      cmd <span class="token operator">=</span> inspec<span class="token punctuation">.</span>command<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;docker info --format &#39;{{ json . }}&#39;&quot;</span></span><span class="token punctuation">)</span>
      data <span class="token operator">=</span> <span class="token constant">JSON</span><span class="token punctuation">.</span>parse<span class="token punctuation">(</span>cmd<span class="token punctuation">.</span>stdout<span class="token punctuation">)</span> <span class="token keyword">if</span> cmd<span class="token punctuation">.</span>exit_status <span class="token operator">==</span> <span class="token number">0</span>
      <span class="token variable">@info</span> <span class="token operator">=</span> Hashie<span class="token double-colon punctuation">::</span><span class="token class-name">Mash</span><span class="token punctuation">.</span><span class="token keyword">new</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span>
    <span class="token keyword">rescue</span> <span class="token constant">JSON</span><span class="token double-colon punctuation">::</span>ParserError <span class="token operator">=&gt;</span> _e
      Hashie<span class="token double-colon punctuation">::</span><span class="token class-name">Mash</span><span class="token punctuation">.</span><span class="token keyword">new</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token keyword">end</span>

    <span class="token comment"># returns information about docker objects</span>
    <span class="token keyword">def</span> <span class="token method-definition"><span class="token function">object</span></span><span class="token punctuation">(</span>id<span class="token punctuation">)</span>
      <span class="token keyword">return</span> <span class="token variable">@inspect</span> <span class="token keyword">if</span> <span class="token keyword">defined</span><span class="token operator">?</span><span class="token punctuation">(</span><span class="token variable">@inspect</span><span class="token punctuation">)</span>

      data <span class="token operator">=</span> <span class="token constant">JSON</span><span class="token punctuation">.</span>parse<span class="token punctuation">(</span>inspec<span class="token punctuation">.</span>command<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;docker inspect </span><span class="token interpolation"><span class="token delimiter punctuation">#{</span><span class="token content">id</span><span class="token delimiter punctuation">}</span></span><span class="token string">&quot;</span></span><span class="token punctuation">)</span><span class="token punctuation">.</span>stdout<span class="token punctuation">)</span>
      data <span class="token operator">=</span> data<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token keyword">if</span> data<span class="token punctuation">.</span>is_a<span class="token operator">?</span><span class="token punctuation">(</span><span class="token builtin">Array</span><span class="token punctuation">)</span>
      <span class="token variable">@inspect</span> <span class="token operator">=</span> Hashie<span class="token double-colon punctuation">::</span><span class="token class-name">Mash</span><span class="token punctuation">.</span><span class="token keyword">new</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span>
    <span class="token keyword">rescue</span> <span class="token constant">JSON</span><span class="token double-colon punctuation">::</span>ParserError <span class="token operator">=&gt;</span> _e
      Hashie<span class="token double-colon punctuation">::</span><span class="token class-name">Mash</span><span class="token punctuation">.</span><span class="token keyword">new</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
    <span class="token keyword">end</span>

    <span class="token keyword">def</span> <span class="token method-definition"><span class="token function">to_s</span></span>
      <span class="token string-literal"><span class="token string">&quot;Docker Host&quot;</span></span>
    <span class="token keyword">end</span>

    <span class="token keyword">private</span>

    <span class="token keyword">def</span> <span class="token method-definition"><span class="token function">parse_json_command</span></span><span class="token punctuation">(</span>labels<span class="token punctuation">,</span> subcommand<span class="token punctuation">)</span>
      <span class="token comment"># build command</span>
      format <span class="token operator">=</span> labels<span class="token punctuation">.</span>map <span class="token punctuation">{</span> <span class="token operator">|</span>label<span class="token operator">|</span> <span class="token string-literal"><span class="token string">&quot;\\&quot;</span><span class="token interpolation"><span class="token delimiter punctuation">#{</span><span class="token content">label</span><span class="token delimiter punctuation">}</span></span><span class="token string">\\&quot;: {{json .</span><span class="token interpolation"><span class="token delimiter punctuation">#{</span><span class="token content">label</span><span class="token delimiter punctuation">}</span></span><span class="token string">}}&quot;</span></span> <span class="token punctuation">}</span>
      raw <span class="token operator">=</span> inspec<span class="token punctuation">.</span>command<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;docker </span><span class="token interpolation"><span class="token delimiter punctuation">#{</span><span class="token content">subcommand</span><span class="token delimiter punctuation">}</span></span><span class="token string"> --format &#39;{</span><span class="token interpolation"><span class="token delimiter punctuation">#{</span><span class="token content">format<span class="token punctuation">.</span>join<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;, &quot;</span></span><span class="token punctuation">)</span></span><span class="token delimiter punctuation">}</span></span><span class="token string">}&#39;&quot;</span></span><span class="token punctuation">)</span><span class="token punctuation">.</span>stdout
      output <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
      <span class="token comment"># since docker is not outputting valid json, we need to parse each row</span>
      raw<span class="token punctuation">.</span>each_line <span class="token keyword">do</span> <span class="token operator">|</span>entry<span class="token operator">|</span>
        <span class="token comment"># convert all keys to lower_case to work well with ruby and filter table</span>
        row <span class="token operator">=</span> <span class="token constant">JSON</span><span class="token punctuation">.</span>parse<span class="token punctuation">(</span>entry<span class="token punctuation">)</span><span class="token punctuation">.</span>map <span class="token keyword">do</span> <span class="token operator">|</span>key<span class="token punctuation">,</span> value<span class="token operator">|</span>
          <span class="token punctuation">[</span>key<span class="token punctuation">.</span>downcase<span class="token punctuation">,</span> value<span class="token punctuation">]</span>
        <span class="token keyword">end</span><span class="token punctuation">.</span>to_h

        <span class="token comment"># ensure all keys are there</span>
        row <span class="token operator">=</span> ensure_keys<span class="token punctuation">(</span>row<span class="token punctuation">,</span> labels<span class="token punctuation">)</span>

        <span class="token comment"># strip off any linked container names</span>
        <span class="token comment"># Depending on how it was linked, the actual container name may come before</span>
        <span class="token comment"># or after the link information, so we&#39;ll just look for the first name that</span>
        <span class="token comment"># does not include a slash since that is not a valid character in a container name</span>
        <span class="token keyword">if</span> row<span class="token punctuation">[</span><span class="token string-literal"><span class="token string">&quot;names&quot;</span></span><span class="token punctuation">]</span>
          row<span class="token punctuation">[</span><span class="token string-literal"><span class="token string">&quot;names&quot;</span></span><span class="token punctuation">]</span> <span class="token operator">=</span> row<span class="token punctuation">[</span><span class="token string-literal"><span class="token string">&quot;names&quot;</span></span><span class="token punctuation">]</span><span class="token punctuation">.</span>split<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;,&quot;</span></span><span class="token punctuation">)</span><span class="token punctuation">.</span>find <span class="token punctuation">{</span> <span class="token operator">|</span>c<span class="token operator">|</span> <span class="token operator">!</span>c<span class="token punctuation">.</span><span class="token keyword">include</span><span class="token operator">?</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;/&quot;</span></span><span class="token punctuation">)</span> <span class="token punctuation">}</span>
        <span class="token keyword">end</span>

        <span class="token comment"># Split labels on &#39;,&#39; or set to empty array</span>
        <span class="token comment"># Allows for \`docker.containers.where { labels.include?(&#39;app=redis&#39;) }\`</span>
        row<span class="token punctuation">[</span><span class="token string-literal"><span class="token string">&quot;labels&quot;</span></span><span class="token punctuation">]</span> <span class="token operator">=</span> row<span class="token punctuation">.</span>key<span class="token operator">?</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;labels&quot;</span></span><span class="token punctuation">)</span> <span class="token operator">?</span> row<span class="token punctuation">[</span><span class="token string-literal"><span class="token string">&quot;labels&quot;</span></span><span class="token punctuation">]</span><span class="token punctuation">.</span>split<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;,&quot;</span></span><span class="token punctuation">)</span> <span class="token operator">:</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>

        output<span class="token punctuation">.</span>push<span class="token punctuation">(</span>row<span class="token punctuation">)</span>
      <span class="token keyword">end</span>

      output
    <span class="token keyword">rescue</span> <span class="token constant">JSON</span><span class="token double-colon punctuation">::</span>ParserError <span class="token operator">=&gt;</span> _e
      warn <span class="token string-literal"><span class="token string">&quot;Could not parse \`docker </span><span class="token interpolation"><span class="token delimiter punctuation">#{</span><span class="token content">subcommand</span><span class="token delimiter punctuation">}</span></span><span class="token string">\` output&quot;</span></span>
      <span class="token punctuation">[</span><span class="token punctuation">]</span>
    <span class="token keyword">end</span>

    <span class="token keyword">def</span> <span class="token method-definition"><span class="token function">parse_containers</span></span>
      <span class="token comment"># @see https://github.com/moby/moby/issues/20625, works for docker 1.13+</span>
      <span class="token comment"># raw_containers = inspec.command(&#39;docker ps -a --no-trunc --format \\&#39;{{ json . }}\\&#39;&#39;).stdout</span>
      <span class="token comment"># therefore we stick with older approach</span>
      labels <span class="token operator">=</span> <span class="token string-literal"><span class="token string">%w{Command CreatedAt ID Image Labels Mounts Names Ports RunningFor Size Status}</span></span>

      <span class="token comment"># Networks LocalVolumes work with 1.13+ only</span>
      <span class="token keyword">if</span> <span class="token operator">!</span>version<span class="token punctuation">.</span>empty<span class="token operator">?</span> <span class="token operator">&amp;&amp;</span> Gem<span class="token double-colon punctuation">::</span><span class="token class-name">Version</span><span class="token punctuation">.</span><span class="token keyword">new</span><span class="token punctuation">(</span>version<span class="token punctuation">[</span><span class="token string-literal"><span class="token string">&quot;Client&quot;</span></span><span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token string-literal"><span class="token string">&quot;Version&quot;</span></span><span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token operator">&gt;=</span> Gem<span class="token double-colon punctuation">::</span><span class="token class-name">Version</span><span class="token punctuation">.</span><span class="token keyword">new</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;1.13&quot;</span></span><span class="token punctuation">)</span>
        labels<span class="token punctuation">.</span>push<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;Networks&quot;</span></span><span class="token punctuation">)</span>
        labels<span class="token punctuation">.</span>push<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&quot;LocalVolumes&quot;</span></span><span class="token punctuation">)</span>
      <span class="token keyword">end</span>
      parse_json_command<span class="token punctuation">(</span>labels<span class="token punctuation">,</span> <span class="token string-literal"><span class="token string">&quot;ps -a --no-trunc&quot;</span></span><span class="token punctuation">)</span>
    <span class="token keyword">end</span>

    <span class="token keyword">def</span> <span class="token method-definition"><span class="token function">parse_services</span></span>
      parse_json_command<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">%w{ID Name Mode Replicas Image Ports}</span></span><span class="token punctuation">,</span> <span class="token string-literal"><span class="token string">&quot;service ls&quot;</span></span><span class="token punctuation">)</span>
    <span class="token keyword">end</span>

    <span class="token keyword">def</span> <span class="token method-definition"><span class="token function">ensure_keys</span></span><span class="token punctuation">(</span>entry<span class="token punctuation">,</span> labels<span class="token punctuation">)</span>
      labels<span class="token punctuation">.</span><span class="token keyword">each</span> <span class="token keyword">do</span> <span class="token operator">|</span>key<span class="token operator">|</span>
        entry<span class="token punctuation">[</span>key<span class="token punctuation">.</span>downcase<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token keyword">nil</span> <span class="token keyword">unless</span> entry<span class="token punctuation">.</span>key<span class="token operator">?</span><span class="token punctuation">(</span>key<span class="token punctuation">.</span>downcase<span class="token punctuation">)</span>
      <span class="token keyword">end</span>
      entry
    <span class="token keyword">end</span>

    <span class="token keyword">def</span> <span class="token method-definition"><span class="token function">parse_images</span></span>
      <span class="token comment"># docker does not support the \`json .\` function here, therefore we need to emulate that behavior.</span>
      raw_images <span class="token operator">=</span> inspec<span class="token punctuation">.</span>command<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&#39;docker images -a --no-trunc --format \\&#39;{ &quot;id&quot;: {{json .ID}}, &quot;repository&quot;: {{json .Repository}}, &quot;tag&quot;: {{json .Tag}}, &quot;size&quot;: {{json .Size}}, &quot;digest&quot;: {{json .Digest}}, &quot;createdat&quot;: {{json .CreatedAt}}, &quot;createdsize&quot;: {{json .CreatedSince}} }\\&#39;&#39;</span></span><span class="token punctuation">)</span><span class="token punctuation">.</span>stdout
      c_images <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
      raw_images<span class="token punctuation">.</span>each_line <span class="token keyword">do</span> <span class="token operator">|</span>entry<span class="token operator">|</span>
        c_images<span class="token punctuation">.</span>push<span class="token punctuation">(</span><span class="token constant">JSON</span><span class="token punctuation">.</span>parse<span class="token punctuation">(</span>entry<span class="token punctuation">)</span><span class="token punctuation">)</span>
      <span class="token keyword">end</span>
      c_images
    <span class="token keyword">rescue</span> <span class="token constant">JSON</span><span class="token double-colon punctuation">::</span>ParserError <span class="token operator">=&gt;</span> _e
      warn <span class="token string-literal"><span class="token string">&quot;Could not parse \`docker images\` output&quot;</span></span>
      <span class="token punctuation">[</span><span class="token punctuation">]</span>
    <span class="token keyword">end</span>

    <span class="token keyword">def</span> <span class="token method-definition"><span class="token function">parse_plugins</span></span>
      plugins <span class="token operator">=</span> inspec<span class="token punctuation">.</span>command<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">&#39;docker plugin ls --format \\&#39;{&quot;id&quot;: {{json .ID}}, &quot;name&quot;: &quot;{{ with split .Name &quot;:&quot;}}{{index . 0}}{{end}}&quot;, &quot;version&quot;: &quot;{{ with split .Name &quot;:&quot;}}{{index . 1}}{{end}}&quot;, &quot;enabled&quot;: {{json .Enabled}} }\\&#39;&#39;</span></span><span class="token punctuation">)</span><span class="token punctuation">.</span>stdout
      c_plugins <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
      plugins<span class="token punctuation">.</span>each_line <span class="token keyword">do</span> <span class="token operator">|</span>entry<span class="token operator">|</span>
        c_plugins<span class="token punctuation">.</span>push<span class="token punctuation">(</span><span class="token constant">JSON</span><span class="token punctuation">.</span>parse<span class="token punctuation">(</span>entry<span class="token punctuation">)</span><span class="token punctuation">)</span>
      <span class="token keyword">end</span>
      c_plugins
    <span class="token keyword">rescue</span> <span class="token constant">JSON</span><span class="token double-colon punctuation">::</span>ParserError <span class="token operator">=&gt;</span> _e
      warn <span class="token string-literal"><span class="token string">&quot;Could not parse \`docker plugin ls\` output&quot;</span></span>
      <span class="token punctuation">[</span><span class="token punctuation">]</span>
    <span class="token keyword">end</span>
  <span class="token keyword">end</span>
<span class="token keyword">end</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,14);function t(p,o){return e}var c=n(a,[["render",t],["__file","11.html.vue"]]);export{c as default};
