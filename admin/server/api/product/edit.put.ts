import { ProductDto } from "./dto/product.dto";

export default defineEventHandler(async (event) => {
    try {
        const body = await readBody<ProductDto>(event);
        const product = await Product.findById(body._id);
        if (!product) {
            throw createError({ statusMessage: "Product not found" });
        }
        return await Product.findByIdAndUpdate(body._id, body, {
            new: true,
        });
    } catch (error: any) {
        throw createError({
            statusMessage: error.message,
        });
    }
});
