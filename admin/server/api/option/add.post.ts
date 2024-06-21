import { Option } from "#imports";
import { OptionDto } from "./dto/option.dto";

export default defineEventHandler(async (event) => {
  try {
    const data = await readBody<OptionDto>(event);
    const newOption = new Option(data);
    return await newOption.save();
  } catch (error: any) {
    throw createError({
      statusMessage: error.message,
      statusCode: 409,
    });
  }
});
