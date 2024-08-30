<script lang="ts" setup>
import { locale } from "./lang/locale";

// meta
useSeoMeta({
  ogImage: "/kicks-marketplace.svg",
});
useHead({
  titleTemplate: `%s - ${locale[useSettingsDataStore().locale].siteHeading}`,
});
</script>

<template>
  <div class="w-full max-w-[1440px] mx-auto">
    <NuxtRouteAnnouncer />
    <!-- TODO: Удалить -->
    <NuxtClientFallback fallback-tag="span" fallback="Hello world">
      <!-- TODO: Удалить -->
      <NuxtLayout>
        <NuxtLoadingIndicator :height="3" color="#FFA52F" />
        <UiSwitchTheme />
        <NuxtPage />
      </NuxtLayout>
      <UNotifications />
      <UModals />
      <!-- TODO: Удалить -->
    </NuxtClientFallback>
    <!-- TODO: Удалить -->
  </div>
</template>
