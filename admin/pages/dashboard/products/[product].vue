<script lang="ts" setup>
import type { FormErrorEvent } from "#ui/types";
import { locale } from "~/lang/locale";
import { validate } from "./validator";
import type { BreadcrumbItem } from "~/types/ui/ui.types";
import type { ProductDto } from "./product.dto";
import type { OptionDto } from "~/server/api/option/dto/option.dto";

// store
const productDataStore = useProductDataStore();
const brandDataStore = useBrandDataStore();
const categoryDataStore = useCategoryDataStore();
const settingsDataStore = useSettingsDataStore();
const optionDataStore = useOptionDataStore();

await useAsyncData(() =>
  productDataStore.getProductById(
    useRoute("dashboard-products-product").params.product,
  ),
);
const { product } = storeToRefs(productDataStore);
await useAsyncData(() => brandDataStore.getBrandById(product.value?.brand));
await useAsyncData(() => categoryDataStore.getAllTitles());
await useAsyncData(() => optionDataStore.getAllOptionsWithoutPagination());

const { brand } = storeToRefs(brandDataStore);
const { optionsWithoutPagination } = storeToRefs(optionDataStore);
const { titles: categoryTitles } = storeToRefs(categoryDataStore);
const { locale: storeLocale } = storeToRefs(settingsDataStore);

// vars
const toast = useToast();
const router = useRouter();
const isAdmin = useIsAdmin();
const route = useRoute();
const fullPath = router.currentRoute.value.fullPath;
const isValidForm = ref(true);
const links: Ref<BreadcrumbItem[]> = ref(
  breadcrumbsArrayFactory(fullPath, product.value?.title, fullPath),
);
const title = computed(() =>
  product.value ? product.value?.title : locale[settingsDataStore.locale].empty,
);
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
const getSelectedCategoryTitlesByIds = categoryTitles.value
  .filter((el) => product.value?.category?.includes(el._id))
  .map((el) => el.title);

const addNeededFieldsToOptions = (options: OptionDto[]) => {
  return options.map((option) => {
    const savedOption = optionsWithoutPagination.value?.find(
      (opt) => opt._id === option.optionId,
    );
    return {
      ...option,
      title: savedOption?.title!,
      type: savedOption?.type!,
      values: option.values?.map((outerOption) => {
        return {
          ...outerOption,
          value: {
            value: outerOption.value,
            label: savedOption?.values?.find(
              (innerOption) => innerOption._id === outerOption.value,
            )?.value!,
          },
        };
      }),
    };
  });
};

const state: Ref<ProductDto> = ref({
  ...product.value!,
  category: getSelectedCategoryTitlesByIds,
  brand: brand.value?.title,
  options: addNeededFieldsToOptions(product.value!.options as OptionDto[]),
});

// handlers
// TODO: !!!Переделать схему продукта, опции, отдельная сущность на значение опции, передача в продукт id опции, передача в опцию id значения опции!!!
const onSubmitHandler = async () => {
  try {
    if (state.value?.brand) {
      await brandDataStore.getBrandByTitle(state.value.brand);
    } else {
      brand.value = undefined;
    }
    await $fetch("/api/product/edit", {
      method: "PUT",
      body: {
        ...state.value,
        options: state.value?.options.map((option) => ({
          ...option,
          values: option.values?.map((opt) => ({
            ...opt,
            value: opt.value.value,
            valueId: opt.value.value,
          })),
        })),
        category: categoryTitles.value
          .filter((el) => state.value.category?.includes(el.title))
          .map((el) => el._id),
        brand: brand.value?._id || null,
      },
    });
    isValidForm.value = true;
    await productDataStore.getProductCount();
    await productDataStore.getProductById(state.value._id!);
    toast.add({
      title: locale[storeLocale.value].successEdit,
      color: "green",
    });
  } catch (error: any) {
    toast.add({ title: error.message, color: "red" });
  }
};

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

const onSubmit = useThrottleFn(onSubmitHandler, 3000);

const protectedSubmitHandler = computed(() => (isAdmin ? onSubmit : () => {}));

async function onError(event: FormErrorEvent) {
  if (
    event.errors.length ||
    (product.value?.options && product.value.options.length > 1)
  ) {
    isValidForm.value = false;
  } else {
    isValidForm.value = true;
  }
}

// hooks
watch(product, () => {
  links.value = breadcrumbsArrayFactory(
    fullPath,
    product.value?.title,
    fullPath,
  );
});

// meta
useHeadSafe({
  title: title,
});
</script>

<template>
  <DashboardBreadcrumbs
    :links="links"
    :title="product ? product.title : locale[settingsDataStore.locale].empty"
  />
  <main
    class="p-[24px] bg-white rounded-[16px] dark:bg-dark-gray dark:border border-[#70706e]"
  >
    <div class="flex lg:flex-row flex-col lg:gap-[35px] gap-[20px]">
      <LazyUiEmpty v-if="!product" />
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
          :state="state"
          @error="onError"
        >
          <UTabs :items="items" class="w-full" v-model="selected">
            <template #data>
              <DashboardProductDataTab v-model:state="state" :isSaved="true" />
            </template>
            <template #options>
              <DashboardProductOptionTab v-model:options="state.options" />
            </template>
          </UTabs>
          <div>
            <UButton type="submit" class="dark-button my-[10px]" v-if="isAdmin">
              {{ locale[storeLocale].save }}
            </UButton>
          </div>
        </UForm>
      </div>
    </div>
    <!-- <pre>{{ product }}</pre> -->
    <!-- <pre>{{ product }}</pre> -->
  </main>
</template>
