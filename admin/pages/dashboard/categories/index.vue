<script lang="ts" setup>
import { Constants } from "~/constants";
import type { CategoryDto } from "~/types";

// types
interface ICategoriesDto {
  categories: CategoryDto[];
  page?: number;
  perPage: number;
}
// meta
definePageMeta({
  layout: "dashboard",
  name: "all-categories",
});
useHead({
  title: "All categories",
});

// vars
const route = useRoute();
const currentPage = ref(route.query.page);
const perPage = Constants.PER_PAGE_CAT;

// handlers

// hooks
const { data, pending } = await useFetch<ICategoriesDto>("/api/category/all", {
  method: "POST",
  body: {
    page: currentPage.value,
    perPage: perPage,
  },
});
</script>

<template>
  <div>
    <UiSpinner v-if="pending" />
    <template v-else>
      <h1>All categories</h1>
      <pre>{{ data }}</pre>
    </template>
  </div>
</template>
