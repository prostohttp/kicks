import deleteFilesWithUseStorage from "~/utils/delete-files-with-use-storage";
import { Constants } from "~/constants";
import uploadFilesWithUseStorage from "~/utils/upload-files-with-use-storage";
import fromMultipartFormData from "~/utils/from-multipart-form-data";
import { OptionValueDto } from "~/server/api/product/dto/option-value.dto";

export default defineEventHandler(async (event) => {
  const data = await readMultipartFormData(event);

  const image = uploadFilesWithUseStorage(data, Constants.IMG_OPTIONS, "image");

  try {
    const updatedFields = fromMultipartFormData(data);
    const optionValue: OptionValueDto | null = await OptionValue.findById(
      updatedFields.id,
    );

    if (!optionValue) {
      throw createError({
        statusMessage: "Option value not found",
      });
    }

    if (
      !updatedFields.title ||
      !updatedFields.value ||
      !updatedFields.parentOption
    ) {
      throw createError({
        statusMessage: "Title and value are required",
      });
    }

    if (image && image.length > 0) {
      updatedFields.image = image[0];
    } else if (image && !image.length) {
      updatedFields.image = "";
      deleteFilesWithUseStorage(
        optionValue.image ? [optionValue.image] : undefined,
      );
    }

    return await OptionValue.findByIdAndUpdate(
      updatedFields.id,
      updatedFields,
      {
        new: true,
      },
    );
  } catch (error: any) {
    if (image) {
      deleteFilesWithUseStorage(image);
    }

    throw createError({
      statusMessage: error.message,
    });
  }
});
