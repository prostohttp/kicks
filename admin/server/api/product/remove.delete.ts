import deleteFilesWithUseStorage from "~/utils/delete-files-with-use-storage";

export default defineEventHandler(async (event) => {
  try {
    const { id } = await readBody(event);
    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return createError({
        statusMessage: "Product not found",
      });
    }
    deleteFilesWithUseStorage([product.image.toString()]);
    deleteFilesWithUseStorage(product?.additionImages as any as string[]);
    return {
      statusMessage: "Product deleted",
    };
  } catch (error: any) {
    return createError({
      statusMessage: error.message,
    });
  }
});
