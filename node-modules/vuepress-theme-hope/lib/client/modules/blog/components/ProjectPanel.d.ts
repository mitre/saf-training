import type { PropType, VNode } from "vue";
import type { ThemeBlogHomeProjectOptions } from "../../../../shared/index.js";
import "../styles/project-panel.scss";
declare const _default: import("vue").DefineComponent<{
    /** 项目列表 */
    items: {
        type: PropType<ThemeBlogHomeProjectOptions[]>;
        required: true;
    };
}, () => VNode | null, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    /** 项目列表 */
    items: {
        type: PropType<ThemeBlogHomeProjectOptions[]>;
        required: true;
    };
}>>, {}, {}>;
export default _default;
