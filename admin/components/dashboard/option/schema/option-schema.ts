import * as v from "valibot";

export const schema = v.object({
  title: v.pipe(
    v.string("Required"),
    v.trim(),
    v.minLength(3, "Title must be at least 3 characters"),
  ),
  type: v.pipe(v.string(), v.minLength(1, "Required field")),
  sort: v.pipe(v.number("Required"), v.minValue(1, "Min 1")),
  values: v.array(
    v.object({
      value: v.pipe(v.string("Required"), v.minLength(3, "Min 3 symbols")),
      sort: v.pipe(v.number("Required"), v.minValue(1, "Min value 1")),
    }),
  ),
});

export type Schema = v.InferOutput<typeof schema>;
