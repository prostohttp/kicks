import { OptionDto } from "./dto/option.dto";
import { Option } from './../../models/option.schema';

export default defineEventHandler(async (event) => {
    try {
        const body = await readBody<OptionDto>(event);
        const option = await Option.findById(body._id);
        if (!option) {
            throw createError({ statusMessage: "Option not found" });
        }
        return await Option.findByIdAndUpdate(body._id, body, {
            new: true,
        });
    } catch (error: any) {
        throw createError({
            statusMessage: error.message,
        });
    }
});
