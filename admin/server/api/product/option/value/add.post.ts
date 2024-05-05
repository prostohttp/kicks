import { Option } from "#imports";
import { Constants } from "~/constants";
import deleteFilesWithUseStorage from "~/utils/delete-files-with-use-storage";
import fromMultipartFormData from "~/utils/from-multipart-form-data";
import uploadFilesWithUseStorage from "~/utils/upload-files-with-use-storage";

export default defineEventHandler(async (event) => {
  const data = await readMultipartFormData(event);
  const image = uploadFilesWithUseStorage(data, Constants.IMG_OPTIONS, "image");

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
      deleteFilesWithUseStorage(image);
    }

    return createError({
      statusMessage: error.message,
      statusCode: 409,
    });
  }
});
