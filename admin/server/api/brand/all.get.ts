import isValidPaginationPage from "~/utils/is-valid-pagination-page";
import pageCount from "~/utils/page-count";

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);
    const page = Number(query.page);
    const perPage = Number(query.perPage);
    const brands = await Brand.find();
    const brandLength = brands.length;
    const pagesInPagination = pageCount(brandLength, perPage);

    if (isValidPaginationPage(page, pagesInPagination, brandLength, perPage)) {
      return {
        brands,
        pagesInPagination: 0,
      };
    }

    const skip = page * perPage - perPage;

    const brandInPage = await Brand.find().skip(skip).limit(perPage);
    return {
      brands: brandInPage,
      pagesInPagination,
      activePage: page,
    };
  } catch (error: any) {
    return createError({
      statusMessage: error.message,
    });
  }
});
