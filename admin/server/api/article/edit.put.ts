import { Constants } from "~/constants";
import cleanStringToArray from "~/utils/clean-string-to-array";
import deleteFiles from "~/utils/delete-files";
import fromMultipartFormData from "~/utils/from-multipart-form-data";
import uploadFiles from "~/utils/upload-files";

export default defineEventHandler(async (event) => {
  const data = await readMultipartFormData(event);

  const image = uploadFiles(data, Constants.IMG_ARTICLES, "image");

  try {
    const updatedFields = fromMultipartFormData(data);
    const article = await Article.findById(updatedFields.id);

    if (!article) {
      return createError({ statusMessage: "Category not found" });
    }
    if (!updatedFields.title || !updatedFields.description) {
      return createError({
        statusMessage: "Title and description are required",
      });
    }

    if (image && image.length > 0) {
      updatedFields.image = image[0];
    } else if (image && !image.length) {
      updatedFields.image = "";
      deleteFiles([article.image.toString()]);
    }

    return await Article.findByIdAndUpdate(
      updatedFields.id,
      {
        ...updatedFields,
        featuredProducts: cleanStringToArray(updatedFields.featuredProducts),
      },
      {
        new: true,
      },
    );
  } catch (error: any) {
    if (image) {
      deleteFiles(image);
    }
    return createError({
      statusMessage: error.message,
    });
  }
});
