import { RequiredLocaleConfig } from 'vuepress-shared';
import { LocaleConfig, PluginFunction, App } from '@vuepress/core';

interface ReadingTime {
    /**
     * expect reading time
     *
     * 期望的阅读时间
     */
    minutes: number;
    /**
     * words of current page
     *
     * 当前页的字数
     */
    words: number;
}
interface ReadingTimePluginPageData {
    readingTime: ReadingTime;
}

/**
 * Multi language config for `vuepress-plugin-reading-time2` plugin
 *
 * `vuepress-plugin-reading-time2` 插件的多语言配置
 */
interface ReadingTimeLocaleData {
    /**
     * Word template, `$word` will be automatically replaced by actual words
     *
     * 字数模板，模板中 `$word` 会被自动替换为字数
     */
    word: string;
    /**
     * Text for less than one minute
     *
     * 小于一分钟文字
     */
    less1Minute: string;
    /**
     * Time template
     *
     * 时间模板
     */
    time: string;
}
type ReadingTimeLocaleConfig = RequiredLocaleConfig<ReadingTimeLocaleData>;

/**
 * Default locale config for `vuepress-plugin-reading-time2` plugin
 */
declare const readingTimeLocales: ReadingTimeLocaleConfig;

/**
 * Extract Latin words from content
 */
declare const getWords: (content: string) => RegExpMatchArray | null;
/**
 * Extract Chinese Characters from content
 */
declare const getChinese: (content: string) => RegExpMatchArray | null;
/**
 * Get word number of given string
 */
declare const getWordNumber: (content: string) => number;
/**
 * Get reading time info
 */
declare const getReadingTime: (content: string, wordsPerMinute?: number) => ReadingTime;

interface ReadingTimeOptions {
    /**
     * reading speed (words per minute)
     *
     * 每分钟阅读的字数
     *
     * @default 300
     */
    wordPerMinute?: number;
    /**
     * Locales config
     *
     * @see [default config](https://github.com/vuepress-theme-hope/vuepress-theme-hope/blob/main/packages/reading-time2/src/node/locales.ts)
     *
     * 多语言选项
     *
     * @see [默认配置](https://github.com/vuepress-theme-hope/vuepress-theme-hope/blob/main/packages/reading-time2/src/node/locales.ts)
     */
    locales?: LocaleConfig<ReadingTimeLocaleData>;
}

/** Reading time plugin */
declare const readingTimePlugin: (options: ReadingTimeOptions, legacy?: boolean) => PluginFunction;

/**
 * Composition Api to use `vuepress-plugin-reading-time2`
 */
declare const useReadingTimePlugin: (app: App, options: ReadingTimeOptions, legacy?: boolean) => void;
/**
 * Composition Api to remove `vuepress-plugin-reading-time2`
 */
declare const removeReadingTimePlugin: (app: App) => void;

export { type ReadingTime, type ReadingTimeLocaleConfig, type ReadingTimeLocaleData, type ReadingTimeOptions, type ReadingTimePluginPageData, getChinese, getReadingTime, getWordNumber, getWords, readingTimeLocales, readingTimePlugin, removeReadingTimePlugin, useReadingTimePlugin };
