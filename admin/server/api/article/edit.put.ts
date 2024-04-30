import { Constants } from "~/constants";
import cleanStringToArray from "~/utils/clean-string-to-array";
import deleteFiles from "~/utils/delete-files";
import uploadFiles from "~/utils/upload-files";

export default defineEventHandler(async (event) => {
  const data = await readMultipartFormData(event);
  const formData = await readFormData(event);

  const id = formData.get("id");
  const image = uploadFiles(data, Constants.IMG_ARTICLES, "image");

  try {
    const article = await Article.findById(id);

    const title = formData.get("title");
    const description = formData.get("description");
    const shortDescription = formData.get("shortDescription");
    const featuredProducts = formData.get("featuredProducts") as string;
    const isEnabled = formData.get("isEnabled");

    const updatedFields: any = {};

    if (!article) {
      return createError({ statusMessage: "Category not found" });
    }
    if (title) {
      updatedFields.title = title;
    }
    if (description) {
      updatedFields.description = description;
    } else {
      updatedFields.description = "";
    }
    if (shortDescription) {
      updatedFields.shortDescription = shortDescription;
    } else {
      updatedFields.shortDescription = "";
    }
    if (featuredProducts) {
      updatedFields.featuredProducts = cleanStringToArray(featuredProducts);
    } else {
      updatedFields.featuredProducts = [];
    }
    updatedFields.isEnabled = isEnabled;
    if (image && image.length > 0) {
      // TODO: Стоит реализовать удаление изображения после изменения на новое
      // deleteFiles([category.image.toString()]);
      updatedFields.image = image[0];
    } else if (image && !image.length) {
      updatedFields.image = "";
      deleteFiles([article.image.toString()]);
    }

    return await Article.findByIdAndUpdate(id, updatedFields, {
      new: true,
    });
  } catch (error: any) {
    if (image) {
      deleteFiles(image);
    }
    throw createError({
      statusMessage: error.message,
    });
  }
});
