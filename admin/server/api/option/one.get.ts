import { Option } from "#imports";

export default defineEventHandler(async (event) => {
    try {
        const { id } = getQuery(event);
        const option = await Option.findById(id).populate({
            path: "values",
        });

        if (!option) {
            throw createError({ statusMessage: "Option not found" });
        }
        return option;
    } catch (error: any) {
        throw createError({ statusMessage: error.message });
    }
});
