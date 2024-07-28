import type { BannerDto } from "~/server/api/banner/dto/banner.dto";

interface BannerPayload {
  banners: BannerDto[];
  pagesInPagination?: number;
  allItems: number;
  activePage?: number;
}
export const useBannerDataStore = defineStore("bannerData", () => {
  // vars
  const banner: Ref<BannerDto | undefined> = ref();
  const banners: Ref<BannerPayload | undefined> = ref();

  // handlers
  const getBannerById = async (id: string) => {
    try {
      banner.value = await $fetch("/api/banner/one", {
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

  const getAllBanners = async (page: number) => {
    try {
      banners.value = await $fetch("/api/banner/all", {
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

  const addNewBanner = async (data: BannerDto) => {};

  const deleteBanner = async (id: string) => {};

  return {
    banner,
    banners,
    getBannerById,
    getAllBanners,
    addNewBanner,
    deleteBanner,
  };
});
