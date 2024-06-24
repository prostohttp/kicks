import { Option } from "#imports";

export default defineEventHandler(async (event) => {
  const { ids } = await readBody(event);
  try {
    const options = await Option.deleteMany({ _id: { $in: ids } });
    if (!options) {
      throw createError({ statusMessage: "Option not found" });
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
