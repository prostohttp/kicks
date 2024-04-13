import { User } from "~/server/models/user.schema";
import { clearString } from "~/utils";

export default defineEventHandler(async (event) => {
	const { email } = await readBody(event);

	try {
		const user = await User.findOne({ email: clearString(email) });
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
