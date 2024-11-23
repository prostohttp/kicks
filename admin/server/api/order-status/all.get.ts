export default defineEventHandler(async (event) => {
    try {
        return await OrderStatus.find();
    } catch (error: any) {
        throw createError({
            statusMessage: error.message,
        });
    }
});
