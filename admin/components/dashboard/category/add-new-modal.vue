<script lang="ts" setup>
import { locale } from "~/lang/locale";

// define
const emit = defineEmits(["close"]);

// vars
const inputData = [
  {
    label: locale[useSettingsDataStore().locale].title,
    name: "title",
    placeholder: locale[useSettingsDataStore().locale].title,
    icon: "i-heroicons-queue-list",
  },
  {
    label: locale[useSettingsDataStore().locale].description,
    name: "description",
    type: "textarea",
    placeholder: locale[useSettingsDataStore().locale].description,
    icon: "i-heroicons-document-text-16-solid",
  },
  {
    label: locale[useSettingsDataStore().locale].childCategories,
    name: "children",
    type: "select",
    placeholder: locale[useSettingsDataStore().locale].selectChildrenItems,
    icon: "i-heroicons-list-bullet",
  },
  {
    label: locale[useSettingsDataStore().locale].isParentTitle,
    name: "isParent",
    type: "checkbox",
    placeholder: locale[useSettingsDataStore().locale].isParent,
  },
  {
    label: locale[useSettingsDataStore().locale].isEnabled,
    name: "isEnabled",
    type: "checkbox",
    placeholder: locale[useSettingsDataStore().locale].isEnabled,
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
            {{ locale[useSettingsDataStore().locale].addNewCategory }}
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
      <DashboardCategoryAddNewForm
        @close="$emit('close')"
        :inputData="inputData"
      />
    </UCard>
  </UModal>
</template>
