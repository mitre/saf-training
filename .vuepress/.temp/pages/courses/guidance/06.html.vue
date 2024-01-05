<template><div><h2 id="_6-1-components" tabindex="-1"><a class="header-anchor" href="#_6-1-components" aria-hidden="true">#</a> 6.1 Components</h2>
<p>We have our project created and have allowed access to everyone who needs it. Now let's create ourselves a Component.</p>
<h3 id="_6-1-1-consider-your-component-s-requirements" tabindex="-1"><a class="header-anchor" href="#_6-1-1-consider-your-component-s-requirements" aria-hidden="true">#</a> 6.1.1 Consider Your Component's Requirements</h3>
<p>The first thing we need to do when building a Component is determine what set of requirements applies to it.</p>
<p>A helpful question to keep in mind for this decision is <strong>&quot;What is the <em>purpose</em> of the software you are securing? What is its role?&quot;</strong> This will determine what guidance document we want to use as a foundation for our content.</p>
<h3 id="_6-1-2-choosing-a-foundation" tabindex="-1"><a class="header-anchor" href="#_6-1-2-choosing-a-foundation" aria-hidden="true">#</a> 6.1.2 Choosing a Foundation</h3>
<p>Let's take a look at the options we have for a foundation.</p>
<p>You'll see options in the top navbar of Vulcan for &quot;SRGs&quot; and &quot;STIGs.&quot; These links lead to the lists of security guidance documents already saved to Vulcan. We can use any of these as a template for our own content.</p>
<ol>
<li>At the top of the page, click the &quot;SRGs&quot; button.</li>
</ol>
<figure><img src="@source/assets/img/Vulcan_Menu.png" alt="Vulcan Navbar" tabindex="0" loading="lazy"><figcaption>Vulcan Navbar</figcaption></figure>
<p>We have pre-loaded this Vulcan instance with a few SRGs to get us started. Since we're writing content for the RHEL9 operating system, we're going to want to use the General Purpose Operating System Security Requirements Guide.</p>
<div class="hint-container note">
<p class="hint-container-title">DISA and SRG selection</p>
<p>Note that if you intend to formally publish your STIG, DISA will tell you which one to use based off the description of your software that you give them.</p>
</div>
<div class="hint-container tip">
<p class="hint-container-title">Application STIGs</p>
<p>Applications (as opposed to software like operating systems, webservers and routers) that undergo the STIG process all should be using the Application Security and Development STIG as a foundation document.</p>
<p>Remember that a STIG can itself be used as the foundation for a tailored security baseline document!</p>
</div>
<h2 id="_6-2-creating-a-component-for-your-project" tabindex="-1"><a class="header-anchor" href="#_6-2-creating-a-component-for-your-project" aria-hidden="true">#</a> 6.2 Creating a Component for Your Project</h2>
<p>Let's create a new Component to track our RHEL9 work.</p>
<ol>
<li>Go to your project page and select the &quot;Components&quot; tab.</li>
<li>Click &quot;Create a New Component.&quot;</li>
</ol>
<figure><img src="@source/assets/img/create_component.png" alt="Creating The Component" tabindex="0" loading="lazy"><figcaption>Creating The Component</figcaption></figure>
<p>Here, you'll select the SRG we decided on earlier.</p>
<ol start="3">
<li>Fill out some metadata for the Component.
<ul>
<li>Base SRG</li>
<li>Component Name</li>
<li>Version and Release (since this is a brand-new component we will use &quot;1&quot; for both)</li>
<li>STIG ID prefix</li>
<li>Title</li>
<li>Description*</li>
<li>Point of Contact*</li>
<li>Slack Channel ID*</li>
</ul>
</li>
</ol>
<p>*Optional.</p>
<div class="hint-container note">
<p class="hint-container-title">STIG ID Prefixes</p>
<p>If you intend to formally publish your STIG, DISA will eventually assign these for you. These are just a placeholder value for now to allow us to track requirements inside Vulcan itself.</p>
</div>
<ol start="4">
<li>Once you're done, click &quot;Create Component.&quot; You'll see a card added to your project to represent your new Component.</li>
</ol>
<figure><img src="@source/assets/img/created_component.png" alt="New Component" tabindex="0" loading="lazy"><figcaption>New Component</figcaption></figure>
<div class="hint-container tip">
<p class="hint-container-title">Other Ways of Loading Components</p>
<p>Vulcan allows you to import Components as well as creating them brand-new. You are able to load from your own released Components in your Vulcan instance, or even from a spreadsheet.</p>
</div>
<h2 id="_6-3-examining-the-component" tabindex="-1"><a class="header-anchor" href="#_6-3-examining-the-component" aria-hidden="true">#</a> 6.3 Examining the Component</h2>
<p>Let's crack open what we just created.</p>
<ol start="6">
<li>Click the &quot;Open Component&quot; button.</li>
</ol>
<figure><img src="@source/assets/img/open_component.png" alt="An Open Component" tabindex="0" loading="lazy"><figcaption>An Open Component</figcaption></figure>
<h3 id="_6-3-1-layout-of-the-component-view" tabindex="-1"><a class="header-anchor" href="#_6-3-1-layout-of-the-component-view" aria-hidden="true">#</a> 6.3.1 Layout of the Component View</h3>
<p>The page should look something like this:</p>
<figure><img src="@source/assets/img/component_view.png" alt="Inside the Component" tabindex="0" loading="lazy"><figcaption>Inside the Component</figcaption></figure>
<ol start="6">
<li>On the left side of the page, scroll down to the section titled &quot;All Controls&quot;. These are all of the requirements in the SRG we selected earlier.</li>
</ol>
<p>On the right-hand side of the Vulcan window, if we don't have a requirement selected, we can see metadata about the overall Component, including an edit history.</p>
<p>The left-hand side of the Vulcan window shows us the list of each requirement in the Component, and can be filtered by keyword, control status (which we will discuss in the next section) or review status. Note that each control is labeled with the STIG ID prefix that you gave this Component earlier. You can click on the requirement IDs in this view to see their contents.</p>
<p>When first created, a new Component's requirements will all be exact copies of the SRG or other underlying document we used as a foundation. Our job is to edit these controls to make them <em>specific</em>, <em>actionable</em> implementation guidance.</p>
</div></template>


