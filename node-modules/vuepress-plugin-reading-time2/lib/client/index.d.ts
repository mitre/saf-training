import { ComputedRef } from 'vue';
import { RequiredLocaleConfig } from 'vuepress-shared';

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

declare const useReadingTimeData: () => ComputedRef<ReadingTime | null>;

interface ReadingTimeLocale {
    /**
     * Reading time text
     *
     * 阅读时间文字
     */
    time: string;
    /**
     * Words count text
     *
     * 字数统计文字
     */
    words: string;
}
declare const useReadingTimeLocaleConfig: () => ComputedRef<ReadingTimeLocaleData | null>;
declare const useReadingTimeLocale: () => ComputedRef<ReadingTimeLocale>;

declare const getReadingTimeLocale: (readingTime: ReadingTime, locale: ReadingTimeLocaleData) => {
    time: string;
    words: string;
};

export { type ReadingTime, type ReadingTimeLocale, type ReadingTimeLocaleConfig, type ReadingTimeLocaleData, type ReadingTimePluginPageData, getReadingTimeLocale, useReadingTimeData, useReadingTimeLocale, useReadingTimeLocaleConfig };
