import * as vue from 'vue';
import { PropType, VNode } from 'vue';

declare const _default: vue.DefineComponent<{
    /**
     * Flowchart code content
     *
     * 流程图代码内容
     */
    code: {
        type: StringConstructor;
        required: true;
    };
    /**
     * Flowchart id
     *
     * 流程图 id
     */
    id: {
        type: StringConstructor;
        required: true;
    };
    /**
     * Flowchart preset
     *
     * 流程图预设
     */
    preset: {
        type: PropType<"vue" | "pie" | "ant">;
        default: string;
    };
}, () => (VNode | null)[], unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {}, string, vue.PublicProps, Readonly<vue.ExtractPropTypes<{
    /**
     * Flowchart code content
     *
     * 流程图代码内容
     */
    code: {
        type: StringConstructor;
        required: true;
    };
    /**
     * Flowchart id
     *
     * 流程图 id
     */
    id: {
        type: StringConstructor;
        required: true;
    };
    /**
     * Flowchart preset
     *
     * 流程图预设
     */
    preset: {
        type: PropType<"vue" | "pie" | "ant">;
        default: string;
    };
}>>, {
    preset: "vue" | "pie" | "ant";
}, {}>;

export { _default as default };
