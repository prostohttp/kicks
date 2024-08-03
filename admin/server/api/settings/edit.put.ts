export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    return await Settings.updateOne(body, {
      new: true,
    });
  } catch (error: any) {
    throw createError({
      statusMessage: error.message,
    });
  }
});
