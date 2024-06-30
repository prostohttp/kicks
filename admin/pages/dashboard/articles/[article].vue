<script lang="ts" setup>
import { eng } from "~/lang/eng";
import { articleData } from "./data/index.js";
import type { BreadcrumbItem } from "~/types/ui/ui.types";

// store
const articleDataStore = useArticleDataStore();
const { article } = storeToRefs(articleDataStore);

// vars
const router = useRouter();
const id = useRoute().params.article.toString();

await useAsyncData("articles", () => articleDataStore.getArticle(id));

const fullPath = router.currentRoute.value.fullPath;
const links: Ref<BreadcrumbItem[]> = ref(
  breadcrumbsArrayFactory(fullPath, article.value?.title, fullPath),
);

// meta
useHead({
  title: article.value ? article.value?.title : eng.empty,
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
    :title="article ? article.title : eng.empty"
  />
  <main
    class="p-[24px] bg-white rounded-[16px] dark:bg-dark-gray dark:border border-[#70706e]"
  >
    <div class="flex lg:flex-row flex-col lg:gap-[35px] gap-[20px]">
      <UiEmpty v-if="!article" />
      <DashboardArticleEditForm
        :articleData="articleData"
        :id="article._id"
        v-model:article="article"
        v-else
      />
    </div>
  </main>
</template>
