<script lang="ts" setup>
import type { CategoryDto } from "~/server/api/category/dto/category.dto";

// vars
const error = ref<string>("");
const router = useRouter();
const categoryId = useRoute().params.category;
const { data: category } = await useFetch<CategoryDto>("/api/category/one", {
  method: "GET",
  query: {
    id: categoryId,
  },
  pick: ["title"],
});
if (!category.value) {
  error.value = "Category not found";
}
// handlers

// meta
useHead({
  title: category.value?.title || error.value,
});
</script>

<template>
  <div>
    <template v-if="error">
      <h1>{{ error }}</h1>
    </template>
    <template v-else>
      <h1>{{ category?.title }}</h1>
      <!-- <pre>{{ router }}</pre> -->
    </template>
  </div>
</template>
