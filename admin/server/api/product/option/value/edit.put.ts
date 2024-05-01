import deleteFiles from "~/utils/delete-files";
import { Constants } from "~/constants";
import uploadFiles from "~/utils/upload-files";

export default defineEventHandler(async (event) => {
  const data = await readMultipartFormData(event);
  const formData = await readFormData(event);

  const updatedFields: any = {};

  const id = formData.get("id");
  const title = formData.get("title");
  const value = formData.get("value");

  const image = uploadFiles(data, Constants.IMG_OPTIONS, "image");

  try {
    const optionValue = await OptionValue.findById(id);
    if (!optionValue) {
      throw createError({
        statusMessage: "Option value not found",
      });
    }

    if (title) {
      updatedFields.title = title;
    }

    if (value) {
      updatedFields.value = value;
    }

    if (image && image.length > 0) {
      updatedFields.image = image[0];
    } else if (image && !image.length) {
      updatedFields.image = "";
      deleteFiles([optionValue.image.toString()]);
    }

    const updatedOptionValue = await OptionValue.findByIdAndUpdate(
      id,
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

    throw createError({
      statusMessage: error.message,
    });
  }
});
