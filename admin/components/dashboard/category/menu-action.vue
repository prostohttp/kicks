<script lang="ts" setup>
import {
    DashboardCategoryDeleteModal,
    DashboardCategoryEditModal,
} from "#components";
import { locale } from "~/lang/locale";
import type { ITable } from "~/pages/dashboard/categories/index.vue";
import { addQuery } from "~/utils/add-query";

// define
const activePage = defineModel("activePage");

// vars
const modal = useModal();
const route = useRoute();

// store
const categoryDataStore = useCategoryDataStore();
const settingsDataStore = useSettingsDataStore();
const { selected } = storeToRefs(categoryDataStore);

// handlers
const openEditCategoryModal = (categoryId: string) => {
    modal.open(DashboardCategoryEditModal, {
        categoryId,
        onClose() {
            removeQuery("categoryEdit");
            modal.close();
        },
    });
};

const openDeleteCategoryModal = (categories: ITable[]) => {
    modal.open(DashboardCategoryDeleteModal, {
        categories,
        onClose() {
            modal.close();
        },
        async onDelete() {
            selected.value = [];
            categoryDataStore.getAllCategories(1);
            categoryDataStore.getAllTitles();
            activePage.value = 1;
            modal.close();
        },
    });
};

// hooks
onMounted(async () => {
    if (route.query.categoryEdit) {
        openEditCategoryModal(route.query.categoryEdit.toString());
    }
});
</script>

<template>
    <UPopover
        v-if="selected?.length"
        :popper="{ placement: 'bottom-end', offsetDistance: 10 }"
        :ui="{
            rounded: 'rounded-[8px]',
            ring: 'ring-[#e7e7e3] ring-1',
            shadow: 'shadow-none',
            width: 'md:w-auto w-[calc(100%-20px)]',
            position: 'right-[10px] sm:right-auto',
        }"
        class="absolute top-[5px] right-0"
    >
        <UIcon
            class="cursor-pointer"
            name="i-heroicons-ellipsis-vertical-20-solid"
        />
        <template #panel>
            <ul class="p-4 flex flex-col gap-[10px]">
                <NuxtLink
                    v-if="selected.length === 1"
                    :to="addQuery('categoryEdit', selected[0].id)"
                    active-class="active"
                    class="cursor-pointer text-[16px] font-[400]"
                    @click="openEditCategoryModal(selected[0].id)"
                >
                    {{ locale[settingsDataStore.locale].editCategory }}
                </NuxtLink>
                <NuxtLink
                    v-else
                    active-class="active"
                    class="text-[16px] font-[400] opacity-20 hover:text-dark-gray dark:hover:text-fa-white"
                >
                    {{ locale[settingsDataStore.locale].editCategory }}
                </NuxtLink>

                <NuxtLink
                    class="cursor-pointer text-[16px] font-[400]"
                    @click="openDeleteCategoryModal(selected)"
                >
                    {{ locale[settingsDataStore.locale].deleteCategory }}
                </NuxtLink>
            </ul>
        </template>
    </UPopover>
</template>
