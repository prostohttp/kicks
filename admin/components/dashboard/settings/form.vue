<script lang="ts" setup>
// store
const settingsDataStore = useSettingsDataStore();
const { settings } = storeToRefs(settingsDataStore);
</script>

<template>
  <div>
    <pre>{{ settings }}</pre>
  </div>
</template>
