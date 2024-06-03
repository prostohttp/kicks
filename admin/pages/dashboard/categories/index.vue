<script lang="ts" setup>
import { DashboardCategoryAddNewModal } from "#components";
import { eng } from "~/lang/eng";
import { useCategoryDataStore } from "~/stores/category-data";
import type { BreadcrumbItem } from "~/types/ui/ui.types";

// meta
definePageMeta({
  name: "all-categories",
});
useHead({
  title: eng.allCategories,
});

// store
const categoryDataStore = useCategoryDataStore();
const { categories: data } = storeToRefs(categoryDataStore);

// vars
const modal = useModal();
const router = useRouter();
const route = useRoute();
const page = useRoute().query.page as never as number;
const activePage = ref(data.value?.activePage);
const path = router.currentRoute.value.path;
const links: Ref<BreadcrumbItem[]> = ref(breadcrumbsArrayFactory(path));

// handlers
categoryDataStore.getAllCategories(page);
const openAddNewCategoryModal = () => {
  modal.open(DashboardCategoryAddNewModal, {
    onClose() {
      removeQuery("categoryNew");
      modal.close();
    },
  });
};

// hooks
watch(activePage, async (newValue) => {
  router.push({ query: { page: newValue } });
  await categoryDataStore.getAllCategories(newValue!);
});

onMounted(() => {
  if (route.query.categoryNew) {
    openAddNewCategoryModal();
  }
});
</script>

<template>
  <div
    class="flex justify-between items-center sm:flex-row flex-col gap-0 md:gap-[15px]"
  >
    <DashboardBreadcrumbs :links="links" :title="eng.breadcrumbs.categories" />
    <UButton
      class="h-[48px] px-[26px] py-[10px] flex justify-center items-center uppercase fon-[Rubik] font-[600] shadow-none bg-dark-gray rounded-[8px] hover:bg-dark-gray dark:bg-yellow dark:hover:bg-yellow mb-[24px] hover:text-fa-white dark:hover:text-dark-gray"
      icon="i-heroicons-plus-circle"
      :label="eng.addNewCategory"
      :to="addQuery('categoryNew', 'yes')"
      @click="openAddNewCategoryModal()"
    />
  </div>
  <div>
    <pre>{{ data?.categories }}</pre>
  </div>
</template>
