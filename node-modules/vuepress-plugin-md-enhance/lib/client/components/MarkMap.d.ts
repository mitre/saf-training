import * as vue from 'vue';
import { VNode } from 'vue';

declare const _default: vue.DefineComponent<{
    /**
     * Chart id
     *
     * 图表 id
     */
    id: {
        type: StringConstructor;
        required: true;
    };
    /**
     * Markmap content
     *
     * Markmap
     */
    content: {
        type: StringConstructor;
        required: true;
    };
}, () => VNode, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {}, string, vue.PublicProps, Readonly<vue.ExtractPropTypes<{
    /**
     * Chart id
     *
     * 图表 id
     */
    id: {
        type: StringConstructor;
        required: true;
    };
    /**
     * Markmap content
     *
     * Markmap
     */
    content: {
        type: StringConstructor;
        required: true;
    };
}>>, {}, {}>;

export { _default as default };
