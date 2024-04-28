import isValidPaginationPage from "~/utils/is-valid-pagination-page";
import pageCount from "~/utils/page-count";

export default defineEventHandler(async (event) => {
	try {
		const query = getQuery(event);
		const page = Number(query.page);
		const perPage = Number(query.perPage);
		const orders = await Order.find().populate("products");
		const ordersLength = orders.length;
		const pagesInPagination = pageCount(ordersLength, perPage);

		if (isValidPaginationPage(page, pagesInPagination, ordersLength, perPage)) {
			return {
				orders,
				pagesInPagination: 0,
			};
		}

		const skip = page * perPage - perPage;

		const orderInPage = await Order.find()
			.populate("products")
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
