import { z } from "zod";

export const schema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  type: z.string(),
  sort: z.preprocess(
    (val) => (val === "" ? undefined : Number(val)),
    z.number().optional(),
  ),
  // valueTitle: z.string(),
  // valueSort: z.preprocess(
  //   (val) => (val === "" ? undefined : Number(val)),
  //   z.number().optional(),
  // ),
});

export type Schema = z.output<typeof schema>;
