import isValidPaginationPage from "~/utils/is-valid-pagination-page";
import pageCount from "~/utils/page-count";

export default defineEventHandler(async (event) => {
    try {
        const query = getQuery(event);
        const page = Number(query.page);
        const perPage = Number(query.perPage);
        const payment = await Payment.find();
        const paymentLength = payment.length;
        const pagesInPagination = pageCount(paymentLength, perPage);

        if (
            isValidPaginationPage(
                page,
                pagesInPagination,
                paymentLength,
                perPage,
            )
        ) {
            return {
                payment,
                pagesInPagination: 0,
            };
        }

        const skip = page * perPage - perPage;

        const paymentInPage = await Payment.find().skip(skip).limit(perPage);
        return {
            payment: paymentInPage,
            pagesInPagination,
            activePage: page,
        };
    } catch (error: any) {
        throw createError({
            statusMessage: error.message,
        });
    }
});
