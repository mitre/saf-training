// src/composables/layouts.ts
import { inject } from "vue";
var layoutsSymbol = Symbol(
  __VUEPRESS_DEV__ ? "layouts" : ""
);
var useLayouts = () => {
  const layouts = inject(layoutsSymbol);
  if (!layouts) {
    throw new Error("useLayouts() is called without provider.");
  }
  return layouts;
};

// src/composables/pageData.ts
import { inject as inject2, readonly } from "vue";
var pageDataSymbol = Symbol(
  __VUEPRESS_DEV__ ? "pageData" : ""
);
var pageDataEmpty = readonly({
  key: "",
  path: "",
  title: "",
  lang: "",
  frontmatter: {},
  headers: []
});
var usePageData = () => {
  const pageData = inject2(pageDataSymbol);
  if (!pageData) {
    throw new Error("pageData() is called without provider.");
  }
  return pageData;
};

// src/composables/pageFrontmatter.ts
import { inject as inject3 } from "vue";
var pageFrontmatterSymbol = Symbol(
  __VUEPRESS_DEV__ ? "pageFrontmatter" : ""
);
var usePageFrontmatter = () => {
  const pageFrontmatter = inject3(pageFrontmatterSymbol);
  if (!pageFrontmatter) {
    throw new Error("usePageFrontmatter() is called without provider.");
  }
  return pageFrontmatter;
};

// src/composables/pageHead.ts
import { inject as inject4 } from "vue";
var pageHeadSymbol = Symbol(
  __VUEPRESS_DEV__ ? "pageHead" : ""
);
var usePageHead = () => {
  const pageHead = inject4(pageHeadSymbol);
  if (!pageHead) {
    throw new Error("usePageHead() is called without provider.");
  }
  return pageHead;
};

// src/composables/pageHeadTitle.ts
import { inject as inject5 } from "vue";
var pageHeadTitleSymbol = Symbol(
  __VUEPRESS_DEV__ ? "pageHeadTitle" : ""
);
var usePageHeadTitle = () => {
  const pageHeadTitle = inject5(pageHeadTitleSymbol);
  if (!pageHeadTitle) {
    throw new Error("usePageHeadTitle() is called without provider.");
  }
  return pageHeadTitle;
};

// src/composables/pageLang.ts
import { inject as inject6 } from "vue";
var pageLangSymbol = Symbol(
  __VUEPRESS_DEV__ ? "pageLang" : ""
);
var usePageLang = () => {
  const pageLang = inject6(pageLangSymbol);
  if (!pageLang) {
    throw new Error("usePageLang() is called without provider.");
  }
  return pageLang;
};

// src/composables/pageLayout.ts
import { inject as inject7 } from "vue";
var pageLayoutSymbol = Symbol(
  __VUEPRESS_DEV__ ? "pageLayout" : ""
);
var usePageLayout = () => {
  const pageLayout = inject7(pageLayoutSymbol);
  if (!pageLayout) {
    throw new Error("usePageLayout() is called without provider.");
  }
  return pageLayout;
};

// src/composables/pagesData.ts
import { pagesData as pagesDataRaw } from "@internal/pagesData";
import { ref } from "vue";
var pagesData = ref(pagesDataRaw);
var usePagesData = () => pagesData;

// src/composables/routeLocale.ts
import { inject as inject8 } from "vue";
var routeLocaleSymbol = Symbol(
  __VUEPRESS_DEV__ ? "routeLocale" : ""
);
var useRouteLocale = () => {
  const routeLocale = inject8(routeLocaleSymbol);
  if (!routeLocale) {
    throw new Error("useRouteLocale() is called without provider.");
  }
  return routeLocale;
};

// src/composables/siteData.ts
import { siteData as siteDataRaw } from "@internal/siteData";
import { ref as ref2 } from "vue";
var siteData = ref2(siteDataRaw);
var useSiteData = () => siteData;
if (__VUEPRESS_DEV__ && (import.meta.webpackHot || import.meta.hot)) {
  __VUE_HMR_RUNTIME__.updateSiteData = (data) => {
    siteData.value = data;
  };
}

// src/composables/siteLocaleData.ts
import { inject as inject9 } from "vue";
var siteLocaleDataSymbol = Symbol(
  __VUEPRESS_DEV__ ? "siteLocaleData" : ""
);
var useSiteLocaleData = () => {
  const siteLocaleData = inject9(siteLocaleDataSymbol);
  if (!siteLocaleData) {
    throw new Error("useSiteLocaleData() is called without provider.");
  }
  return siteLocaleData;
};

// src/composables/updateHead.ts
import { inject as inject10 } from "vue";
var updateHeadSymbol = Symbol(
  __VUEPRESS_DEV__ ? "updateHead" : ""
);
var useUpdateHead = () => {
  const updateHead = inject10(updateHeadSymbol);
  if (!updateHead) {
    throw new Error("useUpdateHead() is called without provider.");
  }
  return updateHead;
};

// src/resolvers.ts
import {
  dedupeHead,
  isArray,
  isString,
  resolveLocalePath
} from "@vuepress/shared";
import { reactive } from "vue";

// src/constants.ts
var LAYOUT_NAME_DEFAULT = "Layout";
var LAYOUT_NAME_NOT_FOUND = "NotFound";

// src/resolvers.ts
var resolvers = reactive({
  /**
   * Resolve layouts component map
   */
  resolveLayouts: (clientConfigs) => clientConfigs.reduce(
    (prev, item) => ({
      ...prev,
      ...item.layouts
    }),
    {}
  ),
  /**
   * Resolve page data according to page key
   */
  resolvePageData: async (pageKey) => {
    const pageDataResolver = pagesData.value[pageKey];
    const pageData = await pageDataResolver?.();
    return pageData ?? pageDataEmpty;
  },
  /**
   * Resolve page frontmatter from page data
   */
  resolvePageFrontmatter: (pageData) => pageData.frontmatter,
  /**
   * Merge the head config in frontmatter and site locale
   *
   * Frontmatter should take priority over site locale
   */
  resolvePageHead: (headTitle, frontmatter, siteLocale) => {
    const description = isString(frontmatter.description) ? frontmatter.description : siteLocale.description;
    const head = [
      ...isArray(frontmatter.head) ? frontmatter.head : [],
      ...siteLocale.head,
      ["title", {}, headTitle],
      ["meta", { name: "description", content: description }]
    ];
    return dedupeHead(head);
  },
  /**
   * Resolve the content of page head title
   *
   * It would be used as the content of the `<title>` tag
   */
  resolvePageHeadTitle: (page, siteLocale) => [page.title, siteLocale.title].filter((item) => !!item).join(" | "),
  /**
   * Resolve page language from page data
   *
   * It would be used as the `lang` attribute of `<html>` tag
   */
  resolvePageLang: (page, siteLocale) => page.lang || siteLocale.lang || "en-US",
  /**
   * Resolve layout component of current page
   */
  resolvePageLayout: (page, layouts) => {
    let layoutName;
    if (page.path) {
      const frontmatterLayout = page.frontmatter.layout;
      if (isString(frontmatterLayout)) {
        layoutName = frontmatterLayout;
      } else {
        layoutName = LAYOUT_NAME_DEFAULT;
      }
    } else {
      layoutName = LAYOUT_NAME_NOT_FOUND;
    }
    return layouts[layoutName];
  },
  /**
   * Resolve locale path according to route path and locales config
   */
  resolveRouteLocale: (locales, routePath) => resolveLocalePath(locales, routePath),
  /**
   * Resolve site data for specific locale
   *
   * It would merge the locales fields to the root fields
   */
  resolveSiteLocaleData: (site, routeLocale) => ({
    ...site,
    ...site.locales[routeLocale]
  })
});

// src/components/ClientOnly.ts
import { defineComponent, onMounted, ref as ref3 } from "vue";
var ClientOnly = defineComponent({
  name: "ClientOnly",
  setup(_, ctx) {
    const isMounted = ref3(false);
    onMounted(() => {
      isMounted.value = true;
    });
    return () => isMounted.value ? ctx.slots.default?.() : null;
  }
});

// src/components/Content.ts
import { pagesComponents } from "@internal/pagesComponents";
import { computed, defineComponent as defineComponent2, h } from "vue";
var Content = defineComponent2({
  // eslint-disable-next-line vue/no-reserved-component-names
  name: "Content",
  props: {
    pageKey: {
      type: String,
      required: false,
      default: ""
    }
  },
  setup(props) {
    const page = usePageData();
    const pageComponent = computed(
      () => pagesComponents[props.pageKey || page.value.key]
    );
    return () => pageComponent.value ? (
      // use page component
      h(pageComponent.value)
    ) : (
      // fallback content
      h(
        "div",
        __VUEPRESS_DEV__ ? "Page does not exist. This is a fallback content." : "404 Not Found"
      )
    );
  }
});

// src/helpers/defineClientConfig.ts
var defineClientConfig = (clientConfig = {}) => clientConfig;

// src/helpers/withBase.ts
import { isLinkHttp, removeLeadingSlash } from "@vuepress/shared";
var withBase = (url) => {
  if (isLinkHttp(url))
    return url;
  return `${__VUEPRESS_BASE__}${removeLeadingSlash(url)}`;
};

export {
  layoutsSymbol,
  useLayouts,
  pageDataSymbol,
  pageDataEmpty,
  usePageData,
  pageFrontmatterSymbol,
  usePageFrontmatter,
  pageHeadSymbol,
  usePageHead,
  pageHeadTitleSymbol,
  usePageHeadTitle,
  pageLangSymbol,
  usePageLang,
  pageLayoutSymbol,
  usePageLayout,
  pagesData,
  usePagesData,
  routeLocaleSymbol,
  useRouteLocale,
  siteData,
  useSiteData,
  siteLocaleDataSymbol,
  useSiteLocaleData,
  updateHeadSymbol,
  useUpdateHead,
  resolvers,
  ClientOnly,
  Content,
  defineClientConfig,
  withBase
};
