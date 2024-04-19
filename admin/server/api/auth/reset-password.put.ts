import bcrypt from "bcrypt";
import { User } from "~/server/models/user.schema";
import clearString from "~/utils/clear-string";

export default defineEventHandler(async (event) => {
	const { email, password } = await readBody(event);

	try {
		const hashedPassword = bcrypt.hashSync(password, 10);
		const user = await User.findOneAndUpdate(
			{ email: clearString(email) },
			{ password: hashedPassword },
			{ new: true }
		);
		if (!user) {
			return createError({
				statusMessage: "User not found.",
			});
		}

		return { message: "Password changed" };
	} catch (error: any) {
		return createError({
			statusMessage: error.message,
		});
	}
});
