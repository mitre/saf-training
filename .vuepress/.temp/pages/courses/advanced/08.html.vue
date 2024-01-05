<template><div><h2 id="ci-cd-pipelines" tabindex="-1"><a class="header-anchor" href="#ci-cd-pipelines" aria-hidden="true">#</a> CI/CD Pipelines</h2>
<figure><img src="@source/assets/img/pipeline_diagram.png" alt="A Pipeline Diagram (GitHub Action)" tabindex="0" loading="lazy"><figcaption>A Pipeline Diagram (GitHub Action)</figcaption></figure>
<p>Now that we have a solid grasp on InSpec, let's discuss the bigger picture -- how we can use the validation content we wrote inside a real test case pipeline.</p>
<p>If you have taken the <RouterLink to="/courses/user/">SAF User</RouterLink> class, you will be familiar with many of the activities we will be doing as part of the sample pipeline in the next few sections, including using Ansible to harden a test image, validating it with InSpec, and using the SAF CLI to assess our results. We will be bundling all those activities together into a pipeline workflow file so that we can automate them.</p>
<h3 id="background" tabindex="-1"><a class="header-anchor" href="#background" aria-hidden="true">#</a> Background</h3>
<p>Software developers create pipelines for the same reason that factory designers create assembly lines. They break processes into logical units and make them repeatable, consistent, and automated.</p>
<p>Pipelines also enable several paradigms in modern DevSecOps development, including continuous integration and continuous delivery (CD).</p>
<p><strong>Continuous Integration (CI)</strong> is the practice of requiring all changes to a codebase to pass a test suite before they are committed. CI is implemented on a codebase to make sure that any time a bug is introduced to a codebase, it is caught and corrected as soon as someone tries to commit it, instead of months or years later in operations when it is much more difficult to fix.</p>
<p><strong>Continuous Delivery</strong> is the practice of automatically delivering software (such as, for example, by pushing code to live deployment) once it passes a test suite. This is a core practice of DevSecOps -- code should be developed incrementally and small units of functionality should be delivered as soon as they are complete and pass all tests.</p>
<p>A fully mature DevSecOps pipeline will implement both strategies. Note that <em>both CI and CD both presuppose that you have a high-quality, easy to use test suite available</em>. We will create our demo pipeline using an InSpec profile as our test suite.</p>
<h2 id="pipeline-orchestrators" tabindex="-1"><a class="header-anchor" href="#pipeline-orchestrators" aria-hidden="true">#</a> Pipeline Orchestrators</h2>
<p>We will be building our sample pipeline using <a href="https://docs.github.com/en/actions" target="_blank" rel="noopener noreferrer">GitHub Actions<ExternalLinkIcon/></a>, the pipeline orchestration tool that is built into GitHub. We are using this feature because it is free to use unless we exceed usage limits, and because we can write up a pipeline workflow file right from our GitHub Codespaces lab environment.</p>
<p>While we are using GitHub Actions as the simplest option for this class, there are many other pipeline orchestration tools. Common tools include:</p>
<ul>
<li>GitLab's GitLab <a href="https://docs.gitlab.com/ee/ci/" target="_blank" rel="noopener noreferrer">CI/CD<ExternalLinkIcon/></a></li>
<li><a href="https://www.drone.io/" target="_blank" rel="noopener noreferrer">DroneCI<ExternalLinkIcon/></a></li>
<li>Atlassian's <a href="https://bitbucket.org/product/features/pipelines" target="_blank" rel="noopener noreferrer">BitBucket Pipelines<ExternalLinkIcon/></a></li>
<li><a href="https://www.jenkins.io/" target="_blank" rel="noopener noreferrer">Jenkins<ExternalLinkIcon/></a></li>
</ul>
<div class="hint-container note">
<p class="hint-container-title">Have you used pipeline orchestration software other than that mentioned here?</p>
</div>
<p>Most of the general concepts discusses in this portion of the class will be covered by any pipeline orchestrator tool, though they wil likely have different terminology for individual features.</p>
<h2 id="our-use-case" tabindex="-1"><a class="header-anchor" href="#our-use-case" aria-hidden="true">#</a> Our Use Case</h2>
<p>Let's learn how to build pipelines by taking on the role of a developer who needs to create a pipeline for a hardened NGINX container image. We can borrow the InSpec profile we've already written for our container to make sure that any time we update the container image, we do not accidentally break any security controls.</p>
<p>We need to:</p>
<ul>
<li>Deploy a test NGINX container image</li>
<li>Harden the container image</li>
<li>Run a validation scan (our InSpec profile) against the test system</li>
<li>Verify that the hardened image is, in fact, hardened to our satisfaction using the validation results from the test system</li>
</ul>
<p>Real-world pipelines are often used this way in a <em>gold image pipeline,</em> which run on a defined frequency to continuously deliver a secure, updated machine image that can be used as a base for further applications. In this use case, we would take the hardened and validated image we produced as part of the pipeline and save it as our new gold image. This way, developers can grab a &quot;known-good&quot; image to host their applications without having to configure or keep it up to date themselves.</p>
<h2 id="pipeline-tasks" tabindex="-1"><a class="header-anchor" href="#pipeline-tasks" aria-hidden="true">#</a> Pipeline Tasks</h2>
<p>Pipelines are conceptually broken down into a series of individual tasks. The tasks we need to complete in our pipeline include:</p>
<ul>
<li>Prep - configure our runner for later work (in our case, make sure InSpec is installed and ready to go)</li>
<li>Lint - make sure code passes style requirements (in our case, <code v-pre>inspec check .</code>)</li>
<li>Deploy the test suite (in our case, an NGINX container we want to use as a test system)</li>
<li>Harden the test suite (we will use Ansible like we do in the <RouterLink to="/courses/user/10.html">SAF User class</RouterLink>)</li>
<li>Validate - check configuration (in our case, run InSpec against our test system and generate a report)</li>
<li>Verify - confirm if the validation run passed our expectations (in our case, use the SAF CLI to check that the Validation report met our threshold)</li>
<li>Do something with results - e.g. publish our image if it met our expectations and passed the tests</li>
</ul>
<p>GitHub Actions organizes the tasks inside a pipeline into <strong>jobs</strong>. A given pipeline can trigger multiple jobs, but for our sample gold image pipeline we really only need one for storing all of our tasks.</p>
<h3 id="runners" tabindex="-1"><a class="header-anchor" href="#runners" aria-hidden="true">#</a> Runners</h3>
<p>Pipeline orchestrators all have some system for selecting a <strong>runner</strong> node that will be assigned to handle the tasks we define for the pipeline. Runners are any system -- containers or full virtual machines in a cloud environment -- that handle the actual task execution for a pipeline.</p>
<p>In the case of GitHub actions, when we trigger a pipeline, GitHub by default sends the jobs to its cloud environment to hosted runner nodes. The operating system of the runner for a particular job can be specified in the workflow file. See the <a href="https://docs.github.com/en/actions/using-github-hosted-runners/about-github-hosted-runners/about-github-hosted-runners" target="_blank" rel="noopener noreferrer">docs<ExternalLinkIcon/></a> for details.</p>
<p>In the next sections we will create a GitHub Action workflow to handle these jobs for us. We will commit the workflow file to our repository and watch it work!</p>
</div></template>


