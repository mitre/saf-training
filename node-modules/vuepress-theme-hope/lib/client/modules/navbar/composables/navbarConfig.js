import { isLinkExternal, isString } from "@vuepress/shared";
import { computedWithControl } from "@vueuse/core";
import { useRouter } from "vue-router";
import { useThemeLocaleData } from "@theme-hope/composables/index";
import { resolveLinkInfo, resolvePrefix } from "@theme-hope/utils/index";
export const resolveNavbarItem = (router, item, prefix = "") => {
    if (isString(item))
        return resolveLinkInfo(router, resolvePrefix(prefix, item));
    if ("children" in item)
        return {
            ...item,
            ...(item.link && !isLinkExternal(item.link)
                ? resolveLinkInfo(router, resolvePrefix(prefix, item.link))
                : {}),
            children: item.children.map((child) => resolveNavbarItem(router, child, resolvePrefix(prefix, item.prefix))),
        };
    return {
        ...item,
        link: isLinkExternal(item.link)
            ? item.link
            : resolveLinkInfo(router, resolvePrefix(prefix, item.link)).link,
    };
};
export const useNavbarItems = () => {
    const themeLocaleData = useThemeLocaleData();
    const router = useRouter();
    const getNavbarItems = () => (themeLocaleData.value.navbar || []).map((item) => resolveNavbarItem(router, item));
    const navbarItems = computedWithControl(() => themeLocaleData.value.navbar, () => getNavbarItems());
    return navbarItems;
};
//# sourceMappingURL=navbarConfig.js.map