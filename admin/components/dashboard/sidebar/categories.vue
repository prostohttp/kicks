<script lang="ts" setup>
import type { AccordionItem } from "~/types/ui/ui.types";
import { eng } from "~/lang/eng";

// store
const categoryStore = useCategoryDataStore();
const { parentTitles } = storeToRefs(categoryStore);

// vars
const route = useRoute();
await categoryStore.getAllTitles();
const isActive = (id: string): boolean =>
  (route.query.category && route.query.category === id) as boolean;

// handlers
const { data: products } = await useFetch<
  Array<{ _id: string; category: string[] }>
>("/api/product/all", {
  method: "GET",
  query: {
    forCategoryCount: true,
  },
});

const computedProducts = computed(() => {
  return elementCountForId(products.value);
});

const items: AccordionItem[] | undefined = [
  {
    label: "Categories",
    defaultOpen: true,
    content: parentTitles.value,
  },
];
</script>

<template>
  <div class="mt-[48px] mb-[20px]">
    <UAccordion
      :items="items"
      :ui="{
        item: {
          icon: 'scale-[1.1] i-heroicons-chevron-down-solid',
        },
        default: {
          class:
            'bg-transparent text-[20px] font-[Rubik] font-[500] text-dark-gray hover:bg-transparent p-0 pb-[10px] dark:bg-transparent dark:hover:bg-transparent dark:text-fa-white',
        },
      }"
    >
      <template #item="{ item }">
        <ul>
          <DashboardSidebarCategoryItem
            v-for="category in parentTitles"
            :key="category._id"
            :_id="category._id"
            :title="category.title"
            :is-active="isActive(category._id)"
            :count="
              computedProducts[category._id]
                ? computedProducts[category._id]
                : 0
            "
          />
          <li
            class="h-[35px] flex justify-between items-center mb-[16px] border-t border-grey dark:border-[#70706e] pt-[15px]"
          >
            <NuxtLink
              to="/dashboard/categories?page=1"
              class="text-[16px] font-[600] text-dark-gray dark:text-fa-white"
            >
              {{ eng.allCategories }}
            </NuxtLink>
          </li>
        </ul>
      </template>
    </UAccordion>
  </div>
</template>
