export default defineEventHandler(async (event) => {
    try {
        const { id } = getQuery(event);
        const { title } = getQuery(event);
        const brand = await Brand.findById(id);
        if (title) {
            return await Brand.findOne({ title: title });
        }
        if (!brand) {
            throw createError({ statusMessage: "Brand not found" });
        }
        return brand;
    } catch (error: any) {
        throw createError({ statusMessage: error.message });
    }
});
