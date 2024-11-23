export default defineEventHandler(async (event) => {
    try {
        const { id } = await readBody(event);
        const user = await User.findById(id);
        if (!user) {
            throw createError({ statusMessage: "User not found" });
        }
        return user;
    } catch (error: any) {
        throw createError({
            statusMessage: error.message,
        });
    }
});
