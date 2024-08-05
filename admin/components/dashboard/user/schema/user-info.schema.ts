import * as v from "valibot";

export const schema = v.object({
  name: v.pipe(
    v.string(),
    v.trim(),
    v.minLength(3, "Full Name must be at least 3 characters"),
  ),
  email: v.pipe(v.string(), v.email("Invalid email")),
  role: v.string(),
});

export type Schema = v.InferOutput<typeof schema>;
