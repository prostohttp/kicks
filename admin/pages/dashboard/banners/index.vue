<script lang="ts" setup>
import { locale } from "~/lang/locale";
import { Constants } from "~/constants";
import { type BreadcrumbItem } from "~/types/ui/ui.types";
import { useBannerDataStore } from "~/stores/banner-data";

// meta
definePageMeta({
    name: "all-banners",
});
useHead({
    title: locale[useSettingsDataStore().locale].allBanners,
});

// store
const bannerDataStore = useBannerDataStore();
const settingsDataStore = useSettingsDataStore();
const { banners: data } = storeToRefs(bannerDataStore);

// vars
const isAdmin = checkIsAdmin();
const router = useRouter();
const route = useRoute();
const page = Number(useRoute().query.page);
const columns = [
    {
        key: "images",
        label: locale[settingsDataStore.locale].newBanner,
    },
    {
        key: "title",
        label: locale[settingsDataStore.locale].title,
    },
    {
        key: "action",
        label: "",
    },
];

await useAsyncData(() => bannerDataStore.getAllBanners(page));
const path = router.currentRoute.value.path;
const activePage = ref(data.value?.activePage || 1);
const links: Ref<BreadcrumbItem[]> = ref(breadcrumbsArrayFactory(path));

// handlers

// hooks
watch(activePage, (newValue) => {
    router.push({ query: { ...route.query, page: newValue || 1 } });
    bannerDataStore.getAllBanners(newValue);
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
            :title="locale[settingsDataStore.locale].breadcrumbs.banners"
        />
        <UButton
            v-if="isAdmin"
            :label="locale[settingsDataStore.locale].addNewBanner"
            class="h-[48px] px-[26px] py-[10px] flex justify-center items-center uppercase font-[600] shadow-none bg-dark-gray rounded-[8px] hover:bg-dark-gray dark:bg-yellow dark:hover:bg-yellow mb-[24px] hover:text-fa-white dark:hover:text-dark-gray"
            icon="i-heroicons-plus-circle"
            to="/dashboard/banners/new"
        />
    </div>
    <main
        class="p-[24px] bg-white flex flex-col rounded-[16px] dark:bg-dark-gray dark:border border-[#70706e]"
    >
        <UTable
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
            :rows="data?.banners"
            :ui="{
                td: {
                    base: 'md:whitespace-pre-wrap md:break-all whitespace-normal break-normal',
                    color: 'text-dark-gray dark:text-fa-white',
                },
                tr: {
                    base: 'banners-table',
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
                            locale[settingsDataStore.locale].breadcrumbs.banners
                        }}
                    </span>
                </caption>
            </template>
            <template #images-data="{ row }">
                <NuxtLink :to="`/dashboard/banners/${row._id}`">
                    <NuxtImg
                        v-if="!row.banners[0].image"
                        :alt="locale[settingsDataStore.locale].noImage"
                        class="dark:opacity-90 rounded-[8px]"
                        src="/no-image.svg"
                        width="40"
                    />
                    <NuxtImg
                        v-else
                        :src="`/${row.banners[0].image}`"
                        class="dark:opacity-90 rounded-[8px]"
                        height="60"
                        width="200"
                    />
                </NuxtLink>
            </template>
            <template #title-data="{ row }">
                {{ row.title }}
            </template>
            <template #action-data="{ row }">
                <UButton
                    :to="`/dashboard/banners/${row._id}`"
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
        :element-in-page="Constants.PER_PAGE_BANNERS"
    />
</template>
