import { Constants } from "~/constants";
import deleteFiles from "~/utils/delete-files";
import fromMultipartFormData from "~/utils/from-multipart-form-data";
import uploadFiles from "~/utils/upload-files";

export default defineEventHandler(async (event) => {
  const data = await readMultipartFormData(event);

  const image = uploadFiles(data, Constants.IMG_BRANDS, "image");
  try {
    const resultData = fromMultipartFormData(data);
    const newBrand = new Brand({
      ...resultData,
      image: image ? image[0] : "",
    });

    return await newBrand.save();
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
