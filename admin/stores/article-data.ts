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
    const article: Ref<ArticleDto | undefined> = ref();
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
                    page: page || 1,
                },
            });
        } catch (error: any) {
            throw createError({ statusMessage: error.message });
        }
        return true;
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

    const getArticle = async (id: string) => {
        try {
            article.value = await $fetch("/api/article/one", {
                method: "GET",
                query: {
                    id,
                },
            });
        } catch (error: any) {
            throw createError({ statusMessage: error.message });
        }
        return true;
    };

    return {
        forAdminMenu,
        article,
        articles,
        selected,
        getArticle,
        getAllArticles,
        getAllArticlesForAdminMenu,
    };
});
