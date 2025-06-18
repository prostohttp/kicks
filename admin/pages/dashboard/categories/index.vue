<script lang="ts" setup>
import { DashboardCategoryAddNewModal } from "#components";
import { locale } from "~/lang/locale";
import { Constants } from "~/constants";
import { useCategoryDataStore } from "~/stores/category-data";
import type { BreadcrumbItem } from "~/types/ui/ui.types";
import { addQuery } from "~/utils/add-query";

export interface ITable {
    id: string;
    title: string;
    children: string;
    parent: string;
    enabled: string;
}

// store
const categoryDataStore = useCategoryDataStore();
const settingsDataStore = useSettingsDataStore();
const { categories: data, selected } = storeToRefs(categoryDataStore);

// vars
const isAdmin = checkIsAdmin();
const modal = useModal();
const router = useRouter();
const route = useRoute();
const page = Number(useRoute().query.page);
const columns = [
    {
        key: "title",
        label: locale[settingsDataStore.locale].title,
    },
    {
        key: "children",
        label: locale[settingsDataStore.locale].childCategories,
    },
    {
        key: "parent",
        label: locale[settingsDataStore.locale].isParent,
    },
    {
        key: "enabled",
        label: locale[settingsDataStore.locale].isEnabled,
    },
];

await useAsyncData(() => categoryDataStore.getAllCategories(page));

const activePage = ref(data.value?.activePage || 1);
const path = router.currentRoute.value.path;
const links: Ref<BreadcrumbItem[]> = ref(breadcrumbsArrayFactory(path));

// meta
definePageMeta({
    name: "all-categories",
});
useHead({
    title: locale[settingsDataStore.locale].allCategories,
});

// handlers
const openAddNewCategoryModal = () => {
    modal.open(DashboardCategoryAddNewModal, {
        onClose() {
            removeQuery("categoryNew");
            modal.close();
        },
    });
};

const categories = computed((): Array<ITable> | undefined => {
    return data.value?.categories.map((category) => {
        return {
            id: category._id,
            title: category.title,
            children: category.children.map((cat) => cat.title).join(", "),
            parent: category.isParent
                ? locale[settingsDataStore.locale].yesText
                : locale[settingsDataStore.locale].noText,
            enabled: category.isEnabled
                ? locale[settingsDataStore.locale].yesText
                : locale[settingsDataStore.locale].noText,
        };
    });
});

// hooks
watch(activePage, (newValue) => {
    router.push({ query: { ...route.query, page: newValue || 1 } });
    selected.value = [];
    categoryDataStore.getAllCategories(newValue!);
});

watch(
    () => route.query,
    (newValue) => {
        if (!newValue.page) {
            activePage.value = 1;
        }
    },
);

onMounted(async () => {
    if (route.query.categoryNew) {
        openAddNewCategoryModal();
    }
});
</script>

<template>
    <div
        class="flex justify-between items-center sm:flex-row flex-col gap-0 md:gap-[15px]"
    >
        <DashboardBreadcrumbs
            :links="links"
            :title="locale[settingsDataStore.locale].breadcrumbs.categories"
        />
        <UButton
            :label="locale[settingsDataStore.locale].addNewCategory"
            :to="addQuery('categoryNew', 'yes')"
            class="h-[48px] px-[26px] py-[10px] flex justify-center items-center uppercase font-[600] shadow-none bg-dark-gray rounded-[8px] hover:bg-dark-gray dark:bg-yellow dark:hover:bg-yellow mb-[24px] hover:text-fa-white dark:hover:text-dark-gray"
            icon="i-heroicons-plus-circle"
            @click="openAddNewCategoryModal()"
        />
    </div>
    <main
        class="p-[24px] bg-white flex flex-col rounded-[16px] dark:bg-dark-gray dark:border border-[#70706e]"
    >
        <UTable
            v-model="selected"
            :columns="columns"
            :empty-state="{
                icon: 'i-heroicons-circle-stack-20-solid',
                label: locale[settingsDataStore.locale].empty,
            }"
            :loading="!categories"
            :loading-state="{
                icon: 'i-heroicons-arrow-path-20-solid',
                label: locale[settingsDataStore.locale].loadingText,
            }"
            :progress="{ color: 'primary', animation: 'carousel' }"
            :rows="categories"
            :ui="{
                td: {
                    base: 'md:whitespace-pre-wrap md:break-all whitespace-normal break-normal',
                    color: 'text-dark-gray dark:text-fa-white',
                },
                default: {
                    checkbox: {
                        class: 'checkbox',
                    },
                },
            }"
            class="text-dark-gray"
        >
            <template #caption>
                <caption
                    class="pb-[15px] w-full justify-between items-center text-left text-[20px] dark:text-fa-white font-[Rubik] font-[500] relative"
                >
                    <span>
                        {{
                            locale[settingsDataStore.locale].breadcrumbs
                                .categories
                        }}
                    </span>
                    <DashboardCategoryMenuAction
                        v-if="isAdmin"
                        v-model:activePage="activePage"
                    />
                </caption>
            </template>
        </UTable>
    </main>
    <LazyUiPagination
        v-if="data?.pagesInPagination"
        v-model="activePage"
        :all-items="data?.allItems"
        :element-in-page="Constants.PER_PAGE_CATEGORY"
    />
</template>

<style scoped>
.active {
    @apply dark:text-fa-white dark:hover:text-yellow text-dark-gray hover:text-blue;
}
</style>
