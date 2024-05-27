<script lang="ts" setup>
import type { UserDto } from "~/server/dto/user.dto";

// defines
const { user } = defineProps<{
  user: UserDto;
}>();
</script>

<template>
  <div>
    <pre>{{ user }}</pre>
  </div>
</template>
