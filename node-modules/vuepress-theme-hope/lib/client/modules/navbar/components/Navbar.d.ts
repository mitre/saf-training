import type { SlotsType, VNode } from "vue";
import "../styles/navbar.scss";
declare const _default: import("vue").DefineComponent<{}, () => VNode[], {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, "toggleSidebar"[], "toggleSidebar", import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{}>> & {
    onToggleSidebar?: (...args: any[]) => any;
}, {}, SlotsType<{
    default: () => VNode[] | VNode | null;
    startBefore?: () => VNode[] | VNode | null;
    startAfter?: () => VNode[] | VNode | null;
    centerBefore?: () => VNode[] | VNode | null;
    centerAfter?: () => VNode[] | VNode | null;
    endBefore?: () => VNode[] | VNode | null;
    endAfter?: () => VNode[] | VNode | null;
    screenTop?: () => VNode[] | VNode | null;
    screenBottom?: () => VNode[] | VNode | null;
}>>;
export default _default;
