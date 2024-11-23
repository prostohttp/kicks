<script lang="ts" setup>
import { locale } from "~/lang/locale";

// store
const settingsDataStore = useSettingsDataStore();
const { locale: storeLocale } = storeToRefs(settingsDataStore);
</script>

<template>
    <div>
        <p>
            &copy; {{ new Date().getFullYear() }}
            {{ locale[storeLocale].copy }}
        </p>
    </div>
</template>
