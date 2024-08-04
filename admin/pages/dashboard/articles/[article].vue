<script lang="ts" setup>
import { locale } from "~/lang/locale";
import { articleData } from "./data/index.js";
import type { BreadcrumbItem } from "~/types/ui/ui.types";

// store
const articleDataStore = useArticleDataStore();
await useAsyncData("articles", () =>
  articleDataStore.getArticle(useRoute().params.article.toString()),
);
const { article } = storeToRefs(articleDataStore);

// vars
const router = useRouter();

const fullPath = router.currentRoute.value.fullPath;
const links: Ref<BreadcrumbItem[]> = ref(
  breadcrumbsArrayFactory(fullPath, article.value?.title, fullPath),
);

const title = computed(() =>
  article.value ? article.value?.title : locale["en"].empty,
);

// meta
useHeadSafe({
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
    :title="article ? article.title : locale['en'].empty"
  />
  <main
    class="p-[24px] bg-white rounded-[16px] dark:bg-dark-gray dark:border border-[#70706e]"
  >
    <div class="flex lg:flex-row flex-col lg:gap-[35px] gap-[20px]">
      <UiEmpty v-if="!article" />
      <DashboardArticleEditForm :articleData="articleData" v-else />
    </div>
  </main>
</template>
