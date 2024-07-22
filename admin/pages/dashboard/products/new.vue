<script lang="ts" setup>
import { eng } from "~/lang/eng";
import type { BreadcrumbItem } from "~/types/ui/ui.types";

// vars
const router = useRouter();
const fullPath = router.currentRoute.value.fullPath;
const links: Ref<BreadcrumbItem[]> = ref(breadcrumbsArrayFactory(fullPath));

// meta
definePageMeta({
  middleware: ["only-admin-access"],
  name: eng.addNewProduct,
});

useHead({
  title: eng.addNewProduct,
});
</script>

<template>
  <DashboardBreadcrumbs :links="links" :title="eng.addNewProduct" />
  <main
    class="p-[24px] bg-white rounded-[16px] dark:bg-dark-gray dark:border border-[#70706e]"
  >
    <div class="flex lg:flex-row flex-col lg:gap-[35px] gap-[20px]">
      <DashboardProductAddNewForm />
    </div>
  </main>
</template>
