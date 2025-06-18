<script lang="ts" setup>
import { locale } from "~/lang/locale";
import type { ProductOptionDto } from "~/server/api/product/dto/product.dto";
import { optionKeys } from "~/types/ui/ui.types";

// define
const id = defineModel("id", {
    required: true,
    type: String,
});

const options = defineModel("options", {
    required: true,
    default: [] as ProductOptionDto[] | undefined,
});

// store
const settingsDataStore = useSettingsDataStore();

// vars
const computedOption = computed(() =>
    options.value.find((el) => el.optionValue._id === id.value),
);

const isTable = computed(
    () =>
        computedOption.value?.optionValue.type === optionKeys.list ||
        computedOption.value?.optionValue.type === optionKeys.select ||
        computedOption.value?.optionValue.type === optionKeys.checkbox,
);
const isText = computed(
    () =>
        computedOption.value?.optionValue.type === optionKeys.text ||
        computedOption.value?.optionValue.type === optionKeys.textarea,
);
const isDateTime = computed(
    () =>
        computedOption.value?.optionValue.type === optionKeys.date ||
        computedOption.value?.optionValue.type === optionKeys.time ||
        computedOption.value?.optionValue.type === optionKeys.datetime,
);
</script>

<template>
    <div class="flex flex-col gap-[30px]">
        <UFormGroup
            :label="locale[settingsDataStore.locale].sort"
            :name="`sort-${computedOption?.optionValue._id}`"
            :ui="{
                label: {
                    base: 'font-[Rubik] font-[600] text-[20px] mb-[16px]',
                },
            }"
        >
            <UInput
                v-model="computedOption!.sort"
                inputClass="input-label-without-icon"
                type="number"
            />
        </UFormGroup>
        <div>
            <DashboardProductOptionItemText
                v-if="isText"
                v-model:option="computedOption"
            />
            <DashboardProductOptionItemDatetime
                v-if="isDateTime"
                v-model:option="computedOption"
            />
            <DashboardProductOptionItemTable
                v-if="isTable"
                v-model:option="computedOption"
                v-model:optionId="id"
            />
        </div>
        <UFormGroup
            :name="`required-${computedOption?.optionValue._id}`"
            :ui="{
                label: {
                    base: 'font-[Rubik] font-[600] text-[20px] mb-[16px]',
                },
            }"
        >
            <div class="flex gap-[10px] items-center mb-[10px]">
                <UToggle
                    v-model="computedOption!.required"
                    :ui="{
                        active: 'bg-blue dark:bg-yellow',
                    }"
                    size="md"
                />
                <span>{{
                    locale[settingsDataStore.locale].requiredOrnNot
                }}</span>
            </div>
        </UFormGroup>
    </div>
</template>
