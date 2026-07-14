import { z } from 'zod';
import { TAGS } from '@/types/definitions';

export const noteSchema = z.object({
  title: z
    .string()
    .min(4, {
      message: 'Note title must be a minimum of 4 characters',
    })
    .max(15, {
      message: 'Note title must be a maximum of 15 characters',
    }),
  content: z
    .string()
    .min(8, {
      message: 'Note content must be a minimum of 8 characters',
    })
    .max(100, {
      message: 'Note content must be a maximum of 100 characters',
    }),
  tag: z.enum(TAGS),
});

export type NoteValues = z.infer<typeof noteSchema>;
