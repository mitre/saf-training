import * as vue from 'vue';
import { VNode } from 'vue';

declare const _default: vue.DefineComponent<{
    /**
     * The path of the comment
     */
    identifier: {
        type: StringConstructor;
        required: true;
    };
    /**
     * Whether the component is in darkmode
     *
     * 组件是否处于夜间模式
     */
    darkmode: BooleanConstructor;
}, () => VNode | null, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {}, string, vue.PublicProps, Readonly<vue.ExtractPropTypes<{
    /**
     * The path of the comment
     */
    identifier: {
        type: StringConstructor;
        required: true;
    };
    /**
     * Whether the component is in darkmode
     *
     * 组件是否处于夜间模式
     */
    darkmode: BooleanConstructor;
}>>, {
    darkmode: boolean;
}, {}>;

export { _default as default };
