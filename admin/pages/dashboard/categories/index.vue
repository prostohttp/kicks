<script lang="ts" setup>
import { DashboardCategoryAddNewModal } from "#components";
import { eng } from "~/lang/eng";
import { Constants } from "~/constants";
import { useCategoryDataStore } from "~/stores/category-data";
import type { BreadcrumbItem } from "~/types/ui/ui.types";

export interface ITable {
  id: string;
  title: string;
  children: string;
  parent: string;
  enabled: string;
}

// meta
definePageMeta({
  name: "all-categories",
});
useHead({
  title: eng.allCategories,
});

// store
const categoryDataStore = useCategoryDataStore();
const { categories: data, selected } = storeToRefs(categoryDataStore);

// vars
const isAdmin = useIsAdmin();
const modal = useModal();
const router = useRouter();
const route = useRoute();
const page = Number(useRoute().query.page);
const columns = [
  {
    key: "title",
    label: "Title",
  },
  {
    key: "children",
    label: "Children",
  },
  {
    key: "parent",
    label: "Parent",
  },
  {
    key: "enabled",
    label: "Enabled",
  },
];

await useAsyncData("categories", () =>
  categoryDataStore.getAllCategories(page),
);

const activePage = ref(data.value?.activePage || 1);
const path = router.currentRoute.value.path;
const links: Ref<BreadcrumbItem[]> = ref(breadcrumbsArrayFactory(path));

// handlers
const openAddNewCategoryModal = () => {
  modal.open(DashboardCategoryAddNewModal, {
    onClose() {
      removeQuery("categoryNew");
      modal.close();
    },
  });
};

const categories = computed((): Array<ITable> | undefined => {
  return data.value?.categories.map((category) => {
    return {
      id: category._id,
      title: category.title,
      children: category.children.map((cat) => cat.title).join(", "),
      parent: category.isParent ? eng.yesText : eng.noText,
      enabled: category.isEnabled ? eng.yesText : eng.noText,
    };
  });
});

// hooks
watch(activePage, (newValue) => {
  router.push({ query: { page: newValue } });
  selected.value = [];
  categoryDataStore.getAllCategories(newValue!);
});

watch(
  () => route.query,
  (newValue) => {
    if (!newValue.page) {
      activePage.value = 1;
    }
  },
);

onMounted(async () => {
  if (activePage.value) {
    categoryDataStore.getAllCategories(activePage.value);
  }
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
      class="h-[48px] px-[26px] py-[10px] flex justify-center items-center uppercase font-[600] shadow-none bg-dark-gray rounded-[8px] hover:bg-dark-gray dark:bg-yellow dark:hover:bg-yellow mb-[24px] hover:text-fa-white dark:hover:text-dark-gray"
      icon="i-heroicons-plus-circle"
      :label="eng.addNewCategory"
      :to="addQuery('categoryNew', 'yes')"
      @click="openAddNewCategoryModal()"
    />
  </div>
  <main
    class="p-[24px] bg-white flex flex-col rounded-[16px] dark:bg-dark-gray dark:border border-[#70706e]"
  >
    <UTable
      :loading="!categories"
      :loading-state="{
        icon: 'i-heroicons-arrow-path-20-solid',
        label: eng.loadingText,
      }"
      :progress="{ color: 'primary', animation: 'carousel' }"
      v-model="selected"
      :rows="categories"
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
            {{ eng.breadcrumbs.categories }}
          </span>
          <DashboardCategoryMenuAction
            v-model:activePage="activePage"
            v-if="isAdmin"
          />
        </caption>
      </template>
    </UTable>
  </main>
  <UiPagination
    v-if="data?.pagesInPagination"
    v-model="activePage"
    :element-in-page="Constants.PER_PAGE_CATEGORY"
    :allItems="data?.allItems"
  />
</template>

<style scoped>
.active {
  @apply dark:text-fa-white dark:hover:text-yellow text-dark-gray hover:text-blue;
}
</style>
