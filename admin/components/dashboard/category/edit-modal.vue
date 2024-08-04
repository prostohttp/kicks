<script lang="ts" setup>
import { locale } from "~/lang/locale";

// define
const { categoryId } = defineProps<{
  categoryId: string;
}>();
const emit = defineEmits(["close"]);

// vars
const inputData = [
  {
    label: locale["en"].title,
    name: "title",
    placeholder: locale["en"].title,
    icon: "i-heroicons-queue-list",
  },
  {
    label: locale["en"].description,
    name: "description",
    type: "textarea",
    placeholder: locale["en"].description,
    icon: "i-heroicons-document-text-16-solid",
  },
  {
    label: locale["en"].childCategories,
    name: "children",
    type: "select",
    placeholder: locale["en"].selectChildrenItems,
    icon: "i-heroicons-list-bullet",
  },
  {
    label: locale["en"].isParentTitle,
    name: "isParent",
    type: "checkbox",
    placeholder: locale["en"].isParent,
  },
  {
    label: locale["en"].isEnabled,
    name: "isEnabled",
    type: "checkbox",
    placeholder: locale["en"].isEnabled,
  },
];
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
            {{ locale["en"].editCategory }}
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
      <LazyUiEmpty v-if="!categoryId" />
      <LazyDashboardCategoryEditForm
        @close="$emit('close')"
        :inputData="inputData"
        :categoryId="categoryId"
        v-else
      />
    </UCard>
  </UModal>
</template>
