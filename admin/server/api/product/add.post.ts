import { ProductDto } from "./dto/product.dto";

export default defineEventHandler(async (event) => {
  try {
    const data = await readBody<ProductDto>(event);
    const newProduct = new Product(data);
    return await newProduct.save();
  } catch (error: any) {
    throw createError({
      statusMessage: error.message,
      statusCode: 409,
    });
  }
});
