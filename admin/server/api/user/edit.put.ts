import bcrypt from "bcrypt";
import { UserEditDto } from "./dto/user-edit.dto";

export default defineEventHandler(async (event) => {
    try {
        const body = await readBody<UserEditDto>(event);
        const user = await User.findById(body.id);
        if (!user) {
            throw createError({
                statusMessage: "User not found",
            });
        }
        let savedPassword: string | undefined = undefined;
        if (body.oldPassword && body.newPassword) {
            const correctPassword = await bcrypt.compare(
                body.oldPassword.toString(),
                user.password.toString(),
            );
            if (!correctPassword) {
                throw createError({
                    message: "Old password is not correct",
                    statusCode: 400,
                });
            }
            savedPassword = bcrypt.hashSync(body.newPassword.toString(), 10);
        }

        const updatedUser = await User.findByIdAndUpdate(
            body.id,
            {
                ...body,
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
