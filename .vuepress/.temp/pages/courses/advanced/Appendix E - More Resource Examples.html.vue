<template><div><h3 id="_11-1-file" tabindex="-1"><a class="header-anchor" href="#_11-1-file" aria-hidden="true">#</a> 11.1. File</h3>
<div class="language-ruby line-numbers-mode" data-ext="rb"><pre v-pre class="language-ruby"><code><span class="token comment"># copyright: 2015, Vulcano Security GmbH</span>

<span class="token keyword">require</span> <span class="token string-literal"><span class="token string">"shellwords"</span></span>
<span class="token keyword">require</span> <span class="token string-literal"><span class="token string">"inspec/utils/parser"</span></span>

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

    name <span class="token string-literal"><span class="token string">"file"</span></span>
    supports platform<span class="token operator">:</span> <span class="token string-literal"><span class="token string">"unix"</span></span>
    supports platform<span class="token operator">:</span> <span class="token string-literal"><span class="token string">"windows"</span></span>
    desc <span class="token string-literal"><span class="token string">"Use the file InSpec audit resource to test all system file types, including files, directories, symbolic links, named pipes, sockets, character devices, block devices, and doors."</span></span>
    example <span class="token string-literal heredoc-string"><span class="token delimiter"><span class="token punctuation">&lt;&lt;~</span><span class="token symbol">EXAMPLE</span></span><span class="token string">
      describe file('path') do
        it { should exist }
        it { should be_file }
        it { should be_readable }
        it { should be_writable }
        it { should be_executable.by_user('root') }
        it { should be_owned_by 'root' }
        its('mode') { should cmp '0644' }
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

      res<span class="token punctuation">.</span>force_encoding<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">"utf-8"</span></span><span class="token punctuation">)</span>
    <span class="token keyword">end</span>

    <span class="token keyword">def</span> <span class="token method-definition"><span class="token function">contain</span></span><span class="token punctuation">(</span><span class="token operator">*</span>_<span class="token punctuation">)</span>
      <span class="token keyword">raise</span> <span class="token string-literal"><span class="token string">"Contain is not supported. Please use standard RSpec matchers."</span></span>
    <span class="token keyword">end</span>

    <span class="token keyword">def</span> <span class="token method-definition"><span class="token function">readable</span></span><span class="token operator">?</span><span class="token punctuation">(</span>by_usergroup<span class="token punctuation">,</span> by_specific_user<span class="token punctuation">)</span>
      <span class="token keyword">return</span> <span class="token boolean">false</span> <span class="token keyword">unless</span> exist<span class="token operator">?</span>
      <span class="token keyword">return</span> skip_resource <span class="token string-literal"><span class="token string">"`readable?` is not supported on your OS yet."</span></span> <span class="token keyword">if</span> <span class="token variable">@perms_provider</span><span class="token punctuation">.</span><span class="token keyword">nil</span><span class="token operator">?</span>

      file_permission_granted<span class="token operator">?</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">"read"</span></span><span class="token punctuation">,</span> by_usergroup<span class="token punctuation">,</span> by_specific_user<span class="token punctuation">)</span>
    <span class="token keyword">end</span>

    <span class="token keyword">def</span> <span class="token method-definition"><span class="token function">writable</span></span><span class="token operator">?</span><span class="token punctuation">(</span>by_usergroup<span class="token punctuation">,</span> by_specific_user<span class="token punctuation">)</span>
      <span class="token keyword">return</span> <span class="token boolean">false</span> <span class="token keyword">unless</span> exist<span class="token operator">?</span>
      <span class="token keyword">return</span> skip_resource <span class="token string-literal"><span class="token string">"`writable?` is not supported on your OS yet."</span></span> <span class="token keyword">if</span> <span class="token variable">@perms_provider</span><span class="token punctuation">.</span><span class="token keyword">nil</span><span class="token operator">?</span>

      file_permission_granted<span class="token operator">?</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">"write"</span></span><span class="token punctuation">,</span> by_usergroup<span class="token punctuation">,</span> by_specific_user<span class="token punctuation">)</span>
    <span class="token keyword">end</span>

    <span class="token keyword">def</span> <span class="token method-definition"><span class="token function">executable</span></span><span class="token operator">?</span><span class="token punctuation">(</span>by_usergroup<span class="token punctuation">,</span> by_specific_user<span class="token punctuation">)</span>
      <span class="token keyword">return</span> <span class="token boolean">false</span> <span class="token keyword">unless</span> exist<span class="token operator">?</span>
      <span class="token keyword">return</span> skip_resource <span class="token string-literal"><span class="token string">"`executable?` is not supported on your OS yet."</span></span> <span class="token keyword">if</span> <span class="token variable">@perms_provider</span><span class="token punctuation">.</span><span class="token keyword">nil</span><span class="token operator">?</span>

      file_permission_granted<span class="token operator">?</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">"execute"</span></span><span class="token punctuation">,</span> by_usergroup<span class="token punctuation">,</span> by_specific_user<span class="token punctuation">)</span>
    <span class="token keyword">end</span>

    <span class="token keyword">def</span> <span class="token method-definition"><span class="token function">allowed</span></span><span class="token operator">?</span><span class="token punctuation">(</span>permission<span class="token punctuation">,</span> opts <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
      <span class="token keyword">return</span> <span class="token boolean">false</span> <span class="token keyword">unless</span> exist<span class="token operator">?</span>
      <span class="token keyword">return</span> skip_resource <span class="token string-literal"><span class="token string">"`allowed?` is not supported on your OS yet."</span></span> <span class="token keyword">if</span> <span class="token variable">@perms_provider</span><span class="token punctuation">.</span><span class="token keyword">nil</span><span class="token operator">?</span>

      file_permission_granted<span class="token operator">?</span><span class="token punctuation">(</span>permission<span class="token punctuation">,</span> opts<span class="token punctuation">[</span><span class="token symbol">:by</span><span class="token punctuation">]</span><span class="token punctuation">,</span> opts<span class="token punctuation">[</span><span class="token symbol">:by_user</span><span class="token punctuation">]</span><span class="token punctuation">)</span>
    <span class="token keyword">end</span>

    <span class="token keyword">def</span> <span class="token method-definition"><span class="token function">mounted</span></span><span class="token operator">?</span><span class="token punctuation">(</span>expected_options <span class="token operator">=</span> <span class="token keyword">nil</span><span class="token punctuation">,</span> identical <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">)</span>
      mounted <span class="token operator">=</span> file<span class="token punctuation">.</span>mounted

      <span class="token comment"># return if no additional parameters have been provided</span>
      <span class="token keyword">return</span> file<span class="token punctuation">.</span>mounted<span class="token operator">?</span> <span class="token keyword">if</span> expected_options<span class="token punctuation">.</span><span class="token keyword">nil</span><span class="token operator">?</span>

      <span class="token comment"># deprecation warning, this functionality will be removed in future version</span>
      Inspec<span class="token punctuation">.</span>deprecate<span class="token punctuation">(</span><span class="token symbol">:file_resource_be_mounted_matchers</span><span class="token punctuation">,</span> <span class="token string-literal"><span class="token string">"The file resource `be_mounted.with` and `be_mounted.only_with` matchers are deprecated. Please use the `mount` resource instead"</span></span><span class="token punctuation">)</span>

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
      <span class="token punctuation">(</span>mode <span class="token operator">&amp;</span> <span class="token number">04000</span><span class="token punctuation">)</span> <span class="token operator">></span> <span class="token number">0</span>
    <span class="token keyword">end</span>

    <span class="token keyword">alias</span> setuid<span class="token operator">?</span> suid

    <span class="token keyword">def</span> <span class="token method-definition"><span class="token function">sgid</span></span>
      <span class="token punctuation">(</span>mode <span class="token operator">&amp;</span> <span class="token number">02000</span><span class="token punctuation">)</span> <span class="token operator">></span> <span class="token number">0</span>
    <span class="token keyword">end</span>

    <span class="token keyword">alias</span> setgid<span class="token operator">?</span> sgid

    <span class="token keyword">def</span> <span class="token method-definition"><span class="token function">sticky</span></span>
      <span class="token punctuation">(</span>mode <span class="token operator">&amp;</span> <span class="token number">01000</span><span class="token punctuation">)</span> <span class="token operator">></span> <span class="token number">0</span>
    <span class="token keyword">end</span>

    <span class="token keyword">alias</span> sticky<span class="token operator">?</span> sticky

    <span class="token keyword">def</span> <span class="token method-definition"><span class="token function">more_permissive_than</span></span><span class="token operator">?</span><span class="token punctuation">(</span>max_mode <span class="token operator">=</span> <span class="token keyword">nil</span><span class="token punctuation">)</span>
      <span class="token keyword">raise</span> Inspec<span class="token double-colon punctuation">::</span>Exceptions<span class="token double-colon punctuation">::</span>ResourceFailed<span class="token punctuation">,</span> <span class="token string-literal"><span class="token string">"The file"</span></span> <span class="token operator">+</span> file<span class="token punctuation">.</span>path <span class="token operator">+</span> <span class="token string-literal"><span class="token string">"doesn't seem to exist"</span></span> <span class="token keyword">unless</span> exist<span class="token operator">?</span>
      <span class="token keyword">raise</span> ArgumentError<span class="token punctuation">,</span> <span class="token string-literal"><span class="token string">"You must proivde a value for the `maximum allowable permission` for the file."</span></span> <span class="token keyword">if</span> max_mode<span class="token punctuation">.</span><span class="token keyword">nil</span><span class="token operator">?</span>
      <span class="token keyword">raise</span> ArgumentError<span class="token punctuation">,</span> <span class="token string-literal"><span class="token string">"You must proivde the `maximum permission target` as a `String`, you provided: "</span></span> <span class="token operator">+</span> max_mode<span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">.</span>to_s <span class="token keyword">unless</span> max_mode<span class="token punctuation">.</span>is_a<span class="token operator">?</span><span class="token punctuation">(</span><span class="token builtin">String</span><span class="token punctuation">)</span>
      <span class="token keyword">raise</span> ArgumentError<span class="token punctuation">,</span> <span class="token string-literal"><span class="token string">"The value of the `maximum permission target` should be a valid file mode in 4-ditgit octal format: for example, `0644` or `0777`"</span></span> <span class="token keyword">unless</span> <span class="token regex-literal"><span class="token regex">/(0)?([0-7])([0-7])([0-7])/</span></span><span class="token punctuation">.</span>match<span class="token operator">?</span><span class="token punctuation">(</span>max_mode<span class="token punctuation">)</span>

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
      <span class="token string-literal"><span class="token string">"File </span><span class="token interpolation"><span class="token delimiter punctuation">#{</span><span class="token content">source_path</span><span class="token delimiter punctuation">}</span></span><span class="token string">"</span></span>
    <span class="token keyword">end</span>

    <span class="token keyword">private</span>

    <span class="token keyword">def</span> <span class="token method-definition"><span class="token function">file_permission_granted</span></span><span class="token operator">?</span><span class="token punctuation">(</span>access_type<span class="token punctuation">,</span> by_usergroup<span class="token punctuation">,</span> by_specific_user<span class="token punctuation">)</span>
      <span class="token keyword">raise</span> <span class="token string-literal"><span class="token string">"`file_permission_granted?` is not supported on your OS"</span></span> <span class="token keyword">if</span> <span class="token variable">@perms_provider</span><span class="token punctuation">.</span><span class="token keyword">nil</span><span class="token operator">?</span>

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
      <span class="token keyword">when</span> <span class="token string-literal"><span class="token string">"read"</span></span>
        <span class="token string-literal"><span class="token string">"r"</span></span>
      <span class="token keyword">when</span> <span class="token string-literal"><span class="token string">"write"</span></span>
        <span class="token string-literal"><span class="token string">"w"</span></span>
      <span class="token keyword">when</span> <span class="token string-literal"><span class="token string">"execute"</span></span>
        <span class="token string-literal"><span class="token string">"x"</span></span>
      <span class="token keyword">else</span>
        <span class="token keyword">raise</span> <span class="token string-literal"><span class="token string">"Invalid access_type provided"</span></span>
      <span class="token keyword">end</span>
    <span class="token keyword">end</span>

    <span class="token keyword">def</span> <span class="token method-definition"><span class="token function">usergroup_for</span></span><span class="token punctuation">(</span>usergroup<span class="token punctuation">,</span> specific_user<span class="token punctuation">)</span>
      <span class="token keyword">if</span> usergroup <span class="token operator">==</span> <span class="token string-literal"><span class="token string">"others"</span></span>
        <span class="token string-literal"><span class="token string">"other"</span></span>
      <span class="token keyword">elsif</span> <span class="token punctuation">(</span>usergroup<span class="token punctuation">.</span><span class="token keyword">nil</span><span class="token operator">?</span> <span class="token operator">||</span> usergroup<span class="token punctuation">.</span>empty<span class="token operator">?</span><span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> specific_user<span class="token punctuation">.</span><span class="token keyword">nil</span><span class="token operator">?</span>
        <span class="token string-literal"><span class="token string">"all"</span></span>
      <span class="token keyword">else</span>
        usergroup
      <span class="token keyword">end</span>
    <span class="token keyword">end</span>

    <span class="token keyword">def</span> <span class="token method-definition"><span class="token function">check_file_permission_by_mask</span></span><span class="token punctuation">(</span>file<span class="token punctuation">,</span> access_type<span class="token punctuation">,</span> usergroup<span class="token punctuation">,</span> specific_user<span class="token punctuation">)</span>
      usergroup <span class="token operator">=</span> usergroup_for<span class="token punctuation">(</span>usergroup<span class="token punctuation">,</span> specific_user<span class="token punctuation">)</span>
      flag <span class="token operator">=</span> permission_flag<span class="token punctuation">(</span>access_type<span class="token punctuation">)</span>
      mask <span class="token operator">=</span> file<span class="token punctuation">.</span>unix_mode_mask<span class="token punctuation">(</span>usergroup<span class="token punctuation">,</span> flag<span class="token punctuation">)</span>
      <span class="token keyword">raise</span> <span class="token string-literal"><span class="token string">"Invalid usergroup/owner provided"</span></span> <span class="token keyword">if</span> mask<span class="token punctuation">.</span><span class="token keyword">nil</span><span class="token operator">?</span>

      <span class="token punctuation">(</span>file<span class="token punctuation">.</span>mode <span class="token operator">&amp;</span> mask<span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token number">0</span>
    <span class="token keyword">end</span>

    <span class="token keyword">def</span> <span class="token method-definition"><span class="token function">check_file_permission_by_user</span></span><span class="token punctuation">(</span>access_type<span class="token punctuation">,</span> user<span class="token punctuation">,</span> path<span class="token punctuation">)</span>
      flag <span class="token operator">=</span> permission_flag<span class="token punctuation">(</span>access_type<span class="token punctuation">)</span>
      <span class="token keyword">if</span> inspec<span class="token punctuation">.</span>os<span class="token punctuation">.</span>linux<span class="token operator">?</span>
        perm_cmd <span class="token operator">=</span> <span class="token string-literal"><span class="token string">"su -s /bin/sh -c \"test -</span><span class="token interpolation"><span class="token delimiter punctuation">#{</span><span class="token content">flag</span><span class="token delimiter punctuation">}</span></span><span class="token string"> </span><span class="token interpolation"><span class="token delimiter punctuation">#{</span><span class="token content">path</span><span class="token delimiter punctuation">}</span></span><span class="token string">\" </span><span class="token interpolation"><span class="token delimiter punctuation">#{</span><span class="token content">user</span><span class="token delimiter punctuation">}</span></span><span class="token string">"</span></span>
      <span class="token keyword">elsif</span> inspec<span class="token punctuation">.</span>os<span class="token punctuation">.</span>bsd<span class="token operator">?</span> <span class="token operator">||</span> inspec<span class="token punctuation">.</span>os<span class="token punctuation">.</span>solaris<span class="token operator">?</span>
        perm_cmd <span class="token operator">=</span> <span class="token string-literal"><span class="token string">"sudo -u </span><span class="token interpolation"><span class="token delimiter punctuation">#{</span><span class="token content">user</span><span class="token delimiter punctuation">}</span></span><span class="token string"> test -</span><span class="token interpolation"><span class="token delimiter punctuation">#{</span><span class="token content">flag</span><span class="token delimiter punctuation">}</span></span><span class="token string"> </span><span class="token interpolation"><span class="token delimiter punctuation">#{</span><span class="token content">path</span><span class="token delimiter punctuation">}</span></span><span class="token string">"</span></span>
      <span class="token keyword">elsif</span> inspec<span class="token punctuation">.</span>os<span class="token punctuation">.</span>aix<span class="token operator">?</span>
        perm_cmd <span class="token operator">=</span> <span class="token string-literal"><span class="token string">"su </span><span class="token interpolation"><span class="token delimiter punctuation">#{</span><span class="token content">user</span><span class="token delimiter punctuation">}</span></span><span class="token string"> -c test -</span><span class="token interpolation"><span class="token delimiter punctuation">#{</span><span class="token content">flag</span><span class="token delimiter punctuation">}</span></span><span class="token string"> </span><span class="token interpolation"><span class="token delimiter punctuation">#{</span><span class="token content">path</span><span class="token delimiter punctuation">}</span></span><span class="token string">"</span></span>
      <span class="token keyword">elsif</span> inspec<span class="token punctuation">.</span>os<span class="token punctuation">.</span>hpux<span class="token operator">?</span>
        perm_cmd <span class="token operator">=</span> <span class="token string-literal"><span class="token string">"su </span><span class="token interpolation"><span class="token delimiter punctuation">#{</span><span class="token content">user</span><span class="token delimiter punctuation">}</span></span><span class="token string"> -c \"test -</span><span class="token interpolation"><span class="token delimiter punctuation">#{</span><span class="token content">flag</span><span class="token delimiter punctuation">}</span></span><span class="token string"> </span><span class="token interpolation"><span class="token delimiter punctuation">#{</span><span class="token content">path</span><span class="token delimiter punctuation">}</span></span><span class="token string">\""</span></span>
      <span class="token keyword">else</span>
        <span class="token keyword">return</span> skip_resource <span class="token string-literal"><span class="token string">"The `file` resource does not support `by_user` on your OS."</span></span>
      <span class="token keyword">end</span>

      cmd <span class="token operator">=</span> inspec<span class="token punctuation">.</span>command<span class="token punctuation">(</span>perm_cmd<span class="token punctuation">)</span>
      cmd<span class="token punctuation">.</span>exit_status <span class="token operator">==</span> <span class="token number">0</span> <span class="token operator">?</span> <span class="token boolean">true</span> <span class="token operator">:</span> <span class="token boolean">false</span>
    <span class="token keyword">end</span>
  <span class="token keyword">end</span>

  <span class="token keyword">class</span> <span class="token class-name">WindowsFilePermissions</span> <span class="token operator">&lt;</span> FilePermissions
    <span class="token keyword">def</span> <span class="token method-definition"><span class="token function">check_file_permission_by_mask</span></span><span class="token punctuation">(</span>_file<span class="token punctuation">,</span> _access_type<span class="token punctuation">,</span> _usergroup<span class="token punctuation">,</span> _specific_user<span class="token punctuation">)</span>
      <span class="token keyword">raise</span> <span class="token string-literal"><span class="token string">"`check_file_permission_by_mask` is not supported on Windows"</span></span>
    <span class="token keyword">end</span>

    <span class="token keyword">def</span> <span class="token method-definition"><span class="token function">more_permissive_than</span></span><span class="token operator">?</span><span class="token punctuation">(</span><span class="token operator">*</span><span class="token punctuation">)</span>
      <span class="token keyword">raise</span> Inspec<span class="token double-colon punctuation">::</span>Exceptions<span class="token double-colon punctuation">::</span>ResourceSkipped<span class="token punctuation">,</span> <span class="token string-literal"><span class="token string">"The `more_permissive_than?` matcher is not supported on your OS yet."</span></span>
    <span class="token keyword">end</span>

    <span class="token keyword">def</span> <span class="token method-definition"><span class="token function">check_file_permission_by_user</span></span><span class="token punctuation">(</span>access_type<span class="token punctuation">,</span> user<span class="token punctuation">,</span> path<span class="token punctuation">)</span>
      access_rule <span class="token operator">=</span> translate_perm_names<span class="token punctuation">(</span>access_type<span class="token punctuation">)</span>
      access_rule <span class="token operator">=</span> convert_to_powershell_array<span class="token punctuation">(</span>access_rule<span class="token punctuation">)</span>

      cmd <span class="token operator">=</span> inspec<span class="token punctuation">.</span>command<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">"@(@((Get-Acl '</span><span class="token interpolation"><span class="token delimiter punctuation">#{</span><span class="token content">path</span><span class="token delimiter punctuation">}</span></span><span class="token string">').access | Where-Object {$_.AccessControlType -eq 'Allow' -and $_.IdentityReference -eq '</span><span class="token interpolation"><span class="token delimiter punctuation">#{</span><span class="token content">user</span><span class="token delimiter punctuation">}</span></span><span class="token string">' }) | Where-Object {($_.FileSystemRights.ToString().Split(',') | % {$_.trim()} | ? {</span><span class="token interpolation"><span class="token delimiter punctuation">#{</span><span class="token content">access_rule</span><span class="token delimiter punctuation">}</span></span><span class="token string"> -contains $_}) -ne $null}) | measure | % { $_.Count }"</span></span><span class="token punctuation">)</span>
      cmd<span class="token punctuation">.</span>stdout<span class="token punctuation">.</span>chomp <span class="token operator">==</span> <span class="token string-literal"><span class="token string">"0"</span></span> <span class="token operator">?</span> <span class="token boolean">false</span> <span class="token operator">:</span> <span class="token boolean">true</span>
    <span class="token keyword">end</span>

    <span class="token keyword">private</span>

    <span class="token keyword">def</span> <span class="token method-definition"><span class="token function">convert_to_powershell_array</span></span><span class="token punctuation">(</span>arr<span class="token punctuation">)</span>
      <span class="token keyword">if</span> arr<span class="token punctuation">.</span>empty<span class="token operator">?</span>
        <span class="token string-literal"><span class="token string">"@()"</span></span>
      <span class="token keyword">else</span>
        <span class="token string-literal"><span class="token string">%{@('</span><span class="token interpolation"><span class="token delimiter punctuation">#{</span><span class="token content">arr<span class="token punctuation">.</span>join<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">"', '"</span></span><span class="token punctuation">)</span></span><span class="token delimiter punctuation">}</span></span><span class="token string">')}</span></span>
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
      <span class="token keyword">raise</span> <span class="token string-literal"><span class="token string">"Invalid access_type provided"</span></span> <span class="token keyword">unless</span> names

      names
    <span class="token keyword">end</span>

    <span class="token keyword">def</span> <span class="token method-definition"><span class="token function">translate_common_perms</span></span><span class="token punctuation">(</span>access_type<span class="token punctuation">)</span>
      <span class="token keyword">case</span> access_type
      <span class="token keyword">when</span> <span class="token string-literal"><span class="token string">"full-control"</span></span>
        <span class="token string-literal"><span class="token string">%w{FullControl}</span></span>
      <span class="token keyword">when</span> <span class="token string-literal"><span class="token string">"modify"</span></span>
        translate_perm_names<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">"full-control"</span></span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string-literal"><span class="token string">%w{Modify}</span></span>
      <span class="token keyword">when</span> <span class="token string-literal"><span class="token string">"read"</span></span>
        translate_perm_names<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">"modify"</span></span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string-literal"><span class="token string">%w{ReadAndExecute Read}</span></span>
      <span class="token keyword">when</span> <span class="token string-literal"><span class="token string">"write"</span></span>
        translate_perm_names<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">"modify"</span></span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string-literal"><span class="token string">%w{Write}</span></span>
      <span class="token keyword">when</span> <span class="token string-literal"><span class="token string">"execute"</span></span>
        translate_perm_names<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">"modify"</span></span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string-literal"><span class="token string">%w{ReadAndExecute ExecuteFile Traverse}</span></span>
      <span class="token keyword">when</span> <span class="token string-literal"><span class="token string">"delete"</span></span>
        translate_perm_names<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">"modify"</span></span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string-literal"><span class="token string">%w{Delete}</span></span>
      <span class="token keyword">end</span>
    <span class="token keyword">end</span>

    <span class="token keyword">def</span> <span class="token method-definition"><span class="token function">translate_uncommon_perms</span></span><span class="token punctuation">(</span>access_type<span class="token punctuation">)</span>
      <span class="token keyword">case</span> access_type
      <span class="token keyword">when</span> <span class="token string-literal"><span class="token string">"delete-subdirectories-and-files"</span></span>
        translate_perm_names<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">"full-control"</span></span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string-literal"><span class="token string">%w{DeleteSubdirectoriesAndFiles}</span></span>
      <span class="token keyword">when</span> <span class="token string-literal"><span class="token string">"change-permissions"</span></span>
        translate_perm_names<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">"full-control"</span></span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string-literal"><span class="token string">%w{ChangePermissions}</span></span>
      <span class="token keyword">when</span> <span class="token string-literal"><span class="token string">"take-ownership"</span></span>
        translate_perm_names<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">"full-control"</span></span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string-literal"><span class="token string">%w{TakeOwnership}</span></span>
      <span class="token keyword">when</span> <span class="token string-literal"><span class="token string">"synchronize"</span></span>
        translate_perm_names<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">"full-control"</span></span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string-literal"><span class="token string">%w{Synchronize}</span></span>
      <span class="token keyword">end</span>
    <span class="token keyword">end</span>

    <span class="token keyword">def</span> <span class="token method-definition"><span class="token function">translate_granular_perms</span></span><span class="token punctuation">(</span>access_type<span class="token punctuation">)</span>
      <span class="token keyword">case</span> access_type
      <span class="token keyword">when</span> <span class="token string-literal"><span class="token string">"write-data"</span></span><span class="token punctuation">,</span> <span class="token string-literal"><span class="token string">"create-files"</span></span>
        translate_perm_names<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">"write"</span></span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string-literal"><span class="token string">%w{WriteData CreateFiles}</span></span>
      <span class="token keyword">when</span> <span class="token string-literal"><span class="token string">"append-data"</span></span><span class="token punctuation">,</span> <span class="token string-literal"><span class="token string">"create-directories"</span></span>
        translate_perm_names<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">"write"</span></span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string-literal"><span class="token string">%w{CreateDirectories AppendData}</span></span>
      <span class="token keyword">when</span> <span class="token string-literal"><span class="token string">"write-extended-attributes"</span></span>
        translate_perm_names<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">"write"</span></span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string-literal"><span class="token string">%w{WriteExtendedAttributes}</span></span>
      <span class="token keyword">when</span> <span class="token string-literal"><span class="token string">"write-attributes"</span></span>
        translate_perm_names<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">"write"</span></span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string-literal"><span class="token string">%w{WriteAttributes}</span></span>
      <span class="token keyword">when</span> <span class="token string-literal"><span class="token string">"read-data"</span></span><span class="token punctuation">,</span> <span class="token string-literal"><span class="token string">"list-directory"</span></span>
        translate_perm_names<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">"read"</span></span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string-literal"><span class="token string">%w{ReadData ListDirectory}</span></span>
      <span class="token keyword">when</span> <span class="token string-literal"><span class="token string">"read-attributes"</span></span>
        translate_perm_names<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">"read"</span></span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string-literal"><span class="token string">%w{ReadAttributes}</span></span>
      <span class="token keyword">when</span> <span class="token string-literal"><span class="token string">"read-extended-attributes"</span></span>
        translate_perm_names<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">"read"</span></span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string-literal"><span class="token string">%w{ReadExtendedAttributes}</span></span>
      <span class="token keyword">when</span> <span class="token string-literal"><span class="token string">"read-permissions"</span></span>
        translate_perm_names<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">"read"</span></span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string-literal"><span class="token string">%w{ReadPermissions}</span></span>
      <span class="token keyword">end</span>
    <span class="token keyword">end</span>
  <span class="token keyword">end</span>
<span class="token keyword">end</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_11-2-directory" tabindex="-1"><a class="header-anchor" href="#_11-2-directory" aria-hidden="true">#</a> 11.2. Directory</h3>
<div class="language-ruby line-numbers-mode" data-ext="rb"><pre v-pre class="language-ruby"><code><span class="token keyword">require</span> <span class="token string-literal"><span class="token string">"inspec/resources/file"</span></span>

<span class="token keyword">module</span> <span class="token class-name">Inspec</span><span class="token double-colon punctuation">::</span>Resources
  <span class="token keyword">class</span> <span class="token class-name">Directory</span> <span class="token operator">&lt;</span> FileResource
    name <span class="token string-literal"><span class="token string">"directory"</span></span>
    supports platform<span class="token operator">:</span> <span class="token string-literal"><span class="token string">"unix"</span></span>
    supports platform<span class="token operator">:</span> <span class="token string-literal"><span class="token string">"windows"</span></span>
    desc <span class="token string-literal"><span class="token string">"Use the directory InSpec audit resource to test if the file type is a directory. This is equivalent to using the file InSpec audit resource and the be_directory matcher, but provides a simpler and more direct way to test directories. All of the matchers available to file may be used with directory."</span></span>
    example <span class="token string-literal heredoc-string"><span class="token delimiter"><span class="token punctuation">&lt;&lt;~</span><span class="token symbol">EXAMPLE</span></span><span class="token string">
      describe directory('path') do
        it { should be_directory }
      end
    </span><span class="token delimiter"><span class="token symbol">EXAMPLE</span></span></span>

    <span class="token keyword">def</span> <span class="token method-definition"><span class="token function">exist</span></span><span class="token operator">?</span>
      file<span class="token punctuation">.</span>exist<span class="token operator">?</span> <span class="token operator">&amp;&amp;</span> file<span class="token punctuation">.</span>directory<span class="token operator">?</span>
    <span class="token keyword">end</span>

    <span class="token keyword">def</span> <span class="token method-definition"><span class="token function">to_s</span></span>
      <span class="token string-literal"><span class="token string">"Directory </span><span class="token interpolation"><span class="token delimiter punctuation">#{</span><span class="token content">source_path</span><span class="token delimiter punctuation">}</span></span><span class="token string">"</span></span>
    <span class="token keyword">end</span>
  <span class="token keyword">end</span>
<span class="token keyword">end</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_11-3-etc-hosts" tabindex="-1"><a class="header-anchor" href="#_11-3-etc-hosts" aria-hidden="true">#</a> 11.3. etc_hosts</h3>
<div class="language-ruby line-numbers-mode" data-ext="rb"><pre v-pre class="language-ruby"><code><span class="token keyword">require</span> <span class="token string-literal"><span class="token string">"inspec/utils/parser"</span></span>
<span class="token keyword">require</span> <span class="token string-literal"><span class="token string">"inspec/utils/file_reader"</span></span>

<span class="token keyword">class</span> <span class="token class-name">EtcHosts</span> <span class="token operator">&lt;</span> Inspec<span class="token punctuation">.</span>resource<span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
  name <span class="token string-literal"><span class="token string">"etc_hosts"</span></span>
  supports platform<span class="token operator">:</span> <span class="token string-literal"><span class="token string">"linux"</span></span>
  supports platform<span class="token operator">:</span> <span class="token string-literal"><span class="token string">"bsd"</span></span>
  supports platform<span class="token operator">:</span> <span class="token string-literal"><span class="token string">"windows"</span></span>
  desc 'Use the etc_hosts InSpec audit resource to find an
    ip_address <span class="token keyword">and</span> its associated hosts'
  example <span class="token string-literal heredoc-string"><span class="token delimiter"><span class="token punctuation">&lt;&lt;~</span><span class="token symbol">EXAMPLE</span></span><span class="token string">
    describe etc_hosts.where { ip_address == '127.0.0.1' } do
      its('ip_address') { should cmp '127.0.0.1' }
      its('primary_name') { should cmp 'localhost' }
      its('all_host_names') { should eq [['localhost', 'localhost.localdomain', 'localhost4', 'localhost4.localdomain4']] }
    end
  </span><span class="token delimiter"><span class="token symbol">EXAMPLE</span></span></span>

  attr_reader <span class="token symbol">:params</span>

  <span class="token keyword">include</span> CommentParser
  <span class="token keyword">include</span> FileReader

  <span class="token constant">DEFAULT_UNIX_PATH</span>    <span class="token operator">=</span> <span class="token string-literal"><span class="token string">"/etc/hosts"</span></span><span class="token punctuation">.</span>freeze
  <span class="token constant">DEFAULT_WINDOWS_PATH</span> <span class="token operator">=</span> <span class="token string-literal"><span class="token string">'C:\windows\system32\drivers\etc\hosts'</span></span><span class="token punctuation">.</span>freeze

  <span class="token keyword">def</span> <span class="token method-definition"><span class="token function">initialize</span></span><span class="token punctuation">(</span>hosts_path <span class="token operator">=</span> <span class="token keyword">nil</span><span class="token punctuation">)</span>
    content <span class="token operator">=</span> read_file_content<span class="token punctuation">(</span>hosts_path <span class="token operator">||</span> default_hosts_file_path<span class="token punctuation">)</span>

    <span class="token variable">@params</span> <span class="token operator">=</span> parse_conf<span class="token punctuation">(</span>content<span class="token punctuation">.</span>lines<span class="token punctuation">)</span>
  <span class="token keyword">end</span>

  FilterTable<span class="token punctuation">.</span>create
    <span class="token punctuation">.</span>register_column<span class="token punctuation">(</span><span class="token symbol">:ip_address</span><span class="token punctuation">,</span>     <span class="token symbol">field</span><span class="token operator">:</span> <span class="token string-literal"><span class="token string">"ip_address"</span></span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span>register_column<span class="token punctuation">(</span><span class="token symbol">:primary_name</span><span class="token punctuation">,</span>   <span class="token symbol">field</span><span class="token operator">:</span> <span class="token string-literal"><span class="token string">"primary_name"</span></span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span>register_column<span class="token punctuation">(</span><span class="token symbol">:all_host_names</span><span class="token punctuation">,</span> <span class="token symbol">field</span><span class="token operator">:</span> <span class="token string-literal"><span class="token string">"all_host_names"</span></span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span>install_filter_methods_on_resource<span class="token punctuation">(</span><span class="token keyword">self</span><span class="token punctuation">,</span> <span class="token symbol">:params</span><span class="token punctuation">)</span>

  <span class="token keyword">private</span>

  <span class="token keyword">def</span> <span class="token method-definition"><span class="token function">default_hosts_file_path</span></span>
    inspec<span class="token punctuation">.</span>os<span class="token punctuation">.</span>windows<span class="token operator">?</span> <span class="token operator">?</span> <span class="token constant">DEFAULT_WINDOWS_PATH</span> <span class="token operator">:</span> <span class="token constant">DEFAULT_UNIX_PATH</span>
  <span class="token keyword">end</span>

  <span class="token keyword">def</span> <span class="token method-definition"><span class="token function">parse_conf</span></span><span class="token punctuation">(</span>lines<span class="token punctuation">)</span>
    lines<span class="token punctuation">.</span>reject<span class="token punctuation">(</span><span class="token operator">&amp;</span><span class="token symbol">:empty?</span><span class="token punctuation">)</span><span class="token punctuation">.</span>reject<span class="token punctuation">(</span><span class="token operator">&amp;</span>comment<span class="token operator">?</span><span class="token punctuation">)</span><span class="token punctuation">.</span>map<span class="token punctuation">(</span><span class="token operator">&amp;</span>parse_data<span class="token punctuation">)</span><span class="token punctuation">.</span>map<span class="token punctuation">(</span><span class="token operator">&amp;</span>format_data<span class="token punctuation">)</span>
  <span class="token keyword">end</span>

  <span class="token keyword">def</span> <span class="token method-definition"><span class="token function">comment</span></span><span class="token operator">?</span>
    parse_options <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token symbol">comment_char</span><span class="token operator">:</span> <span class="token string-literal"><span class="token string">"#"</span></span><span class="token punctuation">,</span> <span class="token symbol">standalone_comments</span><span class="token operator">:</span> <span class="token boolean">false</span> <span class="token punctuation">}</span>

    <span class="token operator">-</span><span class="token operator">></span><span class="token punctuation">(</span>data<span class="token punctuation">)</span> <span class="token punctuation">{</span> parse_comment_line<span class="token punctuation">(</span>data<span class="token punctuation">,</span> parse_options<span class="token punctuation">)</span><span class="token punctuation">.</span>first<span class="token punctuation">.</span>empty<span class="token operator">?</span> <span class="token punctuation">}</span>
  <span class="token keyword">end</span>

  <span class="token keyword">def</span> <span class="token method-definition"><span class="token function">parse_data</span></span>
    <span class="token operator">-</span><span class="token operator">></span><span class="token punctuation">(</span>data<span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token punctuation">[</span>data<span class="token punctuation">.</span>split<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">,</span> data<span class="token punctuation">.</span>split<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">,</span> data<span class="token punctuation">.</span>split<span class="token punctuation">[</span><span class="token number">1.</span><span class="token punctuation">.</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">]</span> <span class="token punctuation">}</span>
  <span class="token keyword">end</span>

  <span class="token keyword">def</span> <span class="token method-definition"><span class="token function">format_data</span></span>
    <span class="token operator">-</span><span class="token operator">></span><span class="token punctuation">(</span>data<span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token string-literal"><span class="token string">%w{ip_address primary_name all_host_names}</span></span><span class="token punctuation">.</span>zip<span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">.</span>to_h <span class="token punctuation">}</span>
  <span class="token keyword">end</span>
<span class="token keyword">end</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


