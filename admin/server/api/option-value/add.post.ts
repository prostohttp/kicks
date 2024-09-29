import { OptionValueDto } from "./dto/option-value.dto";

export default defineEventHandler(async (event) => {
  try {
    const data = await readBody<OptionValueDto>(event);
    const newOptionValue = new OptionValue(data);
    return await newOptionValue.save();
  } catch (error: any) {
    throw createError({
      statusMessage: error.message,
      statusCode: 409,
    });
  }
});
