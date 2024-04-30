import isValidPaginationPage from "~/utils/is-valid-pagination-page";
import pageCount from "~/utils/page-count";

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);
    const page = Number(query.page);
    const perPage = Number(query.perPage);
    const products = await Product.find();
    const productsLength = products.length;
    const pagesInPagination = pageCount(productsLength, perPage);

    if (
      isValidPaginationPage(page, pagesInPagination, productsLength, perPage)
    ) {
      return {
        products,
        pagesInPagination: 0,
      };
    }

    const skip = page * perPage - perPage;

    const catInPage = await Product.find().skip(skip).limit(perPage);
    return {
      products: catInPage,
      pagesInPagination,
      activePage: page,
    };
  } catch (error: any) {
    throw createError({
      statusMessage: error.message,
    });
  }
});
