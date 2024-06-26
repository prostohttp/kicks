import * as v from "valibot";

export const schema = v.object({
  name: v.pipe(
    v.string("Required"),
    v.trim(),
    v.minLength(3, "Full Name must be at least 3 characters"),
  ),
  email: v.pipe(v.string("Required field"), v.email("Invalid email")),
  oldPassword: v.string(),
  newPassword: v.string(),
});

export type Schema = v.InferOutput<typeof schema>;
