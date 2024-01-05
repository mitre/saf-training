import { defineClientConfig } from "@vuepress/client";
import { hasGlobalComponent } from "/Users/alippold/github/mitre/saf-training/node_modules/vuepress-shared/lib/client/index.js";
import { VPCard } from "/Users/alippold/github/mitre/saf-training/node_modules/vuepress-plugin-md-enhance/lib/client/compact/index.js";
import CodeTabs from "/Users/alippold/github/mitre/saf-training/node_modules/vuepress-plugin-md-enhance/lib/client/components/CodeTabs.js";
import { CodeGroup, CodeGroupItem } from "/Users/alippold/github/mitre/saf-training/node_modules/vuepress-plugin-md-enhance/lib/client/compact/index.js";
import CodeDemo from "/Users/alippold/github/mitre/saf-training/node_modules/vuepress-plugin-md-enhance/lib/client/components/CodeDemo.js";
import MdDemo from "/Users/alippold/github/mitre/saf-training/node_modules/vuepress-plugin-md-enhance/lib/client/components/MdDemo.js";
import "/Users/alippold/github/mitre/saf-training/node_modules/vuepress-plugin-md-enhance/lib/client/styles/figure.scss";
import "/Users/alippold/github/mitre/saf-training/node_modules/vuepress-plugin-md-enhance/lib/client/styles/footnote.scss";
import { useHint } from "/Users/alippold/github/mitre/saf-training/node_modules/vuepress-plugin-md-enhance/lib/client/composables/hint.js";
import "/Users/alippold/github/mitre/saf-training/node_modules/vuepress-plugin-md-enhance/lib/client/styles/hint/index.scss";
import "/Users/alippold/github/mitre/saf-training/node_modules/vuepress-plugin-md-enhance/lib/client/styles/image-mark.scss"
import Mermaid from "/Users/alippold/github/mitre/saf-training/node_modules/vuepress-plugin-md-enhance/lib/client/components/Mermaid.js";
import { injectMermaidConfig } from "/Users/alippold/github/mitre/saf-training/node_modules/vuepress-plugin-md-enhance/lib/client//index.js";
import Playground from "/Users/alippold/github/mitre/saf-training/node_modules/vuepress-plugin-md-enhance/lib/client/components/Playground.js";
import "/Users/alippold/github/mitre/saf-training/node_modules/reveal.js/dist/reveal.css";
import RevealJs from "/Users/alippold/github/mitre/saf-training/node_modules/vuepress-plugin-md-enhance/lib/client/components/RevealJs.js";
import { injectRevealJsConfig } from "/Users/alippold/github/mitre/saf-training/node_modules/vuepress-plugin-md-enhance/lib/client/index.js";
import Tabs from "/Users/alippold/github/mitre/saf-training/node_modules/vuepress-plugin-md-enhance/lib/client/components/Tabs.js";
import "/Users/alippold/github/mitre/saf-training/node_modules/vuepress-plugin-md-enhance/lib/client/styles/tasklist.scss";

export default defineClientConfig({
  enhance: ({ app }) => {
    if(!hasGlobalComponent("VPCard", app)) app.component("VPCard", VPCard);
    app.component("CodeTabs", CodeTabs);
    if(!hasGlobalComponent("CodeGroup", app)) app.component("CodeGroup", CodeGroup);
    if(!hasGlobalComponent("CodeGroupItem", app)) app.component("CodeGroupItem", CodeGroupItem);
    app.component("CodeDemo", CodeDemo);
    app.component("MdDemo", MdDemo);
    injectMermaidConfig(app);
    app.component("Mermaid", Mermaid);
    app.component("Playground", Playground);
    injectRevealJsConfig(app);
    app.component("RevealJs", RevealJs);
    app.component("Tabs", Tabs);
  },
  setup: () => {
useHint();
  }
});
