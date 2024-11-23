import type { IArticle } from "~/pages/dashboard/articles/index.vue";
import type { ProductDto } from "~/server/api/product/dto/product.dto";
import { ModelNamesForSearchEngine } from "~/types/server/server.types";

export interface ProductsPayload {
    products: ProductDto[];
    pagesInPagination?: number;
    allItems: number;
    activePage?: number;
}

export const useProductDataStore = defineStore("productData", () => {
    // vars
    const allProducts: Ref<ProductDto[] | undefined> = ref();
    const products: Ref<ProductsPayload | undefined> = ref();
    const foundedProducts: Ref<ProductsPayload | undefined> = ref();
    const product: Ref<ProductDto | undefined> = ref();
    const productsForCount: Ref<
        { _id: string; category: string[] }[] | undefined
    > = ref();
    const selected: Ref<IArticle[]> = ref([]);
    const titles: Ref<
        Array<{
            _id: string;
            title: string;
        }>
    > = ref([]);

    // handlers
    const getProductById = async (id: string) => {
        try {
            const rawProduct: ProductDto = await $fetch("/api/product/one", {
                method: "GET",
                query: {
                    id,
                },
            });
            product.value = rawProduct;
        } catch (error: any) {
            throw createError({ statusMessage: error.message });
        }
        return true;
    };

    const getAllProducts = async (
        page: number,
        category?: string,
        perPage?: number,
    ) => {
        try {
            products.value = await $fetch<ProductsPayload>("/api/product/all", {
                method: "GET",
                query: {
                    page: page || 1,
                    category,
                    perPage,
                },
            });
        } catch (error: any) {
            throw createError({ statusMessage: error.message });
        }
        return products.value;
    };

    const getAllProductsWithoutPagination = async () => {
        try {
            allProducts.value = await $fetch<ProductDto[]>("/api/product/all", {
                method: "GET",
                query: {
                    all: true,
                },
            });
        } catch (error: any) {
            throw createError({ statusMessage: error.message });
        }
        return true;
    };

    const searchProduct = async (
        search: string,
        limit: number,
        page: number,
    ) => {
        foundedProducts.value = await $fetch("/api/search/all", {
            method: "GET",
            query: {
                searchModel: ModelNamesForSearchEngine.PRODUCT_WITH_PAGINATION,
                searchPhrase: search,
                limit,
                page,
            },
        });
        return true;
    };

    const clearFoundedProducts = () => {
        foundedProducts.value = {
            products: [],
            allItems: 0,
            activePage: undefined,
            pagesInPagination: undefined,
        };
    };

    const getProductCount = async () => {
        try {
            productsForCount.value = await $fetch("/api/product/all", {
                method: "GET",
                query: {
                    forCategoryCount: true,
                },
            });
        } catch (error: any) {
            throw createError({ statusMessage: error.message });
        }
        return true;
    };

    const getTitles = async () => {
        try {
            titles.value = await $fetch("/api/product/all", {
                method: "GET",
                query: {
                    titles: true,
                },
            });
        } catch (error: any) {
            throw createError({ statusMessage: error.message });
        }
    };

    const editProductById = async (data: ProductDto) => {
        try {
            await $fetch("/api/product/edit", {
                method: "PUT",
                body: data,
            });
        } catch (error: any) {
            throw createError({ statusMessage: error.message });
        }
    };

    const editProductsByOptionIds = async (optionIds: string[]) => {
        try {
            const products: ProductDto[] = await $fetch("/api/product/many", {
                method: "POST",
                body: { optionIds },
            });
            for (const product of products) {
                const resultProduct = {
                    ...product,
                    options: product.options!.filter((item) =>
                        optionIds.includes(item.optionValue._id!),
                    ),
                };
                await editProductById(resultProduct);
            }
        } catch (error: any) {
            throw createError({ statusMessage: error.message });
        }
    };

    const editProductsByOptionValueIds = async (ids: string[]) => {};

    return {
        product,
        foundedProducts,
        allProducts,
        products,
        productsForCount,
        titles,
        selected,
        getProductById,
        editProductById,
        getTitles,
        getAllProducts,
        getAllProductsWithoutPagination,
        getProductCount,
        searchProduct,
        clearFoundedProducts,
        editProductsByOptionIds,
        editProductsByOptionValueIds,
    };
});
