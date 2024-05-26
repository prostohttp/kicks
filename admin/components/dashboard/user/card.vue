<script lang="ts" setup>
import type { UserDto } from "~/server/dto/user.dto";

// defines
defineProps<{
  user: UserDto;
}>();
</script>

<template>
  <div
    class="bg-fa-white rounded-[16px] p-[16px] dark:bg-dark-bg dark:text-fa-white"
  >
    {{ user.name }}
  </div>
</template>
