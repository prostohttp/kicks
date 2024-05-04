export default defineEventHandler(async (event) => {
  try {
    const { id } = getQuery(event);
    const brand = await Brand.findById(id);
    if (!brand) {
      return createError({ statusMessage: "Brand not found" });
    }
    return brand;
  } catch (error: any) {
    return createError({ statusMessage: error.message });
  }
});
