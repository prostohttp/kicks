<script lang="ts" setup>
import { locale } from "~/lang/locale";
import type { BreadcrumbItem } from "~/types/ui/ui.types";

// vars
const router = useRouter();
const fullPath = router.currentRoute.value.fullPath;
const links: Ref<BreadcrumbItem[]> = ref(breadcrumbsArrayFactory(fullPath));

// meta
definePageMeta({
  name: locale["en"].addNewBanner,
});

useHead({
  title: locale["en"].addNewBanner,
});
</script>

<template>
  <DashboardBreadcrumbs
    :links="links"
    :title="locale[useSettingsDataStore().locale].addNewBanner"
  />
  <main
    class="p-[24px] bg-white rounded-[16px] dark:bg-dark-gray dark:border border-[#70706e]"
  >
    <div class="flex lg:flex-row flex-col lg:gap-[35px] gap-[20px]">
      <DashboardBannerAddNewForm />
    </div>
  </main>
</template>
