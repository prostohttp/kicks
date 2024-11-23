export default defineEventHandler(async (event) => {
    const { ids } = await readBody(event);
    try {
        const articles = await Article.deleteMany({ _id: { $in: ids } });
        if (!articles) {
            throw createError({ statusMessage: "Article not found" });
        }

        return {
            statusMessage: "Articles deleted",
        };
    } catch (error: any) {
        throw createError({
            statusMessage: error.message,
        });
    }
});
