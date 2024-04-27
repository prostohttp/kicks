import isValidPaginationPage from "~/utils/is-valid-pagination-page";
import pageCount from "~/utils/page-count";

export default defineEventHandler(async (event) => {
	try {
		let body = await readBody(event);
		const limit = body.perPage;
		const article = await Article.find();
		const articlesLength = article.length;
		const pagesInPagination = pageCount(articlesLength, limit);

		if (
			isValidPaginationPage(body.page, pagesInPagination, articlesLength, limit)
		) {
			return {
				article,
				pagesInPagination: 0,
			};
		}

		const skip = body.page * limit - limit;

		const articleInPage = await Category.find().skip(skip).limit(limit);
		return {
			categories: articleInPage,
			pagesInPagination,
			activePage: body.page,
		};
	} catch (error: any) {
		throw createError({
			statusMessage: error.message,
		});
	}
});
