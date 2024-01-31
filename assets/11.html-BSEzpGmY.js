import{_ as u}from"./plugin-vue_export-helper-x3n3nnut.js";import{r as o,o as p,c as d,d as s,e as n,b as t,w as e,f as c}from"./app-KhTIoQwo.js";const m="/saf-training/assets/Download_STIG_Viewer-zAPfTvLY.png",h="/saf-training/assets/Download_STIG-N5yFp_SQ.png",v={},k=s("h2",{id:"from-stig-to-profile",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#from-stig-to-profile"},[s("span",null,"From STIG to Profile")])],-1),S=s("p",null,"You have seen in some of our examples in this class that a robust profile's controls will include a large number of metadata tags:",-1),V={class:"hint-container details"},g=s("summary",null,"InSpec control with many STIG-related tags",-1),f={href:"https://github.com/mitre/redhat-enterprise-linux-7-stig-baseline/blob/main/controls/SV-204392.rb",target:"_blank",rel:"noopener noreferrer"},_=c(`<div class="language-ruby line-numbers-mode" data-ext="rb" data-title="rb"><pre class="language-ruby"><code>control <span class="token string-literal"><span class="token string">&#39;SV-204392&#39;</span></span> <span class="token keyword">do</span>
  title &#39;The Red Hat Enterprise Linux operating system must be configured so that the file permissions<span class="token punctuation">,</span> ownership<span class="token punctuation">,</span>
    <span class="token keyword">and</span> group membership of system files <span class="token keyword">and</span> commands match the vendor values<span class="token punctuation">.</span>&#39;
  desc &#39;Discretionary access control is weakened <span class="token keyword">if</span> a user <span class="token keyword">or</span> group has access permissions to system files <span class="token keyword">and</span>
    directories greater than the default<span class="token punctuation">.</span>&#39;
  desc <span class="token string-literal"><span class="token string">&#39;check&#39;</span></span><span class="token punctuation">,</span> <span class="token operator">...</span>
  desc <span class="token string-literal"><span class="token string">&#39;fix&#39;</span></span><span class="token punctuation">,</span> <span class="token operator">...</span>
  impact <span class="token number">0.7</span>
  tag legacy<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string-literal"><span class="token string">&#39;V-71849&#39;</span></span><span class="token punctuation">,</span> <span class="token string-literal"><span class="token string">&#39;SV-86473&#39;</span></span><span class="token punctuation">]</span>
  tag severity<span class="token operator">:</span> <span class="token string-literal"><span class="token string">&#39;high&#39;</span></span>
  tag gtitle<span class="token operator">:</span> <span class="token string-literal"><span class="token string">&#39;SRG-OS-000257-GPOS-00098&#39;</span></span>
  tag satisfies<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string-literal"><span class="token string">&#39;SRG-OS-000257-GPOS-00098&#39;</span></span><span class="token punctuation">,</span> <span class="token string-literal"><span class="token string">&#39;SRG-OS-000278-GPOS-00108&#39;</span></span><span class="token punctuation">]</span>
  tag gid<span class="token operator">:</span> <span class="token string-literal"><span class="token string">&#39;V-204392&#39;</span></span>
  tag rid<span class="token operator">:</span> <span class="token string-literal"><span class="token string">&#39;SV-204392r880752_rule&#39;</span></span>
  tag stig_id<span class="token operator">:</span> <span class="token string-literal"><span class="token string">&#39;RHEL-07-010010&#39;</span></span>
  tag fix_id<span class="token operator">:</span> <span class="token string-literal"><span class="token string">&#39;F-36302r880751_fix&#39;</span></span>
  tag cci<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string-literal"><span class="token string">&#39;CCI-001494&#39;</span></span><span class="token punctuation">,</span> <span class="token string-literal"><span class="token string">&#39;CCI-001496&#39;</span></span><span class="token punctuation">,</span> <span class="token string-literal"><span class="token string">&#39;CCI-002165&#39;</span></span><span class="token punctuation">,</span> <span class="token string-literal"><span class="token string">&#39;CCI-002235&#39;</span></span><span class="token punctuation">]</span>
  tag nist<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string-literal"><span class="token string">&#39;AU-9&#39;</span></span><span class="token punctuation">,</span> <span class="token string-literal"><span class="token string">&#39;AU-9 (3)&#39;</span></span><span class="token punctuation">,</span> <span class="token string-literal"><span class="token string">&#39;AC-3 (4)&#39;</span></span><span class="token punctuation">,</span> <span class="token string-literal"><span class="token string">&#39;AC-6 (10)&#39;</span></span><span class="token punctuation">]</span>
  tag subsystems<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string-literal"><span class="token string">&#39;permissions&#39;</span></span><span class="token punctuation">,</span> <span class="token string-literal"><span class="token string">&#39;package&#39;</span></span><span class="token punctuation">,</span> <span class="token string-literal"><span class="token string">&#39;rpm&#39;</span></span><span class="token punctuation">]</span>
  tag <span class="token string-literal"><span class="token string">&#39;host&#39;</span></span>
  tag <span class="token string-literal"><span class="token string">&#39;container&#39;</span></span>

  describe the_actual_test <span class="token keyword">do</span> <span class="token comment"># the actual describe block appears on line 54 of this control!</span>
    <span class="token operator">...</span>
  <span class="token keyword">end</span>
<span class="token keyword">end</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,1),w=s("em",null,"really",-1),y={href:"https://saf-cli.mitre.org",target:"_blank",rel:"noopener noreferrer"},I=s("h3",{id:"download-stig-requirements",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#download-stig-requirements"},[s("span",null,"Download STIG Requirements")])],-1),x=s("p",null,"First, let's discuss where all of that metadata comes from in the first place -- the baseline security guidance that we are automating using InSpec. We'll crack open a STIG XCCDF XML file to show you where the control metadata is sourced from.",-1),C={href:"https://public.cyber.mil/stigs/srg-stig-tools/",target:"_blank",rel:"noopener noreferrer"},T=s("figure",null,[s("img",{src:m,alt:"Downloading STIG Viewer",tabindex:"0",loading:"lazy"}),s("figcaption",null,"Downloading STIG Viewer")],-1),A=s("code",null,"Red Hat Enterprise Linux 8 STIG",-1),L={href:"https://public.cyber.mil/stigs/downloads/?_dl_facet_stigs=operating-systems%2Cunix-linux",target:"_blank",rel:"noopener noreferrer"},G=c('<p>(The RHEL8 STIG is at version 1, release 5 at time of writing, but may have been updated by the time you downloaded. This will not affect how we use the STIG in this class.)</p><figure><img src="'+h+'" alt="Downloading STIGs" tabindex="0" loading="lazy"><figcaption>Downloading STIGs</figcaption></figure><h3 id="convert-the-stig-xccdf-benchmark-to-an-inspec-stubs-profile" tabindex="-1"><a class="header-anchor" href="#convert-the-stig-xccdf-benchmark-to-an-inspec-stubs-profile"><span>Convert the STIG XCCDF Benchmark To an InSpec Stubs Profile</span></a></h3><div class="hint-container note"><p class="hint-container-title">Timesaver Ahead!</p><p>We already converted the XCCDF STIG Benchmark into a starter profile using the <code>saf generate xccdf_benchmark2inspec_stub</code> command using the correct flags, mapping file and other options. In a moment we will show you how to grab our pre-made profile that we generated with the SAF CLI.</p></div>',4),F=s("p",null,[n("The SAF CLI has the "),s("code",null,"generate xccdf_benchmark2inspec_stub"),n(" sub-command which can help you quickly convert an XCCDF Benchmark document into the start of an InSpec Profile.")],-1),O=s("code",null,"saf generate xccdf_benchmark2inspec_stub",-1),D=s("code",null,"saf",-1),R={href:"https://saf-cli.mitre.org/#generate",target:"_blank",rel:"noopener noreferrer"},E=s("div",{class:"language-bash line-numbers-mode","data-ext":"sh","data-title":"sh"},[s("pre",{class:"language-bash"},[s("code",null,[n("saf generate xccdf_benchmark2inspec_stub "),s("span",{class:"token parameter variable"},"--help"),n(`
`)])]),s("div",{class:"line-numbers","aria-hidden":"true"},[s("div",{class:"line-number"})])],-1),X=s("div",{class:"language-bash line-numbers-mode","data-ext":"sh","data-title":"sh"},[s("pre",{class:"language-bash"},[s("code",null,[n("Translate an XCCDF benchmark "),s("span",{class:"token function"},"file"),n(" to a skeleton "),s("span",{class:"token keyword"},"for"),n(` an InSpec profile

USAGE
  $ saf saf generate xccdf_benchmark2inspec_stub `),s("span",{class:"token parameter variable"},"-i"),n(),s("span",{class:"token operator"},"<"),n("stig-xccdf-xml"),s("span",{class:"token operator"},">"),n(),s("span",{class:"token punctuation"},"["),n("-o "),s("span",{class:"token operator"},"<"),n("output-folder"),s("span",{class:"token operator"},">"),s("span",{class:"token punctuation"},"]"),n(),s("span",{class:"token punctuation"},"["),n("-h"),s("span",{class:"token punctuation"},"]"),n(),s("span",{class:"token punctuation"},"["),n("-m "),s("span",{class:"token operator"},"<"),n("metadata-json"),s("span",{class:"token operator"},">"),s("span",{class:"token punctuation"},"]"),n(),s("span",{class:"token punctuation"},"["),n(`-T
    `),s("span",{class:"token punctuation"},"("),n("rule"),s("span",{class:"token operator"},"|"),n("group"),s("span",{class:"token operator"},"|"),n("cis"),s("span",{class:"token operator"},"|"),n("version"),s("span",{class:"token punctuation"},")"),s("span",{class:"token punctuation"},"]"),n(),s("span",{class:"token punctuation"},"["),n("-s"),s("span",{class:"token punctuation"},"]"),n(),s("span",{class:"token punctuation"},"["),n("-L "),s("span",{class:"token punctuation"},"("),n("info"),s("span",{class:"token operator"},"|"),n("warn"),s("span",{class:"token operator"},"|"),n("debug"),s("span",{class:"token operator"},"|"),n("verbose"),s("span",{class:"token punctuation"},")"),s("span",{class:"token punctuation"},"]"),n(`

FLAGS
  -L, `),s("span",{class:"token parameter variable"},"--logLevel"),s("span",{class:"token operator"},"="),s("span",{class:"token operator"},"<"),n("option"),s("span",{class:"token operator"},">"),n("        "),s("span",{class:"token punctuation"},"["),n("default: info"),s("span",{class:"token punctuation"},"]"),n(`
                                 `),s("span",{class:"token operator"},"<"),n("options: info"),s("span",{class:"token operator"},"|"),n("warn"),s("span",{class:"token operator"},"|"),n("debug"),s("span",{class:"token operator"},"|"),n("verbose"),s("span",{class:"token operator"},">"),n(`
  -O, `),s("span",{class:"token parameter variable"},"--ovalDefinitions"),s("span",{class:"token operator"},"="),s("span",{class:"token operator"},"<"),n("value"),s("span",{class:"token operator"},">"),n("  Path to an OVAL definitions "),s("span",{class:"token function"},"file"),n(` to populate profile elements that reference OVAL definitions
  -T, `),s("span",{class:"token parameter variable"},"--idType"),s("span",{class:"token operator"},"="),s("span",{class:"token operator"},"<"),n("option"),s("span",{class:"token operator"},">"),n("          "),s("span",{class:"token punctuation"},"["),n("default: rule"),s("span",{class:"token punctuation"},"]"),n(" Control ID Types: "),s("span",{class:"token string"},"'rule'"),n(" - Vulnerability IDs "),s("span",{class:"token punctuation"},"("),n("ex. "),s("span",{class:"token string"},"'SV-XXXXX'"),s("span",{class:"token punctuation"},")"),n(", "),s("span",{class:"token string"},"'group'"),n(" - Group IDs "),s("span",{class:"token punctuation"},"("),n(`ex.
                                 `),s("span",{class:"token string"},"'V-XXXXX'"),s("span",{class:"token punctuation"},")"),n(", "),s("span",{class:"token string"},"'cis'"),n(" - CIS Rule IDs "),s("span",{class:"token punctuation"},"("),n("ex. C-1.1.1.1"),s("span",{class:"token punctuation"},")"),n(", "),s("span",{class:"token string"},"'version'"),n(" - Version IDs "),s("span",{class:"token punctuation"},"("),n(`ex. RHEL-07-010020 - also
                                 known as STIG IDs`),s("span",{class:"token punctuation"},")"),n(`
                                 `),s("span",{class:"token operator"},"<"),n("options: rule"),s("span",{class:"token operator"},"|"),n("group"),s("span",{class:"token operator"},"|"),n("cis"),s("span",{class:"token operator"},"|"),n("version"),s("span",{class:"token operator"},">"),n(`
  -h, `),s("span",{class:"token parameter variable"},"--help"),n(`                     Show CLI help.
  -i, `),s("span",{class:"token parameter variable"},"--input"),s("span",{class:"token operator"},"="),s("span",{class:"token operator"},"<"),n("value"),s("span",{class:"token operator"},">"),n("            "),s("span",{class:"token punctuation"},"("),n("required"),s("span",{class:"token punctuation"},")"),n(" Path to the XCCDF benchmark "),s("span",{class:"token function"},"file"),n(`
  -m, `),s("span",{class:"token parameter variable"},"--metadata"),s("span",{class:"token operator"},"="),s("span",{class:"token operator"},"<"),n("value"),s("span",{class:"token operator"},">"),n("         Path to a JSON "),s("span",{class:"token function"},"file"),n(" with additional metadata "),s("span",{class:"token keyword"},"for"),n(" the inspec.yml "),s("span",{class:"token function"},"file"),n(`
  -o, `),s("span",{class:"token parameter variable"},"--output"),s("span",{class:"token operator"},"="),s("span",{class:"token operator"},"<"),n("value"),s("span",{class:"token operator"},">"),n("           "),s("span",{class:"token punctuation"},"["),n("default: profile"),s("span",{class:"token punctuation"},"]"),n(" The output folder to "),s("span",{class:"token function"},"write"),n(` the generated InSpec content
  -s, `),s("span",{class:"token parameter variable"},"--singleFile"),n("               Output the resulting controls as a single "),s("span",{class:"token function"},"file"),n(`

DESCRIPTION
  Translate an XCCDF benchmark `),s("span",{class:"token function"},"file"),n(" to a skeleton "),s("span",{class:"token keyword"},"for"),n(` an InSpec profile

EXAMPLES
  $ saf generate xccdf_benchmark2inspec_stub `),s("span",{class:"token parameter variable"},"-i"),n(" ./U_RHEL_6_STIG_V2R2_Manual-xccdf.xml "),s("span",{class:"token parameter variable"},"-T"),n(" group "),s("span",{class:"token parameter variable"},"--logLevel"),n(" debug "),s("span",{class:"token parameter variable"},"-r"),n(` rhel-6-update-report.md

  $ saf generate xccdf_benchmark2inspec_stub `),s("span",{class:"token parameter variable"},"-i"),n(" ./CIS_Ubuntu_Linux_18.04_LTS_Benchmark_v1.1.0-xccdf.xml "),s("span",{class:"token parameter variable"},"-O"),n(" ./CIS_Ubuntu_Linux_18.04_LTS_Benchmark_v1.1.0-oval.xml "),s("span",{class:"token parameter variable"},"--logLevel"),n(` debug
`)])]),s("div",{class:"line-numbers","aria-hidden":"true"},[s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"})])],-1),q=s("h3",{id:"how-to-get-the-pre-made-profile",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#how-to-get-the-pre-made-profile"},[s("span",null,"How to Get the Pre-made Profile")])],-1),P=s("code",null,"saf generate xccdf_benchmark2inspec_stub",-1),H={href:"https://mitre.github.io/saf-training/resources/#rhel8-baseline-stubs",target:"_blank",rel:"noopener noreferrer"},N=s("code",null,"wget",-1),z=s("code",null,"wget",-1),B=s("div",{class:"language-bash line-numbers-mode","data-ext":"sh","data-title":"sh"},[s("pre",{class:"language-bash"},[s("code",null,[s("span",{class:"token function"},"wget"),n(` https://github.com/mitre/inspec-profile-developer-course-lab-environment/raw/main/resources/rhel8-baseline-stubs.tar.gz
`)])]),s("div",{class:"line-numbers","aria-hidden":"true"},[s("div",{class:"line-number"})])],-1),$=s("div",{class:"language-bash line-numbers-mode","data-ext":"sh","data-title":"sh"},[s("pre",{class:"language-bash"},[s("code",null,[n("/workspaces/saf-training-lab-environment/rhel8-baseline-stubs "),s("span",{class:"token punctuation"},"("),n("main"),s("span",{class:"token punctuation"},")"),n(" $ "),s("span",{class:"token function"},"wget"),n(` https://github.com/mitre/inspec-profile-developer-course-lab-environment/raw/main/resources/rhel8-baseline-stubs.tar.gz
--2023-02-09 `),s("span",{class:"token number"},"14"),n(`:51:56--  https://github.com/mitre/inspec-profile-developer-course-lab-environment/raw/main/resources/rhel8-baseline-stubs.tar.gz
Resolving github.com `),s("span",{class:"token punctuation"},"("),n("github.com"),s("span",{class:"token punctuation"},")"),s("span",{class:"token punctuation"},".."),n(". "),s("span",{class:"token number"},"140.82"),n(`.112.4
Connecting to github.com `),s("span",{class:"token punctuation"},"("),n("github.com"),s("span",{class:"token punctuation"},")"),s("span",{class:"token operator"},"|"),s("span",{class:"token number"},"140.82"),n(".112.4"),s("span",{class:"token operator"},"|"),n(":443"),s("span",{class:"token punctuation"},".."),n(`. connected.
HTTP request sent, awaiting response`),s("span",{class:"token punctuation"},".."),n(". "),s("span",{class:"token number"},"302"),n(` Found
Location: https://raw.githubusercontent.com/mitre/inspec-profile-developer-course-lab-environment/main/resources/rhel8-baseline-stubs.tar.gz `),s("span",{class:"token punctuation"},"["),n("following"),s("span",{class:"token punctuation"},"]"),n(`
--2023-02-09 `),s("span",{class:"token number"},"14"),n(`:51:57--  https://raw.githubusercontent.com/mitre/inspec-profile-developer-course-lab-environment/main/resources/rhel8-baseline-stubs.tar.gz
Resolving raw.githubusercontent.com `),s("span",{class:"token punctuation"},"("),n("raw.githubusercontent.com"),s("span",{class:"token punctuation"},")"),s("span",{class:"token punctuation"},".."),n(". "),s("span",{class:"token number"},"185.199"),n(".109.133, "),s("span",{class:"token number"},"185.199"),n(".110.133, "),s("span",{class:"token number"},"185.199"),n(".111.133, "),s("span",{class:"token punctuation"},".."),n(`.
Connecting to raw.githubusercontent.com `),s("span",{class:"token punctuation"},"("),n("raw.githubusercontent.com"),s("span",{class:"token punctuation"},")"),s("span",{class:"token operator"},"|"),s("span",{class:"token number"},"185.199"),n(".109.133"),s("span",{class:"token operator"},"|"),n(":443"),s("span",{class:"token punctuation"},".."),n(`. connected.
HTTP request sent, awaiting response`),s("span",{class:"token punctuation"},".."),n(". "),s("span",{class:"token number"},"200"),n(` OK
Length: `),s("span",{class:"token number"},"197531"),n(),s("span",{class:"token punctuation"},"("),n("193K"),s("span",{class:"token punctuation"},")"),n(),s("span",{class:"token punctuation"},"["),n("application/octet-stream"),s("span",{class:"token punctuation"},"]"),n(`
Saving to: ‘rhel8-baseline-stubs.tar.gz’

rhel8-baseline-stubs.tar.gz                   `),s("span",{class:"token number"},"100"),n("%"),s("span",{class:"token punctuation"},"["),s("span",{class:"token operator"},"=="),s("span",{class:"token operator"},"=="),s("span",{class:"token operator"},"=="),s("span",{class:"token operator"},"=="),s("span",{class:"token operator"},"=="),s("span",{class:"token operator"},"=="),s("span",{class:"token operator"},"=="),s("span",{class:"token operator"},"=="),s("span",{class:"token operator"},"=="),s("span",{class:"token operator"},"=="),s("span",{class:"token operator"},"=="),s("span",{class:"token operator"},"=="),s("span",{class:"token operator"},"=="),s("span",{class:"token operator"},"=="),s("span",{class:"token operator"},"=="),s("span",{class:"token operator"},"=="),s("span",{class:"token operator"},"=="),s("span",{class:"token operator"},"=="),s("span",{class:"token operator"},"=="),s("span",{class:"token operator"},"=="),s("span",{class:"token operator"},"=="),s("span",{class:"token operator"},"=="),s("span",{class:"token operator"},"=="),s("span",{class:"token operator"},"=="),s("span",{class:"token operator"},"=="),s("span",{class:"token operator"},"=="),s("span",{class:"token operator"},"=="),s("span",{class:"token operator"},"=="),s("span",{class:"token operator"},"=="),s("span",{class:"token operator"},"=="),s("span",{class:"token operator"},"=="),s("span",{class:"token operator"},"=="),s("span",{class:"token operator"},"=="),s("span",{class:"token operator"},"=="),s("span",{class:"token operator"},"=="),s("span",{class:"token operator"},"=="),s("span",{class:"token operator"},"=="),s("span",{class:"token operator"},"=="),s("span",{class:"token operator"},"=="),s("span",{class:"token operator"},"=="),s("span",{class:"token operator"},"=="),s("span",{class:"token operator"},"=="),s("span",{class:"token operator"},"=="),s("span",{class:"token operator"},"=="),s("span",{class:"token operator"},"=="),s("span",{class:"token operator"},"=="),s("span",{class:"token operator"},"=="),s("span",{class:"token operator"},"=="),s("span",{class:"token operator"},"="),s("span",{class:"token operator"},">"),s("span",{class:"token punctuation"},"]"),n(),s("span",{class:"token number"},"192"),n(".90K  --.-KB/s    "),s("span",{class:"token keyword"},"in"),n(),s("span",{class:"token number"},"0"),n(`.004s  

`),s("span",{class:"token number"},"2023"),n("-02-09 "),s("span",{class:"token number"},"14"),n(":51:57 "),s("span",{class:"token punctuation"},"("),s("span",{class:"token number"},"47.0"),n(" MB/s"),s("span",{class:"token punctuation"},")"),n(" - ‘rhel8-baseline-stubs.tar.gz’ saved "),s("span",{class:"token punctuation"},"["),s("span",{class:"token number"},"197531"),n("/197531"),s("span",{class:"token punctuation"},"]"),n(`
`)])]),s("div",{class:"line-numbers","aria-hidden":"true"},[s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"})])],-1),U=s("p",null,[n("Once you've used "),s("code",null,"wget"),n(" to grab the compressed profile, we need to uncompress it so that we can work with the control files inside.")],-1),M=s("div",{class:"language-bash line-numbers-mode","data-ext":"sh","data-title":"sh"},[s("pre",{class:"language-bash"},[s("code",null,[s("span",{class:"token function"},"tar"),n(` zxvfp ./rhel8-baseline-stubs.tar.gz
`)])]),s("div",{class:"line-numbers","aria-hidden":"true"},[s("div",{class:"line-number"})])],-1),W=s("div",{class:"language-bash line-numbers-mode","data-ext":"sh","data-title":"sh"},[s("pre",{class:"language-bash"},[s("code",null,`rhel8-baseline-stubs/
rhel8-baseline-stubs/libraries/
rhel8-baseline-stubs/README.md
rhel8-baseline-stubs/controls/
rhel8-baseline-stubs/inspec.yml
rhel8-baseline-stubs/controls/SV-230281.rb
rhel8-baseline-stubs/controls/SV-230390.rb
rhel8-baseline-stubs/controls/SV-230363.rb
rhel8-baseline-stubs/controls/SV-230223.rb
rhel8-baseline-stubs/controls/SV-230332.rb
rhel8-baseline-stubs/controls/SV-230272.rb
rhel8-baseline-stubs/controls/SV-245540.rb
rhel8-baseline-stubs/controls/SV-230246.rb
rhel8-baseline-stubs/controls/SV-230306.rb
rhel8-baseline-stubs/controls/SV-230357.rb
rhel8-baseline-stubs/controls/SV-230559.rb
rhel8-baseline-stubs/controls/SV-230419.rb
rhel8-baseline-stubs/controls/SV-230508.rb
rhel8-baseline-stubs/controls/SV-230448.rb
rhel8-baseline-stubs/controls/SV-230518.rb
rhel8-baseline-stubs/controls/SV-230409.rb
rhel8-baseline-stubs/controls/SV-230549.rb
rhel8-baseline-stubs/controls/SV-230347.rb
rhel8-baseline-stubs/controls/SV-230316.rb
rhel8-baseline-stubs/controls/SV-230256.rb
rhel8-baseline-stubs/controls/SV-230262.rb
rhel8-baseline-stubs/controls/SV-230322.rb
rhel8-baseline-stubs/controls/SV-230233.rb
rhel8-baseline-stubs/controls/SV-230373.rb
rhel8-baseline-stubs/controls/SV-230380.rb
rhel8-baseline-stubs/controls/SV-230291.rb
rhel8-baseline-stubs/controls/SV-230353.rb
rhel8-baseline-stubs/controls/SV-230302.rb
rhel8-baseline-stubs/controls/SV-230394.rb
rhel8-baseline-stubs/controls/SV-230285.rb
rhel8-baseline-stubs/controls/SV-230336.rb
rhel8-baseline-stubs/controls/SV-230276.rb
rhel8-baseline-stubs/controls/SV-230367.rb
rhel8-baseline-stubs/controls/SV-230227.rb
rhel8-baseline-stubs/controls/SV-230429.rb
rhel8-baseline-stubs/controls/SV-230478.rb
rhel8-baseline-stubs/controls/SV-230538.rb
rhel8-baseline-stubs/controls/SV-230468.rb
rhel8-baseline-stubs/controls/SV-230439.rb
rhel8-baseline-stubs/controls/SV-230237.rb
rhel8-baseline-stubs/controls/SV-230377.rb
rhel8-baseline-stubs/controls/SV-230266.rb
rhel8-baseline-stubs/controls/SV-230326.rb
rhel8-baseline-stubs/controls/SV-230295.rb
rhel8-baseline-stubs/controls/SV-230384.rb
rhel8-baseline-stubs/controls/SV-230312.rb
rhel8-baseline-stubs/controls/SV-230252.rb
rhel8-baseline-stubs/controls/SV-230343.rb
rhel8-baseline-stubs/controls/SV-237641.rb
rhel8-baseline-stubs/controls/SV-230352.rb
rhel8-baseline-stubs/controls/SV-230243.rb
rhel8-baseline-stubs/controls/SV-230303.rb
rhel8-baseline-stubs/controls/SV-230395.rb
rhel8-baseline-stubs/controls/SV-230284.rb
rhel8-baseline-stubs/controls/SV-230337.rb
rhel8-baseline-stubs/controls/SV-230277.rb
rhel8-baseline-stubs/controls/SV-230366.rb
rhel8-baseline-stubs/controls/SV-230226.rb
rhel8-baseline-stubs/controls/SV-230428.rb
rhel8-baseline-stubs/controls/SV-230479.rb
rhel8-baseline-stubs/controls/SV-230539.rb
rhel8-baseline-stubs/controls/SV-230529.rb
rhel8-baseline-stubs/controls/SV-230469.rb
rhel8-baseline-stubs/controls/SV-230438.rb
rhel8-baseline-stubs/controls/SV-230236.rb
rhel8-baseline-stubs/controls/SV-230376.rb
rhel8-baseline-stubs/controls/SV-230267.rb
rhel8-baseline-stubs/controls/SV-230327.rb
rhel8-baseline-stubs/controls/SV-230294.rb
rhel8-baseline-stubs/controls/SV-230385.rb
rhel8-baseline-stubs/controls/SV-230313.rb
rhel8-baseline-stubs/controls/SV-230253.rb
rhel8-baseline-stubs/controls/SV-230342.rb
rhel8-baseline-stubs/controls/SV-237640.rb
rhel8-baseline-stubs/controls/SV-230280.rb
rhel8-baseline-stubs/controls/SV-230362.rb
rhel8-baseline-stubs/controls/SV-230222.rb
rhel8-baseline-stubs/controls/SV-230333.rb
rhel8-baseline-stubs/controls/SV-230273.rb
rhel8-baseline-stubs/controls/SV-230247.rb
rhel8-baseline-stubs/controls/SV-230307.rb
rhel8-baseline-stubs/controls/SV-230356.rb
rhel8-baseline-stubs/controls/SV-230558.rb
rhel8-baseline-stubs/controls/SV-230418.rb
rhel8-baseline-stubs/controls/SV-230509.rb
rhel8-baseline-stubs/controls/SV-230449.rb
rhel8-baseline-stubs/controls/SV-230519.rb
rhel8-baseline-stubs/controls/SV-230408.rb
rhel8-baseline-stubs/controls/SV-230548.rb
rhel8-baseline-stubs/controls/SV-230346.rb
rhel8-baseline-stubs/controls/SV-230317.rb
rhel8-baseline-stubs/controls/SV-230257.rb
rhel8-baseline-stubs/controls/SV-230263.rb
rhel8-baseline-stubs/controls/SV-230323.rb
rhel8-baseline-stubs/controls/SV-230232.rb
rhel8-baseline-stubs/controls/SV-230372.rb
rhel8-baseline-stubs/controls/SV-230381.rb
rhel8-baseline-stubs/controls/SV-230290.rb
rhel8-baseline-stubs/controls/SV-230553.rb
rhel8-baseline-stubs/controls/SV-230413.rb
rhel8-baseline-stubs/controls/SV-230502.rb
rhel8-baseline-stubs/controls/SV-230485.rb
rhel8-baseline-stubs/controls/SV-230476.rb
rhel8-baseline-stubs/controls/SV-230536.rb
rhel8-baseline-stubs/controls/SV-230427.rb
rhel8-baseline-stubs/controls/SV-230369.rb
rhel8-baseline-stubs/controls/SV-244521.rb
rhel8-baseline-stubs/controls/SV-230229.rb
rhel8-baseline-stubs/controls/SV-230338.rb
rhel8-baseline-stubs/controls/SV-230278.rb
rhel8-baseline-stubs/controls/SV-244544.rb
rhel8-baseline-stubs/controls/SV-244554.rb
rhel8-baseline-stubs/controls/SV-230268.rb
rhel8-baseline-stubs/controls/SV-230328.rb
rhel8-baseline-stubs/controls/SV-244531.rb
rhel8-baseline-stubs/controls/SV-230239.rb
rhel8-baseline-stubs/controls/SV-230379.rb
rhel8-baseline-stubs/controls/SV-230437.rb
rhel8-baseline-stubs/controls/SV-230526.rb
rhel8-baseline-stubs/controls/SV-230466.rb
rhel8-baseline-stubs/controls/SV-230495.rb
rhel8-baseline-stubs/controls/SV-230512.rb
rhel8-baseline-stubs/controls/SV-230403.rb
rhel8-baseline-stubs/controls/SV-230543.rb
rhel8-baseline-stubs/controls/SV-251714.rb
rhel8-baseline-stubs/controls/SV-230481.rb
rhel8-baseline-stubs/controls/SV-230423.rb
rhel8-baseline-stubs/controls/SV-230472.rb
rhel8-baseline-stubs/controls/SV-230532.rb
rhel8-baseline-stubs/controls/SV-230506.rb
rhel8-baseline-stubs/controls/SV-230446.rb
rhel8-baseline-stubs/controls/SV-230557.rb
rhel8-baseline-stubs/controls/SV-230359.rb
rhel8-baseline-stubs/controls/SV-230248.rb
rhel8-baseline-stubs/controls/SV-244540.rb
rhel8-baseline-stubs/controls/SV-230308.rb
rhel8-baseline-stubs/controls/SV-244525.rb
rhel8-baseline-stubs/controls/SV-250316.rb
rhel8-baseline-stubs/controls/SV-244535.rb
rhel8-baseline-stubs/controls/SV-230318.rb
rhel8-baseline-stubs/controls/SV-230258.rb
rhel8-baseline-stubs/controls/SV-244550.rb
rhel8-baseline-stubs/controls/SV-230349.rb
rhel8-baseline-stubs/controls/SV-230407.rb
rhel8-baseline-stubs/controls/SV-230547.rb
rhel8-baseline-stubs/controls/SV-230456.rb
rhel8-baseline-stubs/controls/SV-230516.rb
rhel8-baseline-stubs/controls/SV-251710.rb
rhel8-baseline-stubs/controls/SV-230522.rb
rhel8-baseline-stubs/controls/SV-230462.rb
rhel8-baseline-stubs/controls/SV-230433.rb
rhel8-baseline-stubs/controls/SV-230491.rb
rhel8-baseline-stubs/controls/SV-230480.rb
rhel8-baseline-stubs/controls/SV-230422.rb
rhel8-baseline-stubs/controls/SV-230473.rb
rhel8-baseline-stubs/controls/SV-230533.rb
rhel8-baseline-stubs/controls/SV-230507.rb
rhel8-baseline-stubs/controls/SV-230447.rb
rhel8-baseline-stubs/controls/SV-230556.rb
rhel8-baseline-stubs/controls/SV-230358.rb
rhel8-baseline-stubs/controls/SV-244541.rb
rhel8-baseline-stubs/controls/SV-230249.rb
rhel8-baseline-stubs/controls/SV-230309.rb
rhel8-baseline-stubs/controls/SV-244524.rb
rhel8-baseline-stubs/controls/SV-250317.rb
rhel8-baseline-stubs/controls/SV-244534.rb
rhel8-baseline-stubs/controls/SV-230319.rb
rhel8-baseline-stubs/controls/SV-244551.rb
rhel8-baseline-stubs/controls/SV-230259.rb
rhel8-baseline-stubs/controls/SV-230348.rb
rhel8-baseline-stubs/controls/SV-230406.rb
rhel8-baseline-stubs/controls/SV-230546.rb
rhel8-baseline-stubs/controls/SV-230517.rb
rhel8-baseline-stubs/controls/SV-251711.rb
rhel8-baseline-stubs/controls/SV-230523.rb
rhel8-baseline-stubs/controls/SV-230463.rb
rhel8-baseline-stubs/controls/SV-230432.rb
rhel8-baseline-stubs/controls/SV-230552.rb
rhel8-baseline-stubs/controls/SV-230412.rb
rhel8-baseline-stubs/controls/SV-230503.rb
rhel8-baseline-stubs/controls/SV-230484.rb
rhel8-baseline-stubs/controls/SV-230477.rb
rhel8-baseline-stubs/controls/SV-230537.rb
rhel8-baseline-stubs/controls/SV-230426.rb
rhel8-baseline-stubs/controls/SV-230368.rb
rhel8-baseline-stubs/controls/SV-230228.rb
rhel8-baseline-stubs/controls/SV-230339.rb
rhel8-baseline-stubs/controls/SV-230279.rb
rhel8-baseline-stubs/controls/SV-244545.rb
rhel8-baseline-stubs/controls/SV-230269.rb
rhel8-baseline-stubs/controls/SV-230329.rb
rhel8-baseline-stubs/controls/SV-230238.rb
rhel8-baseline-stubs/controls/SV-244530.rb
rhel8-baseline-stubs/controls/SV-230378.rb
rhel8-baseline-stubs/controls/SV-230436.rb
rhel8-baseline-stubs/controls/SV-230527.rb
rhel8-baseline-stubs/controls/SV-230467.rb
rhel8-baseline-stubs/controls/SV-230494.rb
rhel8-baseline-stubs/controls/SV-230513.rb
rhel8-baseline-stubs/controls/SV-230402.rb
rhel8-baseline-stubs/controls/SV-230542.rb
rhel8-baseline-stubs/controls/SV-251715.rb
rhel8-baseline-stubs/controls/SV-230470.rb
rhel8-baseline-stubs/controls/SV-230530.rb
rhel8-baseline-stubs/controls/SV-230421.rb
rhel8-baseline-stubs/controls/SV-230561.rb
rhel8-baseline-stubs/controls/SV-230483.rb
rhel8-baseline-stubs/controls/SV-230555.rb
rhel8-baseline-stubs/controls/SV-230504.rb
rhel8-baseline-stubs/controls/SV-230444.rb
rhel8-baseline-stubs/controls/SV-244542.rb
rhel8-baseline-stubs/controls/SV-244527.rb
rhel8-baseline-stubs/controls/SV-244537.rb
rhel8-baseline-stubs/controls/SV-244552.rb
rhel8-baseline-stubs/controls/SV-251712.rb
rhel8-baseline-stubs/controls/SV-230514.rb
rhel8-baseline-stubs/controls/SV-230405.rb
rhel8-baseline-stubs/controls/SV-230545.rb
rhel8-baseline-stubs/controls/SV-230493.rb
rhel8-baseline-stubs/controls/SV-230431.rb
rhel8-baseline-stubs/controls/SV-230520.rb
rhel8-baseline-stubs/controls/SV-230500.rb
rhel8-baseline-stubs/controls/SV-230551.rb
rhel8-baseline-stubs/controls/SV-230411.rb
rhel8-baseline-stubs/controls/SV-251706.rb
rhel8-baseline-stubs/controls/SV-230425.rb
rhel8-baseline-stubs/controls/SV-230474.rb
rhel8-baseline-stubs/controls/SV-230534.rb
rhel8-baseline-stubs/controls/SV-230487.rb
rhel8-baseline-stubs/controls/SV-230398.rb
rhel8-baseline-stubs/controls/SV-230289.rb
rhel8-baseline-stubs/controls/SV-244523.rb
rhel8-baseline-stubs/controls/SV-244546.rb
rhel8-baseline-stubs/controls/SV-244533.rb
rhel8-baseline-stubs/controls/SV-230299.rb
rhel8-baseline-stubs/controls/SV-230388.rb
rhel8-baseline-stubs/controls/SV-230497.rb
rhel8-baseline-stubs/controls/SV-230524.rb
rhel8-baseline-stubs/controls/SV-230464.rb
rhel8-baseline-stubs/controls/SV-230435.rb
rhel8-baseline-stubs/controls/SV-251716.rb
rhel8-baseline-stubs/controls/SV-230401.rb
rhel8-baseline-stubs/controls/SV-230541.rb
rhel8-baseline-stubs/controls/SV-230510.rb
rhel8-baseline-stubs/controls/SV-230550.rb
rhel8-baseline-stubs/controls/SV-230410.rb
rhel8-baseline-stubs/controls/SV-251707.rb
rhel8-baseline-stubs/controls/SV-230424.rb
rhel8-baseline-stubs/controls/SV-230475.rb
rhel8-baseline-stubs/controls/SV-230535.rb
rhel8-baseline-stubs/controls/SV-230486.rb
rhel8-baseline-stubs/controls/SV-230399.rb
rhel8-baseline-stubs/controls/SV-230288.rb
rhel8-baseline-stubs/controls/SV-244522.rb
rhel8-baseline-stubs/controls/SV-244547.rb
rhel8-baseline-stubs/controls/SV-244532.rb
rhel8-baseline-stubs/controls/SV-230298.rb
rhel8-baseline-stubs/controls/SV-230389.rb
rhel8-baseline-stubs/controls/SV-230496.rb
rhel8-baseline-stubs/controls/SV-230525.rb
rhel8-baseline-stubs/controls/SV-230465.rb
rhel8-baseline-stubs/controls/SV-230434.rb
rhel8-baseline-stubs/controls/SV-251717.rb
rhel8-baseline-stubs/controls/SV-230400.rb
rhel8-baseline-stubs/controls/SV-230540.rb
rhel8-baseline-stubs/controls/SV-230511.rb
rhel8-baseline-stubs/controls/SV-230471.rb
rhel8-baseline-stubs/controls/SV-230531.rb
rhel8-baseline-stubs/controls/SV-230560.rb
rhel8-baseline-stubs/controls/SV-230482.rb
rhel8-baseline-stubs/controls/SV-230554.rb
rhel8-baseline-stubs/controls/SV-230505.rb
rhel8-baseline-stubs/controls/SV-244543.rb
rhel8-baseline-stubs/controls/SV-250315.rb
rhel8-baseline-stubs/controls/SV-244526.rb
rhel8-baseline-stubs/controls/SV-244536.rb
rhel8-baseline-stubs/controls/SV-244553.rb
rhel8-baseline-stubs/controls/SV-251713.rb
rhel8-baseline-stubs/controls/SV-230455.rb
rhel8-baseline-stubs/controls/SV-230515.rb
rhel8-baseline-stubs/controls/SV-230404.rb
rhel8-baseline-stubs/controls/SV-230544.rb
rhel8-baseline-stubs/controls/SV-230492.rb
rhel8-baseline-stubs/controls/SV-230430.rb
rhel8-baseline-stubs/controls/SV-230521.rb
rhel8-baseline-stubs/controls/SV-244548.rb
rhel8-baseline-stubs/controls/SV-230240.rb
rhel8-baseline-stubs/controls/SV-230300.rb
rhel8-baseline-stubs/controls/SV-244519.rb
rhel8-baseline-stubs/controls/SV-230351.rb
rhel8-baseline-stubs/controls/SV-230365.rb
rhel8-baseline-stubs/controls/SV-230225.rb
rhel8-baseline-stubs/controls/SV-230334.rb
rhel8-baseline-stubs/controls/SV-230274.rb
rhel8-baseline-stubs/controls/SV-230287.rb
rhel8-baseline-stubs/controls/SV-230396.rb
rhel8-baseline-stubs/controls/SV-230489.rb
rhel8-baseline-stubs/controls/SV-251708.rb
rhel8-baseline-stubs/controls/SV-251718.rb
rhel8-baseline-stubs/controls/SV-230499.rb
rhel8-baseline-stubs/controls/SV-230386.rb
rhel8-baseline-stubs/controls/SV-230264.rb
rhel8-baseline-stubs/controls/SV-230324.rb
rhel8-baseline-stubs/controls/SV-230235.rb
rhel8-baseline-stubs/controls/SV-230375.rb
rhel8-baseline-stubs/controls/SV-237643.rb
rhel8-baseline-stubs/controls/SV-230341.rb
rhel8-baseline-stubs/controls/SV-230310.rb
rhel8-baseline-stubs/controls/SV-230250.rb
rhel8-baseline-stubs/controls/SV-230330.rb
rhel8-baseline-stubs/controls/SV-230270.rb
rhel8-baseline-stubs/controls/SV-230361.rb
rhel8-baseline-stubs/controls/SV-230221.rb
rhel8-baseline-stubs/controls/SV-244529.rb
rhel8-baseline-stubs/controls/SV-230392.rb
rhel8-baseline-stubs/controls/SV-230283.rb
rhel8-baseline-stubs/controls/SV-230355.rb
rhel8-baseline-stubs/controls/SV-230244.rb
rhel8-baseline-stubs/controls/SV-230304.rb
rhel8-baseline-stubs/controls/SV-230314.rb
rhel8-baseline-stubs/controls/SV-230254.rb
rhel8-baseline-stubs/controls/SV-230345.rb
rhel8-baseline-stubs/controls/SV-230293.rb
rhel8-baseline-stubs/controls/SV-230382.rb
rhel8-baseline-stubs/controls/SV-230231.rb
rhel8-baseline-stubs/controls/SV-244539.rb
rhel8-baseline-stubs/controls/SV-230371.rb
rhel8-baseline-stubs/controls/SV-230260.rb
rhel8-baseline-stubs/controls/SV-230320.rb
rhel8-baseline-stubs/controls/SV-230331.rb
rhel8-baseline-stubs/controls/SV-230271.rb
rhel8-baseline-stubs/controls/SV-230360.rb
rhel8-baseline-stubs/controls/SV-244528.rb
rhel8-baseline-stubs/controls/SV-230393.rb
rhel8-baseline-stubs/controls/SV-230282.rb
rhel8-baseline-stubs/controls/SV-230354.rb
rhel8-baseline-stubs/controls/SV-230245.rb
rhel8-baseline-stubs/controls/SV-230305.rb
rhel8-baseline-stubs/controls/SV-230315.rb
rhel8-baseline-stubs/controls/SV-230255.rb
rhel8-baseline-stubs/controls/SV-230344.rb
rhel8-baseline-stubs/controls/SV-230292.rb
rhel8-baseline-stubs/controls/SV-230383.rb
rhel8-baseline-stubs/controls/SV-244538.rb
rhel8-baseline-stubs/controls/SV-230230.rb
rhel8-baseline-stubs/controls/SV-230370.rb
rhel8-baseline-stubs/controls/SV-230261.rb
rhel8-baseline-stubs/controls/SV-230321.rb
rhel8-baseline-stubs/controls/SV-230241.rb
rhel8-baseline-stubs/controls/SV-244549.rb
rhel8-baseline-stubs/controls/SV-230301.rb
rhel8-baseline-stubs/controls/SV-230350.rb
rhel8-baseline-stubs/controls/SV-230364.rb
rhel8-baseline-stubs/controls/SV-230224.rb
rhel8-baseline-stubs/controls/SV-230335.rb
rhel8-baseline-stubs/controls/SV-230275.rb
rhel8-baseline-stubs/controls/SV-230286.rb
rhel8-baseline-stubs/controls/SV-230397.rb
rhel8-baseline-stubs/controls/SV-230488.rb
rhel8-baseline-stubs/controls/SV-251709.rb
rhel8-baseline-stubs/controls/SV-230498.rb
rhel8-baseline-stubs/controls/SV-230387.rb
rhel8-baseline-stubs/controls/SV-230296.rb
rhel8-baseline-stubs/controls/SV-230265.rb
rhel8-baseline-stubs/controls/SV-230325.rb
rhel8-baseline-stubs/controls/SV-230234.rb
rhel8-baseline-stubs/controls/SV-230374.rb
rhel8-baseline-stubs/controls/SV-237642.rb
rhel8-baseline-stubs/controls/SV-230340.rb
rhel8-baseline-stubs/controls/SV-230311.rb
rhel8-baseline-stubs/controls/SV-230251.rb
`)]),s("div",{class:"line-numbers","aria-hidden":"true"},[s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"})])],-1),K=s("h3",{id:"example-stub-control-sv-230502",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#example-stub-control-sv-230502"},[s("span",null,"Example 'Stub' Control SV-230502")])],-1),Y=s("p",null,[n("Let's take a look at one of the stub InSpec controls created by the "),s("code",null,"saf generate xccdf_benchmark2inspec_stub"),n(" command and the completed InSpec control.")],-1),j=s("div",{class:"language-ruby line-numbers-mode","data-ext":"rb","data-title":"rb"},[s("pre",{class:"language-ruby"},[s("code",null,[n("control "),s("span",{class:"token string-literal"},[s("span",{class:"token string"},"'SV-230502'")]),n(),s("span",{class:"token keyword"},"do"),n(`
  title `),s("span",{class:"token string-literal"},[s("span",{class:"token string"},"'The RHEL 8 file system automounter must be disabled unless required.'")]),n(`
  desc  "Automatically mounting file systems permits easy introduction of
unknown devices`),s("span",{class:"token punctuation"},","),n(" thereby facilitating malicious activity"),s("span",{class:"token punctuation"},"."),n(`"
  desc  `),s("span",{class:"token string-literal"},[s("span",{class:"token string"},"'rationale'")]),s("span",{class:"token punctuation"},","),n(),s("span",{class:"token string-literal"},[s("span",{class:"token string"},"''")]),n(`
  desc  `),s("span",{class:"token string-literal"},[s("span",{class:"token string"},"'check'")]),s("span",{class:"token punctuation"},","),n(` "
    Verify the operating system disables the ability to automount devices`),s("span",{class:"token punctuation"},"."),n(`

    Check to see `),s("span",{class:"token keyword"},"if"),n(" automounter service is active with the following command"),s("span",{class:"token operator"},":"),n(`

    `),s("span",{class:"token symbol"},"Note"),s("span",{class:"token operator"},":"),n(" If the autofs service is "),s("span",{class:"token keyword"},"not"),n(" installed"),s("span",{class:"token punctuation"},","),n(" this requirement is "),s("span",{class:"token keyword"},"not"),n(`
applicable`),s("span",{class:"token punctuation"},"."),n(`

    $ sudo systemctl status autofs

    autofs`),s("span",{class:"token punctuation"},"."),n("service "),s("span",{class:"token operator"},"-"),n(` Automounts filesystems on demand
    `),s("span",{class:"token symbol"},"Loaded"),s("span",{class:"token operator"},":"),n(" loaded "),s("span",{class:"token punctuation"},"("),s("span",{class:"token operator"},"/"),n("usr"),s("span",{class:"token operator"},"/"),n("lib"),s("span",{class:"token operator"},"/"),n("systemd"),s("span",{class:"token operator"},"/"),n("system"),s("span",{class:"token operator"},"/"),n("autofs"),s("span",{class:"token punctuation"},"."),n("service"),s("span",{class:"token punctuation"},";"),n(" disabled"),s("span",{class:"token punctuation"},")"),n(`
    `),s("span",{class:"token symbol"},"Active"),s("span",{class:"token operator"},":"),n(" inactive "),s("span",{class:"token punctuation"},"("),n("dead"),s("span",{class:"token punctuation"},")"),n(`

    If the \\"autofs\\" status is set to \\"active\\" `),s("span",{class:"token keyword"},"and"),n(" is "),s("span",{class:"token keyword"},"not"),n(` documented with
the Information System Security Officer `),s("span",{class:"token punctuation"},"("),s("span",{class:"token constant"},"ISSO"),s("span",{class:"token punctuation"},")"),n(" as an operational requirement"),s("span",{class:"token punctuation"},","),n(`
this is a finding`),s("span",{class:"token punctuation"},"."),n(`
  "
  desc `),s("span",{class:"token string-literal"},[s("span",{class:"token string"},"'fix'")]),s("span",{class:"token punctuation"},","),n(` "
    Configure the operating system to disable the ability to automount devices`),s("span",{class:"token punctuation"},"."),n(`

    Turn off the automount service with the following commands`),s("span",{class:"token operator"},":"),n(`

    $ sudo systemctl stop autofs
    $ sudo systemctl disable autofs

    If \\"autofs\\" is required `),s("span",{class:"token keyword"},"for"),n(" Network "),s("span",{class:"token builtin"},"File"),n(" System "),s("span",{class:"token punctuation"},"("),s("span",{class:"token constant"},"NFS"),s("span",{class:"token punctuation"},")"),s("span",{class:"token punctuation"},","),n(` it must be
documented with the `),s("span",{class:"token constant"},"ISSO"),s("span",{class:"token punctuation"},"."),n(`
  "
  impact `),s("span",{class:"token number"},"0.5"),n(`
  tag severity`),s("span",{class:"token operator"},":"),n(),s("span",{class:"token string-literal"},[s("span",{class:"token string"},"'medium'")]),n(`
  tag gtitle`),s("span",{class:"token operator"},":"),n(),s("span",{class:"token string-literal"},[s("span",{class:"token string"},"'SRG-OS-000114-GPOS-00059'")]),n(`
  tag gid`),s("span",{class:"token operator"},":"),n(),s("span",{class:"token string-literal"},[s("span",{class:"token string"},"'V-230502'")]),n(`
  tag rid`),s("span",{class:"token operator"},":"),n(),s("span",{class:"token string-literal"},[s("span",{class:"token string"},"'SV-230502r627750_rule'")]),n(`
  tag stig_id`),s("span",{class:"token operator"},":"),n(),s("span",{class:"token string-literal"},[s("span",{class:"token string"},"'RHEL-08-040070'")]),n(`
  tag fix_id`),s("span",{class:"token operator"},":"),n(),s("span",{class:"token string-literal"},[s("span",{class:"token string"},"'F-33146r568253_fix'")]),n(`
  tag cci`),s("span",{class:"token operator"},":"),n(),s("span",{class:"token punctuation"},"["),s("span",{class:"token string-literal"},[s("span",{class:"token string"},"'CCI-000778'")]),s("span",{class:"token punctuation"},"]"),n(`
  tag nist`),s("span",{class:"token operator"},":"),n(),s("span",{class:"token punctuation"},"["),s("span",{class:"token string-literal"},[s("span",{class:"token string"},"'IA-3'")]),s("span",{class:"token punctuation"},"]"),n(`

  `),s("span",{class:"token comment"},"# ...add your describe blocks here ... #"),n(`

`),s("span",{class:"token keyword"},"end"),n(`
`)])]),s("div",{class:"line-numbers","aria-hidden":"true"},[s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"})])],-1),J=s("div",{class:"language-ruby line-numbers-mode","data-ext":"rb","data-title":"rb"},[s("pre",{class:"language-ruby"},[s("code",null,[n("control "),s("span",{class:"token string-literal"},[s("span",{class:"token string"},"'SV-230502'")]),n(),s("span",{class:"token keyword"},"do"),n(`
  title `),s("span",{class:"token string-literal"},[s("span",{class:"token string"},"'The RHEL 8 file system automounter must be disabled unless required.'")]),n(`
  desc  "Automatically mounting file systems permits easy introduction of
unknown devices`),s("span",{class:"token punctuation"},","),n(" thereby facilitating malicious activity"),s("span",{class:"token punctuation"},"."),n(`"
  desc  `),s("span",{class:"token string-literal"},[s("span",{class:"token string"},"'rationale'")]),s("span",{class:"token punctuation"},","),n(),s("span",{class:"token string-literal"},[s("span",{class:"token string"},"''")]),n(`
  desc  `),s("span",{class:"token string-literal"},[s("span",{class:"token string"},"'check'")]),s("span",{class:"token punctuation"},","),n(` "
    Verify the operating system disables the ability to automount devices`),s("span",{class:"token punctuation"},"."),n(`

    Check to see `),s("span",{class:"token keyword"},"if"),n(" automounter service is active with the following command"),s("span",{class:"token operator"},":"),n(`

    `),s("span",{class:"token symbol"},"Note"),s("span",{class:"token operator"},":"),n(" If the autofs service is "),s("span",{class:"token keyword"},"not"),n(" installed"),s("span",{class:"token punctuation"},","),n(" this requirement is "),s("span",{class:"token keyword"},"not"),n(`
applicable`),s("span",{class:"token punctuation"},"."),n(`

    $ sudo systemctl status autofs

    autofs`),s("span",{class:"token punctuation"},"."),n("service "),s("span",{class:"token operator"},"-"),n(` Automounts filesystems on demand
    `),s("span",{class:"token symbol"},"Loaded"),s("span",{class:"token operator"},":"),n(" loaded "),s("span",{class:"token punctuation"},"("),s("span",{class:"token operator"},"/"),n("usr"),s("span",{class:"token operator"},"/"),n("lib"),s("span",{class:"token operator"},"/"),n("systemd"),s("span",{class:"token operator"},"/"),n("system"),s("span",{class:"token operator"},"/"),n("autofs"),s("span",{class:"token punctuation"},"."),n("service"),s("span",{class:"token punctuation"},";"),n(" disabled"),s("span",{class:"token punctuation"},")"),n(`
    `),s("span",{class:"token symbol"},"Active"),s("span",{class:"token operator"},":"),n(" inactive "),s("span",{class:"token punctuation"},"("),n("dead"),s("span",{class:"token punctuation"},")"),n(`

    If the \\"autofs\\" status is set to \\"active\\" `),s("span",{class:"token keyword"},"and"),n(" is "),s("span",{class:"token keyword"},"not"),n(` documented with
the Information System Security Officer `),s("span",{class:"token punctuation"},"("),s("span",{class:"token constant"},"ISSO"),s("span",{class:"token punctuation"},")"),n(" as an operational requirement"),s("span",{class:"token punctuation"},","),n(`
this is a finding`),s("span",{class:"token punctuation"},"."),n(`
  "
  desc `),s("span",{class:"token string-literal"},[s("span",{class:"token string"},"'fix'")]),s("span",{class:"token punctuation"},","),n(` "
    Configure the operating system to disable the ability to automount devices`),s("span",{class:"token punctuation"},"."),n(`

    Turn off the automount service with the following commands`),s("span",{class:"token operator"},":"),n(`

    $ sudo systemctl stop autofs
    $ sudo systemctl disable autofs

    If \\"autofs\\" is required `),s("span",{class:"token keyword"},"for"),n(" Network "),s("span",{class:"token builtin"},"File"),n(" System "),s("span",{class:"token punctuation"},"("),s("span",{class:"token constant"},"NFS"),s("span",{class:"token punctuation"},")"),s("span",{class:"token punctuation"},","),n(` it must be
documented with the `),s("span",{class:"token constant"},"ISSO"),s("span",{class:"token punctuation"},"."),n(`
  "
  impact `),s("span",{class:"token number"},"0.5"),n(`
  tag severity`),s("span",{class:"token operator"},":"),n(),s("span",{class:"token string-literal"},[s("span",{class:"token string"},"'medium'")]),n(`
  tag gtitle`),s("span",{class:"token operator"},":"),n(),s("span",{class:"token string-literal"},[s("span",{class:"token string"},"'SRG-OS-000114-GPOS-00059'")]),n(`
  tag gid`),s("span",{class:"token operator"},":"),n(),s("span",{class:"token string-literal"},[s("span",{class:"token string"},"'V-230502'")]),n(`
  tag rid`),s("span",{class:"token operator"},":"),n(),s("span",{class:"token string-literal"},[s("span",{class:"token string"},"'SV-230502r627750_rule'")]),n(`
  tag stig_id`),s("span",{class:"token operator"},":"),n(),s("span",{class:"token string-literal"},[s("span",{class:"token string"},"'RHEL-08-040070'")]),n(`
  tag fix_id`),s("span",{class:"token operator"},":"),n(),s("span",{class:"token string-literal"},[s("span",{class:"token string"},"'F-33146r568253_fix'")]),n(`
  tag cci`),s("span",{class:"token operator"},":"),n(),s("span",{class:"token punctuation"},"["),s("span",{class:"token string-literal"},[s("span",{class:"token string"},"'CCI-000778'")]),s("span",{class:"token punctuation"},"]"),n(`
  tag nist`),s("span",{class:"token operator"},":"),n(),s("span",{class:"token punctuation"},"["),s("span",{class:"token string-literal"},[s("span",{class:"token string"},"'IA-3'")]),s("span",{class:"token punctuation"},"]"),n(`

  `),s("span",{class:"token keyword"},"if"),n(" virtualization"),s("span",{class:"token punctuation"},"."),n("system"),s("span",{class:"token punctuation"},"."),n("eql"),s("span",{class:"token operator"},"?"),s("span",{class:"token punctuation"},"("),s("span",{class:"token string-literal"},[s("span",{class:"token string"},"'docker'")]),s("span",{class:"token punctuation"},")"),n(`
    impact `),s("span",{class:"token number"},"0.0"),n(`
    describe `),s("span",{class:"token string-literal"},[s("span",{class:"token string"},'"Control not applicable within a container"')]),n(),s("span",{class:"token keyword"},"do"),n(`
      skip `),s("span",{class:"token string-literal"},[s("span",{class:"token string"},'"Control not applicable within a container"')]),n(`
    `),s("span",{class:"token keyword"},"end"),n(`
  `),s("span",{class:"token keyword"},"else"),n(`
    `),s("span",{class:"token keyword"},"if"),n(" package"),s("span",{class:"token punctuation"},"("),s("span",{class:"token string-literal"},[s("span",{class:"token string"},"'autofs'")]),s("span",{class:"token punctuation"},")"),s("span",{class:"token punctuation"},"."),n("installed"),s("span",{class:"token operator"},"?"),n(`
      describe systemd_service`),s("span",{class:"token punctuation"},"("),s("span",{class:"token string-literal"},[s("span",{class:"token string"},"'autofs.service'")]),s("span",{class:"token punctuation"},")"),n(),s("span",{class:"token keyword"},"do"),n(`
        it `),s("span",{class:"token punctuation"},"{"),n(" should_not be_running "),s("span",{class:"token punctuation"},"}"),n(`
        it `),s("span",{class:"token punctuation"},"{"),n(" should_not be_enabled "),s("span",{class:"token punctuation"},"}"),n(`
        it `),s("span",{class:"token punctuation"},"{"),n(" should_not be_installed "),s("span",{class:"token punctuation"},"}"),n(`
      `),s("span",{class:"token keyword"},"end"),n(`
    `),s("span",{class:"token keyword"},"else"),n(`
      impact `),s("span",{class:"token number"},"0.0"),n(`
      describe `),s("span",{class:"token string-literal"},[s("span",{class:"token string"},"'The autofs service is not installed'")]),n(),s("span",{class:"token keyword"},"do"),n(`
        skip `),s("span",{class:"token string-literal"},[s("span",{class:"token string"},"'The autofs service is not installed, this control is Not Applicable.'")]),n(`
      `),s("span",{class:"token keyword"},"end"),n(`
    `),s("span",{class:"token keyword"},"end"),n(`
  `),s("span",{class:"token keyword"},"end"),n(`
`),s("span",{class:"token keyword"},"end"),n(`
`)])]),s("div",{class:"line-numbers","aria-hidden":"true"},[s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"}),s("div",{class:"line-number"})])],-1),Q=s("div",{class:"hint-container warning"},[s("p",{class:"hint-container-title"},"Where did the metadata tags come from?"),s("p",null,[n("From the structured data inside the published STIG document's XCCDF XML file. The "),s("code",null,"saf generate"),n(" tool simply reformats it into an InSpec control.")])],-1),Z={class:"hint-container warning"},ss=s("p",{class:"hint-container-title"},"Where did the describe block come from?",-1),ns={href:"https://github.com/mitre/redhat-enterprise-linux-8-stig-baseline/blob/main/controls/SV-230502.rb",target:"_blank",rel:"noopener noreferrer"},es=s("em",null,"entities",-1),ls=s("em",null,"expectations",-1),as=s("code",null,"describe",-1),ts=s("p",null,[n("You may note that these InSpec controls feature a set of metadata tags -- impact, severity, and alignment back to requirements such as a NIST control family. All of that metadata was taken from the original XCCDF document that we used to create this profile; the SAF CLI automatically added it to the profile controls. These tags are the reason that tools like Heimdall can sort and display data in high fidelity. This is the benefit of using the SAF CLI to generate profiles straight off of the original benchmark documentation where possible -- tagging the controls with the requirement that they are testing means that reading a control will tell you not only "),s("em",null,"what"),n(" you are testing, but "),s("em",null,"why"),n("!")],-1),rs={class:"hint-container tip"},is=s("p",{class:"hint-container-title"},"STIGs",-1);function os(cs,bs){const r=o("ExternalLinkIcon"),i=o("CodeTabs"),b=o("RouterLink");return p(),d("div",null,[k,S,s("details",V,[g,s("p",null,[n("Taken from the "),s("a",f,[n("SAF RHEL7 profile"),t(r)]),n(":")]),_,s("p",null,[n("We "),w,n(" do not want to stuck with labeling all of these controls by hand. Let's cheat and use the "),s("a",y,[n("SAF CLI"),t(r)]),n(" benchmark generator.")]),I,x,s("p",null,[n("Download the latest STIG Viewer located here "),s("a",C,[n("STIG Viewer"),t(r)]),n(".")]),T,s("p",null,[n("Download the "),A,n(" located here "),s("a",L,[n("RHEL8 STIG Download"),t(r)])]),G]),F,s("p",null,[n("To learn how you can use the "),O,n(" or any other "),D,n(" cli command, go to the "),s("a",R,[n("saf-cli homepage"),t(r)]),n(" or use the help commands. An example help command to generate the stubs of the InSpec profile is below.")]),t(i,{id:"50",data:[{id:"Command"},{id:"Output"}],"tab-id":"shell"},{title0:e(({value:l,isActive:a})=>[n("Command")]),title1:e(({value:l,isActive:a})=>[n("Output")]),tab0:e(({value:l,isActive:a})=>[E]),tab1:e(({value:l,isActive:a})=>[X]),_:1}),q,s("p",null,[n("We have a pre-made profile generated with the "),P,n(" command sitting on the "),s("a",H,[n("Resources"),t(r)]),n(" page for these classes. For the purposes of this class, you'll need to download it into your Codespaces library. You can do this with the "),N,n(" shell command.")]),t(i,{id:"64",data:[{id:"Fetching the pre-made profile with <code v-pre>wget</code>"},{id:"Output"}],"tab-id":"shell"},{title0:e(({value:l,isActive:a})=>[n("Fetching the pre-made profile with "),z]),title1:e(({value:l,isActive:a})=>[n("Output")]),tab0:e(({value:l,isActive:a})=>[B]),tab1:e(({value:l,isActive:a})=>[$]),_:1}),U,t(i,{id:"75",data:[{id:"Uncompressing the profile"},{id:"Output"}],"tab-id":"shell"},{title0:e(({value:l,isActive:a})=>[n("Uncompressing the profile")]),title1:e(({value:l,isActive:a})=>[n("Output")]),tab0:e(({value:l,isActive:a})=>[M]),tab1:e(({value:l,isActive:a})=>[W]),_:1}),K,Y,t(i,{id:"89",data:[{id:"Stub Generated InSpec Control"},{id:"Completed InSpec Control"}],"tab-id":"shell"},{title0:e(({value:l,isActive:a})=>[n("Stub Generated InSpec Control")]),title1:e(({value:l,isActive:a})=>[n("Completed InSpec Control")]),tab0:e(({value:l,isActive:a})=>[j]),tab1:e(({value:l,isActive:a})=>[J]),_:1}),Q,s("div",Z,[ss,s("p",null,[n("From the real "),s("a",ns,[n("MITRE SAF RHEL8 InSpec profile"),t(r)]),n(". Note that the control accounts for a few more edge cases than what we've done in this class, but it's still recognizably just a bunch of "),es,n(" and "),ls,n(" wrapped in "),as,n(" blocks.")])]),ts,s("div",rs,[is,s("p",null,[n("For more background on STIGs, see the "),t(b,{to:"/courses/guidance/03.html"},{default:e(()=>[n("SAF Guidance content")]),_:1}),n(".")])])])}const ds=u(v,[["render",os],["__file","11.html.vue"]]);export{ds as default};
