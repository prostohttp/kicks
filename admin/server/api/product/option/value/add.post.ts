import { Option } from "#imports";
import { Constants } from "~/constants";
import deleteFiles from "~/utils/delete-files";
import fromMultipartFormData from "~/utils/from-multipart-form-data";
import uploadFiles from "~/utils/upload-files";

export default defineEventHandler(async (event) => {
  const data = await readMultipartFormData(event);
  const image = uploadFiles(data, Constants.IMG_OPTIONS, "image");

  try {
    const resultData = fromMultipartFormData(data);
    const newOptionValue = new OptionValue({
      ...resultData,
      image: image ? image[0] : "",
    });

    const savedOptionValue = await newOptionValue.save();
    await Option.findByIdAndUpdate(
      resultData.parentOption,
      {
        $push: { values: savedOptionValue._id },
      },
      {
        new: true,
      },
    );

    return savedOptionValue;
  } catch (error: any) {
    if (image) {
      deleteFiles(image);
    }

    return createError({
      statusMessage: error.message,
      statusCode: 409,
    });
  }
});
