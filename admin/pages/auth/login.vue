<script lang="ts" setup>
import { useThrottleFn } from "@vueuse/core";
import { locale } from "~/lang/locale";
import { type LoginFormDto } from "~/types/server/server.types";

// store
const settingsDataStore = useSettingsDataStore();

// Vars
const isOpen = ref(false);
const isError = ref();
const { signIn } = useAuth();
const toast = useToast();

// meta
definePageMeta({
    layout: "auth",
    name: "login",
    auth: {
        unauthenticatedOnly: true,
        navigateAuthenticatedTo: "/dashboard",
    },
    alias: ["/login"],
});

useHead({
    title: locale[settingsDataStore.locale].login,
});

// Handlers
const login = async (data: LoginFormDto) => {
    isError.value = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
    });
    if (!isError.value.error) {
        navigateTo("/dashboard");
    } else {
        toast.add({ title: locale[settingsDataStore.locale].error.wrongData });
    }
};
const loginHandler = useThrottleFn(login, 1000);
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
                        {{ locale[settingsDataStore.locale].login }}
                    </h1>
                    <ULink
                        class="open-sans text-[16px] font-[600] underline decoration-gray-main"
                        to="/auth/forgot"
                    >
                        {{ locale[settingsDataStore.locale].forgotPassword }}
                    </ULink>
                </div>
                <AuthLoginForm @submit="loginHandler" />
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
            <ContentDoc class="dark:text-white" path="/terms" />
        </UiModal>
    </div>
</template>
