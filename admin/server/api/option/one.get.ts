import { Option } from './../../models/option.schema';

export default defineEventHandler(async (event) => {
    try {
        const { id } = getQuery(event);
        const option = await Option.findById(id).populate({
            path: "values",
        });

        if (!option) {
            return createError({ statusMessage: "Option not found" });
        }
        return option;
    } catch (error: any) {
        throw createError({ statusMessage: error.message });
    }
});
