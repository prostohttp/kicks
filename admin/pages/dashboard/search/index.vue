<script lang="ts" setup>
import { type BreadcrumbItem } from "~/types/ui/ui.types";
import { locale } from "~/lang/locale";
import { Constants } from "~/constants";
import unwrapAfterPopulate from "~/utils/unwrap-after-populate";
import type { ProductDto } from "~/server/api/product/dto/product.dto";
import type { TitleObjectAfterPopulate } from "~/types/server/server.types";

// store
const statsDataStore = useStatsDataStore();
const settingsDataStore = useSettingsDataStore();
const productDataStore = useProductDataStore();
await useAsyncData(() => statsDataStore.getSaleProducts());
const { saleProducts } = storeToRefs(statsDataStore);

// vars
const toast = useToast();
const router = useRouter();
const route = useRoute();
const page = Number(useRoute().query.page);
const searchPhrase = ref(route.query.searchPhrase);
const path = router.currentRoute.value.path;
const links: Ref<BreadcrumbItem[]> = ref(
    !searchPhrase.value
        ? breadcrumbsArrayFactory(
              path,
              locale[settingsDataStore.locale].searchResult,
              path,
          )
        : breadcrumbsArrayFactory(
              path,
              searchPhrase.value.toString(),
              `${path}?searchPhrase=${searchPhrase.value}`,
          ),
);

const { foundedProducts } = storeToRefs(productDataStore);
const activePage = ref(page || foundedProducts.value?.activePage || 1);
await useAsyncData(() =>
    productDataStore.searchProduct(
        searchPhrase.value!.toString(),
        Constants.PER_PAGE_SEARCH,
        activePage.value,
    ),
);

// handlers
const title = computed(() =>
    searchPhrase.value
        ? `${locale[settingsDataStore.locale].search} | ${searchPhrase.value}`
        : locale[settingsDataStore.locale].search,
);

const getSales = (id: string) => {
    if (saleProducts.value && id in saleProducts.value) {
        return saleProducts.value[id];
    } else {
        return 0;
    }
};

const deleteProduct = async (id: string) => {
    try {
        await $fetch("/api/product/remove", {
            method: "DELETE",
            body: {
                id,
            },
        });
        await productDataStore.searchProduct(
            searchPhrase.value!.toString(),
            Constants.PER_PAGE_SEARCH,
            activePage.value,
        );
        toast.add({
            title: locale[settingsDataStore.locale].deleteProductSuccess,
        });
    } catch (error: any) {
        toast.add({ title: error.message });
    }
};

// meta
useHead({ title });

// hooks
watch(
    () => route.query,
    async (newValue, oldValue) => {
        if (
            newValue.searchPhrase !== oldValue.searchPhrase &&
            newValue.searchPhrase
        ) {
            links.value = breadcrumbsArrayFactory(
                path,
                newValue.searchPhrase.toString(),
                `${path}?searchPhrase=${newValue.searchPhrase}`,
            );
            searchPhrase.value = newValue.searchPhrase;
        } else {
            await productDataStore.searchProduct(
                searchPhrase.value!.toString(),
                Constants.PER_PAGE_SEARCH,
                activePage.value,
            );
        }

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
            :title="locale[settingsDataStore.locale].search"
        />
    </div>
    <main class="flex flex-col">
        <UiEmpty v-if="!foundedProducts?.allItems" />
        <div v-else class="grid xl:grid-cols-3 md:grid-cols-1 gap-[14px]">
            <DashboardProductCard
                v-for="product in foundedProducts?.products"
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
        v-if="foundedProducts?.pagesInPagination"
        v-model="activePage"
        :all-items="foundedProducts?.allItems"
        :element-in-page="Constants.PER_PAGE_SEARCH"
    />
</template>
