import { Option } from "#imports";
import cleanStringToArray from "~/utils/clean-string-to-array";

export default defineEventHandler(async (event) => {
  try {
    const { title, type, values, id } = await readBody(event);
    const option = await Option.findById(id);
    const updatedFields: any = {};

    if (!option) {
      throw createError({
        statusMessage: "Option not found",
      });
    }

    if (title) {
      updatedFields.title = title;
    }

    if (!Object.values(OptionTypes).includes(type)) {
      return createError({
        statusMessage: "Invalid option type",
      });
    }
    if (type) {
      updatedFields.type = type;
    }

    if (values) {
      updatedFields.values = cleanStringToArray(values);
    } else {
      updatedFields.values = [];
    }

    const updatedOption = await Option.findByIdAndUpdate(id, updatedFields, {
      new: true,
    });
    return updatedOption;
  } catch (error: any) {
    throw createError({
      statusMessage: error.message,
    });
  }
});
