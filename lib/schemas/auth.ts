import { z } from "zod";

export const authSchema = z.object({
  email: z.email(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});

export type AuthFormValues = z.infer<typeof authSchema>;
