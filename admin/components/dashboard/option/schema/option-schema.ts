// TODO: Проверка полей опций
import * as v from "valibot";

export const schema = v.object({
  title: v.pipe(
    v.string("Required"),
    v.trim(),
    v.minLength(3, "Min 3 symbols"),
  ),
  type: v.string("Required"),
  sort: v.pipe(v.number("Required"), v.minValue(1, "Min 1")),
});

export type Schema = v.InferOutput<typeof schema>;
