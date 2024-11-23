export default defineEventHandler(async (event) => {
    try {
        const { ids } = await readBody(event);
        return await OptionValue.find({ _id: { $in: ids } });
    } catch (error: any) {
        throw createError({
            statusMessage: error.message,
        });
    }
});
