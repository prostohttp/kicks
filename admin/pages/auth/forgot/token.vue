<script lang="ts" setup>
import { useThrottleFn } from "@vueuse/core";
import ResetPasswordForm from "~/components/auth/reset-password-form.vue";
import type { ResetPasswordDto } from "~/types/server/server.types";

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
  title: "Reset password",
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
      title: "Password changed, now you can Login",
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
      <div class="max-w-[480px] flex flex-col w-full gap-[24px]" v-else>
        <div>
          <h1 class="font-[Rubik] font-[600] text-[36px] mb-[8px]">
            Reset password
          </h1>
        </div>
        <LazyResetPasswordForm @submit="resetPasswordHandler" v-if="isValid" />
        <template v-else>
          <p>Sorry, but the password reset link is no longer valid.</p>
          <p>
            Please try to reset your password again and make sure to use the
            latest link provided in the email.
          </p>
          <p>
            If you continue to experience issues, feel free to contact our
            support team for further assistance. Thank you for your
            understanding.
          </p>
          <UButton
            to="/forgot"
            class="bg-dark-gray h-[48px] px-[16px] flex w-full uppercase justify-center font-[Rubik] font-[500] hover:bg-yellow"
          >
            Try again
          </UButton>
        </template>
      </div>
    </div>
  </div>
</template>
