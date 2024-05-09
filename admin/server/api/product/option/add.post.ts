import { Option } from "#imports";
import { OptionDto } from "../dto/option.dto";
import cleanStringToArray from "~/utils/clean-string-to-array";

export default defineEventHandler(async (event) => {
  try {
    const option: OptionDto = await readBody(event);
    const newOption = new Option({
      title: option.title,
      type: option.type,
      values: cleanStringToArray(option.values),
    });

    return await newOption.save();
  } catch (error: any) {
    throw createError({
      statusMessage: error.message,
      statusCode: 409,
    });
  }
});
