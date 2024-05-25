<script lang="ts" setup>
definePageMeta({
  middleware: ["only-admin-access"],
});
</script>

<template>
  <div>
    <h1>All users</h1>
  </div>
</template>
