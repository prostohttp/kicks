import isValidPaginationPage from "~/utils/is-valid-pagination-page";
import pageCount from "~/utils/page-count";

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);
    const page = Number(query.page);
    const perPage = Number(query.perPage);
    const titles = query.titles;
    const forCategoryCount = Boolean(query.forCategoryCount);
    const categoryId = query.categoryId;
    const products = await Product.find();
    const productsLength = products.length;
    const pagesInPagination = pageCount(productsLength, perPage);

    if (titles) {
      return await Product.find().select("title");
    }
    if (forCategoryCount) {
      return await Product.find().select("category");
    }
    if (
      isValidPaginationPage(page, pagesInPagination, productsLength, perPage)
    ) {
      return {
        products,
        pagesInPagination: 0,
        llItems: productsLength,
      };
    }

    const skip = page * perPage - perPage;

    const catInPage = await Product.find().skip(skip).limit(perPage);
    return {
      products: catInPage,
      pagesInPagination,
      activePage: page,
      allItems: productsLength,
    };
  } catch (error: any) {
    throw createError({
      statusMessage: error.message,
    });
  }
});
