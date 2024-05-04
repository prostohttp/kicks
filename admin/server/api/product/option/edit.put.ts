import { Option } from "#imports";
import cleanStringToArray from "~/utils/clean-string-to-array";

export default defineEventHandler(async (event) => {
  try {
    const { title, type, values, id } = await readBody(event);
    const option = await Option.findById(id);

    if (!option) {
      return createError({
        statusMessage: "Option not found",
      });
    }

    if (!title || !type) {
      return createError({
        statusMessage: "Title and type are required",
      });
    }

    if (!Object.values(OptionTypes).includes(type)) {
      return createError({
        statusMessage: "Invalid option type",
      });
    }

    const updatedOption = await Option.findByIdAndUpdate(
      id,
      { title, type, values: cleanStringToArray(values) },
      {
        new: true,
      },
    );
    return updatedOption;
  } catch (error: any) {
    return createError({
      statusMessage: error.message,
    });
  }
});
