import{_ as t}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,a as i,o}from"./app-orp5zc-h.js";const r="/saf-training/assets/SAF_Capabilities_Normalize-CDQSPFBh.png",l="/saf-training/assets/Heimdall_Samples-CbXlu8qY.png",n="/saf-training/assets/Heimdall_Samples_Select-Bfu1UPgl.png",s="/saf-training/assets/Heimdall_TreeMap_Fuller-HBt2vx-h.png",m="/saf-training/assets/Heimdall_MultiResults2-BQh35Umf.png",p="/saf-training/assets/Heimdall_MultiResults-4lZRh-0U.png",c="/saf-training/assets/Heimdall_Export_Menu-DMaMcNaE.png",h={};function u(d,e){return o(),a("div",null,e[0]||(e[0]=[i('<h2 id="_14-1-normalize" tabindex="-1"><a class="header-anchor" href="#_14-1-normalize"><span>14.1 Normalize</span></a></h2><p>Remember the &quot;Normalize&quot; pillar? We skipped over it when we were doing InSpec validation because InSpec results are automatically in OHDF (or Oasis Heimdall Data Format).</p><figure><img src="'+r+'" alt="The Normalize Capability" tabindex="0" loading="lazy"><figcaption>The Normalize Capability</figcaption></figure><p>However, other tools provide useful security data that is not inherent in OHDF. So, to make a full picture of security, we have converters to convert third-party data to OHDF and OHDF back into other forms.</p><h2 id="_14-2-convert-with-saf-cli" tabindex="-1"><a class="header-anchor" href="#_14-2-convert-with-saf-cli"><span>14.2 Convert with SAF CLI</span></a></h2><p>The SAF CLI has utilities to convert files from one output to another. Take a look at the ever-growing list of compatible file types at the <a href="https://saf-cli.mitre.org/" target="_blank" rel="noopener noreferrer">SAF CLI README</a>.</p><h2 id="_14-3-convert-with-heimdall" tabindex="-1"><a class="header-anchor" href="#_14-3-convert-with-heimdall"><span>14.3 Convert with Heimdall</span></a></h2><p>However, you Heimdall can also auto-convert uploaded files in compatible formats, giving you another way to convert data and look at the whole picture at one time.</p><p>Test this out by adding sample files of other data in Heimdall.</p><figure><img src="'+l+'" alt="The Samples View" tabindex="0" loading="lazy"><figcaption>The Samples View</figcaption></figure><p>Choose some sample data to add to the full security of a theoretical software stack.</p><figure><img src="'+n+'" alt="Picking a Sample" tabindex="0" loading="lazy"><figcaption>Picking a Sample</figcaption></figure><h2 id="_14-4-visualize-the-big-picture" tabindex="-1"><a class="header-anchor" href="#_14-4-visualize-the-big-picture"><span>14.4 Visualize the Big Picture</span></a></h2><p>As you add all of this data into one view, you can see how the NIST 800-53 controls are more filled out as more items are covered by different types of security scans.</p><figure><img src="'+s+'" alt="The Tree Map" tabindex="0" loading="lazy"><figcaption>The Tree Map</figcaption></figure><p>In this big-picture view, you can see the whole security posture and filter down, for example, on high failures across all scans. <em>Your results may look different than these pictures depending on what you have loaded in Heimdall</em></p><figure><img src="'+m+'" alt="Loading Multiple Results Files" tabindex="0" loading="lazy"><figcaption>Loading Multiple Results Files</figcaption></figure><p>And in the details of the results, you can see what file - in other words, what scan or part of the system, is causing the problem.</p><figure><img src="'+p+'" alt="Results Details from Multiple Sources" tabindex="0" loading="lazy"><figcaption>Results Details from Multiple Sources</figcaption></figure><h2 id="_14-5-export-data-to-other-formats" tabindex="-1"><a class="header-anchor" href="#_14-5-export-data-to-other-formats"><span>14.5 Export Data To Other Formats</span></a></h2><p>This is a two-way street! There are other places security data needs to be - maybe in Splunk, eMASS, AWS Security Hub, or even just in an easy, high-level diagram to show your boss. Because of this, Heimdall can also export data into different forms using the &quot;Export&quot; button in the top right. Try out some of these forms on your results!</p><figure><img src="'+c+'" alt="The Export Menu" tabindex="0" loading="lazy"><figcaption>The Export Menu</figcaption></figure>',22)]))}const w=t(h,[["render",u],["__file","14.html.vue"]]),y=JSON.parse('{"path":"/courses/user/14.html","title":"14. Normalize Other Data!","lang":"en-US","frontmatter":{"order":14,"next":"15.md","title":"14. Normalize Other Data!","author":"Emily Rodriguez","headerDepth":3,"description":"14.1 Normalize Remember the \\"Normalize\\" pillar? We skipped over it when we were doing InSpec validation because InSpec results are automatically in OHDF (or Oasis Heimdall Data ...","head":[["meta",{"property":"og:url","content":"https://mitre.github.io/saf-training/saf-training/courses/user/14.html"}],["meta",{"property":"og:site_name","content":"MITRE SAF Training"}],["meta",{"property":"og:title","content":"14. Normalize Other Data!"}],["meta",{"property":"og:description","content":"14.1 Normalize Remember the \\"Normalize\\" pillar? We skipped over it when we were doing InSpec validation because InSpec results are automatically in OHDF (or Oasis Heimdall Data ..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"en-US"}],["meta",{"property":"og:updated_time","content":"2024-12-09T04:38:58.000Z"}],["meta",{"property":"article:author","content":"Emily Rodriguez"}],["meta",{"property":"article:modified_time","content":"2024-12-09T04:38:58.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"14. Normalize Other Data!\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-12-09T04:38:58.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Emily Rodriguez\\"}]}"]]},"headers":[{"level":2,"title":"14.1 Normalize","slug":"_14-1-normalize","link":"#_14-1-normalize","children":[]},{"level":2,"title":"14.2 Convert with SAF CLI","slug":"_14-2-convert-with-saf-cli","link":"#_14-2-convert-with-saf-cli","children":[]},{"level":2,"title":"14.3 Convert with Heimdall","slug":"_14-3-convert-with-heimdall","link":"#_14-3-convert-with-heimdall","children":[]},{"level":2,"title":"14.4 Visualize the Big Picture","slug":"_14-4-visualize-the-big-picture","link":"#_14-4-visualize-the-big-picture","children":[]},{"level":2,"title":"14.5 Export Data To Other Formats","slug":"_14-5-export-data-to-other-formats","link":"#_14-5-export-data-to-other-formats","children":[]}],"git":{"createdTime":1656525471000,"updatedTime":1733719138000,"contributors":[{"name":"Shivani Karikar","username":"Shivani Karikar","email":"karikarshivani@gmail.com","commits":2,"url":"https://github.com/Shivani Karikar"},{"name":"p-oneil","username":"p-oneil","email":"poneil@mitre.org","commits":1,"url":"https://github.com/p-oneil"},{"name":"Aaron Lippold","username":"Aaron Lippold","email":"lippold@gmail.com","commits":2,"url":"https://github.com/Aaron Lippold"},{"name":"Will","username":"Will","email":"will@dower.dev","commits":1,"url":"https://github.com/Will"},{"name":"dependabot[bot]","username":"dependabot[bot]","email":"49699333+dependabot[bot]@users.noreply.github.com","commits":1,"url":"https://github.com/dependabot[bot]"},{"name":"wdower","username":"wdower","email":"57142072+wdower@users.noreply.github.com","commits":1,"url":"https://github.com/wdower"},{"name":"wdower","username":"wdower","email":"will@dower.dev","commits":1,"url":"https://github.com/wdower"},{"name":"Emily Rodriguez","username":"Emily Rodriguez","email":"ecrodriguez@mm279976-pc.lan","commits":7,"url":"https://github.com/Emily Rodriguez"}]},"readingTime":{"minutes":1.27,"words":382},"filePathRelative":"courses/user/14.md","localizedDate":"June 29, 2022","autoDesc":true}');export{w as comp,y as data};