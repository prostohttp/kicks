export default defineEventHandler(async (event): Promise<string | boolean> => {
    try {
        const { token } = await readBody(event);
        const activeToken = await Token.findOne({ token: token });
        return activeToken ? activeToken.email.toString() : false;
    } catch (error: any) {
        throw createError({
            statusMessage: error.message,
        });
    }
});
