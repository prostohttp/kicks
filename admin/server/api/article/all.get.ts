import isValidPaginationPage from "~/utils/is-valid-pagination-page";
import pageCount from "~/utils/page-count";

export default defineEventHandler(async (event) => {
  try {
    let query = getQuery(event);
    const page = Number(query.page);
    const perPage = Number(query.perPage);
    const article = await Article.find();
    const articlesLength = article.length;
    const pagesInPagination = pageCount(articlesLength, perPage);

    if (
      isValidPaginationPage(page, pagesInPagination, articlesLength, perPage)
    ) {
      return {
        article,
        pagesInPagination: 0,
      };
    }

    const skip = page * perPage - perPage;

    const articleInPage = await Category.find().skip(skip).limit(perPage);
    return {
      articles: articleInPage,
      pagesInPagination,
      activePage: page,
    };
  } catch (error: any) {
    return createError({
      statusMessage: error.message,
    });
  }
});
