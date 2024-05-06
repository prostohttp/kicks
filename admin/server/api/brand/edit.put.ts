import deleteFilesWithUseStorage from "~/utils/delete-files-with-use-storage";
import { Constants } from "~/constants";
import uploadFilesWithUseStorage from "~/utils/upload-files-with-use-storage";
import fromMultipartFormData from "~/utils/from-multipart-form-data";

export default defineEventHandler(async (event) => {
  const data = await readMultipartFormData(event);

  const updatedFields = fromMultipartFormData(data);
  const image = uploadFilesWithUseStorage(data, Constants.IMG_BRANDS, "image");

  try {
    if (!updatedFields.title) {
      return createError({
        statusMessage: "Title is required",
      });
    }

    const brand = await Brand.findById(updatedFields.id);

    if (!brand) {
      return createError({
        statusMessage: "Brand not found",
      });
    }

    if (image && image.length > 0) {
      updatedFields.image = image[0];
    } else if (image && !image.length) {
      updatedFields.image = "";
      deleteFilesWithUseStorage([brand.image?.toString()]);
    }

    const updatedBrand = await Brand.findByIdAndUpdate(
      updatedFields.id,
      updatedFields,
      { new: true },
    );
    return updatedBrand;
  } catch (error: any) {
    if (image) {
      deleteFilesWithUseStorage(image);
    }

    return createError({
      statusMessage: error.message,
    });
  }
});
