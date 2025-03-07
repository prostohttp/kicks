<script lang="ts" setup>
import { locale } from "~/lang/locale";

// vars

// handlers

// meta
// TODO: Добавить мидлвару на все дочерние dashboard страницы
definePageMeta({
    name: "dashboard",
    middleware: ["check-user-in-db"],
});
useHead({
    title: locale[useSettingsDataStore().locale].dashboard,
});
</script>

<template>
    <div>Dashboard</div>
</template>
