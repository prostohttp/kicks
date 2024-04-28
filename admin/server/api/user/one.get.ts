export default defineEventHandler(async (event) => {
	try {
		const { id } = getQuery(event);
		const user = await User.findById(id);
		if (!user) {
			return createError({ statusMessage: "User not found" });
		}
		return user;
	} catch (error: any) {
		throw createError({ statusMessage: error.message });
	}
});
