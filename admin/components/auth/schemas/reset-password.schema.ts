import { z } from "zod";

export const schema = z.object({
	password: z.string().min(6, "Password must be at least 6 characters"),
});

export type Schema = z.output<typeof schema>;
