import { Constants } from "~/constants";
import cleanStringToArray from "~/utils/clean-string-to-array";
import deleteFilesWithUseStorage from "~/utils/delete-files-with-use-storage";
import fromMultipartFormData from "~/utils/from-multipart-form-data";
import uploadFilesWithUseStorage from "~/utils/upload-files-with-use-storage";

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
      deleteFilesWithUseStorage(image);
    }
    if (additionImages) {
      deleteFilesWithUseStorage(additionImages);
    }

    return createError({
      statusMessage: error.message,
      statusCode: 409,
    });
  }
});
