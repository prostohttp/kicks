<script lang="ts" setup>
// store
const settingsDataStore = useSettingsDataStore();
await useAsyncData("settingsLocale", () => settingsDataStore.getLocale());
</script>

<template>
  <slot />
</template>
