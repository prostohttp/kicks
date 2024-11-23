export default defineEventHandler(async (event): Promise<void> => {
    try {
        const { token } = await readBody(event);
        await Token.findOneAndDelete({ token: token });
    } catch (error: any) {
        throw createError({
            statusMessage: error.message,
        });
    }
});
