import { MarkdownItTexOptions } from '@mdit/plugin-tex';
import { KatexOptions } from 'katex';
import MarkdownIt from 'markdown-it';

interface KatexCatcodes {
    [key: string]: number;
}
interface KatexLexerInterFace {
    input: string;
    tokenRegex: RegExp;
    settings: Required<KatexOptions>;
    catcodes: KatexCatcodes;
}
interface KatexSourceLocation {
    start: number;
    end: number;
    lexer: KatexLexerInterFace;
}
interface KatexToken {
    text: string;
    loc: KatexSourceLocation;
    noexpand: boolean | undefined;
    treatAsRelax: boolean | undefined;
}
type KatexLogger<MarkdownItEnv = unknown> = (errorCode: "unknownSymbol" | "unicodeTextInMathMode" | "mathVsTextUnits" | "commentAtEnd" | "htmlExtension" | "newLineInDisplayMode", errorMsg: string, token: KatexToken, env: MarkdownItEnv) => "error" | "warn" | "ignore" | void;
interface MarkdownItKatexOptions<MarkdownItEnv = unknown> extends KatexOptions, Pick<MarkdownItTexOptions, "allowInlineWithSpace" | "mathFence"> {
    /**
     * Whether enable mhchem extension
     *
     * 是否启用 mhchem 扩展
     *
     * @default false
     */
    mhchem?: boolean;
    /**
     * Error logger
     *
     * 错误日志记录器
     */
    logger?: KatexLogger<MarkdownItEnv>;
    /**
     * @private This is an undocumented option, use at your own risk
     *
     * @default false
     */
    vPre?: boolean;
}

declare const katex: <MarkdownItEnv = unknown>(md: MarkdownIt, options?: MarkdownItKatexOptions<MarkdownItEnv>) => void;

export { type KatexLogger, type KatexToken, type MarkdownItKatexOptions, katex };
