import { CategoryDto } from "./dto/category.dto";

export default defineEventHandler(async (event) => {
    try {
        const body = await readBody<CategoryDto>(event);
        const category = await Category.findById(body._id);
        if (!category) {
            throw createError({ statusMessage: "Category not found" });
        }
        return await Category.findByIdAndUpdate(body._id, body, {
            new: true,
        });
    } catch (error: any) {
        throw createError({
            statusMessage: error.message,
        });
    }
});
