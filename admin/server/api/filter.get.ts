export default defineEventHandler(async (event) => {
  try {
    const params = getQuery(event);
    return params;
  } catch (error: any) {
    throw createError({
      statusMessage: error.message,
    });
  }
});
