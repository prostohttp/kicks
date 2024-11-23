import { Constants } from "~/constants";
import isValidPaginationPage from "~/utils/is-valid-pagination-page";
import pageCount from "~/utils/page-count";

export default defineEventHandler(async (event) => {
    try {
        const query = getQuery(event);
        const page = Number(query.page) || 1;
        const sales = query.sales;
        const perPage = Number(query.perPage) || Constants.PER_PAGE_ORDER;
        const orders = await Order.find().populate({
            path: "products.productId",
            select: "title quantity regularPrice salePrice",
        });
        const ordersLength = orders.length;
        const pagesInPagination = pageCount(ordersLength, perPage);

        if (sales) {
            return (await Order.find({}, "products -_id")) || [];
        }

        if (
            isValidPaginationPage(
                page,
                pagesInPagination,
                ordersLength,
                perPage,
            )
        ) {
            return {
                orders,
                pagesInPagination: 0,
            };
        }

        const skip = page * perPage - perPage;

        const orderInPage = await Order.find()
            .populate({
                path: "products.productId",
                select: "title quantity regularPrice salePrice",
            })
            .skip(skip)
            .limit(perPage);
        return {
            orders: orderInPage,
            pagesInPagination,
            activePage: page,
        };
    } catch (error: any) {
        throw createError({
            statusMessage: error.message,
        });
    }
});
