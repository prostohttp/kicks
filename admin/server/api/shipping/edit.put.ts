export default defineEventHandler(async (event) => {
  const { id, title } = await readBody(event);

  const updatedFields: any = {};

  try {
    const shipping = await Shipping.findById(id);
    if (!shipping) {
      throw createError({
        statusMessage: "Shipping method not found",
      });
    }

    if (title) {
      updatedFields.title = title;
    }

    const updatedPayment = await Shipping.findByIdAndUpdate(id, updatedFields, {
      new: true,
    });
    return updatedPayment;
  } catch (error: any) {
    throw createError({
      statusMessage: error.message,
    });
  }
});
