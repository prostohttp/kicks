import bcrypt from "bcrypt";
import { User } from "~/server/models/user.schema";
import { clearString } from "~/utils";

export default defineEventHandler(async (event) => {
	const { firstName, lastName, email, password, keepLogged, role } =
		await readBody(event);
	const hashed = bcrypt.hashSync(password, 10);

	try {
		const newUser = new User({
			firstName,
			lastName,
			email: clearString(email),
			password: hashed,
			role,
		});

		const savedUser = await newUser.save();
		return { user: savedUser, keepLogged: keepLogged };
	} catch (error) {
		throw createError({
			statusMessage: "User already registered.",
		});
	}
});
