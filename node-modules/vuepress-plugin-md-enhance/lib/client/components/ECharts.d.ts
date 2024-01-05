import * as vue from 'vue';
import { PropType, VNode } from 'vue';

declare const _default: vue.DefineComponent<{
    /**
     * echarts config
     *
     * 图表配置
     */
    config: {
        type: StringConstructor;
        required: true;
    };
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
     * Chart title
     *
     * 图表标题
     */
    title: {
        type: StringConstructor;
        default: string;
    };
    /**
     * Chart config type
     *
     * 图表配置类型
     */
    type: {
        type: PropType<"js" | "json">;
        default: string;
    };
}, () => (VNode | null)[], unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {}, string, vue.PublicProps, Readonly<vue.ExtractPropTypes<{
    /**
     * echarts config
     *
     * 图表配置
     */
    config: {
        type: StringConstructor;
        required: true;
    };
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
     * Chart title
     *
     * 图表标题
     */
    title: {
        type: StringConstructor;
        default: string;
    };
    /**
     * Chart config type
     *
     * 图表配置类型
     */
    type: {
        type: PropType<"js" | "json">;
        default: string;
    };
}>>, {
    type: "js" | "json";
    title: string;
}, {}>;

export { _default as default };
