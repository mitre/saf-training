import{_ as t}from"./plugin-vue_export-helper-DlAUqK2U.js";import{e as o,f as n,o as i}from"./app-DjCdDQJ2.js";const a="/saf-training/assets/updated_project_view-CcbU-ma3.png",r="/saf-training/assets/export_buttons-uwAOcIx3.png",s="/saf-training/assets/duplicate-xTWdPQxg.png",l="/saf-training/assets/editing_duplicate-B0JnsFy3.png",p="/saf-training/assets/diff-CZEMmsRE.png",c={};function h(u,e){return i(),o("div",null,e[0]||(e[0]=[n('<h2 id="_12-1-exporting-your-content" tabindex="-1"><a class="header-anchor" href="#_12-1-exporting-your-content"><span>12.1 Exporting Your Content</span></a></h2><p>At this point, we have tailored two requirements from the original SRG into STIG-ready content, marked one as also satisfying another requirement, and peer reviewed them. Let&#39;s imagine that our team has completed the process of tailoring each SRG requirement into a STIG requirment, and that each requirement has been peer reviewed. Perhaps we have even already created some automation for these requirements. In other words, we have a complete security guidance document!</p><p>Let&#39;s discuss what we can do with our components after we finish the requirement writing and reviewing.</p><h2 id="_12-2-exporting-the-guidance-document" tabindex="-1"><a class="header-anchor" href="#_12-2-exporting-the-guidance-document"><span>12.2 Exporting the Guidance Document</span></a></h2><p>We have a few ways of exporting the content from Vulcan once it is written.</p><p>Use the &quot;Projects&quot; link in the Vulcan navbar to return to the projects list page. Then click on your RHEL9 project to return to your project view.</p><figure><img src="'+a+'" alt="Updated Project" tabindex="0" loading="lazy"><figcaption>Updated Project</figcaption></figure><p>On the right-hand side, the overall project summary now reflects that we made edits. You&#39;ll see a number of buttons alongside the bottom of the Component we have been editing.</p><figure><img src="'+r+'" alt="Export Buttons" tabindex="0" loading="lazy"><figcaption>Export Buttons</figcaption></figure><p>From left to right, those buttons will:</p><ul><li>Lock all Component controls from further editing</li><li>Export the Component&#39;s InSpec code as an archive of an InSpec profile</li><li>Export the Component as an XCCDF XML file</li><li>Export the Component as a comma-separated values file (CSV)</li><li>Release the Component -- note that this option is not enabled unless all controls have been locked from further editing</li><li>Duplicate the Component -- this creates a copy of the Component within the same Project; useful for creating a new release of the same Component without having to change the original</li><li>Remove the Component -- Careful with this one!</li><li>Open the Component -- Takes us to the editing screen</li></ul><h3 id="_12-2-1-notes-on-releasing" tabindex="-1"><a class="header-anchor" href="#_12-2-1-notes-on-releasing"><span>12.2.1 Notes on Releasing</span></a></h3><p>A component can only be released if every requirement is locked. Requirements are only locked from further editing when they have undergone peer review, or when someone with administrator permissions locks a requirement regardless of review status. Note that even admins cannot lock a requirement unless it at least has a status determination (i.e. it is set to a status other than &quot;Not Yet Determined,&quot; so we cannot lock our RHEL9 component just yet). Therefore, releasing a component should only happen when all authorship is complete.</p><div class="hint-container tip"><p class="hint-container-title">Importing a Released Component</p><p>Once a Component is released, it can be imported into a different Vulcan project as a building block.</p><p>One of our purposes with Vulcan is to avoid duplicating effort wherever possible; if the guidance is already written, we want to be able to access it!</p></div><h3 id="_12-2-2-notes-on-exporting" tabindex="-1"><a class="header-anchor" href="#_12-2-2-notes-on-exporting"><span>12.2.2 Notes on Exporting</span></a></h3><p>Unlike a formal release, the Component does not need to be locked to be exported (in any format). You are not required to keep your editing workflow inside Vulcan (though we do, of course, recommend keeping your workflow inside Vulcan where you can).</p><div class="hint-container note"><p class="hint-container-title">Note</p><p>This means, for example, that we can export our InSpec profile regularly to test our code against test systems throughout the authorship process.</p><p>We can also export the InSpec profile for a Component even if we haven&#39;t written a single line of InSpec code for it. Recall that Vulcan can automatically use our security documentation to create metadata for automated tests. Exporting the profile will give you a &quot;skeleton&quot; profile that has files for each requirement with the metadata tags applied correctly; this alone can be a huge time saver!</p></div><h2 id="_12-3-diff-viewer" tabindex="-1"><a class="header-anchor" href="#_12-3-diff-viewer"><span>12.3 Diff Viewer</span></a></h2><p>We have spent quite a bit of time discussing how to use Vulcan to make initial authorship easier. However, Vulcan also has features intended to make the maintenace of your guidance documentation easier.</p><p>This is why we have a Duplicate Component button available on the Component card, for example.</p><h3 id="_12-3-1-creating-a-different-component" tabindex="-1"><a class="header-anchor" href="#_12-3-1-creating-a-different-component"><span>12.3.1 Creating a Different Component</span></a></h3><p>We will not be releasing the Component in this class because that would require us to at least have made a Status Determination for each requirement. We can, however, create a Duplicate of the component. Let&#39;s do that now.</p><div class="hint-container note"><p class="hint-container-title">Why are we duplicating the Component?</p><p>In a complex system with many software components, it may make sense to create multiple Components in one project, all of which have a shared source SRG.</p><p>For this example, we are duplicating the Component to mimic the release process.</p></div><p>Click the &quot;Duplicate the Component&quot; button on your Component for RHEL9. You will see a pop-up that is similar to the one you saw when creating the first Component from an SRG.</p><figure><img src="'+s+'" alt="Duplicating a Component" tabindex="0" loading="lazy"><figcaption>Duplicating a Component</figcaption></figure><p>This time, we want to mark this Component as Version 1, Release 2, to represent the next release of STIG-ready content for the same software. Since we have created a new Component, we should change something inside it. Let&#39;s open up the component and edit another one of the controls. Any will do.</p><figure><img src="'+l+'" alt="Editing the Duplicate" tabindex="0" loading="lazy"><figcaption>Editing the Duplicate</figcaption></figure><p>Save the edit, just like you would in the first release. Go back to the Project page and click the Diff Viewer tab. You&#39;ll get a menu asking you which two Components you want to compare.</p><p>Let&#39;s pick our two different releases of our RHEL9 component (make sure you pick your own project&#39;s RHEL9 component if you are using the training class instance of Vulcan). We get a side-by side comparison view of our components, highlighting changes.</p><figure><img src="'+p+'" alt="Diff Viewer - Comparison" tabindex="0" loading="lazy"><figcaption>Diff Viewer - Comparison</figcaption></figure><p>Duplicating a Component automatically generates empty InSpec stubs inside the new component, but a new-from-scratch Component does not automatically generate InSpec code. This is why the Diff viewer shows no InSpec code in the V1R1 version of the document, and why it believes that <em>every</em> requirement has a change. Note also that we are actually comparing the InSpec code for each requirement so that we can take advantage of the style of comparison used by code editors.</p><div class="hint-container tip"><p class="hint-container-title">How do I use this?</p><p>The Diff Viewer&#39;s main use is for comparing completed released components. You can compare releases to tell at a glance what has changed in a piece of guidance, which traditionally would require tracking everything in a changelog manually.</p></div><p>At this point, we have gone over most of the processes you would use in Vulcan to develop your own security guidance content. To close, let&#39;s review the process for formally publishing a STIG.</p>',33)]))}const g=t(c,[["render",h],["__file","12.html.vue"]]),f=JSON.parse('{"path":"/courses/guidance/12.html","title":"12. Exporting Your Content","lang":"en-US","frontmatter":{"order":12,"next":"13.md","title":"12. Exporting Your Content","author":"Will Dower","headerDepth":3,"description":"12.1 Exporting Your Content At this point, we have tailored two requirements from the original SRG into STIG-ready content, marked one as also satisfying another requirement, an...","head":[["meta",{"property":"og:url","content":"https://mitre.github.io/saf-training/saf-training/courses/guidance/12.html"}],["meta",{"property":"og:site_name","content":"MITRE SAF Training"}],["meta",{"property":"og:title","content":"12. Exporting Your Content"}],["meta",{"property":"og:description","content":"12.1 Exporting Your Content At this point, we have tailored two requirements from the original SRG into STIG-ready content, marked one as also satisfying another requirement, an..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"en-US"}],["meta",{"property":"og:updated_time","content":"2024-12-03T13:43:25.000Z"}],["meta",{"property":"article:author","content":"Will Dower"}],["meta",{"property":"article:modified_time","content":"2024-12-03T13:43:25.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"12. Exporting Your Content\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-12-03T13:43:25.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Will Dower\\"}]}"]]},"headers":[{"level":2,"title":"12.1 Exporting Your Content","slug":"_12-1-exporting-your-content","link":"#_12-1-exporting-your-content","children":[]},{"level":2,"title":"12.2 Exporting the Guidance Document","slug":"_12-2-exporting-the-guidance-document","link":"#_12-2-exporting-the-guidance-document","children":[{"level":3,"title":"12.2.1 Notes on Releasing","slug":"_12-2-1-notes-on-releasing","link":"#_12-2-1-notes-on-releasing","children":[]},{"level":3,"title":"12.2.2 Notes on Exporting","slug":"_12-2-2-notes-on-exporting","link":"#_12-2-2-notes-on-exporting","children":[]}]},{"level":2,"title":"12.3 Diff Viewer","slug":"_12-3-diff-viewer","link":"#_12-3-diff-viewer","children":[{"level":3,"title":"12.3.1 Creating a Different Component","slug":"_12-3-1-creating-a-different-component","link":"#_12-3-1-creating-a-different-component","children":[]}]}],"git":{"createdTime":1698897636000,"updatedTime":1733233405000,"contributors":[{"name":"wdower","username":"wdower","email":"57142072+wdower@users.noreply.github.com","commits":2,"url":"https://github.com/wdower"},{"name":"Emily Rodriguez","username":"Emily Rodriguez","email":"32680215+em-c-rod@users.noreply.github.com","commits":3,"url":"https://github.com/Emily Rodriguez"},{"name":"Aaron Lippold","username":"Aaron Lippold","email":"lippold@gmail.com","commits":2,"url":"https://github.com/Aaron Lippold"},{"name":"Emily Rodriguez","username":"Emily Rodriguez","email":"ecrodriguez@mitre.org","commits":1,"url":"https://github.com/Emily Rodriguez"},{"name":"Shivani Karikar","username":"Shivani Karikar","email":"karikarshivani@gmail.com","commits":1,"url":"https://github.com/Shivani Karikar"}]},"readingTime":{"minutes":3.58,"words":1073},"filePathRelative":"courses/guidance/12.md","localizedDate":"November 2, 2023","autoDesc":true}');export{g as comp,f as data};
