import type { VNode } from "vue";
import "../styles/appearance-switch.scss";
declare global {
    interface ViewTransition {
        ready: Promise<void>;
    }
    interface Document {
        startViewTransition: (callback: () => Promise<void>) => ViewTransition;
    }
}
declare const _default: import("vue").DefineComponent<{}, () => VNode, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{}>>, {}, {}>;
export default _default;
