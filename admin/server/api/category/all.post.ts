import { type CategoryDto } from "~/types";
import pageCount from "~/utils/page-count";

export default defineEventHandler(async (event) => {
	try {
		let body = await readBody(event);
		const limit = body.perPage;
		const categories: CategoryDto[] = await Category.find();
		const catLength = categories.length;
		const pagesInPagination = pageCount(catLength, limit);

		if (
			!body.page ||
			!Number.isInteger(Number(body.page)) ||
			body.page > pagesInPagination ||
			body.page <= 0
		) {
			return {
				categories,
				pagesInPagination: 0,
			};
		}

		const skip = body.page * limit - limit;

		const catInPage = await Category.find()
			.select(
				"_id title description isParent children productCount image isEnabled"
			)
			.skip(skip)
			.limit(limit);
		return {
			categories: catInPage,
			pagesInPagination,
			activePage: body.page,
		};
	} catch (error: any) {
		throw createError({
			statusMessage: error.message,
		});
	}
});
