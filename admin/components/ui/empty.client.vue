<script lang="ts" setup>
import { locale } from "~/lang/locale";

// store
const settingsDataStore = useSettingsDataStore();
</script>

<template>
    <div class="flex w-full h-full items-center mt-[15px]">
        <h2 class="text-2xl font-[600] text-dark-gray dark:text-fa-white">
            {{ locale[settingsDataStore.locale].empty }}
        </h2>
    </div>
</template>
