import * as v from "valibot";

export const schema = v.object({
  email: v.pipe(v.string(), v.email("Invalid email")),
  password: v.pipe(v.string(), v.minLength(6, "Must be at least 6 symbols")),
});

export type Schema = v.InferOutput<typeof schema>;
