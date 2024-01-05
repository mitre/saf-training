export { default as debug } from 'debug';
export { default as fs } from 'fs-extra';
export { globby } from 'globby';
export { default as hash } from 'hash-sum';
import { Ora } from 'ora';
export { default as ora } from 'ora';
export { default as colors } from 'picocolors';
export { default as path } from 'upath';
import { HeadConfig, HeadAttrsConfig } from '@vuepress/shared';

/**
 * Format millisecond
 */
declare const formatMs: (ms: number) => string;

declare const info: (...args: any[]) => void;
declare const tip: (...args: any[]) => void;
declare const success: (...args: any[]) => void;
declare const warn: (...args: any[]) => void;
declare const error: (...args: any[]) => void;
declare const createError: (message?: string | undefined) => Error;
declare const logger: {
    info: (...args: any[]) => void;
    tip: (...args: any[]) => void;
    success: (...args: any[]) => void;
    warn: (...args: any[]) => void;
    error: (...args: any[]) => void;
    createError: (message?: string | undefined) => Error;
};

declare const withSpinner: (msg: string) => <T>(target: (spinner?: Ora) => Promise<T>) => Promise<T>;

declare const getDirname: (importMetaUrl: string) => string;

/**
 * A helper for dynamically importing a file path
 *
 * We need to use `pathToFileURL` to transform file path wo compat with windows
 */
declare const importFile: <T>(filePath: string) => Promise<T>;
/**
 * A wrapper of `importFile` and returns the default export
 */
declare const importFileDefault: <T>(filePath: string) => Promise<T>;

/**
 * Check if `child` is a sub path of `parent` or not. Return `true` if
 * they are the same path
 */
declare const isChildPath: (child: string, parent: string) => boolean;

declare const sanitizeFileName: (name: string) => string;

/**
 * Render head config to string
 */
declare const renderHead: ([tag, attrs, innerHTML,]: HeadConfig) => string;

/**
 * Render head attrs config to string
 */
declare const renderHeadAttrs: (attrs: HeadAttrsConfig) => string;

/**
 * HTML outlets of the template renderer
 */
declare const TEMPLATE_RENDERER_OUTLETS: {
    CONTENT: string;
    HEAD: string;
    LANG: string;
    PREFETCH: string;
    PRELOAD: string;
    SCRIPTS: string;
    STYLES: string;
    VERSION: string;
};
/**
 * Context type of the template renderer
 */
interface TemplateRendererContext {
    /**
     * The rendered page content. Typically to be put inside `<div id="app"></div>`
     */
    content: string;
    /**
     * The rendered page head. Typically to be put inside `<head></head>`
     */
    head: string;
    /**
     * The language of the page. Typically to be put inside `<html lang="{{ lang }}">`
     */
    lang: string;
    /**
     * The rendered prefetch links. Typically to be put inside `<head></head>`
     */
    prefetch: string;
    /**
     * The rendered preload links. Typically to be put inside `<head></head>`
     */
    preload: string;
    /**
     * The rendered scripts. Typically to be put before `</body>`
     */
    scripts: string;
    /**
     * The rendered styles. Typically to be put inside `<head></head>`
     */
    styles: string;
    /**
     * The version of VuePress
     */
    version: string;
}
/**
 * Type of the template renderer function
 */
type TemplateRenderer = (template: string, context: TemplateRendererContext) => string | Promise<string>;
/**
 * The default template renderer implementation
 */
declare const templateRenderer: TemplateRenderer;

export { TEMPLATE_RENDERER_OUTLETS, TemplateRenderer, TemplateRendererContext, createError, error, formatMs, getDirname, importFile, importFileDefault, info, isChildPath, logger, renderHead, renderHeadAttrs, sanitizeFileName, success, templateRenderer, tip, warn, withSpinner };
