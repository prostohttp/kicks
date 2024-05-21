import { z } from "zod";
import { Constants } from "~/constants";

export const schema = z.object({
  name: z.string().min(3, "Full Name must be at least 3 characters"),
  email: z.string().email("Invalid email"),
  oldPassword: z.string().optional(),
  newPassword: z.string().optional(),
  image: z
    .any()
    .refine((file) => file.size < Constants.MAX_FILE_SIZE, "Max size is 5MB.")
    .refine(
      (file) => checkFileType(file),
      "Only .jpeg, .jpg, .png, .webp formats are supported.",
    ),
});
// .refine((data) => data.confirm === data.password, {
//   message: "Passwords do not match.",
//   path: ["confirm"],
// });

export type Schema = z.output<typeof schema>;
