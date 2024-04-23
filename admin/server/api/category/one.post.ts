export default defineEventHandler(async (event) => {
	try {
		const { id } = await readBody(event);
		const category = await Category.findById(id);
		if (category) {
			return category;
		} else {
			throw createError({ statusMessage: "Category not found" });
		}
	} catch (error: any) {
		return createError({
			statusMessage: error.message,
		});
	}
});
