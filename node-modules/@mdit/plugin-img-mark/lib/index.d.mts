import { PluginWithOptions } from 'markdown-it';

interface MarkdownItImgMarkOptions {
    /**
     * lightmode only ids
     *
     * 日间模式 ID
     *
     * @default ["gh-light-mode-only", "light"]
     */
    light?: string[];
    /**
     * darkmode only ids
     *
     * 夜间模式 ID
     *
     * @default ["gh-dark-mode-only", "dark"]
     */
    dark?: string[];
}

declare const imgMark: PluginWithOptions<MarkdownItImgMarkOptions>;

export { type MarkdownItImgMarkOptions, imgMark };
