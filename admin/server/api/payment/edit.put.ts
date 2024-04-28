export default defineEventHandler(async (event) => {
  const { id, title } = await readBody(event);

  const updatedFields: any = {};

  try {
    const payment = await Payment.findById(id);
    if (!payment) {
      throw createError({
        statusMessage: "Payment method not found",
      });
    }

    if (title) {
      updatedFields.title = title;
    }

    const updatedPayment = await Payment.findByIdAndUpdate(id, updatedFields, {
      new: true,
    });
    return updatedPayment;
  } catch (error: any) {
    throw createError({
      statusMessage: error.message,
    });
  }
});
