export default defineEventHandler(async (event) => {
  try {
    return await Settings.findOne();
  } catch (error: any) {
    throw createError({
      statusMessage: error.message,
    });
  }
});
