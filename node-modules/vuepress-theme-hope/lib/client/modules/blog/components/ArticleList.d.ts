import type { PropType, VNode } from "vue";
import type { ArticleInfo } from "../../../../shared/index.js";
import "../styles/article-list.scss";
declare const _default: import("vue").DefineComponent<{
    /**
     * Articles
     *
     * 文章项目
     */
    items: {
        type: PropType<{
            path: string;
            info: ArticleInfo;
        }[]>;
        default: () => never[];
    };
}, () => VNode, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    /**
     * Articles
     *
     * 文章项目
     */
    items: {
        type: PropType<{
            path: string;
            info: ArticleInfo;
        }[]>;
        default: () => never[];
    };
}>>, {
    items: {
        path: string;
        info: ArticleInfo;
    }[];
}, {}>;
export default _default;
