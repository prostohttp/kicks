export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  try {
    const newPayment = new Payment(body);

    return await newPayment.save();
  } catch (error: any) {
    return createError({
      statusMessage: error.message,
      statusCode: 409,
    });
  }
});
