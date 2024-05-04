export default defineEventHandler(async (event) => {
  try {
    const { id } = getQuery(event);
    const product = await Product.findById(id);
    if (!product) {
      return createError({ statusMessage: "Product not found" });
    }
    return product;
  } catch (error: any) {
    return createError({
      statusMessage: error.message,
    });
  }
});
