<script lang="ts" setup>
import { eng } from "~/lang/eng";

// define
const { allItems, elementInPage } = defineProps<{
  allItems: number | undefined;
  elementInPage: number | undefined;
}>();

// vars
const activePage = defineModel();
let lastPage = computed(() => pageCount(allItems!, elementInPage!));
</script>

<template>
  <div class="mt-auto pt-[25px] mb-[30px]">
    <UPagination
      :ui="{
        base: 'dark:bg-transparent dark:border-grey bg-transparent ring-0 border border-dark-gray px-[15px] hover:bg-dark-gray hover:text-fa-white dark:hover:bg-yellow dark:hover:border-yellow dark:hover:text-dark-gray',
        wrapper: 'gap-[16px]',
        rounded: 'rounded-[8px]',
      }"
      :active-button="{
        inactiveClass: 'pagination-active',
      }"
      :prev-button="{
        icon: 'i-heroicons-chevron-left-20-solid',
        label: eng.prev,
        inactiveClass: activePage !== 1 ? 'pagination-prev-next' : 'hidden',
      }"
      :next-button="{
        icon: 'i-heroicons-chevron-right-20-solid',
        label: eng.next,
        trailing: true,
        inactiveClass:
          activePage !== lastPage ? 'pagination-prev-next' : 'hidden',
      }"
      v-model="activePage"
      :page-count="elementInPage"
      :total="allItems!"
      :max="elementInPage"
    />
  </div>
</template>

<style>
.pagination-active {
  @apply bg-dark-gray dark:bg-yellow dark:border-yellow text-fa-white dark:text-dark-gray;
}

.pagination-prev-next:disabled,
.pagination-prev-next {
  @apply bg-transparent dark:bg-transparent opacity-100 text-dark-gray dark:text-fa-white;
}
</style>
