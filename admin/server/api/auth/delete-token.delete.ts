export default defineEventHandler(async (event): Promise<void> => {
	const { token } = await readBody(event);
	try {
		await Token.findOneAndDelete({ token: token });
	} catch (error: any) {
		throw createError({
			statusMessage: error.message,
		});
	}
});
