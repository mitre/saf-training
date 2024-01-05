import { WalineLocale, WalineInitOptions } from '@waline/client';
import { BasePageFrontMatter, RequiredLocaleConfig } from 'vuepress-shared';
import { LocaleConfig, PluginFunction } from '@vuepress/core';
import { ArtalkConfig } from 'artalk';

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

interface BaseCommentOptions {
    /**
     * Whether enable comment by default
     *
     * 是否默认启用评论
     *
     * @default true
     */
    comment?: boolean;
    /**
     * The delay of dom operation, in ms
     *
     * If the theme you are using has a switching animation, it is recommended to configure this option to `Switch animation duration + 200`
     *
     * 进行 DOM 操作的延时，单位 ms
     *
     * 如果你使用的主题有切换动画，建议配置此选项为 `切换动画时长 + 200`
     *
     * @default 800
     */
    delay?: number;
}

type ArtalkOptions = BaseCommentOptions & Partial<Omit<ArtalkConfig, "el" | "pageKey">>;

interface DisableCommentOptions extends BaseCommentOptions {
    provider?: "None";
    comment?: never;
}

type GiscusRepo = `${string}/${string}`;
type GiscusMapping = "url" | "title" | "og:title" | "specific" | "number" | "pathname";
type GiscusInputPosition = "top" | "bottom";
type GiscusTheme = "light" | "light_high_contrast" | "light_protanopia" | "dark" | "dark_high_contrast" | "dark_protanopia" | "dark_dimmed" | "transparent_dark" | "preferred_color_scheme" | `https://${string}`;
interface GiscusOptions extends BaseCommentOptions {
    /**
     * The name of repository to store discussions.
     *
     * 存放评论的仓库
     */
    repo: GiscusRepo;
    /**
     * The ID of repository to store discussions.
     *
     * 仓库 ID
     */
    repoId: string;
    /**
     * The name of the discussion category.
     *
     * 讨论分类
     */
    category: string;
    /**
     * The ID of the discussion category.
     *
     * 分类 ID
     */
    categoryId: string;
    /**
     * Page - discussion mapping.
     *
     * 页面 ↔️ discussion 映射关系
     *
     * @default "pathname"
     */
    mapping?: GiscusMapping;
    /**
     * Whether enable strict mapping
     *
     * 是否启用严格匹配
     *
     * @default true
     */
    strict?: boolean;
    /**
     * Whether enable lazy loading
     *
     * 是否启用懒加载
     *
     * @default true
     */
    lazyLoading?: boolean;
    /**
     * Whether enable reactions or not
     *
     * 是否启用主帖子上的反应
     *
     * @default true
     */
    reactionsEnabled?: boolean;
    /**
     * Input position
     *
     * 输入框的位置
     *
     * @default "top"
     */
    inputPosition?: GiscusInputPosition;
    /**
     * Giscus theme used in lightmode
     *
     * @description Should be a built-in theme keyword or a css link starting with `https://`
     *
     * Giscus 在日间模式下使用的主题
     *
     * @description 应为一个内置主题关键词或者一个 CSS 链接
     *
     * @default "light"
     */
    lightTheme?: GiscusTheme;
    /**
     * Giscus theme used in darkmode
     *
     * @description Should be a built-in theme keyword or a css link starting with `https://`
     *
     * Giscus 在夜间模式下使用的主题
     *
     * @description 应为一个内置主题关键词或者一个 CSS 链接
     *
     * @default "dark"
     */
    darkTheme?: GiscusTheme;
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

/**
 * Default locale config for Waline
 */
declare const walineLocales: WalineLocaleConfig;

interface ArtalkPluginOptions extends Omit<Partial<ArtalkOptions>, "imgUploader" | "avatarURLBuilder"> {
    provider: "Artalk";
}
interface GiscusPluginOptions extends Partial<GiscusOptions> {
    provider: "Giscus";
}
interface TwikooPluginOptions extends Partial<TwikooOptions> {
    provider: "Twikoo";
}
interface WalinePluginOptions extends Omit<Partial<WalineOptions>, "search" | "highlighter" | "imageUploader" | "texRenderer"> {
    provider: "Waline";
    /**
     * Whether import meta icons
     *
     * 是否导入 Meta 图标
     *
     * @default true
     */
    metaIcon?: boolean;
    /**
     * Locale config for waline
     */
    locales?: LocaleConfig<WalineLocaleData>;
}
/**
 * 评论选项
 *
 * Comment options
 */
type CommentPluginOptions = ArtalkPluginOptions | GiscusPluginOptions | TwikooPluginOptions | WalinePluginOptions | DisableCommentOptions;

/** Comment Plugin */
declare const commentPlugin: (options: CommentPluginOptions, legacy?: boolean) => PluginFunction;

export { type ArtalkOptions, type ArtalkPluginOptions, type CommentOptions, type CommentPluginFrontmatter, type CommentPluginOptions, type DisableCommentOptions, type GiscusInputPosition, type GiscusMapping, type GiscusOptions, type GiscusPluginOptions, type GiscusRepo, type GiscusTheme, type TwikooInitOptions, type TwikooOptions, type TwikooPluginOptions, type WalineLocaleConfig, type WalineLocaleData, type WalineOptions, type WalinePluginOptions, commentPlugin, walineLocales };
