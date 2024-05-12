import isValidPaginationPage from "~/utils/is-valid-pagination-page";
import pageCount from "~/utils/page-count";
import { Roles } from "~/types/server/server.types";

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);
    const page = Number(query.page);
    const perPage = Number(query.perPage);
    const user = await User.find({ role: Roles.CUSTOMER });
    const usersLength = user.length;
    const pagesInPagination = pageCount(usersLength, perPage);

    if (isValidPaginationPage(page, pagesInPagination, usersLength, perPage)) {
      return {
        users: user,
        pagesInPagination: 0,
      };
    }

    const skip = page * perPage - perPage;

    const brandInPage = await User.find({ role: Roles.CUSTOMER })
      .skip(skip)
      .limit(perPage);
    return {
      users: brandInPage,
      pagesInPagination,
      activePage: page,
    };
  } catch (error: any) {
    throw createError({
      statusMessage: error.message,
    });
  }
});
