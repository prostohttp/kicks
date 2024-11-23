export default defineEventHandler(async (event) => {
    try {
        const { id } = await readBody(event);
        const shipping = await Shipping.findByIdAndDelete(id);
        if (!shipping) {
            throw createError({
                statusMessage: "Shipping method not found",
            });
        }
        return {
            statusMessage: "Shipping method deleted",
        };
    } catch (error: any) {
        throw createError({
            statusMessage: error.message,
        });
    }
});
