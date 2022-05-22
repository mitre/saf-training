import { defineAsyncComponent } from 'vue'

export const layoutComponents = {
  "404": defineAsyncComponent(() => import("/Users/alippold/github/mitre/inspec-developer-2/node_modules/vuepress-theme-hope/lib/client/layouts/404.js")),
  "Layout": defineAsyncComponent(() => import("/Users/alippold/github/mitre/inspec-developer-2/node_modules/vuepress-theme-hope/lib/client/layouts/Layout.js")),
  "Slide": defineAsyncComponent(() => import("/Users/alippold/github/mitre/inspec-developer-2/node_modules/vuepress-theme-hope/lib/client/layouts/Slide.js")),
  "Blog": defineAsyncComponent(() => import("/Users/alippold/github/mitre/inspec-developer-2/node_modules/vuepress-theme-hope/lib/client/module/blog/layouts/Blog.js")),
}
