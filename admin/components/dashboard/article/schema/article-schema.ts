import { z } from "zod";

const regex = /<\/?[^>]+(>|$)/g;

export const schema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string(),
  shortDescription: z
    .string()
    .min(10, "Short description must be at least 10 characters"),
  // description: z.custom(
  //   (val: string) => val.replace(/<\/?[^>]+(>|$)/g, "").length >= 10,
  //   "Description must be over 10 symbols",
  // ),
  isEnabled: z.boolean(),
  adminMenu: z.boolean(),
  siteMenu: z.boolean(),
  featuredProducts: z.array(z.string()),
  sort: z
    .string()
    .min(1, "Required field")
    .transform((val) => Number(val))
    .refine((val) => !isNaN(val), {
      message: "Must be a valid number",
    }),
});

export type Schema = z.output<typeof schema>;
