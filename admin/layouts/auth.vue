<script lang="ts" setup>
// browser
const cookieLocale = useCookie("locale");

// store
const settingsDataStore = useSettingsDataStore();
const { locale } = storeToRefs(settingsDataStore);
await useAsyncData(() => settingsDataStore.getLocale());
cookieLocale.value = locale.value;
</script>

<template>
    <slot />
</template>
