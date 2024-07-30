<script lang="ts" setup>
import { eng } from "~/lang/eng";
import type { BreadcrumbItem } from "~/types/ui/ui.types";

// store
const bannerDataStore = useBannerDataStore();
await useAsyncData("asyncBanner", () =>
  bannerDataStore.getBannerById(useRoute().params.banner.toString()),
);
const { banner } = storeToRefs(bannerDataStore);

// vars
const router = useRouter();

const fullPath = router.currentRoute.value.fullPath;
const links: Ref<BreadcrumbItem[]> = ref(
  breadcrumbsArrayFactory(fullPath, banner.value?.title, fullPath),
);

const title = computed(() => (banner.value ? banner.value?.title : eng.empty));

// meta
useHeadSafe({
  title: title,
});

// hooks
watch(
  () => banner.value.title,
  () => {
    links.value = breadcrumbsArrayFactory(
      fullPath,
      banner.value?.title,
      fullPath,
    );
  },
);
</script>

<template>
  <DashboardBreadcrumbs
    :links="links"
    :title="banner.title ? banner.title : eng.empty"
  />
  <main
    class="p-[24px] bg-white rounded-[16px] dark:bg-dark-gray dark:border border-[#70706e]"
  >
    <div class="flex lg:flex-row flex-col lg:gap-[35px] gap-[20px]">
      <UiEmpty v-if="!banner.title" />
      <DashboardBannerEditForm v-else />
    </div>
  </main>
</template>
