import { Option } from "#imports";
import cleanStringToArray from "~/utils/clean-string-to-array";
import { OptionDto } from "../dto/option.dto";

export default defineEventHandler(async (event) => {
  try {
    const { title, type, values, id }: OptionDto = await readBody(event);
    const option = await Option.findById(id);

    if (!option) {
      throw createError({
        statusMessage: "Option not found",
      });
    }

    if (!title || !type) {
      throw createError({
        statusMessage: "Title and type are required",
      });
    }

    if (!Object.values(OptionTypes).includes(type)) {
      throw createError({
        statusMessage: "Invalid option type",
      });
    }

    return await Option.findByIdAndUpdate(
      id,
      { title, type, values: cleanStringToArray(values) },
      {
        new: true,
      },
    );
  } catch (error: any) {
    throw createError({
      statusMessage: error.message,
    });
  }
});
