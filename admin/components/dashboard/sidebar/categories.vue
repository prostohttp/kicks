<script lang="ts" setup>
// vars
import type { AccordionItem } from "~/types/ui/ui.types";

const { data: categories } = await useFetch("/api/category/all", {
  method: "GET",
  pick: ["categories"],
});

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

const computedCategories = computed(() => {
  return categories.value?.categories.map((item: any) => ({
    _id: item?._id,
    title: item?.title,
  }));
});

const items: AccordionItem[] | undefined = [
  {
    label: "Categories",
    defaultOpen: true,
    content: computedCategories.value,
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
            v-for="category in item.content"
            :key="category._id"
            :_id="category._id"
            :title="category.title"
            :count="
              computedProducts[category._id]
                ? computedProducts[category._id]
                : 0
            "
          />
        </ul>
      </template>
    </UAccordion>
  </div>
</template>
