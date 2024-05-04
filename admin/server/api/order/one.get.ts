export default defineEventHandler(async (event) => {
  try {
    const { id } = getQuery(event);
    const foundedOrder = await Order.findById(id).populate({
      path: "products.productId",
      select: "title quantity regularPrice salePrice",
    });
    if (!foundedOrder) {
      return createError({ statusMessage: "Order not found" });
    }
    return foundedOrder;
  } catch (error: any) {
    return createError({ statusMessage: error.message });
  }
});
