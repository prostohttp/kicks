import type { CategoryDto } from "~/server/api/category/dto/category.dto";

interface CategoriesPayload {
  categories: CategoryDto[];
  pagesInPagination?: number;
  allItems: number;
  activePage?: number;
}

export const useCategoryDataStore = defineStore("categoryData", () => {
  // vars
  const categories: Ref<CategoriesPayload | undefined> = ref();
  const category: Ref<CategoryDto | undefined> = ref();

  // handlers
  const getAllCategories = async (page: number): Promise<void> => {
    try {
      categories.value = await $fetch("/api/category/all", {
        method: "GET",
        query: {
          page,
        },
      });
    } catch (error: any) {
      throw createError({ statusMessage: error.message });
    }
  };

  const getCategoryById = async (id: string): Promise<void> => {
    try {
      category.value = await $fetch("/api/category/one", {
        method: "GET",
        query: {
          id,
        },
      });
    } catch (error: any) {
      throw createError({ statusMessage: error.message });
    }
  };
  return {
    category,
    categories,
    getAllCategories,
    getCategoryById,
  };
});
