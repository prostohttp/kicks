<script lang="ts" setup>
import { DashboardBrandAddNewModal } from "#components";
import { Constants } from "~/constants";
import { locale } from "~/lang/locale";
import { useBrandDataStore } from "~/stores/brand-data";
import type { BreadcrumbItem } from "~/types/ui/ui.types";
import { addQuery } from "~/utils/add-query";

// store
const brandsDataStore = useBrandDataStore();
const settingsDataStore = useSettingsDataStore();
const { brands: data } = storeToRefs(brandsDataStore);

// vars
const route = useRoute();
const router = useRouter();
const modal = useModal();
const page = Number(useRoute().query.page);
const path = router.currentRoute.value.path;
const links: Ref<BreadcrumbItem[]> = ref(breadcrumbsArrayFactory(path));

// handlers
await brandsDataStore.getAllBrands(page);
const activePage = ref(data.value?.activePage || 1);

const openAddNewBrandModal = () => {
    modal.open(DashboardBrandAddNewModal, {
        onClose() {
            removeQuery("brandNew");
            modal.close();
        },
    });
};

// meta

useHead({
    title: locale[settingsDataStore.locale].allBrands,
});

// Hooks
watch(
    () => route.query,
    (newValue) => {
        if (!newValue.page) {
            activePage.value = 1;
        }
    },
);

watch(activePage, async (newValue) => {
    await router.push({ query: { ...route.query, page: newValue || 1 } });
    await brandsDataStore.getAllBrands(newValue!);
});

onMounted(() => {
    if (route.query.brandNew) {
        openAddNewBrandModal();
    }
});
</script>

<template>
    <div
        class="flex justify-between items-center sm:flex-row flex-col gap-0 md:gap-[15px]"
    >
        <DashboardBreadcrumbs
            :links="links"
            :title="locale[settingsDataStore.locale].breadcrumbs.brands"
        />
        <UButton
            :label="locale[settingsDataStore.locale].addNewBrand"
            :to="addQuery('brandNew', 'yes')"
            class="h-[48px] px-[26px] py-[10px] flex justify-center items-center uppercase fon-[Rubik] font-[600] shadow-none bg-dark-gray rounded-[8px] hover:bg-dark-gray dark:bg-yellow dark:hover:bg-yellow mb-[24px] hover:text-fa-white dark:hover:text-dark-gray"
            icon="i-heroicons-plus-circle"
            @click="openAddNewBrandModal"
        />
    </div>
    <main class="flex flex-col">
        <UiEmpty v-if="!data?.allItems" />
        <div
            v-else
            class="grid 2xl:grid-cols-6 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 md:gap-[30px] gap-[15px]"
        >
            <DashboardBrandCard
                v-for="brand in data?.brands"
                :key="brand._id"
                :brand="brand"
            />
        </div>
    </main>
    <LazyUiPagination
        v-if="data?.pagesInPagination"
        v-model="activePage"
        :all-items="data?.allItems"
        :element-in-page="Constants.PER_PAGE_BRAND"
    />
</template>
