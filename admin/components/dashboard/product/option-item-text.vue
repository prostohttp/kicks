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
const isText = computed(() => option.value.type === optionKeys.text);
const isTextarea = computed(() => option.value.type === optionKeys.textarea);
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
      v-model="option!.value"
      inputClass="input-label-without-icon"
      v-if="isText"
    />
    <UTextarea v-model="option!.value" class="textarea" v-if="isTextarea" />
  </UFormGroup>
</template>
