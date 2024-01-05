import type { ComputedRefWithControl } from "@vueuse/core";
import type { Router } from "vue-router";
import type { NavbarGroup, NavbarItem } from "../../../../shared/index.js";
import type { ResolvedThemeNavbarItem } from "../utils/index.js";
export declare const resolveNavbarItem: (router: Router, item: NavbarItem | NavbarGroup | string, prefix?: string) => ResolvedThemeNavbarItem;
export declare const useNavbarItems: () => ComputedRefWithControl<ResolvedThemeNavbarItem[]>;
