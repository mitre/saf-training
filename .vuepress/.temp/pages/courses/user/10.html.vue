<template><div><h2 id="_10-from-plan-to-validate-to-visualize-to-harden" tabindex="-1"><a class="header-anchor" href="#_10-from-plan-to-validate-to-visualize-to-harden" aria-hidden="true">#</a> 10. From &quot;Plan&quot; to &quot;Validate&quot; to &quot;Visualize&quot; to &quot;Harden&quot;</h2>
<p>Finally! We get to secure the software. After starting with a plan, then seeing the requirements and current state through validation and visualiztion, let's harden the component and revalidate it after the changes.</p>
<figure><img src="@source/assets/img/SAF_Capabilities_Harden.png" alt="The Harden Capability" tabindex="0" loading="lazy"><figcaption>The Harden Capability</figcaption></figure>
<h3 id="_10-1-find-the-hardening-content" tabindex="-1"><a class="header-anchor" href="#_10-1-find-the-hardening-content" aria-hidden="true">#</a> 10.1 Find the hardening content</h3>
<p>Remember when you perused the hardening content on the SAF site when we talked about the &quot;Plan&quot; pillar? This is where we will find automated content for configuring a software component to some guidance. In this case, we will use the NGINX Stigready Content on the <a href="https://saf.mitre.org/#/harden" target="_blank" rel="noopener noreferrer">saf hardening page<ExternalLinkIcon/></a>.</p>
<figure><img src="@source/assets/img/SAF_Site_Harden.png" alt="The SAF Hardening Page" tabindex="0" loading="lazy"><figcaption>The SAF Hardening Page</figcaption></figure>
<p>You could peruse this GitHub repository, including the README and inputs to find out more information, but for this training, we have put any preparation needed for running this hardening content into a pre-script.</p>
<h3 id="_10-2-prepare-your-codespaces-to-run-the-hardening-script" tabindex="-1"><a class="header-anchor" href="#_10-2-prepare-your-codespaces-to-run-the-hardening-script" aria-hidden="true">#</a> 10.2 Prepare your Codespaces to run the hardening script</h3>
<p>Just like we saw some requirements for running an InSpec scan, there are also some requirements to run the hardening script on the NGINX container in your Codespaces. We are going to run another setup script for those.</p>
<p>In your Codespace terminal from your main workspace directory, run the following commands:</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token builtin class-name">source</span> ./install-nginxHardeningTools.sh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>This command will make sure that the NGINX docker container has the required software dependencies such as Python to run the Ansible hardening content. This script also downloads the hardening content locally. Unlike the InSpec scan, we will run the hardening content from a local folder rather than from GitHub. Therefore, you should see the <code v-pre>ansible-nginx-stigready-hardening</code> folder in your files when the script completes.</p>
<figure><img src="@source/assets/img/Codespaces_Hardening_Files.png" alt="After Running the Hardening Tools Script" tabindex="0" loading="lazy"><figcaption>After Running the Hardening Tools Script</figcaption></figure>
<h3 id="_10-3-cli-results-of-hardening-script" tabindex="-1"><a class="header-anchor" href="#_10-3-cli-results-of-hardening-script" aria-hidden="true">#</a> 10.3 CLI Results of Hardening Script</h3>
<p>You should see the following results from the hardening script. If you run this hardening content multiple times, the numbers in the results may be different because the starting configuration will be different and the script will not have to change the same numbers of settings.</p>
<div class="hint-container note">
<p class="hint-container-title">Note</p>
<p>Make sure you are in the ansible content's directory before running the following command. You can run the command<br>
<code v-pre>cd ansible-nginx-stigready-hardening</code><br>
to enter the directory. That means your current working directory path will look something like <code v-pre>/workspaces/saf-training-lab-environment/ansible-nginx-stigready-hardening</code> with variation if you named your repository differently in the lab setup.</p>
</div>
<p>Run this command:</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>ansible-playbook <span class="token parameter variable">-i</span> hosts.yml hardening-playbook.yml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>To see the following results:</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>ansible-playbook <span class="token parameter variable">-i</span> hosts.yml hardening-playbook.yml 
<span class="token punctuation">[</span>WARNING<span class="token punctuation">]</span>: Ansible is being run <span class="token keyword">in</span> a world writable directory <span class="token punctuation">(</span>/workspaces/saf-training-lab-environment/ansible-nginx-stigready-hardening<span class="token punctuation">)</span>, ignoring
it as an ansible.cfg source. For <span class="token function">more</span> information see https://docs.ansible.com/ansible/devel/reference_appendices/config.html<span class="token comment">#cfg-in-world-writable-</span>
<span class="token function">dir</span>

PLAY <span class="token punctuation">[</span>all<span class="token punctuation">]</span> ******************************************************************************************************************************************

TASK <span class="token punctuation">[</span>Gathering Facts<span class="token punctuation">]</span> ******************************************************************************************************************************
ok: <span class="token punctuation">[</span>docker<span class="token punctuation">]</span>

TASK <span class="token punctuation">[</span><span class="token punctuation">..</span>/ansible-nginx-stigready-hardening <span class="token builtin class-name">:</span> Ensure the <span class="token string">"/usr/sbin/nginx"</span> binary is not worldwide read- or writeable<span class="token punctuation">]</span> *******************************
changed: <span class="token punctuation">[</span>docker<span class="token punctuation">]</span>

<span class="token punctuation">..</span>.

TASK <span class="token punctuation">[</span><span class="token punctuation">..</span>/ansible-nginx-stigready-hardening <span class="token builtin class-name">:</span> Generate a <span class="token string">'/C=US/O=U.S. Government/OU=DoD/CN=DoD'</span> self-signed ssl certificate and key<span class="token punctuation">]</span> ****************
changed: <span class="token punctuation">[</span>docker<span class="token punctuation">]</span>

TASK <span class="token punctuation">[</span><span class="token punctuation">..</span>/ansible-nginx-stigready-hardening <span class="token builtin class-name">:</span> Ensure the private key is only readable by <span class="token string">'root'</span><span class="token punctuation">]</span> *****************************************************
changed: <span class="token punctuation">[</span>docker<span class="token punctuation">]</span>

TASK <span class="token punctuation">[</span><span class="token punctuation">..</span>/ansible-nginx-stigready-hardening <span class="token builtin class-name">:</span> Ensure the crt should only be readable by <span class="token string">'root'</span><span class="token punctuation">]</span> ******************************************************
changed: <span class="token punctuation">[</span>docker<span class="token punctuation">]</span>

TASK <span class="token punctuation">[</span><span class="token punctuation">..</span>/ansible-nginx-stigready-hardening <span class="token builtin class-name">:</span> Post Task<span class="token punctuation">]</span> *********************************************************************************************
changed: <span class="token punctuation">[</span>docker<span class="token punctuation">]</span>

PLAY RECAP ******************************************************************************************************************************************
<span class="token function">docker</span>                     <span class="token builtin class-name">:</span> <span class="token assign-left variable">ok</span><span class="token operator">=</span><span class="token number">38</span>   <span class="token assign-left variable">changed</span><span class="token operator">=</span><span class="token number">35</span>   <span class="token assign-left variable">unreachable</span><span class="token operator">=</span><span class="token number">0</span>    <span class="token assign-left variable">failed</span><span class="token operator">=</span><span class="token number">0</span>    <span class="token assign-left variable">skipped</span><span class="token operator">=</span><span class="token number">0</span>    <span class="token assign-left variable">rescued</span><span class="token operator">=</span><span class="token number">0</span>    <span class="token assign-left variable">ignored</span><span class="token operator">=</span><span class="token number">0</span>  
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


