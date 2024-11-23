import uploadFilesWithUseStorage from "~/utils/upload-files-with-use-storage";
import { ImageDto } from "./image.dto";
import fromMultipartFormData from "~/utils/from-multipart-form-data";

export default defineEventHandler(async (event) => {
    try {
        const data = await readMultipartFormData(event);
        const resultData = fromMultipartFormData(data) as unknown as ImageDto;

        const image = uploadFilesWithUseStorage(
            data,
            resultData.folderName,
            "image",
        );
        if (resultData.multiple) {
            return image.join(",");
        } else {
            return image[0];
        }
    } catch (error: any) {
        throw createError({ statusMessage: error.message });
    }
});
