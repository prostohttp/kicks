import { Option } from "#imports";

export default defineEventHandler(async (event) => {
  try {
    const { optionId } = getQuery(event);
    const option = await Option.findById(optionId).populate("values");
    if (!option) {
      return createError({
        statusMessage: "Option not found",
      });
    }
    return option.values;
  } catch (error: any) {
    return createError({
      statusMessage: error.message,
    });
  }
});
