import { MarkdownItHeader } from '@mdit-vue/types';
import ParserBlock from 'markdown-it/lib/parser_block.js';
import MarkdownIt from 'markdown-it';

/**
 * Options of @mdit-vue/plugin-toc
 */
interface TocPluginOptions {
    /**
     * The pattern serving as the TOC placeholder in your markdown
     *
     * @default /^\[\[toc\]\]$/i
     */
    pattern?: RegExp;
    /**
     * A custom slugification function
     *
     * Should use the same slugify function with markdown-it-anchor
     * to ensure the link is matched
     */
    slugify?: (str: string) => string;
    /**
     * A function for formatting headings
     */
    format?: (str: string) => string;
    /**
     * Heading level that going to be included in the TOC
     *
     * Should be a subset of markdown-it-anchor's `level` option
     * to ensure the link is existed
     *
     * @default [2,3]
     */
    level?: number[];
    /**
     * Should allow headers inside nested blocks or not
     *
     * If set to `true`, headers inside blockquote, list, etc. would also be included.
     *
     * @default false
     */
    shouldAllowNested?: boolean;
    /**
     * HTML tag of the TOC container
     *
     * @default 'nav'
     */
    containerTag?: string;
    /**
     * The class for the TOC container
     *
     * @default 'table-of-contents'
     */
    containerClass?: string;
    /**
     * HTML tag of the TOC list
     *
     * @default 'ul'
     */
    listTag?: 'ul' | 'ol';
    /**
     * The class for the TOC list
     *
     * @default ''
     */
    listClass?: string;
    /**
     * The class for the `<li>` tag
     *
     * @default ''
     */
    itemClass?: string;
    /**
     * The tag of the link inside `<li>` tag
     *
     * @default 'a'
     */
    linkTag?: 'a' | 'router-link';
    /**
     * The class for the link inside the `<li>` tag
     *
     * @default ''
     */
    linkClass?: string;
}

type RenderHeadersFn = (headers: MarkdownItHeader[]) => string;
declare const createRenderHeaders: ({ listTag, listClass, itemClass, linkTag, linkClass, }: Pick<Required<TocPluginOptions>, 'listTag' | 'listClass' | 'itemClass' | 'linkTag' | 'linkClass'>) => RenderHeadersFn;

/**
 * Forked and modified from markdown-it-toc-done-right
 *
 * - remove the `inlineOptions` support
 * - use markdown-it default renderer to render token whenever possible
 *
 * @see https://github.com/nagaozen/markdown-it-toc-done-right
 */
declare const createTocBlockRule: ({ pattern, containerTag, containerClass, }: Pick<Required<TocPluginOptions>, 'pattern' | 'containerTag' | 'containerClass'>) => ParserBlock.RuleBlock;

/**
 * Generate table of contents
 *
 * Forked and modified from markdown-it-toc-done-right:
 *
 * @see https://github.com/nagaozen/markdown-it-toc-done-right
 */
declare const tocPlugin: MarkdownIt.PluginWithOptions<TocPluginOptions>;

export { type TocPluginOptions, createRenderHeaders, createTocBlockRule, tocPlugin };
