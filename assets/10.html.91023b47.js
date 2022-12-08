import{_ as t}from"./plugin-vue_export-helper.21dcd24c.js";import{r as i,o,c as r,a,b as l,F as c,d as s,e as n}from"./app.3b4d192a.js";var p="/saf-training/assets/SAF_Capabilities_Harden.6df01397.png",d="/saf-training/assets/SAF_Site_Harden_NGINX.ee308fe9.png",u="/saf-training/assets/Codespaces_Hardening_Files.7a069c3c.png";const h={},g=s('<h2 id="_10-from-plan-to-validate-to-visualize-to-harden" tabindex="-1"><a class="header-anchor" href="#_10-from-plan-to-validate-to-visualize-to-harden" aria-hidden="true">#</a> 10. From &quot;Plan&quot; to &quot;Validate&quot; to &quot;Visualize&quot; to &quot;Harden&quot;</h2><p>Finally! We get to secure the software. After starting with a plan, then seeing the requirements and current state through validation and visualiztion, let&#39;s harden the component and revalidate it after the changes.</p><p><img src="'+p+'" alt="Alt text" loading="lazy"></p><h3 id="_10-1-find-the-hardening-content" tabindex="-1"><a class="header-anchor" href="#_10-1-find-the-hardening-content" aria-hidden="true">#</a> 10.1 Find the hardening content</h3>',4),m=n('Remember when you perused the hardening content on the SAF site when we talked about the "Plan" pillar? This is where we will find automated content for configuring a software component to some guidance. In this case, we will use the NGINX Stigready Content on the '),b={href:"https://saf.mitre.org/#/harden",target:"_blank",rel:"noopener noreferrer"},k=n("saf hardening page"),v=n("."),f=s('<p><img src="'+d+`" alt="Alt text" loading="lazy"></p><p>You could peruse this GitHub repository, including the README and inputs to find out more information, but for this training, we have put any preparation needed for running this hardening content into a pre-script.</p><h3 id="_10-2-prepare-your-codespaces-to-run-the-hardening-script" tabindex="-1"><a class="header-anchor" href="#_10-2-prepare-your-codespaces-to-run-the-hardening-script" aria-hidden="true">#</a> 10.2 Prepare your Codespaces to run the hardening script</h3><p>Just like we saw some requirements for running an InSpec scan, there are also some requirements to run the hardening script on the NGINX container in your Codespaces. We are going to run another setup script for those.</p><p>In your Codespace terminal, run the following commands:</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>/workspaces/saf-training-lab-environment/hardening-nginx-setup.sh
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>This command will make sure that the NGINX docker container has the required software (python) to run the ansible hardening content. This script also downloads the hardening content locally. Unlike the InSpec scan, we will run the hardening content from a local folder rather than from GitHub. Therefore, you should see the <code>ansible-nginx-stigready-hardening</code> folder in your files when the script completes.</p><p><img src="`+u+`" alt="Alt text" loading="lazy"></p><h3 id="_10-3-cli-results-of-hardening-script" tabindex="-1"><a class="header-anchor" href="#_10-3-cli-results-of-hardening-script" aria-hidden="true">#</a> 10.3 CLI Results of Hardening Script</h3><p>You should see the following results from the hardening script. If you run this hardening content multiple times, the numbers in the results may be different because the starting configuration will be different and the script will not have to change the same numbers of settings.</p><p>Run this command:</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>ansible-playbook -i hosts.yml hardening-playbook.yml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>To see the following results:</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code>ansible-playbook -i hosts.yml hardening-playbook.yml 
<span class="token punctuation">[</span>WARNING<span class="token punctuation">]</span>: Ansible is being run <span class="token keyword">in</span> a world writable directory <span class="token punctuation">(</span>/workspaces/saf-training-lab-environment/ansible-nginx-stigready-hardening<span class="token punctuation">)</span>, ignoring
it as an ansible.cfg source. For <span class="token function">more</span> information see https://docs.ansible.com/ansible/devel/reference_appendices/config.html<span class="token comment">#cfg-in-world-writable-</span>
<span class="token function">dir</span>

PLAY <span class="token punctuation">[</span>all<span class="token punctuation">]</span> ******************************************************************************************************************************************

TASK <span class="token punctuation">[</span>Gathering Facts<span class="token punctuation">]</span> ******************************************************************************************************************************
ok: <span class="token punctuation">[</span>docker<span class="token punctuation">]</span>

TASK <span class="token punctuation">[</span><span class="token punctuation">..</span>/ansible-nginx-stigready-hardening <span class="token builtin class-name">:</span> Ensure the <span class="token string">&quot;/usr/sbin/nginx&quot;</span> binary is not worldwide read- or writeable<span class="token punctuation">]</span> *******************************
changed: <span class="token punctuation">[</span>docker<span class="token punctuation">]</span>

<span class="token punctuation">..</span>.

TASK <span class="token punctuation">[</span><span class="token punctuation">..</span>/ansible-nginx-stigready-hardening <span class="token builtin class-name">:</span> Generate a <span class="token string">&#39;/C=US/O=U.S. Government/OU=DoD/CN=DoD&#39;</span> self-signed ssl certificate and key<span class="token punctuation">]</span> ****************
changed: <span class="token punctuation">[</span>docker<span class="token punctuation">]</span>

TASK <span class="token punctuation">[</span><span class="token punctuation">..</span>/ansible-nginx-stigready-hardening <span class="token builtin class-name">:</span> Ensure the private key is only readable by <span class="token string">&#39;root&#39;</span><span class="token punctuation">]</span> *****************************************************
changed: <span class="token punctuation">[</span>docker<span class="token punctuation">]</span>

TASK <span class="token punctuation">[</span><span class="token punctuation">..</span>/ansible-nginx-stigready-hardening <span class="token builtin class-name">:</span> Ensure the crt should only be readable by <span class="token string">&#39;root&#39;</span><span class="token punctuation">]</span> ******************************************************
changed: <span class="token punctuation">[</span>docker<span class="token punctuation">]</span>

TASK <span class="token punctuation">[</span><span class="token punctuation">..</span>/ansible-nginx-stigready-hardening <span class="token builtin class-name">:</span> Post Task<span class="token punctuation">]</span> *********************************************************************************************
changed: <span class="token punctuation">[</span>docker<span class="token punctuation">]</span>

PLAY RECAP ******************************************************************************************************************************************
<span class="token function">docker</span>                     <span class="token builtin class-name">:</span> <span class="token assign-left variable">ok</span><span class="token operator">=</span><span class="token number">38</span>   <span class="token assign-left variable">changed</span><span class="token operator">=</span><span class="token number">35</span>   <span class="token assign-left variable">unreachable</span><span class="token operator">=</span><span class="token number">0</span>    <span class="token assign-left variable">failed</span><span class="token operator">=</span><span class="token number">0</span>    <span class="token assign-left variable">skipped</span><span class="token operator">=</span><span class="token number">0</span>    <span class="token assign-left variable">rescued</span><span class="token operator">=</span><span class="token number">0</span>    <span class="token assign-left variable">ignored</span><span class="token operator">=</span><span class="token number">0</span>  
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,14);function _(y,w){const e=i("ExternalLinkIcon");return o(),r(c,null,[g,a("p",null,[m,a("a",b,[k,l(e)]),v]),f],64)}var S=t(h,[["render",_],["__file","10.html.vue"]]);export{S as default};
