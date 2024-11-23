export default defineEventHandler(async (event) => {
    try {
        const { _id, ids } = await readBody(event);
        if (_id) {
            const optionValue = await OptionValue.findByIdAndDelete(_id);
            if (!optionValue) {
                throw createError({ statusMessage: "Option value not found" });
            }
        }

        if (ids) {
            const optionValues = await OptionValue.deleteMany({
                _id: { $in: ids },
            });
            if (!optionValues) {
                throw createError({ statusMessage: "Option values not found" });
            }
        }

        return {
            statusMessage: "Option value deleted",
        };
    } catch (error: any) {
        throw createError({
            statusMessage: error.message,
        });
    }
});
