<script lang="ts" setup>
import { locale } from "~/lang/locale";
import type { IOption } from "~/pages/dashboard/options/index.vue";

// define
const emit = defineEmits(["delete", "close"]);
const { options } = defineProps<{
    options: IOption[];
}>();

// store
const settingsDataStore = useSettingsDataStore();
const productDataStore = useProductDataStore();
const optionDataStore = useOptionDataStore();
await productDataStore.getAllProductsWithoutPagination();

// vars
const toast = useToast();

// handlers
const deleteOption = async () => {
    try {
        const ids = options.map((option) => option.id!);
        await optionDataStore.deleteOptions(ids);
        toast.add({
            title: locale[settingsDataStore.locale].successDeleteMessage,
            color: "green",
        });
        emit("delete");
    } catch (error: any) {
        toast.add({
            title: error.message,
            color: "red",
        });
    }
};
</script>

<template>
    <UModal :transition="false" class="bg-fa-white opacity-100" prevent-close>
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
                        {{ locale[settingsDataStore.locale].deleteOption }}
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
            <div class="flex flex-col gap-[20px]">
                <p class="dark:text-fa-white">
                    {{ locale[settingsDataStore.locale].deleteOptionText }}
                </p>
                <div class="flex gap-[10px] mt-auto justify-end">
                    <UButton
                        class="bg-dark-gray dark:bg-grey dark:text-dark-gray dark:hover:bg-grey dark:hover:text-dark-gray hover:bg-dark-bg uppercase"
                        @click="$emit('close')"
                    >
                        {{ locale[settingsDataStore.locale].cancel }}
                    </UButton>
                    <UButton
                        class="bg-danger hover:bg-danger uppercase dark:bg-danger dark:text-fa-white dark:hover:bg-danger dark:hover:text-fa-white"
                        @click="deleteOption"
                    >
                        {{ locale[settingsDataStore.locale].deleteOption }}
                    </UButton>
                </div>
            </div>
        </UCard>
    </UModal>
</template>
