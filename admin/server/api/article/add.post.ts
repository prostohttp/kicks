import { Constants } from "~/constants";
import { Article } from "~/server/models/article.schema";
import cleanStringToArray from "~/utils/clean-string-to-array";
import deleteFiles from "~/utils/delete-files";
import uploadFiles from "~/utils/upload-files";

export default defineEventHandler(async (event) => {
  const data = await readMultipartFormData(event);
  const formData = await readFormData(event);

  const title = formData.get("title");
  const shortDescription = formData.get("shortDescription");
  const description = formData.get("description");
  const isEnabled = formData.get("isEnabled");
  const featuredProducts = formData.get("featuredProducts") as string;

  const image = uploadFiles(data, Constants.IMG_ARTICLES, "image");

  try {
    const newArticle = new Article({
      title,
      shortDescription,
      description,
      isEnabled,
      featuredProducts: cleanStringToArray(featuredProducts),
      image: image ? image[0] : "",
    });

    return await newArticle.save();
  } catch (error: any) {
    if (image) {
      deleteFiles(image);
    }

    throw createError({
      statusMessage: error.message,
      statusCode: 409,
    });
  }
});
