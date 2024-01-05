import type { Router } from "vue-router";
import type { AutoLinkOptions } from "../../shared/index.js";
export declare const resolvePrefix: (prefix?: string, path?: string) => string;
/**
 * Resolve AutoLink props from string
 *
 */
export declare const resolveLinkInfo: (router: Router, item: string, preferFull?: boolean) => AutoLinkOptions;
