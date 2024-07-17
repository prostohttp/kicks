<script lang="ts" setup>
import { eng } from "./lang/eng";

// meta
useSeoMeta({
  ogImage: "/kicks-marketplace.svg",
});
useHead({
  titleTemplate: `%s - ${eng.siteHeading}`,
});
</script>

<template>
  <div class="w-full max-w-[1440px] mx-auto">
    <NuxtLayout>
      <NuxtLoadingIndicator :height="5" color="#FFA52F" />
      <UiSwitchTheme />
      <NuxtPage />
    </NuxtLayout>
    <UNotifications />
    <UModals />
  </div>
</template>
