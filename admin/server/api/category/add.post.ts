import { CategoryDto } from "./dto/category.dto";

export default defineEventHandler(async (event) => {
  try {
    const data = await readBody<CategoryDto>(event);
    const newCategory = new Category(data);
    return await newCategory.save();
  } catch (error: any) {
    throw createError({
      statusMessage: error.message,
      statusCode: 409,
    });
  }
});
