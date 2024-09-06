import type { IArticle } from "~/pages/dashboard/articles/index.vue";
import type { ProductDto } from "~/pages/dashboard/products/product.dto";
import { ModelNamesForSearchEngine } from "~/types/server/server.types";

export interface ProductsPayload {
  products: ProductDto[];
  pagesInPagination?: number;
  allItems: number;
  activePage?: number;
}

export const useProductDataStore = defineStore("productData", () => {
  // vars
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

  const addNewValue = (optionId: number) => {
    const id = Date.now();
    const index = product.value?.options!.findIndex(
      (opt) => opt.id === optionId,
    );
    console.log("index", product.value);

    // if (index && index !== -1) {
    //   product.value?.options![index].values?.unshift({
    //     id: id,
    //     value: "",
    //     price: undefined,
    //     count: undefined,
    //   });
    // }
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
    products,
    productsForCount,
    titles,
    selected,
    addNewValue,
    getProductById,
    getTitles,
    getAllProducts,
    getProductCount,
    searchProduct,
    clearFoundedProducts,
  };
});
