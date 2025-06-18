<script lang="ts" setup>
import { locale } from "~/lang/locale";
import type { BreadcrumbItem } from "~/types/ui/ui.types";

// store
const settingsDataStore = useSettingsDataStore();

// vars
const router = useRouter();
const fullPath = router.currentRoute.value.fullPath;
const links: Ref<BreadcrumbItem[]> = ref(breadcrumbsArrayFactory(fullPath));
const isSubmit = ref(false);
const optionData: InputData[] = [
    {
        label: locale[settingsDataStore.locale].title,
        name: "title",
        type: "text",
        placeholder: locale[settingsDataStore.locale].title,
    },
    {
        label: locale[settingsDataStore.locale].type,
        name: "type",
        type: "select",
        placeholder: locale[settingsDataStore.locale].typeText,
    },
    {
        label: locale[settingsDataStore.locale].sort,
        name: "sort",
        type: "number",
        placeholder: locale[settingsDataStore.locale].sort,
    },
];

// handlers
const submitHandler = async () => {
    isSubmit.value = true;
};

// meta
useHead({
    title: locale[settingsDataStore.locale].addNewOption,
});
</script>

<template>
    <div
        class="flex justify-between items-center sm:flex-row flex-col gap-0 md:gap-[15px]"
    >
        <DashboardBreadcrumbs
            :links="links"
            :title="locale[settingsDataStore.locale].addNewOption"
        />
        <UButton
            :label="locale[settingsDataStore.locale].save"
            class="h-[48px] px-[26px] py-[10px] flex justify-center items-center uppercase fon-[Rubik] font-[600] shadow-none bg-dark-gray rounded-[8px] hover:bg-dark-gray dark:bg-yellow dark:hover:bg-yellow mb-[24px] hover:text-fa-white dark:hover:text-dark-gray"
            icon="i-heroicons-clipboard-document-20-solid"
            @click="submitHandler"
        />
    </div>
    <main
        class="p-[24px] bg-white rounded-[16px] dark:bg-dark-gray dark:border border-[#70706e]"
    >
        <div class="flex lg:flex-row flex-col lg:gap-[35px] gap-[20px]">
            <DashboardOptionAddNewForm
                v-model="isSubmit"
                :optionData="optionData"
            />
        </div>
    </main>
</template>
