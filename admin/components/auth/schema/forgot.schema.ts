import { z } from "zod";

export const schema = z.object({
  email: z.string().email("Invalid email"),
});

export type Schema = z.output<typeof schema>;
