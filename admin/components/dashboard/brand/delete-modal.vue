<script lang="ts" setup>
import type { ModelRef } from "vue";
import { locale } from "~/lang/locale";

// define
const emit = defineEmits(["delete"]);

// store
const settingsDataStore = useSettingsDataStore();

// vars
const isOpen: ModelRef<boolean | undefined> = defineModel();

// handlers
const deleteBrand = () => {
    emit("delete");
    isOpen.value = false;
};
</script>

<template>
    <UModal
        v-model="isOpen"
        :transition="false"
        :ui="{
            overlay: {
                background:
                    'dark:bg-dark-gray bg-fa-white opacity-100 dark:opacity-100',
            },
            background: 'bg-fa-white',
        }"
        class="bg-fa-white opacity-100"
        prevent-close
    >
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
                        {{ locale[settingsDataStore.locale].deleteBrand }}
                    </h3>
                    <UButton
                        class="-my-1"
                        color="gray"
                        icon="i-heroicons-x-mark-20-solid"
                        variant="ghost"
                        @click="isOpen = false"
                    />
                </div>
            </template>
            <div class="flex flex-col gap-[20px]">
                <p class="dark:text-fa-white">
                    {{ locale[settingsDataStore.locale].deleteBrandText }}
                </p>
                <div class="flex gap-[10px] mt-auto justify-end">
                    <UButton
                        class="bg-dark-gray dark:bg-grey dark:text-dark-gray dark:hover:bg-grey dark:hover:text-dark-gray hover:bg-dark-bg uppercase"
                        @click="isOpen = false"
                    >
                        {{ locale[settingsDataStore.locale].cancel }}
                    </UButton>
                    <UButton
                        class="bg-danger hover:bg-danger uppercase dark:bg-danger dark:text-fa-white dark:hover:bg-danger dark:hover:text-fa-white"
                        @click="deleteBrand"
                    >
                        {{ locale[settingsDataStore.locale].deleteBrand }}
                    </UButton>
                </div>
            </div>
        </UCard>
    </UModal>
</template>
