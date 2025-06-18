import { Constants } from "~/constants";
import { Option } from './../../models/option.schema';
import isValidPaginationPage from "~/utils/is-valid-pagination-page";
import pageCount from "~/utils/page-count";

export default defineEventHandler(async (event) => {
    try {
        const query = getQuery(event);
        const page = Number(query.page) || 1;
        const all = query.all;
        const perPage = Number(query.perPage) || Constants.PER_PAGE_OPTION;
        const titles = query.titles;
        const options = await Option.find().sort({ sort: 1 });
        const optionsLength = options.length;
        const pagesInPagination = pageCount(optionsLength, perPage);

        if (all) {
            return Option.find();
        }

        if (titles) {
            return await Option.find().select("title type sort");
        }

        if (
            isValidPaginationPage(
                page,
                pagesInPagination,
                optionsLength,
                perPage,
            )
        ) {
            return {
                options,
                pagesInPagination: 0,
                allItems: optionsLength,
            };
        }

        const skip = page * perPage - perPage;

        const optionInPage = await Option.find()
            .sort({ sort: 1 })
            .skip(skip)
            .limit(perPage);

        return {
            options: optionInPage,
            pagesInPagination,
            activePage: page,
            allItems: optionsLength,
        };
    } catch (error: any) {
        throw createError({
            statusMessage: error.message,
        });
    }
});
