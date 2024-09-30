import { useOptionDataStore } from "./option-data";
import type { IArticle } from "~/pages/dashboard/articles/index.vue";
import type {
  ProductDto,
  ProductOptionDto,
} from "~/server/api/product/dto/product-page.dto";
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
  };
});
