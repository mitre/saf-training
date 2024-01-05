<template><div><p><a href="http://kitchen.ci" target="_blank" rel="noopener noreferrer">Test Kitchen<ExternalLinkIcon/></a> is a robust tool for testing infrastructure code and software on isolated platforms. It provides a consistent, reliable environment for developing and testing infrastructure code.</p>
<h2 id="workflow-defined-by-our-test-kitchen-files" tabindex="-1"><a class="header-anchor" href="#workflow-defined-by-our-test-kitchen-files" aria-hidden="true">#</a> Workflow Defined by our Test Kitchen Files</h2>
<p>Test Kitchen's workflow involves building out suites and platforms using its drivers and provisioners. It follows a create, converge, verify, and destroy cycle:</p>
<ol>
<li><strong>Create:</strong> Test Kitchen creates an instance of the platform.</li>
<li><strong>Converge:</strong> It applies the infrastructure code to the instance.</li>
<li><strong>Verify:</strong> It checks if the instance is in the desired state.</li>
<li><strong>Destroy:</strong> It destroys the instance after testing.</li>
</ol>
<p>In our testing workflow, we have defined four test suites to test different deployment patterns in two configurations - <code v-pre>vanilla</code> and <code v-pre>hardened</code>.</p>
<ul>
<li><code v-pre>vanilla</code>: This represents a completely stock installation of the testing target, as provided by the product vendor, with no configuration updates beyond what is 'shipped' by the vendor. Apart from the standard Test Kitchen initialization, the system is considered 'stock'.</li>
<li><code v-pre>hardened</code>: This configuration is set up using the <code v-pre>driver</code> section of the Test Kitchen suite and is executed during the <code v-pre>converge</code> phase. The <code v-pre>hardened</code> configuration represents the final <code v-pre>target configuration state</code> of our test instance, adhering to the recommended configuration of the Benchmark we are working on. For example, it aligns as closely as possible with the Red Hat Enterprise Linux V1R12 recommendations.</li>
</ul>
<p>For more details on Test Kitchen's workflow, refer to the <a href="http://kitchen.ci/docs/getting-started/" target="_blank" rel="noopener noreferrer">official documentation<ExternalLinkIcon/></a>.</p>
<Mermaid id="mermaid-49" code="eJx1kM1OwzAMgO99Ct92mhACLr2hSWiIy7SVcY4abzUzcZWfIt6epH9rqy2XKPYXf7bX63XmyTPmUKDz8EG+rNDAl9jLieU3S0D2LcEa/MugPQ5LT2LggD7UfQxgU2F5keAB9lhLDk85jLl347xihkKEXUqNmbYG7IMxaCeJQbERc6JzsLj4cFSGmFVX2JSx+6muY7bKajSob0KDIJq7wQ+B/NUyhB1EppfNHTNiUN00YClWx8sFjvS1SdVgX4EM7KhGJrMY5LNmUbqnvMAW6UenRR7QNt3ClrqjYtLKI7yeKc4NRWXRVcJ6LDoSvkJYNd1wq/jqwRyeJy3M6aof9A4+NLFTzj28KeL2V1zVWC4F054eJ4pEp9hLjP0DrNi9iA==" title="eJwLSS0uUfDOLEnOSM1TCM8vyk7LyS8HAFU8CAI="></Mermaid><!-- 
![test](./kitchen-workflow-dark.svg) -->
<h2 id="test-kitchen-s-modifications-to-targets" tabindex="-1"><a class="header-anchor" href="#test-kitchen-s-modifications-to-targets" aria-hidden="true">#</a> Test Kitchen's Modifications to Targets</h2>
<p>Test Kitchen makes minor modifications to the system to facilitate initialization and access. It adds a 'private ssh key' for the default user and sets up primary access to the system for this user using the generated key. Test Kitchen uses the 'platform standard' for access - SSH for Unix/Linux systems and WinRM for Windows systems.</p>
</div></template>


