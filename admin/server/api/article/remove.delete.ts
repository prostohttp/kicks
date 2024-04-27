export default defineEventHandler(async (event) => {
	try {
		const { id } = await readBody(event);
		const article = await Article.findByIdAndDelete(id);
		if (!article) {
			throw createError({
				statusMessage: "Article not found",
			});
		}
		return {
			statusMessage: "Article deleted",
		};
	} catch (error: any) {
		throw createError({
			statusMessage: error.message,
		});
	}
});
