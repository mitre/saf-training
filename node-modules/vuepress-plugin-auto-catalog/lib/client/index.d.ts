import { Component, App } from 'vue';

interface AutoCatalogInfo {
    /**
     * Catalog title
     *
     * 目录标题
     */
    title: string;
    /**
     * Catalog order
     *
     * 目录顺序
     */
    order?: number;
    /**
     * Catalog content
     *
     * 目录内容
     */
    content?: Component;
}
type AutoCatalogInfoGetter = (meta: Record<string, unknown>) => AutoCatalogInfo | null;
declare const defineAutoCatalogGetter: (options: AutoCatalogInfoGetter) => void;
declare const useAutoCatalogGetter: () => AutoCatalogInfoGetter;
declare const injectAutoCatalogGetter: (app: App) => void;

export { type AutoCatalogInfo, type AutoCatalogInfoGetter, defineAutoCatalogGetter, injectAutoCatalogGetter, useAutoCatalogGetter };
