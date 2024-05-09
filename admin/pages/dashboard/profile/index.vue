<script lang="ts" setup>
// meta
definePageMeta({
  layout: "dashboard",
  name: "profile",
});

// store

// vars
const { data } = useAuth();

// handlers
const { data: user } = await useFetch("/api/user/one", {
  method: "GET",
  params: {
    email: data.value?.user?.email,
  },
});
// hooks
</script>

<template>
  <div>
    <h1>Profile</h1>
  </div>
</template>
