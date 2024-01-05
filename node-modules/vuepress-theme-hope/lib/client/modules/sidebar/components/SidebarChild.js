import { defineComponent } from "vue";
import { useRoute } from "vue-router";
import { renderSidebarChildren, renderSidebarItem, } from "@theme-hope/modules/sidebar/composables/index";
import { isActiveSidebarItem } from "@theme-hope/modules/sidebar/utils/index";
import "../styles/sidebar-child.scss";
export default defineComponent({
    name: "SidebarChild",
    props: {
        /**
         * Sidebar item config
         *
         * 侧边栏项目配置
         */
        config: {
            type: Object,
            required: true,
        },
    },
    setup(props) {
        const route = useRoute();
        return () => [
            renderSidebarItem(props.config, {
                class: [
                    "vp-sidebar-link",
                    `vp-sidebar-${props.config.type}`,
                    { active: isActiveSidebarItem(route, props.config, true) },
                ],
                exact: true,
            }),
            renderSidebarChildren(props.config.children),
        ];
    },
});
//# sourceMappingURL=SidebarChild.js.map