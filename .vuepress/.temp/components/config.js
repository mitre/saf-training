import { defineClientConfig } from "@vuepress/client";
import { hasGlobalComponent } from "/Users/alippold/github/mitre/saf-training-current/node_modules/vuepress-shared/lib/client/index.js";
import { h } from "vue";

import { useStyleTag } from "/Users/alippold/github/mitre/saf-training-current/node_modules/@vueuse/core/index.mjs";
import Badge from "/Users/alippold/github/mitre/saf-training-current/node_modules/vuepress-plugin-components/lib/client/components/Badge.js";
import FontIcon from "/Users/alippold/github/mitre/saf-training-current/node_modules/vuepress-plugin-components/lib/client/components/FontIcon.js";
import BackToTop from "/Users/alippold/github/mitre/saf-training-current/node_modules/vuepress-plugin-components/lib/client/components/BackToTop.js";

import "/Users/alippold/github/mitre/saf-training-current/node_modules/vuepress-plugin-components/lib/client/styles/sr-only.scss";

export default defineClientConfig({
  enhance: ({ app }) => {
    if(!hasGlobalComponent("Badge")) app.component("Badge", Badge);
    if(!hasGlobalComponent("FontIcon")) app.component("FontIcon", FontIcon);
    
  },
  setup: () => {
    useStyleTag(`\
@import url("//at.alicdn.com/t/font_2410206_h4r1xw8ppng.css");
`);
  },
  rootComponents: [
    () => h(BackToTop, {}),
  ],
});
