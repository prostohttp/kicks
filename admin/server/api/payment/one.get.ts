export default defineEventHandler(async (event) => {
  try {
    const { id } = getQuery(event);
    const payment = await Payment.findById(id);
    if (!payment) {
      return createError({ statusMessage: "Payment method not found" });
    }
    return payment;
  } catch (error: any) {
    throw createError({ statusMessage: error.message });
  }
});
