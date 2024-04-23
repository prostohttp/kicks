export default defineEventHandler(async (event) => {
	const { id } = await readBody(event);
	try {
		const category = await Category.findByIdAndDelete(id);
		if (category) {
			return {
				statusMessage: "Category deleted",
			};
		} else {
			throw createError({ statusMessage: "Category not found" });
		}
	} catch (error: any) {
		return createError({
			statusMessage: error.message,
		});
	}
});
