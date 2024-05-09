import { Option } from "#imports";

export default defineEventHandler(async (event) => {
  try {
    const { id } = await readBody(event);
    const option = await Option.findByIdAndDelete(id);
    if (!option) {
      throw createError({
        statusMessage: "Option not found",
      });
    }
    return {
      statusMessage: "Option deleted",
    };
  } catch (error: any) {
    throw createError({
      statusMessage: error.message,
    });
  }
});
