import { User } from "~/server/models/user.schema";
import clearString from "~/utils/clear-string";

export default defineEventHandler(async (event) => {
	const { email } = await readBody(event);

	try {
		const user = await User.findOne({ email: clearString(email) });
		if (!user) {
			return createError({
				statusMessage: "Email not found.",
			});
		}
		return user;
	} catch (error: any) {
		return createError({
			statusMessage: error.message,
		});
	}
});
