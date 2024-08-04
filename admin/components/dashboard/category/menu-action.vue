<script lang="ts" setup>
import {
  DashboardCategoryDeleteModal,
  DashboardCategoryEditModal,
} from "#components";
import { locale } from "~/lang/locale";
import type { ITable } from "~/pages/dashboard/categories/index.vue";

// define
const activePage = defineModel("activePage");

// vars
const modal = useModal();
const route = useRoute();

// store
const categoryDataStore = useCategoryDataStore();
const { selected } = storeToRefs(categoryDataStore);

// handlers
const openEditCategoryModal = (categoryId: string) => {
  modal.open(DashboardCategoryEditModal, {
    categoryId,
    onClose() {
      removeQuery("categoryEdit");
      modal.close();
    },
  });
};

const openDeleteCategoryModal = (categories: ITable[]) => {
  modal.open(DashboardCategoryDeleteModal, {
    categories,
    onClose() {
      modal.close();
    },
    async onDelete() {
      selected.value = [];
      categoryDataStore.getAllCategories(1);
      categoryDataStore.getAllTitles();
      activePage.value = 1;
      modal.close();
    },
  });
};

// hooks
onMounted(async () => {
  if (route.query.categoryEdit) {
    openEditCategoryModal(route.query.categoryEdit.toString());
  }
});
</script>

<template>
  <UPopover
    class="absolute top-[5px] right-0"
    v-if="selected?.length"
    :popper="{ placement: 'bottom-end', offsetDistance: 10 }"
    :ui="{
      rounded: 'rounded-[8px]',
      ring: 'ring-[#e7e7e3] ring-1',
      shadow: 'shadow-none',
      width: 'md:w-auto w-[calc(100%-20px)]',
      position: 'right-[10px] sm:right-auto',
    }"
  >
    <UIcon
      name="i-heroicons-ellipsis-vertical-20-solid"
      class="cursor-pointer"
    />
    <template #panel>
      <ul class="p-4 flex flex-col gap-[10px]">
        <NuxtLink
          v-if="selected.length === 1"
          active-class="active"
          :to="addQuery('categoryEdit', selected[0].id)"
          @click="openEditCategoryModal(selected[0].id)"
          class="cursor-pointer text-[16px] font-[400]"
        >
          {{ locale["en"].editCategory }}
        </NuxtLink>
        <NuxtLink
          active-class="active"
          class="text-[16px] font-[400] opacity-20 hover:text-dark-gray dark:hover:text-fa-white"
          v-else
        >
          {{ locale["en"].editCategory }}
        </NuxtLink>

        <NuxtLink
          @click="openDeleteCategoryModal(selected)"
          class="cursor-pointer text-[16px] font-[400]"
        >
          {{ locale["en"].deleteCategory }}
        </NuxtLink>
      </ul>
    </template>
  </UPopover>
</template>
