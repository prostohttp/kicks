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
//   terms: z
//     .boolean({
//       required_error: "Terms is Required",
//       invalid_type_error: "Terms must be a boolean",
//     })
//     .refine((value) => value, { message: "Terms must be accepted" }),
import * as v from "valibot";

export const schema = v.object({
  name: v.pipe(
    v.string(),
    v.trim(),
    v.minLength(3, "Full Name must be at least 3 characters"),
  ),
  email: v.pipe(v.string(), v.email("Invalid email")),
  password: v.pipe(
    v.string(),
    v.trim(),
    v.minLength(6, "Password must be at least 6 characters long"),
  ),
  terms: v.pipe(
    v.boolean(),
    v.custom((value) => value === true, "Terms must be accepted"),
  ),
  keepLogged: v.boolean(),
});

export type Schema = v.InferOutput<typeof schema>;
