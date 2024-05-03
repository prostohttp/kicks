export default defineEventHandler(async (event) => {
  const { title, description, price, free } = await readBody(event);

  try {
    const newShipping = new Shipping({
      title,
      description,
      price,
      free,
    });

    return await newShipping.save();
  } catch (error: any) {
    throw createError({
      statusMessage: error.message,
      statusCode: 409,
    });
  }
});
