export default defineEventHandler(async (event) => {
	try {
		const { id } = await readBody(event);
		const product = await Product.findById(id);
		if (!product) {
			throw createError({ statusMessage: "Product not found" });
		}
		return product;
	} catch (error: any) {
		throw createError({
			statusMessage: error.message,
		});
	}
});