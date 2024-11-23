export default defineEventHandler(async (event) => {
    try {
        const { id } = await readBody(event);
        const foundedOrderStatus = await OrderStatus.findByIdAndDelete(id);
        if (!foundedOrderStatus) {
            throw createError({
                statusMessage: "Order status not found",
            });
        }
        return {
            statusMessage: "Order status deleted",
        };
    } catch (error: any) {
        throw createError({
            statusMessage: error.message,
        });
    }
});
