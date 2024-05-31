export default defineEventHandler(async (event) => {
  try {
    const formData = await readFormData(event);
    const title = formData.get("title");
    const description = formData.get("description");
    const newBrand = new Brand({
      title,
      description,
    });
    return await newBrand.save();
  } catch (error: any) {
    throw createError({
      statusMessage: error.message,
      statusCode: 409,
    });
  }
});
