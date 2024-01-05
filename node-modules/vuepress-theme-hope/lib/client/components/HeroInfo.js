import { usePageFrontmatter, useSiteLocaleData, withBase, } from "@vuepress/client";
import { computed, defineComponent, h } from "vue";
import { isString } from "vuepress-shared/client";
import AutoLink from "@theme-hope/components/AutoLink";
import DropTransition from "@theme-hope/components/transitions/DropTransition";
import HopeIcon from "./HopeIcon.js";
import "../styles/hero-info.scss";
export default defineComponent({
    name: "HeroInfo",
    slots: Object,
    setup(_props, { slots }) {
        const frontmatter = usePageFrontmatter();
        const siteLocale = useSiteLocaleData();
        const isFullScreen = computed(() => frontmatter.value.heroFullScreen ?? false);
        const heroInfo = computed(() => {
            const { heroText, tagline } = frontmatter.value;
            return {
                text: heroText ?? siteLocale.value.title ?? "Hello",
                tagline: tagline ?? siteLocale.value.description ?? "",
                isFullScreen: isFullScreen.value,
            };
        });
        const heroImage = computed(() => {
            const { heroText, heroImage, heroImageDark, heroAlt, heroImageStyle } = frontmatter.value;
            return {
                image: heroImage ? withBase(heroImage) : null,
                imageDark: heroImageDark ? withBase(heroImageDark) : null,
                heroStyle: heroImageStyle,
                alt: heroAlt || heroText || "hero image",
                isFullScreen: isFullScreen.value,
            };
        });
        const bgInfo = computed(() => {
            const { bgImage, bgImageDark, bgImageStyle } = frontmatter.value;
            return {
                image: isString(bgImage) ? withBase(bgImage) : null,
                imageDark: isString(bgImageDark) ? withBase(bgImageDark) : null,
                bgStyle: bgImageStyle,
                isFullScreen: isFullScreen.value,
            };
        });
        const actions = computed(() => frontmatter.value.actions ?? []);
        return () => h("header", { class: ["vp-hero-info-wrapper", { fullscreen: isFullScreen.value }] }, [
            slots.heroBg?.(bgInfo.value) || [
                bgInfo.value.image
                    ? h("div", {
                        class: ["vp-hero-mask", { light: bgInfo.value.imageDark }],
                        style: [
                            { "background-image": `url(${bgInfo.value.image})` },
                            bgInfo.value.bgStyle,
                        ],
                    })
                    : null,
                bgInfo.value.imageDark
                    ? h("div", {
                        class: "vp-hero-mask dark",
                        style: [
                            {
                                "background-image": `url(${bgInfo.value.imageDark})`,
                            },
                            bgInfo.value.bgStyle,
                        ],
                    })
                    : null,
            ],
            h("div", { class: "vp-hero-info" }, [
                slots.heroImage?.(heroImage.value) ||
                    h(DropTransition, { appear: true, type: "group" }, () => [
                        heroImage.value.image
                            ? h("img", {
                                key: "light",
                                class: [
                                    "vp-hero-image",
                                    { light: heroImage.value.imageDark },
                                ],
                                style: heroImage.value.heroStyle,
                                src: heroImage.value.image,
                                alt: heroImage.value.alt,
                            })
                            : null,
                        heroImage.value.imageDark
                            ? h("img", {
                                key: "dark",
                                class: "vp-hero-image dark",
                                style: heroImage.value.heroStyle,
                                src: heroImage.value.imageDark,
                                alt: heroImage.value.alt,
                            })
                            : null,
                    ]),
                slots.heroInfo?.(heroInfo.value) ??
                    h("div", { class: "vp-hero-infos" }, [
                        heroInfo.value.text
                            ? h(DropTransition, { appear: true, delay: 0.04 }, () => h("h1", { id: "main-title" }, heroInfo.value.text))
                            : null,
                        heroInfo.value.tagline
                            ? h(DropTransition, { appear: true, delay: 0.08 }, () => h("p", {
                                id: "main-description",
                                innerHTML: heroInfo.value.tagline,
                            }))
                            : null,
                        actions.value.length
                            ? h(DropTransition, { appear: true, delay: 0.12 }, () => h("p", { class: "vp-hero-actions" }, actions.value.map((action) => h(AutoLink, {
                                class: [
                                    "vp-hero-action",
                                    action.type || "default",
                                ],
                                config: action,
                                noExternalLinkIcon: true,
                            }, action.icon
                                ? {
                                    before: () => h(HopeIcon, { icon: action.icon }),
                                }
                                : {}))))
                            : null,
                    ]),
            ]),
        ]);
    },
});
//# sourceMappingURL=HeroInfo.js.map