import isValidPaginationPage from "~/utils/is-valid-pagination-page";
import pageCount from "~/utils/page-count";

export default defineEventHandler(async (event) => {
    try {
        const query = getQuery(event);
        const page = Number(query.page);
        const perPage = Number(query.perPage);
        const shipping = await Shipping.find();
        const shippingLength = shipping.length;
        const pagesInPagination = pageCount(shippingLength, perPage);

        if (
            isValidPaginationPage(
                page,
                pagesInPagination,
                shippingLength,
                perPage,
            )
        ) {
            return {
                shipping,
                pagesInPagination: 0,
            };
        }

        const skip = page * perPage - perPage;

        const shippingInPage = await Shipping.find().skip(skip).limit(perPage);
        return {
            shipping: shippingInPage,
            pagesInPagination,
            activePage: page,
        };
    } catch (error: any) {
        throw createError({
            statusMessage: error.message,
        });
    }
});
