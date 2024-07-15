import { Constants } from "~/constants";
import isValidPaginationPage from "~/utils/is-valid-pagination-page";
import pageCount from "~/utils/page-count";

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);
    const page = Number(query.page) || 1;
    const perPage = Number(query.perPage) || Constants.PER_PAGE_PRODUCT;
    const titles = query.titles;
    const forCategoryCount = Boolean(query.forCategoryCount);
    const categoryId = query.category;
    const products = await Product.find().populate({
      path: "category",
      select: "title",
    });
    const productsLength = products.length;
    const pagesInPagination = pageCount(productsLength, perPage);

    if (categoryId) {
      const productsInCategory = await Product.find({
        category: { $in: [categoryId] },
      }).populate({
        path: "category",
        select: "title",
      });
      const productsInCategoryLength = productsInCategory.length;
      const pagesInPagination = pageCount(productsInCategoryLength, perPage);
      const skip = page * perPage - perPage;
      const productsPerPage = await Product.find({
        category: { $in: [categoryId] },
      })
        .populate({
          path: "category",
          select: "title",
        })
        .skip(skip)
        .limit(perPage);

      return {
        products:
          page <= pagesInPagination ? productsPerPage : productsInCategory,
        pagesInPagination:
          pagesInPagination > 1 && page <= pagesInPagination
            ? pagesInPagination
            : 0,
        activePage: page,
        allItems: productsInCategoryLength,
      };
    }

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
        allItems: productsLength,
      };
    }

    const skip = page * perPage - perPage;
    const productsInPage = await Product.find()
      .populate({
        path: "category",
        select: "title",
      })
      .skip(skip)
      .limit(perPage);
    return {
      products: productsInPage,
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
