<script lang="ts" setup>
import { locale } from "~/lang/locale";
import type { OptionDtoWithValues } from "~/server/api/option/dto/option.dto";
import type { BreadcrumbItem } from "~/types/ui/ui.types";

// store
const optionDataStore = useOptionDataStore();
const settingsDataStore = useSettingsDataStore();
await useAsyncData(() =>
    optionDataStore.getOption(
        useRoute("dashboard-options-option").params.option.toString(),
    ),
);
const { option } = storeToRefs(optionDataStore);
const { data: optionValues } = await useAsyncData(() =>
    optionDataStore.getValuesById(
        option.value!.values!.map((item) => item._id!),
    ),
);

// vars
const state: OptionDtoWithValues = reactive({
    ...option.value!,
    values: optionValues.value!,
});

const router = useRouter();
const fullPath = router.currentRoute.value.fullPath;
const links: Ref<BreadcrumbItem[]> = ref(
    breadcrumbsArrayFactory(fullPath, option.value?.title, fullPath),
);
const isAdmin = checkIsAdmin();
const isSubmit = ref(false);
const title = ref(
    option.value?.title || locale[settingsDataStore.locale].empty,
);
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
const submitHandler = () => {
    isSubmit.value = true;
};

// meta
useHead({
    title: title,
});

// hooks
watch(option, (newValue, oldValue) => {
    if (newValue?.title !== oldValue?.title) {
        title.value = newValue?.title || locale[settingsDataStore.locale].empty;
        links.value = breadcrumbsArrayFactory(
            fullPath,
            newValue?.title,
            fullPath,
        );
    }
    if (!newValue?.values?.length) {
        state.values = [];
    }
});
</script>

<template>
    <div
        class="flex justify-between items-center sm:flex-row flex-col gap-0 md:gap-[15px]"
    >
        <DashboardBreadcrumbs :links="links" :title="title" />
        <UButton
            v-if="option && isAdmin"
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
            <UiEmpty v-if="!state._id" />
            <DashboardOptionEditForm
                v-else
                v-model:state="state"
                v-model:submit="isSubmit"
                :optionData="optionData"
            />
        </div>
    </main>
</template>
