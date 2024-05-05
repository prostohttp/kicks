import { Constants } from "~/constants";
import { Article } from "~/server/models/article.schema";
import cleanStringToArray from "~/utils/clean-string-to-array";
import deleteFilesWithUseStorage from "~/utils/delete-files-with-use-storage";
import fromMultipartFormData from "~/utils/from-multipart-form-data";
import uploadFilesWithUseStorage from "~/utils/upload-files-with-use-storage";

export default defineEventHandler(async (event) => {
  const data = await readMultipartFormData(event);

  const image = uploadFilesWithUseStorage(
    data,
    Constants.IMG_ARTICLES,
    "image",
  );

  try {
    const resultData = fromMultipartFormData(data);
    const newArticle = new Article({
      ...resultData,
      featuredProducts: cleanStringToArray(
        resultData.featuredProducts as string,
      ),
      image: image ? image[0] : "",
    });

    return await newArticle.save();
  } catch (error: any) {
    if (image) {
      deleteFilesWithUseStorage(image);
    }

    return createError({
      statusMessage: error.message,
      statusCode: 409,
    });
  }
});
