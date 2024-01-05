import { RenderRule } from 'markdown-it/lib/renderer.js';
import { PluginWithOptions } from 'markdown-it';

interface MarkdownItUMLOptions {
    /**
     * UML name
     *
     * UML 名称
     */
    name: string;
    /**
     * Opening marker
     *
     * 开始标记
     */
    open: string;
    /**
     *  Closing marker
     *
     * 结束标记
     */
    close: string;
    /**
     * Render function
     *
     * 渲染函数
     */
    render: RenderRule;
}

declare const uml: PluginWithOptions<MarkdownItUMLOptions>;

export { type MarkdownItUMLOptions, uml };
