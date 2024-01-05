import { PluginSimple } from 'markdown-it';

/**
 * Fork and edited from https://github.com/tatsy/markdown-it-imsize/blob/master/lib/index.js
 */

declare const imgSize: PluginSimple;
declare const obsidianImageSize: PluginSimple;

interface MarkdownReference {
    href: string;
    title?: string;
}
interface ImgSizeEnv extends Record<any, any> {
    references?: Record<string, MarkdownReference>;
}

export { type ImgSizeEnv, type MarkdownReference, imgSize, obsidianImageSize };
