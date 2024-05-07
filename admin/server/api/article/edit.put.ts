import { Constants } from "~/constants";
import cleanStringToArray from "~/utils/clean-string-to-array";
import deleteFilesWithUseStorage from "~/utils/delete-files-with-use-storage";
import fromMultipartFormData from "~/utils/from-multipart-form-data";
import uploadFilesWithUseStorage from "~/utils/upload-files-with-use-storage";
import { ArticleDto } from "~/server/api/article/dto/article.dto";

export default defineEventHandler(async (event) => {
  const data = await readMultipartFormData(event);

  const image = uploadFilesWithUseStorage(
    data,
    Constants.IMG_ARTICLES,
    "image",
  );

  try {
    const updatedFields = fromMultipartFormData(data) as unknown as ArticleDto;
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
      deleteFilesWithUseStorage(
        updatedFields.image ? [updatedFields.image] : undefined,
      );
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
      deleteFilesWithUseStorage(image);
    }
    return createError({
      statusMessage: error.message,
    });
  }
});
