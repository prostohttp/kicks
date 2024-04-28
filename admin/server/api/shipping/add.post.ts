export default defineEventHandler(async (event) => {
  const { title } = await readBody(event);

  try {
    const newShipping = new Shipping({
      title,
    });

    return await newShipping.save();
  } catch (error: any) {
    throw createError({
      statusMessage: error.message,
      statusCode: 409,
    });
  }
});
