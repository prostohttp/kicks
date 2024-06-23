// import { z } from "zod";

// export const schema = z.object({
//   title: z
//     .string({ message: "Required field" })
//     .min(3, "Title must be at least 3 characters"),
//   type: z.string({ message: "Required field" }),
//   sort: z.number({ message: "Required field" }).min(1, { message: "Min 1" }),
// });
// export type Schema = z.output<typeof schema>;

// TODO: Проверка полей опций
import * as v from "valibot";

export const schema = v.object({
  title: v.pipe(v.string("Required"), v.minLength(3, "Min 3 symbols")),
  type: v.pipe(v.string("Required"), v.minLength(1, "Min 1 symbols")),
  sort: v.pipe(v.number("Required"), v.minValue(1, "Min 1")),
});

export type Schema = v.InferOutput<typeof schema>;
