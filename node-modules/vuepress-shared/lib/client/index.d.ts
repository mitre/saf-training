import * as vue from 'vue';
import { FunctionalComponent, VNode, ComputedRef, Ref, SlotsType, App } from 'vue';
import * as vue_router from 'vue-router';
import { RouteLocation, NavigationFailure, RouteLocationNormalizedLoaded, Router } from 'vue-router';
import { LocaleData as LocaleData$1 } from '@vuepress/shared';
export { ensureEndingSlash, ensureLeadingSlash, isArray, isLinkExternal, isLinkHttp, isLinkWithProtocol, isPlainObject, removeEndingSlash, removeLeadingSlash } from '@vuepress/shared';
import { PageFrontmatter, LocaleData } from '@vuepress/core';
import { DeflateOptions } from 'fflate';
export { isDef, isObject } from '@vueuse/core';

interface IconBaseProps {
    name?: string;
    color?: string;
}
/**
 * Icon Base Component
 */
declare const IconBase: FunctionalComponent<IconBaseProps, Record<never, never>, {
    default: () => VNode | VNode[];
}>;

declare const LoadingIcon: FunctionalComponent<{
    size?: number;
    stroke?: number;
    wrapper?: boolean;
    height?: number;
}>;

declare const RenderDefault: FunctionalComponent<Record<never, never>, Record<never, never>, {
    default: () => VNode | VNode[];
}>;

interface LinkOptions {
    route: ComputedRef<RouteLocation & {
        href: string;
    }>;
    href: Ref<string>;
    isActive: Ref<boolean>;
    navigate: (event?: MouseEvent) => Promise<void | NavigationFailure>;
}
declare const useLink: (link: string | Ref<string>) => LinkOptions;
declare const RouterLink: vue.DefineComponent<{
    /**
     * Link
     */
    to: {
        type: StringConstructor;
        required: true;
    };
}, () => VNode, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {}, string, vue.PublicProps, Readonly<vue.ExtractPropTypes<{
    /**
     * Link
     */
    to: {
        type: StringConstructor;
        required: true;
    };
}>>, {}, SlotsType<{
    default: (linkOptions: LinkOptions) => VNode | VNode[] | undefined;
}>>;

interface VPLinkProps extends Record<string, unknown> {
    to: string;
}
declare const VPLink: FunctionalComponent<VPLinkProps, Record<never, never>, {
    default: () => string | VNode | (string | VNode)[];
}>;

declare const GitHubIcon: FunctionalComponent;
declare const GitLabIcon: FunctionalComponent;
declare const GiteeIcon: FunctionalComponent;
declare const BitbucketIcon: FunctionalComponent;
declare const SourceIcon: FunctionalComponent;

declare const hasGlobalComponent: (name: string, app?: App) => boolean;

declare const useSupportUserAgent: () => Ref<boolean>;
declare const useIsMobile: () => ComputedRef<boolean>;

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

/**
 * Get current locale config
 *
 * @param localesConfig client locale Config
 * @returns current locale config
 */
declare const useLocaleConfig: <T extends LocaleData$1>(localesConfig: RequiredLocaleConfig<T>) => ComputedRef<T>;

type PageTitleRef = ComputedRef<string>;
declare const usePageTitle: () => PageTitleRef;

declare const checkIsMobile: (ua: string) => boolean;
declare const checkIsChromeWebView: (ua: string) => boolean;
declare const checkIsSafariMobile: (ua: string) => boolean;
declare const checkIsSafari: (ua: string) => boolean;
declare const checkIsiPhone: (ua: string) => boolean;
declare const checkIsiPad: (ua: string) => boolean;
declare const checkIsWindows: (ua: string) => boolean;
declare const checkIsIOS: (ua: string) => boolean;
declare const checkIsMacOS: (ua: string) => boolean;

declare const getDate: (input?: Date | string | number | undefined | null) => Date | null;

declare const generateIndexFromHash: (content: string, total: number) => number;

/**
 * Forked and edited from https://github.com/vxhly/vuepress-plugin-one-click-copy/blob/master/bin/Message.js
 *
 * MIT License
 *
 * Copyright (c) 2019 vxhly <pengchengou@gmail.com>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 * © 2019 GitHub, Inc.
 */
declare class Message {
    private containerElement;
    private messageElements;
    constructor();
    pop(html: string, duration?: number): number;
    close(messageId?: number): void;
    destroy(): void;
}

/**
 * Get hash from path
 *
 * @param path link path
 * @returns hash
 */
declare const getHash: (path: string) => string;
declare const normalizePath: (path: string) => string;
/**
 * Whether the lick is active
 *
 * @param route Current route
 * @param link link path
 * @returns Whether the lick is active
 */
declare const isActiveLink: (route: RouteLocationNormalizedLoaded, link?: string) => boolean;

declare class Popup {
    private containerElement;
    private popupElements;
    constructor();
    emit(html: string, duration?: number): number;
    close(popupId?: number): void;
    destroy(): void;
}

declare const utoa: (data: string, level?: DeflateOptions["level"]) => string;
declare const atou: (base64: string) => string;

type RepoType = "GitHub" | "GitLab" | "Gitee" | "Bitbucket" | null;
declare const resolveRepoLink: (repo: string) => string;
declare const resolveRepoType: (repo: string) => RepoType;

/**
 * Resolve a route with redirection
 */
declare const resolveRouteWithRedirect: (router: Router, to: vue_router.RouteLocationRaw, currentLocation?: vue_router.RouteLocationNormalizedLoaded | undefined) => ReturnType<Router["resolve"]>;

declare const guardEvent: (event: MouseEvent) => boolean | void;

declare const getSize: () => Record<"width" | "height" | "left" | "top", number>;
declare const openPopupWindow: (link: string, target?: string, features?: string[]) => void;

export { type Author, type AuthorInfo, type AuthorName, type BasePageFrontMatter, BitbucketIcon, GitHubIcon, GitLabIcon, GiteeIcon, IconBase, type IconBaseProps, type LinkOptions, LoadingIcon, Message, type PageTitleRef, Popup, RenderDefault, type RepoType, type RequiredLocaleConfig, RouterLink, SourceIcon, VPLink, type VPLinkProps, atou, checkIsChromeWebView, checkIsIOS, checkIsMacOS, checkIsMobile, checkIsSafari, checkIsSafariMobile, checkIsWindows, checkIsiPad, checkIsiPhone, deepAssign, endsWith, entries, fromEntries, generateIndexFromHash, getAuthor, getCategory, getDate, getHash, getSize, getStringArray, getTag, guardEvent, hasGlobalComponent, inferRouteLink, inferRoutePath, isAbsoluteUrl, isActiveLink, isBoolean, isFunction, isNumber, isRegExp, isString, isUrl, keys, normalizePath, openPopupWindow, resolveRepoLink, resolveRepoType, resolveRouteWithRedirect, startsWith, useIsMobile, useLink, useLocaleConfig, usePageTitle, useSupportUserAgent, utoa, values };
