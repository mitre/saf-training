import { FunctionalComponent, VNode } from 'vue';

interface BadgeProps {
    /**
     * Badge type
     *
     * 徽章类型
     *
     * @default "info"
     */
    type?: string;
    /**
     * Badge text
     *
     * 徽章文字
     *
     * @default ""
     */
    text?: string;
    /**
     * Badge vertical align
     *
     * 徽章垂直对齐方式
     *
     * @default "top"
     */
    vertical?: "top" | "middle" | "baseline" | "bottom";
    /**
     * Badge color
     *
     * 徽章颜色
     */
    color?: string;
}
declare const Badge: FunctionalComponent<BadgeProps, Record<never, never>, {
    default?: () => VNode | VNode[] | undefined;
}>;

export { type BadgeProps, Badge as default };
