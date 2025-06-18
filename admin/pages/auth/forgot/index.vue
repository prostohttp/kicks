<script lang="ts" setup>
import { useThrottleFn } from "@vueuse/core";
import { Constants } from "~/constants";
import { locale } from "~/lang/locale";
import type { ForgotFormDto } from "~/types/server/server.types";

// store
const settingsDataStore = useSettingsDataStore();

// meta
definePageMeta({
    layout: "auth",
    auth: {
        unauthenticatedOnly: true,
        navigateAuthenticatedTo: "/dashboard",
    },
    alias: ["/forgot"],
});
useHead({
    title: locale[settingsDataStore.locale].forgotPassword,
});

// Vars
const isOpen = ref(false);
const toast = useToast();

// Handlers
const forgot = async (data: ForgotFormDto) => {
    const { email } = data;
    try {
        await $fetch("/api/auth/forgot", {
            method: "POST",
            body: {
                email,
            },
        });
        const token = generateToken(10);
        const savedToken = await $fetch("/api/auth/generate-token", {
            method: "POST",
            body: {
                email,
                getToken: token,
            },
        });
        toast.add({
            title: "Check your email for instructions on resetting your password.",
        });
        await $fetch("/api/email/forgot-password-send-email", {
            method: "POST",
            body: {
                email,
                siteName: locale[settingsDataStore.locale].siteName,
                siteUrl: Constants.SITE_URL,
                token: `token?token=${savedToken.token}&timestamp=${savedToken.timestamp}`,
            },
        });
    } catch (error: any) {
        toast.add({ title: error.statusMessage });
    }
};
const forgotHandler = useThrottleFn(forgot, 1000);
</script>

<template>
    <div class="lg:grid flex flex-col lg:grid-cols-2 h-dvh dark:text-white">
        <AuthSidebar />
        <div
            class="flex lg:pt-[40px] pb-[40px] pt-[40px] lg:px-0 px-[30px] justify-center items-center"
        >
            <div class="max-w-[480px] flex flex-col w-full gap-[24px]">
                <div>
                    <h1 class="font-[Rubik] font-[600] text-[36px] mb-[8px]">
                        {{ locale[settingsDataStore.locale].forgotPassword }}
                    </h1>
                </div>
                <AuthForgotPasswordForm @submit="forgotHandler" />
                <AuthSocialButtons />
                <span
                    class="open-sans text-[16px] font-[600] underline decoration-gray-main hover: cursor-pointer"
                    @click.prevent="isOpen = true"
                >
                    {{ locale[settingsDataStore.locale].terms }}
                </span>
            </div>
        </div>
        <UiModal
            v-model="isOpen"
            class="dark:text-white"
            fullscreen
            title="KicksClub Terms & Conditions"
        >
            <ContentDoc path="/terms" />
        </UiModal>
    </div>
</template>
