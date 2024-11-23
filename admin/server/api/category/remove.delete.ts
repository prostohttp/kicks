export default defineEventHandler(async (event) => {
    const { ids } = await readBody(event);
    try {
        const categories = await Category.deleteMany({ _id: { $in: ids } });
        if (!categories) {
            throw createError({ statusMessage: "Category not found" });
        }

        await Category.updateMany(
            { children: { $in: ids } },
            { $pull: { children: { $in: ids } } },
        );
        await Product.updateMany(
            { category: { $in: ids } },
            { $pull: { category: { $in: ids } } },
        );

        return {
            statusMessage: "Categories deleted",
        };
    } catch (error: any) {
        throw createError({
            statusMessage: error.message,
        });
    }
});
