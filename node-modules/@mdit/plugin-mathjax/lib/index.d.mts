import { MmlNode } from 'mathjax-full/js/core/MmlTree/MmlNode.js';
import TexError from 'mathjax-full/js/input/tex/TexError.js';
import { TeX } from 'mathjax-full/js/input/tex.js';
import { MarkdownItTexOptions } from '@mdit/plugin-tex';
import { PluginWithOptions } from 'markdown-it';
import { LiteElement } from 'mathjax-full/js/adaptors/lite/Element.js';
import { LiteAdaptor } from 'mathjax-full/js/adaptors/liteAdaptor.js';
import { CHTML } from 'mathjax-full/js/output/chtml.js';
import { SVG } from 'mathjax-full/js/output/svg.js';

interface MathJaxTexInputOptions {
    /**
     * extensions to use
     *
     * @default [
     *   'base',
     *   'action',
     *   'ams',
     *   'amscd',
     *   'bbox',
     *   'boldsymbol',
     *   'braket',
     *   'bussproofs',
     *   'cancel',
     *   'cases',
     *   'centernot',
     *   'color',
     *   'colortbl',
     *   'empheq',
     *   'enclose',
     *   'extpfeil',
     *   'gensymb',
     *   'html',
     *   'mathtools',
     *   'mhchem',
     *   'newcommand',
     *   'noerrors',
     *   'noundefined',
     *   'upgreek',
     *   'unicode',
     *   'verb',
     *   'configmacros',
     *   'tagformat',
     *   'textcomp',
     *   'textmacros'
     *  ]
     */
    packages?: string[];
    /**
     * pattern for recognizing numbers
     *
     * @default /^(?:[0-9]+(?:\{,\}[0-9]{3})*(?:\.[0-9]*)?|\.[0-9]+)/
     */
    digits?: RegExp;
    tags?: "ams" | "all" | "none";
    /**
     * side for `\tag` macros
     */
    tagSide?: "left" | "right";
    /**
     * amount to indent tags
     *
     * @default "0.8em"
     */
    tagIndent?: "0.8em";
    /**
     * use label name rather than tag for ids
     *
     * @default true;
     */
    useLabelIds?: boolean;
    /**
     *  maximum number of macro substitutions per expression
     *
     * @default 1000
     */
    maxMacros?: number;
    /**
     * maximum size for the internal TeX string (in bytes)
     *
     * @default 5120
     */
    maxBuffer?: number;
    formatError?: (jax: TeX<unknown, unknown, unknown>, error: typeof TexError) => MmlNode;
}
interface MathjaxCommonOutputOptions {
    /**
     * Global scaling factor for all expressions
     *
     * @default 1
     */
    scale?: number;
    /**
     * smallest scaling factor to use
     *
     * @default 0.5
     */
    minScale?: number;
    /**
     * make mtext elements use surrounding font
     *
     * @default false
     */
    mtextInheritFont?: boolean;
    /**
     * make merror text use surrounding font
     *
     * @default true
     */
    merrorInheritFont?: boolean;
    /**
     * font to use for mtext, if not inheriting (empty means use MathJax fonts)
     *
     * @default ""
     */
    mtextFont?: string;
    /**
     * font to use for merror, if not inheriting (empty means use MathJax fonts)
     *
     * @default "serif"
     */
    merrorFont?: string;
    /**
     * font to use for character that aren’t in MathJax's fonts
     *
     * @default "serif"
     */
    unknownFamily?: string;
    /**
     * @default "center"
     */
    displayAlign?: "left" | "center" | "right";
    /**
     * @default 0
     */
    displayIndent?: string;
    /**
     * - `true` for MathML spacing rules
     * - `false` for TeX rules
     *
     * @default false
     */
    mathmlSpacing?: boolean;
    /**
     * RFDa and other attributes NOT to copy to the output
     */
    skipAttributes?: Record<string, boolean>;
    /**
     * default size of ex in em units
     *
     * @default 0.5
     */
    exFactor?: number;
}
interface MathjaxCommonHTMLOutputOptions extends MathjaxCommonOutputOptions {
    /**
     * Whether match ex-height of surrounding font
     *
     * @default true
     */
    matchFontHeight?: boolean;
    /**
     * The URL where the fonts are found
     *
     * @default local form mathjax-full
     */
    fontURL?: string;
    /**
     * Whether only produce CSS that is used in the processed equations
     *
     * @default true
     */
    adaptiveCSS?: boolean;
}
interface MathjaxSVGOutputOptions extends MathjaxCommonOutputOptions {
    /**
     * @default "none"
     */
    fontCache?: "local" | "global" | "none";
    /**
     * ID to use for local font cache (for single equation processing)
     */
    localID?: string | null;
    /**
     * insert <title> tags with speech content
     *
     * @default true
     */
    internalSpeechTitles?: boolean;
    /**
     * initial id number to use for aria-labeledby titles
     */
    titleID?: number;
}

interface MarkdownItMathjaxOptions extends Pick<MarkdownItTexOptions, "allowInlineWithSpace" | "mathFence"> {
    /**
     * Output syntax
     *
     * 输出格式
     *
     * @default 'svg'
     */
    output?: "chtml" | "svg";
    /**
     * Enable A11y
     *
     * 是否启用无障碍
     *
     * @default true
     */
    a11y?: boolean;
    /**
     * TeX input options
     *
     * TeX 输入选项
     */
    tex?: MathJaxTexInputOptions;
    /**
     * Common HTML output options
     *
     * 通用 HTML 输出选项
     */
    chtml?: MathjaxCommonHTMLOutputOptions;
    /**
     * SVG output options
     *
     * SVG 输出选项
     */
    svg?: MathjaxSVGOutputOptions;
    /**
     * @private This is an undocumented option, use at your own risk
     *
     * @default false
     */
    vPre?: boolean;
}

/**
 * Forked from https://github.com/tani/markdown-it-mathjax3/blob/master/index.ts
 */

interface DocumentOptions {
    InputJax: TeX<LiteElement, string, HTMLElement>;
    OutputJax: CHTML<LiteElement, string, HTMLElement> | SVG<LiteElement, string, HTMLElement>;
    enableAssistiveMml: boolean;
}
declare const getDocumentOptions: (options: MarkdownItMathjaxOptions) => DocumentOptions | null;
/**
 * Mathjax instance
 */
interface MathjaxInstance extends Required<Pick<MarkdownItMathjaxOptions, "allowInlineWithSpace" | "mathFence">> {
    /**
     * Mathjax adaptor
     */
    adaptor: LiteAdaptor;
    /**
     * Mathjax document options
     */
    documentOptions: DocumentOptions;
    /**
     * Clear style cache
     */
    clearStyle: () => void;
    /**
     * Output style for rendered content and clears it
     *
     * @returns style
     */
    outputStyle: () => string;
    /**
     * Reset tex (including labels)
     */
    reset: () => void;
    /**
     * @private
     */
    vPre: boolean;
}
declare const createMathjaxInstance: (options?: MarkdownItMathjaxOptions) => MathjaxInstance | null;
declare const mathjax: PluginWithOptions<MathjaxInstance>;

export { type DocumentOptions, type MarkdownItMathjaxOptions, type MathJaxTexInputOptions, type MathjaxCommonHTMLOutputOptions, type MathjaxCommonOutputOptions, type MathjaxInstance, type MathjaxSVGOutputOptions, createMathjaxInstance, getDocumentOptions, mathjax };
