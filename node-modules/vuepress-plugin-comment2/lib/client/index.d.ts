import { ArtalkConfig } from 'artalk';
import { B as BaseCommentOptions, d as GiscusOptions } from './giscus-GH2tKe8n.js';
export { c as GiscusInputPosition, a as GiscusMapping, G as GiscusRepo, b as GiscusTheme } from './giscus-GH2tKe8n.js';
import { WalineLocale, WalineInitOptions } from '@waline/client';
import { BasePageFrontMatter, RequiredLocaleConfig } from 'vuepress-shared';

interface CommentPluginFrontmatter extends BasePageFrontMatter {
    /**
     * 是否启用评论
     *
     * Whether Enable Comment
     *
     * @default true
     */
    comment?: boolean;
    /**
     * Comment identifier
     *
     * 评论标识符
     */
    commentID?: string;
    /**
     * @description Only available when using valine
     *
     * 是否启用访问量
     *
     * Whether enable pageviews
     *
     * @default true
     */
    pageview?: boolean;
}

type ArtalkOptions = BaseCommentOptions & Partial<Omit<ArtalkConfig, "el" | "pageKey">>;

interface DisableCommentOptions extends BaseCommentOptions {
    provider?: "None";
    comment?: never;
}

interface TwikooInitOptions {
    /**
     * Environment ID for tencloud or Link for Vercel
     *
     * 腾讯云环境链接或 Vercel Link
     */
    envId: string;
    /**
     * Tencloud region
     *
     * 腾讯云区域
     *
     * @default "ap-shanghai"
     */
    region?: string;
}
type TwikooOptions = BaseCommentOptions & TwikooInitOptions;

type WalineLocaleData = Partial<WalineLocale>;
type WalineLocaleConfig = RequiredLocaleConfig<WalineLocaleData>;
interface WalineOptions extends BaseCommentOptions, Omit<WalineInitOptions, "el" | "comment" | "locale"> {
    /**
     * Whether enable page views count by default
     *
     * 是否启用访问量
     *
     * @default true
     */
    pageview?: boolean;
}

/**
 * 评论选项
 *
 * Comment options
 */
type CommentOptions = ArtalkOptions | GiscusOptions | TwikooOptions | WalineOptions | DisableCommentOptions;

declare const defineArtalkConfig: (options: ArtalkOptions) => void;
declare const defineGiscusConfig: (options: GiscusOptions) => void;
declare const defineTwikooConfig: (options: TwikooOptions) => void;
declare const defineWalineConfig: (options: WalineOptions) => void;

export { type ArtalkOptions, type CommentOptions, type CommentPluginFrontmatter, type DisableCommentOptions, GiscusOptions, type TwikooInitOptions, type TwikooOptions, type WalineLocaleConfig, type WalineLocaleData, type WalineOptions, defineArtalkConfig, defineGiscusConfig, defineTwikooConfig, defineWalineConfig };
