export default defineEventHandler(async (event) => {
    try {
        const query = getQuery(event);
        const orderIds = Number(query.orderIds);
        const orders = await Order.find({ _id: { $in: orderIds } })
            .select("orderId products status")
            .populate({
                path: "products.productId",
                select: "_id title",
            });

        return orders;
    } catch (error: any) {
        throw createError({
            statusMessage: error.message,
        });
    }
});
