import { PageData, PageFrontmatter, HeadConfig, SiteData } from '@vuepress/shared';
export { PageData, PageFrontmatter, PageHeader, SiteData } from '@vuepress/shared';
import * as vue from 'vue';
import { Component, App, ComputedRef, InjectionKey, Ref } from 'vue';
import { Router, RouteMeta } from 'vue-router';

declare const ClientOnly: vue.DefineComponent<{}, () => vue.VNode<vue.RendererNode, vue.RendererElement, {
    [key: string]: any;
}>[] | null | undefined, {}, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {}, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<vue.ExtractPropTypes<{}>>, {}, {}>;

/**
 * Markdown rendered content
 */
declare const Content: vue.DefineComponent<{
    pageKey: {
        type: StringConstructor;
        required: false;
        default: string;
    };
}, () => vue.VNode<vue.RendererNode, vue.RendererElement, {
    [key: string]: any;
}>, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {}, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<vue.ExtractPropTypes<{
    pageKey: {
        type: StringConstructor;
        required: false;
        default: string;
    };
}>>, {
    pageKey: string;
}, {}>;

type Layouts = Record<string, Component>;

/**
 * Configure vuepress client
 */
interface ClientConfig {
    /**
     * An enhance function to be called after vue app instance and
     * vue-router instance has been created
     */
    enhance?: (context: {
        app: App;
        router: Router;
        siteData: SiteDataRef;
    }) => void | Promise<void>;
    /**
     * A function to be called inside the setup function of vue app
     */
    setup?: () => void;
    /**
     * Layout components
     */
    layouts?: Layouts;
    /**
     * Components to be placed directly into the root node of vue app
     */
    rootComponents?: Component[];
}

type CreateVueAppFunction = () => Promise<{
    app: App;
    router: Router;
}>;

type PageRouteItem = [
    name: string,
    path: string,
    meta: RouteMeta,
    redirects: string[]
];

/**
 * Ref wrapper of `Layouts`
 */
type LayoutsRef = ComputedRef<Layouts>;
/**
 * Injection key for layouts
 */
declare const layoutsSymbol: InjectionKey<LayoutsRef>;
/**
 * Returns layouts component map
 */
declare const useLayouts: () => LayoutsRef;

/**
 * Ref wrapper of `PageData`
 */
type PageDataRef<T extends Record<any, any> = Record<never, never>> = Ref<PageData<T>>;
/**
 * Injection key for page data
 */
declare const pageDataSymbol: InjectionKey<PageDataRef>;
/**
 * Empty page data to be used as the fallback value
 */
declare const pageDataEmpty: PageData;
/**
 * Returns the ref of the data of current page
 */
declare const usePageData: <T extends Record<any, any> = Record<never, never>>() => PageDataRef<T>;

/**
 * Ref wrapper of `PageFrontmatter`
 */
type PageFrontmatterRef<T extends Record<any, any> = Record<string, unknown>> = ComputedRef<PageFrontmatter<T>>;
/**
 * Injection key for page frontmatter
 */
declare const pageFrontmatterSymbol: InjectionKey<PageFrontmatterRef>;
/**
 * Returns the ref of the frontmatter of current page
 */
declare const usePageFrontmatter: <T extends Record<any, any> = Record<string, unknown>>() => PageFrontmatterRef<T>;

/**
 * Page head config, which would be used for generate html tags in `<head>`
 */
type PageHead = HeadConfig[];
/**
 * Ref wrapper of `PageHead`
 */
type PageHeadRef = ComputedRef<PageHead>;
/**
 * Injection key for page head
 */
declare const pageHeadSymbol: InjectionKey<PageHeadRef>;
/**
 * Returns the ref of the head config of current page
 */
declare const usePageHead: () => PageHeadRef;

/**
 * Page head title, which would be used as the content of `head > title` tag
 */
type PageHeadTitle = string;
/**
 * Ref wrapper of `PageHeadTitle`
 */
type PageHeadTitleRef = ComputedRef<PageHeadTitle>;
/**
 * Injection key for page head title
 */
declare const pageHeadTitleSymbol: InjectionKey<PageHeadTitleRef>;
/**
 * Returns the ref of the head title of current page
 */
declare const usePageHeadTitle: () => PageHeadTitleRef;

/**
 * Page language
 */
type PageLang = string;
/**
 * Ref wrapper of `PageLang`
 */
type PageLangRef = ComputedRef<PageLang>;
/**
 * Injection key for page language
 */
declare const pageLangSymbol: InjectionKey<PageLangRef>;
/**
 * Returns the ref of the language of current page
 */
declare const usePageLang: () => PageLangRef;

/**
 * Ref wrapper of `PageLayout`
 */
type PageLayoutRef = ComputedRef<Component>;
/**
 * Injection key for page layout
 */
declare const pageLayoutSymbol: InjectionKey<PageLayoutRef>;
/**
 * Returns layout component of current page
 */
declare const usePageLayout: () => ComputedRef<Component>;

/**
 * Data resolvers of all pages
 *
 * The key is page key, and the value is an async function that
 * returns the page data
 */
type PagesData = Record<string, (() => Promise<PageData>) | undefined>;
/**
 * Ref wrapper of `PagesData`
 */
type PagesDataRef = Ref<PagesData>;
/**
 * Global pages data ref
 */
declare const pagesData: PagesDataRef;
/**
 * Returns the ref of data resolvers of all pages
 */
declare const usePagesData: () => PagesDataRef;

/**
 * Route locale path
 */
type RouteLocale = string;
/**
 * Ref wrapper of `RouteLocale`
 */
type RouteLocaleRef = Readonly<Ref<RouteLocale>>;
/**
 * Injection key for page route locale path
 */
declare const routeLocaleSymbol: InjectionKey<RouteLocaleRef>;
/**
 * Returns the ref of the route locale path of current page
 */
declare const useRouteLocale: () => RouteLocaleRef;

/**
 * Ref wrapper of `SiteData`
 */
type SiteDataRef = Ref<SiteData>;
/**
 * Global site data ref
 */
declare const siteData: SiteDataRef;
/**
 * Returns the ref of the site data
 */
declare const useSiteData: () => SiteDataRef;

/**
 * Site data of current locale
 */
type SiteLocaleData = SiteData;
/**
 * Ref wrapper of `SiteLocaleData`
 */
type SiteLocaleDataRef = ComputedRef<SiteLocaleData>;
/**
 * Injection key for site locale data
 */
declare const siteLocaleDataSymbol: InjectionKey<SiteLocaleDataRef>;
/**
 * Returns the ref of the site data of current locale
 */
declare const useSiteLocaleData: () => SiteLocaleDataRef;

/**
 * A util function to force update `<head>` of current page
 */
type UpdateHead = () => void;
/**
 * Injection key for `updateHead` util
 */
declare const updateHeadSymbol: InjectionKey<UpdateHead>;
/**
 * Returns the `updateHead` util
 */
declare const useUpdateHead: () => UpdateHead;

/**
 * A helper function to help you define vuepress client config file
 */
declare const defineClientConfig: (clientConfig?: ClientConfig) => ClientConfig;

/**
 * Prefix url with site base
 */
declare const withBase: (url: string) => string;

/**
 * Resolver methods to get global computed
 *
 * Users can override corresponding method for advanced customization
 */
declare const resolvers: {
    resolveLayouts: (clientConfigs: ClientConfig[]) => Layouts;
    resolvePageData: (pageKey: string) => Promise<PageData>;
    resolvePageFrontmatter: (pageData: PageData) => PageFrontmatter;
    resolvePageHead: (headTitle: PageHeadTitle, frontmatter: PageFrontmatter, siteLocale: SiteLocaleData) => PageHead;
    resolvePageHeadTitle: (page: PageData, siteLocale: SiteLocaleData) => PageHeadTitle;
    resolvePageLang: (page: PageData, siteLocale: SiteLocaleData) => PageLang;
    resolvePageLayout: (page: PageData, layouts: Layouts) => Component;
    resolveRouteLocale: (locales: SiteData['locales'], routePath: string) => RouteLocale;
    resolveSiteLocaleData: (site: SiteData, routeLocale: RouteLocale) => SiteLocaleData;
};

export { ClientConfig, ClientOnly, Content, CreateVueAppFunction, Layouts, LayoutsRef, PageDataRef, PageFrontmatterRef, PageHead, PageHeadRef, PageHeadTitle, PageHeadTitleRef, PageLang, PageLangRef, PageLayoutRef, PageRouteItem, PagesData, PagesDataRef, RouteLocale, RouteLocaleRef, SiteDataRef, SiteLocaleData, SiteLocaleDataRef, UpdateHead, defineClientConfig, layoutsSymbol, pageDataEmpty, pageDataSymbol, pageFrontmatterSymbol, pageHeadSymbol, pageHeadTitleSymbol, pageLangSymbol, pageLayoutSymbol, pagesData, resolvers, routeLocaleSymbol, siteData, siteLocaleDataSymbol, updateHeadSymbol, useLayouts, usePageData, usePageFrontmatter, usePageHead, usePageHeadTitle, usePageLang, usePageLayout, usePagesData, useRouteLocale, useSiteData, useSiteLocaleData, useUpdateHead, withBase };
