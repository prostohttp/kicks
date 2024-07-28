<script lang="ts" setup>
import { eng } from "~/lang/eng";
import { Constants } from "~/constants";
import { type BreadcrumbItem } from "~/types/ui/ui.types";
import { useBannerDataStore } from "~/stores/banner-data";

// meta
definePageMeta({
  name: "all-banners",
});
useHead({
  title: eng.allBanners,
});

// store
const bannerDataStore = useBannerDataStore();
const { banners: data } = storeToRefs(bannerDataStore);

// vars
const isAdmin = useIsAdmin();
const router = useRouter();
const route = useRoute();
const page = Number(useRoute().query.page);
const columns = [
  {
    key: "title",
    label: "Title",
  },
  {
    key: "images",
    label: "Banner",
  },
  {
    key: "action",
    label: "Action",
  },
];

await useAsyncData("banners", () => bannerDataStore.getAllBanners(page));

const activePage = ref(data.value?.activePage || 1);
const path = router.currentRoute.value.path;
const links: Ref<BreadcrumbItem[]> = ref(breadcrumbsArrayFactory(path));

// handlers

// hooks
watch(activePage, (newValue) => {
  router.push({ query: { ...route.query, page: newValue || 1 } });
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
    <DashboardBreadcrumbs :links="links" :title="eng.breadcrumbs.banners" />
    <UButton
      class="h-[48px] px-[26px] py-[10px] flex justify-center items-center uppercase font-[600] shadow-none bg-dark-gray rounded-[8px] hover:bg-dark-gray dark:bg-yellow dark:hover:bg-yellow mb-[24px] hover:text-fa-white dark:hover:text-dark-gray"
      icon="i-heroicons-plus-circle"
      :label="eng.addNewBanner"
      to="/dashboard/banners/new"
      v-if="isAdmin"
    />
  </div>
  <main
    class="p-[24px] bg-white flex flex-col rounded-[16px] dark:bg-dark-gray dark:border border-[#70706e]"
  >
    <UTable
      :loading="!data"
      :loading-state="{
        icon: 'i-heroicons-arrow-path-20-solid',
        label: eng.loadingText,
      }"
      :progress="{ color: 'primary', animation: 'carousel' }"
      :rows="data?.banners"
      :columns="columns"
      :empty-state="{
        icon: 'i-heroicons-circle-stack-20-solid',
        label: eng.empty,
      }"
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
            {{ eng.breadcrumbs.banners }}
          </span>
        </caption>
      </template>
      <template #title-data="{ row }">
        {{ row.title }}
      </template>
      <template #images-data="{ row }">
        <img
          src="/no-image.svg"
          :alt="eng.noImage"
          class="w-[40px] dark:opacity-90 rounded-[8px]"
          v-if="!row.banners[0].image"
        />
        <img
          :src="`/${row.banners[0].image}`"
          class="w-[40px] dark:opacity-90 rounded-[8px]"
          v-else
        />
      </template>
      <template #action-data="{ row }">
        <UButton
          class="icon-button float-right"
          icon="i-heroicons-pencil-square-solid"
          :to="`/dashboard/banners/${row._id}`"
        />
      </template>
    </UTable>
  </main>
  <LazyUiPagination
    v-if="data?.pagesInPagination"
    v-model="activePage"
    :element-in-page="Constants.PER_PAGE_BANNERS"
    :all-items="data?.allItems"
  />
</template>

<style scoped>
.active {
  @apply dark:text-fa-white dark:hover:text-yellow text-dark-gray hover:text-blue;
}
</style>
