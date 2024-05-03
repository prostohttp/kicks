export default defineEventHandler(async (event) => {
  const { id, title, description, price, free } = await readBody(event);

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

    if (description) {
      updatedFields.description = description;
    }

    if (price) {
      updatedFields.price = price;
    }

    if (free) {
      updatedFields.free = free;
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
