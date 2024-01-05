import { isString } from "@vuepress/shared";
import { h } from "vue";
import { useRoute } from "vue-router";
import AutoLink from "@theme-hope/components/AutoLink";
import HopeIcon from "@theme-hope/components/HopeIcon";
import { isActiveSidebarItem } from "@theme-hope/modules/sidebar/utils/index";
export const renderSidebarItem = (config, props) => isString(config.link)
    ? // if the item has link, render it as `<AutoLink>`
        h(AutoLink, {
            ...props,
            config: config,
        })
    : // if the item only has text, render it as `<p>`
        h("p", props, [h(HopeIcon, { icon: config.icon }), config.text]);
export const renderSidebarChildren = (children) => {
    const route = useRoute();
    return children
        ? h("ul", { class: "vp-sidebar-sub-headers" }, children.map((child) => h("li", { class: "vp-sidebar-sub-header" }, [
            renderSidebarItem(child, {
                class: [
                    "vp-sidebar-link",
                    "vp-heading",
                    { active: isActiveSidebarItem(route, child, true) },
                ],
            }),
            renderSidebarChildren(child.children),
        ])))
        : null;
};
//# sourceMappingURL=render.js.map