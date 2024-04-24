import { Constants } from "~/constants";
import pageCount from "~/utils/page-count";

export default defineEventHandler(async (event) => {
	try {
		let body = await readBody(event);
		const limit = Constants.PER_PAGE_CAT;
		const categories = await Category.find();
		const catLength = categories.length;
		const pagesInPagination = pageCount(catLength, limit);

		if (!body) {
			return { categories, pagesInPagination: 0 };
		}

		if (body.page > pagesInPagination) {
			body.page = pagesInPagination;
		}
		const skip = body.page * limit - limit;

		const catInPage = await Category.find().skip(skip).limit(limit);
		return { categories: catInPage, pagesInPagination, activePage: body.page };
	} catch (error: any) {
		return createError({
			statusMessage: error.message,
		});
	}
});
