import MarkdownIt from 'markdown-it';

declare const TAG_NAME_SCRIPT = "script";
declare const TAG_NAME_STYLE = "style";
declare const TAG_NAME_TEMPLATE = "template";

/**
 * Options of @mdit-vue/plugin-sfc
 */
interface SfcPluginOptions {
    /**
     * Custom blocks to be extracted
     *
     * @default []
     */
    customBlocks?: string[];
}
/**
 * SFC block that extracted from markdown
 */
interface SfcBlock {
    /**
     * The type of the block
     */
    type: string;
    /**
     * The content, including open-tag and close-tag
     */
    content: string;
    /**
     * The content that stripped open-tag and close-tag off
     */
    contentStripped: string;
    /**
     * The open-tag
     */
    tagOpen: string;
    /**
     * The close-tag
     */
    tagClose: string;
}
interface MarkdownSfcBlocks {
    /**
     * The `<template>` block
     */
    template: SfcBlock | null;
    /**
     * The common `<script>` block
     */
    script: SfcBlock | null;
    /**
     * The `<script setup>` block
     */
    scriptSetup: SfcBlock | null;
    /**
     * All `<script>` blocks.
     *
     * By default, SFC only allows one `<script>` block and one `<script setup>` block.
     * However, some tools may support different types of `<script>`s, so we keep all of them here.
     */
    scripts: SfcBlock[];
    /**
     * All `<style>` blocks.
     */
    styles: SfcBlock[];
    /**
     * All custom blocks.
     */
    customBlocks: SfcBlock[];
}
declare module '@mdit-vue/types' {
    interface MarkdownItEnv {
        /**
         * SFC blocks that extracted by `@mdit-vue/plugin-sfc`
         */
        sfcBlocks?: MarkdownSfcBlocks;
    }
}

/**
 * Get Vue SFC blocks
 *
 * Extract them into env and avoid rendering them
 */
declare const sfcPlugin: MarkdownIt.PluginWithOptions<SfcPluginOptions>;

declare const SCRIPT_SETUP_TAG_OPEN_REGEXP: RegExp;
interface SfcRegExpMatchArray extends Omit<RegExpMatchArray, 'groups'> {
    groups: SfcBlock;
}
/**
 * Generate RegExp for sfc blocks
 */
declare const createSfcRegexp: ({ customBlocks, }: Required<Pick<SfcPluginOptions, 'customBlocks'>>) => RegExp;

export { type MarkdownSfcBlocks, SCRIPT_SETUP_TAG_OPEN_REGEXP, type SfcBlock, type SfcPluginOptions, type SfcRegExpMatchArray, TAG_NAME_SCRIPT, TAG_NAME_STYLE, TAG_NAME_TEMPLATE, createSfcRegexp, sfcPlugin };
