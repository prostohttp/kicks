import deleteFilesWithUseStorage from "~/utils/delete-files-with-use-storage";

export default defineEventHandler(async (event) => {
  try {
    const { id } = await readBody(event);
    const article = await Article.findByIdAndDelete(id);
    if (!article) {
      return createError({
        statusMessage: "Article not found",
      });
    }
    deleteFilesWithUseStorage([article.image?.toString()]);
    return {
      statusMessage: "Article deleted",
    };
  } catch (error: any) {
    return createError({
      statusMessage: error.message,
    });
  }
});
