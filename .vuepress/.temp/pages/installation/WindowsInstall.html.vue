<template><h1 id="install-inspec-on-windows" tabindex="-1"><a class="header-anchor" href="#install-inspec-on-windows" aria-hidden="true">#</a> Install InSpec on Windows</h1>
<h2 id="install-ruby" tabindex="-1"><a class="header-anchor" href="#install-ruby" aria-hidden="true">#</a> Install Ruby</h2>
<p>Go to <a href="https://rubyinstaller.org/downloads/" target="_blank" rel="noopener noreferrer">https://rubyinstaller.org/downloads/<ExternalLinkIcon/></a> and download and install the newest ruby that corresponds with your operating system, it will look like this: <code v-pre>Ruby+Devkit x.x.x</code>.</p>
<ul>
<li><strong>Make sure when installing</strong> that the two checkboxes are checked for <code v-pre>Add Ruby executables to your PATH</code> and <code v-pre>Associate .rb and .rbw files with this Ruby installation</code></li>
<li>When installation is complete keep the last checkbox marked to perform ridk installation. Once console pops up and prompts you to interact then press <code v-pre>enter</code>. When this is complete close the command prompt</li>
</ul>
<h4 id="verify-ruby-installation" tabindex="-1"><a class="header-anchor" href="#verify-ruby-installation" aria-hidden="true">#</a> Verify Ruby installation</h4>
<ul>
<li>Open powershell</li>
<li>type <code v-pre>$ ruby -v</code>, then press enter
<ul>
<li>if a ruby version is returned then ruby is properly installed</li>
</ul>
</li>
</ul>
<h4 id="verify-ruby-devkit-installation" tabindex="-1"><a class="header-anchor" href="#verify-ruby-devkit-installation" aria-hidden="true">#</a> Verify Ruby Devkit installation</h4>
<ul>
<li>Open powershell</li>
<li>type <code v-pre>$ gem install json --platform=ruby</code>, then press enter
<ul>
<li>If the devkit is installed properly then this command will install the RubyGems library JSON gem.</li>
</ul>
</li>
</ul>
<h2 id="install-inspec" tabindex="-1"><a class="header-anchor" href="#install-inspec" aria-hidden="true">#</a> Install InSpec</h2>
<h3 id="option-1-download-as-a-package" tabindex="-1"><a class="header-anchor" href="#option-1-download-as-a-package" aria-hidden="true">#</a> Option 1 (Download as a package)</h3>
<p>The InSpec package is available for MacOS, RedHat, Ubuntu and Windows. Download the latest package at <a href="https://downloads.chef.io/inspec" target="_blank" rel="noopener noreferrer">InSpec Downloads<ExternalLinkIcon/></a> or install InSpec via script:</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code># Windows
. { iwr -useb https://omnitruck.chef.io/install.ps1 } | iex; install -project inspec
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="option-2-download-as-a-ruby-gem" tabindex="-1"><a class="header-anchor" href="#option-2-download-as-a-ruby-gem" aria-hidden="true">#</a> Option 2 (Download as a ruby gem)</h3>
<ul>
<li>Open powershell</li>
<li>type <code v-pre>$ gem install inspec</code>, then press enter</li>
</ul>
<h2 id="download-additional-required-gems" tabindex="-1"><a class="header-anchor" href="#download-additional-required-gems" aria-hidden="true">#</a> Download additional required gems</h2>
<ul>
<li>type <code v-pre>$ gem install bundler</code>, then press enter</li>
<li>type <code v-pre>$ gem install test-kitchen</code>, then press enter</li>
</ul>
<h2 id="after-install" tabindex="-1"><a class="header-anchor" href="#after-install" aria-hidden="true">#</a> After Install</h2>
<p>Once InSpec is installed, run <code v-pre>$ inspec version</code> to verify that the installation was successful.</p>
</template>
