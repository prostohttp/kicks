<script lang="ts" setup>
import { locale } from "~/lang/locale";
import { Constants } from "~/constants";
import { type BreadcrumbItem } from "~/types/ui/ui.types";
import { useOptionDataStore } from "~/stores/option-data";

export interface IOption {
    id?: string;
    title: string;
    type: string;
    sort: number | undefined;
}

// store
const optionDataStore = useOptionDataStore();
const settingsDataStore = useSettingsDataStore();
const { options: data, selected } = storeToRefs(optionDataStore);

// meta
definePageMeta({
    name: "all-options",
});
useHead({
    title: locale[settingsDataStore.locale].allOptions,
});

// vars
const isAdmin = checkIsAdmin();
const router = useRouter();
const route = useRoute();
const page = Number(useRoute().query.page);
const columns = [
    {
        key: "title",
        label: locale[settingsDataStore.locale].option,
    },
    {
        key: "type",
        label: locale[settingsDataStore.locale].type,
    },
    {
        key: "sort",
        label: locale[settingsDataStore.locale].sort,
    },
    {
        key: "action",
        label: "",
    },
];

await useAsyncData(() => optionDataStore.getAllOptions(page));

const activePage = ref(data.value?.activePage || 1);
const path = router.currentRoute.value.path;
const links: Ref<BreadcrumbItem[]> = ref(breadcrumbsArrayFactory(path));

// handlers
const options = computed((): Array<IOption> | undefined => {
    return data.value?.options.map((option) => {
        return {
            id: option._id,
            title: option.title,
            type: option.type,
            sort: option.sort,
        };
    });
});

// hooks
watch(activePage, (newValue) => {
    router.push({ query: { ...route.query, page: newValue || 1 } });
    selected.value = [];
    optionDataStore.getAllOptions(newValue!);
});

watch(
    () => route.query,
    (newValue) => {
        if (!newValue.page) {
            activePage.value = 1;
        }
    },
);
</script>

<template>
    <div
        class="flex justify-between items-center sm:flex-row flex-col gap-0 md:gap-[15px]"
    >
        <DashboardBreadcrumbs
            :links="links"
            :title="locale[settingsDataStore.locale].breadcrumbs.options"
        />
        <UButton
            v-if="isAdmin"
            :label="locale[settingsDataStore.locale].addNewOption"
            class="h-[48px] px-[26px] py-[10px] flex justify-center items-center uppercase font-[600] shadow-none bg-dark-gray rounded-[8px] hover:bg-dark-gray dark:bg-yellow dark:hover:bg-yellow mb-[24px] hover:text-fa-white dark:hover:text-dark-gray"
            icon="i-heroicons-plus-circle"
            to="/dashboard/options/new"
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
            :loading="!data"
            :loading-state="{
                icon: 'i-heroicons-arrow-path-20-solid',
                label: locale[settingsDataStore.locale].loadingText,
            }"
            :progress="{ color: 'primary', animation: 'carousel' }"
            :rows="options"
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
                            locale[settingsDataStore.locale].breadcrumbs.options
                        }}
                    </span>
                    <DashboardOptionMenuAction
                        v-if="isAdmin"
                        v-model:activePage="activePage"
                    />
                </caption>
            </template>
            <template #title-data="{ row }">
                {{ row.title }}
            </template>
            <template #type-data="{ row }">
                {{ row.type }}
            </template>
            <template #sort-data="{ row }">
                {{ row.sort }}
            </template>
            <template #action-data="{ row }">
                <UButton
                    :to="`/dashboard/options/${row.id}`"
                    class="icon-button float-right"
                    icon="i-heroicons-pencil-square-solid"
                />
            </template>
        </UTable>
    </main>
    <LazyUiPagination
        v-if="data?.pagesInPagination"
        v-model="activePage"
        :all-items="data?.allItems"
        :element-in-page="Constants.PER_PAGE_OPTION"
    />
</template>

<style scoped>
.active {
    @apply dark:text-fa-white dark:hover:text-yellow text-dark-gray hover:text-blue;
}
</style>
