import { PluginWithOptions } from 'markdown-it';

type MarkdownItAttrRuleName = "fence" | "inline" | "table" | "list" | "hr" | "softbreak" | "block";
interface MarkdownItAttrsOptions {
    /**
     * left delimiter
     *
     * 左分隔符
     *
     * @default '{'
     */
    left?: string;
    /**
     * right delimiter
     *
     * 右分隔符
     *
     * @default '}'
     */
    right?: string;
    /**
     * allowed attributes
     *
     * @description An empty list means allowing all attribute
     *
     * 允许的属性
     *
     * @description 设置空数组意味着允许所有属性
     *
     * @default []
     */
    allowed?: (string | RegExp)[];
    /**
     * Rules to enable
     *
     * 启用的规则
     *
     * @default "all"
     */
    rule?: "all" | boolean | MarkdownItAttrRuleName[];
}

/**
 * Forked and modified from https://github.com/arve0/markdown-it-attrs/
 */

declare const attrs: PluginWithOptions<MarkdownItAttrsOptions>;

export { type MarkdownItAttrRuleName, type MarkdownItAttrsOptions, attrs };
