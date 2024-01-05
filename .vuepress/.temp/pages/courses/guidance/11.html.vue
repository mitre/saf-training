<template><div><h2 id="_11-1-exporting-your-content" tabindex="-1"><a class="header-anchor" href="#_11-1-exporting-your-content" aria-hidden="true">#</a> 11.1 Exporting Your Content</h2>
<p>At this point, we have tailored two requirements from the original SRG into STIG-ready content, and discussed how to peer review them.</p>
<p>Let's discuss what we can do with our components after we finish the requirement writing and reviewing.</p>
<h2 id="_11-2-exporting-the-guidance-document" tabindex="-1"><a class="header-anchor" href="#_11-2-exporting-the-guidance-document" aria-hidden="true">#</a> 11.2 Exporting the Guidance Document</h2>
<p>We have a few ways of exporting the content from Vulcan once it is written.</p>
<ol>
<li>Use the &quot;Projects&quot; link in the Vulcan navbar to return to the projects list page. Then click on your RHEL9 project to return to your project view.</li>
</ol>
<figure><img src="@source/assets/img/updated_project_view.png" alt="Updated Project" tabindex="0" loading="lazy"><figcaption>Updated Project</figcaption></figure>
<p>Notice on the right-hand side that the overall project summary now reflects that we made edits.</p>
<ol start="2">
<li>You'll see a number of buttons alongside the bottom of the Component we have been editing.</li>
</ol>
<figure><img src="@source/assets/img/export_buttons.png" alt="Export Buttons" tabindex="0" loading="lazy"><figcaption>Export Buttons</figcaption></figure>
<p>From left to right, those buttons will:</p>
<ul>
<li>Lock all Component controls from further editing</li>
<li>Export the Component's InSpec code as a .zip of an InSpec profile</li>
<li>Export the Component as a comma-separated values file (CSV)</li>
<li>Release the Component -- note that this option is not enabled unless all controls have been locked from further editing</li>
<li>Duplicate the Component -- this creates a copy of the Component within the same Project; useful for creating a new release of the same Component without having to change the original</li>
<li>Remove the Component -- Careful with this one!</li>
<li>Open the Component -- Takes us to the editing screen</li>
</ul>
<h3 id="_11-2-1-notes-on-releasing" tabindex="-1"><a class="header-anchor" href="#_11-2-1-notes-on-releasing" aria-hidden="true">#</a> 11.2.1 Notes on Releasing</h3>
<p>A component can only be released if every requirement is locked. Requirements are only locked from further editing when they have undergone peer review. Therefore, releasing a component should only happen when all authorship is complete.</p>
<div class="hint-container tip">
<p class="hint-container-title">Importing a Released Component</p>
<p>Once a Component is released, it can be imported into a different Vulcan project as a building block.</p>
<p>One of our purposes with Vulcan is to avoid duplicating effort wherever possible; if the guidannce is already written, we want to be able to access it!</p>
</div>
<h3 id="_11-2-2-notes-on-exporting" tabindex="-1"><a class="header-anchor" href="#_11-2-2-notes-on-exporting" aria-hidden="true">#</a> 11.2.2 Notes on Exporting</h3>
<p>Unlike formal release, the Component does not need to be locked to be exported (in any format). You are not required to keep your editing workflow inside Vulcan (though we do, of course, recommend keeping your workflow inside Vulcan where you can).</p>
<div class="hint-container note">
<p class="hint-container-title">Note</p>
<p>This means, for example, that we can export our InSpec profile regularly to test our code against test systems throughout the authorship process.</p>
</div>
<h2 id="_11-3-diff-viewer" tabindex="-1"><a class="header-anchor" href="#_11-3-diff-viewer" aria-hidden="true">#</a> 11.3 Diff Viewer</h2>
<p>We have spent quite a bit of time discussing how to use Vulcan to make initial authorship easier. However, Vulcan also has features intended to make the maintenace of your guidance documentation easier.</p>
<p>This is why we have a Duplicate Component button available on the Component card, for example.</p>
<h3 id="_11-3-1-creating-a-different-component" tabindex="-1"><a class="header-anchor" href="#_11-3-1-creating-a-different-component" aria-hidden="true">#</a> 11.3.1 Creating a Different Component</h3>
<p>We will not be releasing the Component in this class because that would require us to at least have made a Status Determination for each requirement. We can, however, create a Duplicate of the component. Let's do that now.</p>
<div class="hint-container note">
<p class="hint-container-title">Why are we duplicating the Component?</p>
<p>In a complex system with many software components, it may make sense to create multiple Components in one project, all of which have a shared source SRG.</p>
<p>For this example, we are duplicating the Component to mimic the release process.</p>
</div>
<ol start="3">
<li>Click the &quot;Duplicate the Component&quot; button on your Component for RHEL9. You will see a pop-up that is similar to the one you saw when creating the first Component from an SRG.</li>
</ol>
<figure><img src="@source/assets/img/duplicate.png" alt="Duplicating a Component" tabindex="0" loading="lazy"><figcaption>Duplicating a Component</figcaption></figure>
<p>This time, we want to mark this Component as Version 1, Release 2.</p>
<ol start="4">
<li>Since we have created a new Component, we should change something inside it.</li>
</ol>
<p>Let's open up the component and edit another one of the controls. Any will do.</p>
<figure><img src="@source/assets/img/editing_duplicate.png" alt="Editig the Duplicate" tabindex="0" loading="lazy"><figcaption>Editig the Duplicate</figcaption></figure>
<ol start="5">
<li>
<p>Save the edit, just like you would in the first release.</p>
</li>
<li>
<p>Go back to the Project page for RHEL9 and click the Diff Viewer tab. You'll get a menu asking you which two Components you want to compare.</p>
</li>
</ol>
<figure><img src="@source/assets/img/diff_empty.png" alt="Diff Viewer" tabindex="0" loading="lazy"><figcaption>Diff Viewer</figcaption></figure>
<ol start="7">
<li>Let's pick our two different releases of our RHEL9 component. We get a side-by side comparison view of our components, highlighting changes.</li>
</ol>
<figure><img src="@source/assets/img/diff.png" alt="Diff Viewer - Comparison" tabindex="0" loading="lazy"><figcaption>Diff Viewer - Comparison</figcaption></figure>
<div class="hint-container note">
<p class="hint-container-title">Note</p>
<p>Duplicating a Component automatically generates empty InSpec stubs inside the new component, which is why the Diff viewer believes that every requirement has a change.</p>
</div>
<div class="hint-container tip">
<p class="hint-container-title">How do I use this?</p>
<p>The Diff Viewer enables you to do several things.</p>
<p>For one, you can compare releases to tell at a glance what has changed in a piece of guidance, which traditionally would require tracking everything in a changelog manually.</p>
<p>For another, we can easily compare the Components we make with published STIGs.</p>
</div>
<p>At this point, we have gone over most of the processes you would use in Vulcan to develop your own security guidance content. To close us off, let's review the process for foally publishing a STIG.</p>
</div></template>


