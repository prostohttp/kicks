<script lang="ts" setup>
import { DashboardBrandAddNewModal } from "#components";
import { Constants } from "~/constants";
import { eng } from "~/lang/eng";
import { useBrandDataStore } from "~/stores/brand-data";
import type { BreadcrumbItem } from "~/types/ui/ui.types";

// store
const brandsDataStore = useBrandDataStore();
const { brands: data } = storeToRefs(brandsDataStore);

// vars
const route = useRoute();
const router = useRouter();
const modal = useModal();
const page = useRoute().query.page as never as number;
const path = router.currentRoute.value.path;
const links: Ref<BreadcrumbItem[]> = ref(breadcrumbsArrayFactory(path));
const activePage = ref(data.value?.activePage);

// handlers
await brandsDataStore.getAllBrands(page);

const openAddNewBrandModal = () => {
  modal.open(DashboardBrandAddNewModal, {
    onClose() {
      removeQuery("add");
      modal.close();
    },
  });
};

// meta
definePageMeta({
  name: eng.breadcrumbs.brands,
});

useHead({
  title: eng.allBrands,
});

// Hooks
watch(activePage, async (newValue) => {
  router.push({ query: { page: newValue } });
  await brandsDataStore.getAllBrands(newValue!);
});

onMounted(() => {
  if (route.query.add) {
    openAddNewBrandModal();
  }
});
</script>

<template>
  <div
    class="flex justify-between items-center sm:flex-row flex-col gap-0 md:gap-[15px]"
  >
    <DashboardBreadcrumbs :links="links" :title="eng.breadcrumbs.brands" />
    <UButton
      class="h-[48px] px-[26px] py-[10px] flex justify-center items-center uppercase fon-[Rubik] font-[600] shadow-none bg-dark-gray rounded-[8px] hover:bg-dark-gray dark:bg-yellow dark:hover:bg-yellow mb-[24px] hover:text-fa-white dark:hover:text-dark-gray"
      icon="i-heroicons-plus-circle"
      :label="eng.addNewBrand"
      :to="addQuery('add', 'new')"
      @click="openAddNewBrandModal"
    />
  </div>
  <main class="flex flex-col">
    <div
      class="grid 2xl:grid-cols-6 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 md:gap-[30px] gap-[15px]"
    >
      <DashboardBrandCard
        v-for="brand in data?.brands"
        :brand="brand"
        :key="brand._id"
      />
    </div>
    <UiPagination
      v-if="data?.pagesInPagination"
      v-model="activePage"
      :element-in-page="Constants.PER_PAGE_BRAND"
      :allItems="data?.allItems"
    />
  </main>
</template>
