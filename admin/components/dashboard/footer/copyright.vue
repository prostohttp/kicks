<script lang="ts" setup>
// store
const settingsDataStore = useSettingsDataStore();
await useAsyncData(() => settingsDataStore.getSettings());
const { settings } = storeToRefs(settingsDataStore);

// vars
const locale = ref(settingsDataStore.locale);
</script>

<template>
  <div>
    <p>
      &copy; {{ new Date().getFullYear() }}
      {{ settings![locale].title }}
    </p>
  </div>
</template>
