<script lang="ts" setup>
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
      <UiSwitchTheme />
      <NuxtPage />
    </NuxtLayout>
    <UNotifications />
  </div>
</template>
