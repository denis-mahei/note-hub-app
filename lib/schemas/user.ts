import { z } from 'zod';

export const usernameSchema = z.object({
  username: z
    .string({ message: 'Name must be a string' })
    .min(3, 'Name must be at least 3 characters')
    .max(20, 'Name must be maximum 20 characters')
    .trim(),
});

export type UsernameFormValues = z.infer<typeof usernameSchema>;
