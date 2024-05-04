import { Constants } from "~/constants";
import cleanStringToArray from "~/utils/clean-string-to-array";
import deleteFiles from "~/utils/delete-files";
import fromMultipartFormData from "~/utils/from-multipart-form-data";
import uploadFiles from "~/utils/upload-files";

export default defineEventHandler(async (event) => {
  const data = await readMultipartFormData(event);

  const image = uploadFiles(data, Constants.IMG_PRODUCTS, "image");
  const additionImages = uploadFiles(
    data,
    Constants.IMG_PRODUCTS,
    "additionImages",
  );

  try {
    const resultData = fromMultipartFormData(data);
    const newProduct = new Product({
      ...resultData,
      category: cleanStringToArray(resultData.category as string),
      tags: cleanStringToArray(resultData.tags as string),
      image: image ? image[0] : "",
      additionImages: additionImages ? additionImages : [],
      options: resultData.options
        ? JSON.parse(resultData.options.toString())
        : [],
    });
    return await newProduct.save();
  } catch (error: any) {
    if (image) {
      deleteFiles(image);
    }
    if (additionImages) {
      deleteFiles(additionImages);
    }

    return createError({
      statusMessage: error.message,
      statusCode: 409,
    });
  }
});
