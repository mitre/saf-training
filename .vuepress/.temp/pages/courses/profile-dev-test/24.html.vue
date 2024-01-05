<template><div><h1 id="inspec-delta" tabindex="-1"><a class="header-anchor" href="#inspec-delta" aria-hidden="true">#</a> InSpec Delta</h1>
<h2 id="preparing-the-profile-before-running-delta" tabindex="-1"><a class="header-anchor" href="#preparing-the-profile-before-running-delta" aria-hidden="true">#</a> Preparing the Profile Before Running Delta</h2>
<p>Before running Delta, it's beneficial to format the profile to match the format Delta will use. This minimizes changes to only those necessary based on the guidance update. Follow these steps:</p>
<ol>
<li><strong>Run Cookstyle:</strong> Install the Cookstyle gem and use it to lint the controls into Cookstyle format. Verify the gem installation with <code v-pre>gem list cookstyle</code>. Create a <code v-pre>.rubocop.yml</code> file with the provided example settings or modify these settings via the command line. Run <code v-pre>cookstyle -a ./controls</code> and any tests you have for your profile.</li>
</ol>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>AllCops:
  Exclude:
    - <span class="token string">"libraries/**/*"</span>

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
  Description: <span class="token string">"Use %w or %W for an array of words. (https://rubystyle.guide#percent-w)"</span>
  Enabled: <span class="token boolean">false</span>

Style/RedundantPercentQ:
  Enabled: <span class="token boolean">true</span>

Style/NestedParenthesizedCalls:
  Enabled: <span class="token boolean">false</span>

Style/TrailingCommaInHashLiteral:
  Description: <span class="token string">"https://docs.rubocop.org/rubocop/cops_style.html#styletrailingcommainhashliteral"</span>
  Enabled: <span class="token boolean">true</span>
  EnforcedStyleForMultiline: no_comma

Style/TrailingCommaInArrayLiteral:
  Enabled: <span class="token boolean">true</span>
  EnforcedStyleForMultiline: no_comma

Style/BlockDelimiters:
  Enabled: <span class="token boolean">false</span>

Lint/AmbiguousBlockAssociation:
  Enabled: <span class="token boolean">false</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2">
<li><strong>Run the SAF CLI Command:</strong> Use <code v-pre>saf generate update_controls4delta</code> to check and update the control IDs with the provided XCCDF guidance. This process checks if the new guidance changes the control numbers and updates them if necessary. This minimizes the Delta output content and improves the visualization of the modifications provided by the Delta process.</li>
</ol>
</div></template>


