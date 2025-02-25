import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{e as t,f as l,g as s,j as a,h as p,i as h,r,o as k}from"./app-DjCdDQJ2.js";const d="/saf-training/assets/CI_Pipeline_Flow_EC2_Example-Bg5bupvS.png",o="/saf-training/assets/CI_Pipeline_Flow_EC2_Example_With_Attestation-h2YAphvg.png",c={};function g(m,i){const n=r("RouteLink");return k(),t("div",null,[i[3]||(i[3]=l('<h3 id="rhel7-pipeline-example" tabindex="-1"><a class="header-anchor" href="#rhel7-pipeline-example"><span>RHEL7 Pipeline Example</span></a></h3><p>Below is a <a href="https://github.com/mitre/redhat-enterprise-linux-7-stig-baseline/blob/master/.github/workflows/verify-ec2.yml" target="_blank" rel="noopener noreferrer">RedHat 7 example</a> of an automated pipeline that creates and configures two machines with the RedHat 7 operating system. One machine is set up with a vanilla configuration, and the other is hardened using hardening scripts run by the Chef configuration management tool called Kitchen.</p><p>This pipeline is intended to validate that the RHEL7 InSpec profile functions correctly. We&#39;re not too concerned with whether our &quot;hardened&quot; box is actually hardened; we just want to know if InSpec is assessing it correctly.</p><div class="hint-container note"><p class="hint-container-title">Why Vanilla and Hardened?</p><p>Having two test suites, where one is hardened and one is not, can be useful for seeing the differences between how a profile behaves on different types of systems.</p><p>It also has the added bonus of simultaneously validating that whatever tool we use for hardening is working correctly.</p></div><div class="hint-container info"><p class="hint-container-title">Modularity in Automation</p><p>We will demonstrate the automation process through this example, but note that the different orchestration tools, configuration management tools, and targets can be swapped out for different uses while following the same automation flow and security automation framework.</p></div><figure><img src="'+d+`" alt="The CI Pipeline" tabindex="0" loading="lazy"><figcaption>The CI Pipeline</figcaption></figure><div class="language-yaml line-numbers-mode" data-highlighter="shiki" data-ext="yaml" data-title="yaml" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">name</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">EC2 Testing Matrix</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">on</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">:</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">  push</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">:</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">    branches</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">: [ </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">main</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> ]</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">  pull_request</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">:</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">    branches</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">: [ </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">main</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;"> ]</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">jobs</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">:</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">  my-job</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">:</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">    name</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">Validate my profile</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">    runs-on</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">ubuntu-latest</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">    env</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">:</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">      CHEF_LICENSE</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">accept-silent</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">      KITCHEN_LOCAL_YAML</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">kitchen.ec2.yml</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">      LC_ALL</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&quot;en_US.UTF-8&quot;</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">    strategy</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">:</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">      matrix</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">:</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">        suite</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">: [</span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&#39;vanilla&#39;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">, </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&#39;hardened&#39;</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">]</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">      fail-fast</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#986801;--shiki-dark:#D19A66;">false</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">    steps</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">:</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">      - </span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">name</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">add needed packages</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">        run</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">sudo apt-get install -y jq</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">      - </span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">name</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">Configure AWS credentials</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">        env</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">:</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">          AWS_SG_ID</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">\${{ secrets.SAF_AWS_SG_ID }}</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">          AWS_SUBNET_ID</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">\${{ secrets.SAF_AWS_SUBNET_ID }}</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">        uses</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">aws-actions/configure-aws-credentials@v1</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">        with</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">:</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">          aws-access-key-id</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">\${{ secrets.SAF_AWS_ACCESS_KEY_ID }}</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">          aws-secret-access-key</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">\${{ secrets.SAF_AWS_SECRET_ACCESS_KEY }}</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">          aws-region</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">us-east-1</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">      - </span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">name</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">Check out repository</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">        uses</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">actions/checkout@v2</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">      - </span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">name</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">Clone full repository so we can push</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">        run</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">git fetch --prune --unshallow</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">      - </span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">name</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">Setup Ruby</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">        uses</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">ruby/setup-ruby@v1</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">        with</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">:</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">          ruby-version</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&#39;2.7&#39;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">      - </span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">name</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">Disable ri and rdoc</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">        run</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&#39;echo &quot;gem: --no-ri --no-rdoc&quot; &gt;&gt; ~/.gemrc&#39;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">      - </span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">run</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">bundle install</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">      - </span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">name</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">Regenerate current \`profile.json\`</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">        run</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#A626A4;--shiki-dark:#C678DD;">|</span></span>
<span class="line"><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">          bundle exec inspec json . | jq . &gt; profile.json</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">      - </span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">name</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">Lint the Inspec profile</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">        run</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">bundle exec inspec check .</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">      - </span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">name</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">Run kitchen test</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">        run</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">bundle exec kitchen test --destroy=always \${{ matrix.suite }}-rhel-7 || true</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">      - </span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">name</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">Display our \${{ matrix.suite }} results summary</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">        uses</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">mitre/saf_action@v1</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">        with</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">:</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">          command_string</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&#39;view summary -i spec/results/ec2_rhel-7_\${{ matrix.suite }}.json&#39;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">      - </span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">name</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">Ensure the scan meets our \${{ matrix.suite }} results threshold</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">        uses</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">mitre/saf_action@v1</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">        with</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">:</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">          command_string</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">&#39;validate threshold -i spec/results/ec2_rhel-7_\${{ matrix.suite }}.json -F \${{ matrix.suite }}.threshold.yml&#39;</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">      - </span><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">name</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">Save Test Result JSON</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">        uses</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">actions/upload-artifact@v4</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">        with</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">:</span></span>
<span class="line"><span style="--shiki-light:#E45649;--shiki-dark:#E06C75;">          path</span><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">: </span><span style="--shiki-light:#50A14F;--shiki-dark:#98C379;">spec/results/</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>The two machines are then tested by running an InSpec profile. The results are viewed and validated against a threshold to allow the pipeline to automatically pass or fail based on whether the results meet those thresholds. The SAF CLI is used to view and validate.</p><div class="hint-container tip"><p class="hint-container-title">Use Examples to Help Automate</p><p>To get more information on setting up the whole automation pipeline for your use case, use examples, such as the <a href="https://github.com/mitre/redhat-enterprise-linux-7-stig-baseline/" target="_blank" rel="noopener noreferrer">RedHat 7 repository</a>. You can view results of the workflows in the <a href="https://github.com/mitre/redhat-enterprise-linux-7-stig-baseline/actions" target="_blank" rel="noopener noreferrer">Actions tab</a>.</p></div><h3 id="_5-2-pipeline-example-with-manual-attestations" tabindex="-1"><a class="header-anchor" href="#_5-2-pipeline-example-with-manual-attestations"><span>5.2. Pipeline Example with Manual Attestations</span></a></h3><p>You could also add manual attestations with the SAF CLI to the pipeline to combine applicable manual attestations to the automated test results to determine a more full and accurate look at the overall security posture.​ SAF supports the validation of all controls including both automatable controls and manual attestation of those controls that cannot be automated. This expands the SAF’s coverage across interview, examination, and policy controls.​​</p><p>In a general sense we can use the SAF CLI to manage security data in the pipeline, supporting activities for managing POA&amp;Ms.</p>`,12)),s("p",null,[i[1]||(i[1]=a("To practice doing manual attestations, take a look at the ")),p(n,{to:"/courses/user/12.html"},{default:h(()=>i[0]||(i[0]=[a("User Class")])),_:1}),i[2]||(i[2]=a("."))]),i[4]||(i[4]=s("figure",null,[s("img",{src:o,alt:"The CI Pipeline - Attestation",tabindex:"0",loading:"lazy"}),s("figcaption",null,"The CI Pipeline - Attestation")],-1))])}const A=e(c,[["render",g],["__file","Appendix D - Example Pipeline for Validating an InSpec Profile.html.vue"]]),B=JSON.parse('{"path":"/courses/advanced/Appendix%20D%20-%20Example%20Pipeline%20for%20Validating%20an%20InSpec%20Profile.html","title":"Appendix D - Example Pipeline for Validating an InSpec Profile","lang":"en-US","frontmatter":{"order":17,"title":"Appendix D - Example Pipeline for Validating an InSpec Profile","author":"Aaron Lippold","headerDepth":3,"description":"RHEL7 Pipeline Example Below is a RedHat 7 example of an automated pipeline that creates and configures two machines with the RedHat 7 operating system. One machine is set up wi...","head":[["meta",{"property":"og:url","content":"https://mitre.github.io/saf-training/saf-training/courses/advanced/Appendix%20D%20-%20Example%20Pipeline%20for%20Validating%20an%20InSpec%20Profile.html"}],["meta",{"property":"og:site_name","content":"MITRE SAF Training"}],["meta",{"property":"og:title","content":"Appendix D - Example Pipeline for Validating an InSpec Profile"}],["meta",{"property":"og:description","content":"RHEL7 Pipeline Example Below is a RedHat 7 example of an automated pipeline that creates and configures two machines with the RedHat 7 operating system. One machine is set up wi..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"en-US"}],["meta",{"property":"og:updated_time","content":"2024-12-31T21:23:38.000Z"}],["meta",{"property":"article:author","content":"Aaron Lippold"}],["meta",{"property":"article:modified_time","content":"2024-12-31T21:23:38.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Appendix D - Example Pipeline for Validating an InSpec Profile\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-12-31T21:23:38.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Aaron Lippold\\"}]}"]]},"headers":[{"level":3,"title":"RHEL7 Pipeline Example","slug":"rhel7-pipeline-example","link":"#rhel7-pipeline-example","children":[]},{"level":3,"title":"5.2. Pipeline Example with Manual Attestations","slug":"_5-2-pipeline-example-with-manual-attestations","link":"#_5-2-pipeline-example-with-manual-attestations","children":[]}],"git":{"createdTime":1656449910000,"updatedTime":1735680218000,"contributors":[{"name":"Emily Rodriguez","username":"Emily Rodriguez","email":"ecrodriguez@mm279976-pc.lan","commits":5,"url":"https://github.com/Emily Rodriguez"},{"name":"wdower","username":"wdower","email":"will@dower.dev","commits":2,"url":"https://github.com/wdower"},{"name":"Will Dower","username":"Will Dower","email":"wdow95@hotmail.com","commits":1,"url":"https://github.com/Will Dower"},{"name":"Emily Rodriguez","username":"Emily Rodriguez","email":"ecrodriguez@mitre.org","commits":1,"url":"https://github.com/Emily Rodriguez"},{"name":"Aaron Lippold","username":"Aaron Lippold","email":"lippold@gmail.com","commits":2,"url":"https://github.com/Aaron Lippold"},{"name":"Joyce Quach","username":"Joyce Quach","email":"jquach@mitre.org","commits":4,"url":"https://github.com/Joyce Quach"}]},"readingTime":{"minutes":2.16,"words":648},"filePathRelative":"courses/advanced/Appendix D - Example Pipeline for Validating an InSpec Profile.md","localizedDate":"June 28, 2022","autoDesc":true}');export{A as comp,B as data};
