<script lang="ts" setup>
import { locale } from "~/lang/locale";
import type { ProductOptionDto } from "~/pages/dashboard/products/product.dto";
import { optionKeys } from "~/types/ui/ui.types";

// define
const option = defineModel("option", {
  required: true,
  default: {} as ProductOptionDto | undefined,
});

// store
const settingsDataStore = useSettingsDataStore();
const optionDataStore = useOptionDataStore();
const { locale: settingsLocale } = storeToRefs(settingsDataStore);
await useAsyncData(() => optionDataStore.getOption(option.value.optionId));
const { option: dataOption } = storeToRefs(optionDataStore);

// vars
// const isList = computed(() => option.value.type === optionKeys.list);
// const isSelect = computed(() => option.value.type === optionKeys.select);
// const isCheckbox = computed(() => option.value.type === optionKeys.checkbox);
const optionValues = dataOption.value.values.map((option) => ({
  label: option.value,
  value: option._id,
}));
const columns = [
  {
    key: "value",
    label: locale[settingsLocale.value].value,
  },
  {
    key: "count",
    label: locale[settingsLocale.value].count,
  },
  {
    key: "price",
    label: locale[settingsLocale.value].productReqularPrice,
  },
  {
    key: "action",
  },
];

// handlers
const addNewValue = () => {
  const id = Date.now();
  option.value.values?.push({
    id: id,
    value: {
      value: "",
      label: "",
    },
    price: undefined,
    count: undefined,
  });
};

const deleteValue = (id: number) => {
  deleteValueFromArray(id, option.value.values!);
};
</script>

<template>
  <UTable
    :rows="option.values"
    :columns="columns"
    :empty-state="{
      icon: '',
      label: '',
    }"
    :ui="{
      wrapper: 'overflow-x-visible',
      td: {
        base: 'md:whitespace-pre-wrap md:break-all whitespace-normal break-normal for-absolute',
      },
      emptyState: {
        wrapper: 'hidden',
      },
    }"
  >
    <template #caption>
      <caption
        class="pb-[15px] w-full justify-between items-center text-left text-[20px] dark:text-fa-white font-[Rubik] font-[500] relative mt-[20px]"
      >
        <span>
          {{ locale[settingsDataStore.locale].addValue }}
        </span>
      </caption>
    </template>
    <template #value-data="{ row }">
      <UFormGroup
        :name="`value-${row.id}`"
        :ui="{
          label: {
            base: 'font-[Rubik] font-[600] text-[20px] mb-[16px]',
          },
        }"
      >
        <USelectMenu
          v-model="row.value"
          :options="optionValues"
          :placeholder="locale[settingsDataStore.locale].addOption"
          :uiMenu="{
            option: {
              base: 'h-[35px]',
              color: 'dark:text-[#6b7280]',
            },
          }"
          :ui="{
            wrapper:
              'select-wrapper ring-1 ring-dark-gray rounded-[8px] my-[10px]',
          }"
        />
      </UFormGroup>
    </template>
    <template #count-data="{ row }">
      <UFormGroup :name="`count-${row.id}`">
        <UInput
          inputClass="clean-field"
          v-model="row.count"
          type="number"
          :placeholder="locale[settingsDataStore.locale].count"
        />
      </UFormGroup>
    </template>
    <template #price-data="{ row }">
      <UFormGroup :name="`price-${row.id}`">
        <UInput
          inputClass="clean-field"
          v-model="row.price"
          type="number"
          :placeholder="locale[settingsDataStore.locale].productReqularPrice"
        />
      </UFormGroup>
    </template>
    <template #action-data="{ row }">
      <UButton
        class="icon-button float-right"
        icon="i-heroicons-minus-circle-16-solid"
        @click="deleteValue(row.id)"
      />
    </template>
  </UTable>
  <UButton
    class="icon-button float-right mr-[15px] mt-[15px]"
    icon="i-heroicons-plus-circle-16-solid"
    type="button"
    @click="addNewValue"
  />
</template>
