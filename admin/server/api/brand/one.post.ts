export default defineEventHandler(async (event) => {
	try {
		const { id } = await readBody(event);
		const brand = await Brand.findById(id);
		if (!brand) {
			throw createError({ statusMessage: "Brand not found" });
		}
		return brand;
	} catch (error: any) {
		throw createError({ statusMessage: error.message });
	}
});