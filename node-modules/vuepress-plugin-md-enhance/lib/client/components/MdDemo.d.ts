import * as vue from 'vue';
import { VNode, SlotsType } from 'vue';

declare const _default: vue.DefineComponent<{
    /**
     * Markdown demo id
     *
     * Markdown 代码演示 id
     */
    id: {
        type: StringConstructor;
        required: true;
    };
    /**
     * Markdown demo title
     *
     * Markdown 演示标题
     */
    title: {
        type: StringConstructor;
        default: string;
    };
}, () => VNode, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {}, string, vue.PublicProps, Readonly<vue.ExtractPropTypes<{
    /**
     * Markdown demo id
     *
     * Markdown 代码演示 id
     */
    id: {
        type: StringConstructor;
        required: true;
    };
    /**
     * Markdown demo title
     *
     * Markdown 演示标题
     */
    title: {
        type: StringConstructor;
        default: string;
    };
}>>, {
    title: string;
}, SlotsType<{
    default: () => VNode[];
    code: () => VNode[];
}>>;

export { _default as default };
