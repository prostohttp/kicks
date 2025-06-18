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
const isDate = computed(
    () => optionModel.value.optionValue.type === optionKeys.date,
);
const isTime = computed(
    () => optionModel.value.optionValue.type === optionKeys.time,
);
const isDateTime = computed(
    () => optionModel.value.optionValue.type === optionKeys.datetime,
);
</script>
<template>
    <UFormGroup
        :label="locale[settingsDataStore.locale].value"
        :name="`value-${optionModel?.optionValue._id}`"
        :ui="{
            label: {
                base: 'font-[Rubik] font-[600] text-[20px] mb-[16px]',
            },
        }"
    >
        <UInput
            v-if="isDate"
            v-model="optionModel.value"
            inputClass="input-label-without-icon"
            type="date"
        />
        <UInput
            v-if="isTime"
            v-model="optionModel.value"
            inputClass="input-label-without-icon"
            type="time"
        />
        <UInput
            v-if="isDateTime"
            v-model="optionModel.value"
            inputClass="input-label-without-icon"
            type="datetime-local"
        />
    </UFormGroup>
</template>
