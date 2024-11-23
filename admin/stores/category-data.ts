import type { CategoryDto } from "~/server/api/category/dto/category.dto";
import type { ITable } from "~/pages/dashboard/categories/index.vue";
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
    const selected: Ref<ITable[]> = ref([]);
    const titles: Ref<
        Array<{
            _id: string;
            title: string;
        }>
    > = ref([]);
    const parentTitles: Ref<
        Array<{
            _id: string;
            title: string;
        }>
    > = ref([]);

    // handlers
    const getAllCategories = async (page: number) => {
        try {
            categories.value = await $fetch("/api/category/all", {
                method: "GET",
                query: {
                    page: page || 1,
                },
            });
        } catch (error: any) {
            throw createError({ statusMessage: error.message });
        }
        return true;
    };

    const getCategoryById = async (id: string | undefined) => {
        try {
            if (!id) {
                category.value = undefined;
            } else {
                category.value = await $fetch("/api/category/one", {
                    method: "GET",
                    query: {
                        id,
                    },
                });
            }
        } catch (error: any) {
            throw createError({ statusMessage: error.message });
        }
        return true;
    };

    const getAllTitles = async () => {
        try {
            titles.value = await $fetch("/api/category/all", {
                method: "GET",
                query: {
                    titles: true,
                },
            });
            parentTitles.value = await $fetch("/api/category/all", {
                method: "GET",
                query: {
                    parents: true,
                },
            });
            return true;
        } catch (error: any) {
            throw createError({ statusMessage: error.message });
        }
    };

    return {
        parentTitles,
        titles,
        selected,
        category,
        categories,
        getAllTitles,
        getAllCategories,
        getCategoryById,
    };
});
