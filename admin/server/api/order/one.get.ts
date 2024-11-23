export default defineEventHandler(async (event) => {
    try {
        const { id } = getQuery(event);
        const foundedOrder = await Order.findById(id).populate({
            path: "products.productId",
            select: "quantity regularPrice salePrice",
        });
        if (!foundedOrder) {
            throw createError({ statusMessage: "Order not found" });
        }
        return foundedOrder;
    } catch (error: any) {
        throw createError({ statusMessage: error.message });
    }
});
