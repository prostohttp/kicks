export default defineEventHandler(async (event) => {
    try {
        const { id } = getQuery(event);
        const banner = await Banner.findById(id);
        if (!banner) {
            throw createError({ statusMessage: "Banner not found" });
        }
        return banner;
    } catch (error: any) {
        throw createError({ statusMessage: error.message });
    }
});
