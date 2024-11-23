import type { BannerDto } from "~/server/api/banner/dto/banner.dto";

interface BannerPayload {
    banners: BannerDto[];
    pagesInPagination?: number;
    allItems: number;
    activePage?: number;
}
export const useBannerDataStore = defineStore("bannerData", () => {
    // vars
    const banner: BannerDto = reactive({
        title: "",
        banners: [],
    });
    const banners: Ref<BannerPayload | undefined> = ref();

    // handlers
    const getBannerById = async (id: string) => {
        try {
            const rawBanner = await $fetch<BannerDto>("/api/banner/one", {
                method: "GET",
                query: {
                    id,
                },
            });
            banner._id = rawBanner._id;
            banner.title = rawBanner.title;
            banner.banners = rawBanner.banners;
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

    const addNewBanner = () => {};

    const deleteBanner = async (id: string) => {
        try {
            banners.value = await $fetch("/api/banner/remove", {
                method: "DELETE",
                body: {
                    id,
                },
            });
        } catch (error: any) {
            throw createError({ statusMessage: error.message });
        }
    };

    const clearBanner = () => {
        banner.title = "";
        banner.banners = [];
    };

    return {
        banner,
        banners,
        getBannerById,
        getAllBanners,
        addNewBanner,
        deleteBanner,
        clearBanner,
    };
});
