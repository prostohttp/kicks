import { Option } from "#imports";
import { Constants } from "~/constants";
import isValidPaginationPage from "~/utils/is-valid-pagination-page";
import pageCount from "~/utils/page-count";

export default defineEventHandler(async (event) => {
  try {
    let query = getQuery(event);
    const page = Number(query.page) || 1;
    const perPage = Number(query.perPage) || Constants.PER_PAGE_OPTION;
    const options = await Option.find();
    const optionsLength = options.length;
    const pagesInPagination = pageCount(optionsLength, perPage);

    if (
      isValidPaginationPage(page, pagesInPagination, optionsLength, perPage)
    ) {
      return {
        options,
        pagesInPagination: 0,
        allItems: optionsLength,
      };
    }

    const skip = page * perPage - perPage;

    const optioneInPage = await Option.find().skip(skip).limit(perPage);
    return {
      options: optioneInPage,
      pagesInPagination,
      activePage: page,
      allItems: optionsLength,
    };
  } catch (error: any) {
    throw createError({
      statusMessage: error.message,
    });
  }
});