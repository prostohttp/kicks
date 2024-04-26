export default defineEventHandler(async (event) => {
	try {
		const { id } = await readBody(event);
		const brand = await Brand.findByIdAndDelete(id);
		if (!brand) {
			throw createError({
				statusMessage: "Brand not found",
			});
		}
		return {
			statusMessage: "Brand deleted",
		};
	} catch (error: any) {
		throw createError({
			statusMessage: error.message,
		});
	}
});