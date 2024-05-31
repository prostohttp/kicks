import { z } from "zod";

export const schema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().optional(),
});

export type Schema = z.output<typeof schema>;
