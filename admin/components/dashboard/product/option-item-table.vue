<script lang="ts" setup>
import { locale } from "~/lang/locale";
import type { ProductOptionDto } from "~/server/api/product/dto/product.dto";

// define
const optionModel = defineModel("option", {
    required: true,
    default: {} as ProductOptionDto | undefined,
});

// store
const settingsDataStore = useSettingsDataStore();
const optionDataStore = useOptionDataStore();
const { locale: settingsLocale } = storeToRefs(settingsDataStore);
await useAsyncData(() =>
    optionDataStore.getOption(optionModel.value!.optionValue._id!),
);
const { option } = storeToRefs(optionDataStore);

// vars
const optionValues = option.value!.values!.map((item) => ({
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
        :rows="optionModel.values"
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
            <UFormGroup :name="`count-${row._id}`">
                <UInput
                    inputClass="clean-field"
                    v-model="row.count"
                    type="number"
                    :placeholder="locale[settingsDataStore.locale].count"
                />
            </UFormGroup>
        </template>
        <template #price-data="{ row }">
            <UFormGroup :name="`price-${row._id}`">
                <UInput
                    inputClass="clean-field"
                    v-model="row.price"
                    type="number"
                    :placeholder="
                        locale[settingsDataStore.locale].productReqularPrice
                    "
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
