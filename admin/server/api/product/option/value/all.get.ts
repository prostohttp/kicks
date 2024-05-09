import { Option } from "#imports";

export default defineEventHandler(async (event) => {
  try {
    const { optionId } = getQuery(event);
    const option = await Option.findById(optionId).populate("values");
    if (!option) {
      throw createError({
        statusMessage: "Option not found",
      });
    }
    return option.values;
  } catch (error: any) {
    throw createError({
      statusMessage: error.message,
    });
  }
});
