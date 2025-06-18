<script lang="ts" setup>
import type { ModelRef } from "vue";
import { locale } from "~/lang/locale";
import type { FlatProductDto } from "~/server/api/product/dto/product.dto";

// define
const state: ModelRef<FlatProductDto> = defineModel("state", {
    required: true,
    default: {} as FlatProductDto,
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
            :ui="{
                label: {
                    base: 'font-[Rubik] font-[600] text-[20px] mb-[16px]',
                },
            }"
            name="title"
        >
            <UInput
                v-model="state.title"
                inputClass="input-label-without-icon"
            />
        </UFormGroup>
        <UFormGroup
            :label="locale[settingsDataStore.locale].shortDescription"
            :ui="{
                label: {
                    base: 'font-[Rubik] font-[600] text-[20px] mb-[16px]',
                },
            }"
            name="shortDescription"
        >
            <UTextarea v-model="state.shortDescription" class="textarea" />
        </UFormGroup>
        <UFormGroup
            :label="locale[settingsDataStore.locale].description"
            :ui="{
                label: {
                    base: 'font-[Rubik] font-[600] text-[20px] mb-[16px]',
                },
            }"
            name="description"
        >
            <TiptapEditor v-model="state.description" placeholder="" />
        </UFormGroup>
        <UFormGroup
            :label="locale[settingsDataStore.locale].showInCategories"
            :ui="{
                label: {
                    base: 'font-[Rubik] font-[600] text-[20px] mb-[16px]',
                },
            }"
            name="category"
        >
            <USelectMenu
                v-model="state.category"
                :options="titlesCategories"
                :ui="{
                    wrapper:
                        'select-wrapper ring-1 ring-dark-gray rounded-[8px]',
                }"
                :uiMenu="{
                    option: {
                        base: 'h-[35px]',
                        color: 'dark:text-[#6b7280]',
                    },
                }"
                multiple
                placeholder=""
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
            :ui="{
                label: {
                    base: 'font-[Rubik] font-[600] text-[20px] mb-[16px]',
                },
            }"
            name="brand"
        >
            <USelectMenu
                v-model="state.brand"
                :options="titlesBrands"
                :ui="{
                    wrapper:
                        'select-wrapper ring-1 ring-dark-gray rounded-[8px]',
                }"
                :uiMenu="{
                    option: {
                        base: 'h-[35px]',
                        color: 'dark:text-[#6b7280]',
                    },
                }"
                placeholder=""
            />
        </UFormGroup>
        <UFormGroup
            :label="locale[settingsDataStore.locale].productSku"
            :ui="{
                label: {
                    base: 'font-[Rubik] font-[600] text-[20px] mb-[16px]',
                },
            }"
            name="sku"
        >
            <UInput v-model="state.sku" inputClass="input-label-without-icon" />
        </UFormGroup>
        <UFormGroup
            :label="locale[settingsDataStore.locale].productQuantity"
            :ui="{
                label: {
                    base: 'font-[Rubik] font-[600] text-[20px] mb-[16px]',
                },
            }"
            name="quantity"
        >
            <UInput
                v-model="state.quantity"
                inputClass="input-label-without-icon"
                min="0"
                type="number"
            />
        </UFormGroup>
        <UFormGroup
            :label="locale[settingsDataStore.locale].productReqularPrice"
            :ui="{
                label: {
                    base: 'font-[Rubik] font-[600] text-[20px] mb-[16px]',
                },
            }"
            name="regularPrice"
        >
            <UInput
                v-model="state.regularPrice"
                inputClass="input-label-without-icon"
                type="number"
            />
        </UFormGroup>
        <UFormGroup
            :label="locale[settingsDataStore.locale].productSalePrice"
            :ui="{
                label: {
                    base: 'font-[Rubik] font-[600] text-[20px] mb-[16px]',
                },
            }"
            name="salePrice"
        >
            <UInput
                v-model="state.salePrice"
                inputClass="input-label-without-icon"
                type="number"
            />
        </UFormGroup>
        <UFormGroup
            :label="locale[settingsDataStore.locale].productTags"
            :ui="{
                label: {
                    base: 'font-[Rubik] font-[600] text-[20px] mb-[16px]',
                },
            }"
            name="tags"
        >
            <DashboardProductTags v-model:tags="state.tags!" />
        </UFormGroup>
        <UFormGroup
            :label="locale[settingsDataStore.locale].productVisibility"
            :ui="{
                label: {
                    base: 'font-[Rubik] font-[600] text-[20px] mb-[16px]',
                },
            }"
            name="isEnabled"
        >
            <USelectMenu
                v-model="state.isEnabled"
                :options="localeOptions"
                selectClass="select-label-without-icon"
            />
        </UFormGroup>
    </div>
</template>
