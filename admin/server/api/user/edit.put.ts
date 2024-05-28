import bcrypt from "bcrypt";
import { UserEditDto } from "~/server/dto/user-edit.dto";
import fromMultipartFormData from "~/utils/from-multipart-form-data";

export default defineEventHandler(async (event) => {
  try {
    const data = await readMultipartFormData(event);
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

    const updatedUser = await User.findByIdAndUpdate(
      resultData.id,
      {
        ...resultData,
        password: savedPassword ? savedPassword : user.password,
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
