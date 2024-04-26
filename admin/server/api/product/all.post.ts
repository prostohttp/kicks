import isValidPaginationPage from "~/utils/is-valid-pagination-page";
import pageCount from "~/utils/page-count";

export default defineEventHandler(async (event) => {
	try {
		let body = await readBody(event);
		const limit = body.perPage;
		const products = await Product.find();
		const productsLength = products.length;
		const pagesInPagination = pageCount(productsLength, limit);

		if (
			isValidPaginationPage(body.page, pagesInPagination, productsLength, limit)
		) {
			return {
				products,
				pagesInPagination: 0,
			};
		}

		const skip = body.page * limit - limit;

		const catInPage = await Product.find().skip(skip).limit(limit);
		return {
			products: catInPage,
			pagesInPagination,
			activePage: body.page,
		};
	} catch (error: any) {
		throw createError({
			statusMessage: error.message,
		});
	}
});
