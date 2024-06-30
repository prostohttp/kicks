<script lang="ts" setup>
import { eng } from "~/lang/eng";

export interface IProduct {}

// store
const productDataStore = useProductDataStore();
const { products } = storeToRefs(productDataStore);

// vars
const isAdmin = useIsAdmin();
const route = useRoute();
const router = useRouter();
const page = Number(route.query.page);

// handlers
await useAsyncData("products", () =>
  productDataStore.getAllProducts(page, route.query.category?.toString()),
);

// meta
definePageMeta({
  name: "all-products",
});
useHead({
  title: eng.allProducts,
});

// hooks
watch(
  () => route.query,
  (newValue) => {
    productDataStore.getAllProducts(page, newValue.category?.toString());
  },
);
</script>

<template>
  <div>All Products</div>
  <pre>{{ products }}</pre>
</template>
