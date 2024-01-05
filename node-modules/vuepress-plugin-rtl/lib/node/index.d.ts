import { PluginObject } from '@vuepress/core';

interface RTLOptions {
    /**
     * RTL locales
     *
     * @default ['/']
     */
    locales?: string[];
    /**
     * RTL selector
     *
     * @default { 'html': { dir: 'rtl' } }
     */
    selector?: {
        [element: string]: {
            [attr: string]: string;
        };
    };
}

declare const rltPlugin: (options?: RTLOptions) => PluginObject;

export { type RTLOptions, rltPlugin };
