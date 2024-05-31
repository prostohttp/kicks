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

  // handlers
  const getAllBrands = async (page: number): Promise<void> => {
    try {
      brands.value = await $fetch("/api/brand/all", {
        method: "GET",
        query: {
          page,
        },
      });
    } catch (error: any) {
      throw createError({ statusMessage: error.message });
    }
  };

  const getBrandById = async (id: string): Promise<BrandDto> => {
    try {
      return await $fetch("/api/brand/one", {
        method: "GET",
        body: {
          id,
        },
      });
    } catch (error: any) {
      throw createError({ statusMessage: error.message });
    }
  };
  return {
    brands,
    getAllBrands,
    getBrandById,
  };
});
