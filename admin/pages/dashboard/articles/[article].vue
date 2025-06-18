<script lang="ts" setup>
import { locale } from "~/lang/locale";
import type { BreadcrumbItem } from "~/types/ui/ui.types";

// store
const articleDataStore = useArticleDataStore();
const settingsDataStore = useSettingsDataStore();
await useAsyncData(() =>
    articleDataStore.getArticle(
        useRoute("dashboard-articles-article").params.article.toString(),
    ),
);
const { article } = storeToRefs(articleDataStore);

// vars
const router = useRouter();
const fullPath = router.currentRoute.value.fullPath;
const links: Ref<BreadcrumbItem[]> = ref(
    breadcrumbsArrayFactory(fullPath, article.value?.title, fullPath),
);
const title = computed(() =>
    article.value
        ? article.value?.title
        : locale[settingsDataStore.locale].empty,
);
// TODO: необходимость дублирование тут и в [article].vue из за доступа к стору не в компоненте
const articleData: InputData[] = [
    {
        label: locale[useSettingsDataStore().locale].title,
        type: "text",
        name: "title",
        placeholder: locale[useSettingsDataStore().locale].title,
    },
    {
        label: locale[useSettingsDataStore().locale].shortDescription,
        name: "shortDescription",
        type: "textarea",
        placeholder: locale[useSettingsDataStore().locale].shortDescription,
    },
    {
        label: locale[useSettingsDataStore().locale].description,
        name: "description",
        type: "tiptap",
        placeholder: locale[useSettingsDataStore().locale].description,
    },
    {
        label: locale[useSettingsDataStore().locale].sort,
        name: "sort",
        type: "number",
        placeholder: locale[useSettingsDataStore().locale].sort,
    },
    {
        label: locale[useSettingsDataStore().locale].siteMenu,
        name: "siteMenu",
        type: "toggle",
        placeholder: locale[useSettingsDataStore().locale].siteMenu,
    },
    {
        label: locale[useSettingsDataStore().locale].adminMenu,
        name: "adminMenu",
        type: "toggle",
        placeholder: locale[useSettingsDataStore().locale].adminMenu,
    },
    {
        label: locale[useSettingsDataStore().locale].featuredProducts,
        name: "featuredProducts",
        type: "select",
        placeholder: locale[useSettingsDataStore().locale].selectElement,
    },
    {
        label: locale[useSettingsDataStore().locale].isEnabled,
        name: "isEnabled",
        type: "toggle",
        placeholder: locale[useSettingsDataStore().locale].isEnabled,
    },
];

// meta
useHead({
    title: title,
});

// hooks
watch(article, () => {
    links.value = breadcrumbsArrayFactory(
        fullPath,
        article.value?.title,
        fullPath,
    );
});
</script>

<template>
    <DashboardBreadcrumbs
        :links="links"
        :title="
            article ? article.title : locale[settingsDataStore.locale].empty
        "
    />
    <main
        class="p-[24px] bg-white rounded-[16px] dark:bg-dark-gray dark:border border-[#70706e]"
    >
        <div class="flex lg:flex-row flex-col lg:gap-[35px] gap-[20px]">
            <UiEmpty v-if="!article" />
            <DashboardArticleEditForm v-else :articleData="articleData" />
        </div>
    </main>
</template>
