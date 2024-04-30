export default defineEventHandler(async (event) => {
  try {
    const { id } = getQuery(event);
    const foundedOrder = await Order.findById(id)
      .select({ orderId: 1, title: 1, date: 1, status: 1, products: 1, _id: 0 })
      .populate("products");
    if (!foundedOrder) {
      return createError({ statusMessage: "Order not found" });
    }
    return foundedOrder;
  } catch (error: any) {
    throw createError({ statusMessage: error.message });
  }
});
