<script lang="ts" setup>
import { locale } from "~/lang/locale";

// vars

// handlers

// meta
definePageMeta({
  name: "dashboard",
});
useHead({
  title: locale[useSettingsDataStore().locale].dashboard,
});
</script>

<template>
  <div>Dashboard</div>
</template>
