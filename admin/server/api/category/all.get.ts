import isValidPaginationPage from "~/utils/is-valid-pagination-page";
import pageCount from "~/utils/page-count";
import { CategoryDto } from "~/server/api/category/dto/category.dto";

export default defineEventHandler(async (event) => {
  try {
    let query = getQuery(event);
    const page = Number(query.page);
    const perPage = Number(query.perPage);
    const categories: CategoryDto[] = await Category.find();
    const catLength = categories.length;
    const pagesInPagination = pageCount(catLength, perPage);

    if (isValidPaginationPage(page, pagesInPagination, catLength, perPage)) {
      return {
        categories,
        pagesInPagination: 0,
      };
    }

    const skip = page * perPage - perPage;

    const catInPage = await Category.find().skip(skip).limit(perPage);
    return {
      categories: catInPage,
      pagesInPagination,
      activePage: page,
    };
  } catch (error: any) {
    throw createError({
      statusMessage: error.message,
    });
  }
});
