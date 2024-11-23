import isValidPaginationPage from "~/utils/is-valid-pagination-page";
import pageCount from "~/utils/page-count";
import { Roles } from "~/types/server/server.types";
import { Constants } from "~/constants";

export default defineEventHandler(async (event) => {
    try {
        const query = getQuery(event);
        const page = Number(query.page) || 1;
        const perPage = Number(query.perPage) || Constants.PER_PAGE_USERS;
        const users = await User.find({
            role: { $in: [Roles.CUSTOMER, Roles.MANAGER] },
        });
        const usersLength = users.length;
        const pagesInPagination = pageCount(usersLength, perPage);

        if (
            isValidPaginationPage(page, pagesInPagination, usersLength, perPage)
        ) {
            return {
                users,
                pagesInPagination: 0,
                allItems: usersLength,
            };
        }

        const skip = page * perPage - perPage;

        const usersInPage = await User.find({
            role: { $in: [Roles.CUSTOMER, Roles.MANAGER] },
        })
            .skip(skip)
            .limit(perPage);
        return {
            users: usersInPage,
            pagesInPagination,
            activePage: page,
            allItems: usersLength,
        };
    } catch (error: any) {
        throw createError({
            statusMessage: error.message,
        });
    }
});
