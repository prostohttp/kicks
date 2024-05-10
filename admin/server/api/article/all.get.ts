import isValidPaginationPage from "~/utils/is-valid-pagination-page";
import pageCount from "~/utils/page-count";

export default defineEventHandler(async (event) => {
  try {
    let query = getQuery(event);
    const page = Number(query.page);
    const perPage = Number(query.perPage);
    const adminMenu = query.adminMenu === "true";
    const articles = await Article.find().select(
      "title shortDescription isEnabled image",
    );
    const articlesLength = articles.length;
    const pagesInPagination = pageCount(articlesLength, perPage);

    if (adminMenu) {
      return await Article.find({ adminMenu: true }).select("title");
    }
    if (
      isValidPaginationPage(page, pagesInPagination, articlesLength, perPage)
    ) {
      return {
        articles,
        pagesInPagination: 0,
      };
    }

    const skip = page * perPage - perPage;

    const articleInPage = await Category.find()
      .select("title shortDescription isEnabled image")
      .skip(skip)
      .limit(perPage);
    return {
      articles: articleInPage,
      pagesInPagination,
      activePage: page,
    };
  } catch (error: any) {
    throw createError({
      statusMessage: error.message,
    });
  }
});
