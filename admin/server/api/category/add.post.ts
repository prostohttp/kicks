import { Category } from "~/server/models/category.schema";
import { Constants } from "~/constants";
import cleanStringToArray from "~/utils/clean-string-to-array";
import deleteFilesWithUseStorage from "~/utils/delete-files-with-use-storage";
import uploadFilesWithUseStorage from "~/utils/upload-files-with-use-storage";
import fromMultipartFormData from "~/utils/from-multipart-form-data";
import { CategoryDto } from "~/server/api/category/dto/category.dto";

export default defineEventHandler(async (event) => {
  const data = await readMultipartFormData(event);

  const image = uploadFilesWithUseStorage(
    data,
    Constants.IMG_CATEGORIES,
    "image",
  );
  try {
    const resultData = fromMultipartFormData(data) as unknown as CategoryDto;

    const newCategory = new Category({
      ...resultData,
      children: cleanStringToArray(resultData.children),
      image: image ? image[0] : "",
    });

    return await newCategory.save();
  } catch (error: any) {
    if (image) {
      deleteFilesWithUseStorage(image);
    }

    throw createError({
      statusMessage: error.message,
      statusCode: 409,
    });
  }
});
