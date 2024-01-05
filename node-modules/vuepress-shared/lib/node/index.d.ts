import { App, PageFrontmatter, LocaleData, LocaleConfig, Page } from '@vuepress/core';
import { IncomingMessage, ServerResponse } from 'node:http';
import { WebpackChainConfig, WebpackConfiguration } from '@vuepress/bundler-webpack';
import { LocaleData as LocaleData$1 } from '@vuepress/shared';
export { ensureEndingSlash, ensureLeadingSlash, isArray, isLinkExternal, isLinkHttp, isLinkWithProtocol, isPlainObject, removeEndingSlash, removeLeadingSlash } from '@vuepress/shared';
export { default as stripTags } from 'striptags';
import { GitPluginPageData } from '@vuepress/plugin-git';
import { Ora } from 'ora';
import { DeflateOptions } from 'fflate';
export { isDef, isObject } from '@vueuse/core';

/**
 * Add tags as customElement
 *
 * @param bundlerOptions VuePress Bundler config
 * @param app VuePress Node App
 * @param customElements tags recognized as custom element
 */
declare const addCustomElement: (bundlerOptions: unknown, app: App, customElement: string[] | string | RegExp) => void;

interface CustomServerOptions {
    /**
     * Path to be responded
     */
    path: string;
    /**
     * Respond function
     */
    response: (request: IncomingMessage, response: ServerResponse) => Promise<string | Buffer>;
    /**
     * error msg
     */
    errMsg?: string;
}
/**
 * Handle specific path when running VuePress Dev Server
 *
 * @param config VuePress Bundler config
 * @param app VuePress Node App
 * @param path Path to be responded
 * @param response respond function
 * @param errMsg error msg
 */
declare const useCustomDevServer: (bundlerOptions: unknown, app: App, { errMsg, response: responseHandler, path, }: CustomServerOptions) => void;

declare const getBundlerName: ({ options: { bundler: { name }, }, }: App) => string;

interface Alias {
    find: string | RegExp;
    replacement: string;
    /**
     * Instructs the plugin to use an alternative resolving algorithm,
     * rather than the Rollup's resolver.
     * @default null
     */
    customResolver?: ResolverFunction | ResolverObject | null;
}
type ResolverFunction = (...args: unknown[]) => unknown;
interface ResolverObject {
    buildStart?: (...args: unknown[]) => unknown;
    resolveId: ResolverFunction;
}
type AliasOptions = readonly Alias[] | {
    [find: string]: string;
};
declare const mergeAlias: (defaults?: AliasOptions, overrides?: AliasOptions) => AliasOptions | undefined;
declare const mergeViteConfig: (defaults: Record<string, any>, overrides: Record<string, any>, isRoot?: boolean) => Record<string, any>;

/**
 * Add Vite config
 *
 * @param bundlerOptions VuePress Bundler config
 * @param app VuePress Node App
 * @param config Vite config
 */
declare const addViteConfig: (bundlerOptions: unknown, app: App, config: Record<string, unknown>) => void;
/**
 * Add modules to Vite `optimizeDeps.include` list
 *
 * @param bundlerOptions VuePress Bundler config
 * @param app VuePress Node App
 */
declare const addViteOptimizeDepsInclude: (bundlerOptions: unknown, app: App, module: string | string[]) => void;
/**
 * Add modules to Vite `optimizeDeps.exclude` list
 *
 * @param bundlerOptions VuePress Bundler config
 * @param app VuePress Node App
 */
declare const addViteOptimizeDepsExclude: (bundlerOptions: unknown, app: App, module: string | string[]) => void;
/**
 * Add modules to Vite `optimizeDeps.needsInterop` list
 *
 * @param bundlerOptions VuePress Bundler config
 * @param app VuePress Node App
 */
declare const addViteOptimizeDepsNeedsInterop: (bundlerOptions: unknown, app: App, module: string | string[]) => void;
/**
 * Add modules to Vite `ssr.external` list
 *
 * @param bundlerOptions VuePress Bundler config
 * @param app VuePress Node App
 */
declare const addViteSsrExternal: (bundlerOptions: unknown, app: App, module: string | string[]) => void;
/**
 * Add modules to Vite `ssr.noExternal` list
 */
declare const addViteSsrNoExternal: (bundlerOptions: unknown, app: App, module: string | string[]) => void;

declare const chainWebpack: (bundlerOptions: unknown, app: App, chainWebpack: (config: WebpackChainConfig, isServer: boolean, isBuild: boolean) => void) => void;
declare const configWebpack: (bundlerOptions: unknown, app: App, configureWebpack: (config: WebpackConfiguration, isServer: boolean, isBuild: boolean) => void) => void;

declare const lang2PathConfig: {
    "de-AT": string;
    "de-DE": string;
    "en-US": string;
    "es-ES": string;
    "fi-FI": string;
    "fr-FR": string;
    "hu-HU": string;
    "id-ID": string;
    "ja-JP": string;
    "ko-KR": string;
    "nl-NL": string;
    "pl-PL": string;
    "pt-BR": string;
    "ru-RU": string;
    "sk-SK": string;
    "tr-TR": string;
    "uk-UA": string;
    "vi-VN": string;
    "zh-CN": string;
    "zh-TW": string;
};

/** Types for supported lang codes */
type HopeLang = keyof typeof lang2PathConfig;

type IAnyObject = Record<string, any>;
/** Deep merge objects to the first one */
declare const deepAssign: <T extends IAnyObject, U extends IAnyObject = T, V extends Partial<T> & Partial<U> = T & U>(originObject: T, ...overrideObjects: (U | null | undefined)[]) => V;

declare const isBoolean: (val: any) => val is boolean;
declare const isFunction: <T extends Function>(val: any) => val is T;
declare const isNumber: (val: any) => val is number;
declare const isString: (val: unknown) => val is string;
declare const isRegExp: (val: unknown) => val is RegExp;
declare const startsWith: (str: unknown, prefix: string) => boolean;
declare const endsWith: (str: unknown, suffix: string) => boolean;
declare const entries: {
    <T>(o: {
        [s: string]: T;
    } | ArrayLike<T>): [string, T][];
    (o: {}): [string, any][];
};
declare const fromEntries: {
    <T = any>(entries: Iterable<readonly [PropertyKey, T]>): {
        [k: string]: T;
    };
    (entries: Iterable<readonly any[]>): any;
};
declare const keys: {
    (o: object): string[];
    (o: {}): string[];
};
declare const values: {
    <T>(o: {
        [s: string]: T;
    } | ArrayLike<T>): T[];
    (o: {}): any[];
};

declare const inferRoutePath: (path: string) => string;
declare const inferRouteLink: (link: string) => string;

type AuthorName = string;
interface AuthorInfo {
    /**
     * Author name
     *
     * 作者姓名
     */
    name: string;
    /**
     * Author website
     *
     * 作者网站
     */
    url?: string;
    /**
     * Author email
     *
     * 作者 Email
     */
    email?: string;
}
type Author = AuthorName | AuthorName[] | AuthorInfo | AuthorInfo[];

interface BasePageFrontMatter extends PageFrontmatter {
    /**
     * Page icon
     *
     * 页面图标
     */
    icon?: string;
    /**
     * Page Author(s)
     *
     * 页面作者
     */
    author?: Author | false;
    /**
     * Writing Date
     *
     * 写作日期
     */
    date?: Date | string;
    /**
     * Page Category(ies)
     *
     * 页面分类
     */
    category?: string | string[];
    /**
     * Page Tag(s)
     *
     * 页面标签
     */
    tag?: string[] | string;
    /**
     * Whether the content is original
     *
     * 是否原创
     */
    isOriginal?: boolean;
    /**
     * Whether the page is an article
     *
     * 页面是否是文章
     */
    article?: boolean;
    /**
     * Page Cover
     *
     * 页面封面
     */
    cover?: string;
    /**
     * Page Banner
     *
     * 页面 Banner 图
     */
    banner?: string;
    /**
     * Footer text
     *
     * 页脚文字
     */
    footer?: string | boolean;
    /**
     * Copyright text
     *
     * 版权文字
     */
    copyright?: string | false;
    /**
     * Whether is home page
     *
     * 是否是主页
     */
    home?: boolean;
    /**
     * @deprecated use `date` instead
     */
    time?: Date | string;
    /**
     * @deprecated use `category` instead
     */
    categories?: string[];
    /**
     * @deprecated use `tag` instead
     */
    tags?: string[];
}

type RequiredLocaleConfig<T extends LocaleData = LocaleData> = Record<string, T>;

declare const getAuthor: (author: Author | false | undefined, canDisable?: boolean) => AuthorInfo[];
declare const getStringArray: (value: string[] | string | undefined, optionName?: string) => string[];
declare const getCategory: (category: string[] | string | undefined) => string[];
declare const getTag: (tag: string[] | string | undefined) => string[];

/**
 * check if a variable is a valid url
 */
declare const isUrl: (test: unknown) => boolean;
/**
 * Whether a variable is a valid absolute url
 */
declare const isAbsoluteUrl: (test: unknown) => boolean;

/** Get language from path */
declare const path2Lang: (path?: string, debug?: boolean) => HopeLang;
/** Get path from language */
declare const lang2Path: (lang?: string, debug?: boolean) => string;
/**
 * Get language of root directory
 *
 * @param app VuePress Node App
 * @returns root language
 */
declare const getRootLang: (app: App) => string;
/**
 * Get the infer language path from root directory language
 *
 * @param app VuePress Node App
 * @returns infer language
 */
declare const getRootLangPath: (app: App) => string;
/**
 * Get locale paths
 *
 * @param app VuePress Node app
 * @returns locale paths
 */
declare const getLocalePaths: (app: App) => string[];
interface GetLocalesOptions<T extends LocaleData$1> {
    /** VuePress Node app */
    app: App;
    /** Default locale config */
    default: RequiredLocaleConfig<T>;
    /** user locale config */
    config?: LocaleConfig<T> | undefined;
    /** plugin name */
    name?: string;
}
/**
 * Get final locale config for client
 *
 * @returns final locale config
 */
declare const getLocales: <T extends LocaleData$1>({ app, name, default: defaultLocalesConfig, config: userLocalesConfig, }: GetLocalesOptions<T>) => RequiredLocaleConfig<T>;

declare const md2text: (content: string) => string;

interface PageExcerptOptions {
    /**
     * Excerpt separator
     *
     * 摘要分隔符
     *
     * @default "<!-- more -->"
     */
    excerptSeparator?: string;
    /**
     * Length of excerpt
     *
     * @description Excerpt length will be the minimal possible length reaching this value
     *
     * 摘要的长度
     *
     * @description 摘要的长度会尽可能的接近这个值
     *
     * @default 300
     */
    excerptLength?: number;
    /**
     * Tags which is considered as custom elements
     *
     * @description This is used to determine whether a tag is a custom element since all unknown tags are removed in excerpt.
     *
     * 被认为是自定义元素的标签
     *
     * @description 用于判断一个标签是否是自定义元素，因为在摘要中，所有的未知标签都会被移除。
     */
    isCustomElement?: (tagName: string) => boolean;
}
declare const getPageExcerpt: ({ markdown, options: { base } }: App, { content, contentRendered, filePath, filePathRelative, frontmatter }: Page, { isCustomElement, excerptSeparator, excerptLength, }?: PageExcerptOptions) => string;

declare const getPageText: ({ content }: Page) => string;

declare const checkInstalled: (pkg: string, currentUrl: string) => boolean;

/**
 * Check if the version of VuePress is satisfied with the given range
 *
 * @param app VuePress app
 * @param name current package name
 * @param range version range
 */
declare const checkVersion: (app: App, name: string, range?: string) => boolean;

interface DeprecatedLoggerOptions {
    options: Record<string, unknown>;
    old: string;
    new: string;
    msg?: string;
    scope?: string;
}
interface DroppedLoggerOptions {
    options: Record<string, unknown>;
    old: string;
    new?: string;
    msg?: string;
}
interface Converter {
    deprecatedLogger: (options: DeprecatedLoggerOptions) => void;
    droppedLogger: (options: DroppedLoggerOptions) => void;
}
declare const createConverter: (name: string) => Converter;

interface DateDetail {
    year?: number | undefined;
    month?: number | undefined;
    day?: number | undefined;
    hour?: number | undefined;
    minute?: number | undefined;
    second?: number | undefined;
}
interface DateInfo {
    type: "date" | "time" | "full";
    info: DateDetail;
    value: Date | undefined;
}
/**
 * Get Date info
 *
 * @description The function returns null instead of throw error when the date is invalid
 *
 * 获取日期信息
 *
 * @description 当日期无效时，函数返回 null 而不是抛出错误
 *
 * @param date Date or date info
 * @param timezone (optional) date timezone
 */
declare const getDateInfo: (date: string | Date | undefined, timezone?: string) => DateInfo | null;
/**
 * Recent date will returns positive value, so dates will be latest to oldest after sorting
 *
 * @description Invalid date will appear at last
 *
 * 最近的日期将返回正值，因此在排序后日期将是最新到最旧
 *
 * @description 无效日期将出现在最后
 */
declare const compareDate: (dateA: Date | number | string | undefined, dateB: Date | number | string | undefined) => number;
interface DateOptions {
    /**
     * @default "en"
     */
    lang?: string;
    timezone?: string;
    /**
     * @default "full"
     */
    type?: "date" | "time" | "full";
}
declare const timeTransformer: (date: string | Date | undefined, options?: DateOptions) => string | null;
declare const injectLocalizedDate: (page: Page<{
    localizedDate?: string | null;
} & Partial<GitPluginPageData>>, timezone?: string) => void;
declare const getDateString: (date: Date) => string;
declare const getTimeString: (date: Date) => string;
declare const getFullDateString: (date: Date) => string;

declare const getDirContents: (dir: string, base?: string) => string[];

/**
 * @see https://stackoverflow.com/questions/223652/is-there-a-way-to-escape-a-cdata-end-token-in-xml
 */
declare const encodeCDATA: (content: string) => string;
declare const encodeXMLContent: (content: string) => string;

/**
 * Shell Logger
 */
declare class Logger {
    /**
     * Plugin name
     */
    private name;
    private currentInstance;
    constructor(
    /**
     * Plugin name
     */
    name?: string);
    /**
     * Create a loading spinner with hint text
     *
     * @param text Loading hint text
     * @returns Ora Instance
     */
    create(text: string): Ora;
    /**
     * Update current loading spinner text
     *
     * @param text new hint text
     */
    update(text: string): void;
    /**
     * Trigger current instance to loading state or create a new loading spinner with hint text
     *
     * @param text Loading hint text
     * @returns Ora Instance
     */
    load(text?: string): Ora;
    /**
     * Trigger current instance to info state or create a new info icon with hint text
     *
     * @param text Loading hint text
     * @returns Ora Instance
     */
    info(text?: string, ...args: any[]): Ora;
    /**
     * Trigger current instance to success state or create a new success icon with hint text
     *
     * @param text Loading hint text
     * @returns Ora Instance
     */
    succeed(text?: string, ...args: any[]): Ora;
    /**
     * Trigger current instance to warn state or create a new warn icon with hint text
     *
     * @param text Loading hint text
     * @returns Ora Instance
     */
    warn(text?: string, ...args: any[]): Ora;
    /**
     * Trigger current instance to warn state or create a new warn icon with hint text
     *
     * @param text Loading hint text
     * @returns Ora Instance
     */
    error(text?: string, ...args: any[]): Ora;
}

type PackageManager = "npm" | "yarn" | "pnpm";
/**
 * Check if a package manager is installed globally.
 *
 * @param packageManager package manager
 */
declare const hasGlobalInstallation: (packageManager: PackageManager) => boolean;
/**
 * Get the type of lock file.
 *
 * @param cwd current working directory
 * @param deep whether to search in parent directories
 * @returns the type of lock file
 */
declare const getTypeofLockFile: (cwd?: string, deep?: boolean) => PackageManager | null;
/**
 * Detect the package manager used in the current project.
 *
 * @param cwd current working directory
 * @param deep whether to search in parent directories
 * @returns the type of package manager
 */
declare const detectPackageManager: (cwd?: string, deep?: boolean) => PackageManager;

declare const getRealPath: (fileUrl: string, currentUrl: string) => string;

declare const utoa: (data: string, level?: DeflateOptions["level"]) => string;
declare const atou: (base64: string) => string;

/**
 * Note: Sync with https://github.com/vuejs/core/blob/main/packages/shared/src/domTagConfig.ts#L6-L28
 *
 * Copied from https://github.com/vuejs/core/blob/main/packages/shared/src/domTagConfig.ts#L6-L28
 */
/**
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element
 */
declare const HTML_TAGS: string[];
/**
 * @see https://developer.mozilla.org/en-US/docs/Web/SVG/Element
 */
declare const SVG_TAGS: string[];
/**
 * Note: Sync with https://developer.mozilla.org/en-US/docs/Web/MathML/Element
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/MathML/Element
 */
declare const MATHML_TAGS: string[];

declare const getTitleFromFilename: (filename: string) => string;

declare const noopModule = "vuepress-shared/noopModule";

export { type Author, type AuthorInfo, type AuthorName, type BasePageFrontMatter, type Converter, type CustomServerOptions, type DateDetail, type DateInfo, type DateOptions, type DeprecatedLoggerOptions, type DroppedLoggerOptions, type GetLocalesOptions, HTML_TAGS, type HopeLang, Logger, MATHML_TAGS, type PackageManager, type PageExcerptOptions, type RequiredLocaleConfig, SVG_TAGS, addCustomElement, addViteConfig, addViteOptimizeDepsExclude, addViteOptimizeDepsInclude, addViteOptimizeDepsNeedsInterop, addViteSsrExternal, addViteSsrNoExternal, atou, chainWebpack, checkInstalled, checkVersion, compareDate, configWebpack, createConverter, deepAssign, detectPackageManager, encodeCDATA, encodeXMLContent, endsWith, entries, fromEntries, getAuthor, getBundlerName, getCategory, getDateInfo, getDateString, getDirContents, getFullDateString, getLocalePaths, getLocales, getPageExcerpt, getPageText, getRealPath, getRootLang, getRootLangPath, getStringArray, getTag, getTimeString, getTitleFromFilename, getTypeofLockFile, hasGlobalInstallation, inferRouteLink, inferRoutePath, injectLocalizedDate, isAbsoluteUrl, isBoolean, isFunction, isNumber, isRegExp, isString, isUrl, keys, lang2Path, md2text, mergeAlias, mergeViteConfig, noopModule, path2Lang, startsWith, timeTransformer, useCustomDevServer, utoa, values };
