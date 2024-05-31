import uploadFilesWithUseStorage from "~/utils/upload-files-with-use-storage";
import { Constants } from "~/constants";
import fromMultipartFormData from "~/utils/from-multipart-form-data";
import { BrandDto } from "./dto/brand.dto";

export default defineEventHandler(async (event) => {
  try {
    const data = await readMultipartFormData(event);
    const resultData = fromMultipartFormData(data) as unknown as BrandDto;
    const image = uploadFilesWithUseStorage(
      data,
      Constants.IMG_BRANDS,
      "image",
    );

    return await Brand.findByIdAndUpdate(
      resultData.id,
      {
        image: image[0],
      },
      {
        new: true,
      },
    );
  } catch (error: any) {
    throw createError({ statusMessage: error.message });
  }
});
