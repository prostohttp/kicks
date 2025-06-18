<script lang="ts" setup>
import type { ModelRef } from "vue";
import { locale } from "~/lang/locale";
import pageCount from "~/utils/page-count";

// define
const { allItems, elementInPage } = defineProps<{
    allItems: number | undefined;
    elementInPage: number | undefined;
}>();

// store
const settingsDataStore = useSettingsDataStore();

// vars
const activePage: ModelRef<number | undefined> = defineModel();

// hooks
</script>

<template>
    <div class="mt-auto pt-[25px] mb-[30px]">
        <UPagination
            v-model="activePage!"
            :active-button="{
                inactiveClass: 'pagination-active',
            }"
            :max="elementInPage"
            :next-button="{
                icon: 'i-heroicons-chevron-right-20-solid',
                label: locale[settingsDataStore.locale].next,
                trailing: true,
                inactiveClass:
                    activePage !== pageCount(allItems!, elementInPage!)
                        ? 'pagination-prev-next'
                        : 'hidden',
            }"
            :page-count="elementInPage"
            :prev-button="{
                icon: 'i-heroicons-chevron-left-20-solid',
                label: locale[settingsDataStore.locale].prev,
                inactiveClass:
                    activePage !== 1 ? 'pagination-prev-next' : 'hidden',
            }"
            :total="allItems!"
            :ui="{
                base: 'dark:bg-transparent dark:border-grey bg-transparent ring-0 border border-dark-gray px-[15px] hover:bg-dark-gray hover:text-fa-white dark:hover:bg-yellow dark:hover:border-yellow dark:hover:text-dark-gray',
                wrapper: 'gap-[16px]',
                rounded: 'rounded-[8px]',
            }"
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
