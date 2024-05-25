import { Constants } from "~/constants";
import uploadFilesWithUseStorage from "~/utils/upload-files-with-use-storage";
import deleteFilesWithUseStorage from "~/utils/delete-files-with-use-storage";
import fromMultipartFormData from "~/utils/from-multipart-form-data";
import { BrandDto } from "~/server/api/brand/dto/brand.dto";

export default defineEventHandler(async (event) => {
  const data = await readMultipartFormData(event);

  const image = uploadFilesWithUseStorage(data, Constants.IMG_BRANDS, "image");
  try {
    const resultData = fromMultipartFormData(data) as unknown as BrandDto;
    const newBrand = new Brand({
      ...resultData,
      image: image && image.length ? image[0] : "",
    });

    return await newBrand.save();
  } catch (error: any) {
    if (image) {
      deleteFilesWithUseStorage(image);
    }

    throw createError({
      statusMessage: error.message,
      statusCode: 409,
    });
  }
});
