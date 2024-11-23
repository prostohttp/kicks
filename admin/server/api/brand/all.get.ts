import { Constants } from "~/constants";
import isValidPaginationPage from "~/utils/is-valid-pagination-page";
import pageCount from "~/utils/page-count";

export default defineEventHandler(async (event) => {
    try {
        const query = getQuery(event);
        const titles = query.titles;
        const page = Number(query.page) || 1;
        const perPage = Number(query.perPage) || Constants.PER_PAGE_BRAND;
        const brands = await Brand.find();
        const brandLength = brands.length;
        const pagesInPagination = pageCount(brandLength, perPage);

        if (titles) {
            return await Brand.find().select("title");
        }

        if (
            isValidPaginationPage(page, pagesInPagination, brandLength, perPage)
        ) {
            return {
                brands,
                pagesInPagination: 0,
                allItems: brandLength,
            };
        }

        const skip = page * perPage - perPage;

        const brandInPage = await Brand.find().skip(skip).limit(perPage);
        return {
            brands: brandInPage,
            pagesInPagination,
            activePage: page,
            allItems: brandLength,
        };
    } catch (error: any) {
        throw createError({
            statusMessage: error.message,
        });
    }
});
