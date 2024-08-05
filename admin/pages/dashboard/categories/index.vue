<script lang="ts" setup>
import { DashboardCategoryAddNewModal } from "#components";
import { locale } from "~/lang/locale";
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
  title: locale["en"].allCategories,
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
      parent: category.isParent ? locale["en"].yesText : locale["en"].noText,
      enabled: category.isEnabled ? locale["en"].yesText : locale["en"].noText,
    };
  });
});

// hooks
watch(activePage, (newValue) => {
  router.push({ query: { ...route.query, page: newValue || 1 } });
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
  if (route.query.categoryNew) {
    openAddNewCategoryModal();
  }
});
</script>

<template>
  <div
    class="flex justify-between items-center sm:flex-row flex-col gap-0 md:gap-[15px]"
  >
    <DashboardBreadcrumbs
      :links="links"
      :title="locale[useSettingsDataStore().locale].breadcrumbs.categories"
    />
    <UButton
      class="h-[48px] px-[26px] py-[10px] flex justify-center items-center uppercase font-[600] shadow-none bg-dark-gray rounded-[8px] hover:bg-dark-gray dark:bg-yellow dark:hover:bg-yellow mb-[24px] hover:text-fa-white dark:hover:text-dark-gray"
      icon="i-heroicons-plus-circle"
      :label="locale[useSettingsDataStore().locale].addNewCategory"
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
        label: locale[useSettingsDataStore().locale].loadingText,
      }"
      :progress="{ color: 'primary', animation: 'carousel' }"
      v-model="selected"
      :rows="categories"
      :columns="columns"
      :empty-state="{
        icon: 'i-heroicons-circle-stack-20-solid',
        label: locale[useSettingsDataStore().locale].empty,
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
            {{ locale["en"].breadcrumbs.categories }}
          </span>
          <DashboardCategoryMenuAction
            v-model:activePage="activePage"
            v-if="isAdmin"
          />
        </caption>
      </template>
    </UTable>
  </main>
  <LazyUiPagination
    v-if="data?.pagesInPagination"
    v-model="activePage"
    :element-in-page="Constants.PER_PAGE_CATEGORY"
    :all-items="data?.allItems"
  />
</template>

<style scoped>
.active {
  @apply dark:text-fa-white dark:hover:text-yellow text-dark-gray hover:text-blue;
}
</style>
