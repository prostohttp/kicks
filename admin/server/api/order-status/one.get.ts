export default defineEventHandler(async (event) => {
    try {
        const { id } = getQuery(event);
        const foundedOrderStatus = await OrderStatus.findById(id);
        if (!foundedOrderStatus) {
            throw createError({ statusMessage: "Order status not found" });
        }
        return foundedOrderStatus;
    } catch (error: any) {
        throw createError({ statusMessage: error.message });
    }
});
