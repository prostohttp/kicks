<script setup lang="ts">
import type { NuxtError } from "#app";

defineProps({
  error: Object as () => NuxtError,
});
const errorHandle = () => {
  clearError({ redirect: "/" });
};
</script>

<template>
  <div
    class="flex flex-col justify-center items-center h-dvh gap-[20px] px-[20px] xl:px-0"
  >
    <img src="~/assets/img/large-logo.svg" alt="kicks logo" class="mb-[50px]" />
    <h1 class="text-[4em] font-[Rubik]">{{ error!.statusCode }}</h1>
    <template v-if="error!.statusCode === 404">
      <p>Page not found</p>
    </template>
    <template v-else>
      <p>{{ error!.message }}</p>
    </template>
    <UButton color="black" variant="solid" size="xl" @click="errorHandle"
      >Go back home</UButton
    >
  </div>
</template>
