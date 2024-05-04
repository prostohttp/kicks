export default defineEventHandler(async (event) => {
  const { id, title, description, price, free } = await readBody(event);

  try {
    const shipping = await Shipping.findById(id);
    if (!shipping) {
      return createError({
        statusMessage: "Shipping method not found",
      });
    }

    if (!title || !description) {
      return createError({
        statusMessage: "Title and description are required",
      });
    }

    const updatedPayment = await Shipping.findByIdAndUpdate(
      id,
      { title, description, price, free },
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
