<script lang="ts" setup>
import { locale } from "~/lang/locale";

// store
const settingsDataStore = useSettingsDataStore();
</script>

<template>
  <div>
    <p>
      &copy; {{ new Date().getFullYear() }}
      {{ locale[settingsDataStore.locale].copy }}
    </p>
  </div>
</template>
