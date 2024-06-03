import isValidPaginationPage from "~/utils/is-valid-pagination-page";
import pageCount from "~/utils/page-count";
import { CategoryDto } from "~/server/api/category/dto/category.dto";
import { Constants } from "~/constants";

export default defineEventHandler(async (event) => {
  try {
    let query = getQuery(event);
    const titles = query.titles;
    const parents = query.parents;
    const page = Number(query.page) || 1;
    const perPage = Number(query.perPage) || Constants.PER_PAGE_CATEGORY;
    const categories: CategoryDto[] = await Category.find();
    const catLength = categories.length;
    const pagesInPagination = pageCount(catLength, perPage);

    if (titles) {
      return await Category.find().select("title");
    }

    if (parents) {
      return await Category.find({ isParent: true }).select("title");
    }

    if (isValidPaginationPage(page, pagesInPagination, catLength, perPage)) {
      return {
        categories,
        pagesInPagination: 0,
        allItems: catLength,
      };
    }

    const skip = page * perPage - perPage;

    const catInPage = await Category.find().skip(skip).limit(perPage);
    return {
      categories: catInPage,
      pagesInPagination,
      activePage: page,
      allItems: catLength,
    };
  } catch (error: any) {
    throw createError({
      statusMessage: error.message,
    });
  }
});
