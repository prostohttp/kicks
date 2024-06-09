<script lang="ts" setup>
import { eng } from "~/lang/eng";

// define
const { categoryId } = defineProps<{
  categoryId: string;
}>();
const emit = defineEmits(["close"]);

// vars
const inputData = [
  {
    label: eng.title,
    name: "title",
    placeholder: eng.title,
    icon: "i-heroicons-queue-list",
  },
  {
    label: eng.description,
    name: "description",
    type: "textarea",
    placeholder: eng.description,
    icon: "i-heroicons-document-text-16-solid",
  },
  {
    label: eng.childCategories,
    name: "children",
    type: "select",
    placeholder: eng.selectChildrenItems,
    icon: "i-heroicons-list-bullet",
  },
  {
    label: eng.isParentTitle,
    name: "isParent",
    type: "checkbox",
    placeholder: eng.isParent,
  },
  {
    label: eng.isEnabled,
    name: "isEnabled",
    type: "checkbox",
    placeholder: eng.isEnabled,
  },
];

const { data: category } = await useFetch("/api/category/one", {
  method: "GET",
  query: {
    id: categoryId,
  },
});
</script>

<template>
  <UModal prevent-close>
    <UCard
      :ui="{
        ring: '',
        divide: 'divide-y divide-gray-100 dark:divide-gray-800',
      }"
    >
      <template #header>
        <div class="flex items-center justify-between">
          <h3
            class="text-base font-semibold leading-6 text-gray-900 dark:text-white"
          >
            {{ eng.editCategory }}
          </h3>
          <UButton
            color="gray"
            variant="ghost"
            icon="i-heroicons-x-mark-20-solid"
            class="-my-1"
            @click="$emit('close')"
          />
        </div>
      </template>
      <DashboardCategoryEditForm
        @close="$emit('close')"
        :inputData="inputData"
        :categoryId="categoryId"
        v-if="category"
      />
      <div v-else class="dark:text-fa-white">
        <h2>{{ eng.empty }}</h2>
      </div>
    </UCard>
  </UModal>
</template>
