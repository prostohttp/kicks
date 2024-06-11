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
  return {
    articles,
    selected,
    getAllArticles,
  };
});
