import{_ as e}from"./plugin-vue_export-helper-x3n3nnut.js";import{o as n,c as s,f as i}from"./app-KhTIoQwo.js";const a={},l=i(`<h2 id="inspec-delta" tabindex="-1"><a class="header-anchor" href="#inspec-delta"><span>InSpec Delta</span></a></h2><h3 id="preparing-the-profile-before-running-delta" tabindex="-1"><a class="header-anchor" href="#preparing-the-profile-before-running-delta"><span>Preparing the Profile Before Running Delta</span></a></h3><p>Before running Delta, it&#39;s beneficial to format the profile to match the format Delta will use. This minimizes changes to only those necessary based on the guidance update. Follow these steps:</p><ol><li><strong>Run Cookstyle:</strong> Install the Cookstyle gem and use it to lint the controls into Cookstyle format. Verify the gem installation with <code>gem list cookstyle</code>. Create a <code>.rubocop.yml</code> file with the provided example settings or modify these settings via the command line. Run <code>cookstyle -a ./controls</code> and any tests you have for your profile.</li></ol><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>AllCops:
  Exclude:
    - <span class="token string">&quot;libraries/**/*&quot;</span>

Layout/LineLength:
  Max: <span class="token number">1000</span>
  AllowURI: <span class="token boolean">true</span>
  IgnoreCopDirectives: <span class="token boolean">true</span>

Naming/FileName:
  Enabled: <span class="token boolean">false</span>

Metrics/BlockLength:
  Max: <span class="token number">400</span>

Lint/ConstantDefinitionInBlock:
  Enabled: <span class="token boolean">false</span>

<span class="token comment"># Required for Profiles as it can introduce profile errors</span>
Style/NumericPredicate:
  Enabled: <span class="token boolean">false</span>

Style/WordArray:
  Description: <span class="token string">&quot;Use %w or %W for an array of words. (https://rubystyle.guide#percent-w)&quot;</span>
  Enabled: <span class="token boolean">false</span>

Style/RedundantPercentQ:
  Enabled: <span class="token boolean">true</span>

Style/NestedParenthesizedCalls:
  Enabled: <span class="token boolean">false</span>

Style/TrailingCommaInHashLiteral:
  Description: <span class="token string">&quot;https://docs.rubocop.org/rubocop/cops_style.html#styletrailingcommainhashliteral&quot;</span>
  Enabled: <span class="token boolean">true</span>
  EnforcedStyleForMultiline: no_comma

Style/TrailingCommaInArrayLiteral:
  Enabled: <span class="token boolean">true</span>
  EnforcedStyleForMultiline: no_comma

Style/BlockDelimiters:
  Enabled: <span class="token boolean">false</span>

Lint/AmbiguousBlockAssociation:
  Enabled: <span class="token boolean">false</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2"><li><strong>Run the SAF CLI Command:</strong> Use <code>saf generate update_controls4delta</code> to check and update the control IDs with the provided XCCDF guidance. This process checks if the new guidance changes the control numbers and updates them if necessary. This minimizes the Delta output content and improves the visualization of the modifications provided by the Delta process.</li></ol>`,6),o=[l];function t(d,r){return n(),s("div",null,o)}const v=e(a,[["render",t],["__file","25.html.vue"]]);export{v as default};
