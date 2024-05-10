<script lang="ts" setup>
// handlers
const { data: articles } = await useFetch("/api/article/all", {
  method: "GET",
  query: {
    adminMenu: true,
  },
});
</script>

<template>
  <ul class="font-[600] flex gap-[16px]">
    <li v-for="{ _id, title } in articles" :key="_id">
      <NuxtLink :to="'/dashboard/articles/' + _id">{{ title }}</NuxtLink>
    </li>
  </ul>
</template>
