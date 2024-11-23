import type { BrandDto } from "~/server/api/brand/dto/brand.dto";

interface BrandsPayload {
    brands: BrandDto[];
    pagesInPagination?: number;
    allItems: number;
    activePage?: number;
}

export const useBrandDataStore = defineStore("brandData", () => {
    // vars
    const brands: Ref<BrandsPayload | undefined> = ref();
    const brand: Ref<BrandDto | undefined> = ref();
    const titles: Ref<
        Array<{
            _id: string;
            title: string;
        }>
    > = ref([]);

    // handlers
    const getAllBrands = async (page: number): Promise<void> => {
        try {
            brands.value = await $fetch("/api/brand/all", {
                method: "GET",
                query: {
                    page: page || 1,
                },
            });
        } catch (error: any) {
            throw createError({ statusMessage: error.message });
        }
    };

    const getAllTitles = async () => {
        try {
            titles.value = await $fetch("/api/brand/all", {
                method: "GET",
                query: {
                    titles: true,
                },
            });
        } catch (error: any) {
            throw createError({ statusMessage: error.message });
        }
    };

    const getBrandById = async (id?: string) => {
        if (id) {
            try {
                brand.value = await $fetch("/api/brand/one", {
                    method: "GET",
                    query: {
                        id,
                    },
                });
            } catch (error: any) {
                throw createError({ statusMessage: error.message });
            }
        }
        return true;
    };

    const getBrandByTitle = async (title: string) => {
        try {
            brand.value = await $fetch("/api/brand/one", {
                method: "GET",
                query: {
                    title,
                },
            });
        } catch (error: any) {
            throw createError({ statusMessage: error.message });
        }
        return true;
    };

    return {
        brand,
        brands,
        titles,
        getAllTitles,
        getAllBrands,
        getBrandByTitle,
        getBrandById,
    };
});
