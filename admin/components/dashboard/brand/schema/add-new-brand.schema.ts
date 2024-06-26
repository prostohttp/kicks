import * as v from "valibot";

export const schema = v.object({
  title: v.pipe(
    v.string("Required"),
    v.trim(),
    v.minLength(3, "Title must be at least 3 characters"),
  ),
  description: v.string(),
});

export type Schema = v.InferOutput<typeof schema>;
