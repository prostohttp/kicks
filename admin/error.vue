<script setup lang="ts">
import type { NuxtError } from "#app";

// props
const { error } = defineProps({
  error: Object as () => NuxtError,
});

// handlers
const errorHandle = () => {
  clearError({ redirect: "/" });
};

const computedErrorMessage = computed(() => {
  if (error?.statusCode === 404) {
    return "Page not found";
  } else {
    return error?.message || "Something went wrong";
  }
});

// meta
useHead({
  title: computedErrorMessage.value,
});
</script>

<template>
  <div
    class="flex flex-col justify-center items-center h-dvh gap-[20px] px-[20px] xl:px-0 dark:text-white"
  >
    <img
      src="~/assets/img/large-logo.svg"
      alt="kicks logo"
      class="mb-[50px] lg:max-w-[100%] max-w-[300px]"
    />
    <h1 class="text-[4em] font-[Rubik]">{{ error!.statusCode }}</h1>
    <p>{{ computedErrorMessage }}</p>
    <UButton color="black" variant="solid" size="xl" @click="errorHandle">
      Go back home
    </UButton>
  </div>
</template>
