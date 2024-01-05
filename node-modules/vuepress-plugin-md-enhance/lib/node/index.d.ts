import { PluginWithOptions, PluginSimple } from 'markdown-it';
import { RequiredLocaleConfig } from 'vuepress-shared/node';
import { CompilerOptions } from 'typescript';
import { LocaleConfig, PluginFunction } from '@vuepress/core';
import { MarkdownItIncludeOptions } from '@mdit/plugin-include';
import { MarkdownItStylizeConfig } from '@mdit/plugin-stylize';
import { MarkdownItAttrsOptions } from '@mdit/plugin-attrs';
export { MarkdownItAttrsOptions as AttrsOptions } from '@mdit/plugin-attrs';
import { MarkdownItFigureOptions } from '@mdit/plugin-figure';
export { MarkdownItFigureOptions as FigureOptions } from '@mdit/plugin-figure';
import { MarkdownItImgMarkOptions } from '@mdit/plugin-img-mark';
export { MarkdownItImgMarkOptions as ImgMarkOptions } from '@mdit/plugin-img-mark';
import { MarkdownItTaskListOptions } from '@mdit/plugin-tasklist';
export { MarkdownItTaskListOptions as TasklistOptions } from '@mdit/plugin-tasklist';
import { MarkdownItKatexOptions } from '@mdit/plugin-katex';
export { MarkdownItKatexOptions as KatexOptions } from '@mdit/plugin-katex';
import { MarkdownItMathjaxOptions } from '@mdit/plugin-mathjax';
export { MarkdownItMathjaxOptions as MathjaxOptions } from '@mdit/plugin-mathjax';

interface MarkdownAlertLocaleData {
    /**
     * Default Title text for important block
     *
     * 重要块的默认标题
     */
    important: string;
    /**
     * Default Title text for note block
     *
     * 注释块的默认标题
     */
    note: string;
    /**
     * Default Title text for tip block
     *
     * 提示块的默认标题
     */
    tip: string;
    /**
     * Default Title text for warning block
     *
     * 注意块的默认标题
     */
    warning: string;
    /**
     * Default Title text for caution block
     *
     * 警告块的默认标题
     */
    caution: string;
}

interface MarkdownHintLocaleData {
    /**
     * Default Title text for important block
     *
     * 重要块的默认标题
     */
    important: string;
    /**
     * Default Title text for note block
     *
     * 注释块的默认标题
     */
    note: string;
    /**
     * Default Title text for tip block
     *
     * 提示块的默认标题
     */
    tip: string;
    /**
     * Default Title text for warning block
     *
     * 注意块的默认标题
     */
    warning: string;
    /**
     * Default Title text for danger block
     *
     * 警告块的默认标题
     */
    caution: string;
    /**
     * Default Title text for info block
     *
     * 信息块的默认标题
     */
    info: string;
    /**
     * Default Title text for details block
     *
     * 详情块的默认标题
     */
    details: string;
}

type MarkdownEnhanceLocaleData = MarkdownHintLocaleData;
type MarkdownEnhanceLocaleConfig = RequiredLocaleConfig<MarkdownEnhanceLocaleData>;

interface PlaygroundCodeConfig {
    /**
     * Code block extension
     *
     * @description It's based on filename, not code fence language
     *
     * 代码块扩展名
     *
     * @description 它基于文件名，而不是代码块语言
     */
    ext: string;
    /**
     * Code block content
     *
     * 代码块内容
     */
    content: string;
}
interface PlaygroundData {
    /**
     * Title of Playground
     *
     * 交互演示标题
     */
    title?: string;
    /**
     * Import map file name
     *
     * Import map 文件名
     *
     * @default "import-map.json"
     */
    importMap?: string;
    /**
     * Playground files info
     *
     * 交互演示文件信息
     */
    files: Record<
    /**
     * File name
     *
     * 文件名
     */
    string, 
    /**
     * File detail
     *
     * 文件详情
     */
    PlaygroundCodeConfig>;
    /**
     * Playground settings
     *
     * @description It's parsed result of json content after setting directive
     *
     * 交互演示设置
     *
     * @description 它是设置指令后的 json 内容的解析结果
     */
    settings: Record<string, unknown>;
    /**
     * hash key based on playground content
     *
     * 根据交互演示内容生成的 hash key
     */
    key: string;
}
interface PlaygroundOptions {
    /**
     * Playground container name
     *
     * 交互演示容器名
     */
    name: string;
    /**
     * Playground component name
     *
     * 交互演示组件名称
     *
     * @default "Playground"
     */
    component?: string;
    /**
     * Props getter
     *
     * 属性获取器
     */
    propsGetter: (data: PlaygroundData) => Record<string, string>;
}
interface TSPresetPlaygroundOptions extends CompilerOptions {
    /**
     * external playground service url
     *
     * 交互演示外部地址
     *
     * @default "https://www.typescriptlang.org/play"
     */
    service?: string;
}
interface VuePresetPlaygroundOptions {
    /**
     * external playground service url
     *
     * 交互演示外部地址
     *
     * @default "https://sfc.vuejs.org/"
     */
    service?: string;
    /**
     * Whether to use dev version
     *
     * 是否启用开发版本
     *
     * @default false
     */
    dev?: boolean;
    /**
     * Whether to enable SSR
     *
     * 是否启用 SSR
     *
     * @default false
     */
    ssr?: boolean;
}
interface UnoPresetPlaygroundOptions {
    /**
     * external playground service url
     *
     * 交互演示外部地址
     *
     * @default "https://unocss.dev/play"
     */
    service?: string;
}

type RevealJsPlugin = "highlight" | "math" | "search" | "notes" | "zoom";
type RevealJsTheme = "auto" | "beige" | "black" | "blood" | "league" | "moon" | "night" | "serif" | "simple" | "sky" | "solarized" | "white";
/**
 * reveal.js options
 */
interface RevealJsOptions {
    /**
     * reveal.js plugins
     *
     * 幻灯片插件
     *
     * @default []
     */
    plugins?: RevealJsPlugin[];
    /**
     * reveal.js themes
     *
     * 幻灯片主题
     *
     * @default ["auto"]
     */
    themes?: RevealJsTheme[];
}

type IncludeOptions = Omit<MarkdownItIncludeOptions, "currentPath">;
type StylizeOptions = MarkdownItStylizeConfig[];

type MarkdownItAlertOptions = RequiredLocaleConfig<MarkdownAlertLocaleData>;
declare const alert: PluginWithOptions<MarkdownItAlertOptions>;

declare const chart: PluginSimple;

/**
 * Code demo options
 */
interface CodeDemoOptions {
    /**
     * Whether to use babel to transpile to es5
     *
     * 是否使用 Babel 转义到 ES5
     *
     * @default false
     */
    useBabel: boolean;
    /**
     * JS Library links
     *
     * 引入的 JS 外部库链接
     */
    jsLib: string[];
    /**
     * CSS Library links
     *
     * 引入的 CSS 外部库链接
     */
    cssLib: string[];
    /**
     * Whether to display JSFiddle button
     *
     * 是否显示 JSFiddle 按钮
     *
     * @default true
     */
    jsfiddle?: boolean;
    /**
     * Whether to display CodePen button
     *
     * 是否显示 CodePen 按钮
     *
     * @default true
     */
    codepen?: boolean;
    /**
     * CodePen editor layout
     *
     * CodePen 编辑器布局
     *
     * @default "left"
     */
    codepenLayout: "top" | "left" | "right";
    /**
     * CodePen Editor Display
     *
     * CodePen 编辑器显示情况
     *
     * @default "101"
     */
    codepenEditors: "101" | "100" | "110" | "111" | "011" | "001" | "010";
    /**
     * Babel lib address
     *
     * Babel 库的地址
     *
     * @default "https://unpkg.com/@babel/standalone/babel.min.js"
     */
    babel: string;
    /**
     * Vue lib address
     *
     * Vue 库的地址
     *
     * @default "https://unpkg.com/vue/dist/vue.global.prod.js"
     */
    vue: string;
    /**
     * React lib address
     *
     * React 库的地址
     *
     * @default "https://unpkg.com/react/umd/react.production.min.js"
     */
    react: string;
    /**
     * ReactDOM lib address
     *
     * ReactDOM 库的地址
     *
     * @default "https://unpkg.com/react-dom/umd/react-dom.production.min.js"
     */
    reactDOM: string;
}

declare const CODE_DEMO_DEFAULT_SETTING: CodeDemoOptions;
declare const normalDemo: PluginSimple;
declare const vueDemo: PluginSimple;
declare const reactDemo: PluginSimple;
declare const mdDemo: PluginSimple;

declare const codeTabs: PluginSimple;

declare const component: PluginSimple;

declare const echarts: PluginSimple;

declare const flowchart: PluginSimple;

type MarkdownItHintOptions = RequiredLocaleConfig<MarkdownHintLocaleData>;
type MarkdownHintBoxName = keyof MarkdownHintLocaleData;
declare const hint: PluginWithOptions<MarkdownItHintOptions>;

declare const kotlinPlayground: PluginSimple;

declare const markmap: PluginSimple;

interface MermaidOptions {
    content: string;
    diagram?: string;
    title?: string;
}
declare const getMermaidContent: ({ diagram, content, title, }: MermaidOptions) => string;
declare const mermaid: PluginSimple;

declare const playground: PluginWithOptions<PlaygroundOptions>;

/** Gets a query string representation (hash + queries) */
declare const getURL: (code: string, compilerOptions?: CompilerOptions) => string;
declare const getTSPlaygroundPreset: ({ service, ...compilerOptions }?: TSPresetPlaygroundOptions) => PlaygroundOptions;

declare const getVuePlaygroundPreset: (options?: VuePresetPlaygroundOptions) => PlaygroundOptions;

declare const generateUnoURL: (service: string, inputHTML: string, customCSS: string, customConfigRaw: string) => string;
declare const getUnoPlaygroundPreset: ({ service, }?: UnoPresetPlaygroundOptions) => PlaygroundOptions;

declare const revealJs: PluginSimple;

declare const tabs: PluginSimple;

declare const vPre: PluginSimple;

declare const vuePlayground: PluginSimple;

declare const markdownEnhanceLocales: MarkdownEnhanceLocaleConfig;

type LinksCheckStatus = "always" | "dev" | "build" | "never";
interface LinksCheckOptions {
    /**
     * Whether check dead links in markdown
     *
     * 是否检查 Markdown 中的死链
     *
     * @default "dev"
     */
    status?: LinksCheckStatus;
    /**
     * Dead links to ignore
     *
     * 忽略的死链
     */
    ignore?: (string | RegExp)[] | ((link: string, isDev: boolean) => boolean);
}
/**
 * md-enhance plugin configuration
 */
interface MarkdownEnhanceOptions {
    /**
     * Whether check dead links in markdown
     *
     * @default { status: "dev"}
     */
    checkLinks?: LinksCheckOptions;
    /**
     * Whether enable standard GFM support
     *
     * 是否启用标准的 GitHub Favor Markdown 支持
     *
     * @default false
     */
    gfm?: boolean;
    /**
     * Whether to enable hint container including
     *
     * - important
     * - info
     * - note
     * - tip
     * - warning
     * - caution
     * - details
     *
     * ⚠ The last 4 items conflict with default theme and will override it’s style.
     *
     * 是否启用提示容器
     *
     * - important
     * - info
     * - note
     * - tip
     * - warning
     * - caution
     * - details
     *
     * ⚠ 最后四个会和默认主题冲突，且会覆盖默认主题的样式与行为。
     *
     * @default false
     */
    hint?: boolean;
    /**
     * Whether to enable v-pre wrapper.
     *
     * 是否启用 v-pre 容器。
     *
     * @default false
     */
    vPre?: boolean;
    /**
     * Whether convert `\n` in paragraphs into `<br>`s
     *
     * 是否将段落中的 `\n` 转换为 `<br>`
     *
     * @description enabled in gfm mode
     *
     * @default false
     */
    breaks?: boolean;
    /**
     * Whether convert URL-like text into links
     *
     * 是否将文字中的链接格式文字转换为链接
     *
     * @description enabled in gfm mode
     *
     * @default false
     */
    linkify?: boolean;
    /**
     * Wether enable gfm alerts
     *
     * 是否启用 gfm 警告
     *
     * @default false
     */
    alert?: boolean;
    /**
     * Whether to enable tabs.
     *
     * 是否启用标签页分组。
     *
     * @default false
     */
    tabs?: boolean;
    /**
     * Whether to enable codetabs.
     *
     * 是否启用代码组。
     *
     * @default false
     */
    codetabs?: boolean;
    /**
     * Whether to enable align support
     *
     * 是否启用自定义对齐支持。
     *
     * @default false
     */
    align?: boolean;
    /**
     * Whether to enable attr support
     *
     * 是否启用属性支持。
     *
     * @default false
     */
    attrs?: MarkdownItAttrsOptions | boolean;
    /**
     * Whether to enable superscript format support
     *
     * 是否启用上角标格式支持。
     *
     * @default false
     */
    sup?: boolean;
    /**
     * Whether to enable subscript format support
     *
     * 是否启用下角标格式支持。
     *
     * @default false
     */
    sub?: boolean;
    /**
     * Whether render figure with standalone imag
     *
     * 是否将单独的图片渲染为 figure
     *
     * @default false
     */
    figure?: MarkdownItFigureOptions | boolean;
    /**
     * Whether to enable footnote format support
     *
     * 是否启用脚注格式支持。
     *
     * @default false
     */
    footnote?: boolean;
    /**
     * Whether enable native image lazy loading
     *
     * 是否启用原生的图片懒加载。
     *
     * @default false
     */
    imgLazyload?: boolean;
    /**
     * Whether to enable gfm image id mark support
     *
     * 是否启用 GFM 图片 ID 标记。
     *
     * @default false
     */
    imgMark?: MarkdownItImgMarkOptions | boolean;
    /**
     * Whether to enable image size mark support
     *
     * 是否启用图片大小标记支持。
     *
     * @default false
     */
    imgSize?: boolean;
    /**
     * Whether to enable obsidian image size mark support
     *
     * 是否启用 obsidian 图片大小标记支持。
     *
     * @default false
     */
    obsidianImgSize?: boolean;
    /**
     * Whether to enable mark format support
     *
     * 是否启用标注支持。
     *
     * @default false
     */
    mark?: boolean;
    /**
     * Whether to enable tasklist format support
     *
     * 是否启用任务列表支持
     *
     * @default false
     */
    tasklist?: MarkdownItTaskListOptions | boolean;
    /**
     * Whether to enable include syntax support
     *
     * 是否启用导入语法支持
     *
     * @default false
     */
    include?: Partial<IncludeOptions> | boolean;
    /**
     * Whether to enable katex support
     *
     * @see https://katex.org/docs/options.html
     *
     * 是否启用 katex 语法支持
     *
     * @see https://katex.org/docs/options.html
     *
     * @default false
     */
    katex?: (MarkdownItKatexOptions & {
        /**
         * whether enable copy plugin
         *
         * @default false
         */
        copy?: boolean;
    }) | boolean;
    /**
     * Whether to enable mathjax support
     *
     * @see http://docs.mathjax.org/en/latest/options/index.html
     *
     * 是否启用 mathjax 语法支持
     *
     * @see http://docs.mathjax.org/en/latest/options/index.html
     *
     * @default false
     */
    mathjax?: MarkdownItMathjaxOptions | boolean;
    /**
     * Whether to enable component support
     *
     * 是否启用组件支持
     *
     * @default false
     */
    component?: boolean;
    /**
     * Whether to enable chart support
     *
     * 是否启用 chart 图表支持
     *
     * @default false
     */
    chart?: boolean;
    /**
     * Whether to enable echarts support
     *
     * 是否启用 echarts 图表支持
     *
     * @default false
     */
    echarts?: boolean;
    /**
     * Whether to enable flowchart support
     *
     * 是否启用 flowchart 流程图支持
     *
     * @default false
     */
    flowchart?: boolean;
    /**
     * Whether to enable markmap support
     *
     * 是否启用 markmap 流程图支持
     *
     * @default false
     */
    markmap?: boolean;
    /**
     * Whether to enable mermaid support
     *
     * 是否启用 Mermaid 流程图支持
     *
     * @default false
     */
    mermaid?: boolean;
    /**
     * Whether to enable code-demo support
     *
     * 是否启用代码示例功能
     *
     * @default false
     */
    demo?: Partial<CodeDemoOptions> | boolean;
    /**
     * Whether to enable reveal.js support
     *
     * 是否启用 Reveal.js 支持
     *
     * @default false
     */
    revealJs?: RevealJsOptions | boolean;
    /**
     * Keyword enhancement
     *
     * 关键词显示增强选项
     */
    stylize?: StylizeOptions;
    /**
     * Whether to enable playground support
     *
     * 是否启用 playground 支持
     */
    playground?: {
        /** Playground presets */
        presets: ("ts" | "vue" | "unocss" | PlaygroundOptions)[];
        /** Playground config */
        config?: {
            ts?: TSPresetPlaygroundOptions;
            vue?: VuePresetPlaygroundOptions;
            unocss?: UnoPresetPlaygroundOptions;
        };
    };
    /**
     * Whether to enable kotlin playground support
     *
     * 是否启用 kotlin Playground 支持
     *
     * @default false
     */
    kotlinPlayground?: boolean;
    /**
     * Whether to enable vue playground support
     *
     * 是否启用 Vue Playground 支持
     *
     * @default false
     */
    vuePlayground?: boolean;
    /**
     * The delay of operating dom, in ms
     *
     * If the theme you are using has a switching animation, it is recommended to configure this option to `Switch animation duration + 200`
     *
     * 操作页面 DOM 的延时，单位 ms
     *
     * 如果你使用的主题有切换动画，建议配置此选项为 `切换动画时长 + 200`
     *
     * @default 800
     */
    delay?: number;
    /**
     * Locale config
     *
     * 国际化配置选项
     */
    locales?: LocaleConfig<MarkdownEnhanceLocaleData>;
}

declare const mdEnhancePlugin: (options?: MarkdownEnhanceOptions, legacy?: boolean) => PluginFunction;

export { CODE_DEMO_DEFAULT_SETTING, type IncludeOptions, type LinksCheckOptions, type LinksCheckStatus, type MarkdownAlertLocaleData, type MarkdownEnhanceLocaleConfig, type MarkdownEnhanceLocaleData, type MarkdownEnhanceOptions, type MarkdownHintBoxName, type MarkdownHintLocaleData, type MarkdownItAlertOptions, type MarkdownItHintOptions, type PlaygroundCodeConfig, type PlaygroundData, type PlaygroundOptions, type RevealJsOptions, type RevealJsPlugin, type RevealJsTheme, type StylizeOptions, type TSPresetPlaygroundOptions, type UnoPresetPlaygroundOptions, type VuePresetPlaygroundOptions, alert, chart, codeTabs, component, echarts, flowchart, generateUnoURL, getMermaidContent, getTSPlaygroundPreset, getURL, getUnoPlaygroundPreset, getVuePlaygroundPreset, hint, kotlinPlayground, markdownEnhanceLocales, markmap, mdDemo, mdEnhancePlugin, mermaid, normalDemo, playground, reactDemo, revealJs, tabs, vPre, vueDemo, vuePlayground };
