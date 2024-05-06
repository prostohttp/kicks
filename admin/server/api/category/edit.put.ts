import { Constants } from "~/constants";
import { type CategoryDto } from "~/types";
import cleanStringToArray from "~/utils/clean-string-to-array";
import deleteFilesWithUseStorage from "~/utils/delete-files-with-use-storage";
import fromMultipartFormData from "~/utils/from-multipart-form-data";
import uploadFilesWithUseStorage from "~/utils/upload-files-with-use-storage";

export default defineEventHandler(async (event) => {
  const data = await readMultipartFormData(event);

  const images = uploadFilesWithUseStorage(
    data,
    Constants.IMG_CATEGORIES,
    "image",
  );

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
      deleteFilesWithUseStorage([category.image?.toString()]);
    }

    const updatedCategory = await Category.findByIdAndUpdate(
      updatedFields.id,
      {
        ...updatedFields,
        children: cleanStringToArray(updatedFields.children as string),
      },
      { new: true },
    );
    return updatedCategory;
  } catch (error: any) {
    if (images) {
      deleteFilesWithUseStorage(images);
    }
    return createError({
      statusMessage: error.message,
    });
  }
});
