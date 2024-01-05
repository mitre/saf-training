import type { PropType, SlotsType, VNode } from "vue";
import type { PageInfoProps } from "@theme-hope/modules/info/components/PageInfo";
import type { ArticleInfo } from "../../../../shared/index.js";
import "../styles/article-item.scss";
declare const _default: import("vue").DefineComponent<{
    /**
     * Article information
     *
     * 文章信息
     */
    info: {
        type: PropType<ArticleInfo>;
        required: true;
    };
    /**
     * Article path
     *
     * 文章路径
     */
    path: {
        type: StringConstructor;
        required: true;
    };
}, () => VNode, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    /**
     * Article information
     *
     * 文章信息
     */
    info: {
        type: PropType<ArticleInfo>;
        required: true;
    };
    /**
     * Article path
     *
     * 文章路径
     */
    path: {
        type: StringConstructor;
        required: true;
    };
}>>, {}, SlotsType<{
    cover?: (props: {
        cover: string | undefined;
    }) => VNode[] | VNode | null;
    title?: (props: {
        title: string;
        isEncrypted?: boolean;
        type: string;
    }) => VNode[] | VNode | null;
    excerpt?: (props: {
        excerpt: string | undefined;
    }) => VNode[] | VNode | null;
    info?: (props: {
        info: PageInfoProps;
    }) => VNode[] | VNode | null;
}>>;
export default _default;
