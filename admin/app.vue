<script lang="ts" setup>
import SwitchTheme from "./components/ui/SwitchTheme.vue";

// meta
useSeoMeta({
  ogImage: "/public/kicks-marketplace.svg",
});
useHead({
  titleTemplate: "%s - Kicks admin panel",
});
</script>

<template>
  <div class="w-full max-w-[1440px] mx-auto">
    <NuxtLayout>
      <SwitchTheme />
      <NuxtPage />
    </NuxtLayout>
    <UNotifications />
  </div>
</template>
