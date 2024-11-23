export default defineEventHandler(async (event) => {
    try {
        const { id } = await readBody(event);
        const foundedOrder = await Order.findByIdAndDelete(id);
        if (!foundedOrder) {
            throw createError({
                statusMessage: "Order not found",
            });
        }
        return {
            statusMessage: "Order deleted",
        };
    } catch (error: any) {
        throw createError({
            statusMessage: error.message,
        });
    }
});
