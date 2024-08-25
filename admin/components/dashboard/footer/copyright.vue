<script lang="ts" setup>
// store
const settingsDataStore = useSettingsDataStore();
await useAsyncData(() => settingsDataStore.getSettings());
const { settings } = storeToRefs(settingsDataStore);
const { locale } = storeToRefs(settingsDataStore);
</script>

<template>
  <div>
    <p>
      &copy; {{ new Date().getFullYear() }}
      {{ settings![locale].title }}
    </p>
  </div>
</template>
