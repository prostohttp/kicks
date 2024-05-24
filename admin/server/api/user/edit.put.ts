import bcrypt from "bcrypt";
import { Constants } from "~/constants";
import { UserEditDto } from "~/server/dto/user-edit.dto";
import uploadFilesWithUseStorage from "~/utils/upload-files-with-use-storage";
import fromMultipartFormData from "~/utils/from-multipart-form-data";
import deleteFilesWithUseStorage from "~/utils/delete-files-with-use-storage";

export default defineEventHandler(async (event) => {
  try {
    const data = await readMultipartFormData(event);
    const image = uploadFilesWithUseStorage(data, Constants.IMG_USERS, "image");
    const resultData = fromMultipartFormData(data) as unknown as UserEditDto;

    const user = await User.findById(resultData.id);
    if (!user) {
      throw createError({
        statusMessage: "User not found",
      });
    }
    let savedPassword: string | undefined = undefined;
    if (resultData.oldPassword && resultData.newPassword) {
      const correctPassword = await bcrypt.compare(
        resultData.oldPassword,
        user.password.toString(),
      );
      if (!correctPassword) {
        throw createError({
          message: "Old password is not correct",
          statusCode: 400,
        });
      }
      savedPassword = bcrypt.hashSync(resultData.newPassword, 10);
    }

    if (Array.isArray(image) && !image.length) {
      deleteFilesWithUseStorage([user.image?.toString()]);
    }

    const updatedUser = await User.findByIdAndUpdate(
      resultData.id,
      {
        ...resultData,
        password: savedPassword ? savedPassword : user.password,
        image: !image
          ? user.image
          : Array.isArray(image) && image.length
            ? image[0]
            : "",
      },
      {
        new: true,
      },
    );
    return updatedUser;
  } catch (error: any) {
    throw createError({
      statusMessage: error.message,
      statusCode: 500,
    });
  }
});
