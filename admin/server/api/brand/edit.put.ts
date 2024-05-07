import deleteFilesWithUseStorage from "~/utils/delete-files-with-use-storage";
import { Constants } from "~/constants";
import uploadFilesWithUseStorage from "~/utils/upload-files-with-use-storage";
import fromMultipartFormData from "~/utils/from-multipart-form-data";
import { BrandDto } from "~/server/api/brand/dto/brand.dto";

export default defineEventHandler(async (event) => {
  const data = await readMultipartFormData(event);

  const updatedFields = fromMultipartFormData(data) as unknown as BrandDto;
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
      deleteFilesWithUseStorage(
        updatedFields.image ? [updatedFields.image] : undefined,
      );
    }

    return await Brand.findByIdAndUpdate(updatedFields.id, updatedFields, {
      new: true,
    });
  } catch (error: any) {
    if (image) {
      deleteFilesWithUseStorage(image);
    }

    return createError({
      statusMessage: error.message,
    });
  }
});
