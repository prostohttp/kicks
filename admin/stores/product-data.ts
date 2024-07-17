import type { IArticle } from "~/pages/dashboard/articles/index.vue";
import type { ProductDto } from "~/server/api/product/dto/product.dto";

export const useProductDataStore = defineStore("productData", () => {
  interface ProductsPayload {
    products: ProductDto[];
    pagesInPagination?: number;
    allItems: number;
    activePage?: number;
  }
  // vars
  const products: Ref<ProductsPayload | undefined> = ref();
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
          id: id,
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
      products.value = await $fetch("/api/product/all", {
        method: "GET",
        query: {
          page,
          category,
          perPage,
        },
      });
    } catch (error: any) {
      throw createError({ statusMessage: error.message });
    }
    return true;
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
    products,
    productsForCount,
    titles,
    selected,
    getProductById,
    getTitles,
    getAllProducts,
    getProductCount,
  };
});
