<script lang="ts" setup>
import { locale } from "~/lang/locale";
</script>

<template>
  <div>
    <p>&copy; {{ new Date().getFullYear() }} {{ locale["en"].copy }}</p>
  </div>
</template>
