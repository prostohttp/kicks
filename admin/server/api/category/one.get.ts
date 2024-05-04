export default defineEventHandler(async (event) => {
  try {
    const { id } = getQuery(event);
    const category = await Category.findById(id);
    if (!category) {
      return createError({ statusMessage: "Category not found" });
    }
    return category;
  } catch (error: any) {
    return createError({
      statusMessage: error.message,
    });
  }
});
