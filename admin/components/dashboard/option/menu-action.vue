<script lang="ts" setup>
import { DashboardOptionDeleteModal } from "#components";
import { locale } from "~/lang/locale";
import type { IOption } from "~/pages/dashboard/options/index.vue";
import { useUploadDeleteDataStore } from "~/stores/upload-delete-data.js";

// define
const activePage = defineModel("activePage");

// vars
const modal = useModal();

// store
const optionDataStore = useOptionDataStore();
const settingsDataStore = useSettingsDataStore();
const { selected } = storeToRefs(optionDataStore);

// handlers
const openDeleteOptionModal = (options: IOption[]) => {
    modal.open(DashboardOptionDeleteModal, {
        options,
        onClose() {
            modal.close();
        },
        async onDelete() {
            optionDataStore.getAllOptions(1);
            activePage.value = 1;
            selected.value = [];
            modal.close();
        },
    });
};
</script>

<template>
    <UPopover
        v-if="selected?.length"
        :popper="{ placement: 'bottom-end', offsetDistance: 10 }"
        :ui="{
            rounded: 'rounded-[8px]',
            ring: 'ring-[#e7e7e3] ring-1',
            shadow: 'shadow-none',
            width: 'md:w-auto w-[calc(100%-20px)]',
            position: 'right-[10px] sm:right-auto',
        }"
        class="absolute top-[5px] right-0"
    >
        <UIcon
            class="cursor-pointer"
            name="i-heroicons-ellipsis-vertical-20-solid"
        />
        <template #panel>
            <ul class="p-4 flex flex-col gap-[10px]">
                <NuxtLink
                    class="cursor-pointer text-[16px] font-[400]"
                    @click="openDeleteOptionModal(selected)"
                >
                    {{ locale[settingsDataStore.locale].deleteOption }}
                </NuxtLink>
            </ul>
        </template>
    </UPopover>
</template>
