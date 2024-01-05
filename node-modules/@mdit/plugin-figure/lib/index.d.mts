import { PluginWithOptions } from 'markdown-it';

interface MarkdownItFigureOptions {
    /**
     * Whether the figure is focusable
     *
     * 图片是否可聚焦
     *
     * @default true
     */
    focusable?: boolean;
}

/**
 * Forked and modified from https://github.com/Antonio-Laguna/markdown-it-image-figures
 */

declare const figure: PluginWithOptions<MarkdownItFigureOptions>;

export { type MarkdownItFigureOptions, figure };
