import { ModelNamesForSearchEngine } from "~/types/server/server.types";
import searchEngine from "~/utils/search-engine";

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);
    const searchPhrase = query.searchPhrase;
    const searchModel = query.searchModel;
    const limit = query.limit;
    const page = query.page;

    const founded = await searchEngine(
      searchModel as ModelNamesForSearchEngine,
      searchPhrase as string,
      limit as number,
      page as number,
    );
    return founded;
  } catch (error: any) {
    throw createError({ statusMessage: error.message });
  }
});
