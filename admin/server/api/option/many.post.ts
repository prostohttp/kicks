import { Option } from './../../models/option.schema';

export default defineEventHandler(async (event) => {
    try {
        const { ids } = await readBody(event);
        return await Option.find({ _id: { $in: ids } });
    } catch (error: any) {
        throw createError({
            statusMessage: error.message,
        });
    }
});
