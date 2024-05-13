<script lang="ts" setup>
const { signOut, data, status } = useAuth();
// Meta
definePageMeta({
  name: "dashboard",
});
useHead({
  title: "Dashboard",
});
</script>

<template>
  <div>Dashboard</div>
  <pre>{{ data }}</pre>
</template>
