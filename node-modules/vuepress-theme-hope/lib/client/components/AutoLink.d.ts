import type { PropType, SlotsType, VNode } from "vue";
import type { AutoLinkOptions } from "../../shared/index.js";
declare const _default: import("vue").DefineComponent<{
    /**
     * @description Autolink config
     */
    config: {
        type: PropType<AutoLinkOptions>;
        required: true;
    };
    /**
     * @description Whether it's active only when exact match
     */
    exact: BooleanConstructor;
    /**
     * @description Whether to hide externalLinkIcon
     */
    noExternalLinkIcon: BooleanConstructor;
}, () => VNode, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, "focusout"[], "focusout", import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    /**
     * @description Autolink config
     */
    config: {
        type: PropType<AutoLinkOptions>;
        required: true;
    };
    /**
     * @description Whether it's active only when exact match
     */
    exact: BooleanConstructor;
    /**
     * @description Whether to hide externalLinkIcon
     */
    noExternalLinkIcon: BooleanConstructor;
}>> & {
    onFocusout?: (...args: any[]) => any;
}, {
    exact: boolean;
    noExternalLinkIcon: boolean;
}, SlotsType<{
    before?: () => VNode[] | VNode | null;
    after?: () => VNode[] | VNode | null;
    default?: () => VNode[] | VNode;
}>>;
export default _default;
