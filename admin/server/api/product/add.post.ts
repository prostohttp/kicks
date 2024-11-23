import { ProductDto } from "./dto/product.dto";

export default defineEventHandler(async (event) => {
    try {
        const data = await readBody<ProductDto>(event);
        return await Product.create(data);
    } catch (error: any) {
        throw createError({
            statusMessage: error.message,
            statusCode: 409,
        });
    }
});
