<script lang="ts" setup>
// define
const { locale } = defineProps<{
  locale: "en" | "ru";
}>();

// store
const settingsDataStore = useSettingsDataStore();
const { settings } = storeToRefs(settingsDataStore);
</script>

<template>
  <div>
    <pre>{{ settings![locale] }}</pre>
  </div>
</template>
