import { Option } from "#imports";

export default defineEventHandler(async (event) => {
  try {
    const { id } = await readBody(event);
    const option = await Option.findByIdAndDelete(id);
    if (!option) {
      return createError({
        statusMessage: "Option not found",
      });
    }
    return {
      statusMessage: "Option deleted",
    };
  } catch (error: any) {
    return createError({
      statusMessage: error.message,
    });
  }
});
