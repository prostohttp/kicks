import { Option } from "#imports";
import isValidPaginationPage from "~/utils/is-valid-pagination-page";
import pageCount from "~/utils/page-count";

export default defineEventHandler(async (event) => {
	try {
		const query = getQuery(event);
		const page = Number(query.page);
		const perPage = Number(query.perPage);
		const options = await Option.find();
		const optionLength = options.length;
		const pagesInPagination = pageCount(optionLength, perPage);

		if (isValidPaginationPage(page, pagesInPagination, optionLength, perPage)) {
			return {
				options: options,
				pagesInPagination: 0,
			};
		}

		const skip = page * perPage - perPage;

		const optionsInPage = await Brand.find().skip(skip).limit(perPage);
		return {
			options: optionsInPage,
			pagesInPagination,
			activePage: page,
		};
	} catch (error: any) {
		throw createError({
			statusMessage: error.message,
		});
	}
});
