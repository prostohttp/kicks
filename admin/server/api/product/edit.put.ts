import { Constants } from "~/constants";
import cleanStringToArray from "~/utils/clean-string-to-array";
import deleteFilesWithUseStorage from "~/utils/delete-files-with-use-storage";
import fromMultipartFormData from "~/utils/from-multipart-form-data";
import uploadFilesWithUseStorage from "~/utils/upload-files-with-use-storage";
import { ProductDto } from "./dto/product.dto";

export default defineEventHandler(async (event) => {
  const data = await readMultipartFormData(event);

  const image = uploadFilesWithUseStorage(
    data,
    Constants.IMG_PRODUCTS,
    "image",
  );
  const additionImages = uploadFilesWithUseStorage(
    data,
    Constants.IMG_PRODUCTS,
    "additionImages",
  );

  try {
    const updatedFields = fromMultipartFormData(data) as unknown as ProductDto;
    const product: ProductDto | null = await Product.findById(updatedFields.id);

    if (!product) {
      return createError({ statusMessage: "Category not found" });
    }

    if (!updatedFields.title) {
      return createError({ statusMessage: "Title is required" });
    }

    if (image && image.length > 0) {
      updatedFields.image = image[0];
    } else if (image && !image.length) {
      updatedFields.image = "";
      deleteFilesWithUseStorage(product.image ? [product.image] : undefined);
    }

    if (additionImages && additionImages.length > 0) {
      updatedFields.additionImages = additionImages;
    } else if (additionImages && !additionImages.length) {
      updatedFields.additionImages = [];
      if (additionImages) {
        deleteFilesWithUseStorage(additionImages);
      }
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      updatedFields.id,
      {
        ...updatedFields,
        options: JSON.parse(updatedFields.options.toString()),
        categories: cleanStringToArray(updatedFields.category),
        tags: cleanStringToArray(updatedFields.tags),
      },
      {
        new: true,
      },
    );
    return updatedProduct;
  } catch (error: any) {
    if (image) {
      deleteFilesWithUseStorage(image);
    }
    if (additionImages) {
      deleteFilesWithUseStorage(additionImages);
    }
    return createError({
      statusMessage: error.message,
    });
  }
});
