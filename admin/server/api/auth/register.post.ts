import bcrypt from "bcrypt";
import { User } from "~/server/models/user.schema";

export default defineEventHandler(async (event) => {
	try {
		const { name, email, password, role } = await readBody(event);
		const hashed = bcrypt.hashSync(password, 10);
		const newUser = new User({
			name,
			email,
			password: hashed,
			role,
		});

		const savedUser = await newUser.save();
		return { user: savedUser };
	} catch (error) {
		throw createError({
			statusMessage: "User with this email already exists.",
			statusCode: 409,
		});
	}
});
