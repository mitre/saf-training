import * as vue from 'vue';
import { VNode } from 'vue';

declare const _default: vue.DefineComponent<{
    /**
     * Mermaid id
     */
    id: {
        type: StringConstructor;
        required: true;
    };
    /**
     * Mermaid config
     *
     * Mermaid 配置
     */
    code: {
        type: StringConstructor;
        required: true;
    };
    /**
     * Mermaid title
     *
     * Mermaid 标题
     */
    title: {
        type: StringConstructor;
        default: string;
    };
}, () => VNode[], unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {}, string, vue.PublicProps, Readonly<vue.ExtractPropTypes<{
    /**
     * Mermaid id
     */
    id: {
        type: StringConstructor;
        required: true;
    };
    /**
     * Mermaid config
     *
     * Mermaid 配置
     */
    code: {
        type: StringConstructor;
        required: true;
    };
    /**
     * Mermaid title
     *
     * Mermaid 标题
     */
    title: {
        type: StringConstructor;
        default: string;
    };
}>>, {
    title: string;
}, {}>;

export { _default as default };
