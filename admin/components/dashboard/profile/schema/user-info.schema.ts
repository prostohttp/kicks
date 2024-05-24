import { z } from "zod";

export const schema = z.object({
  name: z.string().min(3, "Full Name must be at least 3 characters"),
  email: z.string().email("Invalid email"),
  oldPassword: z.string().optional(),
  newPassword: z.string().optional(),
  image: z.any().optional(),
  // .refine((file) => checkFileType(file), "Only images are supported."),
});

export type Schema = z.output<typeof schema>;
