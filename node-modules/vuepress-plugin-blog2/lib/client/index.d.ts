import * as vue from 'vue';
import { ComputedRef } from 'vue';
import * as _temp_blog_category from '@temp/blog/category';
import * as _temp_blog_type from '@temp/blog/type';
import { BasePageFrontMatter } from 'vuepress-shared';

interface Article<T extends Record<string, unknown> = Record<string, unknown>> {
    /**
     * Article path
     *
     * 文章路径
     */
    path: string;
    /**
     * Article info
     *
     * 文章信息
     */
    info: T;
}
interface BlogCategoryData<T extends Record<string, unknown> = Record<string, unknown>> {
    /**
     * Category path
     *
     * 分类路径
     */
    path: string;
    /**
     * Only available when current route matches an item path
     *
     * 仅当当前路径和某个子项目匹配时可用
     */
    currentItems?: Article<T>[];
    /**
     * Category map
     *
     * 分类映射
     */
    map: Record<
    /**
     * Unique key under current category
     *
     * 当前分类下全局唯一的 key
     */
    string, {
        /**
         * Category path of the key
         *
         * 对应键值的分类路径
         */
        path: string;
        /**
         * Category items of the key
         *
         * 对应键值的项目
         */
        items: Article<T>[];
    }>;
}
interface BlogTypeData<T extends Record<string, unknown> = Record<string, unknown>> {
    /**
     * Type path
     *
     * 类别路径
     */
    path: string;
    /**
     * Items under current type
     *
     * 当前类别下的项目
     */
    items: Article<T>[];
}

declare const blogCategoryMap: vue.Ref<Record<string, _temp_blog_category.CategoryMap>>;
declare const useBlogCategory: <T extends Record<string, unknown> = Record<string, unknown>>(key?: string) => ComputedRef<BlogCategoryData<T>>;

declare const blogTypeMap: vue.Ref<Record<string, _temp_blog_type.TypeMap>>;
declare const useBlogType: <T extends Record<string, unknown> = Record<string, unknown>>(key?: string) => ComputedRef<BlogTypeData<T>>;

interface BlogCategoryFrontmatterOptions {
    type: "category";
    /**
     * Unique key under current category
     *
     * 在当前分类下全局唯一的 key
     */
    key: string;
    /**
     * Current category name
     *
     * @description Only available in category item page
     *
     * 当前的分类名称
     *
     * @description 仅在分类子项目页面中可用
     */
    name?: string;
}
interface BlogTypeFrontmatterOptions {
    type: "type";
    /**
     * Unique key under current category
     *
     * 在当前分类下全局唯一的 key
     */
    key: string;
}
interface BlogPluginCategoryFrontmatter extends BasePageFrontMatter {
    blog: BlogCategoryFrontmatterOptions;
}
interface BlogPluginTypeFrontmatter extends BasePageFrontMatter {
    blog: BlogTypeFrontmatterOptions;
}
type BlogPluginFrontmatter = BlogPluginCategoryFrontmatter | BlogPluginTypeFrontmatter;

interface CategoryConfig {
    path: string;
    keys: string[];
}
interface CategoryLocaleMap {
    [categoryName: string]: CategoryConfig;
}
interface CategoryLocaleConfig {
    /** Main page of category */
    path: string;
    /** category map for current locale */
    map: CategoryLocaleMap;
}
interface CategoryMap {
    [localePath: string]: CategoryLocaleConfig;
}
interface TypeLocaleConfig {
    path: string;
    keys: string[];
}
interface TypeMap {
    [localePath: string]: TypeLocaleConfig;
}

export { type Article, type BlogCategoryData, type BlogCategoryFrontmatterOptions, type BlogPluginCategoryFrontmatter, type BlogPluginFrontmatter, type BlogPluginTypeFrontmatter, type BlogTypeData, type BlogTypeFrontmatterOptions, type CategoryConfig, type CategoryLocaleConfig, type CategoryLocaleMap, type CategoryMap, type TypeLocaleConfig, type TypeMap, blogCategoryMap, blogTypeMap, useBlogCategory, useBlogType };
