export default defineEventHandler(async (event) => {
  const { title } = await readBody(event);

  try {
    const newPayment = new Payment({
      title,
    });

    return await newPayment.save();
  } catch (error: any) {
    throw createError({
      statusMessage: error.message,
      statusCode: 409,
    });
  }
});
