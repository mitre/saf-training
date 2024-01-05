import { usePageData, usePageFrontmatter } from "@vuepress/client";
import { computedWithControl } from "@vueuse/core";
import { computed, inject, provide } from "vue";
import { useThemeLocaleData } from "@theme-hope/composables/index";
import { resolveSidebarItems } from "./resolveConfig.js";
export const sidebarItemsSymbol = Symbol(__VUEPRESS_DEV__ ? "sidebarItems" : "");
/**
 * Create sidebar items ref and provide as global computed in setup
 */
export const setupSidebarItems = () => {
    const frontmatter = usePageFrontmatter();
    const themeLocale = useThemeLocaleData();
    const page = usePageData();
    // get sidebar config from frontmatter > themeConfig
    const sidebarConfig = computed(() => frontmatter.value.home
        ? false
        : frontmatter.value.sidebar ?? themeLocale.value.sidebar ?? "structure");
    const headerDepth = computed(() => frontmatter.value.headerDepth ?? themeLocale.value.headerDepth ?? 2);
    const sidebarItems = computedWithControl(() => [
        sidebarConfig.value,
        headerDepth.value,
        page.value.path,
        __VUEPRESS_DEV__ ? page.value.headers : null,
    ], () => resolveSidebarItems(sidebarConfig.value, headerDepth.value));
    provide(sidebarItemsSymbol, sidebarItems);
};
/**
 * Inject sidebar items global computed
 */
export const useSidebarItems = () => {
    const sidebarItems = inject(sidebarItemsSymbol);
    if (!sidebarItems)
        throw new Error("useSidebarItems() is called without provider.");
    return sidebarItems;
};
//# sourceMappingURL=setup.js.map