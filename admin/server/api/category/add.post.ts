import { Category } from "~/server/models/category.schema";
import { Constants } from "~/constants";
import cleanStringToArray from "~/utils/clean-string-to-array";
import deleteFiles from "~/utils/delete-files";
import uploadFiles from "~/utils/upload-files";
import fromMultipartFormData from "~/utils/from-multipart-form-data";

export default defineEventHandler(async (event) => {
  const data = await readMultipartFormData(event);

  const image = uploadFiles(data, Constants.IMG_CATEGORIES, "image");
  try {
    const resultData = fromMultipartFormData(data);

    const newCategory = new Category({
      ...resultData,
      children: cleanStringToArray(resultData.children),
      productCount: 0,
      image: image ? image[0] : "",
    });

    return await newCategory.save();
  } catch (error: any) {
    if (image) {
      deleteFiles(image);
    }

    return createError({
      statusMessage: error.message,
      statusCode: 409,
    });
  }
});
