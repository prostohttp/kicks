<script lang="ts" setup>
import { Locales } from "~/types/ui/ui.types";
const { locale } = defineProps<{
  locale: Locales;
}>();
</script>

<template>
  <div>
    {{ locale === Locales.EN ? "ENGLISH" : "Русский" }}
  </div>
</template>
