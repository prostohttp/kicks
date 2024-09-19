import { useOptionDataStore } from "./option-data";
import type { IArticle } from "~/pages/dashboard/articles/index.vue";
import type {
  ProductDto,
  ProductOptionDto,
} from "~/pages/dashboard/products/product.dto";
import { ModelNamesForSearchEngine } from "~/types/server/server.types";

export interface ProductsPayload {
  products: ProductDto[];
  pagesInPagination?: number;
  allItems: number;
  activePage?: number;
}

export const useProductDataStore = defineStore("productData", () => {
  // store
  const optionDataStore = useOptionDataStore();
  const { optionsWithoutPagination } = storeToRefs(optionDataStore);

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
  const deleteNonExistingOptions = async (
    ids: string[],
    products: ProductDto[],
  ) => {
    try {
      for (const product of products) {
        if (product.options && product.options.length) {
          const newOptions: ProductOptionDto[] = [];
          for (const option of product.options) {
            if (!ids.includes(option.optionId)) {
              newOptions.push(option);
            }
          }
          await $fetch("/api/product/edit", {
            method: "PUT",
            body: {
              _id: product._id,
              options: newOptions,
            },
          });
        }
      }
    } catch (error: any) {
      throw createError({ statusMessage: error.message });
    }
  };

  const deleteNonExistingOptionsValue = async (products: ProductDto[]) => {
    try {
      await optionDataStore.getAllOptionsWithoutPagination();
      const existingOptionValues: string[] = [];

      optionsWithoutPagination.value?.map((option) => {
        if (option.values && option.values.length) {
          for (const value of option.values) {
            existingOptionValues.push(value._id);
          }
        }
      });

      for (const product of products) {
        if (product.options && product.options.length) {
          const newOptions: ProductOptionDto[] = [];

          for (let i = 0; i < product.options.length; i++) {
            const option = product.options[i];
            if (option.values && option.values.length) {
              const newValues = [];
              for (const optionValue of option.values) {
                if (existingOptionValues.includes(optionValue.valueId)) {
                  newValues.push(optionValue);
                }
              }
              option.values = newValues;
            }
            newOptions.push(option);
          }
          await $fetch("/api/product/edit", {
            method: "PUT",
            body: {
              _id: product._id,
              options: newOptions,
            },
          });
        }
      }
    } catch (error: any) {
      throw createError({ statusMessage: error.message });
    }
    return true;
  };

  const getProductById = async (id: string) => {
    try {
      product.value = await $fetch("/api/product/one", {
        method: "GET",
        query: {
          id,
        },
      });
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

  const searchProduct = async (search: string, limit: number, page: number) => {
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
  return {
    product,
    foundedProducts,
    allProducts,
    products,
    productsForCount,
    titles,
    selected,
    getProductById,
    getTitles,
    getAllProducts,
    getAllProductsWithoutPagination,
    getProductCount,
    searchProduct,
    clearFoundedProducts,
    deleteNonExistingOptions,
    deleteNonExistingOptionsValue,
  };
});
