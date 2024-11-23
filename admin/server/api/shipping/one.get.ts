export default defineEventHandler(async (event) => {
    try {
        const { id } = getQuery(event);
        const shipping = await Shipping.findById(id);
        if (!shipping) {
            throw createError({ statusMessage: "Shipping method not found" });
        }
        return shipping;
    } catch (error: any) {
        throw createError({ statusMessage: error.message });
    }
});
