<script lang="ts" setup>
import { Constants } from "~/constants";
import { eng } from "~/lang/eng";
import type { BreadcrumbItem } from "~/types/ui/ui.types";

// store
const productDataStore = useProductDataStore();
const categoryDataStore = useCategoryDataStore();
const { products: data } = storeToRefs(productDataStore);

// vars
const route = useRoute();
const router = useRouter();
const routeCategory = route.query.category;
const path = router.currentRoute.value.path;
const category = ref(routeCategory?.toString());
await useAsyncData(
  "foundedCategory",
  () => categoryDataStore.getCategoryById(category.value),
  {
    watch: [category],
  },
);
const fullPath = computed(() =>
  !categoryDataStore.category ? path : `${path}/${category.value}`,
);
const links: Ref<BreadcrumbItem[]> = ref(
  !categoryDataStore.category
    ? breadcrumbsArrayFactory(path)
    : breadcrumbsArrayFactory(
        fullPath.value,
        categoryDataStore.category.title,
        `${path}?category=${category.value}`,
      ),
);
await useAsyncData("products", () =>
  productDataStore.getAllProducts(Number(route.query.page), category.value),
);
const activePage = ref(data.value?.activePage || 1);

// handlers

// meta
definePageMeta({
  name: "all-products",
});
useHead({
  title: eng.allProducts,
});

// hooks
onMounted(() => {
  if (route.query.page) {
  }
});

watch(
  () => route.query,
  async (newValue) => {
    category.value = newValue.category ? newValue.category.toString() : "";
    await categoryDataStore.getCategoryById(category.value);
    links.value = breadcrumbsArrayFactory(
      fullPath.value,
      categoryDataStore.category?.title,
      `${path}?category=${category.value}`,
    );

    activePage.value = Number(newValue.page);
    productDataStore.getAllProducts(
      Number(newValue.page),
      newValue.category?.toString(),
    );
  },
);

watch(activePage, async (newValue) => {
  router.push({ query: { ...route.query, page: newValue || 1 } });
});
</script>

<template>
  <div
    class="flex justify-between items-center sm:flex-row flex-col gap-0 md:gap-[15px]"
  >
    <DashboardBreadcrumbs
      :links="links"
      :title="
        categoryDataStore.category?.title
          ? categoryDataStore.category.title
          : eng.breadcrumbs.products
      "
    />
    <UButton
      class="h-[48px] px-[26px] py-[10px] flex justify-center items-center uppercase font-[600] shadow-none bg-dark-gray rounded-[8px] hover:bg-dark-gray dark:bg-yellow dark:hover:bg-yellow mb-[24px] hover:text-fa-white dark:hover:text-dark-gray"
      icon="i-heroicons-plus-circle"
      :label="eng.addNewProduct"
      to="/dashboard/products/new"
    />
  </div>
  <main class="flex flex-col">
    <UiEmpty v-if="!data?.allItems" />
    <div
      class="grid 2xl:grid-cols-3 xl:grid-cols-2 sm:grid-cols-1 gap-[14px]"
      v-else
    >
      <DashboardProductCard
        v-for="product in data?.products"
        :product="product"
        :remaining="1269"
        :sales="1269"
      />
    </div>
  </main>
  <UiPagination
    v-if="data?.pagesInPagination"
    v-model="activePage"
    :element-in-page="Constants.PER_PAGE_PRODUCT"
    :allItems="data?.allItems"
  />
</template>
