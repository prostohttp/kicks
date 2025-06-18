<script lang="ts" setup>
import type { AccordionItem } from "~/types/ui/ui.types";
import { locale } from "~/lang/locale";
import { Constants } from "~/constants";

// store
const categoryDataStore = useCategoryDataStore();
const settingsDataStore = useSettingsDataStore();
const productDataStore = useProductDataStore();
const { parentTitles } = storeToRefs(categoryDataStore);
const { locale: storeLocale } = storeToRefs(settingsDataStore);

// vars
const isOpenMobileSidebar = inject(Constants.PROVIDE_IS_OPEN_MOBILE_SIDEBAR);
const route = useRoute();
await categoryDataStore.getAllTitles();
const isActive = (id: string): boolean =>
    (route.query.category && route.query.category === id) as boolean;

// handlers
await useAsyncData(() => productDataStore.getProductCount());

const { productsForCount } = storeToRefs(productDataStore);

const computedProducts = computed(() => {
    return elementCountForId(productsForCount.value);
});

const items: Ref<AccordionItem[] | undefined> = ref([
    {
        label: locale[storeLocale.value].allCategories,
        defaultOpen: true,
        content: parentTitles.value,
    },
]);

// hooks
watch(
    () => locale[storeLocale.value].allCategories,
    (newValue) => {
        items.value![0].label = newValue;
    },
);
</script>

<template>
    <div class="mt-[48px] mb-[20px]">
        <UAccordion
            :items="items"
            :ui="{
                item: {
                    icon: 'scale-[1.1] i-heroicons-chevron-down-solid',
                },
                default: {
                    class: 'bg-transparent text-[20px] font-[Rubik] font-[500] text-dark-gray hover:bg-transparent p-0 pb-[10px] dark:bg-transparent dark:hover:bg-transparent dark:text-fa-white',
                },
            }"
        >
            <template #item="{ item }">
                <ul>
                    <DashboardSidebarCategoryItem
                        v-for="category in parentTitles"
                        :key="category._id"
                        :_id="category._id"
                        :count="
                            computedProducts[category._id]
                                ? computedProducts[category._id]
                                : 0
                        "
                        :is-active="isActive(category._id)"
                        :title="category.title"
                    />
                    <li
                        class="h-[35px] mt-[30px] flex justify-between items-center mb-[16px] border-t border-grey dark:border-[#70706e] pt-[25px]"
                    >
                        <NuxtLink
                            class="text-[16px] font-[600] text-dark-gray dark:text-fa-white"
                            to="/dashboard/categories?page=1"
                            @click="isOpenMobileSidebar = false"
                        >
                            {{ locale[storeLocale].allCategories }}
                        </NuxtLink>
                    </li>
                </ul>
            </template>
        </UAccordion>
    </div>
</template>
