import isValidPaginationPage from "~/utils/is-valid-pagination-page";
import pageCount from "~/utils/page-count";

export default defineEventHandler(async (event) => {
	try {
		let body = await readBody(event);
		const limit = body.perPage;
		const brands = await Brand.find();
		const brandLength = brands.length;
		const pagesInPagination = pageCount(brandLength, limit);

		if (
			isValidPaginationPage(body.page, pagesInPagination, brandLength, limit)
		) {
			return {
				brands,
				pagesInPagination: 0,
			};
		}

		const skip = body.page * limit - limit;

		const catInPage = await Brand.find().skip(skip).limit(limit);
		return {
			brands: catInPage,
			pagesInPagination,
			activePage: body.page,
		};
	} catch (error: any) {
		throw createError({
			statusMessage: error.message,
		});
	}
});
