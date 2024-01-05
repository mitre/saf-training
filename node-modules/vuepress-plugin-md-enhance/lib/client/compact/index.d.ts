import * as vue from 'vue';
import { FunctionalComponent, VNode, SlotsType } from 'vue';

interface CodeGroupItemProps {
    title: string;
    active?: boolean;
}
declare const CodeGroupItem: FunctionalComponent<CodeGroupItemProps, Record<never, never>, {
    default: () => VNode | VNode[] | undefined;
}>;
declare const CodeGroup: vue.DefineComponent<{}, () => VNode | null, {}, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {}, string, vue.PublicProps, Readonly<vue.ExtractPropTypes<{}>>, {}, SlotsType<{
    default: () => VNode[];
}>>;

interface CardProps {
    /**
     * Card title
     *
     * 卡片标题
     *
     */
    title: string;
    /**
     * Card description
     *
     * 卡片描述
     */
    desc?: string;
    /**
     * Card icon
     *
     * 卡片图标
     */
    logo?: string;
    /**
     * Card link
     *
     * 卡片链接
     */
    link?: string;
    /**
     * Card background
     *
     * 卡片背景
     */
    background?: string;
    /**
     * Card font color
     *
     * 卡片字体颜色
     */
    color?: string;
}
declare const VPCard: FunctionalComponent<CardProps>;

export { type CardProps, CodeGroup, CodeGroupItem, type CodeGroupItemProps, VPCard };
