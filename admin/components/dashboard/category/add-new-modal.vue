<script lang="ts" setup>
import { locale } from "~/lang/locale";

// define
const emit = defineEmits(["close"]);

// store
const settingsDataStore = useSettingsDataStore();

// vars
const inputData = [
    {
        label: locale[settingsDataStore.locale].title,
        name: "title",
        placeholder: locale[settingsDataStore.locale].title,
        icon: "i-heroicons-queue-list",
    },
    {
        label: locale[settingsDataStore.locale].description,
        name: "description",
        type: "textarea",
        placeholder: locale[settingsDataStore.locale].description,
        icon: "i-heroicons-document-text-16-solid",
    },
    {
        label: locale[settingsDataStore.locale].childCategories,
        name: "children",
        type: "select",
        placeholder: locale[settingsDataStore.locale].selectChildrenItems,
        icon: "i-heroicons-list-bullet",
    },
    {
        label: locale[settingsDataStore.locale].isParentTitle,
        name: "isParent",
        type: "checkbox",
        placeholder: locale[settingsDataStore.locale].isParent,
    },
    {
        label: locale[settingsDataStore.locale].isEnabled,
        name: "isEnabled",
        type: "checkbox",
        placeholder: locale[settingsDataStore.locale].isEnabled,
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
                        {{ locale[settingsDataStore.locale].addNewCategory }}
                    </h3>
                    <UButton
                        class="-my-1"
                        color="gray"
                        icon="i-heroicons-x-mark-20-solid"
                        variant="ghost"
                        @click="$emit('close')"
                    />
                </div>
            </template>
            <DashboardCategoryAddNewForm
                :inputData="inputData"
                @close="$emit('close')"
            />
        </UCard>
    </UModal>
</template>
