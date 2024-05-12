<script lang="ts" setup>
import { Constants } from "~/constants";
import type { CategoryDto } from "~/server/api/category/dto/category.dto";

// types
interface ICategoriesDto {
  categories: CategoryDto[];
  page?: number;
  perPage: number;
}

// meta
definePageMeta({
  name: "all-categories",
});
useHead({
  title: "All categories",
});

// vars
const router = useRouter();
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
    <LazyUiSpinner v-if="pending" />
    <template v-else>
      <h1>All categories</h1>
      <pre>{{ data }}</pre>
      <!-- <pre>{{ router }}</pre> -->
    </template>
  </div>
</template>
