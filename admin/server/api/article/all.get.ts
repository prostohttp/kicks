import { Constants } from "~/constants";
import isValidPaginationPage from "~/utils/is-valid-pagination-page";
import pageCount from "~/utils/page-count";

export default defineEventHandler(async (event) => {
    try {
        const query = getQuery(event);
        const page = Number(query.page) || 1;
        const perPage = Number(query.perPage) || Constants.PER_PAGE_ARTICLE;
        const sortedTitles = query.sortedTitles;
        const adminMenu = query.adminMenu;
        const articles = await Article.find()
            .sort({ sort: 1 })
            .select("title shortDescription isEnabled image createdAt");
        const articlesLength = articles.length;
        const pagesInPagination = pageCount(articlesLength, perPage);

        if (adminMenu && sortedTitles) {
            return await Article.find({ adminMenu: true })
                .sort({ sort: 1 })
                .select("title");
        }
        if (
            isValidPaginationPage(
                page,
                pagesInPagination,
                articlesLength,
                perPage,
            )
        ) {
            return {
                articles,
                pagesInPagination: 0,
                allItems: articlesLength,
            };
        }

        const skip = page * perPage - perPage;

        const articlesInPage = await Article.find()
            .sort({ sort: 1 })
            .select("title shortDescription isEnabled image createdAt")
            .skip(skip)
            .limit(perPage);
        return {
            articles: articlesInPage,
            pagesInPagination,
            activePage: page,
            allItems: articlesLength,
        };
    } catch (error: any) {
        const e = error as Error;
        throw createError({
            statusMessage: e.message,
        });
    }
});
