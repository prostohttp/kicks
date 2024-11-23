import { OptionValueDto } from "./dto/option-value.dto";

export default defineEventHandler(async (event) => {
    try {
        const data = await readBody<OptionValueDto>(event);
        return await OptionValue.create(data);
    } catch (error: any) {
        throw createError({
            statusMessage: error.message,
            statusCode: 409,
        });
    }
});
