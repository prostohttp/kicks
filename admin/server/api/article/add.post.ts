import { Constants } from "~/constants";
import { Article } from "~/server/models/article.schema";
import cleanStringToArray from "~/utils/clean-string-to-array";
import deleteFiles from "~/utils/delete-files";
import fromMultipartFormData from "~/utils/from-multipart-form-data";
import uploadFiles from "~/utils/upload-files";

export default defineEventHandler(async (event) => {
  const data = await readMultipartFormData(event);

  const image = uploadFiles(data, Constants.IMG_ARTICLES, "image");

  try {
    const resultData = fromMultipartFormData(data);
    const newArticle = new Article({
      ...resultData,
      featuredProducts: cleanStringToArray(resultData.featuredProducts),
      image: image ? image[0] : "",
    });

    return await newArticle.save();
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
