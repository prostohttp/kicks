export default defineEventHandler(async (event) => {
	try {
		const categories = await Category.find();
		const query = getQuery(event);
		if (query.page) {
			console.log(query.page);
			return categories;
		} else {
			return categories;
		}
	} catch (error: any) {
		return createError({
			statusMessage: error.message,
		});
	}
});
