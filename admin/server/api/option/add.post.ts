import { Option } from './../../models/option.schema';
import { OptionDto } from "./dto/option.dto";

export default defineEventHandler(async (event) => {
    try {
        const data = await readBody<OptionDto>(event);
        return await Option.create(data);
    } catch (error: any) {
        throw createError({
            statusMessage: error.message,
            statusCode: 409,
        });
    }
});
