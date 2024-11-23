<script lang="ts" setup>
import { locale } from "./lang/locale";

// store
const settingsDataStore = useSettingsDataStore();

// vars
const description = computed(() => {
    return "%s - " + locale[settingsDataStore.locale].siteHeading;
});

// meta
useSeoMeta({
    ogImage: "/kicks-marketplace.svg",
});
useHead({
    titleTemplate: description,
});
</script>

<template>
    <div class="w-full max-w-[1440px] mx-auto">
        <NuxtRouteAnnouncer />
        <NuxtLayout>
            <NuxtLoadingIndicator :height="3" color="#FFA52F" />
            <UiSwitchTheme />
            <NuxtPage />
        </NuxtLayout>
        <UNotifications />
        <UModals />
    </div>
</template>
