import { z } from "zod";

export const schema = z.object({
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
	password: z.string().min(6, "Password must be at least 8 characters long"),
	keepLogged: z.boolean(),
});

export type Schema = z.output<typeof schema>;
