import { User } from "~/server/models/user.schema";

export default defineEventHandler(async (event) => {
    try {
        const { email } = await readBody(event);
        const user = await User.findOne({ email });
        if (!user) {
            throw createError({
                statusMessage: "Email not found.",
            });
        }
        return user;
    } catch (error: any) {
        throw createError({
            statusMessage: error.message,
        });
    }
});
