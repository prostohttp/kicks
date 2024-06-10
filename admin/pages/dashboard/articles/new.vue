<script lang="ts" setup>
import TiptapEditor from "~/components/TiptapEditor.vue";
import { eng } from "~/lang/eng";
import type { BreadcrumbItem } from "~/types/ui/ui.types";

// vars
const router = useRouter();
const fullPath = router.currentRoute.value.fullPath;
const links: Ref<BreadcrumbItem[]> = ref(breadcrumbsArrayFactory(fullPath));
const tiptap = ref("");
const getValueHandler = (value: string) => {
  tiptap.value = value;
};

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
      <!-- <ClientOnly> -->
      <TiptapEditor
        :placeholder="eng.placeholderText"
        content=""
        @getValue="getValueHandler"
      />
      <!-- </ClientOnly> -->
    </div>
    <pre>{{ tiptap }}</pre>
  </main>
</template>
