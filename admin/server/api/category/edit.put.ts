import { Constants } from "~/constants";
import { type CategoryDto } from "~/types";
import cleanStringToArray from "~/utils/clean-string-to-array";
import deleteFiles from "~/utils/delete-files";
import fromMultipartFormData from "~/utils/from-multipart-form-data";
import uploadFiles from "~/utils/upload-files";

export default defineEventHandler(async (event) => {
  const data = await readMultipartFormData(event);

  const images = uploadFiles(data, Constants.IMG_CATEGORIES, "image");

  try {
    const updatedFields = fromMultipartFormData(data);
    const category: CategoryDto | null = await Category.findById(
      updatedFields.id,
    );

    if (!category) {
      return createError({ statusMessage: "Category not found" });
    }
    if (
      !updatedFields.title ||
      !updatedFields.isParent ||
      !updatedFields.isEnabled
    ) {
      return createError({
        statusMessage: "Title, isParent and isEnabled are required",
      });
    }

    if (images && images.length > 0) {
      updatedFields.image = images[0];
    } else if (images && !images.length) {
      updatedFields.image = "";
      deleteFiles([category.image.toString()]);
    }

    const updatedCategory = await Category.findByIdAndUpdate(
      updatedFields.id,
      {
        ...updatedFields,
        children: cleanStringToArray(updatedFields.children),
      },
      { new: true },
    );
    return updatedCategory;
  } catch (error: any) {
    if (images) {
      deleteFiles(images);
    }
    return createError({
      statusMessage: error.message,
    });
  }
});
