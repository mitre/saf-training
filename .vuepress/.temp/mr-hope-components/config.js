import { defineClientConfig } from "@vuepress/client";
import Badge from "/Users/alippold/github/mitre/inspec-developer-2/node_modules/@mr-hope/vuepress-plugin-components/lib/client/components/Badge";
import FontIcon from "/Users/alippold/github/mitre/inspec-developer-2/node_modules/@mr-hope/vuepress-plugin-components/lib/client/components/FontIcon";
import { useStyleTag } from "/Users/alippold/github/mitre/inspec-developer-2/node_modules/@mr-hope/vuepress-plugin-components/lib/client/composables";
import BackToTop from "/Users/alippold/github/mitre/inspec-developer-2/node_modules/@mr-hope/vuepress-plugin-components/lib/client/components/BackToTop";


export default defineClientConfig({
  enhance: ({ app }) => {
    app.component("Badge", Badge);
    app.component("FontIcon", FontIcon);
    
  },
  setup: () => {
    useStyleTag(`@import url("//at.alicdn.com/t/font_2410206_h4r1xw8ppng.css");`);
    
  },
  rootComponents: [
    BackToTop,
    
  ],
});