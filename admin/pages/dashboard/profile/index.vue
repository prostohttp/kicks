<script lang="ts" setup>
import type { UserDto } from "~/server/dto/user.dto";

// store

// vars

const { data } = useAuth();

// handlers
const { data: user } = await useFetch<UserDto>("/api/user/one", {
  method: "GET",
  params: {
    email: data.value?.user?.email,
  },
});

// meta
definePageMeta({
  name: "profile",
});

useHead({
  title: user.value?.name,
});
// hooks
</script>

<template>
  <div>
    <h1>Profile</h1>
  </div>
</template>
