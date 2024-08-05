<script lang="ts" setup>
import { locale } from "~/lang/locale";
import type { BreadcrumbItem } from "~/types/ui/ui.types";

// store
const productDataStore = useProductDataStore();
await useAsyncData("product", () =>
  productDataStore.getProductById(useRoute().params.product.toString()),
);
const { product } = storeToRefs(productDataStore);

// vars
const router = useRouter();
// const { data: products } = useNuxtData("products");
const fullPath = router.currentRoute.value.fullPath;
const links: Ref<BreadcrumbItem[]> = ref(
  breadcrumbsArrayFactory(fullPath, product.value?.title, fullPath),
);

const title = computed(() =>
  product.value
    ? product.value?.title
    : locale[useSettingsDataStore().locale].empty,
);

// meta
useHeadSafe({
  title: title,
});

// hooks
watch(product, () => {
  links.value = breadcrumbsArrayFactory(
    fullPath,
    product.value?.title,
    fullPath,
  );
});
</script>

<template>
  <DashboardBreadcrumbs
    :links="links"
    :title="
      product ? product.title : locale[useSettingsDataStore().locale].empty
    "
  />
  <main
    class="p-[24px] bg-white rounded-[16px] dark:bg-dark-gray dark:border border-[#70706e]"
  >
    <div class="flex lg:flex-row flex-col lg:gap-[35px] gap-[20px]">
      <LazyUiEmpty v-if="!product" />
      <pre>{{ product }}</pre>
    </div>
  </main>
</template>
