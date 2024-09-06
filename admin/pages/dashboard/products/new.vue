<script lang="ts" setup>
import type { FormErrorEvent } from "#ui/types";
import { locale } from "~/lang/locale";
import type { BreadcrumbItem } from "~/types/ui/ui.types";
import { validate } from "./validator";
import type { ProductDto, ProductOptionDto } from "./product.dto";

// store
const settingsDataStore = useSettingsDataStore();
const productDataStore = useProductDataStore();
const categoryStore = useCategoryDataStore();
const brandDataStore = useBrandDataStore();
const { brand } = storeToRefs(brandDataStore);
const { titles: data } = storeToRefs(categoryStore);
await useAsyncData(() => settingsDataStore.getSettings());
const { locale: storeLocale } = storeToRefs(settingsDataStore);

// vars
const toast = useToast();
const isAdmin = useIsAdmin();
const router = useRouter();
const route = useRoute();
const fullPath = router.currentRoute.value.fullPath;
const links: Ref<BreadcrumbItem[]> = ref(breadcrumbsArrayFactory(fullPath));
const items = [
  {
    slot: "data",
    label: locale[storeLocale.value].productData,
    tab: "data",
  },
  {
    slot: "options",
    label: locale[storeLocale.value].productOptions,
    tab: "options",
  },
];
const state: Ref<ProductDto> = ref({
  isEnabled: {
    label: locale[storeLocale.value].isEnabled,
    value: true,
  },
  quantity: 1,
  category: [] as string[],
  tags: [] as string[],
  additionImages: [] as string[],
  options: [] as ProductOptionDto[],
} as ProductDto);
const isLoading = ref(false);
const isValidForm = ref(true);

const selected = computed({
  get() {
    const index = items.findIndex((item) => item.tab === route.query.tab);
    if (index === -1) {
      return 0;
    }
    return index;
  },
  set(val) {
    router.replace({
      query: { tab: items[val].tab },
    });
  },
});

// handlers
const clearState = () => {
  state.value = {
    isEnabled: {
      label: locale[storeLocale.value].isEnabled,
      value: true,
    },
    quantity: 1,
    category: [] as string[],
    tags: [] as string[],
    additionImages: [] as string[],
    image: "",
    options: [] as ProductOptionDto[],
  } as ProductDto;
};

const onSubmitHandler = async () => {
  try {
    if (state.value.brand) {
      await brandDataStore.getBrandByTitle(state.value.brand);
    }
    await $fetch("/api/product/add", {
      method: "POST",
      body: {
        ...state.value,
        options: state.value.options.map((option) => ({
          ...option,
          values: option.values?.map((opt) => ({
            ...opt,
            value: opt.value.value,
          })),
        })),
        category: data.value.filter((el) =>
          state.value.category?.includes(el.title),
        ),
        brand: brand.value ? brand.value._id : null,
        createdAt: new Date(),
      },
    });
    isLoading.value = true;
    isValidForm.value = true;
    await productDataStore.getProductCount();
    toast.add({
      title: locale[storeLocale.value].successAddMessage,
      color: "green",
    });
    clearState();
  } catch (error: any) {
    toast.add({ title: error.message, color: "red" });
  }
  setTimeout(() => {
    isLoading.value = false;
  }, 300);
};
const onSubmit = useThrottleFn(onSubmitHandler, 3000);

const protectedSubmitHandler = computed(() => (isAdmin ? onSubmit : () => {}));

async function onError(event: FormErrorEvent) {
  if (
    event.errors.length ||
    (state.value.options && state.value.options.length > 1)
  ) {
    isValidForm.value = false;
  } else {
    isValidForm.value = true;
  }
}

// meta
useHead({
  title: locale[settingsDataStore.locale].addNewProduct,
});
</script>

<template>
  <DashboardBreadcrumbs
    :links="links"
    :title="locale[settingsDataStore.locale].addNewProduct"
  />
  <main
    class="p-[24px] bg-white rounded-[16px] dark:bg-dark-gray dark:border border-[#70706e]"
  >
    <UiSpinner v-if="isLoading" />
    <div class="space-y-4 w-full" v-else>
      <div
        v-if="!isValidForm"
        class="bg-dark-gray dark:bg-yellow text-fa-white dark:text-dark-gray w-full text-center py-[5px] mb-[10px] rounded-[8px]"
      >
        {{ locale[settingsDataStore.locale].error.checkRequiredFields }}
      </div>
      <UForm
        :validate="validate"
        @submit="protectedSubmitHandler"
        class="flex flex-col lg:gap-[35px] gap-[20px]"
        :state="state!"
        @error="onError"
      >
        <UTabs :items="items" class="w-full" v-model="selected">
          <template #data>
            <DashboardProductDataTab v-model:state="state" />
          </template>
          <template #options>
            <DashboardProductOptionTab v-model:options="state.options" />
          </template>
        </UTabs>
        <div>
          <UButton type="submit" class="dark-button my-[10px]">
            {{ locale[storeLocale].save }}
          </UButton>
        </div>
      </UForm>
    </div>
  </main>
</template>
