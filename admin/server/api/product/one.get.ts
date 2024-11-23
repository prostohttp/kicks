export default defineEventHandler(async (event) => {
    try {
        const { id } = getQuery(event);
        const product = await Product.findById(id).populate([
            {
                path: "options.optionValue",
                model: "Option",
                select: "title type",
            },
            {
                path: "options.values.optionValue",
                model: "OptionValue",
                select: "value",
            },
            {
                path: "category",
                model: "Category",
                select: "title",
            },
            {
                path: "brand",
                model: "Brand",
                select: "title",
            },
        ]);
        if (!product) {
            throw createError({ statusMessage: "Product not found" });
        }
        return product;
    } catch (error: any) {
        throw createError({
            statusMessage: error.message,
        });
    }
});
