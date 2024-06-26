import * as v from "valibot";

export const schema = v.object({
  password: v.pipe(
    v.string(),
    v.minLength(6, "Password must be at least 6 characters"),
  ),
});

export type Schema = v.InferOutput<typeof schema>;
