import { OptionValueDto } from "./dto/option-value.dto";

export default defineEventHandler(async (event) => {
    try {
        const body = await readBody<OptionValueDto>(event);
        const optionValue = await OptionValue.findById(body._id);
        if (!optionValue) {
            throw createError({ statusMessage: "Option value not found" });
        }
        return await OptionValue.findByIdAndUpdate(body._id, body, {
            new: true,
        });
    } catch (error: any) {
        throw createError({
            statusMessage: error.message,
        });
    }
});
