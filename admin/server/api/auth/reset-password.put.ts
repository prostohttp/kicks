import bcrypt from "bcrypt";
import { User } from "~/server/models/user.schema";

export default defineEventHandler(async (event) => {
    try {
        const { email, password } = await readBody(event);
        const hashedPassword = bcrypt.hashSync(password, 10);
        const user = await User.findOneAndUpdate(
            { email },
            { password: hashedPassword },
            { new: true },
        );
        if (!user) {
            throw createError({
                statusMessage: "User not found.",
            });
        }

        return { statusMessage: "Password changed" };
    } catch (error: any) {
        throw createError({
            statusMessage: error.message,
        });
    }
});
