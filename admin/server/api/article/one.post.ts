export default defineEventHandler(async (event) => {
	try {
		const { id } = await readBody(event);
		const article = await Article.findById(id);
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
