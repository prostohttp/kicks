import { ModelNamesForSearchEngine } from "~/types/server/server.types";
import searchEngine from "~/utils/search-engine";

export default defineEventHandler(async (event) => {
  try {
    const { searchPhrase, searchModel, limit } = getQuery(event);
    const founded = await searchEngine(
      searchModel as ModelNamesForSearchEngine,
      searchPhrase as string,
      limit as number,
    );
    return founded;
  } catch (error: any) {
    throw createError({ statusMessage: error.message });
  }
});
