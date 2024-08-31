<script lang="ts" setup>
import { locale } from "~/lang/locale";
import type { BreadcrumbItem } from "~/types/ui/ui.types";
import { validate } from "./validator";
import type { ProductDto } from "~/server/api/product/dto/product.dto";

// store
const settingsDataStore = useSettingsDataStore();
const productDataStore = useProductDataStore();
const categoryStore = useCategoryDataStore();
// const { titles: data, selected } = storeToRefs(categoryStore);
await useAsyncData(() => settingsDataStore.getSettings());
const { locale: storeLocale } = storeToRefs(settingsDataStore);
// const { product } = storeToRefs(productDataStore);

// vars
const toast = useToast();
const isAdmin = useIsAdmin();
const router = useRouter();
const fullPath = router.currentRoute.value.fullPath;
const links: Ref<BreadcrumbItem[]> = ref(breadcrumbsArrayFactory(fullPath));
const items = ref([
  {
    slot: "data",
    label: locale[storeLocale.value].productData,
  },
  {
    slot: "options",
    label: locale[storeLocale.value].productOptions,
  },
]);
const state: Ref<ProductDto> = ref({
  isEnabled: {
    label: locale[storeLocale.value].isEnabled,
    value: true,
  },
  quantity: 1,
  category: [],
  tags: [],
} as ProductDto);

// meta
useHead({
  title: locale[settingsDataStore.locale].addNewProduct,
});

// handlers
const onSubmitHandler = async () => {
  try {
    toast.add({
      title: locale[storeLocale.value].successEdit,
      color: "green",
    });
  } catch (error: any) {
    toast.add({ title: error.message, color: "red" });
  }
};
const onSubmit = useThrottleFn(onSubmitHandler, 3000);

const protectedSubmitHandler = computed(() => (isAdmin ? onSubmit : () => {}));
</script>

<template>
  <DashboardBreadcrumbs
    :links="links"
    :title="locale[settingsDataStore.locale].addNewProduct"
  />
  <main
    class="p-[24px] bg-white rounded-[16px] dark:bg-dark-gray dark:border border-[#70706e]"
  >
    <UForm
      :validate="validate"
      @submit="protectedSubmitHandler"
      class="flex flex-col lg:gap-[35px] gap-[20px]"
      :state="state!"
    >
      <UTabs :items="items" class="w-full">
        <template #data>
          <DashboardProductDataTab v-model:state="state" />
        </template>
        <template #options>
          <DashboardProductOptionTab />
        </template>
      </UTabs>
      <div>
        <UButton type="submit" class="dark-button my-[10px]">
          {{ locale[storeLocale].save }}
        </UButton>
      </div>
    </UForm>
  </main>
</template>
