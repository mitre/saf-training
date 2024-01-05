import * as vue from 'vue';
import { PropType, VNode } from 'vue';
import { UseMediaTextTrackSource } from '@vueuse/core';
import { Options } from 'plyr';

interface VidePlayerSource {
    src: string;
    type: string;
    size: string | number;
}
declare const _default: vue.DefineComponent<{
    /** Options object for plyr config. **/
    options: {
        type: PropType<Options>;
        default: () => {};
    };
    /**
     * Video source
     *
     * 视频源
     */
    src: {
        type: PropType<string | VidePlayerSource[]>;
        required: true;
    };
    /**
     * Video title
     *
     * 视频标题
     */
    title: {
        type: StringConstructor;
        default: string;
    };
    /**
     * Video file type
     *
     * 视频文件类型
     */
    type: {
        type: StringConstructor;
        default: string;
    };
    /**
     * Video tracks
     *
     * 视频字幕
     */
    tracks: {
        type: PropType<UseMediaTextTrackSource[]>;
        default: () => UseMediaTextTrackSource[];
    };
    /**
     * Video poster
     *
     * 视频封面
     */
    poster: {
        type: StringConstructor;
        default: string;
    };
    /**
     * Component width
     *
     * 组件宽度
     */
    width: {
        type: (StringConstructor | NumberConstructor)[];
        default: string;
    };
    /**
     * Whether to loop the video
     *
     * 是否循环播放
     */
    loop: BooleanConstructor;
}, () => VNode, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {}, string, vue.PublicProps, Readonly<vue.ExtractPropTypes<{
    /** Options object for plyr config. **/
    options: {
        type: PropType<Options>;
        default: () => {};
    };
    /**
     * Video source
     *
     * 视频源
     */
    src: {
        type: PropType<string | VidePlayerSource[]>;
        required: true;
    };
    /**
     * Video title
     *
     * 视频标题
     */
    title: {
        type: StringConstructor;
        default: string;
    };
    /**
     * Video file type
     *
     * 视频文件类型
     */
    type: {
        type: StringConstructor;
        default: string;
    };
    /**
     * Video tracks
     *
     * 视频字幕
     */
    tracks: {
        type: PropType<UseMediaTextTrackSource[]>;
        default: () => UseMediaTextTrackSource[];
    };
    /**
     * Video poster
     *
     * 视频封面
     */
    poster: {
        type: StringConstructor;
        default: string;
    };
    /**
     * Component width
     *
     * 组件宽度
     */
    width: {
        type: (StringConstructor | NumberConstructor)[];
        default: string;
    };
    /**
     * Whether to loop the video
     *
     * 是否循环播放
     */
    loop: BooleanConstructor;
}>>, {
    options: Options;
    title: string;
    type: string;
    poster: string;
    width: string | number;
    loop: boolean;
    tracks: UseMediaTextTrackSource[];
}, {}>;

export { type VidePlayerSource, _default as default };
