import { z } from "zod";

export const schema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().optional(),
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
    .refine((val) => !isNaN(val) && val > 0, {
      message: "Must be a valid number and greater then 1",
    }),
});

export type Schema = z.output<typeof schema>;
