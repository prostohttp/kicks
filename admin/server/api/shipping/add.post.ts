export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  try {
    if (!body.title || !body.description) {
      return createError({
        statusMessage: "Title and description are required",
      });
    }

    const newShipping = new Shipping(body);
    return await newShipping.save();
  } catch (error: any) {
    return createError({
      statusMessage: error.message,
      statusCode: 409,
    });
  }
});
