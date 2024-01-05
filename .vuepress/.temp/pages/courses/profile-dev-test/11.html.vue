<template><div><p>A patch update involves making minor changes to a profile to fix issues or improve functionality. Here's a step-by-step guide:</p>
<ol>
<li><strong>Report the Issue:</strong> Open an issue on our project, detailing the problem and providing examples. Do this on <a href="https://github.com/mitre/redhat-enterprise-linux-8-stig-baseline/issues" target="_blank" rel="noopener noreferrer">our issues page<ExternalLinkIcon/></a>.</li>
<li><strong>Fork and Branch:</strong> Fork the repository on GitHub, then create a branch off the <code v-pre>tagged</code> patch release you're targeting for the update.</li>
<li><strong>Set Up Testing Suites:</strong> In your forked branch, set up the AWS and Docker testing suites.</li>
<li><strong>Make Updates:</strong> Update the control, <code v-pre>inspec.yml</code> inputs, thresholds, etc. Don't worry about the InSpec version in the <code v-pre>inspec.yml</code> - the release process handles that.</li>
<li><strong>Test Your Updates Locally:</strong> Test your updates on all <code v-pre>vanilla</code> and <code v-pre>hardened</code> variants of the <code v-pre>known bad</code> and <code v-pre>known good</code> states of the <code v-pre>AWS EC2</code> and <code v-pre>Docker</code> test targets. Also, test your controls outside perfect conditions to ensure they handle non-optimal target environments. Verify that your update considers the <code v-pre>container</code>, <code v-pre>virtual machine</code>, and <code v-pre>1U machine</code> testing context of applicability.</li>
<li><strong>Lint Your Updates:</strong> Use the <code v-pre>bundle exec rake lint</code> and <code v-pre>bundle exec rake lint:autocorrect</code> commands from the test suite to lint your updates.</li>
<li><strong>Commit Your Updates:</strong> After testing and linting, commit your updates to your branch. Include <code v-pre>Fixes #ISSUE</code> in your commit messages to automatically close the issue when your PR is merged.</li>
<li><strong>Open a PR:</strong> Open a PR on the project repository from your fork.</li>
<li><strong>Check Test Suite:</strong> Ensure the GitHub Action test suite on the project side passes. You can check this at <a href="https://github.com/mitre/redhat-enterprise-linux-8-stig-baseline/actions" target="_blank" rel="noopener noreferrer">our actions page<ExternalLinkIcon/></a>.</li>
</ol>
</div></template>


