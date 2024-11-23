import { CategoryDto } from "./dto/category.dto";

export default defineEventHandler(async (event) => {
    try {
        const data = await readBody<CategoryDto>(event);
        return await Category.create(data);
    } catch (error: any) {
        throw createError({
            statusMessage: error.message,
            statusCode: 409,
        });
    }
});
