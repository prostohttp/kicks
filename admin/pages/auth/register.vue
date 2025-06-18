<script lang="ts" setup>
import { useThrottleFn } from "@vueuse/core";
import { locale } from "~/lang/locale";
import {
    type EmailRegisterDto,
    type RegisterFormDto,
    Roles,
} from "~/types/server/server.types";
import { Constants } from "~/constants";

// store
const settingsDataStore = useSettingsDataStore();

// vars
const toast = useToast();
const { signIn } = useAuth();

// meta
definePageMeta({
    layout: "auth",
    name: "register",
    auth: {
        unauthenticatedOnly: true,
        navigateAuthenticatedTo: "/dashboard",
    },
    alias: ["/register"],
});
useHead({
    title: locale[useSettingsDataStore().locale].register,
});

// Handlers
const register = async (data: RegisterFormDto) => {
    const { name, email, password, keepLogged } = data;
    try {
        await $fetch("/api/auth/register", {
            method: "POST",
            body: {
                name,
                email,
                password,
                role: Roles.MANAGER,
                keepLogged,
                image: "",
            },
        });

        toast.add({
            title: "Registered, please wait",
        });

        await $fetch("/api/email/register-send-email", {
            method: "POST",
            body: {
                name,
                userEmail: email,
                siteName: locale[useSettingsDataStore().locale].siteName,
                siteUrl: Constants.SITE_URL + "/login",
            } as EmailRegisterDto,
        });

        if (!data.keepLogged) {
            toast.add({
                title: "You are have been registered and now you can login",
                callback: () => {
                    navigateTo("/login");
                },
            });
        } else {
            await signIn("credentials", {
                email,
                password,
            });
        }
    } catch (error: any) {
        toast.add({ title: error.statusMessage });
    }
};
const registerHandler = useThrottleFn(register, 1000);
</script>

<template>
    <div class="lg:grid flex flex-col lg:grid-cols-2 h-dvh dark:text-white">
        <AuthSidebar />
        <div
            class="flex py-[10px] lg:px-0 px-[30px] justify-center items-center"
        >
            <div class="max-w-[480px] flex flex-col w-full gap-[24px]">
                <div>
                    <h1 class="font-[Rubik] font-[600] text-[36px]">
                        {{ locale[settingsDataStore.locale].signUp }}
                    </h1>
                    <h2 class="open-sans text-[20px] font-[600]"></h2>
                </div>
                <AuthSocialButtons />
                <h2 class="font-[Rubik] font-[600] text-[36px]">
                    {{ locale[settingsDataStore.locale].register }}
                </h2>
                <AuthRegisterForm @submit="registerHandler" />
            </div>
        </div>
    </div>
</template>
