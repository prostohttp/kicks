<script lang="ts" setup>
import { DashboardArticleDeleteModal } from "#components";
import { eng } from "~/lang/eng";
import type { IArticle } from "~/pages/dashboard/articles/index.vue";

// define
const activePage = defineModel("activePage");

// vars
const modal = useModal();

// store
const articleDataStore = useArticleDataStore();
const { selected } = storeToRefs(articleDataStore);

// handlers
const openDeleteArticleModal = (articles: IArticle[]) => {
  modal.open(DashboardArticleDeleteModal, {
    articles,
    onClose() {
      modal.close();
    },
    async onDelete() {
      selected.value = [];
      articleDataStore.getAllArticles(1);
      activePage.value = 1;
      modal.close();
    },
  });
};
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
          @click="openDeleteArticleModal(selected)"
          class="cursor-pointer text-[16px] font-[400]"
        >
          {{ eng.deleteArticle }}
        </NuxtLink>
      </ul>
    </template>
  </UPopover>
</template>
