export default defineEventHandler(async (event) => {
    try {
        const { id } = getQuery(event);
        const category = await Category.findById(id).populate({
            path: "children",
            select: "title",
        });
        if (!category) {
            throw createError({ statusMessage: "Category not found" });
        }
        return category;
    } catch (error: any) {
        throw createError({ statusMessage: error.message });
    }
});
