import { PluginSimple } from 'markdown-it';
import Token from 'markdown-it/lib/token.js';

/**
 * Forked from https://github.com/markdown-it/markdown-it-footnote/blob/master/index.js
 */

declare const footnote: PluginSimple;

interface FootNoteToken extends Token {
    meta: {
        id: number;
        subId: number;
        label: string;
    };
}
interface FootNoteEnv extends Record<any, any> {
    docId?: string;
    footnotes: {
        label?: string;
        refs?: Record<string, number>;
        list?: {
            label?: string;
            count?: number;
            content?: string;
            tokens?: Token[] | null;
        }[];
    };
}

export { type FootNoteEnv, type FootNoteToken, footnote };
