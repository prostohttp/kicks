export default defineEventHandler(async (event) => {
    try {
        const { optionIds } = await readBody(event);
        if (optionIds) {
            return await Product.find({
                options: { $in: { optionValue: optionIds } },
            });
        }
    } catch (error: any) {
        throw createError({
            statusMessage: error.message,
        });
    }
});
