<script lang="ts" setup>
import { Constants } from "~/constants";
import { locale } from "~/lang/locale";
import type { ProductDto } from "~/server/api/product/dto/product.dto";
import { useStatsDataStore } from "~/stores/stats-data";
import type { TitleObjectAfterPopulate } from "~/types/server/server.types";
import type { BreadcrumbItem } from "~/types/ui/ui.types";
import unwrapAfterPopulate from "~/utils/unwrap-after-populate";

// store
const productDataStore = useProductDataStore();
const categoryDataStore = useCategoryDataStore();
const settingsDataStore = useSettingsDataStore();
const statsDataStore = useStatsDataStore();
const { products: data } = storeToRefs(productDataStore);

await useAsyncData(() => statsDataStore.getSaleProducts());
await useAsyncData(() => settingsDataStore.getSettings());
const { saleProducts } = storeToRefs(statsDataStore);

// vars
const route = useRoute();
const router = useRouter();
const toast = useToast();
const routeCategory = route.query.category;
const path = router.currentRoute.value.path;
const category = ref(routeCategory?.toString());
await useAsyncData(() => categoryDataStore.getCategoryById(category.value));
const fullPath = computed(() =>
    !categoryDataStore.category ? path : `${path}/${category.value}`,
);
const links: Ref<BreadcrumbItem[]> = ref(
    !categoryDataStore.category
        ? breadcrumbsArrayFactory(path)
        : breadcrumbsArrayFactory(
              fullPath.value,
              categoryDataStore.category.title,
              `${path}?category=${category.value}`,
          ),
);
await useAsyncData<ProductsPayload>(() =>
    productDataStore.getAllProducts(Number(route.query.page), category.value),
);
const activePage = ref(data.value?.activePage || 1);

// handlers
const getSales = (id: string) => {
    if (saleProducts.value && id in saleProducts.value) {
        return saleProducts.value[id];
    } else {
        return 0;
    }
};
const pageTitle = computed(() =>
    categoryDataStore.category?.title
        ? `${categoryDataStore.category?.title} | ${locale[settingsDataStore.locale].breadcrumbs.products}`
        : locale[settingsDataStore.locale].breadcrumbs.products,
);

const deleteProduct = async (id: string) => {
    try {
        await $fetch("/api/product/remove", {
            method: "DELETE",
            body: {
                id,
            },
        });
        await productDataStore.getProductCount();
        await productDataStore.getAllProducts(activePage.value, category.value);
        toast.add({
            title: locale[settingsDataStore.locale].deleteProductSuccess,
        });
    } catch (error: any) {
        toast.add({ title: error.message });
    }
};

// meta
definePageMeta({
    name: "all-products",
});
useHead({
    title: pageTitle,
});

// hooks
watch(
    () => route.query,
    async (newValue, oldValue) => {
        if (!newValue.category || newValue.category !== oldValue.category) {
            category.value = newValue.category
                ? newValue.category.toString()
                : "";
            await categoryDataStore.getCategoryById(category.value);
        }
        links.value = breadcrumbsArrayFactory(
            fullPath.value,
            categoryDataStore.category?.title,
            `${path}?category=${category.value}`,
        );
        productDataStore.getAllProducts(
            Number(newValue.page),
            newValue.category?.toString(),
        );
        activePage.value = Number(newValue.page);
    },
);

watch(activePage, async (newValue) => {
    router.push({ query: { ...route.query, page: newValue || 1 } });
});
</script>

<template>
    <div
        class="flex justify-between items-center sm:flex-row flex-col gap-0 md:gap-[15px]"
    >
        <DashboardBreadcrumbs
            :links="links"
            :title="
                categoryDataStore.category?.title
                    ? categoryDataStore.category.title
                    : locale[settingsDataStore.locale].breadcrumbs.products
            "
        />
        <UButton
            :label="locale[settingsDataStore.locale].addNewProduct"
            class="h-[48px] px-[26px] py-[10px] flex justify-center items-center uppercase font-[600] shadow-none bg-dark-gray rounded-[8px] hover:bg-dark-gray dark:bg-yellow dark:hover:bg-yellow mb-[24px] hover:text-fa-white dark:hover:text-dark-gray"
            icon="i-heroicons-plus-circle"
            to="/dashboard/products/new"
        />
    </div>
    <main class="flex flex-col">
        <UiEmpty v-if="!data?.allItems" />
        <div v-else class="grid xl:grid-cols-3 md:grid-cols-1 gap-[14px]">
            <DashboardProductCard
                v-for="product in data?.products"
                :key="product._id"
                :categories="
                    unwrapAfterPopulate(
                        product.category as unknown as TitleObjectAfterPopulate[],
                    )
                "
                :product="product as ProductDto"
                :sales="getSales(product._id!)"
                @delete-product="deleteProduct"
            />
        </div>
    </main>
    <LazyUiPagination
        v-if="data?.pagesInPagination"
        v-model="activePage"
        :all-items="data?.allItems"
        :element-in-page="Constants.PER_PAGE_PRODUCT"
    />
</template>
