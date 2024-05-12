import { Constants } from "~/constants";
import { UserDto } from "~/server/dto/user.dto";
import uploadFilesWithUseStorage from "~/utils/upload-files-with-use-storage";
import fromMultipartFormData from "~/utils/from-multipart-form-data";
import { Roles } from "~/types/server/server.types";

export default defineEventHandler(async (event) => {
  try {
    const data = await readMultipartFormData(event);
    const image = uploadFilesWithUseStorage(data, Constants.IMG_USERS, "image");
    const resultData = fromMultipartFormData(data) as unknown as UserDto;

    const user = await User.findById(resultData.id);
    if (!user || (user && user.role.toString() !== Roles.CUSTOMER)) {
      throw createError({
        statusMessage: "User not found",
      });
    }
    const updatedUser = await User.findByIdAndUpdate(
      resultData.id,
      { ...resultData, image: image ? image[0] : "" },
      {
        new: true,
      },
    );
    return updatedUser;
  } catch (error: any) {
    throw createError({
      statusMessage: error.message,
    });
  }
});
