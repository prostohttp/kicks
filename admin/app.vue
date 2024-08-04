<script lang="ts" setup>
import { locale } from "./lang/locale";

// meta
useSeoMeta({
  ogImage: "/kicks-marketplace.svg",
});
useHead({
  titleTemplate: `%s - ${locale["en"].siteHeading}`,
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
