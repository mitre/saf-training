import { EChartsOption } from 'echarts';
import { App } from 'vue';
import { MermaidConfig } from 'mermaid';
import Reveal from 'reveal.js';
import { SFCOptions } from '@vue/repl';
import Babel from '@babel/core';

interface EchartsConfig {
    /**
     * Echarts global options
     *
     * Echarts 全局选项
     */
    option?: EChartsOption;
    /**
     * Echarts setup function
     *
     * Echarts 初始化函数
     */
    setup?: () => Promise<void>;
}
declare const defineEchartsConfig: (config: EchartsConfig) => void;
declare const useEchartsConfig: () => EchartsConfig;
declare const injectEchartsConfig: (app: App) => void;

type KotlinPlaygroundInstance = any;
interface KotlinPlaygroundOptions {
    server?: string;
    version?: string;
    onChange?: (code: string) => void;
    onRun?: () => void;
    onError?: () => void;
    getJsCode?: (code: string) => void;
    onTestPassed?: () => void;
    onTestFailed?: () => void;
    onOpenConsole?: () => void;
    onCloseConsole?: () => void;
    callback?: (targetNode: HTMLElement, mountNode: HTMLElement) => void;
    getInstance?: (instance: KotlinPlaygroundInstance) => void;
}

interface MermaidThemeVariables {
    dark?: boolean;
    background?: string;
    textColor?: string;
    lineColor?: string;
    mainBkg?: string;
    errorBkgColor?: string;
    errorTextColor?: string;
    fontFamily?: string;
    titleColor?: string;
    border1?: string;
    border2?: string;
    nodeBorder?: string;
    nodeTextColor?: string;
    primaryColor?: string;
    primaryBorderColor?: string;
    primaryTextColor?: string;
    secondaryColor?: string;
    secondaryBorderColor?: string;
    secondaryTextColor?: string;
    tertiaryColor?: string;
    tertiaryBorderColor?: string;
    tertiaryTextColor?: string;
    personBorder?: string;
    personBkg?: string;
    classText?: string;
    attributeBackgroundColorOdd?: string;
    attributeBackgroundColorEven?: string;
    arrowheadColor?: string;
    clusterBkg?: string;
    clusterBorder?: string;
    edgeLabelBackground?: string;
    excludeBkgColor?: string;
    sectionBkgColor?: string;
    sectionBkgColor2?: string;
    altSectionBkgColor?: string;
    gridColor?: string;
    todayLineColor?: string;
    taskBkgColor?: string;
    taskBorderColor?: string;
    taskTextColor?: string;
    taskTextDarkColor?: string;
    taskTextClickableColor?: string;
    taskTextOutsideColor?: string;
    activeTaskBorderColor?: string;
    activeTaskBkgColor?: string;
    doneTaskBorderColor?: string;
    doneTaskBkgColor?: string;
    critBorderColor?: string;
    critBkgColor?: string;
    git1?: string;
    git2?: string;
    git3?: string;
    git4?: string;
    git5?: string;
    git6?: string;
    git7?: string;
    gitBranchLabel1?: string;
    gitBranchLabel2?: string;
    gitBranchLabel3?: string;
    gitBranchLabel4?: string;
    gitBranchLabel5?: string;
    gitBranchLabel6?: string;
    gitBranchLabel7?: string;
    gitInv1?: string;
    gitInv2?: string;
    gitInv3?: string;
    gitInv4?: string;
    gitInv5?: string;
    gitInv6?: string;
    gitInv7?: string;
    commitLabelBackground?: string;
    commitLabelColor?: string;
    commitLabelFontSize?: string;
    tagLabelBorder?: string;
    tagLabelBackground?: string;
    tagLabelColor?: string;
    tagLabelFontSize?: string;
    fillType0?: string;
    fillType1?: string;
    fillType2?: string;
    fillType3?: string;
    fillType4?: string;
    fillType5?: string;
    fillType6?: string;
    fillType7?: string;
    pie1?: string;
    pie2?: string;
    pie3?: string;
    pie4?: string;
    pie5?: string;
    pie6?: string;
    pie7?: string;
    pie8?: string;
    pie9?: string;
    pie10?: string;
    pie11?: string;
    pie12?: string;
    pieStrokeWidth?: string;
    pieOpacity?: string;
    pieOuterStrokeColor?: string;
    pieOuterStrokeWidth?: string;
    pieTitleTextSize?: string;
    pieTitleTextColor?: string;
    requirementBackground?: string;
    requirementBorderColor?: string;
    requirementBorderSize?: string;
    requirementTextColor?: string;
    relationColor?: string;
    relationLabelBackground?: string;
    relationLabelColor?: string;
    labelColor?: string;
    signalColor?: string;
    signalTextColor?: string;
    labelBoxBorderColor?: string;
    labelBoxBkgColor?: string;
    labelTextColor?: string;
    loopTextColor?: string;
    noteBkgColor?: string;
    noteTextColor?: string;
    noteBorderColor?: string;
    activationBorderColor?: string;
    activationBkgColor?: string;
    sequenceNumberColor?: string;
    actorBorder?: string;
    actorBkg?: string;
    actorTextColor?: string;
    actorLineColor?: string;
    [props: string]: string | boolean;
}
type MermaidOptions = Omit<MermaidConfig, "startOnLoad" | "themeVariables"> & {
    themeVariables?: MermaidThemeVariables | ((isDarkmode: boolean) => MermaidThemeVariables);
};

/**
 * Vue Playground options
 *
 * @description Vue playground is using [`@vue/repl`](https://github.com/vuejs/repl)
 *
 * Vue 交互演示配置
 *
 * @description Vue playground 使用 [`@vue/repl`](https://github.com/vuejs/repl)
 */
interface VuePlaygroundOptions {
    /**
     * specify the version of vue
     *
     * 指定 vue 版本
     */
    vueVersion?: string;
    /**
     * specify default URL to import Vue runtime from in the sandbox
     *
     * 指定默认的 Vue 运行时
     *
     * @default "https://unpkg.com/@vue/runtime-dom@${version}/dist/runtime-dom.esm-browser.js"
     */
    defaultVueRuntimeURL?: string;
    /**
     * Specify default URL to import Vue Server Renderer from in the sandbox
     *
     * 指定默认的 Vue 服务端渲染器
     *
     * @default "https://unpkg.com/@vue/server-renderer@${version}/dist/server-renderer.esm-browser.js"
     */
    defaultVueServerRendererURL?: string;
    /**
     * Whether to enable repl's editor resizable
     *
     * 是否启用自动调整大小
     *
     * @default true
     */
    autoResize?: boolean;
    /**
     * Whether to show JS, CSS, SSR panel
     *
     * 是否显示 JS, CSS, SSR 面板
     *
     * @default false
     */
    showCompileOutput?: boolean;
    /**
     * Whether to show import map
     *
     * 是否显示 import map
     *
     * @default true
     */
    showImportMap?: boolean;
    /**
     * Whether to clear console
     *
     * 是否清空控制台
     *
     * @default false
     */
    clearConsole?: boolean;
    /**
     * Layout
     *
     * 布局
     *
     * @default "horizontal"
     */
    layout?: "horizontal" | "vertical";
    /**
     * Options to configure the `vue/compiler-sfc`
     *
     * `vue/compiler-sfc` 配置项
     */
    sfcOptions?: SFCOptions;
    /**
     * Whether to enable SSR
     *
     * 是否启用 SSR
     *
     * @default true
     */
    ssr?: boolean;
}

declare const defineKotlinPlaygroundConfig: (options: KotlinPlaygroundOptions) => void;
declare const useKotlinPlaygroundConfig: () => KotlinPlaygroundOptions;
declare const injectKotlinPlaygroundConfig: (app: App) => void;

declare const defineMermaidConfig: (options: MermaidOptions) => void;
declare const useMermaidOptions: () => MermaidOptions;
declare const injectMermaidConfig: (app: App) => void;

type RevealJsOptions = Omit<Reveal.Options, "embedded">;
declare const defineRevealJsConfig: (options: Partial<RevealJsOptions>) => void;
declare const useRevealJsConfig: () => Partial<RevealJsOptions>;
declare const injectRevealJsConfig: (app: App) => void;

declare const defineVuePlaygroundConfig: (options: VuePlaygroundOptions) => void;
declare const useVuePlaygroundConfig: () => VuePlaygroundOptions;
declare const injectVuePlaygroundConfig: (app: App) => void;

declare global {
    interface Window {
        Babel: typeof Babel;
    }
}

/**
 * Forked from https://github.com/ulivz/vuepress-plugin-flowchart/tree/master/lib/presets
 *
 * MIT LICENSED
 */
declare const flowchartPresets: {
    ant: {
        symbols: {
            start: {
                class: string;
                "font-color": string;
                fill: string;
                "line-width": string;
            };
            end: {
                class: string;
                "font-color": string;
                fill: string;
                "line-width": string;
            };
            operation: {
                class: string;
                "font-color": string;
                fill: string;
                "line-width": string;
            };
            inputoutput: {
                class: string;
                "font-color": string;
                fill: string;
                "line-width": string;
            };
            subroutine: {
                class: string;
                "font-color": string;
                fill: string;
                "element-color": string;
                "line-color": string;
            };
            condition: {
                class: string;
                "font-color": string;
                fill: string;
                "line-width": string;
            };
            parallel: {
                class: string;
                "font-color": string;
                fill: string;
                "line-width": string;
            };
        };
        x: number;
        y: number;
        "line-width": number;
        "line-length": number;
        "text-margin": number;
        "font-size": number;
        "font-color": string;
        "line-color": string;
        "element-color": string;
        fill: string;
        "yes-text": string;
        "no-text": string;
        "arrow-end": string;
        scale: number;
    };
    vue: {
        symbols: {
            start: {
                class: string;
                "font-color": string;
                fill: string;
                "line-width": string;
            };
            end: {
                class: string;
                "font-color": string;
                fill: string;
                "line-width": string;
            };
            operation: {
                class: string;
                "font-color": string;
                fill: string;
                "line-width": string;
            };
            inputoutput: {
                class: string;
                "font-color": string;
                fill: string;
                "line-width": string;
            };
            subroutine: {
                class: string;
                "font-color": string;
                fill: string;
                "element-color": string;
                "line-color": string;
            };
            condition: {
                class: string;
                "font-color": string;
                fill: string;
                "line-width": string;
            };
            parallel: {
                class: string;
                "font-color": string;
                fill: string;
                "line-width": string;
            };
        };
        x: number;
        y: number;
        "line-width": number;
        "line-length": number;
        "text-margin": number;
        "font-size": number;
        "font-color": string;
        "line-color": string;
        "element-color": string;
        fill: string;
        "yes-text": string;
        "no-text": string;
        "arrow-end": string;
        scale: number;
    };
    pie: {
        "line-width": number;
        symbols: {
            start: {
                class: string;
                fill: string;
                "line-color": string;
                "font-color": string;
            };
            end: {
                class: string;
                fill: string;
                "line-color": string;
                "font-color": string;
            };
            operation: {
                class: string;
                fill: string;
                "line-color": string;
                "font-color": string;
            };
            inputoutput: {
                class: string;
                fill: string;
                "line-color": string;
                "font-color": string;
            };
            subroutine: {
                class: string;
                fill: string;
                "line-color": string;
                "font-color": string;
            };
            condition: {
                class: string;
                fill: string;
                "line-color": string;
                "font-color": string;
            };
            parallel: {
                class: string;
                fill: string;
                "line-color": string;
                "font-color": string;
            };
        };
        x: number;
        y: number;
        "line-length": number;
        "text-margin": number;
        "font-size": number;
        "font-color": string;
        "line-color": string;
        "element-color": string;
        fill: string;
        "yes-text": string;
        "no-text": string;
        "arrow-end": string;
        scale: number;
    };
};

export { type EchartsConfig, type RevealJsOptions, defineEchartsConfig, defineKotlinPlaygroundConfig, defineMermaidConfig, defineRevealJsConfig, defineVuePlaygroundConfig, flowchartPresets, injectEchartsConfig, injectKotlinPlaygroundConfig, injectMermaidConfig, injectRevealJsConfig, injectVuePlaygroundConfig, useEchartsConfig, useKotlinPlaygroundConfig, useMermaidOptions, useRevealJsConfig, useVuePlaygroundConfig };
