import { ModelNamesForSearchEngine } from "~/types/server/server.types";
import searchEngine from "~/utils/search-engine";

export default defineEventHandler(async (event) => {
    try {
        const query = getQuery(event);
        const searchPhrase = query.searchPhrase as string;
        const searchModel = query.searchModel as ModelNamesForSearchEngine;
        const limit = Number(query.limit);
        const page = Number(query.page);

        return await searchEngine(searchModel, searchPhrase, limit, page);
    } catch (error: any) {
        throw createError({ statusMessage: error.message });
    }
});
