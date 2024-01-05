<template><div><h1 id="install-inspec-on-mac" tabindex="-1"><a class="header-anchor" href="#install-inspec-on-mac" aria-hidden="true">#</a> Install InSpec on Mac</h1>
<h2 id="option-1-package-installer" tabindex="-1"><a class="header-anchor" href="#option-1-package-installer" aria-hidden="true">#</a> Option 1 (Package installer)</h2>
<p>The InSpec package is available for MacOS, RedHat, Ubuntu and Windows. Download the latest package at <a href="https://downloads.chef.io/inspec" target="_blank" rel="noopener noreferrer">InSpec Downloads<ExternalLinkIcon/></a> or install InSpec via script:</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code># RedHat, Ubuntu, and macOS
$ curl https://omnitruck.chef.io/install.sh | sudo bash -s -- -P inspec
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="option-2-terminal-install" tabindex="-1"><a class="header-anchor" href="#option-2-terminal-install" aria-hidden="true">#</a> Option 2 (Terminal install)</h2>
<p>Another option is to install InSpec via a command line:</p>
<h4 id="_1-install-homebrew" tabindex="-1"><a class="header-anchor" href="#_1-install-homebrew" aria-hidden="true">#</a> 1. Install Homebrew</h4>
<p>Before I could install InSpec, I needed to have the latest version of Ruby installed. And before I could install the latest version of Ruby, I had to install Homebrew, the OS X package manager.</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>$ /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="_2-update-ruby" tabindex="-1"><a class="header-anchor" href="#_2-update-ruby" aria-hidden="true">#</a> 2. Update Ruby</h4>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>$ brew install rbenv ruby-build
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>Add rbenv to bash so that it loads every time you open a terminal</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>$ echo 'if which rbenv > /dev/null; then eval "$(rbenv init -)"; fi' >> ~/.bash_profile
$ source ~/.bash_profile

$ rbenv install 2.7.2
$ rbenv global 2.7.2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Close terminal and reopen.</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>$ ruby -v
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="_3-installing-inspec" tabindex="-1"><a class="header-anchor" href="#_3-installing-inspec" aria-hidden="true">#</a> 3. Installing InSpec</h4>
<p>Now we’re on to the good stuff. Let’s install InSpec:</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>$ gem install inspec
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="_4-installing-additional-gems" tabindex="-1"><a class="header-anchor" href="#_4-installing-additional-gems" aria-hidden="true">#</a> 4. Installing additional gems</h4>
<p>Install the following gems:</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>$ gem install bundler
$ gem install test-kitchen
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="after-install" tabindex="-1"><a class="header-anchor" href="#after-install" aria-hidden="true">#</a> After Install</h2>
<p>Once InSpec is installed, run <code v-pre>inspec version</code> to verify that the installation was successful.</p>
</div></template>


