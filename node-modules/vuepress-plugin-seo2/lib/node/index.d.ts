import { Page, App, HeadConfig, PluginFunction } from '@vuepress/core';
import { BasePageFrontMatter, Author } from 'vuepress-shared/node';
import { GitData } from '@vuepress/plugin-git';

interface SEOPluginFrontmatter extends BasePageFrontMatter {
    /**
     * Whether inject seo information for current page
     *
     * @default true
     */
    seo?: boolean;
}

interface SeoPluginPageData {
    autoDesc?: true;
    excerpt?: string;
    git?: GitData;
}
type ExtendPage<ExtraPageData extends Record<string, unknown> = Record<never, never>, ExtraPageFrontmatter extends Record<string, unknown> = Record<string, unknown>, ExtraPageFields extends Record<string, unknown> = Record<never, never>> = Page<ExtraPageData & SeoPluginPageData, ExtraPageFrontmatter & SEOPluginFrontmatter, ExtraPageFields>;

interface BaseSeoContent {
    /**
     * 文章的标题，不包含任何品牌，例如你的网站名称。
     *
     * The title of your object as it should appear within the graph, e.g., "The Rock".
     */
    "og:title": string;
    /**
     * 页面类型，根据你选择类别的不同，可能需要填写其他属性。
     *
     * The type of your object, e.g., "video.movie".
     * Depending on the type you specify, other properties may also be required.
     */
    "og:type": "music.song" | "music.album" | "music.playlist" | "music.radio_station" | "video.movie" | "video.episode" | "video.tv_show" | "video.other" | "article" | "book" | "profile" | "website";
    /**
     * 页面的图片网址。图片应至少为 600×315 像素，但最好是 1200×630 像素或更大的尺寸 (大小不超过 5MB)。
     * 将长宽比保持在 1.91:1 左右，以避免裁剪。
     * 游戏图标应为正方形，且至少为 600×600 像素。
     * 如果在发布图片后更新了图片，请使用新网址，因为系统会根据之前的网址缓存图片，可能不会更新图片。
     *
     * An image URL which should represent your object within the graph.
     */
    "og:image": string;
    /**
     * 页面的权威链接。此标签应该是未加修饰的网址，没有会话变量、用户识别参数或计数器。
     * 此网址的“赞”和“分享”将在此网址中汇总。例如，移动域网址应将桌面版网址指定为权威链接，用于跨不同页面版本汇总“赞”和“分享”
     *
     * The canonical URL of your object that will be used as its permanent ID in the graph,
     * e.g., "http://www.imdb.com/title/tt0117500/".
     */
    "og:url": string;
}
interface SimpleSeoContent extends BaseSeoContent {
    /**
     * 可选的音频文件
     *
     * A URL to an audio file to accompany this object.
     */
    "og:audio"?: string;
    /**
     * 可选的视频文件
     *
     * A URL to a video file that complements this object.
     */
    "og:video"?: string;
    /**
     * 内容的简略说明，通常为 2-4 个句子
     *
     * A one to two sentence description of your object.
     */
    "og:description": string;
    /**
     * 当文章出现在句子中时，前面的量词
     *
     * The word that appears before this object's title in a sentence.
     * An enum of (a, an, the, "", auto). If auto is chosen, the consumer of your data should
     * chose between "a" or "an". Default is "" (blank).
     */
    "og:determiner"?: "a" | "an" | "the" | "" | "auto";
    /**
     * 页面使用的语言
     *
     * The locale these tags are marked up in. Of the format language_TERRITORY. Default is en_US.
     */
    "og:locale": string;
    /**
     * 页面支持的语言
     *
     * An array of other locales this page is available in.
     */
    "og:locale:alternate": string[];
    /**
     * 网站名称
     *
     * If your object is part of a larger web site, the name which should be
     * displayed for the overall site. e.g., "IMDb".
     */
    "og:site_name": string;
}
interface ArticleSeoContent extends SimpleSeoContent {
    /**
     * 文章发表时间
     *
     * When the article was first published.
     */
    "article:published_time"?: string;
    /**
     * 文章上次修改时间
     *
     * When the article was last changed.
     */
    "article:modified_time"?: string;
    /**
     * 文章过期时间
     *
     * When the article is out of date after.
     */
    "article:expiration_time"?: string;
    /**
     * 文章作者
     *
     * Writers of the article
     */
    "article:author"?: string;
    /**
     * 文章章节
     *
     * A high-level section name. E.g. Technology
     */
    "article:section"?: string;
    /**
     * 文章标签
     *
     * Tag words associated with this article.
     */
    "article:tag"?: string[];
}
interface FacebookSeoContent extends SimpleSeoContent {
    /**
     * 进行 Facebook 成效分析所使用的应用编号
     *
     * App id which Facebook use to analyze
     */
    "fb:app_id": string;
}
interface TwitterSeoContent extends SimpleSeoContent {
    /** The card type */
    "twitter:card"?: "summary" | "summary_large_image" | "app" | "player";
    /**
     * 用户的 Twitter ID
     *
     * username of website
     */
    "twitter:site": string;
    /**
     * 创作者用户名
     *
     * username of content creator
     */
    "twitter:creator": string;
    /**
     * 图片替代文字
     *
     * A text description of the image conveying the essential nature of an image
     * to users who are visually impaired. Maximum 420 characters.
     */
    "twitter:image:alt": string;
}
interface ExtendedSeoContent extends SimpleSeoContent {
    /**
     * 网站更新时间
     *
     * page update time
     */
    "og:updated_time": string;
    /**
     * 是否启用富媒体
     *
     * Whether to enable rich attachment
     */
    "og:rich_attachment": "true" | "false";
    /**
     * 内容年龄限制
     *
     * Age Restrictions of the content
     */
    "og:restrictions:age": string;
}
type SeoContent = ArticleSeoContent | ExtendedSeoContent | FacebookSeoContent | TwitterSeoContent | SimpleSeoContent;

/**
 * @see https://schema.org/Person
 */
interface PersonSchema extends Record<string, unknown> {
    "@type": "Person";
    /**
     * Person name
     */
    name: string;
    /**
     * Person URL
     * @recommended
     */
    url?: string;
}
/**
 * @see https://schema.org/CreativeWork
 *
 * @tutorial https://developers.google.com/search/docs/appearance/structured-data/article#structured-data-type-definitions
 */
interface CreativeWorkSchema extends Record<string, unknown> {
    "@type": "CreativeWork";
    /**
     * An abstract is a short description that summarizes a CreativeWork
     */
    abstract?: string;
    /**
     * The author of this content or rating
     */
    author: PersonSchema[];
    /**
     * Text of a notice appropriate for describing the copyright aspects of this Creative Work, ideally indicating the owner of the copyright for the Work
     */
    copyrightNotice?: string;
    /**
     * Article title
     *
     * @description No more than 110 characters
     */
    headline: string;
    /**
     * @recommended
     */
    datePublished?: string;
    /**
     * @recommended
     */
    dateModified?: string;
    wordCount?: number;
}
/**
 * @see https://schema.org/Article
 *
 * @tutorial https://developers.google.com/search/docs/appearance/structured-data/article#structured-data-type-definitions
 */
interface ArticleSchema extends Omit<CreativeWorkSchema, "type"> {
    "@context": "https://schema.org";
    "@type": "Article";
}
/**
 * @see https://schema.org/BlogPosting
 *
 * @tutorial https://developers.google.com/search/docs/appearance/structured-data/article#structured-data-type-definitions
 */
interface BlogPostingSchema extends Omit<ArticleSchema, "type"> {
    "@context": "https://schema.org";
    "@type": "BlogPosting";
}
/**
 * @see https://schema.org/WebPage
 */
interface WebPageSchema extends Omit<CreativeWorkSchema, "type"> {
    "@context": "https://schema.org";
    "@type": "WebPage";
    name?: string;
    description?: string;
}

interface SeoOptions {
    /**
     * Deploy hostname
     *
     * 部署域名
     */
    hostname: string;
    /**
     * Default author
     *
     * 默认作者
     */
    author?: Author;
    /**
     * Content restrictions
     *
     * The age rating of the content, the format is `[int]+`, such as `"13+"`
     *
     * 内容分级情况
     *
     * 内容的年龄分级，格式为`[int]+`，如`"13+"`
     */
    restrictions?: string;
    /**
     * Whether generate description automatically
     *
     * 是否自动生成描述
     *
     * @default true
     */
    autoDescription?: boolean;
    /**
     * Fallback Image link when no image are found
     *
     * @description should be full or absolute links, probably your site favicon
     *
     * 当找不到图片时的回退图片链接
     *
     * @description 应为完整或绝对链接，你可以设置为站点图标
     */
    fallBackImage?: string;
    /**
     * Twitter username
     *
     * Twitter 用户名
     */
    twitterID?: string;
    /**
     * Whether the page is an article
     *
     * 页面是否是文章
     */
    isArticle?: <ExtraPageData extends Record<string, unknown> = Record<never, never>, ExtraPageFrontmatter extends Record<string, unknown> = Record<string, unknown>, ExtraPageFields extends Record<string, unknown> = Record<never, never>>(page: ExtendPage<ExtraPageData, ExtraPageFrontmatter, ExtraPageFields>) => boolean;
    /**
     * Custom OGP Generator
     *
     * 自定义 OGP 生成器
     */
    ogp?: <ExtraPageData extends Record<string, unknown> = Record<never, never>, ExtraPageFrontmatter extends Record<string, unknown> = Record<string, unknown>, ExtraPageFields extends Record<string, unknown> = Record<never, never>>(
    /**
     * OGP Object inferred by plugin
     *
     * 由插件推断出的 OGP 对象
     */
    ogp: SeoContent, 
    /**
     * Page Object
     *
     * 页面对象
     */
    page: ExtendPage<ExtraPageData, ExtraPageFrontmatter, ExtraPageFields>, 
    /** VuePress App */
    app: App) => SeoContent;
    /**
     * Custom JSON-LD Generator
     *
     * 自定义 JSON-LD 生成器
     */
    jsonLd?: <ExtraPageData extends Record<string, unknown> = Record<never, never>, ExtraPageFrontmatter extends Record<string, unknown> = Record<string, unknown>, ExtraPageFields extends Record<string, unknown> = Record<never, never>>(
    /**
     * JSON-LD Object inferred by plugin
     *
     * 由插件推断出的 JSON-LD 对象
     */
    jsonLD: ArticleSchema | BlogPostingSchema | WebPageSchema, 
    /**
     * Page Object
     *
     * 页面对象
     */
    page: ExtendPage<ExtraPageData, ExtraPageFrontmatter, ExtraPageFields>, 
    /** VuePress App */
    app: App) => ArticleSchema | BlogPostingSchema | WebPageSchema;
    /**
     * Custom head tags
     *
     * 自定义 Head 标签
     */
    customHead?: <ExtraPageData extends Record<string, unknown> = Record<never, never>, ExtraPageFrontmatter extends Record<string, unknown> = Record<string, unknown>, ExtraPageFields extends Record<string, unknown> = Record<never, never>>(
    /**
     * Head tag config
     *
     * head 标签配置
     */
    head: HeadConfig[], 
    /**
     * Page Object
     *
     * 页面对象
     */
    page: ExtendPage<ExtraPageData, ExtraPageFrontmatter, ExtraPageFields>, 
    /** VuePress App */
    app: App) => void;
    /**
     * Add canonical URL
     *
     * 添加首选地址
     */
    canonical?: string | (<ExtraPageData extends Record<string, unknown> = Record<never, never>, ExtraPageFrontmatter extends Record<string, unknown> = Record<string, unknown>, ExtraPageFields extends Record<string, unknown> = Record<never, never>>(page: ExtendPage<ExtraPageData, ExtraPageFrontmatter, ExtraPageFields>) => string | null);
}

declare const seoPlugin: (options: SeoOptions, legacy?: boolean) => PluginFunction;

export { type ArticleSchema, type ArticleSeoContent, type BaseSeoContent, type BlogPostingSchema, type CreativeWorkSchema, type ExtendPage, type ExtendedSeoContent, type FacebookSeoContent, type PersonSchema, type SEOPluginFrontmatter, type SeoContent, type SeoOptions, type SeoPluginPageData, type SimpleSeoContent, type TwitterSeoContent, type WebPageSchema, seoPlugin };
