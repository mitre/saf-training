import { Page, App, PluginFunction, PageFrontmatter } from '@vuepress/core';
import { GitData } from '@vuepress/plugin-git';

type ModifyTimeGetter = <ExtraPageData extends Record<string, unknown> & {
    git?: GitData;
} = {
    git?: GitData;
}, ExtraPageFrontmatter extends Record<string, unknown> = Record<never, never>, ExtraPageFields extends Record<string, unknown> = Record<never, never>>(page: Page<ExtraPageData, ExtraPageFrontmatter, ExtraPageFields>, app: App) => string;
interface SitemapOptions {
    /**
     * domain which to be deployed to
     *
     * 部署的网站域名
     */
    hostname: string;
    /**
     * Extra urls to be included
     *
     * 需要额外包含的网址
     */
    extraUrls?: string[];
    /**
     * Urls to be excluded
     *
     * 不被收录的页面
     */
    excludeUrls?: string[];
    /**
     * Output filename, relative to dest folder
     *
     * 输出的文件名，相对于输出目录
     *
     * @default "sitemap.xml"
     */
    sitemapFilename?: string;
    /**
     * Output xsl filename, relative to dest folder
     *
     * 输出的 xsl 文件名，相对于输出目录
     *
     * @default "sitemap.xsl"
     */
    sitemapXSLFilename?: string;
    /**
     * XSL file path used as template
     *
     * 用作模板的 XSL 文件路径
     *
     * @default "vuepress-plugin-sitemap2/templates/sitemap.xsl"
     */
    sitemapXSLTemplate?: string;
    /**
     * Page default update frequency
     *
     * 页面默认更新频率
     *
     * @default "daily"
     */
    changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
    /**
     * Date format function
     *
     * 时间格式化器
     */
    modifyTimeGetter?: ModifyTimeGetter;
    /**
     * XML namespaces to turn on - all by default
     */
    xmlNameSpace?: {
        news: boolean;
        video: boolean;
        xhtml: boolean;
        image: boolean;
        custom?: string[];
    };
}

declare const sitemapPlugin: (options: SitemapOptions, legacy?: boolean) => PluginFunction;

/**
 * None standard sitemap options used by google
 */
interface SitemapImageOption {
    /**
     * The URL of the image.
     */
    url: string;
    /**
     * The caption of the image.
     */
    caption?: string;
    /**
     * The title of the image.
     */
    title?: string;
    /**
     * The geographic location of the image.
     */
    geoLocation?: string;
    /**
     * A URL to the license of the image.
     */
    license?: string;
}
/**
 * None standard sitemap options used by google
 */
interface SitemapVideoOption {
    /**
     * A URL pointing to the video thumbnail image file.
     */
    thumbnail_loc: string;
    /**
     * The title of the video.
     */
    title: string;
    /**
     * A description of the video. Maximum 2048 characters.
     */
    description: string;
    /**
     * A URL pointing to the actual video media file. Should be one of the supported formats.
     * HTML is not a supported format. Flash is allowed, but no longer supported on most mobile platforms,
     * and so may be indexed less well. Must not be the same as the <loc> URL.
     */
    content_loc?: string;
    /**
     * A URL pointing to a player for a specific video. Usually this is the information
     * in the src element of an <embed> tag. Must not be the same as the <loc> URL
     */
    player_loc?: string;
    /**
     * A string the search engine can append as a query param to enable automatic playback
     */
    "player_loc:autoplay"?: string;
    /**
     * Duration of video in seconds
     */
    duration?: number;
    /**
     * The date after which the video will no longer be available.
     */
    expiration_date?: string;
    /**
     * The number of times the video has been viewed.
     */
    view_count: number;
    /**
     * The date the video was first published, in W3C format.
     */
    publication_date?: string;
    /**
     * A short description of the broad category that the video belongs to.
     * This is a string no longer than 256 characters.
     */
    category?: string;
    /**
     * Whether to show or hide your video in search results from specific countries.
     */
    restriction?: string;
    "restriction:relationship"?: string;
    /**
     * The price to download or view the video. Omit this tag for free videos.
     */
    price?: string;
    /**
     * Specifies the resolution of the purchased version. Supported values are hd and sd.
     */
    "price:resolution"?: string;
    /**
     * Specifies the currency in ISO 4217 format.
     */
    "price:currency"?: string;
    /**
     * Specifies the purchase option. Supported values are rent and own.
     */
    "price:type"?: string;
    /**
     * The video uploader's name. Only one video:uploader is allowed per video.
     * max 255 characters.
     */
    uploader?: string;
    /**
     * Whether to show or hide your video in search results on specified platform types.
     * This is a list of space-delimited platform types.
     *
     * @see https://support.google.com/webmasters/answer/80471?hl=en&ref_topic=4581190
     */
    platform?: string;
    "platform:relationship"?: "Allow" | "Deny";
    id?: string;
    /**
     * An arbitrary string tag describing the video.
     * Tags are generally very short descriptions of key concepts associated with a video or piece of content.
     */
    tag?: string[];
    /**
     * The rating of the video. Must be float numbers
     */
    rating?: number;
    family_friendly?: "YES" | "NO";
    /**
     * Indicates whether a subscription (either paid or free) is required to view the video.
     */
    requires_subscription?: "YES" | "NO";
    /**
     * Indicates whether the video is a live stream.
     */
    live?: "YES" | "NO";
}
/**
 * None standard sitemap options used by google
 */
interface SitemapLinkOption {
    lang: string;
    url: string;
}
/**
 * None standard sitemap options used by google
 */
interface SitemapNewsOption {
    access: "Registration" | "Subscription";
    publication: {
        /**
         * Name of the news publication.
         *
         * It must exactly match the name as it appears on your articles on news.google.com,
         * except for anything in parentheses.
         */
        name: string;
        /**
         * Language of your publication. Use an ISO 639 language code (2 or 3 letters).
         */
        language: string;
        genres?: string;
        /**
         * Article publication date in W3C format,
         * using either the "complete date" (YYYY-MM-DD) format or the "complete date plus hours, minutes, and seconds"
         */
        publication_date: string;
        /**
         * The title of the news article.
         */
        title: string;
        keywords?: string;
        stock_tickers?: string;
    };
}

interface SitemapFrontmatterOption {
    /**
     * Update Frequency
     *
     * 更新频率
     */
    changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
    /**
     * Priority of this page, supports 0.0 -1.0
     *
     * 页面优先级，0.0 - 1.0
     */
    priority?: number;
    /**
     * Image config
     *
     * 图片配置
     */
    img?: SitemapImageOption[];
    /**
     * Video config
     *
     * 视频配置
     */
    video?: SitemapVideoOption[];
    /**
     * News config
     *
     * 新闻配置
     */
    news?: SitemapNewsOption[];
}
interface SitemapPluginFrontmatter extends PageFrontmatter {
    sitemap?: SitemapFrontmatterOption | false;
}

export { type ModifyTimeGetter, type SitemapFrontmatterOption, type SitemapImageOption, type SitemapLinkOption, type SitemapNewsOption, type SitemapOptions, type SitemapPluginFrontmatter, type SitemapVideoOption, sitemapPlugin };
