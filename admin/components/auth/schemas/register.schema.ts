import { z } from "zod";

export const schema = z.object({
	firstName: z.string().min(3, "First Name must be at least 3 characters"),
	lastName: z.string().min(3, "Last Name must be at least 3 characters"),
	email: z.string().email("Invalid email"),
	// TODO: раскомментировать после тестирования
	// password: z
	// 	.string()
	// 	.min(8, "Password must be at least 8 characters long")
	// 	.refine((value) => /[A-Z]/.test(value), {
	// 		message: "Password must contain at least one uppercase letter",
	// 	})
	// 	.refine((value) => /[a-z]/.test(value), {
	// 		message: "Password must contain at least one lowercase letter",
	// 	})
	// 	.refine((value) => /\d/.test(value), {
	// 		message: "Password must contain at least one number",
	// 	})
	// 	.refine((value) => /[!@#$%^&*(),.?":{}|<>]/.test(value), {
	// 		message: "Password must contain at least one special character",
	// 	}),
	password: z.string().min(6, "Password must be at least 6 characters long"),
	terms: z
		.boolean({
			required_error: "Terms is Required",
			invalid_type_error: "Terms must be a boolean",
		})
		.refine((value) => value === true, { message: "Terms must be accepted" }),
	// keepLogged: z.boolean(),
});

export type Schema = z.output<typeof schema>;
