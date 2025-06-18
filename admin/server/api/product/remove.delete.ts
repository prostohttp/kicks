import deleteFilesWithUseStorage from "~/utils/delete-files-with-use-storage";
import { ProductDto } from "./dto/product.dto";

export default defineEventHandler(async (event) => {
    try {
        const { id } = await readBody(event);
        const product: ProductDto | null =
            await Product.findByIdAndDelete(id);

        if (!product) {
            throw createError({
                statusMessage: "Product not found",
            });
        }
        deleteFilesWithUseStorage(product.image ? [product.image] : undefined);
        deleteFilesWithUseStorage(product.additionImages);
        return {
            statusMessage: "Product deleted",
        };
    } catch (error: any) {
        throw createError({
            statusMessage: error.message,
        });
    }
});
