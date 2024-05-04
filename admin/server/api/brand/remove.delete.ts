export default defineEventHandler(async (event) => {
  try {
    const { id } = await readBody(event);
    const brand = await Brand.findByIdAndDelete(id);
    if (!brand) {
      return createError({
        statusMessage: "Brand not found",
      });
    }
    return {
      statusMessage: "Brand deleted",
    };
  } catch (error: any) {
    return createError({
      statusMessage: error.message,
    });
  }
});
