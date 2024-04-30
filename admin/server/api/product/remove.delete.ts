export default defineEventHandler(async (event) => {
  try {
    const { id } = await readBody(event);
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      throw createError({
        statusMessage: "Product not found",
      });
    }
    return {
      statusMessage: "Product deleted",
    };
  } catch (error: any) {
    return createError({
      statusMessage: error.message,
    });
  }
});
