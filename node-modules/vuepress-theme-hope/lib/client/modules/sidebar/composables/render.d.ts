import type { VNode } from "vue";
import type { ResolvedSidebarHeaderItem, ResolvedSidebarItem } from "../utils/index.js";
export declare const renderSidebarItem: (config: ResolvedSidebarItem, props: VNode["props"]) => VNode;
export declare const renderSidebarChildren: (children: ResolvedSidebarHeaderItem[]) => VNode | null;
