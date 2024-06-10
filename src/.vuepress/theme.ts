import { hopeTheme } from "vuepress-theme-hope";
import navbar from "./navbar.js";
import sidebar from "./sidebar.js";

export default hopeTheme({
  hostname: "https://mitre.github.io/saf-training/",

  author: {
    name: "The MITRE SAF Team",
    url: "https://saf.mitre.org/training",
  },

  iconAssets: "//at.alicdn.com/t/font_2410206_h4r1xw8ppng.css",
  iconPrefix: "iconfont icon-",
  logo: "/logo.svg",
  repo: "mitre/saf-training",
  docsDir: "src",
  navbar,
  sidebar,
  footer: "Apache-2.0 | Copyright © 2022 - The MITRE Corporation",
  displayFooter: true,
  encrypt: {
    config: {
      "/demo/encrypt.html": ["1234"],
    },
  },

  metaLocales: {
    editLink: "Edit this page on GitHub",
  },

  plugins: {
    // You should generate and use your own comment service
    comment: {
      provider: "Giscus",
      repo: "mitre/saf-training",
      repoId: "R_kgDOH3sAZQ",
      category: "Ideas",
      categoryId: "DIC_kwDOH3sAZc4CRApY",
      mapping: "pathname",
    },

    components: {
      components: ["Badge", "VPCard"],
    },

    // All features are enabled for demo, only preserve features you need here
    mdEnhance: {
      align: true,
      attrs: true,
      // install chart.js before enabling it
      // chart: true,
      codetabs: true,
      component: true,
      demo: true,
      // install echarts before enabling it
      // echarts: true,
      figure: true,
      // install flowchart.ts before enabling it
      flowchart: true,
      gfm: true,
      imgLazyload: true,
      imgSize: true,
      include: true,
      // install katex before enabling it
      // katex: true,
      // install mathjax-full before enabling it
      // mathjax: true,
      mark: true,
      mermaid: true,
      // plantuml: true,
      playground: {
        presets: ["ts", "vue"],
      },
      // install reveal.js before enabling it
      revealJs: {
        plugins: ["highlight", "math", "search", "notes", "zoom"],
      },
      // install sandpack-vue3 before enabling it
      // sandpack: true,
      // spoiler: true,
      stylize: [
        {
          matcher: "Recommended",
          replacer: ({ tag }) => {
            if (tag === "em")
              return {
                tag: "Badge",
                attrs: { type: "tip" },
                content: "Recommended",
              };
          },
        },
      ],
      sub: true,
      sup: true,
      tabs: true,
      // tasklist: true,
      vPre: true,
      // install @vue/repl before enabling it
      // vuePlayground: true,
    },

    // install @vuepress/plugin-pwa and uncomment these if you want a PWA
    // pwa: {
    //   favicon: "/favicon.ico",
    //   cacheHTML: true,
    //   cacheImage: true,
    //   appendBase: true,
    //   apple: {
    //     icon: "/assets/icon/apple-icon-152.png",
    //     statusBarColor: "black",
    //   },
    //   msTile: {
    //     image: "/assets/icon/ms-icon-144.png",
    //     color: "#ffffff",
    //   },
    //   manifest: {
    //     icons: [
    //       {
    //         src: "/assets/icon/chrome-mask-512.png",
    //         sizes: "512x512",
    //         purpose: "maskable",
    //         type: "image/png",
    //       },
    //       {
    //         src: "/assets/icon/chrome-mask-192.png",
    //         sizes: "192x192",
    //         purpose: "maskable",
    //         type: "image/png",
    //       },
    //       {
    //         src: "/assets/icon/chrome-512.png",
    //         sizes: "512x512",
    //         type: "image/png",
    //       },
    //       {
    //         src: "/assets/icon/chrome-192.png",
    //         sizes: "192x192",
    //         type: "image/png",
    //       },
    //     ],
    //     shortcuts: [
    //       {
    //         name: "Demo",
    //         short_name: "Demo",
    //         url: "/demo/",
    //         icons: [
    //           {
    //             src: "/assets/icon/guide-maskable.png",
    //             sizes: "192x192",
    //             purpose: "maskable",
    //             type: "image/png",
    //           },
    //         ],
    //       },
    //     ],
    //   },
    // },
  },
});
