import bcrypt from "bcrypt";

export default defineEventHandler(async (event) => {
    try {
        const { email, oldPassword, newPassword } = await readBody(event);
        const user = await User.findOne({ email });
        if (user) {
            const correctPassword = await bcrypt.compare(
                oldPassword,
                user.password.toString(),
            );
            if (!correctPassword) {
                throw createError({ statusMessage: "Wrong password" });
            }
            await User.findOneAndUpdate(
                { email },
                { password: bcrypt.hashSync(newPassword, 10) },
                { new: true },
            );
            return {
                statusMessage: "Password changed",
            };
        }
        throw createError({ statusMessage: "User not found" });
    } catch (error: any) {
        throw createError({ statusMessage: error.message });
    }
});
