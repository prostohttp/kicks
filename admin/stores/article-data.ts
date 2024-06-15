import type { IArticle } from "~/pages/dashboard/articles/index.vue";
import type { ArticleDto } from "~/server/api/article/dto/article.dto";

export const useArticleDataStore = defineStore("articleData", () => {
  interface ArticlesPayload {
    articles: ArticleDto[];
    pagesInPagination?: number;
    allItems: number;
    activePage?: number;
  }
  // vars
  const articles: Ref<ArticlesPayload | undefined> = ref();
  const selected: Ref<IArticle[]> = ref([]);
  const forAdminMenu: Ref<
    Array<{
      _id: string;
      title: string;
    }>
  > = ref([]);

  // handlers
  const getAllArticles = async (page: number) => {
    try {
      articles.value = await $fetch("/api/article/all", {
        method: "GET",
        query: {
          page,
        },
      });
    } catch (error: any) {
      throw createError({ statusMessage: error.message });
    }
  };

  const getAllArticlesForAdminMenu = async () => {
    try {
      forAdminMenu.value = await $fetch("/api/article/all", {
        method: "GET",
        query: {
          sortedTitles: true,
          adminMenu: true,
        },
      });
    } catch (error: any) {
      throw createError({ statusMessage: error.message });
    }
  };

  return {
    forAdminMenu,
    articles,
    selected,
    getAllArticles,
    getAllArticlesForAdminMenu,
  };
});
