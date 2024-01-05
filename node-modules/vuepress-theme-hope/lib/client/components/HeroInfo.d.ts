import type { SlotsType, VNode } from "vue";
import "../styles/hero-info.scss";
export interface HeroInfo {
    text: string | null;
    tagline: string | null;
    isFullScreen: boolean;
}
export interface HeroImage {
    image: string | null;
    imageDark: string | null;
    heroStyle: string | Record<string, string> | undefined;
    alt: string;
    isFullScreen: boolean;
}
export interface BackgroundInfo {
    image: string | null;
    bgStyle: string | Record<string, string> | undefined;
    isFullScreen: boolean;
}
declare const _default: import("vue").DefineComponent<{}, () => VNode, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{}>>, {}, SlotsType<{
    heroBg?: (props: BackgroundInfo) => VNode[] | VNode | null;
    heroImage?: (props: HeroImage) => VNode[] | VNode | null;
    heroInfo?: (props: HeroInfo) => VNode[] | VNode | null;
}>>;
export default _default;
