import deleteFiles from "~/utils/delete-files";
import { Constants } from "~/constants";
import uploadFiles from "~/utils/upload-files";
import fromMultipartFormData from "~/utils/from-multipart-form-data";

export default defineEventHandler(async (event) => {
  const data = await readMultipartFormData(event);

  const image = uploadFiles(data, Constants.IMG_OPTIONS, "image");

  try {
    const updatedFields = fromMultipartFormData(data);
    const optionValue = await OptionValue.findById(updatedFields.id);

    if (!optionValue) {
      return createError({
        statusMessage: "Option value not found",
      });
    }

    if (
      !updatedFields.title ||
      !updatedFields.value ||
      !updatedFields.parentOption
    ) {
      return createError({
        statusMessage: "Title and value are required",
      });
    }

    if (image && image.length > 0) {
      updatedFields.image = image[0];
    } else if (image && !image.length) {
      updatedFields.image = "";
      deleteFiles([optionValue.image.toString()]);
    }

    const updatedOptionValue = await OptionValue.findByIdAndUpdate(
      updatedFields.id,
      updatedFields,
      {
        new: true,
      },
    );

    return updatedOptionValue;
  } catch (error: any) {
    if (image) {
      deleteFiles(image);
    }

    return createError({
      statusMessage: error.message,
    });
  }
});
