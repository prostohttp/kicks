<script lang="ts" setup>
import { useThrottleFn } from "@vueuse/core";
import { Constants } from "~/constants";
import type { ForgotFormDto } from "~/types/server/server.types";

// Meta
definePageMeta({
  layout: "auth",
  name: "forgot",
  auth: {
    unauthenticatedOnly: true,
    navigateAuthenticatedTo: "/dashboard",
  },
  alias: ["/forgot"],
});
useHead({
  title: "Forgot password",
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
        siteName: Constants.SITE_NAME,
        siteUrl: Constants.SITE_URL,
        token: `/token?token=${savedToken.token}&timestamp=${savedToken.timestamp}`,
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
            Forgot password
          </h1>
        </div>
        <AuthForgotPasswordForm @submit="forgotHandler" />
        <AuthSocialButtons />
        <span
          class="open-sans text-[16px] font-[600] underline decoration-gray-main hover: cursor-pointer"
          @click.prevent="isOpen = true"
          >KicksClub Terms & Conditions, Kicks Privacy Notice and Terms &
          Conditions. By clicking 'Log In' you agree to our website</span
        >
      </div>
    </div>
    <UiModal
      v-model="isOpen"
      title="KicksClub Terms & Conditions"
      class="dark:text-white"
      fullscreen
    >
      <ContentDoc path="/terms" />
    </UiModal>
  </div>
</template>
