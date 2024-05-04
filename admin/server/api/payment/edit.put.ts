export default defineEventHandler(async (event) => {
  const { id, title } = await readBody(event);

  try {
    const payment = await Payment.findById(id);
    if (!payment) {
      return createError({
        statusMessage: "Payment method not found",
      });
    }

    if (!title) {
      return createError({
        statusMessage: "Title is required",
      });
    }

    const updatedPayment = await Payment.findByIdAndUpdate(
      id,
      { title },
      {
        new: true,
      },
    );
    return updatedPayment;
  } catch (error: any) {
    return createError({
      statusMessage: error.message,
    });
  }
});
