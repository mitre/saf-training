import {
  ClientOnly,
  Content,
  layoutsSymbol,
  pageDataSymbol,
  pageFrontmatterSymbol,
  pageHeadSymbol,
  pageHeadTitleSymbol,
  pageLangSymbol,
  pageLayoutSymbol,
  pagesData,
  resolvers,
  routeLocaleSymbol,
  siteData,
  siteLocaleDataSymbol,
  updateHeadSymbol,
  usePageHead,
  usePageLang,
  usePageLayout,
  withBase
} from "./chunk-DHNSDB55.js";

// src/app.ts
import { clientConfigs } from "@internal/clientConfigs";
import { createApp, createSSRApp, h as h2 } from "vue";
import { RouterView } from "vue-router";

// src/router.ts
import { pagesComponents } from "@internal/pagesComponents";
import { removeEndingSlash } from "@vuepress/shared";
import {
  createMemoryHistory,
  createRouter,
  createWebHistory,
  START_LOCATION
} from "vue-router";

// src/routes.ts
import { pagesRoutes } from "@internal/pagesRoutes";

// src/components/Vuepress.ts
import { defineComponent, h } from "vue";
var Vuepress = defineComponent({
  name: "Vuepress",
  setup() {
    const layout = usePageLayout();
    return () => h(layout.value);
  }
});

// src/routes.ts
var createRoutes = () => pagesRoutes.reduce(
  (result, [name, path, meta, redirects]) => {
    result.push(
      {
        name,
        path,
        component: Vuepress,
        meta
      },
      {
        path: path.endsWith("/") ? (
          // redirect from `/index.html` to `/`
          path + "index.html"
        ) : (
          // redirect from `/foo` to `/foo.html`
          path.substring(0, path.length - 5)
        ),
        redirect: path
      },
      ...redirects.map((item) => ({
        path: item === ":md" ? (
          // redirect from `/foo.md` to `/foo.html`
          path.substring(0, path.length - 5) + ".md"
        ) : item,
        redirect: path
      }))
    );
    return result;
  },
  [
    {
      name: "404",
      path: "/:catchAll(.*)",
      component: Vuepress
    }
  ]
);

// src/router.ts
var historyCreator = __VUEPRESS_SSR__ ? createMemoryHistory : createWebHistory;
var createVueRouter = () => {
  const router = createRouter({
    // it might be an issue of vue-router that have to remove the ending slash
    history: historyCreator(removeEndingSlash(__VUEPRESS_BASE__)),
    routes: createRoutes(),
    scrollBehavior: (to, from, savedPosition) => {
      if (savedPosition)
        return savedPosition;
      if (to.hash)
        return { el: to.hash };
      return { top: 0 };
    }
  });
  router.beforeResolve(async (to, from) => {
    if (to.path !== from.path || from === START_LOCATION) {
      ;
      [to.meta._data] = await Promise.all([
        resolvers.resolvePageData(to.name),
        pagesComponents[to.name]?.__asyncLoader()
      ]);
    }
  });
  return router;
};

// src/setupGlobalComponents.ts
var setupGlobalComponents = (app) => {
  app.component("ClientOnly", ClientOnly);
  app.component("Content", Content);
};

// src/setupGlobalComputed.ts
import { computedEager, computedWithControl } from "@vueuse/core";
import { computed } from "vue";
var setupGlobalComputed = (app, router, clientConfigs2) => {
  const routePath = computedEager(() => router.currentRoute.value.path);
  const routeLocale = computedEager(
    () => resolvers.resolveRouteLocale(siteData.value.locales, routePath.value)
  );
  const pageData = computedWithControl(
    routePath,
    () => router.currentRoute.value.meta._data
  );
  if (__VUEPRESS_DEV__ && (import.meta.webpackHot || import.meta.hot)) {
    __VUE_HMR_RUNTIME__.updatePageData = (data) => {
      pagesData.value[data.key] = () => Promise.resolve(data);
      if (data.key === router.currentRoute.value.meta._data?.key) {
        router.currentRoute.value.meta._data = data;
        pageData.trigger();
      }
    };
  }
  const layouts = computed(() => resolvers.resolveLayouts(clientConfigs2));
  const siteLocaleData = computed(
    () => resolvers.resolveSiteLocaleData(siteData.value, routeLocale.value)
  );
  const pageFrontmatter = computed(
    () => resolvers.resolvePageFrontmatter(pageData.value)
  );
  const pageHeadTitle = computed(
    () => resolvers.resolvePageHeadTitle(pageData.value, siteLocaleData.value)
  );
  const pageHead = computed(
    () => resolvers.resolvePageHead(
      pageHeadTitle.value,
      pageFrontmatter.value,
      siteLocaleData.value
    )
  );
  const pageLang = computed(
    () => resolvers.resolvePageLang(pageData.value, siteLocaleData.value)
  );
  const pageLayout = computed(
    () => resolvers.resolvePageLayout(pageData.value, layouts.value)
  );
  app.provide(layoutsSymbol, layouts);
  app.provide(pageDataSymbol, pageData);
  app.provide(pageFrontmatterSymbol, pageFrontmatter);
  app.provide(pageHeadTitleSymbol, pageHeadTitle);
  app.provide(pageHeadSymbol, pageHead);
  app.provide(pageLangSymbol, pageLang);
  app.provide(pageLayoutSymbol, pageLayout);
  app.provide(routeLocaleSymbol, routeLocale);
  app.provide(siteLocaleDataSymbol, siteLocaleData);
  Object.defineProperties(app.config.globalProperties, {
    $frontmatter: { get: () => pageFrontmatter.value },
    $head: { get: () => pageHead.value },
    $headTitle: { get: () => pageHeadTitle.value },
    $lang: { get: () => pageLang.value },
    $page: { get: () => pageData.value },
    $routeLocale: { get: () => routeLocale.value },
    $site: { get: () => siteData.value },
    $siteLocale: { get: () => siteLocaleData.value },
    $withBase: { get: () => withBase }
  });
  return {
    layouts,
    pageData,
    pageFrontmatter,
    pageHead,
    pageHeadTitle,
    pageLang,
    pageLayout,
    routeLocale,
    siteData,
    siteLocaleData
  };
};

// src/setupUpdateHead.ts
import { isPlainObject, isString } from "@vuepress/shared";
import { onMounted, provide, ref, useSSRContext, watch } from "vue";
var setupUpdateHead = () => {
  const head = usePageHead();
  const lang = usePageLang();
  if (__VUEPRESS_SSR__) {
    const ssrContext = useSSRContext();
    if (ssrContext) {
      ssrContext.head = head.value;
      ssrContext.lang = lang.value;
    }
    return;
  }
  const headTags = ref([]);
  const loadHead = () => {
    head.value.forEach((item) => {
      const tag = queryHeadTag(item);
      if (tag) {
        headTags.value.push(tag);
      }
    });
  };
  const updateHead = () => {
    document.documentElement.lang = lang.value;
    headTags.value.forEach((item) => {
      if (item.parentNode === document.head) {
        document.head.removeChild(item);
      }
    });
    headTags.value.splice(0, headTags.value.length);
    head.value.forEach((item) => {
      const tag = createHeadTag(item);
      if (tag !== null) {
        document.head.appendChild(tag);
        headTags.value.push(tag);
      }
    });
  };
  provide(updateHeadSymbol, updateHead);
  onMounted(() => {
    loadHead();
    updateHead();
    watch(() => head.value, updateHead);
  });
};
var queryHeadTag = ([
  tagName,
  attrs,
  content = ""
]) => {
  const attrsSelector = Object.entries(attrs).map(([key, value]) => {
    if (isString(value)) {
      return `[${key}=${JSON.stringify(value)}]`;
    }
    if (value === true) {
      return `[${key}]`;
    }
    return "";
  }).join("");
  const selector = `head > ${tagName}${attrsSelector}`;
  const tags = Array.from(document.querySelectorAll(selector));
  const matchedTag = tags.find((item) => item.innerText === content);
  return matchedTag || null;
};
var createHeadTag = ([
  tagName,
  attrs,
  content
]) => {
  if (!isString(tagName)) {
    return null;
  }
  const tag = document.createElement(tagName);
  if (isPlainObject(attrs)) {
    Object.entries(attrs).forEach(([key, value]) => {
      if (isString(value)) {
        tag.setAttribute(key, value);
      } else if (value === true) {
        tag.setAttribute(key, "");
      }
    });
  }
  if (isString(content)) {
    tag.appendChild(document.createTextNode(content));
  }
  return tag;
};

// src/app.ts
var appCreator = __VUEPRESS_DEV__ ? createApp : createSSRApp;
var createVueApp = async () => {
  const app = appCreator({
    name: "VuepressApp",
    setup() {
      setupUpdateHead();
      for (const clientConfig of clientConfigs) {
        clientConfig.setup?.();
      }
      return () => [
        h2(RouterView),
        ...clientConfigs.flatMap(
          ({ rootComponents = [] }) => rootComponents.map((component) => h2(component))
        )
      ];
    }
  });
  const router = createVueRouter();
  setupGlobalComponents(app);
  const globalComputed = setupGlobalComputed(app, router, clientConfigs);
  if (__VUEPRESS_DEV__ || __VUE_PROD_DEVTOOLS__) {
    const { setupDevtools } = await import("./setupDevtools-X4YFRK4B.js");
    setupDevtools(app, globalComputed);
  }
  for (const clientConfig of clientConfigs) {
    await clientConfig.enhance?.({ app, router, siteData });
  }
  app.use(router);
  return {
    app,
    router
  };
};
if (!__VUEPRESS_SSR__) {
  createVueApp().then(({ app, router }) => {
    router.isReady().then(() => {
      app.mount("#app");
    });
  });
}
export {
  createVueApp
};
