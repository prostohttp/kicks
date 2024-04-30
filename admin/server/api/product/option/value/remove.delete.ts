export default defineEventHandler(async (event) => {
  try {
    const { id } = await readBody(event);
    const optionValue = await OptionValue.findByIdAndDelete(id);
    if (!optionValue) {
      return createError({
        statusMessage: "Option value not found",
      });
    }
    return {
      statusMessage: "Option value deleted",
    };
  } catch (error: any) {
    throw createError({
      statusMessage: error.message,
    });
  }
});
