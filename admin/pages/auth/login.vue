<script lang="ts" setup>
import { useThrottleFn } from "@vueuse/core";
import { type LoginFormDto } from "~/types";
// Vars
const isOpen = ref(false);
const isError = ref();
const { signIn } = useAuth();
const router = useRouter();
const toast = useToast();

// Meta
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
  title: "Login",
});

// Handlers
const loginHandler = useThrottleFn(async (data: LoginFormDto) => {
  console.log(data);

  isError.value = await signIn("credentials", {
    email: data.email,
    password: data.password,
    redirect: false,
  });
  if (!isError.value.error) {
    router.push("/dashboard");
  } else {
    toast.add({ title: "Wrong email or password" });
  }
}, 1000);
</script>

<template>
  <AuthSidebar />
  <div
    class="flex lg:pt-[40px] pb-[40px] pt-[40px] lg:px-0 px-[30px] justify-center items-center"
  >
    <div class="max-w-[480px] flex flex-col w-full gap-[24px]">
      <div>
        <h1 class="font-[Rubik] font-[600] text-[36px] mb-[8px]">Login</h1>
        <ULink
          :to="{ name: 'forgot' }"
          class="font-[OpenSans] text-[16px] font-[600] underline decoration-gray-main"
          >Forgot your password?
        </ULink>
      </div>
      <AuthLoginForm @submit="loginHandler" />
      <AuthSocialButtons />
      <span
        class="font-[OpenSans] text-[16px] font-[600] underline decoration-gray-main hover: cursor-pointer"
        @click.prevent="isOpen = true"
        >KicksClub Terms & Conditions, Kicks Privacy Notice and Terms &
        Conditions. By clicking 'Log In' you agree to our website</span
      >
    </div>
  </div>
  <UiModal v-model="isOpen" title="KicksClub Terms & Conditions" fullscreen>
    <ContentDoc path="/terms" />
  </UiModal>
</template>
