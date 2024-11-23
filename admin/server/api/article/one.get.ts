export default defineEventHandler(async (event) => {
    try {
        const { id } = getQuery(event);
        const article = await Article.findById(id).populate({
            path: "featuredProducts",
            select: "title",
        });
        if (!article) {
            throw createError({ statusMessage: "Article not found" });
        }
        return article;
    } catch (error: any) {
        throw createError({
            statusMessage: error.message,
        });
    }
});
