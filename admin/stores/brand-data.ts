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

  const getBrandById = async (id: string): Promise<void> => {
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
  };
  return {
    brand,
    brands,
    getAllBrands,
    getBrandById,
  };
});