<script lang="ts" setup>
import { locale } from "~/lang/locale";
import type { ProductOptionDto } from "~/server/api/product/dto/product.dto";
import { optionKeys } from "~/types/ui/ui.types";

// define
const optionModel = defineModel("option", {
    required: true,
    default: {} as ProductOptionDto | undefined,
});

// store
const settingsDataStore = useSettingsDataStore();

// vars
const isText = computed(
    () => optionModel.value.optionValue.type === optionKeys.text,
);
const isTextarea = computed(
    () => optionModel.value.optionValue.type === optionKeys.textarea,
);
</script>

<template>
    <UFormGroup
        :label="locale[settingsDataStore.locale].value"
        :name="`value-${optionModel.optionValue._id}`"
        :ui="{
            label: {
                base: 'font-[Rubik] font-[600] text-[20px] mb-[16px]',
            },
        }"
    >
        <UInput
            v-if="isText"
            v-model="optionModel.value"
            inputClass="input-label-without-icon"
        />
        <UTextarea
            v-if="isTextarea"
            v-model="optionModel.value"
            class="textarea"
        />
    </UFormGroup>
</template>
