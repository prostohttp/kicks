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

// vars
const isDate = computed(() => option.value.type === optionKeys.date);
const isTime = computed(() => option.value.type === optionKeys.time);
const isDateTime = computed(() => option.value.type === optionKeys.datetime);
</script>

<template>
  <UFormGroup
    :label="locale[settingsDataStore.locale].value"
    :name="`value-${option?.id}`"
    :ui="{
      label: {
        base: 'font-[Rubik] font-[600] text-[20px] mb-[16px]',
      },
    }"
  >
    <UInput
      type="date"
      v-model="option!.value"
      inputClass="input-label-without-icon"
      v-if="isDate"
    />
    <UInput
      type="time"
      v-model="option!.value"
      inputClass="input-label-without-icon"
      v-if="isTime"
    />
    <UInput
      type="datetime-local"
      v-model="option!.value"
      inputClass="input-label-without-icon"
      v-if="isDateTime"
    />
  </UFormGroup>
</template>
