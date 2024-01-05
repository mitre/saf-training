<template><div><h2 id="_10-plural-resources" tabindex="-1"><a class="header-anchor" href="#_10-plural-resources" aria-hidden="true">#</a> 10. Plural Resources</h2>
<p>You  might have noticed that many InSpec resources have a &quot;plural&quot; version. For example, <code v-pre>user</code> has a <code v-pre>users</code> counterpart, and <code v-pre>package</code> has <code v-pre>packages</code>.</p>
<p>Plural resources examine platform objects in bulk.<br>
For example,</p>
<ul>
<li>sorting through which packages are installed on a system, or</li>
<li>which virtual machines are on a cloud provider.</li>
<li>all processes running more than an hour, or all VMs on a particular subnet.</li>
</ul>
<p>Plural resources usually include functions to query the set of objects it represents by an attribute, like so:</p>
<div class="language-ruby line-numbers-mode" data-ext="rb"><pre v-pre class="language-ruby"><code>describe users<span class="token punctuation">.</span>where<span class="token punctuation">(</span><span class="token symbol">uid</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">.</span>entries <span class="token keyword">do</span>
  it <span class="token punctuation">{</span> should eq <span class="token punctuation">[</span><span class="token string-literal"><span class="token string">'root'</span></span><span class="token punctuation">]</span> <span class="token punctuation">}</span>
  its<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'uids'</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span> should eq <span class="token punctuation">[</span><span class="token number">1234</span><span class="token punctuation">]</span> <span class="token punctuation">}</span>
  its<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'gids'</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span> should eq <span class="token punctuation">[</span><span class="token number">1234</span><span class="token punctuation">]</span> <span class="token punctuation">}</span>
<span class="token keyword">end</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>This test queries <strong>all</strong> users to confirm that the only one with a uid of zero is the root user.</p>
<p>Plural InSpec resources are created by leveraging Ruby's FilterTable module to capture system data. Let's dig into how FilterTable works so that you can write your own plural resources.</p>
<h3 id="_10-1-using-filtertable-to-write-a-plural-resource" tabindex="-1"><a class="header-anchor" href="#_10-1-using-filtertable-to-write-a-plural-resource" aria-hidden="true">#</a> 10.1. Using FilterTable to write a Plural Resource</h3>
<p>FilterTable is intended to help you author plural resources with <strong>stucture data</strong>. You declare a number of columns of data, attach them to a FilterTable object, and then write methods that the FilterTable can call to populate those columns. You can also define custom matchers that make sense for whatever data you are modeling (to go alongside the standard InSpec matchers like <code v-pre>be_in</code>,<code v-pre>include</code>, and <code v-pre>cmp</code>). You wind up with a queryable structure:</p>
<div class="language-ruby line-numbers-mode" data-ext="rb"><pre v-pre class="language-ruby"><code>
inspec<span class="token operator">></span> etc_hosts<span class="token punctuation">.</span>entries
<span class="token operator">=></span> 
<span class="token punctuation">[</span><span class="token comment">#&lt;struct  ip_address="127.0.0.1", primary_name="localhost", all_host_names=["localhost", "localhost.localdomain", "localhost4", "localhost4.localdomain4"]>,</span>
 <span class="token comment">#&lt;struct  ip_address="::1", primary_name="localhost6", all_host_names=["localhost6", "localhost6.localdomain6"]>,</span>
 <span class="token comment">#&lt;struct  ip_address="127.0.0.1", primary_name="test1.org", all_host_names=["test1.org"]>,</span>
 <span class="token comment">#&lt;struct  ip_address="127.0.0.1", primary_name="test2.org", all_host_names=["test2.org"]>,</span>
 <span class="token comment">#&lt;struct  ip_address="127.0.0.1", primary_name="test3.org", all_host_names=["test3.org"]>,</span>
 <span class="token comment">#&lt;struct  ip_address="127.0.0.1", primary_name="test4.org", all_host_names=["test4.org"]>]</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_10-1-1-may-i-have-multiple-filtertable-installations-on-a-class" tabindex="-1"><a class="header-anchor" href="#_10-1-1-may-i-have-multiple-filtertable-installations-on-a-class" aria-hidden="true">#</a> 10.1.1. May I have multiple FilterTable installations on a class?</h4>
<p>In theory, yes - that would be used to implement different data fetching / caching strategies.  It is a very advanced usage, and no core resources currently do this, as far as we know.</p>
<h3 id="_10-2-filtertable-hands-on" tabindex="-1"><a class="header-anchor" href="#_10-2-filtertable-hands-on" aria-hidden="true">#</a> 10.2. FilterTable Hands-On</h3>
<p>Let's take a look at the structure of a resource that leverages FilterTable. We will write a dummy resource that models a small group of students. Our resource will describe each student's name, grade, and the toys they have. Usually, a resource will include some methods that reach out the system under test to populate the FilterTable with real system data, but for now we're just going to hard-code in some dummy data.</p>
<ul>
<li>Create new profile</li>
</ul>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>inspec init profile filtertable-test
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul>
<li>Place following file as custom resource in <code v-pre>libraries</code> directory as <code v-pre>filter.rb</code>.</li>
</ul>
<div class="hint-container tip">
<p class="hint-container-title">Tips</p>
<p>You can also use <code v-pre>inspec init resource &lt;your-resource-name&gt;</code> to create the template for your resource. When following the prompts, you can choose &quot;plural&quot; to create the template for a plural resource.</p>
</div>
<div class="language-ruby line-numbers-mode" data-ext="rb"><pre v-pre class="language-ruby"><code><span class="token keyword">require</span> <span class="token string-literal"><span class="token string">'inspec/utils/filter'</span></span>

<span class="token keyword">class</span> <span class="token class-name">Filtertable</span> <span class="token operator">&lt;</span> Inspec<span class="token punctuation">.</span>resource<span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>

    name <span class="token string-literal"><span class="token string">"filtertable"</span></span>
    supports platform<span class="token operator">:</span> <span class="token string-literal"><span class="token string">"linux"</span></span>

    filter_table <span class="token operator">=</span> FilterTable<span class="token punctuation">.</span>create

    filter_table<span class="token punctuation">.</span>register_column<span class="token punctuation">(</span><span class="token symbol">:name</span><span class="token punctuation">,</span> <span class="token symbol">field</span><span class="token operator">:</span> <span class="token symbol">:name</span><span class="token punctuation">)</span>
    filter_table<span class="token punctuation">.</span>register_column<span class="token punctuation">(</span><span class="token symbol">:grade</span><span class="token punctuation">,</span> <span class="token symbol">field</span><span class="token operator">:</span> <span class="token symbol">:grade</span><span class="token punctuation">)</span>
    filter_table<span class="token punctuation">.</span>register_column<span class="token punctuation">(</span><span class="token symbol">:toys</span><span class="token punctuation">,</span> <span class="token symbol">field</span><span class="token operator">:</span> <span class="token symbol">:toys</span><span class="token punctuation">)</span>

    filter_table<span class="token punctuation">.</span>register_custom_matcher<span class="token punctuation">(</span><span class="token symbol">:has_bike?</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token operator">|</span>filter_table<span class="token operator">|</span> filter_table<span class="token punctuation">.</span>toys<span class="token punctuation">.</span>flatten<span class="token punctuation">.</span><span class="token keyword">include</span><span class="token operator">?</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'bike'</span></span><span class="token punctuation">)</span> <span class="token punctuation">}</span>
    filter_table<span class="token punctuation">.</span>register_custom_matcher<span class="token punctuation">(</span><span class="token symbol">:has_middle_schooler?</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token operator">|</span>filter_table<span class="token operator">|</span> filter_table<span class="token punctuation">.</span>grade<span class="token punctuation">.</span>uniq<span class="token punctuation">.</span>any<span class="token operator">?</span><span class="token punctuation">{</span> <span class="token operator">|</span>grade<span class="token operator">|</span> grade <span class="token operator">>=</span> <span class="token number">6</span><span class="token punctuation">}</span> <span class="token punctuation">}</span>
    
    filter_table<span class="token punctuation">.</span>register_custom_property<span class="token punctuation">(</span><span class="token symbol">:bike_count</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token operator">|</span>filter_table<span class="token operator">|</span> filter_table<span class="token punctuation">.</span>toys<span class="token punctuation">.</span>flatten<span class="token punctuation">.</span><span class="token keyword">include</span><span class="token operator">?</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'bike'</span></span><span class="token punctuation">)</span><span class="token punctuation">.</span>count <span class="token punctuation">}</span>
    filter_table<span class="token punctuation">.</span>register_custom_property<span class="token punctuation">(</span><span class="token symbol">:middle_schooler_count</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token operator">|</span>filter_table<span class="token operator">|</span> filter_table<span class="token punctuation">.</span>where<span class="token punctuation">{</span> grade <span class="token operator">>=</span> <span class="token number">6</span> <span class="token punctuation">}</span><span class="token punctuation">.</span>count <span class="token punctuation">}</span>

    filter_table<span class="token punctuation">.</span>install_filter_methods_on_resource<span class="token punctuation">(</span><span class="token keyword">self</span><span class="token punctuation">,</span> <span class="token symbol">:fetch_data</span><span class="token punctuation">)</span>

    <span class="token keyword">def</span> <span class="token method-definition"><span class="token function">fetch_data</span></span>
        <span class="token comment"># This method should return an array of hashes - the raw data.  We'll hardcode it here.</span>
        <span class="token punctuation">[</span>
          <span class="token punctuation">{</span> <span class="token symbol">name</span><span class="token operator">:</span> <span class="token string-literal"><span class="token string">"Sarah"</span></span><span class="token punctuation">,</span> <span class="token symbol">grade</span><span class="token operator">:</span> <span class="token number">7</span><span class="token punctuation">,</span> <span class="token symbol">toys</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string-literal"><span class="token string">'car'</span></span><span class="token punctuation">,</span><span class="token string-literal"><span class="token string">'train'</span></span><span class="token punctuation">,</span><span class="token string-literal"><span class="token string">'bike'</span></span><span class="token punctuation">]</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
          <span class="token punctuation">{</span> <span class="token symbol">name</span><span class="token operator">:</span> <span class="token string-literal"><span class="token string">"John"</span></span><span class="token punctuation">,</span>  <span class="token symbol">grade</span><span class="token operator">:</span> <span class="token number">4</span><span class="token punctuation">,</span>  <span class="token symbol">toys</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string-literal"><span class="token string">'top'</span></span><span class="token punctuation">,</span><span class="token string-literal"><span class="token string">'bike'</span></span><span class="token punctuation">]</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
          <span class="token punctuation">{</span> <span class="token symbol">name</span><span class="token operator">:</span> <span class="token string-literal"><span class="token string">"Donny"</span></span><span class="token punctuation">,</span> <span class="token symbol">grade</span><span class="token operator">:</span> <span class="token number">5</span><span class="token punctuation">,</span>  <span class="token symbol">toys</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string-literal"><span class="token string">'train'</span></span><span class="token punctuation">,</span><span class="token string-literal"><span class="token string">'nintento'</span></span><span class="token punctuation">]</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
          <span class="token punctuation">{</span> <span class="token symbol">name</span><span class="token operator">:</span> <span class="token string-literal"><span class="token string">"Susan"</span></span><span class="token punctuation">,</span> <span class="token symbol">grade</span><span class="token operator">:</span> <span class="token number">7</span><span class="token punctuation">,</span> <span class="token symbol">toys</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string-literal"><span class="token string">'car'</span></span><span class="token punctuation">,</span><span class="token string-literal"><span class="token string">'gameboy'</span></span><span class="token punctuation">,</span><span class="token string-literal"><span class="token string">'bike'</span></span><span class="token punctuation">]</span><span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token punctuation">]</span>
    <span class="token keyword">end</span>
<span class="token keyword">end</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Now we've got a nice blob of code in a resource file. Let's load this resource in the InSpec shell and see what we can do with it.</p>
<h4 id="_10-2-1-run-the-inspec-shell-with-a-custom-resource" tabindex="-1"><a class="header-anchor" href="#_10-2-1-run-the-inspec-shell-with-a-custom-resource" aria-hidden="true">#</a> 10.2.1. Run the InSpec shell with a custom resource</h4>
<p>Invoking the InSpec shell with <code v-pre>inspec shell</code> will give you access to all the core InSpec resources by default, but InSpec does not automatically know about your locally defined resources unless you point them out. If you're testing a local resource, use the <code v-pre>--depends</code> flag and pass in the profile directory that your resource lives in.</p>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>inspec shell --depends /path/to/profile/root/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="_10-2-2-fetching-data" tabindex="-1"><a class="header-anchor" href="#_10-2-2-fetching-data" aria-hidden="true">#</a> 10.2.2. Fetching Data</h4>
<p>FilterTables organize their data into columns. Your resource will declare a number of columns using the <code v-pre>register_column</code> method.</p>
<p>Once you declare the columns that you want in your FilterTable (<code v-pre>name</code>, <code v-pre>grade</code>, and <code v-pre>toys</code> in our example), you need to insert some data into them using  the <code v-pre>install_filter_methods_on_resource</code> method. That method takes two args -- <code v-pre>self</code> and a data structure that is an array of hashes. The array of hashes will be matched up to the columns you defined using the hashes' keys. For our example we hard-coded this data structure, which is returned by the <code v-pre>fetch_data</code> method.</p>
<p>As we mentioned earlier, a real InSpec resource will include methods that will populate the resource with real system data. Take a look at the <a href="https://github.com/inspec/inspec/blob/63a5fd26a6925b1570ee80e2953d259b58c3012e/lib/inspec/resources/firewalld.rb" target="_blank" rel="noopener noreferrer">Firewalld resource<ExternalLinkIcon/></a> for an example of a resource that does this -- note the resource is ultimately invoking a shell command (<code v-pre>firewall-ctl</code>) to populate its FilterTable. There are plenty of other InSpec resources using FilterTable that you can find in the source code if you are interested in more examples.</p>
<h4 id="_10-2-3-custom-matcher-examples" tabindex="-1"><a class="header-anchor" href="#_10-2-3-custom-matcher-examples" aria-hidden="true">#</a> 10.2.3. Custom Matcher Examples</h4>
<p>After we define our FilterTable's columns, we can also define custom matchers just like we do in singluar resources using <code v-pre>register_custom_matcher</code>. That function takes a block as an argument that defines a boolean expression that tells InSpec when that matcher should return <code v-pre>true</code>. Note that the matcher's logic can get pretty complicated -- that's why we're shoving all of it into a resource so we can avoid having to write complicated tests.</p>
<ul>
<li><code v-pre>has_bike?</code></li>
</ul>
<div class="language-ruby line-numbers-mode" data-ext="rb"><pre v-pre class="language-ruby"><code>describe filtertable<span class="token punctuation">.</span>where<span class="token punctuation">(</span> <span class="token symbol">name</span><span class="token operator">:</span> <span class="token string-literal"><span class="token string">"Donny"</span></span> <span class="token punctuation">)</span> <span class="token keyword">do</span>
  it <span class="token punctuation">{</span> should have_bike <span class="token punctuation">}</span>
<span class="token keyword">end</span>  

<span class="token symbol">Profile</span><span class="token operator">:</span> inspec<span class="token operator">-</span>shell
<span class="token symbol">Version</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token keyword">not</span> specified<span class="token punctuation">)</span>

  filtertable with name <span class="token operator">==</span> <span class="token string-literal"><span class="token string">"Donny"</span></span>
     ×  should have bike
     expected <span class="token comment">#has_bike? to return true, got false</span>

Test Summary<span class="token operator">:</span> <span class="token number">0</span> successful<span class="token punctuation">,</span> <span class="token number">1</span> failure<span class="token punctuation">,</span> <span class="token number">0</span> skipped
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-ruby line-numbers-mode" data-ext="rb"><pre v-pre class="language-ruby"><code>describe filtertable<span class="token punctuation">.</span>where<span class="token punctuation">(</span> <span class="token symbol">name</span><span class="token operator">:</span> <span class="token string-literal"><span class="token string">"Sarah"</span></span> <span class="token punctuation">)</span> <span class="token keyword">do</span>
  it <span class="token punctuation">{</span> should have_bike <span class="token punctuation">}</span>  
<span class="token keyword">end</span>  

<span class="token symbol">Profile</span><span class="token operator">:</span> inspec<span class="token operator">-</span>shell
<span class="token symbol">Version</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token keyword">not</span> specified<span class="token punctuation">)</span>

  filtertable with name <span class="token operator">==</span> <span class="token string-literal"><span class="token string">"Sarah"</span></span>
     ✔  should have bike

Test Summary<span class="token operator">:</span> <span class="token number">1</span> successful<span class="token punctuation">,</span> <span class="token number">0</span> failures<span class="token punctuation">,</span> <span class="token number">0</span> skipped

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>In the simplest examples, we filter the table down to a single student using <code v-pre>where</code> (more on <code v-pre>where</code> in a minute) and invoke a matcher that checks if that student has a <code v-pre>bike</code> in their list of toys. We can write matchers to have whatever logic we like. For example, while <code v-pre>has_bike</code> checks if <em>all</em> of the students in the table under test have a bike, while <code v-pre>has_middle_schooler</code> checks if <em>any</em> student in the table under test is in the 7th grade or higher.</p>
<ul>
<li><code v-pre>has_middle_schooler?</code></li>
</ul>
<div class="language-ruby line-numbers-mode" data-ext="rb"><pre v-pre class="language-ruby"><code>describe filtertable<span class="token punctuation">.</span>where <span class="token punctuation">{</span> name <span class="token operator">=~</span> <span class="token regex-literal"><span class="token regex">/Sarah|John/</span></span> <span class="token punctuation">}</span> <span class="token keyword">do</span>
  it <span class="token punctuation">{</span> should have_middle_schooler <span class="token punctuation">}</span>
<span class="token keyword">end</span>

<span class="token symbol">Profile</span><span class="token operator">:</span>   inspec<span class="token operator">-</span>shell
<span class="token symbol">Version</span><span class="token operator">:</span>   <span class="token punctuation">(</span><span class="token keyword">not</span> specified<span class="token punctuation">)</span>
Target <span class="token constant">ID</span><span class="token operator">:</span> 

  filtertable with name <span class="token operator">=~</span> <span class="token regex-literal"><span class="token regex">/Sarah|John/</span></span>
     ✔  is expected to have middle schooler

Test Summary<span class="token operator">:</span> <span class="token number">1</span> successful<span class="token punctuation">,</span> <span class="token number">0</span> failures<span class="token punctuation">,</span> <span class="token number">0</span> skipped

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_10-2-4-custom-property" tabindex="-1"><a class="header-anchor" href="#_10-2-4-custom-property" aria-hidden="true">#</a> 10.2.4. Custom Property</h4>
<p>We can also declare custom properties for our resource, using whatever logic we like, just like we did for our custom matchers. Properties can be referred to with <code v-pre>its</code> syntax in an InSpec test.</p>
<ul>
<li><code v-pre>bike_count</code></li>
</ul>
<div class="language-ruby line-numbers-mode" data-ext="rb"><pre v-pre class="language-ruby"><code>describe filtertable <span class="token keyword">do</span>
  its<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'bike_count'</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span> should eq <span class="token number">3</span> <span class="token punctuation">}</span>  
<span class="token keyword">end</span>  

<span class="token symbol">Profile</span><span class="token operator">:</span>   inspec<span class="token operator">-</span>shell
<span class="token symbol">Version</span><span class="token operator">:</span>   <span class="token punctuation">(</span><span class="token keyword">not</span> specified<span class="token punctuation">)</span>
Target <span class="token constant">ID</span><span class="token operator">:</span> 

  filtertable
     ✔  bike_count is expected to eq <span class="token number">3</span>

Test Summary<span class="token operator">:</span> <span class="token number">1</span> successful<span class="token punctuation">,</span> <span class="token number">0</span> failures<span class="token punctuation">,</span> <span class="token number">0</span> skipped
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li><code v-pre>middle_schooler_count</code></li>
</ul>
<div class="language-ruby line-numbers-mode" data-ext="rb"><pre v-pre class="language-ruby"><code>describe filtertable <span class="token keyword">do</span>
   its<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'middle_schooler_count'</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span> should eq <span class="token number">4</span> <span class="token punctuation">}</span>     
<span class="token keyword">end</span>  

<span class="token symbol">Profile</span><span class="token operator">:</span>   inspec<span class="token operator">-</span>shell
<span class="token symbol">Version</span><span class="token operator">:</span>   <span class="token punctuation">(</span><span class="token keyword">not</span> specified<span class="token punctuation">)</span>
Target <span class="token constant">ID</span><span class="token operator">:</span> 

  filtertable
     ×  middle_schooler_count is expected to eq <span class="token number">4</span>
     
     <span class="token symbol">expected</span><span class="token operator">:</span> <span class="token number">4</span>
          <span class="token symbol">got</span><span class="token operator">:</span> <span class="token number">2</span>
     
     <span class="token punctuation">(</span>compared using <span class="token operator">==</span><span class="token punctuation">)</span>


Test Summary<span class="token operator">:</span> <span class="token number">0</span> successful<span class="token punctuation">,</span> <span class="token number">1</span> failure<span class="token punctuation">,</span> <span class="token number">0</span> skipped

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_10-2-5-suggested-activity" tabindex="-1"><a class="header-anchor" href="#_10-2-5-suggested-activity" aria-hidden="true">#</a> 10.2.5. Suggested activity</h4>
<p>To get a better feel for how FilterTable works, we suggest you add a few extra features to the sample given above.</p>
<ul>
<li><strong>Add a field to the data array and reflect the change in filter table</strong></li>
<li><strong>Add a custom matcher</strong></li>
<li><strong>Add a custom property</strong></li>
</ul>
<p>Then write some tests to see how your new matchers and properties work.</p>
<h3 id="_10-3-predefined-methods-for-filtertable" tabindex="-1"><a class="header-anchor" href="#_10-3-predefined-methods-for-filtertable" aria-hidden="true">#</a> 10.3. Predefined Methods for FilterTable</h3>
<p>When you create a new FilterTable, these methods are installed automatically: <code v-pre>where</code>, <code v-pre>entries</code>, <code v-pre>raw_data</code>, <code v-pre>count</code>, and <code v-pre>exist?</code>. Each is very useful both for writing tests in and of themselves and for creating custom matchers and properties inside the resource code.</p>
<h4 id="_10-3-1-the-where-method" tabindex="-1"><a class="header-anchor" href="#_10-3-1-the-where-method" aria-hidden="true">#</a> 10.3.1 The <code v-pre>where</code> method</h4>
<p>You may have already noticed that a bunch of our example tests are using the <code v-pre>where</code> method on the FilterTable object. This method returns a new FilterTable object created from the rows of the original table that match the query provided to <code v-pre>where</code>. If you have experience with relational databases, think of it like the <code v-pre>WHERE</code> clause in a SQL query. This method is extremely flexible; we give some examples below.</p>
<ul>
<li>If you call <code v-pre>where</code> as a method with no block and passing hash params, with keys you know are in the raw data, it will fetch the raw data, then filter row-wise and return the resulting Table.</li>
<li>Multiple criteria are joined with a logical AND.</li>
<li>The filtering is fancy, not just straight equality.</li>
</ul>
<div class="language-ruby line-numbers-mode" data-ext="rb"><pre v-pre class="language-ruby"><code>  describe things<span class="token punctuation">.</span>where<span class="token punctuation">(</span><span class="token symbol">color</span><span class="token operator">:</span> <span class="token string-literal"><span class="token string">'red'</span></span><span class="token punctuation">)</span> <span class="token keyword">do</span>
    its<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'count'</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span> should cmp <span class="token number">2</span> <span class="token punctuation">}</span>
  <span class="token keyword">end</span>

  <span class="token comment"># Regexes</span>
  describe things<span class="token punctuation">.</span>where<span class="token punctuation">(</span><span class="token symbol">color</span><span class="token operator">:</span> <span class="token regex-literal"><span class="token regex">/^re/</span></span><span class="token punctuation">)</span> <span class="token keyword">do</span>
    its<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'count'</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span> should cmp <span class="token number">2</span> <span class="token punctuation">}</span>
  <span class="token keyword">end</span>

  <span class="token comment"># It eventually falls out to '===' comparison</span>
  <span class="token comment"># Here, range membership 1..2</span>
  describe things<span class="token punctuation">.</span>where<span class="token punctuation">(</span><span class="token symbol">thing_id</span><span class="token operator">:</span> <span class="token punctuation">(</span><span class="token number">1.</span><span class="token number">.2</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token keyword">do</span>
    its<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'count'</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span> should cmp <span class="token number">2</span> <span class="token punctuation">}</span>
  <span class="token keyword">end</span>

  <span class="token comment"># irregular rows are supported</span>
  <span class="token comment"># Only one row has the :tackiness key, with value 'very'.</span>
  describe things<span class="token punctuation">.</span>where<span class="token punctuation">(</span><span class="token symbol">tackiness</span><span class="token operator">:</span> <span class="token string-literal"><span class="token string">'very'</span></span><span class="token punctuation">)</span> <span class="token keyword">do</span>
    its<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'count'</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span> should cmp <span class="token number">1</span> <span class="token punctuation">}</span>
  <span class="token keyword">end</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="_10-3-1-1-where-method-with-blocks" tabindex="-1"><a class="header-anchor" href="#_10-3-1-1-where-method-with-blocks" aria-hidden="true">#</a> 10.3.1.1. <code v-pre>where</code> method with blocks</h5>
<p>You can also call the <code v-pre>where</code> method with a block. The block is executed row-wise. If it returns truthy, the row is included in the results. Each field declared with the <code v-pre>register_custom_property</code> configuration method is available as a data accessor.</p>
<div class="language-ruby line-numbers-mode" data-ext="rb"><pre v-pre class="language-ruby"><code>
  <span class="token comment"># You can have any logic you want in the block</span>
  describe things<span class="token punctuation">.</span>where <span class="token punctuation">{</span> <span class="token boolean">true</span> <span class="token punctuation">}</span> <span class="token keyword">do</span>
    its<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'count'</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span> should cmp <span class="token number">3</span> <span class="token punctuation">}</span>
  <span class="token keyword">end</span>

  <span class="token comment"># You can access any fields you declared using `register_column`</span>
  describe things<span class="token punctuation">.</span>where <span class="token punctuation">{</span> thing_id <span class="token operator">></span> <span class="token number">2</span> <span class="token punctuation">}</span> <span class="token keyword">do</span>
    its<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'count'</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span> should cmp <span class="token number">1</span> <span class="token punctuation">}</span>
  <span class="token keyword">end</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h5 id="_10-3-1-2-chaining-where-calls-and-tables-without-re-fetching-raw-data" tabindex="-1"><a class="header-anchor" href="#_10-3-1-2-chaining-where-calls-and-tables-without-re-fetching-raw-data" aria-hidden="true">#</a> 10.3.1.2. Chaining <code v-pre>where</code> calls and Tables without re-fetching raw data</h5>
<p>The first time <code v-pre>where</code> is called, the data fetcher method is called.  <code v-pre>where</code> performs filtration on the raw data table.  It then constructs a new <code v-pre>FilterTable::Table</code>, directly passing in the filtered raw data; this is then the return value from <code v-pre>where</code>.</p>
<div class="language-ruby line-numbers-mode" data-ext="rb"><pre v-pre class="language-ruby"><code>  <span class="token comment"># This only calls fetch_data once</span>
  describe things<span class="token punctuation">.</span>where<span class="token punctuation">(</span><span class="token symbol">color</span><span class="token operator">:</span> <span class="token symbol">:red</span><span class="token punctuation">)</span><span class="token punctuation">.</span>where <span class="token punctuation">{</span> thing_id <span class="token operator">></span> <span class="token number">2</span> <span class="token punctuation">}</span> <span class="token keyword">do</span>
    its<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'count'</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span> should cmp <span class="token number">1</span> <span class="token punctuation">}</span>
  <span class="token keyword">end</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Some other methods return a Table object, and they may be chained without a re-fetch as well.</p>
<h4 id="_10-3-2-the-entries-method" tabindex="-1"><a class="header-anchor" href="#_10-3-2-the-entries-method" aria-hidden="true">#</a> 10.3.2. The <code v-pre>entries</code> method</h4>
<p>The other <code v-pre>register_filter_method</code> call enables a pre-defined method, <code v-pre>entries</code>.  <code v-pre>entries</code> is much simpler than <code v-pre>where</code> - in fact, its behavior is unrelated.  It returns an encapsulated version of the raw data - a plain array, containing Structs as row-entries.  Each struct has an attribute for each time you called <code v-pre>register_column</code>.</p>
<p>Importantly, note that the return value of <code v-pre>entries</code> is not the resource, nor the Table - in other words, you cannot chain it. However, you can call <code v-pre>entries</code> on any Table.</p>
<p>If you call <code v-pre>entries</code> without chaining it after <code v-pre>where</code>, calling entries will trigger the call to the data fetching method.</p>
<div class="language-ruby line-numbers-mode" data-ext="rb"><pre v-pre class="language-ruby"><code>
  <span class="token comment"># Access the entries array</span>
  describe things<span class="token punctuation">.</span>entries <span class="token keyword">do</span>
    <span class="token comment"># This is Array#count, not the resource's `count` method</span>
    its<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'count'</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span> should cmp <span class="token number">3</span><span class="token punctuation">}</span>
  <span class="token keyword">end</span>

  <span class="token comment"># Access the entries array after chaining off of where</span>
  describe things<span class="token punctuation">.</span>where<span class="token punctuation">(</span><span class="token symbol">color</span><span class="token operator">:</span> <span class="token symbol">:red</span><span class="token punctuation">)</span><span class="token punctuation">.</span>entries <span class="token keyword">do</span>
    <span class="token comment"># This is Array#count, not the resource's or table's `count` method</span>
    its<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'count'</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span> should cmp <span class="token number">2</span><span class="token punctuation">}</span>
  <span class="token keyword">end</span>

  <span class="token comment"># You can access the struct elements as a method, as a hash keyed on symbol, or as a hash keyed on string</span>
  describe things<span class="token punctuation">.</span>entries<span class="token punctuation">.</span>first<span class="token punctuation">.</span>color <span class="token keyword">do</span>
    it <span class="token punctuation">{</span> should cmp <span class="token symbol">:red</span> <span class="token punctuation">}</span>
  <span class="token keyword">end</span>
  describe things<span class="token punctuation">.</span>entries<span class="token punctuation">.</span>first<span class="token punctuation">[</span><span class="token symbol">:color</span><span class="token punctuation">]</span> <span class="token keyword">do</span>
    it <span class="token punctuation">{</span> should cmp <span class="token symbol">:red</span> <span class="token punctuation">}</span>
  <span class="token keyword">end</span>
  describe things<span class="token punctuation">.</span>entries<span class="token punctuation">.</span>first<span class="token punctuation">[</span><span class="token string-literal"><span class="token string">'color'</span></span><span class="token punctuation">]</span> <span class="token keyword">do</span>
    it <span class="token punctuation">{</span> should cmp <span class="token symbol">:red</span> <span class="token punctuation">}</span>
  <span class="token keyword">end</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_10-3-3-the-exist-matcher" tabindex="-1"><a class="header-anchor" href="#_10-3-3-the-exist-matcher" aria-hidden="true">#</a> 10.3.3. The <code v-pre>exist?</code> matcher</h4>
<p>This <code v-pre>register_custom_matcher</code> call:</p>
<div class="language-ruby line-numbers-mode" data-ext="rb"><pre v-pre class="language-ruby"><code>filter_table_config<span class="token punctuation">.</span>register_custom_matcher<span class="token punctuation">(</span><span class="token symbol">:exist?</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token operator">|</span>filter_table<span class="token operator">|</span> <span class="token operator">!</span>filter_table<span class="token punctuation">.</span>entries<span class="token punctuation">.</span>empty<span class="token operator">?</span> <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>causes a new method to be defined on both the resource class and the Table class.  The body of the method is taken from the block that is provided.  When the method it called, it will receive the <code v-pre>FilterTable::Table</code> instance as its first parameter.  (It may also accept a second param, but that doesn't make sense for this method - see thing_ids).</p>
<p>As when you are implementing matchers on a singular resource, the only thing that distinguishes this as a matcher is the fact that it ends in <code v-pre>?</code>.</p>
<div class="language-ruby line-numbers-mode" data-ext="rb"><pre v-pre class="language-ruby"><code>  <span class="token comment"># Bare call on the matcher (called as a method on the resource)</span>
  describe things <span class="token keyword">do</span>
    it <span class="token punctuation">{</span> should exist <span class="token punctuation">}</span>
  <span class="token keyword">end</span>

  <span class="token comment"># Chained on where (called as a method on the Table)</span>
  describe things<span class="token punctuation">.</span>where<span class="token punctuation">(</span><span class="token symbol">color</span><span class="token operator">:</span> <span class="token symbol">:red</span><span class="token punctuation">)</span> <span class="token keyword">do</span>
    it <span class="token punctuation">{</span> should exist <span class="token punctuation">}</span>
  <span class="token keyword">end</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_10-3-4-the-count-property" tabindex="-1"><a class="header-anchor" href="#_10-3-4-the-count-property" aria-hidden="true">#</a> 10.3.4. The <code v-pre>count</code> property</h4>
<p>This <code v-pre>register_custom_property</code> call:</p>
<div class="language-ruby line-numbers-mode" data-ext="rb"><pre v-pre class="language-ruby"><code>filter_table_config<span class="token punctuation">.</span>register_custom_property<span class="token punctuation">(</span><span class="token symbol">:count</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token operator">|</span>filter_table<span class="token operator">|</span> filter_table<span class="token punctuation">.</span>entries<span class="token punctuation">.</span>count <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>causes a new method to be defined on both the resource class and the Table class.  As with <code v-pre>exists?</code>, the body is taken from the block.</p>
<div class="language-ruby line-numbers-mode" data-ext="rb"><pre v-pre class="language-ruby"><code>  <span class="token comment"># Bare call on the property (called as a method on the resource)</span>
  describe things <span class="token keyword">do</span>
    its<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'count'</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span> should cmp <span class="token number">3</span> <span class="token punctuation">}</span>
  <span class="token keyword">end</span>

  <span class="token comment"># Chained on where (called as a method on the Table)</span>
  describe things<span class="token punctuation">.</span>where<span class="token punctuation">(</span><span class="token symbol">color</span><span class="token operator">:</span> <span class="token symbol">:red</span><span class="token punctuation">)</span> <span class="token keyword">do</span>
    its<span class="token punctuation">(</span><span class="token string-literal"><span class="token string">'count'</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span> should cmp <span class="token number">2</span> <span class="token punctuation">}</span>
  <span class="token keyword">end</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_10-3-5-the-raw-data-method" tabindex="-1"><a class="header-anchor" href="#_10-3-5-the-raw-data-method" aria-hidden="true">#</a> 10.3.5. The <code v-pre>raw_data</code> method</h4>
<p>Unlike <code v-pre>entries</code>, which wraps each row in a Struct and omits undeclared fields, <code v-pre>raw_data</code> simply returns the actual raw data array-of-hashes.  It is not <code v-pre>dup</code>'d. People <em>definitely</em> use this out in the wild, even though it returns a rougher data structure.</p>
<div class="language-ruby line-numbers-mode" data-ext="rb"><pre v-pre class="language-ruby"><code>  tacky_things <span class="token operator">=</span> things<span class="token punctuation">.</span>where<span class="token punctuation">(</span><span class="token symbol">color</span><span class="token operator">:</span> <span class="token symbol">:blue</span><span class="token punctuation">)</span><span class="token punctuation">.</span>raw_data<span class="token punctuation">.</span>select <span class="token punctuation">{</span> <span class="token operator">|</span>row<span class="token operator">|</span> row<span class="token punctuation">[</span><span class="token symbol">:tackiness</span><span class="token punctuation">]</span> <span class="token punctuation">}</span>
  tacky_things<span class="token punctuation">.</span>map <span class="token punctuation">{</span> <span class="token operator">|</span>row<span class="token operator">|</span> row<span class="token punctuation">[</span><span class="token symbol">:thing_id</span><span class="token punctuation">]</span> <span class="token punctuation">}</span><span class="token punctuation">.</span><span class="token keyword">each</span> <span class="token keyword">do</span> <span class="token operator">|</span>thing_id<span class="token operator">|</span>
    <span class="token comment"># Use to audit a singular Thing</span>
    describe thing<span class="token punctuation">(</span>thing_id<span class="token punctuation">)</span> <span class="token keyword">do</span>
      it <span class="token punctuation">{</span> should_not be_paisley <span class="token punctuation">}</span>
    <span class="token keyword">end</span>
  <span class="token keyword">end</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_10-4-filtertable-examples" tabindex="-1"><a class="header-anchor" href="#_10-4-filtertable-examples" aria-hidden="true">#</a> 10.4 FilterTable Examples</h3>
<p>FilterTable is a very flexible and powerful class that works well when designing plural resources. As always, if you need to write a plural resource, we encourage you to examine existing resources in the InSpec source code to see how other developers have implemented it. Some good examples include:</p>
<ul>
<li><a href="https://github.com/inspec/inspec/blob/63a5fd26a6925b1570ee80e2953d259b58c3012e/lib/inspec/resources/firewalld.rb" target="_blank" rel="noopener noreferrer">FirewallD<ExternalLinkIcon/></a></li>
<li><a href="https://github.com/inspec/inspec/blob/63a5fd26a6925b1570ee80e2953d259b58c3012e/lib/inspec/resources/users.rb" target="_blank" rel="noopener noreferrer">Users<ExternalLinkIcon/></a></li>
<li><a href="https://github.com/inspec/inspec/blob/63a5fd26a6925b1570ee80e2953d259b58c3012e/lib/inspec/resources/shadow.rb" target="_blank" rel="noopener noreferrer">Shadow<ExternalLinkIcon/></a></li>
</ul>
</div></template>


