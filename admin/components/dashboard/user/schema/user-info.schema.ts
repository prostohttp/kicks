import { z } from "zod";
import { Roles } from "~/types/server/server.types";

export const schema = z.object({
  name: z.string().min(3, "Full Name must be at least 3 characters"),
  email: z.string().email("Invalid email"),
  role: z
    .string()
    .refine(
      (role) => Object.values(Roles).includes(role as Roles),
      "Invalid role",
    ),
  image: z.any().optional(),
});

export type Schema = z.output<typeof schema>;
