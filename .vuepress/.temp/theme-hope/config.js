import { defineClientConfig } from "@vuepress/client";

import CommonWrapper from "@theme-hope/components/CommonWrapper";
import HomePage from "@theme-hope/components/HomePage";
import NormalPage from "@theme-hope/components/NormalPage";
import Navbar from "@theme-hope/module/navbar/components/Navbar";
import Sidebar from "@theme-hope/module/sidebar/components/Sidebar";

import { useScrollPromise } from "@theme-hope/composables";
import { setupDarkMode } from "@theme-hope/module/outlook/composables";
import { setupSidebarItems } from "@theme-hope/module/sidebar/composables";

import "/Users/alippold/github/mitre/inspec-developer-2/node_modules/vuepress-theme-hope/lib/client/styles/index.scss";


import BloggerInfo from "@theme-hope/module/blog/components/BloggerInfo";
import BlogHome from "@theme-hope/module/blog/components/BlogHome";
import BlogPage from "@theme-hope/module/blog/components/BlogPage";
import { setupBlog } from "@theme-hope/module/blog/composables";
import "/Users/alippold/github/mitre/inspec-developer-2/node_modules/vuepress-theme-hope/lib/client/module/blog/styles/layout.scss";


export default defineClientConfig({
  enhance: ({ app, router }) => {
    const { scrollBehavior } = router.options;

    router.options.scrollBehavior = async (...args) => {
      await useScrollPromise().wait();

      return scrollBehavior(...args);
    };

    // register to inject styles
    app.component("CommonWrapper", CommonWrapper);
    app.component("HomePage", HomePage);
    app.component("NormalPage", NormalPage);
    app.component("Navbar", Navbar);
    app.component("Sidebar", Sidebar);

    
    app.component("BloggerInfo", BloggerInfo);
    app.component("BlogHome", BlogHome);
    app.component("BlogPage", BlogPage);
    
  },
  setup: () => {
    setupDarkMode();
    setupSidebarItems();
    setupBlog();
    
  },
});