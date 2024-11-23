export default defineEventHandler(async (event) => {
    try {
        const { id } = await readBody(event);
        const banner = await Banner.findByIdAndDelete(id);
        if (!banner) {
            throw createError({
                statusMessage: "Banner not found",
            });
        }
        return {
            statusMessage: "Banner deleted",
        };
    } catch (error: any) {
        throw createError({
            statusMessage: error.message,
        });
    }
});
