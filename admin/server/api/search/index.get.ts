import { ModelNamesForSearchEngine } from "#imports";
import searchEngine from "~/utils/search-engine";

export default defineEventHandler(async (event) => {
  const { searchPhrase, searchModel } = getQuery(event);
  const founded = await searchEngine(
    searchModel as ModelNamesForSearchEngine,
    searchPhrase as string,
  );
  return founded;
});
