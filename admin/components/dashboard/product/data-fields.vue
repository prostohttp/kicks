<script lang="ts" setup>
import type { ModelRef } from "vue";
import { locale } from "~/lang/locale";
import type { ProductDto } from "~/pages/dashboard/products/product.dto";

// define
const state: ModelRef<ProductDto> = defineModel("state", {
  required: true,
  default: {} as ProductDto,
});

// store
const settingsDataStore = useSettingsDataStore();
const brandDataStore = useBrandDataStore();
const categoryStore = useCategoryDataStore();
await brandDataStore.getAllTitles();
const { locale: storeLocale } = storeToRefs(settingsDataStore);
const { titles: brandTitles } = storeToRefs(brandDataStore);
const { titles: categoryTitles } = storeToRefs(categoryStore);

// vars
const titlesCategories = ref(categoryTitles.value.map((el) => el.title));
const titlesBrands = ref(["", ...brandTitles.value.map((el) => el.title)]);
const localeOptions = [
  {
    label: locale[storeLocale.value].isEnabled,
    value: true,
  },
  {
    label: locale[storeLocale.value].isDisabled,
    value: false,
  },
];
</script>

<template>
  <div class="lg:w-[65%] w-full flex flex-col gap-[20px]">
    <UFormGroup
      :label="locale[settingsDataStore.locale].title"
      name="title"
      :ui="{
        label: {
          base: 'font-[Rubik] font-[600] text-[20px] mb-[16px]',
        },
      }"
    >
      <UInput v-model="state.title" inputClass="input-label-without-icon" />
    </UFormGroup>
    <UFormGroup
      :label="locale[settingsDataStore.locale].shortDescription"
      name="shortDescription"
      :ui="{
        label: {
          base: 'font-[Rubik] font-[600] text-[20px] mb-[16px]',
        },
      }"
    >
      <UTextarea v-model="state.shortDescription" class="textarea" />
    </UFormGroup>
    <UFormGroup
      :label="locale[settingsDataStore.locale].description"
      name="description"
      :ui="{
        label: {
          base: 'font-[Rubik] font-[600] text-[20px] mb-[16px]',
        },
      }"
    >
      <TiptapEditor placeholder="" v-model="state.description" />
    </UFormGroup>
    <UFormGroup
      :label="locale[settingsDataStore.locale].showInCategories"
      name="category"
      :ui="{
        label: {
          base: 'font-[Rubik] font-[600] text-[20px] mb-[16px]',
        },
      }"
    >
      <USelectMenu
        multiple
        v-model="state.category"
        :options="titlesCategories"
        placeholder=""
        :uiMenu="{
          option: {
            base: 'h-[35px]',
            color: 'dark:text-[#6b7280]',
          },
        }"
        :ui="{
          wrapper: 'select-wrapper ring-1 ring-dark-gray rounded-[8px]',
        }"
      >
        <template #label>
          <span v-if="state.category?.length" class="truncate">{{
            state.category?.join(", ")
          }}</span>
        </template>
      </USelectMenu>
    </UFormGroup>
    <UFormGroup
      :label="locale[settingsDataStore.locale].brand"
      name="brand"
      :ui="{
        label: {
          base: 'font-[Rubik] font-[600] text-[20px] mb-[16px]',
        },
      }"
    >
      <USelectMenu
        v-model="state.brand"
        :options="titlesBrands"
        placeholder=""
        :uiMenu="{
          option: {
            base: 'h-[35px]',
            color: 'dark:text-[#6b7280]',
          },
        }"
        :ui="{
          wrapper: 'select-wrapper ring-1 ring-dark-gray rounded-[8px]',
        }"
      />
    </UFormGroup>
    <UFormGroup
      :label="locale[settingsDataStore.locale].productSku"
      name="sku"
      :ui="{
        label: {
          base: 'font-[Rubik] font-[600] text-[20px] mb-[16px]',
        },
      }"
    >
      <UInput v-model="state.sku" inputClass="input-label-without-icon" />
    </UFormGroup>
    <UFormGroup
      :label="locale[settingsDataStore.locale].productQuantity"
      name="quantity"
      :ui="{
        label: {
          base: 'font-[Rubik] font-[600] text-[20px] mb-[16px]',
        },
      }"
    >
      <UInput
        type="number"
        min="0"
        v-model="state.quantity"
        inputClass="input-label-without-icon"
      />
    </UFormGroup>
    <UFormGroup
      :label="locale[settingsDataStore.locale].productReqularPrice"
      name="regularPrice"
      :ui="{
        label: {
          base: 'font-[Rubik] font-[600] text-[20px] mb-[16px]',
        },
      }"
    >
      <UInput
        type="number"
        v-model="state.regularPrice"
        inputClass="input-label-without-icon"
      />
    </UFormGroup>
    <UFormGroup
      :label="locale[settingsDataStore.locale].productSalePrice"
      name="salePrice"
      :ui="{
        label: {
          base: 'font-[Rubik] font-[600] text-[20px] mb-[16px]',
        },
      }"
    >
      <UInput
        type="number"
        v-model="state.salePrice"
        inputClass="input-label-without-icon"
      />
    </UFormGroup>
    <UFormGroup
      :label="locale[settingsDataStore.locale].productTags"
      name="tags"
      :ui="{
        label: {
          base: 'font-[Rubik] font-[600] text-[20px] mb-[16px]',
        },
      }"
    >
      <DashboardProductTags v-model:tags="state.tags!" />
    </UFormGroup>
    <UFormGroup
      :label="locale[settingsDataStore.locale].productVisibility"
      name="isEnabled"
      :ui="{
        label: {
          base: 'font-[Rubik] font-[600] text-[20px] mb-[16px]',
        },
      }"
    >
      <USelectMenu
        v-model="state.isEnabled"
        :options="localeOptions"
        selectClass="select-label-without-icon"
      />
    </UFormGroup>
  </div>
</template>
