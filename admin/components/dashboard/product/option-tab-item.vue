<script lang="ts" setup>
import { locale } from "~/lang/locale";
import type { ProductOptionDto } from "~/pages/dashboard/products/product.dto";
import { optionKeys } from "~/types/ui/ui.types";

// define
const { id } = defineProps<{
  id: number;
}>();
const options = defineModel("options", {
  required: true,
  default: [] as ProductOptionDto[] | undefined,
});

// store
const settingsDataStore = useSettingsDataStore();

// vars
const option = computed(() => options.value.find((el) => el.id === id));
const isTable = computed(
  () =>
    option.value?.type === optionKeys.list ||
    option.value?.type === optionKeys.select ||
    option.value?.type === optionKeys.checkbox,
);
const isText = computed(
  () =>
    option.value?.type === optionKeys.text ||
    option.value?.type === optionKeys.textarea,
);
const isDateTime = computed(
  () =>
    option.value?.type === optionKeys.date ||
    option.value?.type === optionKeys.time ||
    option.value?.type === optionKeys.datetime,
);
</script>

<template>
  <div class="flex flex-col gap-[30px]">
    <UFormGroup
      :label="locale[settingsDataStore.locale].sort"
      :name="`sort-${option?.id}`"
      :ui="{
        label: {
          base: 'font-[Rubik] font-[600] text-[20px] mb-[16px]',
        },
      }"
    >
      <UInput
        v-model="option!.sort"
        inputClass="input-label-without-icon"
        type="number"
      />
    </UFormGroup>
    <div>
      <DashboardProductOptionItemText v-model:option="option" v-if="isText" />
      <DashboardProductOptionItemDatetime
        v-model:option="option"
        v-if="isDateTime"
      />
      <DashboardProductOptionItemTable v-model:option="option" v-if="isTable" />
    </div>
    <UFormGroup
      :name="`required-${option?.id}`"
      :ui="{
        label: {
          base: 'font-[Rubik] font-[600] text-[20px] mb-[16px]',
        },
      }"
    >
      <div class="flex gap-[10px] items-center mb-[10px]">
        <UToggle
          size="md"
          v-model="option!.required"
          :ui="{
            active: 'bg-blue dark:bg-yellow',
          }"
        />
        <span>{{ locale[settingsDataStore.locale].requiredOrnNot }}</span>
      </div>
    </UFormGroup>
    <pre>{{ option }}</pre>
  </div>
</template>
