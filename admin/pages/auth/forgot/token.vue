<script lang="ts" setup>
import { useThrottleFn } from "@vueuse/core";
import { locale } from "~/lang/locale";
import type { ResetPasswordDto } from "~/types/server/server.types";

// store
const settingsDataStore = useSettingsDataStore();

// meta
definePageMeta({
    layout: "auth",
    name: "reset-password",
    auth: {
        unauthenticatedOnly: true,
        navigateAuthenticatedTo: "/dashboard",
    },
    middleware: ["reset-password-middleware"],
    alias: ["/token"],
});
useHead({
    title: locale[settingsDataStore.locale].resetPassword,
});

// Vars
const toast = useToast();
const route = useRoute();
const isLoading = ref(true);
const isValid = ref(false);
const userEmail = ref("");

// Handlers
const resetPassword = async (data: ResetPasswordDto) => {
    const { password } = data;
    try {
        await $fetch("/api/auth/reset-password", {
            method: "PUT",
            body: {
                email: userEmail.value,
                password,
            },
        });
        await $fetch("/api/auth/delete-token", {
            method: "DELETE",
            body: {
                token: route.query.token,
            },
        });
        navigateTo("/login");
        toast.add({
            title: locale[settingsDataStore.locale].passwordChanged,
            click: () => {
                navigateTo("/login");
            },
        });
    } catch (error) {}
};
const resetPasswordHandler = useThrottleFn(resetPassword, 1000);

// Hooks
onMounted(async () => {
    const now = Date.now();
    if (route.query.timestamp && +route.query.timestamp >= now) {
        const token = await $fetch("/api/auth/verification-token", {
            method: "POST",
            body: {
                token: route.query.token,
            },
        });
        if (token) {
            userEmail.value = token as string;
            isValid.value = true;
        }
    }
    isLoading.value = false;
});
</script>

<template>
    <div class="lg:grid flex flex-col lg:grid-cols-2 h-dvh dark:text-white">
        <AuthSidebar />
        <div
            class="flex lg:pt-[40px] pb-[40px] pt-[40px] lg:px-0 px-[30px] justify-center items-center"
        >
            <LazyUiSpinner v-if="isLoading" />
            <div v-else class="max-w-[480px] flex flex-col w-full gap-[24px]">
                <div>
                    <h1 class="font-[Rubik] font-[600] text-[36px] mb-[8px]">
                        {{ locale[settingsDataStore.locale].resetPassword }}
                    </h1>
                </div>
                <LazyAuthResetPasswordForm
                    v-if="isValid"
                    @submit="resetPasswordHandler"
                />
                <template v-else>
                    <p>
                        {{
                            locale[settingsDataStore.locale]
                                .resetPasswordLinkNotValid
                        }}
                    </p>
                    <p>
                        {{
                            locale[settingsDataStore.locale]
                                .tryResetPasswordAgain
                        }}
                    </p>
                    <p>
                        {{ locale[settingsDataStore.locale].contactUsForHelp }}
                    </p>
                    <UButton
                        class="bg-dark-gray h-[48px] px-[16px] flex w-full uppercase justify-center font-[Rubik] font-[500] hover:bg-yellow"
                        to="/forgot"
                    >
                        {{ locale[settingsDataStore.locale].tryAgain }}
                    </UButton>
                </template>
            </div>
        </div>
    </div>
</template>
