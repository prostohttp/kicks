export default defineEventHandler(async (event) => {
  try {
    const { id } = getQuery(event);
    const optionValue = await OptionValue.findById(id);
    if (!optionValue) {
      return createError({ statusMessage: "Option value not found" });
    }
    return optionValue;
  } catch (error: any) {
    return createError({ statusMessage: error.message });
  }
});