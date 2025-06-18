import { Option } from './../../models/option.schema';

export default defineEventHandler(async (event) => {
    try {
        const { ids } = await readBody(event);
        const options = await Option.deleteMany({ _id: { $in: ids } });
        if (!options) {
            throw createError({ statusMessage: "Option not found" });
        }

        return {
            statusMessage: "Option deleted",
        };
    } catch (error: any) {
        throw createError({
            statusMessage: error.message,
        });
    }
});
