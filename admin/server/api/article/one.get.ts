export default defineEventHandler(async (event) => {
  try {
    const { id } = getQuery(event);
    const article = await Article.findById(id);
    if (!article) {
      return createError({ statusMessage: "Article not found" });
    }
    return article;
  } catch (error: any) {
    return createError({
      statusMessage: error.message,
    });
  }
});
