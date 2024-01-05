import { defineComponent, h, onMounted, ref } from "vue";
import FadeSlideY from "@theme-hope/components/transitions/FadeSlideY";
import PasswordModal from "@theme-hope/modules/encrypt/components/PasswordModal";
import { useGlobalEncrypt } from "@theme-hope/modules/encrypt/composables/index";
export default defineComponent({
    name: "GlobalEncrypt",
    slots: Object,
    setup(_props, { slots }) {
        const { isDecrypted, isEncrypted, validate } = useGlobalEncrypt();
        const isMounted = ref(false);
        onMounted(() => {
            isMounted.value = true;
        });
        return () => h(FadeSlideY, () => isEncrypted.value
            ? isMounted.value
                ? isDecrypted.value
                    ? slots.default()
                    : h(PasswordModal, { full: true, onVerify: validate })
                : null
            : slots.default());
    },
});
//# sourceMappingURL=GlobalEncrypt.js.map