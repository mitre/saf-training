import * as vue from 'vue';
import { VNode } from 'vue';
import { G as GiscusRepo, a as GiscusMapping, b as GiscusTheme, c as GiscusInputPosition } from '../giscus-GH2tKe8n.js';

declare const SUPPORTED_LANGUAGES: readonly ["ar", "ca", "de", "en", "eo", "es", "fa", "fr", "he", "id", "it", "ja", "ko", "nl", "pl", "pt", "ro", "ru", "th", "tr", "uk", "vi", "zh-CN", "zh-TW"];
type BooleanString = "0" | "1";
type GiscusLang = (typeof SUPPORTED_LANGUAGES)[number];
type GiscusLoading = "lazy" | "eager";
interface GiscusProps {
    id?: string | undefined;
    repo: GiscusRepo;
    repoId: string;
    category?: string | undefined;
    categoryId?: string | undefined;
    mapping: GiscusMapping;
    term?: string | undefined;
    theme?: GiscusTheme | undefined;
    reactionsEnabled?: BooleanString | undefined;
    strict?: BooleanString | undefined;
    emitMetadata?: BooleanString | undefined;
    inputPosition?: GiscusInputPosition | undefined;
    lang?: GiscusLang | undefined;
    loading?: GiscusLoading | undefined;
}
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

export { type GiscusLang, type GiscusLoading, type GiscusProps, _default as default };
