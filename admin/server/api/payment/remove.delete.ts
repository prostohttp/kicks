export default defineEventHandler(async (event) => {
  try {
    const { id } = await readBody(event);
    const payment = await Payment.findByIdAndDelete(id);
    if (!payment) {
      return createError({
        statusMessage: "Payment method not found",
      });
    }
    return {
      statusMessage: "Payment method deleted",
    };
  } catch (error: any) {
    return createError({
      statusMessage: error.message,
    });
  }
});
