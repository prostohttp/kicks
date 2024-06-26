import * as v from "valibot";

export const schema = v.object({
  title: v.pipe(
    v.string("Required"),
    v.trim(),
    v.minLength(3, "Title must be at least 3 characters"),
  ),
  description: v.string(),
  shortDescription: v.pipe(
    v.string("Required"),
    v.minLength(10, "Short description must be at least 10 characters"),
  ),
  isEnabled: v.boolean(),
  adminMenu: v.boolean(),
  siteMenu: v.boolean(),
  featuredProducts: v.array(v.string()),
  sort: v.pipe(
    v.number("Must be a number"),
    v.minValue(1, "Must be a number and greater then 1"),
  ),
});

export type Schema = v.InferOutput<typeof schema>;
