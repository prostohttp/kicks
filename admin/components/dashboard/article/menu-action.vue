<script lang="ts" setup>
import { DashboardArticleDeleteModal } from "#components";
import { locale } from "~/lang/locale";
import type { IArticle } from "~/pages/dashboard/articles/index.vue";
import { useUploadDeleteDataStore } from "~/stores/upload-delete-data.js";

// define
const activePage = defineModel("activePage");

// vars
const modal = useModal();

// store
const articleDataStore = useArticleDataStore();
const settingsDataStore = useSettingsDataStore();
const uploadDeleteDataStore = useUploadDeleteDataStore();
const { selected } = storeToRefs(articleDataStore);

// handlers
const openDeleteArticleModal = (articles: IArticle[]) => {
    modal.open(DashboardArticleDeleteModal, {
        articles,
        onClose() {
            modal.close();
        },
        async onDelete() {
            for (const item of selected.value) {
                if (item.image) {
                    await uploadDeleteDataStore.deleteHandler(item.image);
                }
            }
            articleDataStore.getAllArticlesForAdminMenu();
            articleDataStore.getAllArticles(1);
            activePage.value = 1;
            selected.value = [];
            modal.close();
        },
    });
};
</script>

<template>
    <UPopover
        class="absolute top-[5px] right-0"
        v-if="selected?.length"
        :popper="{ placement: 'bottom-end', offsetDistance: 10 }"
        :ui="{
            rounded: 'rounded-[8px]',
            ring: 'ring-[#e7e7e3] ring-1',
            shadow: 'shadow-none',
            width: 'md:w-auto w-[calc(100%-20px)]',
            position: 'right-[10px] sm:right-auto',
        }"
    >
        <UIcon
            name="i-heroicons-ellipsis-vertical-20-solid"
            class="cursor-pointer"
        />
        <template #panel>
            <ul class="p-4 flex flex-col gap-[10px]">
                <NuxtLink
                    @click="openDeleteArticleModal(selected)"
                    class="cursor-pointer text-[16px] font-[400]"
                >
                    {{ locale[settingsDataStore.locale].deleteArticle }}
                </NuxtLink>
            </ul>
        </template>
    </UPopover>
</template>
