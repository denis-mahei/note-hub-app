import axios from 'axios';
import { CheckSessionRequest, Note, User } from '@/types/definitions';
import { AuthFormValues } from '@/lib/schemas/auth';
import { NoteValues } from '@/lib/schemas/note';

export const clientApi = axios.create({
  baseURL: '/api',
});

export const getMe = async (): Promise<User> => {
  const { data } = await clientApi.get<User>('/users/me');
  return data;
};

export const checkSession = async () => {
  const { data } =
    await clientApi.get<CheckSessionRequest>('/auth/session');
  return data.success;
};

export const updateMe = async (payload): Promise<User> => {
  const { data } = await clientApi.patch('/users/me', payload);
  return data;
};

export const signIn = async (
  formValues: AuthFormValues,
): Promise<User> => {
  const { data } = await clientApi.post<User>(
    '/auth/login',
    formValues,
  );
  return data;
};

export const signUp = async (
  formValues: AuthFormValues,
): Promise<User> => {
  const { data } = await clientApi.post<User>(
    '/auth/register',
    formValues,
  );
  return data;
};

export const signOut = async (): Promise<void> => {
  await clientApi.post('/auth/logout');
};

export const createNote = async (
  payload: NoteValues,
): Promise<Note> => {
  const { data } = await clientApi.post<Note>('/notes', payload);
  return data;
};

export const getNoteById = async (id: string): Promise<Note> => {
  const { data } = await clientApi.get(`/notes/${id}`);
  return data;
};

export const deleteNote = async (id: string): Promise<void> =>
  await clientApi.delete(`/notes/${id}`);

export const updateNote = async (
  id: string,
  payload: NoteValues,
): Promise<Note> => {
  const { data } = await clientApi.patch(`/notes/${id}`, payload);
  return data;
};
