<script lang="ts" setup>
import { locale } from "~/lang/locale";
import { Constants } from "~/constants";
import { Locales, type BreadcrumbItem } from "~/types/ui/ui.types";

export interface IArticle {
    id: string;
    image?: string;
    title: string;
    description: string;
    enabled: string;
    createdAt: string;
}

// meta
definePageMeta({
    name: "all-articles",
});
useHead({
    title: locale[useSettingsDataStore().locale].allArticles,
});

// store
const articleDataStore = useArticleDataStore();
const settingsDataStore = useSettingsDataStore();
const { articles: data, selected } = storeToRefs(articleDataStore);

// vars
const isAdmin = checkIsAdmin();
const router = useRouter();
const route = useRoute();
const page = Number(useRoute().query.page);
const columns = [
    {
        key: "image",
        label: locale[settingsDataStore.locale].image,
    },
    {
        key: "title",
        label: locale[settingsDataStore.locale].title,
    },
    {
        key: "description",
        label: locale[settingsDataStore.locale].description,
    },
    {
        key: "enabled",
        label: locale[settingsDataStore.locale].isEnabled,
    },
    {
        key: "createdAt",
        label: locale[settingsDataStore.locale].createdAt,
    },
];

await useAsyncData(() => articleDataStore.getAllArticles(page));

const activePage = ref(data.value?.activePage || 1);
const path = router.currentRoute.value.path;
const links: Ref<BreadcrumbItem[]> = ref(breadcrumbsArrayFactory(path));

// handlers
const articles = computed((): Array<IArticle> | undefined => {
    return data.value?.articles.map((article) => {
        return {
            id: article._id,
            image: article.image,
            title: article.title,
            description: article.shortDescription,
            enabled: article.isEnabled
                ? locale[settingsDataStore.locale].yesText
                : locale[settingsDataStore.locale].noText,
            createdAt: dateTimeFormat(article.createdAt, Locales.ru),
        };
    });
});

// hooks
watch(activePage, (newValue) => {
    router.push({ query: { ...route.query, page: newValue || 1 } });
    selected.value = [];
    articleDataStore.getAllArticles(newValue);
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
            :title="locale[settingsDataStore.locale].breadcrumbs.articles"
        />
        <UButton
            class="h-[48px] px-[26px] py-[10px] flex justify-center items-center uppercase font-[600] shadow-none bg-dark-gray rounded-[8px] hover:bg-dark-gray dark:bg-yellow dark:hover:bg-yellow mb-[24px] hover:text-fa-white dark:hover:text-dark-gray"
            icon="i-heroicons-plus-circle"
            :label="locale[settingsDataStore.locale].addNewArticle"
            to="/dashboard/articles/new"
            v-if="isAdmin"
        />
    </div>
    <main
        class="p-[24px] bg-white flex flex-col rounded-[16px] dark:bg-dark-gray dark:border border-[#70706e]"
    >
        <UTable
            :loading="!articles"
            :loading-state="{
                icon: 'i-heroicons-arrow-path-20-solid',
                label: locale[settingsDataStore.locale].loadingText,
            }"
            :progress="{ color: 'primary', animation: 'carousel' }"
            v-model="selected"
            :rows="articles"
            :columns="columns"
            :empty-state="{
                icon: 'i-heroicons-circle-stack-20-solid',
                label: locale['en'].empty,
            }"
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
                                .articles
                        }}
                    </span>
                    <DashboardArticleMenuAction
                        v-model:activePage="activePage"
                        v-if="isAdmin"
                    />
                </caption>
            </template>
            <template #image-data="{ row }">
                <NuxtLink :to="`/dashboard/articles/${row.id}`">
                    <NuxtImg
                        src="/no-image.svg"
                        :alt="locale[settingsDataStore.locale].noImage"
                        placeholder
                        fit="inside"
                        width="40"
                        class="dark:opacity-90"
                        v-if="!row.image"
                    />
                    <NuxtImg
                        :src="`/${row.image}`"
                        placeholder
                        fit="inside"
                        width="40"
                        class="dark:opacity-90"
                        v-else
                    />
                </NuxtLink>
            </template>
            <template #title-data="{ row }">
                <NuxtLink :to="`/dashboard/articles/${row.id}`">
                    {{ row.title }}
                </NuxtLink>
            </template>
        </UTable>
    </main>
    <LazyUiPagination
        v-if="data?.pagesInPagination"
        v-model="activePage"
        :element-in-page="Constants.PER_PAGE_ARTICLE"
        :all-items="data?.allItems"
    />
</template>

<style scoped>
.active {
    @apply dark:text-fa-white dark:hover:text-yellow text-dark-gray hover:text-blue;
}
</style>
