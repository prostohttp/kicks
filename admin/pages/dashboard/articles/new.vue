<script lang="ts" setup>
import { eng } from "~/lang/eng";
import type { BreadcrumbItem, InputData } from "~/types/ui/ui.types";

// vars
const router = useRouter();
const fullPath = router.currentRoute.value.fullPath;
const links: Ref<BreadcrumbItem[]> = ref(breadcrumbsArrayFactory(fullPath));
const articleData: InputData[] = [
  {
    label: eng.title,
    name: "title",
    placeholder: eng.title,
  },
  {
    label: eng.shortDescription,
    name: "shortDescription",
    type: "textarea",
    placeholder: eng.shortDescription,
  },
  {
    label: eng.description,
    name: "description",
    type: "tiptap",
    placeholder: eng.description,
  },
  {
    label: eng.sort,
    name: "sort",
    placeholder: eng.sort,
  },
  {
    label: eng.siteMenu,
    name: "siteMenu",
    type: "toggle",
    placeholder: eng.siteMenu,
  },
  {
    label: eng.adminMenu,
    name: "adminMenu",
    type: "toggle",
    placeholder: eng.adminMenu,
  },
  {
    label: eng.featuredProducts,
    name: "featuredProducts",
    type: "select",
    placeholder: eng.selectElement,
  },
  {
    label: eng.isEnabled,
    name: "isEnabled",
    type: "toggle",
    placeholder: eng.isEnabled,
  },
];

// meta
definePageMeta({
  name: eng.addNewArticle,
});

useHead({
  title: eng.addNewArticle,
});
</script>

<template>
  <DashboardBreadcrumbs :links="links" :title="eng.addNewArticle" />
  <main
    class="p-[24px] bg-white rounded-[16px] dark:bg-dark-gray dark:border border-[#70706e]"
  >
    <div class="flex lg:flex-row flex-col lg:gap-[35px] gap-[20px]">
      <DashboardArticleAddNewForm :articleData="articleData" />
    </div>
  </main>
</template>
