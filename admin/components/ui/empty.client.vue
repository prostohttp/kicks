<script lang="ts" setup>
import { locale } from "~/lang/locale";
</script>

<template>
  <div class="flex w-full h-full items-center mt-[15px]">
    <h2 class="text-2xl font-[600] text-dark-gray dark:text-fa-white">
      {{ locale["en"].empty }}
    </h2>
  </div>
</template>
