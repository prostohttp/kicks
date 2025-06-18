<script lang="ts" setup>
import { locale } from "~/lang/locale";
import type { ProductOptionDto } from "~/server/api/product/dto/product.dto";
import type { OptionDtoWithValues } from "~/server/api/option/dto/option.dto";

// define
const optionModel = defineModel("option", {
    required: true,
    default: {} as ProductOptionDto | undefined,
});

const optionId = defineModel("optionId", {
    required: true,
    type: String,
});

// store
const settingsDataStore = useSettingsDataStore();
const { locale: settingsLocale } = storeToRefs(settingsDataStore);
const { data: option } = await useFetch<OptionDtoWithValues>(
    "/api/option/one",
    {
        method: "GET",
        query: { id: optionId },
        watch: [optionId],
    },
);

// vars
const optionValues = option.value?.values?.map((item) => ({
    label: item.value,
    value: item._id,
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
    optionModel.value!.values!.push({
        optionValue: {
            _id: Date.now().toString(),
            value: {
                value: "",
                label: "",
            },
            sort: 0,
        },
        price: undefined,
        count: undefined,
    });
};

const deleteValue = (id: string) => {
    const values = optionModel.value.values;
    const index = values!.findIndex((value) => value.optionValue._id === id);
    if (index !== -1) {
        values!.splice(index, 1);
    }
};
</script>

<template>
    <UTable
        :columns="columns"
        :empty-state="{
            icon: '',
            label: '',
        }"
        :rows="optionModel.values"
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
                :name="`value-${row._id}`"
                :ui="{
                    label: {
                        base: 'font-[Rubik] font-[600] text-[20px] mb-[16px]',
                    },
                }"
            >
                <USelectMenu
                    v-model="row.optionValue.value"
                    :options="optionValues"
                    :placeholder="locale[settingsDataStore.locale].addOption"
                    :ui="{
                        wrapper:
                            'select-wrapper ring-1 ring-dark-gray rounded-[8px] my-[10px]',
                    }"
                    :uiMenu="{
                        option: {
                            base: 'h-[35px]',
                            color: 'dark:text-[#6b7280]',
                        },
                    }"
                />
            </UFormGroup>
        </template>
        <template #count-data="{ row }">
            <UFormGroup :name="`count-${row._id}`">
                <UInput
                    v-model="row.count"
                    :placeholder="locale[settingsDataStore.locale].count"
                    inputClass="clean-field"
                    type="number"
                />
            </UFormGroup>
        </template>
        <template #price-data="{ row }">
            <UFormGroup :name="`price-${row._id}`">
                <UInput
                    v-model="row.price"
                    :placeholder="
                        locale[settingsDataStore.locale].productReqularPrice
                    "
                    inputClass="clean-field"
                    type="number"
                />
            </UFormGroup>
        </template>
        <template #action-data="{ row }">
            <UButton
                class="icon-button float-right"
                icon="i-heroicons-minus-circle-16-solid"
                @click="deleteValue(row.optionValue._id!)"
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
