export interface User {
  username: string;
  email: string;
  avatar: string;
}

export const TAGS = [
  'Work',
  'Personal',
  'Meeting',
  'Shopping',
  'Ideas',
  'Travel',
  'Finance',
  'Health',
  'Important',
  'Todo',
] as const;
export type Tag = (typeof TAGS)[number];

export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  tag: Tag;
}

export interface NoteResponse {
  notes: Note[];
  totalPages: number;
}
