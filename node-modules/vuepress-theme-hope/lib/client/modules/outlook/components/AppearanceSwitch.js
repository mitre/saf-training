import { defineComponent, h, nextTick } from "vue";
import { usePure } from "@theme-hope/composables/index";
import { AutoIcon, DarkIcon, LightIcon, } from "@theme-hope/modules/outlook/components/icons/index";
import { useDarkmode } from "@theme-hope/modules/outlook/composables/index";
import "../styles/appearance-switch.scss";
export default defineComponent({
    name: "AppearanceSwitch",
    setup() {
        const { config, isDarkmode, status } = useDarkmode();
        const pure = usePure();
        const updateDarkmodeStatus = () => {
            if (config.value === "switch")
                status.value = {
                    light: "dark",
                    dark: "auto",
                    auto: "light",
                }[status.value];
            else
                status.value = status.value === "light" ? "dark" : "light";
        };
        const toggleDarkmode = async (event) => {
            const useViewTransition = 
            // @ts-expect-error
            document.startViewTransition &&
                !window.matchMedia("(prefers-reduced-motion: reduce)").matches &&
                !pure.value;
            if (!useViewTransition || !event) {
                updateDarkmodeStatus();
                return;
            }
            const x = event.clientX;
            const y = event.clientY;
            const endRadius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
            const oldStatus = isDarkmode.value;
            const transition = document.startViewTransition(async () => {
                updateDarkmodeStatus();
                await nextTick();
            });
            await transition.ready;
            if (isDarkmode.value !== oldStatus)
                document.documentElement.animate({
                    clipPath: isDarkmode.value
                        ? [
                            `circle(${endRadius}px at ${x}px ${y}px)`,
                            `circle(0px at ${x}px ${y}px)`,
                        ]
                        : [
                            `circle(0px at ${x}px ${y}px)`,
                            `circle(${endRadius}px at ${x}px ${y}px)`,
                        ],
                }, {
                    duration: 400,
                    pseudoElement: isDarkmode.value
                        ? "::view-transition-old(root)"
                        : "::view-transition-new(root)",
                });
        };
        return () => h("button", {
            type: "button",
            id: "appearance-switch",
            onClick: toggleDarkmode,
        }, [
            h(AutoIcon, {
                style: {
                    display: status.value === "auto" ? "block" : "none",
                },
            }),
            h(DarkIcon, {
                style: {
                    display: status.value === "dark" ? "block" : "none",
                },
            }),
            h(LightIcon, {
                style: {
                    display: status.value === "light" ? "block" : "none",
                },
            }),
        ]);
    },
});
//# sourceMappingURL=AppearanceSwitch.js.map