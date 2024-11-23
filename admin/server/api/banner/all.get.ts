import { Constants } from "~/constants";
import isValidPaginationPage from "~/utils/is-valid-pagination-page";
import pageCount from "~/utils/page-count";

export default defineEventHandler(async (event) => {
    try {
        const query = getQuery(event);
        const page = Number(query.page) || 1;
        const perPage = Number(query.perPage) || Constants.PER_PAGE_BANNERS;
        const banner = await Banner.find();
        const bannerLength = banner.length;
        const pagesInPagination = pageCount(bannerLength, perPage);

        if (
            isValidPaginationPage(
                page,
                pagesInPagination,
                bannerLength,
                perPage,
            )
        ) {
            return {
                banners: banner,
                pagesInPagination: 0,
                allItems: bannerLength,
            };
        }

        const skip = page * perPage - perPage;

        const bannerInPage = await Banner.find().skip(skip).limit(perPage);
        return {
            banners: bannerInPage,
            pagesInPagination,
            activePage: page,
            allItems: bannerLength,
        };
    } catch (error: any) {
        throw createError({
            statusMessage: error.message,
        });
    }
});
